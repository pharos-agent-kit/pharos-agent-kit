import { PharosAgentKit } from "../../agent";

/**
 * Get the agents wallet address
 * @param agent - PharosAgentKit instance
 * @returns string
 */
export function get_wallet_address(agent: PharosAgentKit) {
  // return agent.wallet_address.toBase58();
  return agent.wallet_address;
}
