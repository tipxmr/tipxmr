import { useQueryClient } from "@tanstack/react-query";
import {
  MoneroWallet,
  MoneroWalletFull,
  MoneroWalletListener,
} from "monero-javascript";
import React, {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

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
  received?: MoneroWallet;
  sent?: MoneroWallet;
  sync: {
    height: number;
    startHeight: number;
    endHeight: number;
    percentDone: number;
    message: string;
  };
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

function useWalletListener() {
  const store = useRef(initialState);
  const subscribers = useRef(new Set<Callback>());

  const getState = useCallback(() => {
    return store.current;
  }, []);

  const setState = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };

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
        newUnlockedBalance: BigInteger
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
        message: string
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

  //   return listener;

  return {
    getState,
    subscribe,
    listener,
  };
}

function useWallet<T>(
  instance: MoneroWalletFull,
  selector: (store: Store) => T
) {
  // const selector = (id: unknown) => id;

  const store = useWalletListener();

  const subscribe = useEvent(() => {
    instance.addListener(store.listener);
    instance.setSyncHeight(1200000);
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

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}

export default useWallet;

function createWalletStateListener() {
  function useStoreData() {
    const store = useRef<Store>(initialState);
    const subscribers = useRef(new Set<Callback>());

    const get = useCallback(() => {
      return store.current;
    }, []);

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = (callback: Callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    };

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const WalletStateContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <WalletStateContext.Provider value={useStoreData()}>
        {children}
      </WalletStateContext.Provider>
    );
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): SelectorOutput {
    const store = useContext(WalletStateContext);

    if (!store) {
      throw Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(store.get())
    );

    return state;
  }

  return {
    Provider,
    useWalletStateListener: useStore,
    // setWallet
  };

  // function useStore<SelectorOutput>(
  //   selector: (store: Store) => SelectorOutput
  // ): [SelectorOutput, (value: Partial<Store>) => void] {
  //   const store = useContext(WalletStateContext);

  //   if (!store) {
  //     throw Error("Store not found");
  //   }

  //   const state = useSyncExternalStore(
  //     store.subscribe,
  //     () => selector(store.get()),
  //     () => selector(store.get())
  //   );

  //   return [state, store.set];
  // }

  // return {
  //   Provider,
  //   useWalletStateListener: useStore,
  // };
}
