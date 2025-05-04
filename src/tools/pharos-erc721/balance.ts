import { PharosAgentKit } from "../../index";
import { Address, parseAbi } from "viem";
import { isContract } from "../../utils";

const erc721Abi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
]);

/**
 * Gets the ERC-721 token balance for a given wallet address
 * 
 * @param agent PharosAgentKit instance
 * @param token_address Address of the ERC-721 token contract
 * @returns Balance as a string
 */
export async function get_erc721_balance(
  agent: PharosAgentKit,
  token_address: Address,
): Promise<string> {
  if (!agent.publicClient || !agent.wallet_address) {
    const errorMsg = "Agent is missing required client or wallet address";
    throw new Error(errorMsg);
  }

  console.log(`Querying NFT balance for ${agent.wallet_address} at ${token_address}...`);

  try {
    // Verify that the token address is a contract
    const isTokenContract = await isContract(agent, token_address);
    if (!isTokenContract) {
      const errorMsg = `Address ${token_address} is not a contract`;
      throw new Error(errorMsg);
    }

    // Get the NFT balance using the ERC721 balanceOf function
    const balance = await agent.publicClient.readContract({
      address: token_address,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [agent.wallet_address],
    });

    if (balance === null || balance === undefined) {
      const errorMsg = "Failed to retrieve NFT balance";
      throw new Error(errorMsg);
    }

    return String(balance);
  } catch (error) {
    const errorMsg = error instanceof Error ? error?.message : String(error);
    console.error(errorMsg);
    throw error;
  }
}