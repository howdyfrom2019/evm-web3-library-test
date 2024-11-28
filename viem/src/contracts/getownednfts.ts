import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { polygonZkEvmCardona } from "viem/chains";
import client from "../lib/client";

async function fetchOwnedNFTS() {
  try {
    const ownedNFTs = await getOwnedNFTs({
      contract: {
        client: client,
        address: "0xaC533ADD8Be2B9D79Ea0Be292b169F80dAd3695a",
        chain: {
          id: polygonZkEvmCardona.id,
          rpc: polygonZkEvmCardona.rpcUrls.default.http[0],
        },
      },
      owner: "0x3BcdbD203c483eE34E275adB1EF7447376a70Cd0",
    });

    console.log(ownedNFTs);
  } catch (error) {
    console.log(error);
  }
}

fetchOwnedNFTS();
