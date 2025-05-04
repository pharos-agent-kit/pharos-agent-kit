import { StructuredTool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { Address } from 'viem';
import { z } from "zod";

const PharosERC20BalanceInputSchema = z.object({
  contract_address: z.string().optional(),
  ticker: z.string().optional(),
});

export class PharosERC20BalanceTool extends StructuredTool<typeof PharosERC20BalanceInputSchema> {
  name = "pharos_erc20_balance";
  description = `Get the balance of ETH or ERC20 tokens in a Pharos wallet.

  This tool retrieves token balances without requiring a wallet address (uses connected wallet).

  If neither parameter is provided, returns the native ETH token balance.

  Parameters:
  - contract_address: Optional. The contract address of the token.
  - ticker: Optional. The token symbol/ticker (e.g., "USDC").

  One of these parameters can be used to specify a non-ETH token.`;
  schema = PharosERC20BalanceInputSchema;

  constructor(private readonly pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: z.infer<typeof PharosERC20BalanceInputSchema>): Promise<string> {
    try {
      let balance;
      if (input) {
        let contract_address;
        if (input.contract_address) { contract_address = input.contract_address; }
        balance = await this.pharosKit.getBalance(contract_address as Address);
      } else {
        balance = await this.pharosKit.getBalance();
      }

      return JSON.stringify({
        status: "success",
        balance,
        token: input.contract_address || input.ticker || "ETH",
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
