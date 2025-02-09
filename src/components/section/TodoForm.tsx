import "./styles.css";

export function TodoForm() {
  return (
    <div className="card">
      <form>
        <input type="text" placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
