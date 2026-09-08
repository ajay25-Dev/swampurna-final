import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const STATUS_LABELS = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  published: "Published",
};

const FEATURE_LABELS = {
  period_tracker: "Period Tracker",
  cycle_snaps: "Cycle Snaps",
  community_posts: "Community Posts",
  support: "Support Reports",
  testimonials: "Testimonials",
  story_submissions: "Story Submissions",
  chatbot: "Chatbot",
  education_material: "Education Material",
  games: "Games",
  gallery: "Gallery",
  notifications: "Notifications",
  other: "Other",
};

const DONUT_COLORS = ["#0379C7", "#D97652", "#5A9470", "#D97706", "#8B5CF6", "#DC2626", "#0891B2"];

const RANGE_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "365", label: "1 year" },
  { value: "all", label: "All time" },
];

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  } catch {
    return value;
  }
}

function formatBucketLabel(value, granularity) {
  if (!value) return "";
  try {
    if (granularity === "month") {
      const [y, m] = value.split("-");
      return new Date(Date.UTC(Number(y), Number(m) - 1, 1)).toLocaleDateString(undefined, { month: "short", year: "2-digit" });
    }
    return new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  } catch {
    return value;
  }
}

function titleCase(key) {
  return String(key || "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildDonut(entries) {
  const total = entries.reduce((sum, e) => sum + e.count, 0) || 1;
  let cursor = 0;
  const stops = entries.map((e, i) => {
    const start = (cursor / total) * 360;
    cursor += e.count;
    const end = (cursor / total) * 360;
    const color = DONUT_COLORS[i % DONUT_COLORS.length];
    return { ...e, color, start, end, pct: Math.round((e.count / total) * 100) };
  });
  const gradient = stops.map((s) => `${s.color} ${s.start}deg ${s.end}deg`).join(", ");
  return { gradient: `conic-gradient(${gradient})`, stops, total };
}

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("30");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    const params = customFrom || customTo ? { from: customFrom, to: customTo } : { range };
    adminApi
      .getDashboardOverview(params)
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load dashboard");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [range, customFrom, customTo]);

  const totals = data?.totals || {};
  const rangeInfo = data?.range || {};
  const signupTrend = data?.signup_trend || [];
  const mostActiveUsers = data?.most_active_users || [];
  const mostLoggedSymptoms = data?.most_logged_symptoms || [];
  const flowBreakdown = data?.flow_intensity_breakdown || [];
  const mostSelectedOptions = data?.most_selected_options || [];
  const featureUsage = data?.feature_usage || [];
  const supportByStatus = data?.support_reports_by_status || {};
  const cycleByStatus = data?.cycle_snaps_by_status || {};

  const maxSignup = Math.max(1, ...signupTrend.map((d) => d.count));
  const totalSignups = signupTrend.reduce((sum, d) => sum + d.count, 0);
  const denseTrend = signupTrend.length > 12;
  const labelStep = Math.max(1, Math.ceil(signupTrend.length / 10));
  const barMinWidth = signupTrend.length > 40 ? 8 : signupTrend.length > 20 ? 14 : 22;
  const maxSymptomCount = Math.max(1, ...mostLoggedSymptoms.map((s) => s.count));
  const maxOptionCount = Math.max(1, ...mostSelectedOptions.map((o) => o.count));
  const maxFeatureCount = Math.max(1, ...featureUsage.map((f) => f.count));

  const featureDonut = buildDonut(featureUsage.map((f) => ({ key: f.feature, count: f.count })));
  const supportDonut = buildDonut(Object.entries(supportByStatus).map(([key, count]) => ({ key, count })));
  const cycleDonut = buildDonut(Object.entries(cycleByStatus).map(([key, count]) => ({ key, count })));

  const kpis = [
    { label: "Total App Users", value: totals.customers ?? 0, hint: `${totals.new_customers_in_range ?? 0} new in this range`, tone: "primary" },
    { label: "Active Users", value: totals.active_customers ?? 0, hint: "Accounts currently active", tone: "secondary" },
    { label: "Period Tracker Setups", value: totals.period_tracker_setups ?? 0, hint: "Users with a cycle configured", tone: "accent" },
    { label: "Symptom Entries", value: totals.symptom_entries ?? 0, hint: "Daily check-ins in this range", tone: "primary" },
    { label: "Community Posts", value: totals.community_posts_total ?? 0, hint: "Posts shared in this range", tone: "secondary" },
    { label: "Support Reports", value: totals.support_reports_total ?? 0, hint: `${totals.support_reports_open ?? 0} still open`, tone: "danger" },
    { label: "Cycle Snaps", value: totals.cycle_snaps_total ?? 0, hint: `${totals.cycle_snaps_pending ?? 0} pending review`, tone: "secondary" },
    { label: "Testimonials", value: totals.testimonials_total ?? 0, hint: `${totals.testimonials_pending ?? 0} pending moderation`, tone: "accent" },
    { label: "Story Submissions", value: totals.story_submissions_total ?? 0, hint: `${totals.story_submissions_pending ?? 0} pending review`, tone: "primary" },
  ];

  return (
    <AdminLayout>
      <Wrap>
        <div className="head-row">
          <div>
            <h1>Dashboard</h1>
            <p className="sub">Live insights from the SWAMPURNA app — usage, engagement and what needs your attention.</p>
          </div>
          <RangeBar>
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={!customFrom && !customTo && range === opt.value ? "active" : ""}
                onClick={() => {
                  setCustomFrom("");
                  setCustomTo("");
                  setRange(opt.value);
                }}
              >
                {opt.label}
              </button>
            ))}
            <div className="custom-range">
              <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
              <span>to</span>
              <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
            </div>
          </RangeBar>
        </div>

        {!data?.range?.activity_tracking_enabled && !loading && !error && (
          <TrackingNote>
            <strong>Feature-usage numbers below are estimated</strong> from existing activity (tracker check-ins, cycle
            snaps, posts, reports) because the app isn&apos;t sending detailed usage events yet. To get a precise
            &ldquo;which feature does each user use most&rdquo; breakdown, have the mobile/customer app call{" "}
            <code>POST /api/v1/activity/track</code> with <code>{"{ feature, event_type }"}</code> whenever a user opens a
            feature (period_tracker, chatbot, games, education_material, gallery, etc.). Once events start coming in,
            this panel switches to real tracked data automatically.
          </TrackingNote>
        )}

        {loading && <p className="loading">Loading dashboard…</p>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <KpiGrid>
              {kpis.map((k) => (
                <div className={`kpi tone-${k.tone}`} key={k.label}>
                  <span className="kpi-value">{k.value}</span>
                  <span className="kpi-label">{k.label}</span>
                  <span className="kpi-hint">{k.hint}</span>
                </div>
              ))}
            </KpiGrid>

            <div className="two-col">
              <Panel>
                <h2>New Signups</h2>
                <p className="panel-sub">
                  {rangeInfo.start ? `${rangeInfo.start} to ${rangeInfo.end}` : "All time"} · grouped by {rangeInfo.granularity || "day"}
                </p>
                {totalSignups === 0 ? (
                  <EmptyChart>
                    <span className="empty-icon">📈</span>
                    <span>No signups in this period.</span>
                  </EmptyChart>
                ) : (
                  <TrendChart>
                    {signupTrend.map((d, i) => (
                      <div className="bar-col" key={d.date} style={{ minWidth: `${barMinWidth}px` }}>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{ height: `${Math.max((d.count / maxSignup) * 100, d.count > 0 ? 6 : 0)}%` }}
                            title={`${d.count} on ${d.date}`}
                          />
                        </div>
                        {!denseTrend && <span className="bar-count">{d.count}</span>}
                        {(!denseTrend || i % labelStep === 0 || i === signupTrend.length - 1) && (
                          <span className="bar-date">{formatBucketLabel(d.date, rangeInfo.granularity)}</span>
                        )}
                      </div>
                    ))}
                  </TrendChart>
                )}
              </Panel>

              <Panel>
                <h2>Most Active Users</h2>
                <p className="panel-sub">
                  {data?.range?.activity_tracking_enabled
                    ? "Ranked by total tracked feature-usage events."
                    : "Ranked by number of tracked symptom check-ins (best available signal until feature tracking is enabled)."}
                </p>
                {mostActiveUsers.length === 0 ? (
                  <p className="empty">No activity yet.</p>
                ) : (
                  <UserTable>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Activity</th>
                        <th>Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mostActiveUsers.map((u) => (
                        <tr key={u.user_id}>
                          <td>
                            <div className="user-name">{u.name}</div>
                            <div className="user-email">{u.email || u.phone || "—"}</div>
                          </td>
                          <td className="entries">{u.entries_count}</td>
                          <td>{formatDate(u.last_active)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </UserTable>
                )}
              </Panel>
            </div>

            <div className="two-col">
              <Panel>
                <h2>Feature Usage</h2>
                <p className="panel-sub">
                  Which parts of the app get used most {data?.range?.activity_tracking_enabled ? "(tracked)" : "(estimated)"}.
                </p>
                {featureUsage.length === 0 ? (
                  <p className="empty">No feature activity yet.</p>
                ) : (
                  <DonutRow>
                    <Donut style={{ background: featureDonut.gradient }}>
                      <div className="donut-hole">
                        <span className="donut-total">{featureDonut.total}</span>
                        <span className="donut-total-label">events</span>
                      </div>
                    </Donut>
                    <BarList className="donut-legend">
                      {featureDonut.stops.map((s) => (
                        <div className="bar-row" key={s.key}>
                          <span className="bar-row-label">
                            <span className="dot" style={{ background: s.color }} />
                            {FEATURE_LABELS[s.key] || titleCase(s.key)}
                          </span>
                          <div className="bar-row-track">
                            <div className="bar-row-fill" style={{ width: `${(s.count / maxFeatureCount) * 100}%`, background: s.color }} />
                          </div>
                          <span className="bar-row-count">{s.count}</span>
                        </div>
                      ))}
                    </BarList>
                  </DonutRow>
                )}
              </Panel>

              <Panel>
                <h2>Most Selected Preferences</h2>
                <p className="panel-sub">Which period-tracker options app users pick most.</p>
                {mostSelectedOptions.length === 0 ? (
                  <p className="empty">No preference data yet.</p>
                ) : (
                  <BarList>
                    {mostSelectedOptions.map((o) => (
                      <div className="bar-row" key={`${o.category_key}-${o.option_key}`}>
                        <span className="bar-row-label">
                          {o.option_label}
                          <span className="bar-row-category">{o.category_label}</span>
                        </span>
                        <div className="bar-row-track">
                          <div className="bar-row-fill accent" style={{ width: `${(o.count / maxOptionCount) * 100}%` }} />
                        </div>
                        <span className="bar-row-count">{o.count}</span>
                      </div>
                    ))}
                  </BarList>
                )}
              </Panel>
            </div>

            <div className="two-col">
              <Panel>
                <h2>Most Logged Symptoms</h2>
                <p className="panel-sub">What users select most often when tracking.</p>
                {mostLoggedSymptoms.length === 0 ? (
                  <p className="empty">No symptom data yet.</p>
                ) : (
                  <BarList>
                    {mostLoggedSymptoms.map((s) => (
                      <div className="bar-row" key={s.key}>
                        <span className="bar-row-label">{titleCase(s.key)}</span>
                        <div className="bar-row-track">
                          <div className="bar-row-fill" style={{ width: `${(s.count / maxSymptomCount) * 100}%` }} />
                        </div>
                        <span className="bar-row-count">{s.count}</span>
                      </div>
                    ))}
                  </BarList>
                )}
              </Panel>

              <Panel>
                <h2>Flow Intensity Logged</h2>
                {flowBreakdown.length === 0 ? (
                  <p className="empty">No flow data yet.</p>
                ) : (
                  <PillList>
                    {flowBreakdown.map((f) => (
                      <div className="pill" key={f.key}>
                        <span className="pill-label">{titleCase(f.key)}</span>
                        <span className="pill-count">{f.count}</span>
                      </div>
                    ))}
                  </PillList>
                )}
              </Panel>
            </div>

            <div className="two-col">
              <Panel>
                <h2>Support Reports</h2>
                {Object.keys(supportByStatus).length === 0 ? (
                  <p className="empty">None in this range.</p>
                ) : (
                  <DonutRow>
                    <Donut small style={{ background: supportDonut.gradient }}>
                      <div className="donut-hole small">
                        <span className="donut-total">{supportDonut.total}</span>
                      </div>
                    </Donut>
                    <PillList>
                      {supportDonut.stops.map((s) => (
                        <div className={`pill status-${s.key}`} key={s.key}>
                          <span className="dot" style={{ background: s.color }} />
                          <span className="pill-label">{STATUS_LABELS[s.key] || titleCase(s.key)}</span>
                          <span className="pill-count">{s.count}</span>
                        </div>
                      ))}
                    </PillList>
                  </DonutRow>
                )}
              </Panel>

              <Panel>
                <h2>Cycle Snaps</h2>
                {Object.keys(cycleByStatus).length === 0 ? (
                  <p className="empty">None in this range.</p>
                ) : (
                  <DonutRow>
                    <Donut small style={{ background: cycleDonut.gradient }}>
                      <div className="donut-hole small">
                        <span className="donut-total">{cycleDonut.total}</span>
                      </div>
                    </Donut>
                    <PillList>
                      {cycleDonut.stops.map((s) => (
                        <div className={`pill status-${s.key}`} key={s.key}>
                          <span className="dot" style={{ background: s.color }} />
                          <span className="pill-label">{STATUS_LABELS[s.key] || titleCase(s.key)}</span>
                          <span className="pill-count">{s.count}</span>
                        </div>
                      ))}
                    </PillList>
                  </DonutRow>
                )}
              </Panel>
            </div>
          </>
        )}
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
  }

  .sub {
    color: var(--color-dark-500);
  }

  .loading,
  .empty {
    color: var(--color-dark-400);
    font-size: var(--text-sm);
  }

  .error {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.08);
    border: 1px solid rgba(220, 38, 38, 0.2);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }

  @media (max-width: 1024px) {
    .two-col {
      grid-template-columns: 1fr;
    }
  }
