import * as Progress from "@radix-ui/react-progress";
import { useAtom } from "jotai";
import { MoneroTxConfig, MoneroTxPriority } from "monero-ts";
import { FC } from "react";

import {
  balanceAtom,
  isSyncRunningAtom,
  lockedBalanceAtom,
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
  walletAtom,
} from "~/store";

import WithdrawDialog from "./WithdrawDialog";

const TipxmrWallet: FC = () => {
  const [balance] = useAtom(balanceAtom);
  const [lockedBalance] = useAtom(lockedBalanceAtom);
  const [xmrWallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [height] = useAtom(syncHeightAtom);
  const [percentDone] = useAtom(progressAtom);
  const [startHeight] = useAtom(syncStartHeightAtom);
  const [endHeight] = useAtom(syncEndHeightAtom);

  // TODO handle the withdraw to address from db
  const handleWithdraw = async (address: string, amount: number) => {
    const txs = xmrWallet?.getTxs();
    console.info({ txs });
    const transaction = {
      address: address,
      accountIndex: 0,
      subaddressIndex: 1,
      amount: amount as unknown as bigint,
      relay: true,
      priority: MoneroTxPriority.UNIMPORTANT,
    } as MoneroTxConfig;

    console.log("tx is: ", transaction);

    const tx = xmrWallet?.createTx(transaction);
    console.log("Result of transaction", tx);
    return tx;
  };

  return (
    <div className="rounded bg-white p-4">
      <h3 className="text-center">My wallet</h3>

      <div className="container flex flex-col items-center justify-center gap-3">
        <h4>
          Balance: {balance} XMR ({lockedBalance} XMR locked)
        </h4>

        <div className="mb-2 flex items-center justify-evenly">
          <div className="mr-2">
            {height} / {endHeight}
          </div>

          {isSyncing ? (
            <span className="badge-primary">{percentDone}%</span>
          ) : (
            <span className="badge-secondary">{percentDone}%</span>
          )}
        </div>

        <Progress.Root
          className="relative w-full overflow-hidden rounded bg-gray-300"
          value={percentDone}
        >
          <Progress.Indicator
            className="h-4 w-full bg-blue-600"
            style={{
              transform: `translateX(-${100 - percentDone}%)`,
              transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
        </Progress.Root>

        <WithdrawDialog
          address={process.env.PRIMARY_TEST_ADDRESS || ""}
          handleWithdraw={handleWithdraw}
        />
      </div>
    </div>
  );
};
export default TipxmrWallet;
