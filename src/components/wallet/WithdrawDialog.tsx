import NumberInput from "~/components/NumberInput";

interface WithdrawDialogProps {
  address?: string;
  handleWithdraw: () => void;
}

const WithdrawDialog = ({ address, handleWithdraw }: WithdrawDialogProps) => {
  return (
    <div className="container p-4">
      <div className="flex flex-col items-center gap-3">
        <h4>Withdraw from wallet</h4>

        <NumberInput label="Withdraw amount" />

        <p>
          Recipient address: <br /> {address}
        </p>

        <button className="btn-primary" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawDialog;
