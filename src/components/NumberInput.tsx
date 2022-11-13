import { ChangeEvent, FC, useState } from "react";

interface NumberInputProps {
  label?: string;
  unit?: string;
}

const NumberInput: FC<NumberInputProps> = ({ label, unit = "XMR" }) => {
  const [amount, setAmount] = useState(0);

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
  };

  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
        type="number"
        pattern="[0-9]*"
        placeholder={unit}
        name="numberformat"
        onChange={handleChangeAmount}
        value={amount}
      />
    </label>
  );
};
export default NumberInput;
