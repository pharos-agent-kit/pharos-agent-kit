import createImageAction from "./agent/createImage";
import getWalletAddressAction from "./agent/getWalletAddress";
import getInfoAction from "./agent/get_info";
import { elfaPingAction } from "./elfa_ai/elfa_ai_actions";
import { elfaApiKeyStatusAction } from "./elfa_ai/elfa_ai_actions";
import { elfaGetSmartMentionsAction } from "./elfa_ai/elfa_ai_actions";
import { elfaGetTopMentionsByTickerAction } from "./elfa_ai/elfa_ai_actions";
import { elfaSearchMentionsByKeywordsAction } from "./elfa_ai/elfa_ai_actions";
import { elfaTrendingTokensAction } from "./elfa_ai/elfa_ai_actions";
import { elfaSmartTwitterAccountStats } from "./elfa_ai/elfa_ai_actions";
import getCoingeckoLatestPoolsActions from "./coingecko/getCoingeckoLatestPools";
import getCoingeckoTokenPriceDataAction from "./coingecko/getCoingeckoTokenPriceData";
import getCoingeckoTopGainersAction from "./coingecko/getCoingeckoTopGainers";
import getCoingeckoTrendingPoolsAction from "./coingecko/getCoingeckoTrendingPools";
import getCoingeckoTrendingTokensAction from "./coingecko/getCoingeckoTrendingTokens";
import fetchPriceAction from "./defillama/fetch_price_action";
import getProtocolTvlAction from "./defillama/get_protocol_tvl_action";
import tokenDataByTickerAction from "./dexscreener/tokenDataByTicker";

export const ACTIONS = {
  GET_INFO_ACTION: getInfoAction,
  WALLET_ADDRESS_ACTION: getWalletAddressAction,
  CREATE_IMAGE_ACTION: createImageAction,
  ELFA_PING_ACTION: elfaPingAction,
  ELFA_API_KEY_STATUS_ACTION: elfaApiKeyStatusAction,
  ELFA_GET_SMART_MENTIONS_ACTION: elfaGetSmartMentionsAction,
  ELFA_GET_TOP_MENTIONS_BY_TICKER_ACTION: elfaGetTopMentionsByTickerAction,
  ELFA_SEARCH_MENTIONS_BY_KEYWORDS_ACTION: elfaSearchMentionsByKeywordsAction,
  ELFA_TRENDING_TOKENS_ACTION: elfaTrendingTokensAction,
  ELFA_SMART_TWITTER_ACCOUNT_STATS_ACTION: elfaSmartTwitterAccountStats,
  GET_COINGECKO_LATEST_POOLS_ACTION: getCoingeckoLatestPoolsActions,
  GET_COINGECKO_TOKEN_PRICE_DATA_ACTION: getCoingeckoTokenPriceDataAction,
  GET_COINGECKO_TOP_GAINERS_ACTION: getCoingeckoTopGainersAction,
  GET_COINGECKO_TRENDING_POOLS_ACTION: getCoingeckoTrendingPoolsAction,
  GET_COINGECKO_TRENDING_TOKENS_ACTION: getCoingeckoTrendingTokensAction,
  DEFILLAMA_FETCH_PRICE: fetchPriceAction,
  DEFILLAMA_GET_PROTOCOL_TVL: getProtocolTvlAction,
  GET_TOKEN_DATA_BY_TICKER: tokenDataByTickerAction,
};

export type { Action, ActionExample, Handler } from "../types/action";
