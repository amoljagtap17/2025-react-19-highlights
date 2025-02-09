import { createContext, useContext, useOptimistic } from "react";
import { ITask } from "./types";

type TaskContextType = {
  optimisticTasks: ITask[];
  setOptimisticTasks: (action: ITask) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

interface ITaskContextProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: ITaskContextProviderProps) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    [],
    (tasks: ITask[], newTask: ITask) => [...tasks, newTask]
  );

  return (
    <TaskContext value={{ optimisticTasks, setOptimisticTasks }}>
      {children}
    </TaskContext>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }

  return context;
}
