import { encodeFunctionData } from "viem";
import { PharosWalletProvider } from "../wallet-providers";
import { erc20Abi } from "viem";

/**
 * Approves a spender to spend tokens on behalf of the owner
 *
 * @param wallet - The wallet provider
 * @param tokenAddress - The address of the token contract
 * @param spenderAddress - The address of the spender
 * @param amount - The amount to approve in atomic units (wei)
 * @returns A success message or error message
 */
export async function approve(
  wallet: PharosWalletProvider,
  tokenAddress: string,
  spenderAddress: string,
  amount: bigint,
): Promise<string> {
  try {
    const data = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress as `0x${string}`, amount],
    });

    const txHash = await wallet.sendTransaction({
      to: tokenAddress as `0x${string}`,
      data,
    });

    await wallet.waitForTransactionReceipt(txHash);

    return `Successfully approved ${spenderAddress} to spend ${amount} tokens`;
  } catch (error) {
    return `Error approving tokens: ${error}`;
  }
}

/**
 * Scales a gas estimate by a given multiplier.
 *
 * This function converts the gas estimate to a number, applies the multiplier,
 * rounds the result to the nearest integer, and returns it as a bigint.
 *
 * @param gas - The original gas estimate (bigint).
 * @param multiplier - The factor by which to scale the estimate.
 * @returns The adjusted gas estimate as a bigint.
 */
export function applyGasMultiplier(gas: bigint, multiplier: number): bigint {
  return BigInt(Math.round(Number(gas) * multiplier));
}

export * from "../utils/formatPharos";
export * from "../utils/getTokenDecimals";
export * from "../utils/isContract";
export * from "../utils/getBalance";
export * from "../utils/approveTokens";
