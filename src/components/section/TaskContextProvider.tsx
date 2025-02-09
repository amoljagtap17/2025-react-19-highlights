import { createContext, useContext, useReducer } from "react";

type TaskContextType = {
  updateCount: number;
  forceUpdate: React.ActionDispatch<[]>;
};

const TaskContext = createContext<TaskContextType | null>(null);

interface ITaskContextProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: ITaskContextProviderProps) {
  const [updateCount, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <TaskContext value={{ updateCount, forceUpdate }}>{children}</TaskContext>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }

  return context;
}