`;

const RangeBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  background: white;
  border: 1px solid var(--color-dark-100);
  border-radius: var(--radius-full);
  padding: 6px;
  box-shadow: var(--shadow-soft);

  button {
    padding: 8px 16px;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--color-dark-600);
    font-weight: 600;
    font-size: var(--text-sm);
  }

  button.active {
    background: var(--gradient-primary);
    color: white;
  }

  .custom-range {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: var(--space-2);
    border-left: 1px solid var(--color-dark-100);
    font-size: 0.75rem;
    color: var(--color-dark-400);
  }

  .custom-range input {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-md);
    padding: 5px 8px;
    font-size: 0.75rem;
    background: #f9fafb;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TrackingNote = styled.div`
  background: var(--color-accent-50, #fffbeb);
  border: 1px solid var(--color-accent-100, #fde68a);
  color: var(--color-dark-700);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: var(--space-6);

  code {
    background: rgba(0, 0, 0, 0.06);
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.85em;
  }
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);

  .kpi {
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-top: 3px solid var(--color-dark-200);
  }

  .kpi.tone-primary {
    border-top-color: var(--color-primary-500);
  }

  .kpi.tone-secondary {
    border-top-color: var(--color-secondary-500);
  }

  .kpi.tone-accent {
    border-top-color: var(--color-accent-500);
  }

  .kpi.tone-danger {
    border-top-color: #dc2626;
  }

  .kpi-value {
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--color-dark-900);
  }

  .kpi-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-700);
  }

  .kpi-hint {
    font-size: 0.75rem;
    color: var(--color-dark-400);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Panel = styled.div`
  background: white;
  border: 1px solid var(--color-dark-100);
  border-radius: var(--radius-2xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-soft);
  min-width: 0;

  h2 {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-dark-900);
    margin-bottom: var(--space-1);
  }

  .panel-sub {
    font-size: 0.8rem;
    color: var(--color-dark-400);
    margin-bottom: var(--space-4);
  }
`;

const TrendChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  height: 160px;
  margin-top: var(--space-4);
  overflow-x: auto;

  .bar-col {
    flex: 1;
    min-width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    gap: 4px;
  }

  .bar-track {
    width: 100%;
    max-width: 22px;
    height: 100px;
    display: flex;
    align-items: flex-end;
    background: var(--color-dark-50);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .bar-fill {
    width: 100%;
    background: var(--gradient-primary);
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    min-height: 2px;
    transition: height var(--transition-base);
  }

  .bar-count {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-dark-700);
  }

  .bar-date {
    font-size: 0.62rem;
    color: var(--color-dark-400);
    white-space: nowrap;
  }
`;

const EmptyChart = styled.div`
  height: 160px;
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: var(--color-dark-50);
  border: 1px dashed var(--color-dark-200);
  border-radius: var(--radius-lg);
  color: var(--color-dark-400);
  font-size: var(--text-sm);

  .empty-icon {
    font-size: 1.6rem;
    opacity: 0.5;
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-dark-400);
    padding: 0 var(--space-2) var(--space-2);
    border-bottom: 1px solid var(--color-dark-100);
  }

  td {
    padding: var(--space-3) var(--space-2);
    border-bottom: 1px solid var(--color-dark-50);
    font-size: var(--text-sm);
    vertical-align: top;
  }

  .user-name {
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .user-email {
    color: var(--color-dark-400);
    font-size: 0.75rem;
  }

  .entries {
    font-weight: 700;
    color: var(--color-primary-600);
  }
`;

const BarList = styled.div`
  display: grid;
  gap: var(--space-3);
  align-content: start;

  .bar-row {
    display: grid;
    grid-template-columns: 140px 1fr 32px;
    align-items: center;
    gap: var(--space-3);
  }

  .bar-row-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-800);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .bar-row-label .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .bar-row-category {
    display: block;
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--color-dark-400);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .bar-row-track {
    height: 10px;
    background: var(--color-dark-50);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .bar-row-fill {
    height: 100%;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
  }

  .bar-row-fill.accent {
    background: var(--gradient-secondary);
  }

  .bar-row-count {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-dark-700);
    text-align: right;
  }
