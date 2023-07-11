import {
  MoneroWallet,
  MoneroWalletKeys,
  MoneroWalletListener,
} from "monero-javascript";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

// (!) Approximate behavior
// eslint-disable-next-line @typescript-eslint/ban-types
function useEvent<T extends Function>(handler: T) {
  const handlerRef = useRef<T | null>(null);

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: unknown[]) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;
    return fn?.(...args);
  }, []);
}

interface Store {
  balance: {
    locked: bigint;
    unlocked: bigint;
  };
  block: {
    height: number;
  };
  sync: {
    height: number;
    startHeight: number;
    endHeight: number;
    percentDone: number;
    message: string;
  };
  received?: MoneroWallet;
  sent?: MoneroWallet;
}

type Callback = () => void;

const initialState = {
  balance: {
    locked: 0n,
    unlocked: 0n,
  },
  block: {
    height: 0,
  },
  sync: {
    height: 0,
    startHeight: 0,
    endHeight: 0,
    percentDone: 0,
    message: "",
  },
} as Store;

function useCreateWalletListener() {
  const store = useRef(initialState);
  const subscribers = useRef(new Set<Callback>());

  const getState = useCallback(() => {
    return store.current;
  }, []);

  const setState = useCallback((value: Partial<Store>) => {
    store.current = {
      ...store.current,
      ...value,
    };

    subscribers.current.forEach((callback) => {
      callback();
    });
  }, []);

  const subscribe = useCallback((callback: Callback) => {
    subscribers.current.add(callback);

    return () => {
      subscribers.current.delete(callback);
    };
  }, []);

  const listener = useMemo(() => {
    return new (class Listener extends MoneroWalletListener {
      onBalancesChanged(
        newBalance: BigInteger,
        newUnlockedBalance: BigInteger,
      ): void {
        const locked = BigInt(newBalance.valueOf());
        const unlocked = BigInt(newUnlockedBalance.valueOf());

        setState({
          balance: {
            locked,
            unlocked,
          },
        });
      }

      onNewBlock(height: number): void {
        setState({
          block: {
            height,
          },
        });
      }

      onOutputReceived(output: MoneroWallet): void {
        setState({
          received: output,
        });
      }

      onOutputSent(output: MoneroWallet) {
        setState({
          sent: output,
        });
      }

      onSyncProgress(
        height: number,
        startHeight: number,
        endHeight: number,
        percentDone: number,
        message: string,
      ): void {
        setState({
          sync: {
            height: height,
            startHeight: startHeight,
            endHeight: endHeight,
            percentDone: Math.floor(percentDone * 100),
            message: message,
          },
        });
      }
    })();
  }, [setState]);

  return {
    getState,
    subscribe,
    listener,
  };
}

// FIXME: MoneroWallet in xmr.d.ts
// type MoneroWallet = MoneroWalletFull | MoneroWalletKeys | null;

export function createWalletStateListener() {
  function useStoreData() {
    const walletRef = useRef<MoneroWalletKeys | undefined | null>();

    const setWallet = useCallback(
      (wallet: MoneroWalletKeys | undefined | null) => {
        walletRef.current = wallet;
      },
      [],
    );

    const getWallet = useCallback(() => {
      return walletRef.current;
    }, []);

    const store = useCreateWalletListener();

    return {
      listener: store.listener,
      subscribe: store.subscribe,
      getState: store.getState,
      setWallet,
      getWallet,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const WalletStateContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    const value = useStoreData();

    return (
      <WalletStateContext.Provider value={value}>
        {children}
      </WalletStateContext.Provider>
    );
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ) {
    const store = useContext(WalletStateContext);

    if (!store?.listener || !store.subscribe || !store.getState) {
      throw Error("TypeScript isn't perfect");
    }

    return useSyncExternalStoreWithSelector<Store, SelectorOutput>(
      store.subscribe,
      store.getState,
      store.getState,
      selector,
    );
  }

  function useSetWallet(instance: MoneroWalletKeys | null) {
    const store = useContext(WalletStateContext);

    if (!store || !instance) {
      // FIXME: A returning user with an existing session won't be able to use his wallet
      // because the wallet will be closed after a (hot-)reload and needs to be opened first.
      throw Error("No hot-reload for you, sorry");
    }

    const subscribe = useEvent(() => {
      instance.addListener(store.listener);
      instance.setRestoreHeight(1230000);
      instance.startSyncing();

      return () => {
        instance.stopSyncing();
        instance.removeListener(store.listener);
      };
    });

    useEffect(() => {
      const unsubscribe = subscribe();

      return () => {
        unsubscribe();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return {
    Provider,
    useWalletStateListener: useStore,
    useSetWallet,
  };
}
