import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiCheck, FiClock, FiImage, FiRefreshCw, FiVideo, FiX } from "react-icons/fi";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_FILTERS = ["", "pending", "approved", "rejected"];
const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_ICONS = {
  pending: FiClock,
  approved: FiCheck,
  rejected: FiX,
};

const formatDateTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const previewText = (value = "", length = 96) => {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (!text) return "No description provided.";
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const getShortId = (value = "") => String(value).split("-")[0] || "N/A";

const StatusIcon = ({ status }) => {
  const Icon = STATUS_ICONS[status] || FiClock;
  return <Icon />;
};

const MediaIcon = ({ type }) => (type === "video" ? <FiVideo /> : <FiImage />);

const CycleSnaps = () => {
  const [status, setStatus] = useState("pending");
  const [snaps, setSnaps] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedSnap = useMemo(
    () => snaps.find((snap) => snap.id === selectedId) || null,
    [snaps, selectedId]
  );

  const counts = useMemo(
    () => snaps.reduce((acc, snap) => ({ ...acc, [snap.status]: (acc[snap.status] || 0) + 1 }), {}),
    [snaps]
  );

  const loadSnaps = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getCycleSnaps({ status, limit: 100, offset: 0 });
      const nextSnaps = res.data || [];
      setSnaps(nextSnaps);
      if (!nextSnaps.some((snap) => snap.id === selectedId)) {
        setSelectedId(nextSnaps[0]?.id || "");
      }
    } catch (err) {
      setError(err.message || "Failed to load cycle snaps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const setStatusForSnap = async (id, nextStatus) => {
    setSavingId(id);
    setError("");
    setMessage("");
    try {
      await adminApi.updateCycleSnapStatus(id, nextStatus);
      setMessage(`Snap marked as ${nextStatus}.`);
      await loadSnaps();
    } catch (err) {
      setError(err.message || "Failed to update snap status");
    } finally {
      setSavingId("");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="hero-bar">
          <div>
            <span className="eyebrow">Moderation studio</span>
            <h1>Cycle Snaps</h1>
            <p>Approve clean, helpful submissions and keep the community feed trustworthy.</p>
          </div>
          <button className="refresh-btn" onClick={loadSnaps} disabled={loading}>
            <FiRefreshCw />
            {loading ? "Refreshing" : "Refresh"}
          </button>
        </div>

        {error && <div className="notice err">{error}</div>}
        {message && <div className="notice ok">{message}</div>}

        <div className="status-tabs" role="tablist" aria-label="Cycle snap filters">
          {STATUS_FILTERS.map((item) => {
            const isActive = status === item;
            return (
              <button key={item || "all"} className={isActive ? "active" : ""} onClick={() => setStatus(item)}>
                <span>{item ? STATUS_LABELS[item] : "All"}</span>
                <strong>{item ? counts[item] || 0 : snaps.length}</strong>
              </button>
            );
          })}
        </div>

        <div className="workspace">
          <aside className="queue-panel" style={{ "width": " 100%" }}>
            <div className="queue-head">
              <div>
                <strong>{status ? STATUS_LABELS[status] : "All"} queue</strong>
                <span>{snaps.length} submissions loaded</span>
              </div>
              {loading && <em>Loading...</em>}
            </div>

            <div className="snap-list">
              {!loading && snaps.length === 0 && <p className="empty">No cycle snaps found.</p>}
              {snaps.map((snap, index) => (
                <button
                  key={snap.id}
                  className={`snap-item ${selectedId === snap.id ? "active" : ""} ${snap.status || "pending"}`}
                  onClick={() => setSelectedId(snap.id)}
                >
                  <span className="rank">{String(index + 1).padStart(2, "0")}</span>
                  <span className="thumb">
                    {snap.media_type === "video" ? <FiVideo /> : <FiImage />}
                  </span>
                  <span className="snap-copy">
                    <strong>{snap.title || "Untitled snap"}</strong>
                    <small>{previewText(snap.description)}</small>
                    <span className="snap-foot">
                      <em><StatusIcon status={snap.status} /> {STATUS_LABELS[snap.status] || snap.status}</em>
                      <span>{formatDateTime(snap.created_at)}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className={`review-panel ${selectedSnap?.status || "pending"}`}>
            {!selectedSnap ? (
              <p className="empty-detail">Select a snap to review.</p>
            ) : (
              <>
                <div className="review-top">
                  <div className="title-block">
                    <span className={`state ${selectedSnap.status}`}>
                      <StatusIcon status={selectedSnap.status} />
                      {STATUS_LABELS[selectedSnap.status] || selectedSnap.status}
                    </span>
                    <h2>{selectedSnap.title || "Untitled snap"}</h2>
                    <p>{formatDateTime(selectedSnap.created_at)}</p>
                  </div>
                  <span className="media-type"><MediaIcon type={selectedSnap.media_type} /> {selectedSnap.media_type || "media"}</span>
                </div>

                <div className="media-stage">
                  <div className="stage-top">
                    <span>Preview</span>
                    <strong>{selectedSnap.media_type === "video" ? "Video submission" : "Image submission"}</strong>
                  </div>
                  <div className="media-frame">
                    {selectedSnap.media_type === "video" ? (
                      <video src={selectedSnap.media_url} controls />
                    ) : (
                      <img src={selectedSnap.media_url} alt={selectedSnap.title || "cycle snap"} />
                    )}
                  </div>
                </div>

                <div className="review-grid">
                  <div className="story-card wide">
                    <span>Description</span>
                    <p>{selectedSnap.description || "No description provided."}</p>
                  </div>
                  <div className="story-card user-card">
                    <span>User</span>
                    <strong>{selectedSnap.customer?.name || selectedSnap.author?.email || "Unknown user"}</strong>
                  </div>
                  <div className="story-card">
                    <span>Snap Details</span>
                    <strong>{getShortId(selectedSnap.id)}</strong>
                    <p>Created: {formatDateTime(selectedSnap.created_at)}</p>
                    <p>Type: {selectedSnap.media_type || "N/A"}</p>
                  </div>
                </div>

                <div className="action-dock">
                  <button
                    className="approve"
                    onClick={() => setStatusForSnap(selectedSnap.id, "approved")}
                    disabled={savingId === selectedSnap.id || selectedSnap.status === "approved"}
                  >
                    <FiCheck />
                    {savingId === selectedSnap.id ? "Saving" : "Approve"}
                  </button>
                  <button
                    className="reject"
                    onClick={() => setStatusForSnap(selectedSnap.id, "rejected")}
                    disabled={savingId === selectedSnap.id || selectedSnap.status === "rejected"}
                  >
                    <FiX />
                    Reject
                  </button>
                  {selectedSnap.status !== "pending" && (
                    <button
                      className="pending"
                      onClick={() => setStatusForSnap(selectedSnap.id, "pending")}
                      disabled={savingId === selectedSnap.id}
                    >
                      <FiClock />
                      Pending
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  color: #173848;

  .hero-bar {
    align-items: center;
    background: linear-gradient(135deg, #ffffff 0%, #eef8ff 54%, #fff7ed 100%);
    border: 1px solid #dbeafe;
    border-radius: 18px;
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 14px;
    padding: 16px 18px;
  }

  .eyebrow {
    color: #0d77be;
    display: block;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  .hero-bar h1 {
    margin-bottom: 3px;
  }

  .hero-bar p {
    color: #5b7280;
    margin: 0;
  }

  .refresh-btn {
    align-items: center;
    background: #0d77be;
    border-radius: 999px;
    color: #fff;
    display: inline-flex;
    font-weight: 800;
    gap: 8px;
    padding: 10px 14px;
  }

  .notice {
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 10px 12px;
    font-size: var(--text-sm);
  }

  .ok { background: #ecfdf5; color: #166534; }
  .err { background: #fef2f2; color: #dc2626; }

  .status-tabs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 14px;
  }

  .status-tabs button {
    align-items: center;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
    color: #5b7280;
    display: flex;
    justify-content: space-between;
    padding: 12px 14px;
  }

  .status-tabs button.active {
    background: #102a43;
    border-color: #102a43;
    color: #fff;
  }

  .status-tabs strong {
    background: rgba(13, 119, 190, 0.12);
    border-radius: 999px;
    color: inherit;
    min-width: 32px;
    padding: 4px 8px;
    text-align: center;
  }

  .workspace {
    display: grid;
    grid-template-columns: minmax(360px, 440px) minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .queue-panel,
  .review-panel {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
  }

  .queue-panel {
    overflow: hidden;
    padding: 14px;
  }

  .queue-head {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .queue-head div {
    display: grid;
    gap: 2px;
  }

  .queue-head strong {
    color: #173848;
  }

  .queue-head span,
  .queue-head em {
    color: #6b8794;
    font-size: 12px;
    font-style: normal;
  }

  .snap-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 68vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 5px;
  }

  .snap-item {
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    cursor: pointer;
    display: grid;
    gap: 10px;
    grid-template-columns: 28px 30px minmax(0, 1fr);
    // min-height: 96px;
    padding: 12px 14px;
    position: relative;
    text-align: left;
    transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background 160ms ease;
  }

  // .snap-item::before {
  //   border-radius: 16px 0 0 16px;
  //   content: "";
  //   inset: 0 auto 0 0;
  //   position: absolute;
  //   width: 5px;
  // }

  .snap-item.pending::before { background: #f59e0b; }
  .snap-item.approved::before { background: #16a34a; }
  .snap-item.rejected::before { background: #dc2626; }

  .snap-item:hover,
  .snap-item.active {
    background: #ffffff;
    border-color: #0d77be;
    // box-shadow: 0 14px 30px rgba(13, 119, 190, 0.14);
    transform: translateY(-1px);
  }

  .rank {
    color: #9aaebb;
    font-size: 12px;
    font-weight: 900;
  }

  .thumb {
    align-items: center;
    background: #e0f2fe;
    border-radius: 999px;
    color: #0d77be;
    display: inline-flex;
    height: 26px;
    justify-content: center;
    width: 26px;
  }

  .snap-copy {
    display: grid;
    gap: 5px;
    min-width: 0;
  }

  .snap-copy strong {
    color: #173848;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
  }

  .snap-copy small {
    color: #587285;
    font-size: 13px;
    line-height: 1.35;
  }

  .snap-foot {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: flex-start;
  }

  .snap-foot em {
    align-items: center;
    background: #eef2f7;
    border-radius: 999px;
    color: #173848;
    display: inline-flex;
    font-size: 11px;
    font-style: normal;
    font-weight: 800;
    gap: 5px;
    padding: 4px 8px;
  }

  .snap-foot span {
    color: #78a7c4;
    font-size: 11px;
    overflow-wrap: anywhere;
  }

  .review-panel {
    display: grid;
    gap: 14px;
    overflow: hidden;
    padding: 16px;
    position: relative;
  }

  .review-panel::before {
    content: "";
    height: 5px;
    inset: 0 0 auto 0;
    position: absolute;
  }

  .review-panel.pending::before { background: linear-gradient(90deg, #f59e0b, #fef3c7); }
  .review-panel.approved::before { background: linear-gradient(90deg, #16a34a, #bbf7d0); }
  .review-panel.rejected::before { background: linear-gradient(90deg, #dc2626, #fecaca); }

  .review-top {
    align-items: start;
    display: flex;
    gap: 14px;
    justify-content: space-between;
    padding-top: 4px;
  }

  .title-block {
    display: grid;
    gap: 5px;
  }

  .state,
  .media-type {
    align-items: center;
    border-radius: 999px;
    display: inline-flex;
    font-size: 12px;
    font-weight: 900;
    gap: 6px;
    padding: 7px 10px;
    text-transform: uppercase;
    width: fit-content;
  }

  .state.pending { background: #fef3c7; color: #92400e; }
  .state.approved { background: #dcfce7; color: #166534; }
  .state.rejected { background: #fee2e2; color: #991b1b; }

  .media-type {
    background: #e2e8f0;
    color: #173848;
    text-transform: capitalize;
  }

  .title-block p {
    color: #6b8794;
    font-size: 13px;
    margin: 0;
  }

  .media-stage {
    background: #0f172a;
    border-radius: 18px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 34px rgba(15, 23, 42, 0.18);
    overflow: hidden;
    padding: 10px;
  }

  .stage-top {
    align-items: center;
    color: #cbd5e1;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    padding: 0 2px 9px;
  }

  .stage-top strong {
    color: #f8fafc;
    font-size: 12px;
  }

  .media-frame {
    align-items: center;
    background: #111827;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    min-height: 360px;
    overflow: hidden;
  }

  img,
  video {
    display: block;
    max-height: 540px;
    object-fit: contain;
    width: 100%;
  }

  .review-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(160px, 0.5fr) minmax(160px, 0.5fr);
    gap: 10px;
  }

  .story-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    display: grid;
    gap: 5px;
    padding: 12px 14px;
  }

  .user-card {
    background: linear-gradient(135deg, #f8fafc 0%, #eef8ff 100%);
  }

  .user-lines {
    display: grid;
    gap: 4px;
  }

  .story-card span {
    color: #6b8794;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .story-card strong,
  .story-card p,
  .user-lines p {
    color: #173848;
    font-size: 13px;
    line-height: 1.45;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .action-dock {
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
    padding: 10px;
  }

  .action-dock button {
    align-items: center;
    border-radius: 999px;
    color: #fff;
    display: inline-flex;
    font-weight: 900;
    gap: 7px;
    padding: 10px 16px;
  }

  .action-dock .approve { background: #16a34a; }
  .action-dock .reject { background: #dc2626; }
  .action-dock .pending { background: #f59e0b; }

  button[disabled] {
    opacity: 0.58;
    cursor: not-allowed;
  }

  .empty,
  .empty-detail {
    color: #6b8794;
    margin: 0;
    padding: 18px;
  }

  @media (max-width: 1180px) {
    .workspace,
    .review-grid {
      grid-template-columns: 1fr;
    }
    .snap-list {
      max-height: none;
    }
  }

  @media (max-width: 720px) {
    .hero-bar,
    .review-top {
      align-items: stretch;
      flex-direction: column;
    }
    .status-tabs {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .snap-item {
      grid-template-columns: 28px 30px minmax(0, 1fr);
    }
    .media-frame {
      min-height: 240px;
    }
    .action-dock {
      justify-content: stretch;
    }
    .action-dock button {
      justify-content: center;
      flex: 1 1 140px;
    }
  }
`;

export default CycleSnaps;