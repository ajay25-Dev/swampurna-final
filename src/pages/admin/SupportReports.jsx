import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_OPTIONS = ["", "open", "in_progress", "resolved", "closed"];

const SupportReports = () => {
  const [status, setStatus] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedReport = reports.find((r) => r.id === selectedId) || null;

  const loadReports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getSupportReports({ status, limit: 100, offset: 0 });
      const rows = res.data || [];
      setReports(rows);
      if (!selectedId && rows.length) setSelectedId(rows[0].id);
      if (selectedId && !rows.some((row) => row.id === selectedId)) {
        setSelectedId(rows[0]?.id || "");
      }
    } catch (err) {
      setError(err.message || "Failed to load support reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = async (nextStatus) => {
    if (!selectedReport) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await adminApi.updateSupportReport(selectedReport.id, { status: nextStatus });
      setMessage(`Report marked as ${nextStatus.replace("_", " ")}.`);
      await loadReports();
    } catch (err) {
      setError(err.message || "Failed to update report");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Support Reports</h1>
            <p>Manage user submitted app issues and feedback.</p>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((item) => (
              <option key={item || "all"} value={item}>
                {item ? item.replace("_", " ") : "all statuses"}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        <div className="grid">
          <section className="card list">
            {loading ? (
              <p>Loading...</p>
            ) : reports.length === 0 ? (
              <p>No reports found.</p>
            ) : (
              reports.map((row) => (
                <button
                  key={row.id}
                  className={`item ${selectedId === row.id ? "active" : ""}`}
                  onClick={() => setSelectedId(row.id)}
                >
                  <div className="title-row">
                    <strong>{row.user?.email || "Unknown user"}</strong>
                    <span className={`badge ${row.status}`}>{row.status}</span>
                  </div>
                  <p>{row.details?.slice(0, 100) || "-"}</p>
                  <small>{new Date(row.created_at).toLocaleString()}</small>
                </button>
              ))
            )}
          </section>

          <section className="card detail">
            {!selectedReport ? (
              <p>Select a report to view details.</p>
            ) : (
              <>
                <h2>{selectedReport.user?.email || "Unknown user"}</h2>
                <div className="meta">
                  <span className={`badge ${selectedReport.status}`}>{selectedReport.status}</span>
                  <span>{new Date(selectedReport.created_at).toLocaleString()}</span>
                </div>
                <div className="block">
                  <h3>Issue Types</h3>
                  <p>
                    {Array.isArray(selectedReport.issue_types) && selectedReport.issue_types.length
                      ? selectedReport.issue_types.join(", ")
                      : "Not specified"}
                  </p>
                </div>
                <div className="block">
                  <h3>Details</h3>
                  <p>{selectedReport.details}</p>
                </div>
                {selectedReport.media_url && (
                  <div className="block">
                    <h3>Attachment</h3>
                    {selectedReport.media_type === "video" ? (
                      <video src={selectedReport.media_url} controls />
                    ) : (
                      <img src={selectedReport.media_url} alt="Support attachment" />
                    )}
                    <a href={selectedReport.media_url} target="_blank" rel="noreferrer">
                      Open media
                    </a>
                  </div>
                )}
                <div className="actions">
                  {["open", "in_progress", "resolved", "closed"].map((next) => (
                    <button
                      key={next}
                      onClick={() => updateStatus(next)}
                      disabled={saving || next === selectedReport.status}
                    >
                      {saving && next === selectedReport.status ? "Saving..." : next.replace("_", " ")}
                    </button>
                  ))}
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
    margin-bottom: var(--space-5);
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
    align-items: center;
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
  }

  select {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #fff;
    padding: var(--space-3) var(--space-4);
    min-width: 180px;
  }

  .grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: var(--space-5);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    min-height: 480px;
  }

  .list {
    display: grid;
    gap: var(--space-3);
    align-content: start;
    max-height: 78vh;
    overflow: auto;
  }

  .item {
    text-align: left;
    border: 1px solid var(--color-dark-100);
    background: #f9fafb;
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    display: grid;
    gap: var(--space-2);
  }

  .item.active {
    border-color: #0d77be;
    background: #eef6fd;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .item p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
  }

  .item small {
    color: var(--color-dark-500);
  }

  .detail h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-2);
  }

  .meta {
    display: flex;
    gap: var(--space-3);
    align-items: center;
    color: var(--color-dark-500);
    margin-bottom: var(--space-4);
  }

  .block {
    margin-bottom: var(--space-5);
    display: grid;
    gap: var(--space-2);
  }

  .block h3 {
    font-size: var(--text-lg);
  }

  .block p {
    color: var(--color-dark-700);
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .block img,
  .block video {
    width: min(520px, 100%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-dark-100);
    background: #f2f4f7;
  }

  .block a {
    width: fit-content;
    color: #0d77be;
    font-weight: 600;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .actions button {
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: #fff;
    padding: var(--space-2) var(--space-4);
  }

  .actions button[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
    background: #e5e7eb;
    color: #1f2937;
  }

  .badge.open {
    background: #e0f2fe;
    color: #075985;
  }

  .badge.in_progress {
    background: #fef3c7;
    color: #92400e;
  }

  .badge.resolved,
  .badge.closed {
    background: #dcfce7;
    color: #166534;
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

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .card {
      min-height: auto;
    }
    .list {
      max-height: none;
    }
  }
`;

export default SupportReports;
