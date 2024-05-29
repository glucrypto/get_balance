import BigNumber from "bignumber.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { createPublicClient, formatEther, http, toHex } from "viem";
import { arbitrum, mainnet } from "viem/chains";
import * as yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getBlocks } from "./dates";

dotenv.config();
export function help() {
  console.log("-".repeat(27));
  console.log("Accounting");
  console.log("Address and chainId inputs");
  console.log("-".repeat(27));
  console.log("Usage:");
  console.log("  node index.js --address ADDRESS --chain arbitrum --year 2023");

  console.log("-".repeat(27));
  process.exit();
}

const args = yargs
  .default(hideBin(process.argv))
  .option("address", {
    alias: "a",
    type: "string",
    description: "The address to check",
    demandOption: true,
  })
  .option("chain", {
    alias: "c",
    type: "string",
    description: "The chain to check",
    demandOption: true,
  })
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "Show help",
    default: false,
  })
  .option("year", {
    alias: "y",
    type: "number",
    description: "The year to check",
    default: 2023,
  })
  .help().argv;

async function main() {
  if (args.help === true) {
    return help();
  }

  let blocks = [];
  let chainId = 1;
  let apiUrl = "";
  let provider;
  if (args.chain === "arbitrum") {
    chainId = arbitrum.chainId;
    apiUrl = `https://arb-mainnet.g.alchemy.com/v2/${process.env.ARB_APIKEY}`;
    provider = createPublicClient({
      chain: arbitrum,
      transport: http(apiUrl),
    });
    blocks = await getBlocks(args.year, provider);
  } else if (args.chain === "ethereum") {
    chainId = mainnet.chainId;
    apiUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ETH_APIKEY}`;
    provider = createPublicClient({
      chain: mainnet,
      transport: http(apiUrl),
    });
    blocks = await getBlocks(args.year, provider);
  } else {
    console.log("Chain not supported");
    process.exit(1);
  }
  console.log(`Address: ${args.address}`);
  console.log(`  Chain: ${args.chain}`);
  console.log(`   Year: ${args.year}`);
  console.log(`Address,Balance (ETH)`);
  for (const b of blocks) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: chainId,
        method: "eth_getBalance",
        params: [args.address, toHex(b.block)],
      }),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let balance = data.result;
    console.log(
      `${b.date.substring(0, 10)},${formatEther(BigNumber(balance))}`
    );
  }
  console.log(
    "\nCopy to Google Sheets, select column, Data > Split text to columns"
  );
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.log(error["response"]);
    process.exit(1);
  }
};

runMain();
