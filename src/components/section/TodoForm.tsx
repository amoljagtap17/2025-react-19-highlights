import { useEffect, useRef, useTransition } from "react";
import { Button } from "../lib/Button";
import { Input } from "../lib/Input";
import "./styles.css";

export function TodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      console.log("input::", inputRef.current?.value);
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <Input
          name="task"
          label="New Task"
          placeholder="Add New Task"
          ref={inputRef}
        />
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>
    </div>
  );
}
