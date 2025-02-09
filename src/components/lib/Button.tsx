import "./button.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: IButtonProps) {
  return <button {...props}>{children}</button>;
}
