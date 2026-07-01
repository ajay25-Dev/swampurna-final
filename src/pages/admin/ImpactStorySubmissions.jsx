import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

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
      setRows(res.data || []);
      if (!selectedId && res.data?.length) setSelectedId(res.data[0].id);
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

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <h1>Impact Story Submissions</h1>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">all</option>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
            <option value="published">published</option>
          </select>
        </div>
        {message && <p className="ok">{message}</p>}
        {error && <p className="err">{error}</p>}

        <div className="grid">
          <div className="card list">
            {loading ? <p>Loading...</p> : rows.map((r) => (
              <button key={r.id} className={`item ${selectedId === r.id ? "active" : ""}`} onClick={() => setSelectedId(r.id)}>
                <strong>{r.title}</strong>
                <small>{r.full_name} • {r.status}</small>
              </button>
            ))}
          </div>
          <div className="card detail">
            {!selected ? <p>Select submission</p> : (
              <>
                <h2>{selected.title}</h2>
                <p><strong>Name:</strong> {selected.full_name}</p>
                <p><strong>Email:</strong> {selected.email || "-"}</p>
                <p><strong>Status:</strong> {selected.status}</p>
                {selected.image_url && <img src={selected.image_url} alt={selected.title} />}
                <p className="story">{selected.story}</p>
                <div className="actions">
                  <button onClick={() => updateStatus("approved")}>Approve</button>
                  <button onClick={() => updateStatus("rejected")}>Reject</button>
                  <button onClick={() => updateStatus("pending")}>Reset</button>
                  <button className="primary" onClick={publish}>Publish</button>
                </div>
              </>
            )}
          </div>
        </div>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .head { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .grid { display:grid; grid-template-columns: 320px 1fr; gap:16px; }
  .card { background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:16px; }
  .list { display:grid; gap:8px; max-height:75vh; overflow:auto; }
  .item { text-align:left; border:1px solid #e5e7eb; border-radius:10px; padding:10px; background:#f8fafc; display:grid; gap:4px; }
  .item.active { border-color:#0d77be; background:#eef6fd; }
  .detail img { max-width:280px; border-radius:10px; margin:8px 0; }
  .story { white-space:pre-wrap; line-height:1.6; }
  .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
  .actions button { border-radius:999px; padding:8px 14px; background:#e5e7eb; }
  .actions .primary { background:#0d77be; color:#fff; }
  .ok { color:#166534; }
  .err { color:#dc2626; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
`;

export default ImpactStorySubmissions;

