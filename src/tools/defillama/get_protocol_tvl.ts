import {
  DEFILLAMA_NETWORK_SLUGS,
  DEFILLAMA_BASE_URL,
  DEFILLAMA_PROTOCOL_SLUGS,
} from "./constants";
import Fuse from "fuse.js";
import axios from "axios";

/**
 * Find the closest matching slug for a given ticker or name
 * @param ticker - The ticker or name to match against available slugs
 * @param category - The category to search in ("protocol" or "network")
 * @returns The best matching slug or empty string if no match found
 */
export function getSlugMatch(
  ticker: string,
  category: "protocol" | "network",
): string[] {
  const slugList =
    category === "protocol"
      ? DEFILLAMA_PROTOCOL_SLUGS
      : DEFILLAMA_NETWORK_SLUGS;

  const fuse = new Fuse(slugList, {
    includeScore: true,
    threshold: 0.3,
  });
  const fuseResults = fuse.search(ticker);

  return fuseResults.slice(0, 4).map((result: any) => result.item);
}

/**
 * Get Total Value Locked (TVL) for a specific protocol
 * @param slug - The protocol slug identifier
 * @returns Promise with TVL information as a formatted string
 */
export async function getProtocolTvl(slug: string): Promise<string> {
  const slugMatches = getSlugMatch(slug, "protocol");

  if (slugMatches.length === 0) {
    throw new Error(
      `No matching protocol slugs found. Here is the list of available protocol slugs: ${DEFILLAMA_PROTOCOL_SLUGS}`,
    );
  }

  let result: number | null = null;
  let usedSlug: string = "";
  let lastError: any = null;

  for (const match of slugMatches) {
    if (DEFILLAMA_PROTOCOL_SLUGS.includes(match)) {
      console.error("match", match);
      try {
        const apiUrl = `${DEFILLAMA_BASE_URL}/tvl/${match}`;
        const response = await axios.get(apiUrl);
        if (response.data) {
          result = response.data;
          usedSlug = match;
          break;
        }
      } catch (e) {
        lastError = e;
      }
    }
  }

  if (result === null) {
    console.error("Error fetching protocol TVL:", lastError);
    throw new Error("Failed to fetch TVL data for any matching protocol slug");
  }

  return `The TVL for ${usedSlug} is ${result} usd dollars`;
}
