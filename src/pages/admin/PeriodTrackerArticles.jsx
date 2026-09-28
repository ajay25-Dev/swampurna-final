import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const emptyForm = {
  category_key: "",
  category_label: "",
  slug: "",
  title: "",
  detail_title: "",
  content: "",
  cycle_phase: "",
  priority: "",
  sort_order: 0,
  is_active: true,
  target_options: [],
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PeriodTrackerArticles = () => {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [articlesRes, optionsRes] = await Promise.all([
        adminApi.getAdminPeriodTrackerArticles(),
        adminApi.getAdminPeriodTrackerOptions(),
      ]);
      setItems(articlesRes.data || []);
      setOptions((optionsRes.data || []).filter((o) => o.is_active));
    } catch (err) {
      setError(err.message || "Failed to load articles");
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
    setForm({ ...item, target_options: Array.isArray(item.target_options) ? item.target_options : [] });
    setMessage("");
    setError("");
  };

  const closeForm = () => setForm(null);

  const handleChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.id && !prev.slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const toggleTargetOption = (tag) => {
    setForm((prev) => {
      const current = new Set(prev.target_options || []);
      if (current.has(tag)) {
        current.delete(tag);
      } else {
        current.add(tag);
      }
      return { ...prev, target_options: Array.from(current) };
    });
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
        slug: form.slug,
        title: form.title,
        detail_title: form.detail_title || form.title,
        content: form.content,
        cycle_phase: form.cycle_phase,
        priority: form.priority,
        sort_order: Number(form.sort_order) || 0,
        is_active: !!form.is_active,
        target_options: form.target_options || [],
      };
      if (form.id) {
        await adminApi.updateAdminPeriodTrackerArticle(form.id, payload);
        setMessage("Article updated.");
      } else {
        await adminApi.createAdminPeriodTrackerArticle(payload);
        setMessage("Article created.");
      }
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete article "${item.title}"? This cannot be undone.`)) return;
    setError("");
    setMessage("");
    try {
      await adminApi.deleteAdminPeriodTrackerArticle(item.id);
      setMessage("Article deleted.");
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete article");
    }
  };

  const optionGroups = options.reduce((acc, opt) => {
    if (!acc[opt.category_key]) acc[opt.category_key] = { label: opt.category_label, rows: [] };
    acc[opt.category_key].rows.push(opt);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Health Tip Articles</h1>
            <p>
              Manage the "Menstrual Health Tips" shown on the app's tracker screen. Optionally target an
              article to specific period-tracker options (e.g. show a "Pain relief" tip only to users who
              selected "Strong cramps"). Articles with no target left as general tips are shown to everyone.
            </p>
          </div>
          <button className="primary" onClick={openCreate}>
            Add Article
          </button>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        {form && (
          <form className="form-card" onSubmit={handleSave}>
            <h2>{form.id ? "Edit Article" : "New Article"}</h2>
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
                Title
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </label>
              <label>
                Slug (unique)
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, slug: e.target.value, slugTouched: true }));
                  }}
                  required
                />
              </label>
              <label>
                Detail title
                <input
                  value={form.detail_title}
                  onChange={(e) => handleChange("detail_title", e.target.value)}
                  placeholder="Defaults to Title"
                />
              </label>
              <label>
                Cycle phase
                <input
                  value={form.cycle_phase || ""}
                  onChange={(e) => handleChange("cycle_phase", e.target.value)}
                  placeholder="e.g. luteal, follicular"
                />
              </label>
              <label>
                Priority
                <input
                  value={form.priority || ""}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  placeholder="e.g. high"
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

            <label className="content-label">
              Content
              <textarea
                rows={6}
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                required
              />
            </label>

            <div className="targeting">
              <h3>Target specific user selections (optional)</h3>
              <p className="muted">
                Leave everything unchecked to show this as a general tip to all users. Check one or more
                options below to show it only to users who picked at least one of them.
              </p>
              {Object.entries(optionGroups).length === 0 ? (
                <p className="muted">No period tracker options found yet. Add some in Period Tracker Options first.</p>
              ) : (
                Object.entries(optionGroups).map(([key, group]) => (
                  <div className="option-group" key={key}>
                    <strong>{group.label}</strong>
                    <div className="chips">
                      {group.rows.map((opt) => {
                        const tag = `${opt.category_key}:${opt.option_key}`;
                        const checked = (form.target_options || []).includes(tag);
                        return (
                          <label key={tag} className={`chip ${checked ? "checked" : ""}`}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleTargetOption(tag)}
                            />
                            {opt.option_label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
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
          <div className="card">No articles found.</div>
        ) : (
          <div className="list">
            {items.map((item) => (
              <article className="row-card" key={item.id}>
                <div className="main">
                  <div className="row">
                    <h2>{item.title}</h2>
                    {!item.is_active && <span className="badge inactive">inactive</span>}
                  </div>
                  <p className="content-preview">{item.content}</p>
                  <div className="meta">
                    <span>category: {item.category_key}</span>
                    <span>sort: {item.sort_order}</span>
                    {item.cycle_phase && <span>phase: {item.cycle_phase}</span>}
                  </div>
                  {Array.isArray(item.target_options) && item.target_options.length > 0 ? (
                    <div className="tags">
                      {item.target_options.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="tag general">general tip (shown to everyone)</span>
                  )}
                </div>
                <div className="actions">
                  <button onClick={() => openEdit(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
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
    max-width: 680px;
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

  label.content-label {
    display: grid;
  }

  input,
  textarea {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
    font-family: inherit;
  }

  textarea {
    resize: vertical;
  }

  .targeting {
    border-top: 1px solid var(--color-dark-100);
    padding-top: var(--space-4);
  }

  .targeting h3 {
    font-size: var(--text-base);
    margin-bottom: var(--space-2);
  }

  .muted {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
    margin-bottom: var(--space-3);
  }

  .option-group {
    margin-bottom: var(--space-3);
  }

  .option-group strong {
    display: block;
    font-size: var(--text-sm);
    margin-bottom: 6px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .chip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--color-dark-100);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: var(--text-sm);
    flex-direction: row;
    cursor: pointer;
  }

  .chip.checked {
    background: var(--gradient-primary);
    color: #fff;
  }

  .form-actions {
    display: flex;
    gap: var(--space-2);
  }

  .list {
    display: grid;
    gap: var(--space-4);
  }

  .row-card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .main {
    flex: 1 1 400px;
    display: grid;
    gap: var(--space-2);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .content-preview {
    color: var(--color-dark-700);
    font-size: var(--text-sm);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    gap: var(--space-3);
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    background: var(--color-dark-100);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.75rem;
    color: var(--color-dark-500);
    font-family: monospace;
  }

  .tag.general {
    font-family: inherit;
    background: #dcfce7;
    color: #166534;
  }

  .badge.inactive {
    background: #fee2e2;
    color: #991b1b;
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.75rem;
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

export default PeriodTrackerArticles;
