const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    const message = payload?.error || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.details = payload?.details;
    throw error;
  }

  return payload?.data;
}

export const api = {
  getUsers: () => request("/users"),
  getUser: (userId) => request(`/users/${userId}`),
  getPosts: (userId) => request(`/users/${userId}/posts`),
  createPost: (userId, body) =>
    request(`/users/${userId}/posts`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
