import { createContext, useContext, useOptimistic, useState } from "react";
import { fetchTasks } from "../../api/task";
import { ITask } from "./types";

type TaskContextType = {
  taskPromise: Promise<ITask[]>;
  order: "asc" | "desc";
  updateOrder: (order: "asc" | "desc") => void;
  refetchTasks: () => void;
  optimisticTasks: ITask[];
  addOptimisticTasks: (action: ITask) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

interface ITaskContextProviderProps {
  children: React.ReactNode;
  taskPromise: Promise<ITask[]>;
}

export function TaskContextProvider({
  children,
  taskPromise,
}: ITaskContextProviderProps) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [taskPromiseState, setTaskPromiseState] = useState(taskPromise);

  const [optimisticTasks, addOptimisticTasks] = useOptimistic(
    [],
    (tasks: ITask[], newTask: ITask) => [...tasks, newTask]
  );

  const refetchTasks = () => {
    setTaskPromiseState(fetchTasks(order));
  };

  const updateOrder = (newOrder: "asc" | "desc") => {
    setOrder(newOrder);
    setTaskPromiseState(fetchTasks(newOrder));
  };

  const value = {
    taskPromise: taskPromiseState,
    order,
    updateOrder,
    refetchTasks,
    optimisticTasks,
    addOptimisticTasks,
  };

  return <TaskContext value={value}>{children}</TaskContext>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContext");
  }

  return context;
}
