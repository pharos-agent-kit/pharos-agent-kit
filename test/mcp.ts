import { startMcpServer } from "../src/mcp";
import { ACTIONS } from "../src/actions";
import { PharosAgentKit } from "../src/agent";
import * as dotenv from "dotenv";

dotenv.config();

const agent = new PharosAgentKit(
  process.env.PHAROS_PRIVATE_KEY!,
  process.env.RPC_URL!,
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  },
);

const finalActions = {
  ...ACTIONS,
};

startMcpServer(finalActions, agent, { name: "pharos-agent", version: "0.0.1" });
