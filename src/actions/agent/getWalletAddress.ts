import { Action } from "../../types/action";
import { PharosAgentKit } from "../../agent";
import { z } from "zod";
import { get_wallet_address } from "../../tools/agent";

const getWalletAddressAction: Action = {
  name: "GET_WALLET_ADDRESS",
  similes: ["wallet address", "address", "wallet"],
  description: "Get wallet address of the agent",
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          address: "0x1234567890abcdef",
        },
        explanation: "The agent's wallet address is 0x1234567890abcdef",
      },
    ],
  ],
  schema: z.object({}),
  handler: async (agent: PharosAgentKit) => ({
    status: "success",
    address: get_wallet_address(agent),
  }),
};

export default getWalletAddressAction;
