import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatBool = (value) => (value ? "Yes" : "No");

const humanizeKey = (key = "") =>
  String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return formatBool(value);
  if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const FieldCard = ({ label, value }) => (
  <div className="field-card">
    <span>{label}</span>
    <strong>{formatValue(value)}</strong>
  </div>
);

const DataTable = ({ columns, rows, emptyText }) => (
  <div className="table-wrap">
    {rows.length === 0 ? (
      <p className="empty-line">{emptyText}</p>
    ) : (
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || `${columns[0]?.key}-${index}`}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : formatValue(row[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const KeyValueGrid = ({ data, exclude = [] }) => {
  const entries = Object.entries(data || {}).filter(([key]) => !exclude.includes(key));
  if (!entries.length) return <p className="empty-line">No details available.</p>;
  return (
    <div className="kv-grid">
      {entries.map(([key, value]) => (
        <FieldCard key={key} label={humanizeKey(key)} value={formatValue(value)} />
      ))}
    </div>
  );
};

const STATUS_CLASS_NAMES = {
  pre_period: "pre-period",
  period: "period",
  post_period: "post-period",
  peak_ovulation: "peak-ovulation",
};

const statusLabel = (status, legend = []) => {
  const match = legend.find((item) => item.key === status);
  return match?.label || humanizeKey(status);
};

const PredictionSummary = ({ summary }) => {
  if (!summary) return <p className="empty-line">No prediction summary available.</p>;

  const data = summary.data || {};
  const days = Array.isArray(data.days) ? data.days : [];
  const legend = Array.isArray(summary.legend) ? summary.legend : [];
  const adaptiveMetrics = summary.adaptive_metrics || {};
  const fertileDays = days.filter((day) => day.statuses?.includes("peak_ovulation")).length;
  const periodDays = days.filter((day) => day.statuses?.includes("period")).length;

  return (
    <div className="prediction-summary">
      <div className="kv-grid important-grid">
        <FieldCard label="Month" value={data.month} />
        <FieldCard label="Cycle Length" value={data.cycle_length_days ? `${data.cycle_length_days} days` : "N/A"} />
        <FieldCard label="Period Length" value={data.period_length_days ? `${data.period_length_days} days` : "N/A"} />
        <FieldCard label="Ovulation Window" value={data.ovulation_window_days ? `${data.ovulation_window_days} days` : "N/A"} />
        <FieldCard label="Pre Period Days" value={data.pre_period_days} />
        <FieldCard label="Post Period Days" value={data.post_period_days} />
        <FieldCard label="Predicted Period Days" value={periodDays} />
        <FieldCard label="Predicted Fertile Days" value={fertileDays} />
      </div>

      <div className="summary-row">
        <div className="summary-box">
          <h4>Adaptive Metrics</h4>
          <div className="mini-grid">
            <FieldCard label="Cycle Used" value={adaptiveMetrics.cycle_length_days ? `${adaptiveMetrics.cycle_length_days} days` : "N/A"} />
            <FieldCard label="Period Used" value={adaptiveMetrics.period_length_days ? `${adaptiveMetrics.period_length_days} days` : "N/A"} />
            <FieldCard label="Cycle Samples" value={adaptiveMetrics.samples_used_for_cycle} />
            <FieldCard label="Period Samples" value={adaptiveMetrics.samples_used_for_period} />
            <FieldCard label="Source" value={adaptiveMetrics.source === "historical_logs" ? "Historical logs" : "Setup defaults"} />
          </div>
        </div>

        <div className="summary-box">
          <h4>Legend</h4>
          <div className="legend-list">
            {legend.map((item) => (
              <span key={item.key} className={`status-chip ${STATUS_CLASS_NAMES[item.key] || "default"}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <DataTable
        rows={days}
        emptyText="No prediction days available."
        columns={[
          { key: "date", label: "Date", render: (row) => formatDate(row.date) },
          { key: "day", label: "Cycle Day" },
          {
            key: "primary_status",
            label: "Main Prediction",
            render: (row) => row.primary_status ? statusLabel(row.primary_status, legend) : "Normal day",
          },
          {
            key: "statuses",
            label: "All Statuses",
            render: (row) => row.statuses?.length
              ? row.statuses.map((item) => statusLabel(item, legend)).join(", ")
              : "None",
          },
        ]}
      />
    </div>
  );
};

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

  const setup = details?.setup || null;
  const summary = details?.summary || null;
  const notificationSettings = details?.notification_settings || null;
  const logs = details?.logs || [];
  const symptoms = details?.symptoms || [];
  const reminders = details?.reminders || [];

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
                  <div>
                    <h2>{selectedUser?.name || details.customer?.name || details.user?.email || "Customer"}</h2>
                    <p>{details.user?.email}</p>
                  </div>
                  <span className={details.user?.is_active ? "active-pill" : "inactive-pill"}>
                    {details.user?.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="stats">
                  <div>
                    <label>Period Logs</label>
                    <strong>{logs.length}</strong>
                  </div>
                  <div>
                    <label>Symptom Entries</label>
                    <strong>{symptoms.length}</strong>
                  </div>
                  <div>
                    <label>Reminders</label>
                    <strong>{reminders.length}</strong>
                  </div>
                </div>

                <div className="section">
                  <h3>Cycle Setup</h3>
                  {setup ? (
                    <div className="kv-grid important-grid">
                      <FieldCard label="Last Period Start" value={formatDate(setup.last_period_start_date)} />
                      <FieldCard label="Period End" value={formatDate(setup.period_end_date)} />
                      <FieldCard label="Cycle Length" value={`${setup.cycle_length_days || "N/A"} days`} />
                      <FieldCard label="Period Length" value={`${setup.period_length_days || "N/A"} days`} />
                      <FieldCard label="Pre Period Days" value={setup.pre_period_days} />
                      <FieldCard label="Post Period Days" value={setup.post_period_days} />
                      <FieldCard label="Ovulation Start Day" value={setup.ovulation_start_day} />
                      <FieldCard label="Ovulation Window" value={`${setup.ovulation_window_days || "N/A"} days`} />
                      <FieldCard label="Selected Dates" value={setup.selected_dates?.map(formatDate)} />
                      <FieldCard label="Has No Idea" value={setup.has_no_idea} />
                      <FieldCard label="Notes" value={setup.notes} />
                      <FieldCard label="Last Updated" value={formatDate(setup.updated_at)} />
                    </div>
                  ) : (
                    <p className="empty-line">No setup saved.</p>
                  )}
                </div>

                <div className="section">
                  <h3>Prediction Summary</h3>
                  <PredictionSummary summary={summary} />
                </div>

                <div className="section">
                  <h3>Notification Settings</h3>
                  <KeyValueGrid data={notificationSettings} exclude={["id", "user_id"]} />
                </div>

                <div className="section">
                  <h3>Recent Period Logs</h3>
                  <DataTable
                    rows={logs.slice(0, 20)}
                    emptyText="No period logs found."
                    columns={[
                      { key: "period_start_date", label: "Start", render: (row) => formatDate(row.period_start_date) },
                      { key: "period_end_date", label: "End", render: (row) => formatDate(row.period_end_date) },
                      { key: "flow", label: "Flow" },
                      { key: "notes", label: "Notes" },
                      { key: "created_at", label: "Created", render: (row) => formatDate(row.created_at) },
                    ]}
                  />
                </div>

                <div className="section">
                  <h3>Recent Symptoms</h3>
                  <DataTable
                    rows={symptoms.slice(0, 20)}
                    emptyText="No symptom entries found."
                    columns={[
                      { key: "track_date", label: "Date", render: (row) => formatDate(row.track_date) },
                      { key: "mood", label: "Mood" },
                      { key: "pain_level", label: "Pain" },
                      { key: "symptoms", label: "Symptoms" },
                      { key: "notes", label: "Notes" },
                    ]}
                  />
                </div>

                <div className="section">
                  <h3>Reminders</h3>
                  <DataTable
                    rows={reminders}
                    emptyText="No reminders set."
                    columns={[
                      { key: "reminder_type", label: "Type" },
                      { key: "reminder_time", label: "Time" },
                      { key: "is_enabled", label: "Enabled", render: (row) => formatBool(row.is_enabled) },
                      { key: "created_at", label: "Created", render: (row) => formatDate(row.created_at) },
                    ]}
                  />
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
    gap: var(--space-2);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-2) var(--space-3);
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
    padding: var(--space-2) var(--space-3);
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
    gap: var(--space-2);
    align-content: start;
  }

  .profile {
    align-items: flex-start;
    display: flex;
    gap: var(--space-2);
    justify-content: space-between;
  }

  .profile h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-1);
  }

  .profile p {
    color: var(--color-dark-500);
  }

  .active-pill,
  .inactive-pill {
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 700;
    padding: 6px 10px;
  }

  .active-pill {
    background: #ecfdf5;
    color: #166534;
  }

  .inactive-pill {
    background: #fef2f2;
    color: #991b1b;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-2);
  }

  .stats > div,
  .field-card {
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    background: #f9fafb;
    display: grid;
    gap: var(--space-1);
  }

  .stats label,
  .field-card span {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .stats strong {
    font-size: var(--text-xl);
  }

  .field-card strong {
    color: var(--color-dark-800);
    font-size: var(--text-sm);
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .section {
    display: grid;
    gap: var(--space-2);
  }

  .section h3 {
    font-size: var(--text-lg);
    margin: 0;
  }

  .kv-grid {
    display: grid;
    gap: var(--space-2);
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .important-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .prediction-summary {
    display: grid;
    gap: var(--space-4);
  }

  .summary-row {
    display: grid;
    gap: var(--space-2);
    grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  }

  .summary-box {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
    display: grid;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
  }

  .summary-box h4 {
    color: var(--color-dark-800);
    font-size: var(--text-base);
    margin: 0;
  }

  .mini-grid {
    display: grid;
    gap: var(--space-2);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .legend-list {
    align-content: start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .status-chip {
    border-radius: var(--radius-full);
    display: inline-flex;
    font-size: var(--text-sm);
    font-weight: 700;
    padding: 7px 10px;
  }

  .status-chip.pre-period { background: #fef3c7; color: #92400e; }
  .status-chip.period { background: #fee2e2; color: #991b1b; }
  .status-chip.post-period { background: #dcfce7; color: #166534; }
  .status-chip.peak-ovulation { background: #dbeafe; color: #1d4ed8; }
  .status-chip.default { background: #e2e8f0; color: #334155; }
  .table-wrap {
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
    overflow: auto;
  }

  table {
    border-collapse: collapse;
    min-width: 760px;
    width: 100%;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-dark-100);
    color: var(--color-dark-700);
    font-size: var(--text-sm);
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #f8fafc;
    color: var(--color-dark-500);
    font-weight: 700;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  .empty-line {
    color: var(--color-dark-500);
    margin: 0;
    padding: var(--space-2) var(--space-3);
  }

  .warnings {
    border: 1px solid #fbbf24;
    border-radius: var(--radius-lg);
    background: #fffbeb;
    padding: var(--space-2) var(--space-3);
    display: grid;
    gap: var(--space-2);
  }

  .warnings p {
    font-size: var(--text-sm);
    color: #92400e;
  }

  @media (max-width: 1200px) {
    .important-grid,
    .kv-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .list {
      max-height: none;
    }
    .stats,
    .important-grid,
    .kv-grid,
    .summary-row,
    .mini-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default TrackerDetails;