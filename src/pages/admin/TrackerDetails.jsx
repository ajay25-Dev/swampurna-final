import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const TrackerDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [month, setMonth] = useState("");
  const [details, setDetails] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  const selectedUser = useMemo(
    () => users.find((u) => u.user_id === selectedUserId) || null,
    [users, selectedUserId]
  );

  const loadUsers = async () => {
    setLoadingUsers(true);
    setError("");
    try {
      const res = await adminApi.getTrackerUsers();
      const rows = res.data || [];
      setUsers(rows);
      if (!selectedUserId && rows.length) {
        setSelectedUserId(rows[0].user_id);
      }
    } catch (err) {
      setError(err.message || "Failed to load tracker users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadDetails = async (userId) => {
    if (!userId) return;
    setLoadingDetails(true);
    setError("");
    try {
      const res = await adminApi.getTrackerUserDetails(userId, month);
      setDetails(res.data || null);
    } catch (err) {
      setError(err.message || "Failed to load tracker details");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadDetails(selectedUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId, month]);

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Tracker Details</h1>
            <p>Complete cycle tracker records for each customer.</p>
          </div>
          <div className="filters">
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
            <button onClick={() => loadDetails(selectedUserId)} disabled={loadingDetails || !selectedUserId}>
              Refresh
            </button>
          </div>
        </div>

        {error && <div className="err">{error}</div>}

        <div className="grid">
          <section className="card list">
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((item) => (
                <button
                  key={item.user_id}
                  className={`user-item ${selectedUserId === item.user_id ? "active" : ""}`}
                  onClick={() => setSelectedUserId(item.user_id)}
                >
                  <strong>{item.name || item.users?.email || "Unnamed customer"}</strong>
                  <span>{item.users?.email || "-"}</span>
                  <small>
                    last setup: {item.latest_setup?.last_period_start_date || "N/A"} | last log:{" "}
                    {item.latest_log?.period_start_date || "N/A"}
                  </small>
                </button>
              ))
            )}
          </section>

          <section className="card detail">
            {!selectedUserId ? (
              <p>Select a customer to view tracker details.</p>
            ) : loadingDetails ? (
              <p>Loading details...</p>
            ) : !details ? (
              <p>No details available.</p>
            ) : (
              <>
                <div className="profile">
                  <h2>{selectedUser?.name || details.user?.email || "Customer"}</h2>
                  <p>{details.user?.email}</p>
                </div>

                <div className="stats">
                  <div>
                    <label>Logs</label>
                    <strong>{details.logs?.length || 0}</strong>
                  </div>
                  <div>
                    <label>Symptoms</label>
                    <strong>{details.symptoms?.length || 0}</strong>
                  </div>
                  <div>
                    <label>Reminders</label>
                    <strong>{details.reminders?.length || 0}</strong>
                  </div>
                </div>

                <div className="section">
                  <h3>Setup</h3>
                  <pre>{JSON.stringify(details.setup || {}, null, 2)}</pre>
                </div>

                <div className="section">
                  <h3>Summary</h3>
                  <pre>{JSON.stringify(details.summary || {}, null, 2)}</pre>
                </div>

                <div className="section">
                  <h3>Notification Settings</h3>
                  <pre>{JSON.stringify(details.notification_settings || {}, null, 2)}</pre>
                </div>

                <div className="section">
                  <h3>Recent Logs</h3>
                  <pre>{JSON.stringify((details.logs || []).slice(0, 20), null, 2)}</pre>
                </div>

                <div className="section">
                  <h3>Recent Symptoms</h3>
                  <pre>{JSON.stringify((details.symptoms || []).slice(0, 20), null, 2)}</pre>
                </div>

                <div className="section">
                  <h3>Reminders</h3>
                  <pre>{JSON.stringify(details.reminders || [], null, 2)}</pre>
                </div>

                {Array.isArray(details.warnings) && details.warnings.length > 0 && (
                  <div className="warnings">
                    <h3>Warnings</h3>
                    {details.warnings.map((w) => (
                      <p key={w}>{w}</p>
                    ))}
                  </div>
                )}
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
    align-items: center;
    gap: var(--space-4);
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
  }

  .filters {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }

  .filters input {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    background: #fff;
  }

  .filters button {
    border-radius: var(--radius-full);
    padding: var(--space-2) var(--space-4);
    background: var(--gradient-primary);
    color: #fff;
  }

  .err {
    margin-bottom: var(--space-3);
    color: #dc2626;
    font-size: var(--text-sm);
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
  }

  .list {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    max-height: 78vh;
    overflow: auto;
  }

  .user-item {
    text-align: left;
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-dark-100);
    background: #f9fafb;
    display: grid;
    gap: 4px;
  }

  .user-item span {
    color: var(--color-dark-600);
    font-size: var(--text-sm);
  }

  .user-item small {
    color: var(--color-dark-500);
    font-size: 0.75rem;
  }

  .user-item.active {
    border-color: #0d77be;
    background: #eef6fd;
  }

  .detail {
    display: grid;
    gap: var(--space-4);
    align-content: start;
  }

  .profile h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-1);
  }

  .profile p {
    color: var(--color-dark-500);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
  }

  .stats > div {
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    background: #f9fafb;
    display: grid;
    gap: var(--space-1);
  }

  .stats label {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .stats strong {
    font-size: var(--text-xl);
  }

  .section {
    display: grid;
    gap: var(--space-2);
  }

  .section h3 {
    font-size: var(--text-lg);
  }

  pre {
    margin: 0;
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-dark-100);
    background: #0f172a;
    color: #e2e8f0;
    max-height: 260px;
    overflow: auto;
    font-size: 12px;
    line-height: 1.5;
  }

  .warnings {
    border: 1px solid #fbbf24;
    border-radius: var(--radius-lg);
    background: #fffbeb;
    padding: var(--space-3);
    display: grid;
    gap: var(--space-2);
  }

  .warnings p {
    font-size: var(--text-sm);
    color: #92400e;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .list {
      max-height: none;
    }
    .stats {
      grid-template-columns: 1fr;
    }
  }
`;

export default TrackerDetails;
