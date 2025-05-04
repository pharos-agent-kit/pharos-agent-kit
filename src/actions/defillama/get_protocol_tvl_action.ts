import { z } from "zod";
import { PharosAgentKit } from "../../agent";
import { Action } from "../../types/action";

const getProtocolTvlAction: Action = {
  name: "DEFILLAMA_GET_PROTOCOL_TVL",
  similes: [
    "get protocol tvl",
    "fetch protocol tvl",
    "check protocol tvl",
    "get total value locked",
    "fetch total value locked",
  ],
  description:
    "Fetches the Total Value Locked (TVL) for a protocol using the DeFiLlama API. The protocol name should match the DeFiLlama protocol identifier.",
  examples: [
    [
      {
        input: {
          protocolName: "uniswap-v3",
        },
        output: {
          status: "success",
          summary: {
            tvl: 98274459992.88,
            protocolName: "uniswap-v3",
          },
        },
        explanation:
          "The user wants to fetch the TVL for Uniswap V3 protocol. The action returns the current TVL in USD.",
      },
    ],
  ],
  schema: z.object({
    protocolName: z
      .string()
      .describe(
        "The DeFiLlama protocol identifier (e.g. 'aave-v3', 'uniswap-v3')",
      ),
  }),
  handler: async (agent: PharosAgentKit, input: any) => {
    try {
      const tvl = await agent.fetchProtocolTvl(input.protocolName);

      return {
        status: "success",
        summary: {
          tvl,
          protocolName: input.protocolName,
        },
      };
    } catch (error: any) {
      return {
        status: "error",
        error: error.message,
      };
    }
  },
};

export default getProtocolTvlAction;
