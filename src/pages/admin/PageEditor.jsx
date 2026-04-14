import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const PageEditor = () => {
  const { slug } = useParams();
  const [page, setPage] = useState({ title: "", hero_title: "", hero_subtitle: "", hero_image_url: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [sectionKey, setSectionKey] = useState("");
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsMessage, setItemsMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const homeSectionOptions = [
    { value: "hero_images", label: "Home Banner Images" },
    { value: "principal_investigator", label: "Principal Investigator" },
    { value: "home_principal_stats", label: "Principal Stats" },
    { value: "home_about_header", label: "Home About Header" },
    { value: "home_about_accordion", label: "Home About Accordion" },
    { value: "home_about_video", label: "Home About Video" },
    { value: "home_updates_header", label: "Updates Header" },
    { value: "home_current_updates", label: "Current Updates" },
    { value: "home_upcoming_events", label: "Upcoming Events" },
    { value: "home_latest_updates", label: "Latest Updates" },
    { value: "home_articles_header", label: "Articles Header" },
    { value: "home_articles", label: "Articles" },
    { value: "home_features_header", label: "Features Header" },
    { value: "home_features", label: "Why Choose Us Features" },
  ];

  useEffect(() => {
    adminApi
      .getPage(slug)
      .then((res) => setPage(res.data || page))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await adminApi.upsertPage(slug, page);
      setMessage("Saved.");
    } catch (err) {
      setMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const res = await adminApi.uploadMedia(file);
      setUploadUrl(res.url || "");
    } catch (err) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const loadItems = async () => {
    if (!sectionKey) return;
    setItemsLoading(true);
    setItemsMessage("");
    try {
      const res = await adminApi.getItems(slug, sectionKey);
      setItems(res.data || []);
    } catch (err) {
      setItemsMessage(err.message || "Failed to load items");
    } finally {
      setItemsLoading(false);
    }
  };

  const updateItemField = (id, key, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const saveItem = async (item) => {
    setItemsMessage("");
    const payload = { ...item };
    delete payload.id;
    delete payload.created_at;
    try {
      await adminApi.updateItem(item.id, payload);
      setItemsMessage("Item saved.");
    } catch (err) {
      setItemsMessage(err.message || "Save failed");
    }
  };

  const addItem = async () => {
    setItemsMessage("");
    try {
      const res = await adminApi.createItem({
        page_slug: slug,
        section_key: sectionKey,
        title: "New Item",
        sort_order: items.length,
      });
      setItems((prev) => [...prev, res.data]);
    } catch (err) {
      setItemsMessage(err.message || "Create failed");
    }
  };

  const removeItem = async (id) => {
    setItemsMessage("");
    try {
      await adminApi.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setItemsMessage(err.message || "Delete failed");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="page-head">
          <div>
            <h1>Edit Page: {slug}</h1>
            <p className="sub">Manage page hero and content blocks.</p>
          </div>
          <button className="primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid">
          <div className="panel">
            <div className="panel-title">Hero Section</div>
            <div className="form">
              <label>
                Title
                <input
                  value={page.title || ""}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                />
              </label>
              <label>
                Hero Title
                <input
                  value={page.hero_title || ""}
                  onChange={(e) => setPage({ ...page, hero_title: e.target.value })}
                />
              </label>
              <label>
                Hero Subtitle
                <textarea
                  rows="4"
                  value={page.hero_subtitle || ""}
                  onChange={(e) => setPage({ ...page, hero_subtitle: e.target.value })}
                />
              </label>
              <label>
                Hero Image URL
                <input
                  value={page.hero_image_url || ""}
                  onChange={(e) => setPage({ ...page, hero_image_url: e.target.value })}
                />
              </label>
              {message && <div className="msg">{message}</div>}
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">Media Upload</div>
            <input type="file" onChange={onUpload} disabled={uploading} />
            {uploading && <div className="msg">Uploading...</div>}
            {uploadUrl && (
              <div className="msg">
                Uploaded URL: <span className="mono">{uploadUrl}</span>
              </div>
            )}
            {uploadError && <div className="error">{uploadError}</div>}
          </div>
        </div>

          <div className="panel">
            <div className="panel-title">Section Items</div>
            <div className="row">
              {slug === "Home" ? (
                <select value={sectionKey} onChange={(e) => setSectionKey(e.target.value)}>
                  <option value="">Select section</option>
                  {homeSectionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  placeholder="section key (e.g. core_values)"
                  value={sectionKey}
                  onChange={(e) => setSectionKey(e.target.value)}
                />
              )}
            <button onClick={loadItems} disabled={itemsLoading}>
              {itemsLoading ? "Loading..." : "Load"}
            </button>
            <button className="primary" onClick={addItem} disabled={!sectionKey}>
              Add Item
            </button>
          </div>
          {itemsMessage && <div className="msg">{itemsMessage}</div>}
          <div className="item-list">
            {items.map((item) => (
              <div className="item-card" key={item.id}>
                <div className="item-head">
                  <div className="badge">Item</div>
                  <div className="id">{item.id}</div>
                </div>
                <div className="item-grid">
                  <input
                    value={item.title || ""}
                    onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    value={item.subtitle || ""}
                    onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                    placeholder="Subtitle"
                  />
                  <textarea
                    rows="3"
                    value={item.description || ""}
                    onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    value={item.image_url || ""}
                    onChange={(e) => updateItemField(item.id, "image_url", e.target.value)}
                    placeholder="Image URL"
                  />
                  <input
                    value={item.link_url || ""}
                    onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                    placeholder="Link URL"
                  />
                  <input
                    value={item.tag || ""}
                    onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    placeholder="Tag"
                  />
                  <input
                    type="number"
                    value={item.sort_order ?? 0}
                    onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                    placeholder="Sort Order"
                  />
                  <textarea
                    rows="3"
                    value={item.meta ? JSON.stringify(item.meta) : ""}
                    onChange={(e) => {
                      let val = {};
                      try {
                        val = e.target.value ? JSON.parse(e.target.value) : {};
                      } catch {
                        val = item.meta || {};
                      }
                      updateItemField(item.id, "meta", val);
                    }}
                    placeholder='Meta JSON (e.g. {"key":"value"})'
                  />
                </div>
                <div className="actions">
                  <button className="primary" onClick={() => saveItem(item)}>
                    Save Item
                  </button>
                  <button className="danger" onClick={() => removeItem(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-6);
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-1);
  }

  .sub {
    color: var(--color-dark-500);
  }

  .grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-5);
    margin-bottom: var(--space-6);
  }

  .panel {
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
  }

  .panel-title {
    font-weight: 700;
    margin-bottom: var(--space-4);
    color: var(--color-dark-800);
  }

  .form {
    display: grid;
    gap: var(--space-4);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  input,
  textarea {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #f9fafb;
  }

  select {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #f9fafb;
  }

  button {
    width: fit-content;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-full);
    background: var(--color-dark-100);
    color: var(--color-dark-800);
    font-weight: 600;
  }

  .primary {
    background: var(--gradient-primary);
    color: white;
  }

  .msg {
    color: var(--color-dark-600);
  }

  .error {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.08);
    border: 1px solid rgba(220, 38, 38, 0.2);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
  }

  .mono {
    font-family: var(--font-mono);
    word-break: break-all;
  }

  .media {
    margin-top: var(--space-6);
    display: grid;
    gap: var(--space-3);
    max-width: 720px;
  }

  .row {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    margin-bottom: var(--space-4);
  }

  .hint {
    font-size: 0.85rem;
    color: var(--color-dark-500);
    display: flex;
    align-items: center;
  }

  .item-list {
    display: grid;
    gap: var(--space-4);
  }

  .item-card {
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-4);
    display: grid;
    gap: var(--space-3);
  }

  .item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .badge {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: #eef2ff;
    color: #4f46e5;
    border-radius: 999px;
    font-weight: 700;
  }

  .id {
    font-size: 0.75rem;
    color: var(--color-dark-400);
  }

  .item-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
  }

  .actions {
    display: flex;
    gap: var(--space-3);
  }

  .danger {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .item-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .page-head {
      align-items: flex-start;
    }
  }
`;

export default PageEditor;
