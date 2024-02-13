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
} from "react";

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
  const [doRefetch, setDoRefetch] = useState(false);

  const primaryAddress = localStorage.getItem("address");
  const privateViewKey = localStorage.getItem("key");

  useEffect(() => {
    const handleOpenWallet = async () => {
      if (!primaryAddress || !privateViewKey) return null;

      // TODO does this even open?
      const openedWallet = await createWalletFull({
        primaryAddress,
        privateViewKey,
        networkType: MoneroNetworkType.STAGENET,
        server,
      });

      await openedWallet.addListener(
        new (class extends MoneroWalletListener {
          async onSyncProgress(
            height: number,
            startHeight: number,
            endHeight: number,
            percentDone: number,
            message: string,
          ) {
            const percentage = Math.floor(percentDone);
            setPercentage(percentage);
            setEndHeight(endHeight);
            setCurrentBlock(height);
          }
        })(),
      );
      const startHeight = 10000;
      await openedWallet.setRestoreHeight(startHeight);
      await openedWallet.startSyncing();

      const isConnected = await openedWallet.isViewOnly();
      setIsSyncing(isConnected);
      setWallet(openedWallet);
    };

    handleOpenWallet().catch(console.error);
  }, [primaryAddress, privateViewKey, doRefetch]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isSyncing,
        truncatedHashId,
        setTruncatedHashId,
        setDoRefetch,
        doRefetch,
        endHeight,
        percentage,
        currentBlock,
      }}
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
