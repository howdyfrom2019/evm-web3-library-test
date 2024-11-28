import { createPublicClient, http } from "viem";
import { lineaSepolia } from "viem/chains";

export const client = createPublicClient({
  chain: lineaSepolia,
  transport: http(),
});

async function getReceipt() {
  const receipt = await client.getTransactionReceipt({
    hash: "0x9684033f889b53b85f6e3e39148dccede049bbf6bb38c4f666f82e5431914f65",
  });

  const transferLog = receipt.logs[0];
  const hexTokenId = transferLog?.topics[3]?.slice(2);

  return hexTokenId ? parseInt(hexTokenId, 16) : null;
}

getReceipt().then((res) => console.log(`tokenId:`, res));
