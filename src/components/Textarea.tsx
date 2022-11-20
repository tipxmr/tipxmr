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
  textareaClassName?: string;
}

const Textarea = <T extends FieldValues>(
  props: InputProps & UseControllerProps<T>
): ReactElement => {
  const { field, fieldState } = useController(props);
  const outerClassName = props.className ?? "";
  const textareaClassName = props.textareaClassName ?? "";
  const id = useId();

  return (
    <div className={`w-full ${outerClassName}`}>
      <label htmlFor={id} className="block text-left">
        {props.label}
      </label>
      <textarea
        id={id}
        className={`block w-full resize-none ${textareaClassName}`}
        aria-invalid={fieldState.error ? "true" : "false"}
        {...field}
      />
      {fieldState.error && <p role="alert">{fieldState.error?.message}</p>}
    </div>
  );
};

export default Textarea;
