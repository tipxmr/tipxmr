import {
  MoneroNetworkType,
  MoneroWalletKeys,
  createWalletKeys,
} from "monero-ts";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WalletContext = createContext<MoneroWalletKeys | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<MoneroWalletKeys | null>(null);
  const primaryAddress = localStorage.getItem("primaryAddress");
  const privateViewKey = localStorage.getItem("privateViewKey");

  useEffect(() => {
    const handleOpenWallet = async () => {
      if (!primaryAddress || !privateViewKey) return null;
      console.log({ privateViewKey, primaryAddress });
      // TODO does this even open?
      const openedWallet = await createWalletKeys({
        primaryAddress,
        privateViewKey,
        networkType: MoneroNetworkType.STAGENET,
      });

      console.log({ openedWallet });
      setWallet(openedWallet);
    };

    handleOpenWallet();
  }, [primaryAddress, privateViewKey]);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined)
    throw new Error("useWallet must be within WalletProvider");
  return context;
};
