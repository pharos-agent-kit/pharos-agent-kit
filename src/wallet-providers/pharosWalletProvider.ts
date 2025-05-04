// TODO: Improve type safety
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletProvider } from "./walletProvider";
import {
  TransactionRequest,
  ReadContractParameters,
  ReadContractReturnType,
  ContractFunctionName,
  Abi,
  ContractFunctionArgs,
} from "viem";

/**
 * PharosWalletProvider is the abstract base class for Pharos which offers Pharos compatibility with enhanced parallel processing.
 *
 * @abstract
 */
export abstract class PharosWalletProvider extends WalletProvider {
  /**
   * Sign a message with Pharos's enhanced parallel processing capabilities.
   *
   * @param message - The message to sign.
   * @returns The signed message.
   */
  abstract signMessage(message: string | Uint8Array): Promise<`0x${string}`>;

  /**
   * Sign a typed data with support for Pharos's Special Processing Networks (SPNs).
   *
   * @param typedData - The typed data to sign.
   * @returns The signed typed data.
   */
  abstract signTypedData(typedData: any): Promise<`0x${string}`>;

  /**
   * Sign a transaction utilizing Pharos's parallel transaction processing.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  abstract signTransaction(
    transaction: TransactionRequest,
  ): Promise<`0x${string}`>;

  /**
   * Send a transaction through Pharos's high-throughput network.
   *
   * @param transaction - The transaction to send.
   * @returns The transaction hash.
   */
  abstract sendTransaction(
    transaction: TransactionRequest,
  ): Promise<`0x${string}`>;

  /**
   * Wait for a transaction receipt with Pharos's sub-second finality.
   *
   * @param txHash - The transaction hash.
   * @returns The transaction receipt.
   */
  abstract waitForTransactionReceipt(txHash: `0x${string}`): Promise<any>;

  /**
   * Read a contract with support for Pharos's parallel execution environment.
   *
   * @param params - The parameters to read the contract.
   * @returns The response from the contract.
   */
  abstract readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    const args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(
    params: ReadContractParameters<abi, functionName, args>,
  ): Promise<ReadContractReturnType<abi, functionName, args>>;
}
