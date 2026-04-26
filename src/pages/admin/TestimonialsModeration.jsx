import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const FILTERS = ["", "pending", "approved", "rejected"];

const TestimonialsModeration = () => {
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getTestimonialsModeration({ status, limit: 100, offset: 0 });
      setItems(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleModeration = async (id, action) => {
    setSavingId(id);
    setError("");
    setMessage("");
    try {
      await adminApi.moderateTestimonial(id, action);
      setMessage(`Testimonial marked as ${action}.`);
      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to update testimonial");
    } finally {
      setSavingId("");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Testimonial Moderation</h1>
            <p>Approve or reject customer testimonials before publishing.</p>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {FILTERS.map((item) => (
              <option key={item || "all"} value={item}>
                {item || "all"}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        {loading ? (
          <div className="card">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card">No testimonials found.</div>
        ) : (
          <div className="list">
            {items.map((item) => (
              <article key={item.id} className="card">
                <div className="row">
                  <h2>{item.name}</h2>
                  <span className={`badge ${item.moderation_status}`}>{item.moderation_status}</span>
                </div>
                <p className="quote">"{item.quote}"</p>
                <div className="meta">
                  <span>rating: {item.rating || "-"}</span>
                  <span>by: {item.user?.email || "anonymous"}</span>
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                </div>
                <div className="actions">
                  <button
                    onClick={() => handleModeration(item.id, "approve")}
                    disabled={savingId === item.id || item.moderation_status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleModeration(item.id, "reject")}
                    disabled={savingId === item.id || item.moderation_status === "rejected"}
                  >
                    Reject
                  </button>
                  <button
                    className="pending"
                    onClick={() => handleModeration(item.id, "pending")}
                    disabled={savingId === item.id || item.moderation_status === "pending"}
                  >
                    Pending
                  </button>
                </div>
              </article>
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
    align-items: center;
    justify-content: space-between;
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
    min-width: 160px;
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

  .list {
    display: grid;
    gap: var(--space-4);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    display: grid;
    gap: var(--space-3);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .quote {
    color: var(--color-dark-700);
    font-size: var(--text-lg);
    line-height: 1.7;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  button {
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: white;
    padding: var(--space-2) var(--space-4);
  }

  .reject {
    background: #fee2e2;
    color: #991b1b;
  }

  .pending {
    background: #fef3c7;
    color: #92400e;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .badge {
    display: inline-flex;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .badge.approved {
    background: #dcfce7;
    color: #166534;
  }

  .badge.pending {
    background: #fef3c7;
    color: #92400e;
  }

  .badge.rejected {
    background: #fee2e2;
    color: #991b1b;
  }
`;

export default TestimonialsModeration;
