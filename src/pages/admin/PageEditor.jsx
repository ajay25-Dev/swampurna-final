import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

function getMediaFileName(url) {
  if (!url) return "No image";
  try {
    const pathname = new URL(url).pathname || "";
    return decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "No image");
  } catch {
    return url.split("/").filter(Boolean).pop() || "No image";
  }
}

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const runCommand = (command, valueArg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("undo")}>↶</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("redo")}>↷</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H1")}>H1</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H2")}>H2</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H3")}>H3</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("bold")}>B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("italic")}>I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("underline")}>U</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertUnorderedList")}>• List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertOrderedList")}>1. List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "BLOCKQUOTE")}>❞</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("removeFormat")}>Tx</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertHorizontalRule")}>Break</button>
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
};

const PageEditor = () => {
  const { slug } = useParams();
  const isPhotoGallery = slug === "Photogallery";
  const isVideoGallery = slug === "Videogallery";
  const isImpactStory = slug === "Impactstory";
  const isNewsArticles = slug === "Newsarticles";
  const isFaqs = slug === "Faqs";
  const isCompetitionEvent = slug === "Compitionevent";
  const isMythsTaboos = slug === "Mythstaboos";
  const isMediaGallery = isPhotoGallery || isVideoGallery;
  const isSpecialEditor = isMediaGallery || isImpactStory || isNewsArticles || isFaqs || isCompetitionEvent || isMythsTaboos;
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
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [itemUploadingId, setItemUploadingId] = useState("");

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

  useEffect(() => {
    if (!isPhotoGallery) return;
    setSectionKey("gallery_images");
    loadItems("gallery_images");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhotoGallery, slug]);

  useEffect(() => {
    if (!isVideoGallery) return;
    setSectionKey("video_gallery");
    loadItems("video_gallery");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoGallery, slug]);

  useEffect(() => {
    if (!isImpactStory) return;
    setSectionKey("impact_articles");
    loadItems("impact_articles");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImpactStory, slug]);

  useEffect(() => {
    if (!isNewsArticles) return;
    setSectionKey("news_articles");
    loadItems("news_articles");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewsArticles, slug]);

  useEffect(() => {
    if (!isFaqs) return;
    setSectionKey("faq_items");
    loadItems("faq_items");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFaqs, slug]);

  useEffect(() => {
    if (!isCompetitionEvent) return;
    setSectionKey("competition_events");
    loadItems("competition_events");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompetitionEvent, slug]);

  useEffect(() => {
    if (!isMythsTaboos) return;
    setSectionKey("myths_items");
    loadItems("myths_items");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMythsTaboos, slug]);

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
    setItemsMessage("");
    try {
      const res = await adminApi.uploadMedia(file);
      const mediaUrl = res.url || "";
      setUploadUrl(mediaUrl);

      if (isPhotoGallery && mediaUrl) {
        const itemRes = await adminApi.createItem({
          page_slug: slug,
          section_key: "gallery_images",
          title: "",
          image_url: mediaUrl,
          sort_order: items.length,
        });
        setItems((prev) => [...prev, itemRes.data]);
        setItemsMessage("Image uploaded and added to gallery.");
      }
    } catch (err) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const loadItems = async (overrideSectionKey) => {
    const finalSectionKey = overrideSectionKey || sectionKey;
    if (!finalSectionKey) return;
    setItemsLoading(true);
    setItemsMessage("");
    try {
      const res = await adminApi.getItems(slug, finalSectionKey);
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

  const updateItemMetaField = (id, key, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, meta: { ...(item.meta || {}), [key]: value } }
          : item
      )
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
      const finalSectionKey = isPhotoGallery
        ? "gallery_images"
        : isVideoGallery
          ? "video_gallery"
        : isImpactStory
          ? "impact_articles"
            : isNewsArticles
              ? "news_articles"
            : isFaqs
              ? "faq_items"
            : isCompetitionEvent
              ? "competition_events"
            : isMythsTaboos
              ? "myths_items"
            : sectionKey;
      const res = await adminApi.createItem({
        page_slug: slug,
        section_key: finalSectionKey,
        title: isPhotoGallery ? "" : isVideoGallery ? "New Video" : isImpactStory ? "New Article" : isNewsArticles ? "New Article" : isFaqs ? "New question?" : isCompetitionEvent ? "New Event" : isMythsTaboos ? "New myth heading" : "New Item",
        image_url: isPhotoGallery ? uploadUrl : isVideoGallery ? "" : (isImpactStory || isNewsArticles || isCompetitionEvent) ? "" : undefined,
        description: isFaqs ? "New answer..." : undefined,
        tag: isFaqs ? "active" : isMythsTaboos ? "active" : undefined,
        subtitle: isCompetitionEvent ? "Event Date" : undefined,
        link_url: isCompetitionEvent ? "" : undefined,
        meta: isCompetitionEvent ? { location: "", buttonText: "Register Now", color: "primary" } : undefined,
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

  const onItemUpload = async (itemId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setItemUploadingId(itemId);
    setItemsMessage("");
    try {
      const res = await adminApi.uploadMedia(file);
      const mediaUrl = res.url || "";
      updateItemField(itemId, "image_url", mediaUrl);

      const item = items.find((it) => it.id === itemId);
      if (item) {
        const payload = { ...item, image_url: mediaUrl };
        delete payload.id;
        delete payload.created_at;
        const saveRes = await adminApi.updateItem(itemId, payload);
        setItems((prev) => prev.map((it) => (it.id === itemId ? saveRes.data : it)));
        setItemsMessage("Image uploaded and saved.");
      } else {
        setItemsMessage("Image uploaded. Click Save Item.");
      }
    } catch (err) {
      setItemsMessage(err.message || "Item upload failed");
    } finally {
      setItemUploadingId("");
      e.target.value = "";
    }
  };

  const addVideoByUrl = async () => {
    const rawUrl = String(newVideoUrl || "").trim();
    if (!rawUrl) {
      setItemsMessage("Please enter video URL.");
      return;
    }
    setItemsMessage("");
    try {
      const res = await adminApi.createItem({
        page_slug: slug,
        section_key: "video_gallery",
        title: String(newVideoTitle || "").trim() || "New Video",
        image_url: rawUrl,
        sort_order: items.length,
      });
      setItems((prev) => [...prev, res.data]);
      setNewVideoUrl("");
      setNewVideoTitle("");
      setItemsMessage("Video added.");
    } catch (err) {
      setItemsMessage(err.message || "Create failed");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="page-head">
          <div>
            <h1>Edit Page: {slug}</h1>
            <p className="sub">
              {isPhotoGallery
                ? "Upload images and save them to the photo gallery."
                : isVideoGallery
                  ? "Add video links and manage the video gallery."
                : isImpactStory
                  ? "Publish and manage Impact Story articles."
                    : isNewsArticles
                      ? "Publish and manage News & Article posts."
                      : isFaqs
                        ? "Manage FAQ question, answer and status."
                        : isCompetitionEvent
                          ? "Manage competition events and event details."
                          : isMythsTaboos
                            ? "Manage myths/taboos heading, description and status."
                  : "Manage page hero and content blocks."}
            </p>
          </div>
          <button className="primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid">
          {!isSpecialEditor && (
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
          )}

          {!isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
            <div className="panel">
              <div className="panel-title">{isVideoGallery ? "Add Video URL" : "Media Upload"}</div>
              {isVideoGallery ? (
                <div className="video-add-stack">
                  <input
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Video title (optional)"
                  />
                  <input
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="Video URL (YouTube, Bunny, Vimeo, etc.)"
                  />
                  <button className="primary" onClick={addVideoByUrl}>Add Video</button>
                </div>
              ) : (
                <>
                  <input type="file" onChange={onUpload} disabled={uploading} />
                  {uploading && <div className="msg">Uploading...</div>}
                  {uploadUrl && (
                    <div className="msg">
                      Uploaded image: <span className="mono">{getMediaFileName(uploadUrl)}</span>
                    </div>
                  )}
                  {uploadError && <div className="error">{uploadError}</div>}
                </>
              )}
            </div>
          )}
        </div>

          <div className="panel">
            <div className="panel-title">
              {isPhotoGallery
                ? "Gallery Images"
                : isVideoGallery
                  ? "Gallery Videos"
                  : isImpactStory
                    ? "Impact Articles"
                    : isNewsArticles
                      ? "News Articles"
                      : isFaqs
                        ? "FAQ Items"
                        : isCompetitionEvent
                          ? "Competition Events"
                          : isMythsTaboos
                            ? "Myths & Taboos Items"
                    : "Section Items"}
            </div>
            <div className="row">
              {slug === "Home" ? (
                <select value={sectionKey} onChange={(e) => setSectionKey(e.target.value)}>
                  <option value="">Select section</option>
                  {homeSectionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : isPhotoGallery ? (
                <input value="gallery_images" readOnly />
              ) : isVideoGallery ? (
                <input value="video_gallery" readOnly />
              ) : isImpactStory ? (
                <input value="impact_articles" readOnly />
              ) : isNewsArticles ? (
                <input value="news_articles" readOnly />
              ) : isFaqs ? (
                <input value="faq_items" readOnly />
              ) : isCompetitionEvent ? (
                <input value="competition_events" readOnly />
              ) : isMythsTaboos ? (
                <input value="myths_items" readOnly />
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
            <button className="primary" onClick={addItem} disabled={isSpecialEditor ? false : !sectionKey}>
              {isPhotoGallery
                ? "Add Empty Image Row"
                : isVideoGallery
                  ? "Add Empty Video Row"
                  : isImpactStory
                    ? "Add Article"
                    : isNewsArticles
                      ? "Add Article"
                    : isFaqs
                      ? "Add FAQ"
                    : isCompetitionEvent
                      ? "Add Event"
                    : isMythsTaboos
                      ? "Add Myth/Taboo"
                    : "Add Item"}
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
                <div
                  className={`item-grid ${isPhotoGallery ? "gallery-item-grid" : ""} ${isVideoGallery ? "video-item-grid" : ""} ${isImpactStory ? "impact-item-grid" : ""} ${isNewsArticles ? "news-item-grid" : ""} ${isFaqs ? "faq-item-grid" : ""} ${isCompetitionEvent ? "competition-item-grid" : ""} ${isMythsTaboos ? "myths-item-grid" : ""}`}
                >
                  {isPhotoGallery && (
                    <div className="gallery-preview">
                      {item.image_url ? (
                        <img
                          className="gallery-thumb"
                          src={item.image_url}
                          alt="Gallery item"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement?.classList.add("broken");
                          }}
                        />
                      ) : null}
                      <div className="gallery-preview-fallback">No Preview</div>
                    </div>
                  )}
                  {isPhotoGallery && (
                    <input
                      value={getMediaFileName(item.image_url)}
                      readOnly
                      placeholder="Image file"
                    />
                  )}
                  {isVideoGallery && (
                    <input
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Video title"
                    />
                  )}
                  {isVideoGallery && (
                    <input
                      value={item.image_url || ""}
                      onChange={(e) => updateItemField(item.id, "image_url", e.target.value)}
                      placeholder="Video URL"
                    />
                  )}
                  {isImpactStory && (
                    <input
                      className="impact-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Article title"
                    />
                  )}
                  {isImpactStory && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Article"} />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onItemUpload(item.id, e)}
                          disabled={itemUploadingId === item.id}
                        />
                      </label>
                      <span className="item-file-name">{getMediaFileName(item.image_url)}</span>
                    </div>
                  )}
                  {isImpactStory && (
                    <select
                      className="impact-tag"
                      value={item.tag || "primary"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isImpactStory && (
                    <div className="impact-description">
                      <RichTextEditor
                        value={item.description || ""}
                        onChange={(val) => updateItemField(item.id, "description", val)}
                      />
                    </div>
                  )}
                  {isNewsArticles && (
                    <input
                      className="news-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Article title"
                    />
                  )}
                  {isNewsArticles && (
                    <input
                      className="news-link"
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder="External website link (optional)"
                    />
                  )}
                  {isNewsArticles && (
                    <select
                      className="news-tag"
                      value={item.tag || "News"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="News">News</option>
                      <option value="Opinion">Opinion</option>
                      <option value="Research">Research</option>
                      <option value="Data">Data</option>
                    </select>
                  )}
                  {isNewsArticles && (
                    <input
                      className="news-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isNewsArticles && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Article"} />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onItemUpload(item.id, e)}
                          disabled={itemUploadingId === item.id}
                        />
                      </label>
                      <span className="item-file-name">{getMediaFileName(item.image_url)}</span>
                    </div>
                  )}
                  {isNewsArticles && (
                    <div className="impact-description">
                      <RichTextEditor
                        value={item.description || ""}
                        onChange={(val) => updateItemField(item.id, "description", val)}
                      />
                    </div>
                  )}
                  {isFaqs && (
                    <input
                      className="faq-question"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Question"
                    />
                  )}
                  {isFaqs && (
                    <textarea
                      className="faq-answer"
                      rows="5"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Answer"
                    />
                  )}
                  {isFaqs && (
                    <select
                      className="faq-status"
                      value={item.tag || "active"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                  {isFaqs && (
                    <input
                      className="faq-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Event title"
                    />
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-date"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Event date (e.g. November 10th, 2026)"
                    />
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-location"
                      value={item.meta?.location || ""}
                      onChange={(e) => updateItemMetaField(item.id, "location", e.target.value)}
                      placeholder="Location"
                    />
                  )}
                  {isCompetitionEvent && (
                    <select
                      className="comp-status"
                      value={item.tag || "upcoming"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="closed">Closed</option>
                    </select>
                  )}
                  {isCompetitionEvent && (
                    <select
                      className="comp-color"
                      value={item.meta?.color || "primary"}
                      onChange={(e) => updateItemMetaField(item.id, "color", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-button-text"
                      value={item.meta?.buttonText || ""}
                      onChange={(e) => updateItemMetaField(item.id, "buttonText", e.target.value)}
                      placeholder="Button Text"
                    />
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-link"
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder="Registration / external link (optional)"
                    />
                  )}
                  {isCompetitionEvent && (
                    <input
                      className="comp-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isCompetitionEvent && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Event"} />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onItemUpload(item.id, e)}
                          disabled={itemUploadingId === item.id}
                        />
                      </label>
                      <span className="item-file-name">{getMediaFileName(item.image_url)}</span>
                    </div>
                  )}
                  {isCompetitionEvent && (
                    <div className="impact-description">
                      <RichTextEditor
                        value={item.description || ""}
                        onChange={(val) => updateItemField(item.id, "description", val)}
                      />
                    </div>
                  )}
                  {isMythsTaboos && (
                    <input
                      className="myths-heading"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Heading"
                    />
                  )}
                  {isMythsTaboos && (
                    <textarea
                      className="myths-description"
                      rows="4"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {isMythsTaboos && (
                    <select
                      className="myths-status"
                      value={item.tag || "active"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Title"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Subtitle"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <textarea
                      rows="3"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      value={item.image_url || ""}
                      onChange={(e) => updateItemField(item.id, "image_url", e.target.value)}
                      placeholder="Image URL"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder="Link URL"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder="Tag"
                    />
                  )}
                  {!isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
                    <input
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isImpactStory && (
                    <input
                      className="impact-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && (
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
                  )}
                </div>
                <div className={`actions ${isSpecialEditor ? "gallery-actions" : ""}`}>
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

  .video-add-stack {
    display: grid;
    gap: var(--space-3);
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

  .gallery-item-grid {
    grid-template-columns: 160px minmax(0, 1fr) 130px;
    align-items: center;
  }

  .video-item-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 130px;
    align-items: center;
  }

  .impact-item-grid {
    grid-template-columns: minmax(0, 1fr) 170px 130px;
    align-items: start;
  }

  .news-item-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 170px 130px;
    align-items: start;
  }

  .faq-item-grid {
    grid-template-columns: minmax(0, 1fr) 170px 130px;
    align-items: start;
  }

  .competition-item-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 170px 130px;
    align-items: start;
  }

  .myths-item-grid {
    grid-template-columns: minmax(0, 1fr) 180px;
    align-items: start;
  }

  .impact-title {
    grid-column: 1;
  }

  .impact-tag {
    grid-column: 2;
  }

  .impact-sort {
    grid-column: 3;
  }

  .news-title {
    grid-column: 1 / 3;
  }

  .news-link {
    grid-column: 1 / 3;
  }

  .news-tag {
    grid-column: 3;
  }

  .news-sort {
    grid-column: 4;
  }

  .faq-question {
    grid-column: 1 / -1;
  }

  .faq-answer {
    grid-column: 1 / -1;
  }

  .faq-status {
    grid-column: 2;
  }

  .faq-sort {
    grid-column: 3;
  }

  .comp-title {
    grid-column: 1 / 3;
  }

  .comp-date {
    grid-column: 1;
  }

  .comp-location {
    grid-column: 2;
  }

  .comp-status {
    grid-column: 3;
  }

  .comp-color {
    grid-column: 4;
  }

  .comp-button-text {
    grid-column: 1;
  }

  .comp-link {
    grid-column: 2 / 4;
  }

  .comp-sort {
    grid-column: 4;
  }

  .myths-heading {
    grid-column: 1 / -1;
  }

  .myths-description {
    grid-column: 1 / -1;
  }

  .myths-status {
    grid-column: 2;
  }

  .impact-description {
    grid-column: 1 / -1;
  }

  .impact-item-upload {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    grid-column: 1 / -1;
    border: 1px dashed var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    background: #f8fafc;
  }

  .impact-image-preview {
    width: 120px;
    height: 74px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-dark-200);
    background: white;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark-400);
    font-size: 0.82rem;
    flex-shrink: 0;
  }

  .impact-image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-item-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-dark-200);
    background: #f3f4f6;
    color: var(--color-dark-700);
    font-weight: 600;
    cursor: pointer;
  }

  .upload-item-btn input {
    display: none;
  }

  .item-file-name {
    color: var(--color-dark-500);
    font-size: 0.86rem;
    word-break: break-word;
    flex: 1;
  }

  .rte {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #fff;
    overflow: hidden;
  }

  .rte-toolbar {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid var(--color-dark-100);
    background: #f8fafc;
    flex-wrap: wrap;
  }

  .rte-toolbar button {
    padding: 7px 11px;
    border-radius: 10px;
    background: #eef2f7;
    color: var(--color-dark-700);
    font-size: 0.85rem;
    border: 1px solid #d9e2ec;
  }

  .rte-editor {
    min-height: 260px;
    max-height: 520px;
    overflow-y: auto;
    padding: 14px;
    outline: none;
    line-height: 1.6;
    color: var(--color-dark-700);
  }

  .gallery-preview {
    width: 160px;
    height: 96px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-dark-200);
    overflow: hidden;
    background: var(--color-dark-50);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .gallery-preview-fallback {
    position: absolute;
    font-size: 0.82rem;
    color: var(--color-dark-400);
  }

  .gallery-preview.broken .gallery-preview-fallback {
    display: block;
  }

  .gallery-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    inset: 0;
  }

  .actions {
    display: flex;
    gap: var(--space-3);
  }

  .gallery-actions {
    margin-top: var(--space-1);
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

    .gallery-item-grid {
      grid-template-columns: 1fr;
    }

    .video-item-grid {
      grid-template-columns: 1fr;
    }

    .impact-item-grid {
      grid-template-columns: 1fr;
    }

    .news-item-grid {
      grid-template-columns: 1fr;
    }

    .faq-item-grid {
      grid-template-columns: 1fr;
    }

    .competition-item-grid {
      grid-template-columns: 1fr;
    }

    .myths-item-grid {
      grid-template-columns: 1fr;
    }

    .impact-item-upload {
      flex-wrap: wrap;
      align-items: center;
    }

    .impact-image-preview {
      width: 100%;
      height: 180px;
    }

    .gallery-preview {
      width: 100%;
      height: 180px;
    }

  }

  @media (max-width: 640px) {
    .page-head {
      align-items: flex-start;
    }
  }
`;

export default PageEditor;
