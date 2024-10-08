import { createThirdwebClient, readContract } from "thirdweb";
import { lineaSepolia } from "viem/chains";
import client from "../lib/client";

async function fetchBalanceOf() {
  const data = await readContract({
    contract: {
      client: client,
      address: "0x354015c26F39eB893e0Eb2FB185F295B2C27e029",
      chain: {
        id: lineaSepolia.id,
        rpc: lineaSepolia.rpcUrls.default.http[0],
      },
    },
    // method: "function balanceOf(address owner) view returns (uint256)",
    // params: ["0x3BcdbD203c483eE34E275adB1EF7447376a70Cd0"],
    // method:
    //   "function claimCondition() view returns (uint256 currentStartId, uint256 count)",
    // params: [],
    // method: "function primarySaleRecipient() view returns (address)",
    // params: [],
    // method:
    //   "function getSupplyClaimedByWallet(uint256 _conditionId, address _claimer) view returns (uint256 supplyClaimedByWallet)",
    // params: [0n, "0x3BcdbD203c483eE34E275adB1EF7447376a70Cd0"],
    method: "function getBaseURICount() view returns (uint256)",
    params: [],
  });

  console.log(data);
}

fetchBalanceOf();
