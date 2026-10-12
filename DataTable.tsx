 "use client";

import { useEffect, useState } from "react";

type Column = { key: string; label: string; format?: (value: unknown, row: Record<string, unknown>) => string };

export function DataTable({ endpoint, columns, title }: { endpoint: string; columns: Column[]; title: string }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(endpoint)
      .then(async (r) => {
        if (!r.ok) throw new Error("Unable to load records.");
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : Array.isArray(data.entries) ? data.entries : [];
        if (active) setRows(list as Record<string, unknown>[]);
      })
      .catch(() => { if (active) setError("Records could not be loaded. Check that the database is configured."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint]);

  function render(value: unknown, row: Record<string, unknown>, column: Column) {
    if (column.format) return column.format(value, row);
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "string" && value.includes("T") && !Number.isNaN(Date.parse(value))) return new Date(value).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" });
    return String(value).replaceAll("_", " ");
  }

  return <section className="card">
    <div className="section-head"><div><h3>{title}</h3><p>{loading ? "Loading records…" : `${rows.length} record(s)`}</p></div></div>
    {error ? <div className="empty">{error}</div> : loading ? <div className="empty">Loading…</div> : rows.length === 0 ? <div className="empty">No records yet. Use the form to create the first record.</div> :
      <div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead><tbody>
        {rows.map((row, i) => <tr key={String(row.id ?? row.requestNumber ?? row.assetCode ?? i)}>{columns.map(c => <td key={c.key}>{render(row[c.key], row, c)}</td>)}</tr>)}
      </tbody></table></div>}
  </section>;
}
