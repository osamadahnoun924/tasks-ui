import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tasksApi } from "./api/tasksApi";

export const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(undefined);

  const [taskLoading, setTaskLoading] = useState(true);
  const [taskError, setTaskError] = useState(false);

  const fetchTask = async (id) => {
    try {
      const task = await tasksApi.get(id);
      setTask(task);
    } catch (error) {
      setTaskError(true);
      console.log(error.message);
    } finally {
      setTaskLoading(false);
    }
  };

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  if (taskLoading) {
    return <div>Loading task....</div>;
  }

  if (taskError) {
    return (
      <div style={{ color: "red" }}>
        Error loading task, try refreshing the page or coming back
      </div>
    );
  }

  if (task) {
    return (
      <>
        <h1
          style={{
            padding: "16px",
          }}
        >
          Task Details
        </h1>
        <div
          style={{
            border: "solid mediumpurple",
            padding: "16px",
            margin: "16px",
            maxWidth: "720px",
          }}
        >
          <p>Description: {task.description}</p>
          <p>Completed: {task.completed ? "Completed" : "Not completed"}</p>
          <p>Id: {task.id}</p>

          <Link to="/tasks">View home page</Link>
        </div>
      </>
    );
  }
  return null;
};
