import clsx from "clsx";
import { HTMLInputTypeAttribute, ReactElement, useId } from "react";
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  control: Control<T>;
}

const Input = <T extends FieldValues>(
  props: InputProps<T> & UseControllerProps<T>,
): ReactElement => {
  const { field, fieldState } = useController(props);
  const id = useId();

  return (
    <div className={clsx(`w-full`, props?.className)}>
      <label htmlFor={id} className="block text-left">
        {props.label}
      </label>
      <input
        id={id}
        type={props.type}
        className="block w-full"
        aria-invalid={fieldState.error ? "true" : "false"}
        {...field}
      />
      {fieldState.error && <p role="alert">{fieldState.error?.message}</p>}
    </div>
  );
};

export default Input;
