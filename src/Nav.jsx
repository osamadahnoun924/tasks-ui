import { Link } from "react-router-dom";

export const Nav = () => {
  console.log("Nav");
  return (
    <ul style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
      <li>
        <Link to="/tasks">View List</Link>
      </li>
      <li>
        <Link to="/tasks/create">Create Task</Link>
      </li>
    </ul>
  );
};
