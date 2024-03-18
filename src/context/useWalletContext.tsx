import {
  MoneroNetworkType,
  type MoneroWalletKeys,
  MoneroWalletListener,
  createWalletFull,
  type MoneroRpcConnection,
} from "monero-ts";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { api } from "~/trpc/react";

interface WalletContextType {
  wallet: MoneroWalletKeys | null;
  isSyncing: boolean;
  truncatedHashId: string | null;
  setTruncatedHashId?: React.Dispatch<React.SetStateAction<string | null>>;
  setDoRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  doRefetch?: boolean;
  percentage?: number;
  currentBlock?: number;
  endHeight?: number;
}

const WalletContext = createContext<WalletContextType>({
  wallet: null,
  isSyncing: false,
  truncatedHashId: null,
});

const server: Partial<MoneroRpcConnection> = {
  uri: "stagenet.community.rino.io:38081",
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<MoneroWalletKeys | null>(null);
  const [truncatedHashId, setTruncatedHashId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [endHeight, setEndHeight] = useState(0);
  const [walletState, setWalletState] = useState<
    "offline" | "connected" | "syncing" | "synced"
  >("offline");
  const [doRefetch, setDoRefetch] = useState(false);

  const { data: currentHeight } =
    api.serverWallet.getCurrentBlockHeight.useQuery();

  useEffect(() => {
    const primaryAddress = localStorage.getItem("address") ?? undefined;
    const privateViewKey = localStorage.getItem("key") ?? undefined;
    const lastSyncHeight = parseInt(localStorage.getItem("height") ?? "1");

    const handleOpenWallet = async () => {
      // TODO does this even open?
      const openedWallet = await createWalletFull({
        primaryAddress,
        privateViewKey,
        networkType: MoneroNetworkType.STAGENET,
        server,
      });
      setWalletState("connected");

      await openedWallet.addListener(
        new (class extends MoneroWalletListener {
          async onSyncProgress(
            height: number,
            startHeight: number,
            endHeight: number,
            percentDone: number,
            message: string,
          ) {
            if (walletState !== "syncing") {
              setWalletState("syncing");
            }
            const percentage = Math.floor(percentDone * 100);
            setPercentage(percentage);
            setEndHeight(endHeight);
            setCurrentBlock(height);
            if (height % 10000 === 0) {
              localStorage.setItem("height", height.toString());
            }
            if (percentDone === 1) {
              setWalletState("synced");
            }
          }
        })(),
      );

      await openedWallet.setRestoreHeight(currentHeight ?? 1562060);
      await openedWallet.startSyncing();

      const isConnected = await openedWallet.isViewOnly();
      setIsSyncing(isConnected);
      setWallet(openedWallet);
    };

    if (primaryAddress && privateViewKey) {
      handleOpenWallet().catch(console.error);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={useMemo(
        () => ({
          currentBlock,
          doRefetch,
          endHeight,
          isSyncing,
          percentage,
          setDoRefetch,
          setTruncatedHashId,
          truncatedHashId,
          wallet,
          walletState,
        }),
        [
          currentBlock,
          doRefetch,
          endHeight,
          isSyncing,
          percentage,
          truncatedHashId,
          wallet,
          walletState,
        ],
      )}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined)
    throw new Error("useWallet must be within WalletProvider");
  return context;
};
