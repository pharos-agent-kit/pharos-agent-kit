import { Tool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";

export class PharosTokenDataByTickerTool extends Tool {
  name = "pharos_token_data_by_ticker";
  description = `Get the token data for a given token ticker

  Inputs: ticker is required.
  ticker: string, eg "USDC" (required)`;

  constructor(private pharosKit: PharosAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const ticker = input.trim();
      const tokenData = await this.pharosKit.getTokenDataByTicker(ticker);
      return JSON.stringify({
        status: "success",
        tokenData,
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
