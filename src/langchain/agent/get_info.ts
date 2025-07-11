import { Tool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { get_info } from "../../tools/agent";

export class PharosGetInfoTool extends Tool {
  name = "pharos_get_info";
  description =
    "Get detailed and latest information about any topic using Perplexity AI. Input should be a question or topic to get information about.";

  constructor(private pharosKit: PharosAgentKit) {
    super();
  }

  private validateInput(input: string): void {
    if (typeof input !== "string" || input.trim().length === 0) {
      throw new Error("Input must be a non-empty string question");
    }
  }

  protected async _call(input: string): Promise<string> {
    try {
      this.validateInput(input);
      const result = await get_info(this.pharosKit, input.trim());

      return JSON.stringify({
        status: "success",
        message: "Information retrieved successfully",
        content: result,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
