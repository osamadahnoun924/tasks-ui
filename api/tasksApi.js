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
      headers: { "x-api-key": "supersecret123" },
    });
  },
  update(id, body) {
    return request(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "x-api-key": "supersecret123" },
    });
  },
  delete(id) {
    return request(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: { "x-api-key": "supersecret123" },
    });
  },
};
