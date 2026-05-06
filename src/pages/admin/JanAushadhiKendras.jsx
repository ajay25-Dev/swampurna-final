import React, { useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const JanAushadhiKendras = () => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    pin: "",
    name: "",
  });

  const onImport = async () => {
    if (!file) {
      setError("Please choose a CSV/XLSX/XLS file.");
      return;
    }
    setError("");
    setMessage("");
    setImporting(true);
    try {
      const res = await adminApi.importJanAushadhiKendras(file);
      setMeta(res.meta || null);
      setMessage(`Import completed. Upserted ${res?.meta?.upserted_rows || 0} rows.`);
    } catch (err) {
      setError(err.message || "Import failed");
    } finally {
      setImporting(false);
    }
  };

  const onSearch = async () => {
    setError("");
    setMessage("");
    setSearching(true);
    try {
      const res = await adminApi.searchJanAushadhiKendras({ ...filters, limit: 200, offset: 0 });
      setRows(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to search kendras");
    } finally {
      setSearching(false);
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Jan Aushadhi Kendras</h1>
            <p>Bulk import Kendras and search by state, district, pin, or name.</p>
          </div>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        <section className="card">
          <h2>Bulk Import</h2>
          <div className="import-row">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button onClick={onImport} disabled={importing}>
              {importing ? "Importing..." : "Import File"}
            </button>
          </div>
          {meta && (
            <div className="meta">
              <span>Total: {meta.total_rows}</span>
              <span>Valid: {meta.valid_rows}</span>
              <span>Upserted: {meta.upserted_rows}</span>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Search</h2>
          <div className="filters">
            <input
              placeholder="State"
              value={filters.state}
              onChange={(e) => setFilters((s) => ({ ...s, state: e.target.value }))}
            />
            <input
              placeholder="District"
              value={filters.district}
              onChange={(e) => setFilters((s) => ({ ...s, district: e.target.value }))}
            />
            <input
              placeholder="Pin Code"
              value={filters.pin}
              onChange={(e) => setFilters((s) => ({ ...s, pin: e.target.value }))}
            />
            <input
              placeholder="Name or Kendra Code"
              value={filters.name}
              onChange={(e) => setFilters((s) => ({ ...s, name: e.target.value }))}
            />
            <button onClick={onSearch} disabled={searching}>
              {searching ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Kendra Code</th>
                  <th>Name</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Pin</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="empty">
                      {searching ? "Loading..." : "No data. Use Search to fetch kendras."}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.sr_no ?? "-"}</td>
                      <td>{row.kendra_code}</td>
                      <td>{row.name}</td>
                      <td>{row.state_name}</td>
                      <td>{row.district_name || "-"}</td>
                      <td>{row.pin_code || "-"}</td>
                      <td>{row.address || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  display: grid;
  gap: var(--space-5);

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-soft);
    padding: var(--space-5);
  }

  .card h2 {
    margin-bottom: var(--space-3);
  }

  .import-row {
    display: flex;
    gap: var(--space-3);
    align-items: center;
    flex-wrap: wrap;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }

  input {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    padding: var(--space-3) var(--space-4);
    background: #fff;
  }

  button {
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: #fff;
    padding: var(--space-3) var(--space-5);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .table-wrap {
    overflow: auto;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-lg);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 980px;
  }

  th,
  td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid var(--color-dark-100);
    font-size: var(--text-sm);
  }

  th {
    background: #f8fafc;
    font-weight: 700;
  }

  .empty {
    text-align: center;
    color: var(--color-dark-500);
    padding: 24px;
  }

  .meta {
    margin-top: var(--space-3);
    display: flex;
    gap: var(--space-3);
    color: var(--color-dark-600);
    font-size: var(--text-sm);
  }

  .ok,
  .err {
    font-size: var(--text-sm);
  }

  .ok {
    color: #166534;
  }

  .err {
    color: #dc2626;
  }

  @media (max-width: 1200px) {
    .filters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 700px) {
    .filters {
      grid-template-columns: 1fr;
    }
  }
`;

export default JanAushadhiKendras;

