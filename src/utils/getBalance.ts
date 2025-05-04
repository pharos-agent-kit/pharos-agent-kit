import { parseAbi, Address } from 'viem';
import { PharosAgentKit } from '../agent';

const erc20Abi = parseAbi(['function balanceOf(address) view returns (uint256)']);

/**
 * Get ERC20 token balance
 */
export async function getERC20Balance(agent: PharosAgentKit, tokenAddress: Address): Promise<bigint> {
  const balance = await agent.publicClient.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [agent.wallet_address],
  });

  return balance;
}

/**
 * Get native coin balance
 */
export async function getBalance(agent: PharosAgentKit): Promise<bigint> {
  const balance = await agent.publicClient.getBalance({
    address: agent.wallet_address,
  });

  return balance;
}