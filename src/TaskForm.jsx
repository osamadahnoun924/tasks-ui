import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tasksApi } from "../api/tasksApi";

export const TaskForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    taskDescription: "",
    isCompleted: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]:
        e.target.checked !== undefined ? e.target.checked : e.target.value,
    });
  };

  const createPost = async (e) => {
    e.preventDefault();

    if (formValues.taskDescription.length === 0) {
      setFormErrors({
        taskDescription: "You must type something in",
      });
      return;
    }

    try {
      const res = await tasksApi.create({
        description: formValues.taskDescription,
        completed: formValues.isCompleted,
      });

      console.log("Created task", res);

      navigate("/tasks");
    } catch (error) {
      setError(true);
      console.error("Failed to create", error.message);
    }
  };

  return (
    <form onSubmit={(e) => createPost(e)}>
      <div>
        <label htmlFor="description">What is your task?</label>
        <textarea
          id="description"
          name="taskDescription"
          onChange={(e) => handleInputChange(e)}
          value={formValues.taskDescription}
        />
        {formErrors?.taskDescription}
      </div>

      <div>
        <label htmlFor="completed">Is it already completed?</label>
        <input
          type="checkbox"
          id="completed"
          name="isCompleted"
          checked={formValues.isCompleted}
          onChange={(e) => handleInputChange(e)}
        />
        {formErrors?.isCompleted}
      </div>

      <button type="submit">Create Task</button>

      {error && <div style={{ color: "red" }}>error creating task</div>}
    </form>
  );
};
