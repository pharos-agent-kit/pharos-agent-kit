import { StructuredTool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { Address } from 'viem';
import { z } from "zod";

const PharosERC721BalanceInputSchema = z.object({
  tokenAddress: z.string(),
});

export class PharosERC721BalanceTool extends StructuredTool<typeof PharosERC721BalanceInputSchema> {
  name = "pharos_erc721_balance";
  description = `Get the balance of ERC721 tokens (NFTs) for the connected wallet.

  Parameters:
  - tokenAddress: The contract address of the NFT collection.`;
  schema = PharosERC721BalanceInputSchema;

  constructor(private readonly pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: z.infer<typeof PharosERC721BalanceInputSchema>): Promise<string> {
    try {
      const balance = await this.pharosKit.getERC721Balance(input.tokenAddress as Address);

      return JSON.stringify({
        status: "success",
        balance,
        tokenAddress: input.tokenAddress,
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
