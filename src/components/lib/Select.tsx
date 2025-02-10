import "./select.css";

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  handleOnChange: (order: "asc" | "desc") => void;
}

export function Select({ options, value, handleOnChange }: ISelectProps) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    handleOnChange(value as "asc" | "desc");
  };

  return (
    <select onChange={onChangeHandler} value={value}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
