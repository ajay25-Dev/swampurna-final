const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

function withBase(path) {
  if (!API_BASE_URL) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}${path}`;
}

async function request(path, options = {}) {
  const res = await fetch(withBase(path), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export const adminApi = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request("/api/auth/me"),
  getPage: (slug) => request(`/api/content/page/${slug}`),
  upsertPage: (slug, payload) =>
    request(`/api/content/page/${slug}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  getItems: (page, section) =>
    request(`/api/content/items?page=${encodeURIComponent(page)}&section=${encodeURIComponent(section)}`),
  createItem: (payload) =>
    request("/api/content/items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateItem: (id, payload) =>
    request(`/api/content/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteItem: (id) =>
    request(`/api/content/items/${id}`, { method: "DELETE" }),
  uploadMedia: async (file) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(withBase("/api/media/upload"), {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    return data;
  },
  getCustomers: () => request("/api/customers"),
  createCustomer: (payload) =>
    request("/api/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getSupportReports: ({ status = "", limit = 50, offset = 0 } = {}) =>
    request(
      `/api/v1/support/reports?status=${encodeURIComponent(status)}&limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
    ),
  updateSupportReport: (id, payload) =>
    request(`/api/v1/support/reports/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  getCycleSnaps: ({ status = "", limit = 50, offset = 0 } = {}) =>
    request(
      `/api/v1/cycle-snaps?status=${encodeURIComponent(status)}&limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
    ),
  updateCycleSnapStatus: (id, status) =>
    request(`/api/v1/cycle-snaps/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  getTrackerUsers: () => request("/api/admin/period-tracker/users"),
  getTrackerUserDetails: (userId, month = "") =>
    request(`/api/admin/period-tracker/user/${encodeURIComponent(userId)}/details?month=${encodeURIComponent(month)}`),
};
