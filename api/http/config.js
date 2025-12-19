const API_TARGET = import.meta.env.VITE_API_TARGET;

const API_BASE_URL_MAP = {
  mock: import.meta.env.VITE_MOCK_API_BASE_URL,
  local: import.meta.env.VITE_LOCAL_API_BASE_URL,
  production: import.meta.env.VITE_PROD_API_BASE_URL,
};

export const API_BASE_URL = API_BASE_URL_MAP[API_TARGET];

if (!API_BASE_URL) {
  throw new Error(`Invalid VITE_API_TARGET: ${API_TARGET}`);
}
