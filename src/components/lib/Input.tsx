import { useId } from "react";
import "./input.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  ref: React.RefObject<HTMLInputElement | null>;
}

export function Input({ ref, label, name, ...props }: IInputProps) {
  const id = useId();
  const inputId = `${name}-${id}`;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} name={name} ref={ref} {...props} />
    </div>
  );
}
