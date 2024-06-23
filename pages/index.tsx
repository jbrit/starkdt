import Image from "next/image";
import { Inter } from "next/font/google";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { IsBrowser } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContractInfo } from "@/actions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { primaryWallet } = useDynamicContext();

  const {
    data: walletData,
    isSuccess: walletFetched,
    isLoading: walletLoading,
    isError: walletError,
  } = useQuery({
    queryKey: ["primaryWallet"],
    queryFn: async () => await getContractInfo(primaryWallet?.address!),
    enabled: !!primaryWallet?.address,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["primaryWallet"] });
  }, [primaryWallet?.address]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className="text-3xl font-bold mb-20">
        Stark<span className=" border-b-2 border-white">dt</span>
      </div>
      <IsBrowser>
        <div className="mb-4">
          <DynamicWidget />
        </div>
        <div className="border border-white p-4 text-center rounded-lg mb-12">
          {primaryWallet ? (
            <>{primaryWallet.address}</>
          ) : (
            "Wallet Not Connected"
          )}
        </div>
        {!!primaryWallet && (
          <>
            <div className="text-lg font-bold mb-2">Account Information</div>
            <div className="border border-white py-2 text-center rounded-lg mb-12">
              {walletError && (
                <div className=" p-2">Error Fetching Info from Wallet</div>
              )}
              {walletLoading && <div className=" p-2">Loading...</div>}
              {walletFetched && walletData.isAccount ? (
                <>
                  <div className=" p-2 border-b border-white">
                    {walletData.type}({walletData.version})
                  </div>
                  <div className=" p-2 border-b border-white">
                    Classhash: {walletData.classHash}
                  </div>
                  <div className=" p-2 border-b border-white">
                    Blockhash: {walletData.blockHash}
                  </div>
                  <div className=" p-2 border-b border-white">
                    Created At:{" "}
                    {new Date(
                      walletData.creationTimestamp * 1000
                    ).toLocaleString()}
                  </div>
                  <div className=" p-2 border-b border-white">
                    Number of transactions: {Number(walletData.nonce)}
                  </div>
                </>
              ) : (
                walletFetched && (
                  <div className=" p-2">
                    Could not retrieve information for this account{" "}
                  </div>
                )
              )}
            </div>
            {walletFetched && walletData.isAccount && (
              <>
                <div className="text-lg font-bold mb-2">
                  Tokens held and bubble maps
                </div>
                <div className=" flex justify-center">
                  <span className="border border-white rounded-md p-3 cursor-pointer pointer-events-none mr-4">
                    0.0123 STRK
                  </span>
                  <span className="border border-white rounded-md p-3 cursor-pointer pointer-events-none ml-4">
                    0.0367 ETH
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </IsBrowser>
    </main>
  );
}
