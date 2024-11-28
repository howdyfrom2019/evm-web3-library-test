import { readContract } from "thirdweb";
import { polygonZkEvmCardona } from "viem/chains";
import client from "../lib/client";

async function fetchBalanceOf() {
  const data = await readContract({
    contract: {
      client: client,
      address: "0xaC533ADD8Be2B9D79Ea0Be292b169F80dAd3695a",
      chain: {
        id: polygonZkEvmCardona.id,
        rpc: polygonZkEvmCardona.rpcUrls.default.http[0],
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
    // method: "function getBaseURICount() view returns (uint256)",
    // params: [],

    method: "function symbol() view returns (string)",
    params: [],
  });

  console.log(data);
}

fetchBalanceOf();
