export async function addTask(
  previousState: { error: string; success: string },
  formData: FormData
) {
  const task = formData.get("task") as string;

  if (task.trim().length === 0) {
    return { ...previousState, success: "", error: "Task cannot be empty" };
  }

  const payload = { task };

  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    await response.json();

    return { ...previousState, error: "", success: "Task added successfully" };
  } catch (error) {
    return { ...previousState, success: "", error: "Failed to add task" };
  }
}
