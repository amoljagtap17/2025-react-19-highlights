import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../lib/Button";
import { Input } from "../lib/Input";
import "./newTaskForm.css";
import { useTaskDispatchContext } from "./TaskContextProvider";

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
  const { setOptimisticTasks } = useTaskDispatchContext();
  const [state, addTaskAction] = useActionState(
    async (
      previousState: { error: string; success: string },
      formData: FormData
    ) => {
      const task = formData.get("task") as string;

      if (task.trim().length === 0) {
        return { ...previousState, success: "", error: "Task cannot be empty" };
      }

      const payload = { task };

      setOptimisticTasks({ id: Date.now().toString(), task });

      try {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        await response.json();

        return {
          ...previousState,
          error: "",
          success: "Task added successfully",
        };
      } catch (error) {
        return { ...previousState, success: "", error: "Failed to add task" };
      }
    },
    initialState
  );

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
