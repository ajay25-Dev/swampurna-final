import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  published: "Published",
};

const formatDate = (value) => {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getPreview = (value = "") => {
  const text = String(value).replace(/\s+/g, " ").trim();
  return text.length > 92 ? `${text.slice(0, 92)}...` : text || "No story text";
};

const ImpactStorySubmissions = () => {
  const [status, setStatus] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selected = rows.find((r) => r.id === selectedId) || null;

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getImpactStorySubmissions({ status });
      const nextRows = res.data || [];
      setRows(nextRows);
      if (!nextRows.some((row) => row.id === selectedId)) {
        setSelectedId(nextRows[0]?.id || "");
      }
    } catch (err) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = async (nextStatus) => {
    if (!selected) return;
    setMessage("");
    setError("");
    try {
      await adminApi.updateImpactStorySubmissionStatus(selected.id, nextStatus);
      setMessage(`Marked as ${nextStatus}`);
      await load();
    } catch (err) {
      setError(err.message || "Failed to update status");
    }
  };

  const publish = async () => {
    if (!selected) return;
    setMessage("");
    setError("");
    try {
      await adminApi.publishImpactStorySubmission(selected.id);
      setMessage("Published to Impactstories page.");
      await load();
    } catch (err) {
      setError(err.message || "Failed to publish");
    }
  };

  const deleteSubmission = async () => {
    if (!selected) return;
    const confirmed = window.confirm(`Delete "${selected.title}"? This cannot be undone.`);
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      await adminApi.deleteImpactStorySubmission(selected.id);
      setMessage("Submission deleted.");
      setRows((current) => {
        const nextRows = current.filter((row) => row.id !== selected.id);
        setSelectedId(nextRows[0]?.id || "");
        return nextRows;
      });
    } catch (err) {
      setError(err.message || "Failed to delete submission");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <span className="eyebrow">Community stories</span>
            <h1>Impact Story Submissions</h1>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
          </select>
        </div>
        {message && <p className="notice ok">{message}</p>}
        {error && <p className="notice err">{error}</p>}

        <div className="grid">
          <aside className="panel list-panel" style={{ "width": " 100%" }}>
            <div className="list-head">
              <strong>{rows.length} stories</strong>
              {loading && <span>Loading...</span>}
            </div>
            <div className="story-list">
              {!loading && rows.length === 0 && <p className="empty">No submissions found.</p>}
              {rows.map((r) => (
                <button
                  key={r.id}
                  className={`item ${selectedId === r.id ? "active" : ""}`}
                  onClick={() => setSelectedId(r.id)}
                >
                  <span className={`status-dot ${r.status || "pending"}`} />
                  <span className="item-main">
                    <strong>{r.title || "Untitled story"}</strong>
                    <small>{getPreview(r.story)}</small>
                  </span>
                  <span className="item-meta">
                    <span>{r.full_name || "Anonymous"}</span>
                    <em>{STATUS_LABELS[r.status] || r.status || "Pending"}</em>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="panel detail">
            {!selected ? (
              <div className="empty-detail">Select a story to review.</div>
            ) : (
              <>
                <div className="detail-top">
                  <div>
                    <span className={`badge ${selected.status || "pending"}`}>
                      {STATUS_LABELS[selected.status] || selected.status || "Pending"}
                    </span>
                    <h2>{selected.title || "Untitled story"}</h2>
                  </div>
                  <span className="date">{formatDate(selected.created_at)}</span>
                </div>

                <div className="info-grid">
                  <p><strong>Name</strong><span>{selected.full_name || "Anonymous"}</span></p>
                  <p><strong>Email</strong><span>{selected.email || "-"}</span></p>
                </div>

                {selected.image_url && <img src={selected.image_url} alt={selected.title} />}
                <p className="story">{selected.story}</p>

                <div className="actions">
                  <button onClick={() => updateStatus("approved")}>Approve</button>
                  <button onClick={() => updateStatus("rejected")}>Reject</button>
                  <button onClick={() => updateStatus("pending")}>Reset</button>
                  <button className="primary" onClick={publish}>Publish</button>
                  <button className="danger" onClick={deleteSubmission}>Delete</button>
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
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 22px;
  }

  .eyebrow {
    color: #0d77be;
    display: block;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
    text-transform: uppercase;
  }

  h1 {
    color: #172a33;
    font-size: 25px;
    line-height: 1.2;
    margin: 0;
  }

  select {
    background: #fff;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    color: #173848;
    min-width: 150px;
    padding: 10px 12px;
  }

  .notice {
    border-radius: 12px;
    margin: 0 0 16px;
    padding: 12px 14px;
  }

  .ok { background: #ecfdf5; color: #166534; }
  .err { background: #fef2f2; color: #dc2626; }

  .grid {
    display: grid;
    grid-template-columns: minmax(340px, 420px) minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }

  .panel {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
  }

  .list-panel {
    padding: 14px;
  }

  .list-head {
    align-items: center;
    color: #173848;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .list-head span {
    color: #64748b;
    font-size: 13px;
  }

  .story-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 68vh;
    overflow: auto;
    padding-right: 4px;
  }

  .item {
    align-items: flex-start;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    color: #173848;
    cursor: pointer;
    display: grid;
    gap: 10px;
    grid-template-columns: 10px minmax(0, 1fr);
    min-height: 92px;
    padding: 14px;
    text-align: left;
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
  }

  .item:hover {
    border-color: #7dd3fc;
    transform: translateY(-1px);
  }

  .item.active {
    background: #eef6fd;
    border-color: #0d77be;
  }

  .status-dot {
    border-radius: 999px;
    height: 10px;
    margin-top: 5px;
    width: 10px;
  }

  .status-dot.pending, .badge.pending { background: #fff7ed; color: #c2410c; }
  .status-dot.approved, .badge.approved { background: #ecfdf5; color: #166534; }
  .status-dot.rejected, .badge.rejected { background: #fef2f2; color: #991b1b; }
  .status-dot.published, .badge.published { background: #eff6ff; color: #1d4ed8; }
  .status-dot.pending { background: #f97316; }
  .status-dot.approved { background: #16a34a; }
  .status-dot.rejected { background: #dc2626; }
  .status-dot.published { background: #2563eb; }

  .item-main {
    display: grid;
    gap: 6px;
    min-width: 0;
  }

  .item-main strong {
    color: #172a33;
    font-size: 16px;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-main small {
    color: #64748b;
    font-size: 13px;
    line-height: 1.45;
  }

  .item-meta {
    align-items: center;
    color: #475569;
    display: flex;
    font-size: 12px;
    gap: 8px;
    grid-column: 2;
    justify-content: space-between;
    min-width: 0;
  }

  .item-meta span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta em {
    background: #e2e8f0;
    border-radius: 999px;
    color: #173848;
    font-style: normal;
    font-weight: 700;
    padding: 4px 8px;
    text-transform: capitalize;
  }

  .detail {
    min-height: 420px;
    padding: 24px;
  }

  .detail-top {
    align-items: flex-start;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .badge {
    border-radius: 999px;
    display: inline-flex;
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 12px;
    padding: 6px 10px;
    text-transform: uppercase;
  }

  h2 {
    color: #172a33;
    font-size: clamp(30px, 4vw, 48px);
    line-height: 1;
    margin: 0;
  }

  .date {
    color: #64748b;
    flex: 0 0 auto;
    font-size: 13px;
    padding-top: 8px;
  }

  .info-grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-bottom: 18px;
  }

  .info-grid p {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    display: grid;
    gap: 4px;
    margin: 0;
    padding: 12px;
  }

  .info-grid strong {
    color: #64748b;
    font-size: 12px;
    text-transform: uppercase;
  }

  .info-grid span {
    color: #173848;
    overflow-wrap: anywhere;
  }

  .detail img {
    border-radius: 14px;
    display: block;
    margin: 8px 0 18px;
    max-height: 280px;
    max-width: 100%;
    object-fit: cover;
  }

  .story {
    background: #fbfdff;
    border-left: 4px solid #0d77be;
    color: #173848;
    line-height: 1.7;
    margin: 0;
    padding: 14px 16px;
    white-space: pre-wrap;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }

  .actions button {
    background: #e5e7eb;
    border-radius: 999px;
    color: #173848;
    font-weight: 700;
    padding: 10px 16px;
  }

  .actions .primary { background: #0d77be; color: #fff; }
  .actions .danger { background: #dc2626; color: #fff; }

  .empty,
  .empty-detail {
    color: #64748b;
    margin: 0;
    padding: 18px;
  }

  @media (max-width: 900px) {
    .head { align-items: stretch; flex-direction: column; }
    .grid { grid-template-columns: 1fr; }
    .story-list { max-height: none; }
    .info-grid { grid-template-columns: 1fr; }
  }
`;

export default ImpactStorySubmissions;