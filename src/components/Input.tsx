import { useId } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
  className?: string;
};

const Input = ({
  label,
  name,
  register,
  required,
  minLength,
  maxLength,
  pattern,
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
        {...register(name, { required, minLength, maxLength, pattern })}
      />
      {errorMessage && <span>errorMessage</span>}
    </div>
  );
};

export default Input;
