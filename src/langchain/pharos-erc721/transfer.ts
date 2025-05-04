import { StructuredTool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { Address } from 'viem';
import { z } from "zod";

const PharosERC721TransferInputSchema = z.object({
  amount: z.string().min(1, "Amount must not be empty"),
  recipient: z.string(),
  tokenAddress: z.string(),
  tokenId: z.string().min(1, "Token ID must not be empty"),
});

export class PharosERC721TransferTool extends StructuredTool<typeof PharosERC721TransferInputSchema> {
  name = "pharos_erc721_transfer";
  description = `Transfer an NFT (ERC721 token) to another wallet address.

  Parameters:
  - amount: The amount to transfer as a string (typically "1" for NFTs).
  - recipient: The recipient's wallet address.
  - tokenAddress: The NFT contract address.
  - tokenId: The ID of the specific NFT to transfer as a string.`;
  schema = PharosERC721TransferInputSchema;

  constructor(private readonly pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: z.infer<typeof PharosERC721TransferInputSchema>): Promise<string> {
    try {
      const transfer = await this.pharosKit.transferERC721(
        input.recipient as Address,
        Number(input.amount),
        input.tokenAddress as `0x${string}`,
        input.tokenId
      );

      if (!transfer) {
        throw new Error("Transfer failed");
      }

      return JSON.stringify({
        status: "success",
        transfer,
        tokenAddress: input.tokenAddress,
        tokenId: input.tokenId,
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
