import { createThirdwebClient } from "thirdweb";
import { getOwnedTokenIds } from "thirdweb/extensions/erc721";
import { lineaSepolia } from "viem/chains";
import client from "../lib/client";

async function fetchOwnedNFTS() {
  try {
    const ownedNFTs = await getOwnedTokenIds({
      contract: {
        client: client,
        address: "0x354015c26F39eB893e0Eb2FB185F295B2C27e029",
        chain: {
          id: lineaSepolia.id,
          rpc: lineaSepolia.rpcUrls.default.http[0],
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
