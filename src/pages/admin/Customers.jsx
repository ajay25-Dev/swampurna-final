import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  status: "new",
  notes: "",
  is_active: true,
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const startEdit = (c) => {
    setEditingId(c.id);
    setForm({
      name: c.name || "",
      email: c.users?.email || "",
      password: "",
      phone: c.phone || "",
      status: c.status || "new",
      notes: c.notes || "",
      is_active: c.users?.is_active ?? true,
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
    setError("");
  };

  const onDelete = async (c) => {
    if (!window.confirm(`Delete customer "${c.name}"? This permanently removes their account and all related data.`)) {
      return;
    }
    setDeletingId(c.id);
    setError("");
    setMessage("");
    try {
      await adminApi.deleteCustomer(c.id);
      setMessage("Customer deleted.");
      if (editingId === c.id) cancelEdit();
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Failed to delete customer");
    } finally {
      setDeletingId(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (editingId) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await adminApi.updateCustomer(editingId, payload);
        setMessage("Customer updated.");
        setEditingId(null);
      } else {
        await adminApi.createCustomer(form);
        setMessage("Customer created.");
      }
      setForm(initialForm);
      await loadCustomers();
    } catch (err) {
      setError(err.message || (editingId ? "Failed to update customer" : "Failed to create customer"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <h1>Customer Management</h1>
          <p>View all customers and create new records.</p>
        </div>

        <div className="grid">
          <section className="card">
            <h2>{editingId ? "Edit Customer" : "Create Customer"}</h2>
            <form onSubmit={onSubmit} className="form">
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Password{editingId && <span className="hint"> (leave blank to keep current password)</span>}
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={!editingId}
                  placeholder={editingId ? "••••••••" : ""}
                />
              </label>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="new">new</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                <span>Account Active</span>
              </label>
              <label>
                Notes
                <textarea
                  rows="4"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </label>
              <div className="form-actions">
                <button type="submit" disabled={saving}>
                  {saving ? (editingId ? "Saving..." : "Creating...") : editingId ? "Save Changes" : "Create Customer"}
                </button>
                {editingId && (
                  <button type="button" className="secondary" onClick={cancelEdit} disabled={saving}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
            {message && <div className="ok">{message}</div>}
            {error && <div className="err">{error}</div>}
          </section>

          <section className="card">
            <h2>Customer List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : customers.length === 0 ? (
              <p>No customers found.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Account</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.users?.email || "-"}</td>
                        <td>{c.phone || "-"}</td>
                        <td>
                          <span className={`status status-${c.status || "new"}`}>
                            {c.status || "new"}
                          </span>
                        </td>
                        <td>
                          <span className={`status ${c.users?.is_active ? "status-active" : "status-inactive"}`}>
                            {c.users?.is_active ? "active" : "inactive"}
                          </span>
                        </td>
                        <td>{new Date(c.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="row-actions">
                            <button type="button" className="link-btn" onClick={() => startEdit(c)}>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="link-btn danger"
                              onClick={() => onDelete(c)}
                              disabled={deletingId === c.id}
                            >
                              {deletingId === c.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .head {
    margin-bottom: var(--space-6);
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
  }

  .grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: var(--space-5);
  }

  .card {
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
  }

  h2 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
  }

  .form {
    display: grid;
    gap: var(--space-3);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
  }

  .toggle {
    flex-direction: row;
    align-items: center;
    gap: var(--space-2);
  }

  input,
  textarea,
  select {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #f9fafb;
  }

  button {
    width: fit-content;
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
  }

  .hint {
    font-weight: 400;
    color: var(--color-dark-400);
    font-size: 0.75rem;
  }

  .form-actions {
    display: flex;
    gap: var(--space-3);
  }

  button.secondary {
    background: var(--color-dark-100);
    color: var(--color-dark-700);
  }

  .row-actions {
    display: flex;
    gap: var(--space-3);
  }

  .link-btn {
    width: auto;
    padding: 4px 0;
    background: none;
    color: var(--color-primary-600);
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 0;
  }

  .link-btn.danger {
    color: #dc2626;
  }

  .link-btn:disabled {
    opacity: 0.5;
  }

  .ok {
    margin-top: var(--space-3);
    color: #166534;
    font-size: var(--text-sm);
  }

  .err {
    margin-top: var(--space-3);
    color: #dc2626;
    font-size: var(--text-sm);
  }

  .table-wrap {
    overflow: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 640px;
  }

  th,
  td {
    text-align: left;
    padding: 12px 10px;
    border-bottom: 1px solid var(--color-dark-100);
    font-size: var(--text-sm);
  }

  th {
    color: var(--color-dark-500);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 0.72rem;
  }

  .status {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
    background: #e0f2fe;
    color: #075985;
  }

  .status-active {
    background: #dcfce7;
    color: #166534;
  }

  .status-inactive {
    background: #fee2e2;
    color: #991b1b;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Customers;
