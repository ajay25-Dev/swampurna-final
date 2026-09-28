import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const emptyForm = {
  category_key: "",
  category_label: "",
  option_key: "",
  option_label: "",
  purpose: "",
  prediction_effect: "",
  confidence_impact: "",
  sort_order: 0,
  is_active: true,
};

const PeriodTrackerOptions = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getAdminPeriodTrackerOptions();
      setItems(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load options");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({ ...emptyForm });
    setMessage("");
    setError("");
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setMessage("");
    setError("");
  };

  const closeForm = () => setForm(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        category_key: form.category_key,
        category_label: form.category_label,
        option_key: form.option_key,
        option_label: form.option_label,
        purpose: form.purpose,
        prediction_effect: form.prediction_effect,
        confidence_impact: form.confidence_impact,
        sort_order: Number(form.sort_order) || 0,
        is_active: !!form.is_active,
      };
      if (form.id) {
        await adminApi.updateAdminPeriodTrackerOption(form.id, payload);
        setMessage("Option updated.");
      } else {
        await adminApi.createAdminPeriodTrackerOption(payload);
        setMessage("Option created.");
      }
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message || "Failed to save option");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete option "${item.option_label}" from "${item.category_label}"?`)) return;
    setError("");
    setMessage("");
    try {
      await adminApi.deleteAdminPeriodTrackerOption(item.id);
      setMessage("Option deleted.");
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete option");
    }
  };

  const grouped = items.reduce((acc, item) => {
    const key = item.category_key;
    if (!acc[key]) acc[key] = { label: item.category_label, rows: [] };
    acc[key].rows.push(item);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Period Tracker Options</h1>
            <p>
              Manage the categories and choices users pick in "Customize and get accurate results". These
              selections can be used to target relevant Health Tip articles.
            </p>
          </div>
          <button className="primary" onClick={openCreate}>
            Add Option
          </button>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        {form && (
          <form className="form-card" onSubmit={handleSave}>
            <h2>{form.id ? "Edit Option" : "New Option"}</h2>
            <div className="grid">
              <label>
                Category key
                <input
                  value={form.category_key}
                  onChange={(e) => handleChange("category_key", e.target.value)}
                  placeholder="e.g. pain"
                  required
                />
              </label>
              <label>
                Category label
                <input
                  value={form.category_label}
                  onChange={(e) => handleChange("category_label", e.target.value)}
                  placeholder="e.g. Pain"
                  required
                />
              </label>
              <label>
                Option key
                <input
                  value={form.option_key}
                  onChange={(e) => handleChange("option_key", e.target.value)}
                  placeholder="e.g. strong_cramps"
                  required
                />
              </label>
              <label>
                Option label
                <input
                  value={form.option_label}
                  onChange={(e) => handleChange("option_label", e.target.value)}
                  placeholder="e.g. Strong cramps"
                  required
                />
              </label>
              <label>
                Purpose
                <input
                  value={form.purpose || ""}
                  onChange={(e) => handleChange("purpose", e.target.value)}
                />
              </label>
              <label>
                Prediction effect
                <input
                  value={form.prediction_effect || ""}
                  onChange={(e) => handleChange("prediction_effect", e.target.value)}
                />
              </label>
              <label>
                Confidence impact
                <input
                  value={form.confidence_impact || ""}
                  onChange={(e) => handleChange("confidence_impact", e.target.value)}
                  placeholder="e.g. +3% to +8%"
                />
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => handleChange("sort_order", e.target.value)}
                />
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={!!form.is_active}
                  onChange={(e) => handleChange("is_active", e.target.checked)}
                />
                Active (shown to users)
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={closeForm} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="card">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card">No options found.</div>
        ) : (
          Object.entries(grouped).map(([key, group]) => (
            <div className="category-block" key={key}>
              <h3>
                {group.label} <span className="key">({key})</span>
              </h3>
              <div className="list">
                {group.rows.map((item) => (
                  <div className="row-card" key={item.id}>
                    <div className="main">
                      <strong>{item.option_label}</strong>
                      <span className="tag">{item.category_key}:{item.option_key}</span>
                      {!item.is_active && <span className="badge inactive">inactive</span>}
                    </div>
                    <div className="meta">
                      {item.confidence_impact && <span>impact: {item.confidence_impact}</span>}
                      <span>sort: {item.sort_order}</span>
                    </div>
                    <div className="actions">
                      <button onClick={() => openEdit(item)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(item)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .head {
    margin-bottom: var(--space-5);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
    max-width: 640px;
  }

  button {
    border-radius: var(--radius-full);
    background: var(--color-dark-100);
    padding: var(--space-2) var(--space-4);
    white-space: nowrap;
  }

  button.primary {
    background: var(--gradient-primary);
    color: #fff;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .ok,
  .err {
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
  }

  .ok {
    color: #166534;
  }

  .err {
    color: #dc2626;
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
  }

  .form-card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-soft);
    padding: var(--space-5);
    margin-bottom: var(--space-5);
    display: grid;
    gap: var(--space-4);
  }

  .form-card h2 {
    font-size: var(--text-lg);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }

  label {
    display: grid;
    gap: 6px;
    font-size: var(--text-sm);
    color: var(--color-dark-700);
  }

  label.checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-direction: row;
  }

  input {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
  }

  .form-actions {
    display: flex;
    gap: var(--space-2);
  }

  .category-block {
    margin-bottom: var(--space-5);
  }

  .category-block h3 {
    margin-bottom: var(--space-3);
    font-size: var(--text-base);
  }

  .category-block .key {
    color: var(--color-dark-500);
    font-weight: 400;
    font-size: var(--text-sm);
  }

  .list {
    display: grid;
    gap: var(--space-3);
  }

  .row-card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-xl);
    padding: var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .main {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .tag {
    background: var(--color-dark-100);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.75rem;
    color: var(--color-dark-500);
    font-family: monospace;
  }

  .badge.inactive {
    background: #fee2e2;
    color: #991b1b;
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.75rem;
  }

  .meta {
    display: flex;
    gap: var(--space-3);
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .delete {
    background: #fee2e2;
    color: #991b1b;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default PeriodTrackerOptions;
