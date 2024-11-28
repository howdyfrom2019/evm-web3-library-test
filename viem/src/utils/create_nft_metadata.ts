import * as fs from "fs";

type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  background_color: string;
  external_url: string;
};

const generateNFTMetadata = (
  collectionName: string,
  totalItems: number
): NFTMetadata[] => {
  const metadataArray: NFTMetadata[] = [];

  for (let i = 101; i <= totalItems; i++) {
    const metadata: NFTMetadata = {
      name: `#${i}. ${collectionName}`,
      description: "Ticket for Sparkball entry",
      image:
        "https://xcbt-validation-dev.s3.us-west-1.amazonaws.com/sparkball/xCBT_NFT+(1).png",
      background_color: "#0E0D14",
      external_url: "https://xcbt.io",
    };

    metadataArray.push(metadata);
  }

  return metadataArray;
};

const saveMetadataToFile = (metadata: NFTMetadata[], fileName: string) => {
  const jsonData = JSON.stringify(metadata, null, 2); // JSON 포맷으로 변환
  fs.writeFileSync(fileName, jsonData, "utf-8"); // 파일로 저장
  console.log(`Metadata saved to ${fileName}`);
};

const nftMetadata = generateNFTMetadata("xCBT x SparkBall Ticket", 5000);

saveMetadataToFile(nftMetadata, `nft_metadata_${Date.now()}.json`);
