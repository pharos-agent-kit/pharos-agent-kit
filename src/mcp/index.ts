import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { Action } from "../types/action";
import { PharosAgentKit } from "../agent";
import { zodToMCPShape } from "../utils/zodToMCPSchema";

/**
 * Creates an MCP server from a set of actions
 */
export function createMcpServer(
  actions: Record<string, Action>,
  PharosAgentKit: PharosAgentKit,
  options: {
    name: string;
    version: string;
  },
) {
  // Create MCP server instance
  const server = new McpServer({
    name: options.name,
    version: options.version,
  });

  const registeredActions: string[] = [];

  // Convert each action to an MCP tool
  for (const [_, action] of Object.entries(actions)) {
    const { result } = zodToMCPShape(action.schema);

    server.tool(action.name, action.description, result, async (params) => {
      try {
        // Execute the action handler with the params directly
        const result = await action.handler(PharosAgentKit, params);

        // Format the result as MCP tool response
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        console.error("error", error);
        // Handle errors in MCP format
        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
            },
          ],
        };
      }
    });

    registeredActions.push(action.name);

    // Add examples as prompts if they exist
    if (action.examples && action.examples.length > 0) {
      server.prompt(
        `${action.name}-examples`,
        {
          showIndex: z
            .string()
            .optional()
            .describe("Example index to show (number)"),
        },
        (args) => {
          const showIndex = args.showIndex
            ? parseInt(args.showIndex)
            : undefined;
          const examples = action.examples.flat();
          const selectedExamples =
            typeof showIndex === "number" ? [examples[showIndex]] : examples;

          const exampleText = selectedExamples
            .map(
              (ex, idx) => `
Example ${idx + 1}:
Input: ${JSON.stringify(ex.input, null, 2)}
Output: ${JSON.stringify(ex.output, null, 2)}
Explanation: ${ex.explanation}
            `,
            )
            .join("\n");

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Examples for ${action.name}:\n${exampleText}`,
                },
              },
            ],
          };
        },
      );
    }
  }

  return server;
}
/**
 * Helper to start the MCP server with stdio transport
 *
 * @param actions - The actions to expose to the MCP server
 * @param PharosAgentKit - The Pharos agent kit
 * @param options - The options for the MCP server
 * @returns The MCP server
 * @throws Error if the MCP server fails to start
 * @example
 * import { ACTIONS } from "./actions";
 * import { startMcpServer } from "./mcpWrapper";
 *
 * const PharosAgentKit = new PharosAgentKit();
 *
 * startMcpServer(ACTIONS, PharosAgentKit, {
 *   name: "actions",
 *   version: "1.0.0"
 * });
 */
export async function startMcpServer(
  actions: Record<string, Action>,
  PharosAgentKit: PharosAgentKit,
  options: {
    name: string;
    version: string;
  },
) {
  try {
    console.error("MCP server starting...");
    const server = createMcpServer(actions, PharosAgentKit, options);
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server started");
    return server;
  } catch (error) {
    console.error("Error starting MCP server", error);
    throw error;
  }
}
