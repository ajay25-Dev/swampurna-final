import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_FILTERS = ["", "pending", "approved", "rejected"];

const CycleSnaps = () => {
  const [status, setStatus] = useState("pending");
  const [snaps, setSnaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadSnaps = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getCycleSnaps({ status, limit: 100, offset: 0 });
      setSnaps(res.data || []);
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
        <div className="head">
          <div>
            <h1>Cycle Snaps Moderation</h1>
            <p>Review user submissions and publish approved items to feed.</p>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_FILTERS.map((item) => (
              <option key={item || "all"} value={item}>
                {item || "all statuses"}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        {loading ? (
          <Card>Loading...</Card>
        ) : snaps.length === 0 ? (
          <Card>No cycle snaps found.</Card>
        ) : (
          <div className="grid">
            {snaps.map((snap) => (
              <Card key={snap.id}>
                <div className="top">
                  <span className={`badge ${snap.status}`}>{snap.status}</span>
                  <small>{new Date(snap.created_at).toLocaleString()}</small>
                </div>
                <h2>{snap.title || "Untitled Snap"}</h2>
                <p className="author">{snap.author?.email || "Unknown user"}</p>
                <p className="desc">{snap.description}</p>
                {snap.media_type === "video" ? (
                  <video src={snap.media_url} controls />
                ) : (
                  <img src={snap.media_url} alt={snap.title || "cycle snap"} />
                )}
                <div className="actions">
                  <button
                    onClick={() => setStatusForSnap(snap.id, "approved")}
                    disabled={savingId === snap.id || snap.status === "approved"}
                  >
                    {savingId === snap.id && snap.status !== "approved" ? "Saving..." : "Approve"}
                  </button>
                  <button
                    className="reject"
                    onClick={() => setStatusForSnap(snap.id, "rejected")}
                    disabled={savingId === snap.id || snap.status === "rejected"}
                  >
                    Reject
                  </button>
                </div>
              </Card>
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
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
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
  }
`;

const Card = styled.section`
  background: #fff;
  border: 1px solid var(--color-dark-100);
  border-radius: var(--radius-2xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: var(--space-3);

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  h2 {
    font-size: var(--text-xl);
  }

  .author {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .desc {
    color: var(--color-dark-700);
    line-height: 1.6;
  }

  img,
  video {
    width: 100%;
    max-height: 380px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-dark-100);
    background: #f3f4f6;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  button {
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: #fff;
    padding: var(--space-2) var(--space-4);
  }

  .reject {
    background: #fee2e2;
    color: #991b1b;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  small {
    color: var(--color-dark-500);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .badge.pending {
    background: #fef3c7;
    color: #92400e;
  }

  .badge.approved {
    background: #dcfce7;
    color: #166534;
  }

  .badge.rejected {
    background: #fee2e2;
    color: #991b1b;
  }
`;

export default CycleSnaps;
