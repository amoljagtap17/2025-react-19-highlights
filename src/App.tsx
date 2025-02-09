import { NewTaskForm } from "./components/section/NewTaskForm";
import { TaskListContainer } from "./components/section/TaskList";

export function App() {
  return (
    <div>
      <NewTaskForm />
      <TaskListContainer />
    </div>
  );
}
