import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";
import RichTextEditor from "../../components/admin/RichTextEditor";

const TYPES = [
  { value: "video", label: "Video" },
  { value: "comic", label: "Comic" },
  { value: "animation", label: "Animation" },
  { value: "photo", label: "Photo" },
  { value: "guide", label: "Guide (phases)" },
];

const emptyItemForm = {
  category_id: "",
  type: "guide",
  title: "",
  description: "",
  thumbnail_url: "",
  media_url: "",
  image_urls: [],
  phases: [],
  status: "published",
  sort_order: 0,
};

const emptyPhase = { title: "", body: "", image_url: "" };

// Pressing Enter in a plain text <input> inside a <form> submits that form
// by default. In this form that meant hitting Enter after typing the
// Title (or a phase title, or Sort order) silently saved and closed the
// form right then - which looked exactly like "the title/description got
// removed", since the whole form (including whatever wasn't filled in
// yet) just vanished. Scoped to <input> only, so <textarea> (Phase text)
// keeps normal Enter-for-newline and the Save button keeps normal
// Enter-to-activate when focused.
const preventEnterSubmit = (e) => {
  if (e.key === "Enter" && e.target.tagName === "INPUT") {
    e.preventDefault();
  }
};

// Description is stored as HTML (from RichTextEditor); the list preview
// shows plain text so tags don't appear literally.
const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
};

const ContentLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [categoryForm, setCategoryForm] = useState(null);
  const [savingCategory, setSavingCategory] = useState(false);

  const [itemForm, setItemForm] = useState(null);
  const [savingItem, setSavingItem] = useState(false);
  const [uploadingKey, setUploadingKey] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [catRes, itemsRes] = await Promise.all([
        adminApi.getContentLibraryCategories(),
        adminApi.getContentLibraryItems(filterCategoryId),
      ]);
      setCategories(catRes.data || []);
      setItems(itemsRes.data || []);
    } catch (err) {
      setError(err.message || "Failed to load content library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategoryId]);

  // --- Categories ---
  const openCreateCategory = () => {
    setCategoryForm({ name: "", sort_order: categories.length, is_active: true });
    setMessage("");
    setError("");
  };

  const openEditCategory = (cat) => {
    setCategoryForm({ ...cat });
    setMessage("");
    setError("");
  };

  const closeCategoryForm = () => setCategoryForm(null);

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setSavingCategory(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        name: categoryForm.name,
        sort_order: Number(categoryForm.sort_order) || 0,
        is_active: !!categoryForm.is_active,
      };
      if (categoryForm.id) {
        await adminApi.updateContentLibraryCategory(categoryForm.id, payload);
        setMessage("Category updated.");
      } else {
        await adminApi.createContentLibraryCategory(payload);
        setMessage("Category created.");
      }
      setCategoryForm(null);
      await load();
    } catch (err) {
      setError(err.message || "Failed to save category");
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (
      !window.confirm(
        `Delete category "${cat.name}"? All its items will also be deleted. This cannot be undone.`
      )
    )
      return;
    setError("");
    setMessage("");
    try {
      await adminApi.deleteContentLibraryCategory(cat.id);
      setMessage("Category deleted.");
      if (filterCategoryId === cat.id) setFilterCategoryId("");
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete category");
    }
  };

  // --- Items ---
  const openCreateItem = () => {
    setItemForm({ ...emptyItemForm, category_id: filterCategoryId || categories[0]?.id || "" });
    setMessage("");
    setError("");
  };

  const openEditItem = (item) => {
    setItemForm({
      ...emptyItemForm,
      ...item,
      image_urls: Array.isArray(item.image_urls) ? item.image_urls : [],
      phases: Array.isArray(item.phases) ? item.phases : [],
    });
    setMessage("");
    setError("");
  };

  const closeItemForm = () => setItemForm(null);

  const handleItemChange = (field, value) => {
    setItemForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file, key, onDone) => {
    setUploadingKey(key);
    setError("");
    try {
      const res = await adminApi.uploadMedia(file);
      onDone(res.url || "");
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploadingKey("");
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file, "thumbnail", (url) => handleItemChange("thumbnail_url", url));
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file, "media", (url) => handleItemChange("media_url", url));
  };

  // Comics are uploaded as one complete PDF (stored in media_url, same
  // field video/animation use for their file) rather than as separate
  // image pages - the app's comic viewer renders the PDF directly.
  const handleComicPdfUpload = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError(`${file.name} - comics need a PDF file.`);
      return;
    }

    uploadFile(file, "media", (url) => handleItemChange("media_url", url));
  };

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // allow re-selecting the same file(s) later
    if (!files.length) return;

    const nonImages = files.filter((f) => !f.type.startsWith("image/"));
    if (nonImages.length) {
      setError(
        `${nonImages.map((f) => f.name).join(", ")} - photos need image files (JPG, PNG, WEBP).`
      );
      return;
    }

    setUploadingKey("image");
    setError("");
    try {
      // Sequential, not Promise.all, so pages land in the order they were
      // selected instead of whichever upload happens to finish first.
      for (const file of files) {
        const res = await adminApi.uploadMedia(file);
        const url = res.url || "";
        if (url) {
          setItemForm((prev) => ({ ...prev, image_urls: [...(prev.image_urls || []), url] }));
        }
      }
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploadingKey("");
    }
  };

  const handleRemoveImage = (index) => {
    setItemForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  };

  const handleAddPhase = () => {
    setItemForm((prev) => ({ ...prev, phases: [...(prev.phases || []), { ...emptyPhase }] }));
  };

  const handlePhaseChange = (index, field, value) => {
    setItemForm((prev) => ({
      ...prev,
      phases: prev.phases.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
  };

  const handlePhaseImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file, `phase-${index}`, (url) => handlePhaseChange(index, "image_url", url));
  };

  const handleRemovePhase = (index) => {
    setItemForm((prev) => ({ ...prev, phases: prev.phases.filter((_, i) => i !== index) }));
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setSavingItem(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        category_id: itemForm.category_id,
        type: itemForm.type,
        title: itemForm.title,
        description: itemForm.description,
        thumbnail_url: itemForm.thumbnail_url,
        media_url: itemForm.media_url,
        image_urls: itemForm.image_urls || [],
        phases: itemForm.phases || [],
        status: itemForm.status,
        sort_order: Number(itemForm.sort_order) || 0,
      };
      if (itemForm.id) {
        await adminApi.updateContentLibraryItem(itemForm.id, payload);
        setMessage("Item updated.");
      } else {
        await adminApi.createContentLibraryItem(payload);
        setMessage("Item created.");
      }
      setItemForm(null);
      await load();
    } catch (err) {
      setError(err.message || "Failed to save item");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setError("");
    setMessage("");
    try {
      await adminApi.deleteContentLibraryItem(item.id);
      setMessage("Item deleted.");
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete item");
    }
  };

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || "Uncategorized";

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Wellness Hub</h1>
            <p>
              Manage the app's Wellness Hub - comics, videos, animations, photos and step-by-step
              guides shown to users, organized by category.
            </p>
          </div>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        <section className="categories-section">
          <div className="section-head">
            <h2>Categories</h2>
            <button className="primary" onClick={openCreateCategory}>
              Add Category
            </button>
          </div>

          {categoryForm && (
            <form
              className="form-card inline"
              onSubmit={handleSaveCategory}
              onKeyDown={preventEnterSubmit}
            >
              <label>
                Name
                <input
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={categoryForm.sort_order}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, sort_order: e.target.value }))}
                />
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={!!categoryForm.is_active}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, is_active: e.target.checked }))}
                />
                Active (visible in app)
              </label>
              <div className="form-actions">
                <button type="submit" className="primary" disabled={savingCategory}>
                  {savingCategory ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={closeCategoryForm} disabled={savingCategory}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="category-chips">
            <button
              className={`chip ${filterCategoryId === "" ? "active" : ""}`}
              onClick={() => setFilterCategoryId("")}
            >
              All
            </button>
            {categories.map((cat) => (
              <div key={cat.id} className={`chip-group ${filterCategoryId === cat.id ? "active" : ""}`}>
                <button className="chip" onClick={() => setFilterCategoryId(cat.id)}>
                  {cat.name}
                  {!cat.is_active && <span className="inactive-dot" title="Inactive" />}
                </button>
                <button className="chip-icon" onClick={() => openEditCategory(cat)} title="Edit">
                  ✎
                </button>
                <button className="chip-icon delete" onClick={() => handleDeleteCategory(cat)} title="Delete">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="items-section">
          <div className="section-head">
            <h2>Items</h2>
            <button className="primary" onClick={openCreateItem} disabled={categories.length === 0}>
              Add Item
            </button>
          </div>
          {categories.length === 0 && <p className="muted">Add a category first.</p>}

          {itemForm && (
            <form
              className="form-card"
              onSubmit={handleSaveItem}
              onKeyDown={preventEnterSubmit}
            >
              <h3>{itemForm.id ? "Edit Item" : "New Item"}</h3>
              <div className="grid">
                <label>
                  Category
                  <select
                    value={itemForm.category_id}
                    onChange={(e) => handleItemChange("category_id", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Type
                  <select value={itemForm.type} onChange={(e) => handleItemChange("type", e.target.value)}>
                    {TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Title
                  <input
                    value={itemForm.title}
                    onChange={(e) => handleItemChange("title", e.target.value)}
                    required
                  />
                </label>
                <label>
                  Status
                  <select value={itemForm.status} onChange={(e) => handleItemChange("status", e.target.value)}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
                <label>
                  Sort order
                  <input
                    type="number"
                    value={itemForm.sort_order}
                    onChange={(e) => handleItemChange("sort_order", e.target.value)}
                  />
                </label>
              </div>

              <label className="content-label">
                Description
                <RichTextEditor
                  value={itemForm.description || ""}
                  onChange={(html) => handleItemChange("description", html)}
                />
              </label>

              <label className="content-label">
                Thumbnail (shown on the library grid)
                <input type="file" accept="image/*" onChange={handleThumbnailUpload} disabled={!!uploadingKey} />
                {uploadingKey === "thumbnail" && <span className="msg">Uploading...</span>}
                {itemForm.thumbnail_url && (
                  <img className="preview" src={itemForm.thumbnail_url} alt="thumbnail preview" />
                )}
              </label>

              {(itemForm.type === "video" || itemForm.type === "animation") && (
                <label className="content-label">
                  {itemForm.type === "video" ? "Video file" : "Animation file"}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleMediaUpload}
                    disabled={!!uploadingKey}
                  />
                  {uploadingKey === "media" && <span className="msg">Uploading...</span>}
                  {itemForm.media_url && <span className="file-name">{itemForm.media_url}</span>}
                </label>
              )}

              {itemForm.type === "comic" && (
                <label className="content-label">
                  Comic PDF (the complete comic, all pages, as one file)
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleComicPdfUpload}
                    disabled={!!uploadingKey}
                  />
                  {uploadingKey === "media" && <span className="msg">Uploading...</span>}
                  {itemForm.media_url && (
                    <a href={itemForm.media_url} target="_blank" rel="noreferrer" className="file-name">
                      {itemForm.media_url}
                    </a>
                  )}
                </label>
              )}

              {itemForm.type === "photo" && (
                <div className="content-label">
                  <span>Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddImages}
                    disabled={!!uploadingKey}
                  />
                  <span className="msg">
                    Select multiple image files at once (hold Ctrl/Cmd to multi-select) - they'll be
                    added in the order you pick them.
                  </span>
                  {uploadingKey === "image" && <span className="msg">Uploading...</span>}
                  <div className="image-list">
                    {(itemForm.image_urls || []).map((url, i) => (
                      <div className="image-item" key={`${url}-${i}`}>
                        <img src={url} alt={`photo ${i + 1}`} />
                        <button type="button" onClick={() => handleRemoveImage(i)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {itemForm.type === "guide" && (
                <div className="phases">
                  <div className="section-head">
                    <h4>Phases / Sections</h4>
                    <button type="button" onClick={handleAddPhase}>
                      Add Phase
                    </button>
                  </div>
                  {(itemForm.phases || []).length === 0 && (
                    <p className="muted">No phases yet. Add at least one.</p>
                  )}
                  {(itemForm.phases || []).map((phase, i) => (
                    <div className="phase-card" key={i}>
                      <div className="phase-head">
                        <strong>Phase {i + 1}</strong>
                        <button type="button" className="delete" onClick={() => handleRemovePhase(i)}>
                          Remove
                        </button>
                      </div>
                      <label>
                        Phase title
                        <input
                          value={phase.title}
                          onChange={(e) => handlePhaseChange(i, "title", e.target.value)}
                        />
                      </label>
                      <label>
                        Phase text
                        <textarea
                          rows={3}
                          value={phase.body}
                          onChange={(e) => handlePhaseChange(i, "body", e.target.value)}
                        />
                      </label>
                      <label>
                        Phase image (optional)
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhaseImageUpload(i, e)}
                          disabled={!!uploadingKey}
                        />
                        {uploadingKey === `phase-${i}` && <span className="msg">Uploading...</span>}
                        {phase.image_url && <img className="preview" src={phase.image_url} alt="" />}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="primary" disabled={savingItem || !!uploadingKey}>
                  {savingItem ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={closeItemForm} disabled={savingItem}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="card">Loading...</div>
          ) : items.length === 0 ? (
            <div className="card">No items found.</div>
          ) : (
            <div className="list">
              {items.map((item) => (
                <article className="row-card" key={item.id}>
                  {item.thumbnail_url && <img className="thumb" src={item.thumbnail_url} alt="" />}
                  <div className="main">
                    <div className="row">
                      <h2>{item.title}</h2>
                      <span className="badge type">{item.type}</span>
                      <span className={`badge ${item.status}`}>{item.status}</span>
                    </div>
                    <p className="content-preview">{stripHtml(item.description)}</p>
                    <div className="meta">
                      <span>category: {categoryName(item.category_id)}</span>
                      <span>sort: {item.sort_order}</span>
                      {item.type === "guide" && <span>{(item.phases || []).length} phase(s)</span>}
                      {item.type === "photo" && (
                        <span>{(item.image_urls || []).length} image(s)</span>
                      )}
                      {item.type === "comic" && (
                        <span>{item.media_url ? "PDF uploaded" : "No PDF yet"}</span>
                      )}
                    </div>
                  </div>
                  <div className="actions">
                    <button onClick={() => openEditItem(item)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteItem(item)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .head {
    margin-bottom: var(--space-5);
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
    max-width: 720px;
  }

  section {
    margin-bottom: var(--space-6);
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }

  .section-head h2 {
    font-size: var(--text-xl);
  }

  .section-head h4 {
    font-size: var(--text-base);
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

  .muted {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
  }

  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .chip-group {
    display: flex;
    align-items: center;
    gap: 2px;
    background: var(--color-dark-100);
    border-radius: 999px;
    padding: 2px;
  }

  .chip-group.active {
    background: var(--gradient-primary);
  }

  .chip {
    background: transparent;
    border-radius: 999px;
    padding: 6px 14px;
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .chip-group.active .chip {
    color: #fff;
  }

  button.chip.active {
    background: var(--gradient-primary);
    color: #fff;
  }

  .chip-icon {
    background: transparent;
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  .chip-group.active .chip-icon {
    color: #fff;
  }

  .chip-icon.delete:hover {
    color: #dc2626;
  }

  .inactive-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #dc2626;
    display: inline-block;
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

  .form-card.inline {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    align-items: end;
    display: grid;
  }

  .form-card h3 {
    font-size: var(--text-lg);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  textarea,
  select {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
    font-family: inherit;
  }

  textarea {
    resize: vertical;
  }

  .preview {
    max-width: 160px;
    max-height: 120px;
    border-radius: var(--radius-lg);
    margin-top: 6px;
    object-fit: cover;
  }

  .msg {
    color: var(--color-dark-500);
    font-size: var(--text-xs);
  }

  .file-name {
    font-size: var(--text-xs);
    color: var(--color-dark-500);
    word-break: break-all;
  }

  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  .image-item {
    display: grid;
    gap: 6px;
    justify-items: center;
  }

  .image-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--radius-lg);
  }

  .image-item button {
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.75rem;
    padding: 4px 10px;
  }

  .phases {
    border-top: 1px solid var(--color-dark-100);
    padding-top: var(--space-4);
    display: grid;
    gap: var(--space-3);
  }

  .phase-card {
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    display: grid;
    gap: var(--space-3);
    background: #fafafa;
  }

  .phase-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .phase-head .delete {
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.75rem;
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
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .thumb {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    flex-shrink: 0;
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
    flex-wrap: wrap;
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
    flex-wrap: wrap;
    gap: var(--space-3);
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .badge {
    display: inline-flex;
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
    background: var(--color-dark-100);
  }

  .badge.published {
    background: #dcfce7;
    color: #166534;
  }

  .badge.draft {
    background: #fef3c7;
    color: #92400e;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .delete {
    background: #fee2e2;
    color: #991b1b;
  }

  @media (max-width: 800px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .form-card.inline {
      grid-template-columns: 1fr;
    }
  }
`;

export default ContentLibrary;
