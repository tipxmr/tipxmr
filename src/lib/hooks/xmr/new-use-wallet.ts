import { useQueryClient } from "@tanstack/react-query";
import {
  MoneroWallet,
  MoneroWalletFull,
  MoneroWalletListener,
} from "monero-javascript";
import {
  useCallback,
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

// ############################################################################

// type ListenerState = {
//   balances: {
//     total: bigint;
//     unlocked: bigint;
//   };
//   block: {
//     height: number;
//   };
//   output: {
//     received?: MoneroWallet;
//     sent?: MoneroWallet;
//   };
//   syncProgress: {
//     height: number;
//     startHeight: number;
//     endHeight: number;
//     percentDone: number;
//     message: string;
//   };
// };

// type Callback = () => void;

// const initialState = {
//   balances: {
//     total: 0n,
//     unlocked: 0n,
//   },
//   block: {
//     height: 0,
//   },
//   output: {
//     received: undefined,
//     sent: undefined,
//   },
//   syncProgress: {
//     height: 0,
//     startHeight: 0,
//     endHeight: 0,
//     percentDone: 0,
//     message: "",
//   },
// } as ListenerState;

// class Listener extends MoneroWalletListener {
//   private state = initialState;

//   private subscribers = new Set<Callback>();

//   constructor() {
//     super();
//   }

//   getState() {
//     return this.state;
//   }

//   subscribe(callback: Callback) {
//     this.subscribers.add(callback);

//     return () => {
//       this.subscribers.delete(callback);
//     };
//   }

//   notify() {
//     this.subscribers.forEach((callback) => callback());
//   }

//   onBalancesChanged(
//     newBalance: BigInteger,
//     newUnlockedBalance: BigInteger
//   ): void {
//     const total = BigInt(newBalance.valueOf());
//     const unlocked = BigInt(newUnlockedBalance.valueOf());

//     this.state = {
//       ...this.state,
//       balances: {
//         total: total,
//         unlocked: unlocked,
//       },
//     };

//     this.notify();
//   }

//   onNewBlock(height: number): void {
//     this.state = {
//       ...this.state,
//       block: {
//         height: height,
//       },
//     };

//     this.notify();
//   }

//   onOutputReceived(output: MoneroWallet): void {
//     this.state = {
//       ...this.state,
//       output: {
//         ...this.state.output,
//         received: output,
//       },
//     };

//     this.notify();
//   }

//   onOutputSent(output: MoneroWallet) {
//     this.state = {
//       ...this.state,
//       output: {
//         ...this.state.output,
//         sent: output,
//       },
//     };

//     this.notify();
//   }

//   onSyncProgress(
//     height: number,
//     startHeight: number,
//     endHeight: number,
//     percentDone: number,
//     message: string
//   ): void {
//     this.state = {
//       ...this.state,
//       syncProgress: {
//         height: height,
//         startHeight: startHeight,
//         endHeight: endHeight,
//         percentDone: percentDone,
//         message: message,
//       },
//     };

//     this.notify();
//   }
// }

const WALLET_KEY = "wallet";

interface Store {
  balance: {
    locked: bigint;
    unlocked: bigint;
  };
}

function useWalletListener() {
  const initialState = {} as Store;

  const store = useRef(initialState);

  const getState = useCallback(() => {
    return store.current;
  }, []);

  const setState = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
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
  };
}

function useWallet(instance: MoneroWalletFull) {
  const initialState = {};
  const selector = (id) => id;

  const listener = useWalletListener();

  const subscribe = useEvent(() => {
    instance.addListener(listener);
    instance.setSyncHeight(1200000);
    instance.startSyncing();

    return () => {
      instance.stopSyncing();
      instance.removeListener(listener);
    };
  });

  //   useEffect(() => {
  // const unsubscribe = onSubscribe();
  // return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   const subscribe = (onStoreChange) => {
  //     return store.subscribe(onStoreChange);
  //   };

  //   const getSnapshot = () => {
  //     return selector(store.getState());
  //   };

  //   const getServerSnapshot = () => {
  //     return selector(initialState);
  //   };

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(initialState)
  );

  //   return state;

  // const state = useSyncExternalStore(
  //   listener.subscribe,
  //   () => listener.getState(),
  //   () => listener.getState()
  // );

  // const onSubscribe = useEvent(() => {
  //   instance.addListener(listener);
  //   instance.startSyncing();

  //   return () => {
  //     instance.stopSyncing();
  //     instance.removeListener(listener);
  //   };
  // });

  // useEffect(() => {
  //   const unsubscribe = onSubscribe();
  //   return () => unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return state;
}

export default useWallet;
