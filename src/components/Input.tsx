import { useId } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  value: string;
  register: UseFormRegister<any>;
  required: boolean;
  errorMessage?: string;
  className?: string;
};

const Input = ({
  label,
  name,
  value,
  register,
  required,
  errorMessage,
  className = "",
}: InputProps) => {
  const id = useId();
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="block w-full"
        {...register(name, { required })}
        value={value}
      />
      {errorMessage && <span>errorMessage</span>}
    </div>
  );
};

export default Input;
