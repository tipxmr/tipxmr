import {
  MoneroNetworkType,
  MoneroWalletKeys,
  MoneroWalletListener,
  createWalletFull,
  createWalletKeys,
} from "monero-ts";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { env } from "~/env";

interface IWalletContext {
  wallet: MoneroWalletKeys | null;
  syncState: boolean;
  setDoRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  doRefetch?: boolean;
  percentage?: number;
  currentBlock?: number;
  endHeight?: number;
}

const WalletContext = createContext<IWalletContext>({
  wallet: null,
  syncState: false,
});

const server = {
  uri: "stagenet.community.rino.io:38081",
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<MoneroWalletKeys | null>(null);
  const [syncState, setSyncState] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [endHeight, setEndHeight] = useState(0);
  const [doRefetch, setDoRefetch] = useState(false);

  const primaryAddress = localStorage.getItem("primaryAddress");
  const privateViewKey = localStorage.getItem("privateViewKey");

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
      setSyncState(isConnected);
      setWallet(openedWallet);
    };

    handleOpenWallet().catch(console.error);
  }, [primaryAddress, privateViewKey, doRefetch]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        syncState,
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
