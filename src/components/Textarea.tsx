import { ReactElement, useId } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  className?: string;
}

const Textarea = <T extends FieldValues>(
  props: InputProps & UseControllerProps<T>
): ReactElement => {
  const { field, fieldState } = useController(props);
  const id = useId();
  return (
    <div className={`w-full ${props.className}`}>
      <label htmlFor={id} className="block text-left">
        {props.label}
      </label>
      <textarea
        id={id}
        className="block h-full w-full resize-none"
        aria-invalid={fieldState.error ? "true" : "false"}
        {...field}
      />
      {fieldState.error && <p role="alert">{fieldState.error?.message}</p>}
    </div>
  );
};

export default Textarea;