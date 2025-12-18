import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tasksApi } from "../api/tasksApi";

export const TasksList = () => {
  const [tasks, setTasks] = useState(undefined);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await tasksApi.getAll();
      setTasks(data.tasks);
    } catch (error) {
      setTasksError(true);
      console.log(error.message);
    } finally {
      setTasksLoading(false);
    }
  };

  const updateTask = async (id) => {
    try {
      const currentTask = tasks.find((t) => t.id === id);
      const currentCompleted = currentTask?.completed;

      if (currentCompleted !== undefined) {
        const task = await tasksApi.update(id, {
          completed: !currentCompleted,
        });

        setTasks((prev) => {
          return prev.map((t) =>
            t.id === id ? { ...t, completed: !currentCompleted } : t
          );
        });

        console.log("Updated task", task);
      }
    } catch (error) {
      console.error("Failed to update", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await tasksApi.delete(id);

      setTasks((prev) => {
        return prev.filter((t) => t.id !== id);
      });

      console.log(res);
    } catch (error) {
      console.error("Failed to delete", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasksLoading) {
    return <div>Loading tasks....</div>;
  }

  if (tasksError) {
    return (
      <div style={{ color: "red" }}>
        Error loading tasks, try refreshing the page or coming back
      </div>
    );
  }

  if (tasks && tasks.length > 0) {
    return (
      <>
        <h1
          style={{
            padding: "16px",
          }}
        >
          Tasks List
        </h1>
        {tasks.map((t) => (
          <div
            key={t.id}
            style={{
              border: "solid mediumpurple",
              padding: "16px",
              margin: "16px",
              maxWidth: "720px",
            }}
          >
            <p>Description: {t.description}</p>
            <p>{t.completed ? "Completed" : "Not completed"}</p>
            <label htmlFor="toggle">Toggle</label>
            <input
              id="toggle"
              type="checkbox"
              onChange={() => updateTask(t.id)}
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === "enter") {
                  updateTask(t.id);
                }
              }}
              checked={t.completed}
            />
            <Link to={`/tasks/${t.id}`}>View task details page</Link>

            <div>
              <button
                onClick={() => deleteTask(t.id)}
                onKeyUp={(e) => {
                  if (e.key.toLowerCase() === "enter") {
                    deleteTask(t.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (tasks && tasks.length === 0) {
    return <div>You have no tasks</div>;
  }
  return null;
};
