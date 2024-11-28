import { readContract } from "thirdweb";
import { polygonZkEvmCardona } from "viem/chains";
import client from "../lib/client";

async function fetchConditions() {
  try {
    const [startIndex, count] = await readContract({
      contract: {
        client: client,
        address: "0x73a1588aa3016248aCc91A92996dB8aaE5e8527C",
        chain: {
          id: polygonZkEvmCardona.id,
          rpc: polygonZkEvmCardona.rpcUrls.default.http[0],
        },
      },
      method:
        "function claimCondition() view returns (uint256 currentStartId, uint256 count)",
      params: [],
    });

    const claimConditionPromises = Array.from(
      { length: Number(count) },
      (_, index) => {
        const conditionId = BigInt(index) + startIndex;

        return readContract({
          contract: {
            client: client,
            address: "0x73a1588aa3016248aCc91A92996dB8aaE5e8527C",
            chain: {
              id: polygonZkEvmCardona.id,
              rpc: polygonZkEvmCardona.rpcUrls.default.http[0],
            },
          },
          method:
            "function getClaimConditionById(uint256 _conditionId) view returns ((uint256 startTimestamp, uint256 maxClaimableSupply, uint256 supplyClaimed, uint256 quantityLimitPerWallet, bytes32 merkleRoot, uint256 pricePerToken, address currency, string metadata) condition)",
          params: [conditionId],
        });
      }
    );

    const results = await Promise.allSettled(claimConditionPromises);
    const claimConditions = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    console.dir(claimConditions, { depth: 3 });
  } catch (error) {
    console.log(error);
  }
}

fetchConditions();
