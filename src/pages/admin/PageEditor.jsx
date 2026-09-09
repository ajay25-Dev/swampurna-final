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
  const isImpactStories = slug === "Impactstories";
  const isNewsArticles = slug === "Newsarticles";
  const isFaqs = slug === "Faqs";
  const isCompetitionEvent = slug === "Compitionevent";
  const isMythsTaboos = slug === "Mythstaboos";
  const isMenstrualProducts = slug === "Menstrualproducts";
  const isGovernmentInitiatives = slug === "Governmentinitiatives";
  const isOurTeam = slug === "Ourteam";
  const isOurApproach = slug === "Ourapproach";
  const isHome = slug === "Home";
  const contentSlug = isHome ? "home" : slug;
  const isMediaGallery = isPhotoGallery || isVideoGallery;
  const isSpecialEditor = isMediaGallery || isImpactStory || isImpactStories || isNewsArticles || isFaqs || isCompetitionEvent || isMythsTaboos || isMenstrualProducts || isGovernmentInitiatives || isOurTeam || isOurApproach;
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
  const [newsCategories, setNewsCategories] = useState([]);
  const [newNewsCategory, setNewNewsCategory] = useState("");

  const homeSectionOptions = [
    { value: "hero_images", label: "Home Banner Images" },
    { value: "principal_investigator", label: "Principal Investigator" },
    { value: "home_about_header", label: "About Header (\"Know Who We Are\")" },
    { value: "home_about_accordion", label: "About Accordion (Vision / Mission / Story)" },
    { value: "home_about_video", label: "About Video" },
    { value: "home_features_header", label: "Why Choose Us Header" },
    { value: "home_features", label: "Why Choose Us Features" },
    { value: "home_updates_header", label: "News & Events Header" },
    { value: "home_current_updates", label: "News & Events - Current Updates" },
    { value: "home_upcoming_events", label: "News & Events - Upcoming Events" },
    { value: "home_latest_updates", label: "News & Events - Latest Updates" },
  ];

  const isHeroImages = isHome && sectionKey === "hero_images";
  const isPrincipalInvestigator = isHome && sectionKey === "principal_investigator";
  const isAboutHeader = isHome && sectionKey === "home_about_header";
  const isAboutAccordion = isHome && sectionKey === "home_about_accordion";
  const isAboutVideo = isHome && sectionKey === "home_about_video";
  const isFeaturesHeader = isHome && sectionKey === "home_features_header";
  const isFeatures = isHome && sectionKey === "home_features";
  const isUpdatesHeader = isHome && sectionKey === "home_updates_header";
  const isCurrentUpdates = isHome && sectionKey === "home_current_updates";
  const isUpcomingEvents = isHome && sectionKey === "home_upcoming_events";
  const isLatestUpdates = isHome && sectionKey === "home_latest_updates";
  const isEventSection = isCurrentUpdates || isUpcomingEvents || isLatestUpdates;
  const isHomeDedicated = isHeroImages || isPrincipalInvestigator || isAboutHeader || isAboutAccordion || isAboutVideo || isFeaturesHeader || isFeatures || isUpdatesHeader || isEventSection;
  const isSingletonSection = isPrincipalInvestigator || isAboutHeader || isAboutVideo || isFeaturesHeader || isUpdatesHeader;

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
    if (!isImpactStories) return;
    setSectionKey("impact_stories");
    loadItems("impact_stories");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImpactStories, slug]);

  useEffect(() => {
    if (!isNewsArticles) return;
    setSectionKey("news_articles");
    loadItems("news_articles");
    loadNewsCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewsArticles, slug]);

  const loadNewsCategories = async () => {
    try {
      const res = await adminApi.getNewsCategories();
      setNewsCategories(res.data || []);
    } catch {
      setNewsCategories([]);
    }
  };

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

  useEffect(() => {
    if (!isMenstrualProducts) return;
    setSectionKey("menstrual_products");
    loadItems("menstrual_products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenstrualProducts, slug]);

  useEffect(() => {
    if (!isGovernmentInitiatives) return;
    setSectionKey("government_timeline");
    loadItems("government_timeline");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGovernmentInitiatives, slug]);

  useEffect(() => {
    if (!isOurTeam) return;
    setSectionKey("team_members");
    loadItems("team_members");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOurTeam, slug]);

  useEffect(() => {
    if (!isOurApproach) return;
    setSectionKey("approach_items");
    loadItems("approach_items");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOurApproach, slug]);

  useEffect(() => {
    if (!isHome || !sectionKey) return;
    loadItems(sectionKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome, sectionKey]);

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
          page_slug: contentSlug,
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
      const res = await adminApi.getItems(contentSlug, finalSectionKey);
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

  const updateItemStat = (id, statIndex, key, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const stats = Array.isArray(item.meta?.stats) ? [...item.meta.stats] : [{}, {}];
        while (stats.length <= statIndex) stats.push({});
        stats[statIndex] = { ...stats[statIndex], [key]: value };
        return { ...item, meta: { ...(item.meta || {}), stats } };
      })
    );
  };

  const saveItem = async (item) => {
    setItemsMessage("");
    const payload = { ...item };
    if (isNewsArticles) {
      const selectedCategory =
        newsCategories.find((cat) => cat.id === item.category_id) ||
        newsCategories.find(
          (cat) =>
            String(cat.name || "").trim().toLowerCase() ===
            String(item.category || item.tag || "").trim().toLowerCase()
        ) ||
        newsCategories[0] ||
        null;
      payload.category_id = selectedCategory?.id || null;
      payload.category = selectedCategory?.name || item.category || item.tag || "News";
      payload.tag = payload.tag || payload.category;
    }
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
            : isImpactStories
              ? "impact_stories"
            : isNewsArticles
              ? "news_articles"
            : isFaqs
              ? "faq_items"
            : isCompetitionEvent
              ? "competition_events"
            : isMythsTaboos
              ? "myths_items"
            : isMenstrualProducts
              ? "menstrual_products"
            : isGovernmentInitiatives
              ? "government_timeline"
            : isOurTeam
              ? "team_members"
            : isOurApproach
              ? "approach_items"
            : sectionKey;
      const res = await adminApi.createItem({
        page_slug: contentSlug,
        section_key: finalSectionKey,
        title: isPhotoGallery ? "" : isVideoGallery ? "New Video" : isImpactStory ? "New Article" : isImpactStories ? "New Story" : isNewsArticles ? "New Article" : isFaqs ? "New question?" : isCompetitionEvent ? "New Event" : isMythsTaboos ? "New myth heading" : isMenstrualProducts ? "New Product" : isGovernmentInitiatives ? "New milestone title" : isOurTeam ? "New Team Member" : isOurApproach ? "New Approach Title" : isHeroImages ? "" : isPrincipalInvestigator ? "Dr. Full Name" : isAboutHeader ? "Know Who We Are" : isAboutAccordion ? "New accordion title" : isAboutVideo ? "Watch Our Story" : isFeaturesHeader ? "Why Millions of Women Choose Swampurna?" : isFeatures ? "New feature title" : isUpdatesHeader ? "News & Events" : isEventSection ? "New update text" : "New Item",
        image_url: isPhotoGallery ? uploadUrl : isVideoGallery ? "" : (isImpactStory || isImpactStories || isNewsArticles || isCompetitionEvent || isMenstrualProducts || isOurTeam || isOurApproach || isHeroImages || isPrincipalInvestigator || isAboutVideo || isEventSection) ? "" : undefined,
        description: isFaqs ? "New answer..." : isMenstrualProducts ? "" : isGovernmentInitiatives ? "" : isOurTeam ? "" : isOurApproach ? "" : (isPrincipalInvestigator || isAboutAccordion) ? "" : isFeatures ? "" : isEventSection ? "" : undefined,
        tag: isFaqs ? "active" : isMythsTaboos ? "active" : isMenstrualProducts ? "primary" : isOurTeam ? "primary" : isOurApproach ? "primary" : isAboutHeader ? "About Swampurna" : isAboutAccordion ? "✨" : isFeatures ? "primary" : isFeaturesHeader ? "Why Choose Us" : isUpdatesHeader ? "Stay Updated" : isEventSection ? "Category" : undefined,
        meta: isImpactStories ? { color: "primary", isHeader: false } : isCompetitionEvent ? { location: "", buttonText: "Register Now", color: "primary" } : isGovernmentInitiatives ? { government: "", status: "", beneficiaries: "" } : isOurTeam ? { qualification: "", email: "" } : isOurApproach ? { icon: "smartphone" } : isPrincipalInvestigator ? { label: "Principal Investigator", stats: [{ label: "Publications", value: "" }, { label: "Years Exp", value: "" }] } : isAboutAccordion ? { color: "primary" } : isFeatures ? { icon: "shield" } : isEventSection ? { status: "draft", expires_at: "" } : undefined,
        category_id: isNewsArticles ? (newsCategories[0]?.id || null) : undefined,
        category: isNewsArticles ? (newsCategories[0]?.name || "News") : undefined,
        subtitle: isCompetitionEvent ? "Event Date" : isGovernmentInitiatives ? "2026" : isOurTeam ? "Team Member" : isPrincipalInvestigator ? "Ph.D." : isAboutHeader ? "Discover our journey, mission, and the impact we're making in menstrual health education" : isAboutVideo ? "Learn about our mission" : isFeaturesHeader ? "Trusted by women across India for reliable, secure, and personalized menstrual health tracking" : isUpdatesHeader ? "Keep track of our latest activities, upcoming events, and important announcements" : isEventSection ? "Date" : undefined,
        link_url: isCompetitionEvent ? "" : isAboutVideo ? "" : isEventSection ? "" : undefined,
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

  const addNewsCategory = async () => {
    const name = String(newNewsCategory || "").trim();
    if (!name) {
      setItemsMessage("Enter category name.");
      return;
    }
    setItemsMessage("");
    try {
      await adminApi.createNewsCategory({ name, is_active: true, sort_order: newsCategories.length + 1 });
      setNewNewsCategory("");
      await loadNewsCategories();
      setItemsMessage("Category added.");
    } catch (err) {
      setItemsMessage(err.message || "Failed to add category");
    }
  };

  const deleteNewsCategory = async (id) => {
    setItemsMessage("");
    try {
      await adminApi.deleteNewsCategory(id);
      await loadNewsCategories();
      setItemsMessage("Category deleted.");
    } catch (err) {
      setItemsMessage(err.message || "Failed to delete category");
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
        page_slug: contentSlug,
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
                  : isImpactStories
                    ? "Use this simple form to add or update each Impact Story."
                    : isNewsArticles
                      ? "Publish and manage News & Article posts."
                      : isFaqs
                        ? "Manage FAQ question, answer and status."
                        : isCompetitionEvent
                          ? "Manage competition events and event details."
                          : isMythsTaboos
                            ? "Manage myths/taboos heading, description and status."
                            : isMenstrualProducts
                              ? "Add each menstrual product with its name, image, description and color."
                              : isGovernmentInitiatives
                                ? "Add each timeline milestone with year, title, government body, status, beneficiaries and description."
                              : isOurTeam
                                ? "Add each team member with photo, name, role, qualification, designation, email and bio."
                                : isOurApproach
                                  ? "Add each approach/objective with icon, image, title and description."
                                  : isHeroImages
                                    ? "Upload and reorder the homepage banner/slider images."
                                    : isPrincipalInvestigator
                                      ? "Edit the Principal Investigator profile shown on the homepage."
                                      : isAboutHeader
                                        ? "Edit the \"Know Who We Are\" section heading."
                                        : isAboutAccordion
                                          ? "Add the Vision / Mission / Story accordion cards."
                                          : isAboutVideo
                                            ? "Edit the homepage story video and its link."
                                            : isFeaturesHeader
                                              ? "Edit the \"Why Choose Us\" section heading."
                                              : isFeatures
                                                ? "Add each 'Why Choose Us' feature card with icon, title and description."
                                                : isUpdatesHeader
                                                  ? "Edit the \"News & Events\" section heading."
                                                  : isCurrentUpdates
                                                    ? "Add items shown in the Current Updates column."
                                                    : isUpcomingEvents
                                                      ? "Add items shown in the Upcoming Events column."
                                                      : isLatestUpdates
                                                        ? "Add items shown in the Latest Updates column."
                                                        : isHome
                                                          ? "Pick a section below to manage its content."
                  : "Manage page hero and content blocks."}
            </p>
          </div>
          <button className="primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid">
          {!isSpecialEditor && !isHomeDedicated && (
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

          {!isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
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

        {isNewsArticles && (
          <div className="panel">
            <div className="panel-title">News Categories</div>
            <div className="row">
              <input
                placeholder="New category name"
                value={newNewsCategory}
                onChange={(e) => setNewNewsCategory(e.target.value)}
              />
              <button className="primary" onClick={addNewsCategory}>Add Category</button>
            </div>
            <div className="chip-list">
              {newsCategories.map((cat) => (
                <div key={cat.id} className="chip">
                  <span>{cat.name}</span>
                  <button className="danger" onClick={() => deleteNewsCategory(cat.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

          <div className="panel">
            <div className="panel-title">
              {isPhotoGallery
                ? "Gallery Images"
                : isVideoGallery
                  ? "Gallery Videos"
                  : isImpactStory
                    ? "Impact Articles"
                    : isImpactStories
                      ? "Impact Stories"
                    : isNewsArticles
                      ? "News Articles"
                      : isFaqs
                        ? "FAQ Items"
                        : isCompetitionEvent
                          ? "Competition Events"
                          : isMythsTaboos
                            ? "Myths & Taboos Items"
                            : isMenstrualProducts
                              ? "Menstrual Products"
                              : isGovernmentInitiatives
                                ? "Timeline Milestones"
                                : isOurTeam
                                  ? "Team Members"
                                  : isOurApproach
                                    ? "Approach Items"
                                    : isHeroImages
                                      ? "Banner Images"
                                      : isPrincipalInvestigator
                                        ? "Principal Investigator Profile"
                                        : isAboutHeader
                                          ? "About Header"
                                          : isAboutAccordion
                                            ? "Vision / Mission / Story Cards"
                                            : isAboutVideo
                                              ? "Story Video"
                                              : isFeaturesHeader
                                                ? "Why Choose Us Header"
                                                : isFeatures
                                                  ? "Why Choose Us Features"
                                                  : isUpdatesHeader
                                                    ? "News & Events Header"
                                                    : isCurrentUpdates
                                                      ? "Current Updates"
                                                      : isUpcomingEvents
                                                        ? "Upcoming Events"
                                                        : isLatestUpdates
                                                          ? "Latest Updates"
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
              ) : isImpactStories ? (
                <input value="impact_stories" readOnly />
              ) : isNewsArticles ? (
                <input value="news_articles" readOnly />
              ) : isFaqs ? (
                <input value="faq_items" readOnly />
              ) : isCompetitionEvent ? (
                <input value="competition_events" readOnly />
              ) : isMythsTaboos ? (
                <input value="myths_items" readOnly />
              ) : isMenstrualProducts ? (
                <input value="menstrual_products" readOnly />
              ) : isGovernmentInitiatives ? (
                <input value="government_timeline" readOnly />
              ) : isOurTeam ? (
                <input value="team_members" readOnly />
              ) : isOurApproach ? (
                <input value="approach_items" readOnly />
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
            <button
              className="primary"
              onClick={addItem}
              disabled={(!isSpecialEditor && !sectionKey) || (isSingletonSection && items.length > 0)}
            >
              {isPhotoGallery
                ? "Add Empty Image Row"
                : isVideoGallery
                  ? "Add Empty Video Row"
                  : isImpactStory
                    ? "Add Article"
                    : isImpactStories
                      ? "Add Story"
                    : isNewsArticles
                      ? "Add Article"
                    : isFaqs
                      ? "Add FAQ"
                    : isCompetitionEvent
                      ? "Add Event"
                    : isMythsTaboos
                      ? "Add Myth/Taboo"
                    : isMenstrualProducts
                      ? "Add Product"
                    : isGovernmentInitiatives
                      ? "Add Milestone"
                    : isOurTeam
                      ? "Add Team Member"
                    : isOurApproach
                      ? "Add Approach"
                    : isHeroImages
                      ? "Add Banner Image"
                    : isPrincipalInvestigator
                      ? (items.length > 0 ? "Profile Created" : "Create Profile")
                    : isAboutHeader
                      ? (items.length > 0 ? "Header Created" : "Create Header")
                    : isAboutAccordion
                      ? "Add Card"
                    : isAboutVideo
                      ? (items.length > 0 ? "Video Created" : "Create Video")
                    : isFeaturesHeader
                      ? (items.length > 0 ? "Header Created" : "Create Header")
                    : isFeatures
                      ? "Add Feature"
                    : isUpdatesHeader
                      ? (items.length > 0 ? "Header Created" : "Create Header")
                    : isCurrentUpdates
                      ? "Add Current Update"
                    : isUpcomingEvents
                      ? "Add Upcoming Event"
                    : isLatestUpdates
                      ? "Add Latest Update"
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
                  className={`item-grid ${isPhotoGallery ? "gallery-item-grid" : ""} ${isVideoGallery ? "video-item-grid" : ""} ${isImpactStory || isImpactStories ? "impact-item-grid" : ""} ${isNewsArticles ? "news-item-grid" : ""} ${isFaqs ? "faq-item-grid" : ""} ${isCompetitionEvent ? "competition-item-grid" : ""} ${isMythsTaboos ? "myths-item-grid" : ""} ${isMenstrualProducts ? "product-item-grid" : ""} ${isGovernmentInitiatives ? "gov-item-grid" : ""} ${isOurTeam ? "team-item-grid" : ""} ${isOurApproach ? "approach-item-grid" : ""} ${isHeroImages ? "hero-item-grid" : ""} ${isPrincipalInvestigator ? "pi-item-grid" : ""} ${isAboutHeader ? "about-header-item-grid" : ""} ${isAboutAccordion ? "accordion-item-grid" : ""} ${isAboutVideo ? "about-video-item-grid" : ""} ${isFeaturesHeader ? "about-header-item-grid" : ""} ${isFeatures ? "feature-item-grid" : ""} ${isUpdatesHeader ? "about-header-item-grid" : ""} ${isEventSection ? "event-item-grid" : ""}`}
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
                  {isImpactStories && (
                    <input
                      className="impact-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Story title"
                    />
                  )}
                  {isImpactStories && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Story"} />
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
                  {isImpactStories && (
                    <select
                      className="impact-tag"
                      value={item.meta?.color || "primary"}
                      onChange={(e) => updateItemMetaField(item.id, "color", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isImpactStories && (
                    <select
                      className="impact-header"
                      value={item.meta?.isHeader ? "yes" : "no"}
                      onChange={(e) => updateItemMetaField(item.id, "isHeader", e.target.value === "yes")}
                    >
                      <option value="no">Normal Story</option>
                      <option value="yes">Header Story</option>
                    </select>
                  )}
                  {isImpactStories && (
                    <textarea
                      rows="6"
                      className="impact-description"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Story content"
                    />
                  )}
                  {isImpactStories && (
                    <input
                      className="impact-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
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
                      value={item.category_id || ""}
                      onChange={(e) => {
                        const selected = newsCategories.find((cat) => cat.id === e.target.value);
                        updateItemField(item.id, "category_id", e.target.value || null);
                        updateItemField(item.id, "category", selected?.name || "");
                        updateItemField(item.id, "tag", selected?.name || "");
                      }}
                    >
                      {newsCategories.length ? newsCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      )) : (
                        <option value="">No categories</option>
                      )}
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
                  {isMenstrualProducts && (
                    <input
                      className="product-name"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Product name (e.g. Menstrual Cup)"
                    />
                  )}
                  {isMenstrualProducts && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Product"} />
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
                  {isMenstrualProducts && (
                    <select
                      className="product-color"
                      value={item.tag || "primary"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isMenstrualProducts && (
                    <input
                      className="product-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isMenstrualProducts && (
                    <textarea
                      className="product-description"
                      rows="5"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-year"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Year (e.g. 2011 or 2016 - 2020)"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Milestone title"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-government"
                      value={item.meta?.government || ""}
                      onChange={(e) => updateItemMetaField(item.id, "government", e.target.value)}
                      placeholder="Government (e.g. Ministry of Health & Family Welfare)"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-status"
                      value={item.meta?.status || ""}
                      onChange={(e) => updateItemMetaField(item.id, "status", e.target.value)}
                      placeholder="Status (e.g. Ongoing national mission)"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-beneficiaries"
                      value={item.meta?.beneficiaries || ""}
                      onChange={(e) => updateItemMetaField(item.id, "beneficiaries", e.target.value)}
                      placeholder="Beneficiaries (e.g. Rural adolescent girls 10-19 years)"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <textarea
                      className="gov-description"
                      rows="5"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {isGovernmentInitiatives && (
                    <input
                      className="gov-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isOurTeam && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Team member"} />
                        ) : (
                          <span>No Photo</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Photo"}
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
                  {isOurTeam && (
                    <input
                      className="team-name"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Full name (e.g. Dr. Suparna Dutta)"
                    />
                  )}
                  {isOurTeam && (
                    <input
                      className="team-role"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Role / badge (e.g. Principal Investigator)"
                    />
                  )}
                  {isOurTeam && (
                    <select
                      className="team-color"
                      value={item.tag || "primary"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isOurTeam && (
                    <input
                      className="team-qualification"
                      value={item.meta?.qualification || ""}
                      onChange={(e) => updateItemMetaField(item.id, "qualification", e.target.value)}
                      placeholder="Qualification (e.g. Ph.D.)"
                    />
                  )}
                  {isOurTeam && (
                    <input
                      className="team-designation"
                      value={item.meta?.designation || ""}
                      onChange={(e) => updateItemMetaField(item.id, "designation", e.target.value)}
                      placeholder="Designation (e.g. Associate Professor)"
                    />
                  )}
                  {isOurTeam && (
                    <input
                      className="team-email"
                      type="email"
                      value={item.meta?.email || ""}
                      onChange={(e) => updateItemMetaField(item.id, "email", e.target.value)}
                      placeholder="Email (optional)"
                    />
                  )}
                  {isOurTeam && (
                    <textarea
                      className="team-description"
                      rows="6"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Bio / description shown in the profile popup"
                    />
                  )}
                  {isOurTeam && (
                    <input
                      className="team-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isOurApproach && (
                    <input
                      className="approach-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Title (e.g. Community Sensitization & Mobilization)"
                    />
                  )}
                  {isOurApproach && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Approach"} />
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
                  {isOurApproach && (
                    <select
                      className="approach-icon"
                      value={item.meta?.icon || "smartphone"}
                      onChange={(e) => updateItemMetaField(item.id, "icon", e.target.value)}
                    >
                      <option value="smartphone">Smartphone</option>
                      <option value="message">Message</option>
                      <option value="trending">Trending Up</option>
                      <option value="globe">Globe</option>
                      <option value="heart">Heart</option>
                    </select>
                  )}
                  {isOurApproach && (
                    <select
                      className="approach-color"
                      value={item.tag || "primary"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isOurApproach && (
                    <textarea
                      className="approach-description"
                      rows="6"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {isOurApproach && (
                    <input
                      className="approach-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isHeroImages && (
                    <div className="gallery-preview">
                      {item.image_url ? (
                        <img
                          className="gallery-thumb"
                          src={item.image_url}
                          alt="Banner"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement?.classList.add("broken");
                          }}
                        />
                      ) : null}
                      <div className="gallery-preview-fallback">No Preview</div>
                    </div>
                  )}
                  {isHeroImages && (
                    <label className="upload-item-btn hero-upload-btn">
                      {itemUploadingId === item.id ? "Uploading..." : "Upload Banner Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onItemUpload(item.id, e)}
                        disabled={itemUploadingId === item.id}
                      />
                    </label>
                  )}
                  {isHeroImages && (
                    <input
                      className="hero-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isPrincipalInvestigator && (
                    <div className="impact-item-upload pi-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Profile"} />
                        ) : (
                          <span>No Photo</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Photo"}
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
                  {isPrincipalInvestigator && (
                    <input
                      className="pi-name"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Full name (e.g. Dr. Suparna Dutta)"
                    />
                  )}
                  {isPrincipalInvestigator && (
                    <input
                      className="pi-label"
                      value={item.meta?.label || ""}
                      onChange={(e) => updateItemMetaField(item.id, "label", e.target.value)}
                      placeholder="Eyebrow label (e.g. Principal Investigator)"
                    />
                  )}
                  {isPrincipalInvestigator && (
                    <textarea
                      className="pi-qualification"
                      rows="3"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder={"Qualification lines shown under the name (one per line), e.g.\nPh.D.\nAssociate Professor, Humanities Communication"}
                    />
                  )}
                  {isPrincipalInvestigator && (
                    <div className="pi-stat">
                      <input
                        value={item.meta?.stats?.[0]?.label || ""}
                        onChange={(e) => updateItemStat(item.id, 0, "label", e.target.value)}
                        placeholder="Stat 1 label (e.g. Publications)"
                      />
                      <input
                        value={item.meta?.stats?.[0]?.value || ""}
                        onChange={(e) => updateItemStat(item.id, 0, "value", e.target.value)}
                        placeholder="Stat 1 value (e.g. 25+)"
                      />
                    </div>
                  )}
                  {isPrincipalInvestigator && (
                    <div className="pi-stat">
                      <input
                        value={item.meta?.stats?.[1]?.label || ""}
                        onChange={(e) => updateItemStat(item.id, 1, "label", e.target.value)}
                        placeholder="Stat 2 label (e.g. Years Exp)"
                      />
                      <input
                        value={item.meta?.stats?.[1]?.value || ""}
                        onChange={(e) => updateItemStat(item.id, 1, "value", e.target.value)}
                        placeholder="Stat 2 value (e.g. 26+)"
                      />
                    </div>
                  )}
                  {isPrincipalInvestigator && (
                    <textarea
                      className="pi-bio"
                      rows="6"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Full bio shown next to the profile"
                    />
                  )}
                  {isAboutHeader && (
                    <input
                      className="about-header-tag"
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder="Eyebrow tag (e.g. About Swampurna)"
                    />
                  )}
                  {isAboutHeader && (
                    <input
                      className="about-header-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Heading (e.g. Know Who We Are)"
                    />
                  )}
                  {isAboutHeader && (
                    <textarea
                      className="about-header-subtitle"
                      rows="3"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Subtitle text shown under the heading"
                    />
                  )}
                  {isAboutAccordion && (
                    <input
                      className="accordion-emoji"
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder="Emoji (e.g. ✨)"
                    />
                  )}
                  {isAboutAccordion && (
                    <input
                      className="accordion-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Card title (e.g. Our Vision)"
                    />
                  )}
                  {isAboutAccordion && (
                    <select
                      className="accordion-color"
                      value={item.meta?.color || "primary"}
                      onChange={(e) => updateItemMetaField(item.id, "color", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isAboutAccordion && (
                    <textarea
                      className="accordion-description"
                      rows="4"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Card description"
                    />
                  )}
                  {isAboutAccordion && (
                    <input
                      className="accordion-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isAboutVideo && (
                    <input
                      className="video-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Title (e.g. Watch Our Story)"
                    />
                  )}
                  {isAboutVideo && (
                    <textarea
                      className="video-subtitle"
                      rows="2"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Subtitle text"
                    />
                  )}
                  {isAboutVideo && (
                    <input
                      className="video-embed"
                      value={item.image_url || ""}
                      onChange={(e) => updateItemField(item.id, "image_url", e.target.value)}
                      placeholder="YouTube embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID)"
                    />
                  )}
                  {isAboutVideo && (
                    <input
                      className="video-link"
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder="Full documentary / watch link (e.g. https://www.youtube.com/watch?v=VIDEO_ID)"
                    />
                  )}
                  {(isFeaturesHeader || isUpdatesHeader) && (
                    <input
                      className="about-header-tag"
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder={isFeaturesHeader ? "Eyebrow tag (e.g. Why Choose Us)" : "Eyebrow tag (e.g. Stay Updated)"}
                    />
                  )}
                  {(isFeaturesHeader || isUpdatesHeader) && (
                    <input
                      className="about-header-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder={isFeaturesHeader ? "Heading (e.g. Why Millions of Women Choose Swampurna?)" : "Heading (e.g. News & Events)"}
                    />
                  )}
                  {(isFeaturesHeader || isUpdatesHeader) && (
                    <textarea
                      className="about-header-subtitle"
                      rows="3"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Subtitle text shown under the heading"
                    />
                  )}
                  {isFeatures && (
                    <input
                      className="feature-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Feature title (e.g. Reliable Predictions)"
                    />
                  )}
                  {isFeatures && (
                    <select
                      className="feature-icon"
                      value={item.meta?.icon || "shield"}
                      onChange={(e) => updateItemMetaField(item.id, "icon", e.target.value)}
                    >
                      <option value="shield">Shield</option>
                      <option value="heart">Heart</option>
                      <option value="lock">Lock</option>
                    </select>
                  )}
                  {isFeatures && (
                    <select
                      className="feature-color"
                      value={item.tag || "primary"}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="accent">Accent</option>
                    </select>
                  )}
                  {isFeatures && (
                    <textarea
                      className="feature-description"
                      rows="4"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {isFeatures && (
                    <input
                      className="feature-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {isEventSection && (
                    <input
                      className="event-category"
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder="Category badge (e.g. Workshop, Announcement)"
                    />
                  )}
                  {isEventSection && (
                    <input
                      className="event-date"
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Date text (e.g. 12 Mar 2026)"
                    />
                  )}
                  {isEventSection && (
                    <select
                      className="event-status"
                      value={item.meta?.status || "draft"}
                      onChange={(e) => updateItemMetaField(item.id, "status", e.target.value)}
                    >
                      <option value="draft">Draft (hidden from site)</option>
                      <option value="published">Published (visible on site)</option>
                    </select>
                  )}
                  {isEventSection && (
                    <label className="event-expiry-label">
                      Expiry date (optional)
                      <input
                        className="event-expiry"
                        type="date"
                        value={item.meta?.expires_at || ""}
                        onChange={(e) => updateItemMetaField(item.id, "expires_at", e.target.value)}
                      />
                    </label>
                  )}
                  {isEventSection && (
                    <input
                      className="event-title"
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Title / Heading"
                    />
                  )}
                  {isEventSection && (
                    <input
                      className="event-link"
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder='"Read More" link (external page, notice, or PDF - optional)'
                    />
                  )}
                  {isEventSection && (
                    <div className="impact-item-upload">
                      <div className="impact-image-preview">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || "Update"} />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <label className="upload-item-btn">
                        {itemUploadingId === item.id ? "Uploading..." : "Upload Image (optional)"}
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
                  {isEventSection && (
                    <div className="event-body">
                      <RichTextEditor
                        value={item.description || ""}
                        onChange={(val) => updateItemField(item.id, "description", val)}
                      />
                    </div>
                  )}
                  {isEventSection && (
                    <input
                      className="event-sort"
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(e) => updateItemField(item.id, "sort_order", Number(e.target.value))}
                      placeholder="Sort Order"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <input
                      value={item.title || ""}
                      onChange={(e) => updateItemField(item.id, "title", e.target.value)}
                      placeholder="Title"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <input
                      value={item.subtitle || ""}
                      onChange={(e) => updateItemField(item.id, "subtitle", e.target.value)}
                      placeholder="Subtitle"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <textarea
                      rows="3"
                      value={item.description || ""}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Description"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <input
                      value={item.image_url || ""}
                      onChange={(e) => updateItemField(item.id, "image_url", e.target.value)}
                      placeholder="Image URL"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <input
                      value={item.link_url || ""}
                      onChange={(e) => updateItemField(item.id, "link_url", e.target.value)}
                      placeholder="Link URL"
                    />
                  )}
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
                    <input
                      value={item.tag || ""}
                      onChange={(e) => updateItemField(item.id, "tag", e.target.value)}
                      placeholder="Tag"
                    />
                  )}
                  {!isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
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
                  {!isPhotoGallery && !isVideoGallery && !isImpactStory && !isImpactStories && !isNewsArticles && !isFaqs && !isCompetitionEvent && !isMythsTaboos && !isMenstrualProducts && !isGovernmentInitiatives && !isOurTeam && !isOurApproach && !isHomeDedicated && (
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

  .chip-list {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: #f3f4f6;
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-full);
    padding: 6px 10px;
  }

  .chip .danger {
    padding: 6px 10px;
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

  .product-item-grid {
    grid-template-columns: minmax(0, 1fr) 150px 130px;
    align-items: start;
  }

  .product-name {
    grid-column: 1 / -1;
  }

  .product-color {
    grid-column: 2;
  }

  .product-sort {
    grid-column: 3;
  }

  .product-description {
    grid-column: 1 / -1;
  }

  .gov-item-grid {
    grid-template-columns: 140px minmax(0, 1fr) 130px;
    align-items: start;
  }

  .gov-year {
    grid-column: 1;
  }

  .gov-title {
    grid-column: 2 / -1;
  }

  .gov-government,
  .gov-status,
  .gov-beneficiaries {
    grid-column: 1 / -1;
  }

  .gov-sort {
    grid-column: 1;
  }

  .gov-description {
    grid-column: 1 / -1;
  }

  .team-item-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 130px;
    align-items: start;
  }

  .team-name {
    grid-column: 1 / -1;
  }

  .team-role,
  .team-qualification,
  .team-designation,
  .team-email {
    grid-column: 1 / -1;
  }

  .team-color {
    grid-column: 1;
  }

  .team-sort {
    grid-column: 2;
  }

  .team-description {
    grid-column: 1 / -1;
  }

  .approach-item-grid {
    grid-template-columns: minmax(0, 1fr) 150px 130px;
    align-items: start;
  }

  .approach-title {
    grid-column: 1 / -1;
  }

  .approach-icon {
    grid-column: 2;
  }

  .approach-color {
    grid-column: 3;
  }

  .approach-description {
    grid-column: 1 / -1;
  }

  .approach-sort {
    grid-column: 1;
  }

  .hero-item-grid {
    grid-template-columns: 160px minmax(0, 1fr) 130px;
    align-items: center;
  }

  .hero-upload-btn {
    justify-self: start;
  }

  .pi-item-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }

  .pi-upload,
  .pi-name,
  .pi-label,
  .pi-qualification,
  .pi-bio {
    grid-column: 1 / -1;
  }

  .pi-stat {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }

  .about-header-item-grid {
    grid-template-columns: 1fr;
  }

  .accordion-item-grid {
    grid-template-columns: 90px minmax(0, 1fr) 130px 130px;
    align-items: start;
  }

  .accordion-title {
    grid-column: 2;
  }

  .accordion-color {
    grid-column: 3;
  }

  .accordion-sort {
    grid-column: 4;
  }

  .accordion-description {
    grid-column: 1 / -1;
  }

  .about-video-item-grid {
    grid-template-columns: 1fr;
  }

  .feature-item-grid {
    grid-template-columns: minmax(0, 1fr) 130px 130px 100px;
    align-items: start;
  }

  .feature-title {
    grid-column: 1;
  }

  .feature-icon {
    grid-column: 2;
  }

  .feature-color {
    grid-column: 3;
  }

  .feature-sort {
    grid-column: 4;
  }

  .feature-description {
    grid-column: 1 / -1;
  }

  .event-item-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: start;
  }

  .event-category {
    grid-column: 1;
  }

  .event-date {
    grid-column: 2;
  }

  .event-status {
    grid-column: 3;
  }

  .event-expiry-label {
    grid-column: 4;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
  }

  .event-title {
    grid-column: 1 / -1;
  }

  .event-link {
    grid-column: 1 / -1;
  }

  .event-body {
    grid-column: 1 / -1;
  }

  .event-sort {
    grid-column: 1;
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

  .impact-header {
    grid-column: 2;
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

    .product-item-grid {
      grid-template-columns: 1fr;
    }

    .gov-item-grid {
      grid-template-columns: 1fr;
    }

    .team-item-grid {
      grid-template-columns: 1fr;
    }

    .approach-item-grid {
      grid-template-columns: 1fr;
    }

    .hero-item-grid,
    .pi-item-grid,
    .accordion-item-grid,
    .feature-item-grid,
    .event-item-grid {
      grid-template-columns: 1fr;
    }

    .pi-stat {
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
