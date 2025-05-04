import { PharosAgentKit } from "../../index";
import { pharosDevnet } from "../../network";
import { Account, Address, erc20Abi, isAddress } from "viem";
import { getTokenDecimals, formatPharos, getERC20Balance } from "../../utils/index";

/**
 * Transfer ETH or ERC-20 tokens
 * @param agent PharosAgentKit instance
 * @param amount Amount to transfer as a string (e.g., "1.5" for 1.5 tokens)
 * @param recipient Recipient address
 * @param tokenAddress Optional ERC20 token address. If not provided, transfers ETH
 * @returns Promise with transaction result
 */
export async function transfer(
  agent: PharosAgentKit,
  amount: string,
  recipient: Address,
  tokenAddress?: Address,
): Promise<string> {
  console.log(`Transferring ${amount} to ${recipient}...`);

  if (Number(amount) <= 0) {
    const errorMsg = "Transfer amount must be greater than 0";
    throw new Error(errorMsg);
  }

  if (!isAddress(recipient)) {
    const errorMsg = `Invalid recipient address: ${recipient}`;
    throw new Error(errorMsg);
  }

  if (!agent.walletClient) {
    const errorMsg = "Wallet client is not initialized";
    throw new Error(errorMsg);
  }

  try {
    const account = agent.walletClient.account as Account;
    if (!account) {
      throw new Error("Wallet account is not initialized");
    }

    // Native token transfer case
    if (!tokenAddress) {
      if (!agent.publicClient) {
        throw new Error("Public client is not initialized");
      }

      const formattedAmount = formatPharos(amount, 18);
      if (!formattedAmount) {
        throw new Error("Failed to format amount");
      }

      const ethBalance = await agent.getBalance();
      if (Number(ethBalance) < Number(formattedAmount)) {
        throw new Error("Insufficient ETH balance");
      }

      const hash = await agent.walletClient.sendTransaction({
        account,
        chain: pharosDevnet,
        to: recipient,
        value: formattedAmount,
      });

      if (!hash) {
        throw new Error("Transaction failed to send");
      }

      const transactionReceipt = await agent.publicClient.waitForTransactionReceipt({
        hash,
      });

      if (!transactionReceipt || transactionReceipt.status === "reverted") {
        const errorMsg = `Transaction failed: ${JSON.stringify(transactionReceipt)}`;
        throw new Error(errorMsg);
      }

      return `Transferred ${amount} to ${recipient}.\nTransaction hash for the transfer: ${hash}, receipt: ${transactionReceipt?.transactionHash}`;
    }

    // ERC-20 token transfer case
    const decimals = await getTokenDecimals(agent, tokenAddress);
    if (decimals === null || decimals === undefined) {
      throw new Error(`Failed to retrieve token decimals for contract: ${tokenAddress}`);
    }
    
    const formattedAmount = formatPharos(amount, decimals);
    if (!formattedAmount) {
      throw new Error("Failed to format token amount");
    }
    
    const tokenBalance = await getERC20Balance(agent, tokenAddress);
    if (Number(tokenBalance) < Number(formattedAmount)) {
      throw new Error(`Insufficient balance for token: ${tokenAddress}`);
    }
    const hash = await agent.walletClient.writeContract({
      account,
      chain: pharosDevnet,
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [recipient, formattedAmount],
    });

    if (!hash) {
      throw new Error("Token transfer transaction failed to send");
    }

    return `Transferred ${amount} to ${recipient}.\nTransaction hash for the transfer: ${hash}`;
  } catch (error) {
    const errorMsg = error instanceof Error ? error?.message : String(error);
    console.error(errorMsg);
    throw error;
  }
}