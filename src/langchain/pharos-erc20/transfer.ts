import { StructuredTool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { Address } from 'viem';
import { z } from "zod";

const PharosERC20TransferInputSchema = z.object({
  amount: z.string().min(1, "Amount must not be empty"),
  recipient: z.string(),
  tokenAddress: z.string().optional(),
});

export class PharosERC20TransferTool extends StructuredTool<typeof PharosERC20TransferInputSchema> {
  name = "pharos_erc20_transfer";
  description = `Transfer ETH or ERC20 tokens to another wallet.

  Parameters:
  - amount: The amount of tokens to transfer as a string (e.g., "1.5") (required).
  - recipient: The recipient's wallet address (required).
  - tokenAddress: Optional ERC20 token address. If not provided, transfers ETH`;
  schema = PharosERC20TransferInputSchema;

  constructor(private readonly pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: z.infer<typeof PharosERC20TransferInputSchema>): Promise<string> {
    try {
      const transfer = await this.pharosKit.transfer(input.recipient as Address, parseFloat(input.amount), input.tokenAddress as `0x${string}` | undefined);
      if (!transfer) {
        throw new Error("Transfer failed");
      }
      return JSON.stringify({
        status: "success",
        hash: transfer,
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
