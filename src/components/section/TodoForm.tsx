import { useEffect, useRef } from "react";
import { Input } from "../lib/Input";
import "./styles.css";

export function TodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="card">
      <form>
        <Input
          name="task"
          label="New Task"
          placeholder="Add New Task"
          ref={inputRef}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
