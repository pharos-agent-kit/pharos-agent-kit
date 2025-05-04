import { StructuredTool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { Address } from 'viem';
import { z } from "zod";

const PharosERC721MintInputSchema = z.object({
  recipient: z.string(),
  tokenAddress: z.string(),
  tokenId: z.string().or(z.number()),
});

export class PharosERC721MintTool extends StructuredTool<typeof PharosERC721MintInputSchema> {
  name = "pharos_erc721_mint";
  description = `Mint an NFT (ERC721 token).

    Parameters:
    - recipient: The wallet address that will receive the minted NFT.
    - tokenAddress: The NFT contract address.
    - tokenId: The ID of the NFT to mint.`;
  schema = PharosERC721MintInputSchema;

  constructor(private readonly pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: z.infer<typeof PharosERC721MintInputSchema>): Promise<string> {
    try {
      const mint = await this.pharosKit.mintERC721(
        input.recipient as Address,
        input.tokenAddress as Address,
        BigInt(input.tokenId)
      );

      if (mint === "") {
        throw new Error("Minting failed");
      }

      return JSON.stringify({
        status: "success",
        mint,
        recipient: input.recipient,
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
