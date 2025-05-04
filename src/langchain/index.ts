export * from "./agent";
export * from "./elfa_ai";
export * from "./defillama";
export * from "./dexscreener";

import type { PharosAgentKit } from "../agent";

import {
  ElfaPingTool,
  ElfaApiKeyStatusTool,
  ElfaGetMentionsTool,
  ElfaTrendingTokensTool,
  ElfaSearchMentionsTool,
  ElfaGetTopMentionsTool,
  ElfaAccountSmartStatsTool,
  getProtocolTvlTool,
} from "./index";

export function createPharosTools(pharosKit: PharosAgentKit) {
  return [
    new ElfaPingTool(pharosKit),
    new ElfaApiKeyStatusTool(pharosKit),
    new ElfaGetMentionsTool(pharosKit),
    new ElfaTrendingTokensTool(pharosKit),
    new ElfaSearchMentionsTool(pharosKit),
    new ElfaGetTopMentionsTool(pharosKit),
    new ElfaAccountSmartStatsTool(pharosKit),



    // DefiLlama
    getProtocolTvlTool(pharosKit),
  ];
}
