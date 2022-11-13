import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FC } from "react";

interface PaymentSuccessProps {
  amount: number;
  address: string;
}

const PaymentSuccess: FC<PaymentSuccessProps> = ({ amount, address }) => {
  return (
    <div className="flex flex-col items-center rounded-md border-2 border-solid border-black py-4">
      <p>
        <CheckCircledIcon className="mr-1 inline" />
        Payment sucessful
      </p>
      <p>
        Sent {amount} XMR to {address}
      </p>
    </div>
  );
};

export default PaymentSuccess;
