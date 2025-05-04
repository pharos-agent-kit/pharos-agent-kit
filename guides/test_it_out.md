# How to Test It Out

Testing the **Pharos Agent Kit** ensures that all functionalities are working as expected. You can run automated tests or interact with the agent in different ways to verify its operations.

## Running Automated Tests

The project includes test scripts in the `test/` directory. To execute the tests:

1. **Ensure Dependencies are Installed**
   - If you haven't installed the dependencies yet, refer to the [Setup Locally](./setup_locally.md) guide.

2. **Run the Test Script**
   ```bash
   pnpm run test
   ```
   This will run the main test script. Ensure that your environment variables are correctly set in the `.env` file before running the tests.

3. **Run MCP Tests**
   ```bash
   pnpm run test:mcp
   ```
   This will run the Model Context Protocol tests.

4. **Run Vercel AI Tests**
   ```bash
   pnpm run test:vercel-ai
   ```
   This will run tests for the Vercel AI integration.

## Code Examples

### Check ERC20 Token Balance

```typescript
import { PharosAgentKit } from "pharos-agent-kit";

const agent = new PharosAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const balance = await agent.getBalance("0x1234567890123456789012345678901234567890");
console.log("Token Balance:", balance);
```

### Transfer ERC20 Tokens

```typescript
import { PharosAgentKit } from "pharos-agent-kit";

const agent = new PharosAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const txHash = await agent.transfer(
  "0x1234567890123456789012345678901234567890", // to address
  1.5, // amount
  "0xabcdef1234567890abcdef1234567890abcdef12" // token address (optional for native token)
);
console.log("Transfer Transaction:", txHash);
```

### Get CoinGecko Token Data

```typescript
import { PharosAgentKit } from "pharos-agent-kit";

const agent = new PharosAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Get trending tokens
const trending = await agent.getTrendingTokens();
console.log("Trending tokens:", trending);

// Get token price data
const priceData = await agent.getTokenPriceDataUsingCoingecko(
  "0x1234567890123456789012345678901234567890"
);
console.log("Token price data:", priceData);
```

### Get DeFiLlama Protocol TVL

```typescript
import { PharosAgentKit } from "pharos-agent-kit";

const agent = new PharosAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

const tvl = await agent.fetchProtocolTvl("uniswap");
console.log("Uniswap TVL:", tvl);
```

## Using LangChain Tools

```typescript
import { PharosAgentKit, createPharosTools } from "pharos-agent-kit";

const agent = new PharosAgentKit(
  "your-wallet-private-key",
  "https://rpc-url.example.com",
  { OPENAI_API_KEY: "your-openai-api-key" } // optional config
);

// Get all available tools
const tools = createPharosTools(agent);

// Find a specific tool
const getBalanceTool = tools.find(tool => tool.name === "get_erc20_balance");

// Use the tool
if (getBalanceTool) {
  const result = await getBalanceTool.call("0x1234567890123456789012345678901234567890");
  console.log(JSON.parse(result));
}
```

## Best Practices

### Environment Setup
- Verify `.env` file contains correct and secure values
- Ensure all required environment variables are set
- Use a secure wallet that you know the private key for testing purposes

### Testing
- Maintain comprehensive test coverage
- Monitor console logs during testing
- Start with testnet before moving to mainnet

## Troubleshooting

### Test Failures

#### Missing Environment Variables
- **Issue:** Tests fail due to missing environment variables
- **Solution:** Check `.env` file for all required variables

#### Network Problems
- **Issue:** Network-related errors
- **Solution:** Verify internet connection and Pharos RPC endpoint accessibility
