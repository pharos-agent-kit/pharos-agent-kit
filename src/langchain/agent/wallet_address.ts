import { Tool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";

export class PharosGetWalletAddressTool extends Tool {
  name = "pharos_get_wallet_address";
  description = `Get the wallet address of the agent`;

  constructor(private pharosKit: PharosAgentKit) {
    super();
  }

  async _call(_input: string): Promise<string> {
    return this.pharosKit.wallet_address.toString();
  }
}
