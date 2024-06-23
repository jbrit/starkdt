const VOYAGER_APIKEY = "ALYygbKn4dP7SEDGQHXt6Mu2XYjrJBH46Jr4UTa6";

export async function getContractInfo(contractAddress: string) {
  const response = await fetch(
    `https://sepolia-api.voyager.online/beta/contracts/${contractAddress}`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": VOYAGER_APIKEY,
      },
    }
  );
  return (await response.json()) as {
    address: "0x0350fed2c2d5c81ff2a253ebe1e8f28a4cb32b24ee98d82c6577b520c7768f80";
    blockHash: "0x3af62c2030494fa93ddfdda523e3420dd7797d8057d92c9ef4f37bd95510d35";
    blockNumber: 75591;
    classAlias: "Argent";
    classHash: "0x029927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b";
    contractAlias: null;
    creationTimestamp: 1719092588;
    isAccount: boolean;
    isErcToken: boolean;
    isProxy: false;
    nonce: "0x4";
    verifiedTimestamp: 1715166687;
    type: "ArgentX";
    version: "2.4.3";
    tokenName: null;
    tokenSymbol: null;
  };
}
