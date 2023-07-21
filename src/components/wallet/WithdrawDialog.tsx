import { useState } from "react";

import NumberInput from "~/components/NumberInput";

interface WithdrawDialogProps {
  address: string;
  handleWithdraw: (address: string, amount: number) => void;
}

const WithdrawDialog = ({ address, handleWithdraw }: WithdrawDialogProps) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="container p-4">
      <div className="flex flex-col items-center gap-3">
        <h4>Withdraw from wallet</h4>
        <NumberInput
          label="Withdraw amount"
          amount={amount}
          setAmount={setAmount}
        />
        <p>
          Recipient address: <br /> {address}
        </p>
        <button
          className="btn-primary"
          onClick={() => handleWithdraw(address, amount)}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawDialog;
