import { createContext, useContext, useOptimistic } from "react";
import { ITask } from "./types";

type TaskStateContextType = {
  optimisticTasks: ITask[];
};

type TaskDispatchContextType = {
  setOptimisticTasks: (action: ITask) => void;
};

const TaskStateContext = createContext<TaskStateContextType | null>(null);
const TaskDispatchContext = createContext<TaskDispatchContextType | null>(null);

interface ITaskContextProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: ITaskContextProviderProps) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    [],
    (tasks: ITask[], newTask: ITask) => [...tasks, newTask]
  );

  return (
    <TaskStateContext value={{ optimisticTasks }}>
      <TaskDispatchContext value={{ setOptimisticTasks }}>
        {children}
      </TaskDispatchContext>
    </TaskStateContext>
  );
}

export function useTaskStateContext() {
  const context = useContext(TaskStateContext);

  if (!context) {
    throw new Error(
      "useTaskStateContext must be used within a TaskStateContext"
    );
  }

  return context;
}

export function useTaskDispatchContext() {
  const context = useContext(TaskDispatchContext);

  if (!context) {
    throw new Error(
      "useTaskDispatchContext must be used within a TaskDispatchContext"
    );
  }

  return context;
}