`;

const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: var(--space-2);

  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 6px 12px;
    background: var(--color-dark-50);
    border-radius: var(--radius-full);
    border: 1px solid var(--color-dark-100);
  }

  .pill .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .pill-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-dark-700);
  }

  .pill-count {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-dark-900);
    background: white;
    padding: 1px 7px;
    border-radius: var(--radius-full);
  }

  .status-open,
  .status-pending {
    background: rgba(217, 118, 82, 0.1);
    border-color: rgba(217, 118, 82, 0.25);
  }

  .status-in_progress {
    background: rgba(3, 121, 199, 0.1);
    border-color: rgba(3, 121, 199, 0.25);
  }

  .status-resolved,
  .status-approved,
  .status-published {
    background: rgba(90, 148, 112, 0.12);
    border-color: rgba(90, 148, 112, 0.3);
  }

  .status-closed,
  .status-rejected {
    background: var(--color-dark-100);
  }
`;

const DonutRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;

  .donut-legend {
    flex: 1;
    min-width: 200px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Donut = styled.div`
  width: ${(p) => (p.small ? "88px" : "128px")};
  height: ${(p) => (p.small ? "88px" : "128px")};
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .donut-hole {
    width: 62%;
    height: 62%;
    border-radius: 50%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px var(--color-dark-100);
  }

  .donut-total {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-dark-900);
    line-height: 1;
  }

  .donut-total-label {
    font-size: 0.6rem;
    color: var(--color-dark-400);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export default Dashboard;
