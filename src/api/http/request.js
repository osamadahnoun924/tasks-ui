import { API_SOURCE } from "./config";

const REAL_URL = "http://localhost:3000";
const MOCK_URL = "http://localhost:4000";

const BASE_URL = API_SOURCE === "mock" ? MOCK_URL : REAL_URL;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const request = async (path, options = {}) => {
  if (API_SOURCE === "mock") {
    await sleep(5000);
  }
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
};
