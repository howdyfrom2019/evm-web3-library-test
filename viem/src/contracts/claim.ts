import { sendTransaction } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import client from "../lib/client";
import { lineaSepolia } from "viem/chains";

const transaction = claimTo({
  contract: {
    client: client,
    address: "0x354015c26F39eB893e0Eb2FB185F295B2C27e029",
    chain: {
      id: lineaSepolia.id,
      rpc: lineaSepolia.rpcUrls.default.http[0],
    },
  },
  to: "0x3BcdbD203c483eE34E275adB1EF7447376a70Cd0",
  quantity: BigInt(1),
});

const { transactionHash } = await sendTransaction({
  transaction,
  account,
});
