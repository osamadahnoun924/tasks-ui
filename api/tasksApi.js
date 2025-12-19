import { request } from "./http/request";

export const tasksApi = {
  getAll() {
    return request("/api/tasks?sort=asc");
  },
  get(id) {
    return request(`/api/tasks/${id}`);
  },
  create(body) {
    return request("/api/tasks", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  update(id, body) {
    return request(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  delete(id) {
    return request(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
