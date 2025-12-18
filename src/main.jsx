import ReactDOM from "react-dom/client";
import { TasksList } from "./TasksList";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { Layout } from "./Layout";
import { Home } from "./Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tasks">
          <Route index element={<TasksList />} />
          <Route path=":id" element={<TaskDetails />} />
          <Route path="create" element={<TaskForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
