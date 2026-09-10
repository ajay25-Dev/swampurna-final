import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_LABELS = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  archived: "Archived",
};

const formatDate = (value) => {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const getPreview = (value = "") => {
  const text = String(value).replace(/\s+/g, " ").trim();
  return text.length > 92 ? `${text.slice(0, 92)}...` : text || "No details";
};

const EventRegistrations = () => {
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
      const res = await adminApi.getEventRegistrations({ status });
      const nextRows = res.data || [];
      setRows(nextRows);
      if (!nextRows.some((row) => row.id === selectedId)) {
        setSelectedId(nextRows[0]?.id || "");
      }
    } catch (err) {
      setError(err.message || "Failed to load registrations");
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
      await adminApi.updateEventRegistrationStatus(selected.id, nextStatus);
      setMessage(`Marked as ${nextStatus}`);
      await load();
    } catch (err) {
      setError(err.message || "Failed to update status");
    }
  };

  const deleteRegistration = async () => {
    if (!selected) return;
    const confirmed = window.confirm(`Delete the registration from "${selected.name}"? This cannot be undone.`);
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      await adminApi.deleteEventRegistration(selected.id);
      setMessage("Registration deleted.");
      setRows((current) => {
        const nextRows = current.filter((row) => row.id !== selected.id);
        setSelectedId(nextRows[0]?.id || "");
        return nextRows;
      });
    } catch (err) {
      setError(err.message || "Failed to delete registration");
    }
  };

  const selectRegistration = (row) => {
    setSelectedId(row.id);
    if (row.status === "new") {
      adminApi
        .updateEventRegistrationStatus(row.id, "contacted")
        .then(() => load())
        .catch(() => {});
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <span className="eyebrow">Compitionevent</span>
            <h1>Event Detail Form Submissions</h1>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        {message && <p className="notice ok">{message}</p>}
        {error && <p className="notice err">{error}</p>}

        <div className="grid">
          <aside className="panel list-panel">
            <div className="list-head">
              <strong>{rows.length} submissions</strong>
              {loading && <span>Loading...</span>}
            </div>
            <div className="story-list">
              {!loading && rows.length === 0 && <p className="empty">No submissions found.</p>}
              {rows.map((r) => (
                <button
                  key={r.id}
                  className={`item ${selectedId === r.id ? "active" : ""}`}
                  onClick={() => selectRegistration(r)}
                >
                  <span className={`status-dot ${r.status || "new"}`} />
                  <span className="item-main">
                    <strong>{r.name}</strong>
                    <small>{getPreview(r.details)}</small>
                  </span>
                  <span className="item-meta">
                    <span>{r.event_title}</span>
                    <em>{STATUS_LABELS[r.status] || r.status || "New"}</em>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="panel detail">
            {!selected ? (
              <div className="empty-detail">Select a submission to review.</div>
            ) : (
              <>
                <div className="detail-top">
                  <div>
                    <span className={`badge ${selected.status || "new"}`}>
                      {STATUS_LABELS[selected.status] || selected.status || "New"}
                    </span>
                    <h2>{selected.name}</h2>
                  </div>
                  <span className="date">{formatDate(selected.created_at)}</span>
                </div>

                <div className="info-grid">
                  <p><strong>Event</strong><span>{selected.event_title}</span></p>
                  <p><strong>Email</strong><span>{selected.email ? <a href={`mailto:${selected.email}`}>{selected.email}</a> : "-"}</span></p>
                  <p><strong>Phone</strong><span>{selected.phone || "-"}</span></p>
                </div>

                <p className="story">{selected.details || "No additional details provided."}</p>

                <div className="actions">
                  {selected.email && <a className="mail-btn" href={`mailto:${selected.email}`}>Reply by Email</a>}
                  <button onClick={() => updateStatus("confirmed")}>Mark Confirmed</button>
                  <button onClick={() => updateStatus("archived")}>Archive</button>
                  <button onClick={() => updateStatus("new")}>Reset</button>
                  <button className="danger" onClick={deleteRegistration}>Delete</button>
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

  .status-dot.new, .badge.new { background: #eff6ff; color: #1d4ed8; }
  .status-dot.contacted, .badge.contacted { background: #fff7ed; color: #c2410c; }
  .status-dot.confirmed, .badge.confirmed { background: #ecfdf5; color: #166534; }
  .status-dot.archived, .badge.archived { background: #f3f4f6; color: #4b5563; }
  .status-dot.new { background: #2563eb; }
  .status-dot.contacted { background: #f97316; }
  .status-dot.confirmed { background: #16a34a; }
  .status-dot.archived { background: #9ca3af; }

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
    font-size: clamp(24px, 3.5vw, 36px);
    line-height: 1.1;
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

  .info-grid a {
    color: #0d77be;
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

  .actions button,
  .actions .mail-btn {
    background: #e5e7eb;
    border-radius: 999px;
    color: #173848;
    font-weight: 700;
    padding: 10px 16px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }

  .mail-btn {
    background: #0d77be;
    color: #fff;
  }

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

export default EventRegistrations;
