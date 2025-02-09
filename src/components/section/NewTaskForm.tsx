import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { addTask } from "../../actions/task";
import { Button } from "../lib/Button";
import { Input } from "../lib/Input";
import "./newTaskForm.css";

/* export function TodoForm() {
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
} */

const initialState = { error: "", success: "" };

function NewTaskFormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Add
    </Button>
  );
}

export function NewTaskForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, addTaskAction] = useActionState(addTask, initialState);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="card">
      <form action={addTaskAction}>
        <Input
          name="task"
          label="New Task"
          placeholder="Add New Task"
          ref={inputRef}
        />
        <NewTaskFormButton />
      </form>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">{state.success}</p>}
    </div>
  );
}
