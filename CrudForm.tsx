"use client";

import { FormEvent, useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
  placeholder?: string;
};

export function CrudForm({
  title,
  endpoint,
  fields,
  submitLabel = "Save record",
  description
}: {
  title: string;
  endpoint: string;
  fields: Field[];
  submitLabel?: string;
  description?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    const payload: Record<string, unknown> = { ...values };
    for (const field of fields) {
      if (field.type === "number" && values[field.name] !== undefined && values[field.name] !== "") {
        payload[field.name] = Number(values[field.name]);
      }
      if (field.type === "datetime-local" && values[field.name]) {
        payload[field.name] = new Date(values[field.name]).toISOString();
      }
      if (field.type === "checkbox") payload[field.name] = values[field.name] === "true";
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        const detail = result?.error;
        setMessage(typeof detail === "string" ? detail : "Could not save. Check the entered values and try again.");
      } else {
        setMessage("Record saved successfully.");
        setValues({});
      }
    } catch {
      setMessage("Could not reach the server. Check your connection and database setup.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <div className="section-head"><div><h3>{title}</h3>{description && <p>{description}</p>}</div></div>
      {message && <div className="notice" role="status">{message}</div>}
      <form onSubmit={submit}>
        <div className="field-grid">
          {fields.map((field) => (
            <label className={`field ${field.full ? "full" : ""}`} key={field.name}>
              <span>{field.label}{field.required ? " *" : ""}</span>
              {field.options ? (
                <select required={field.required} value={values[field.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}>
                  <option value="">Select…</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea required={field.required} placeholder={field.placeholder} value={values[field.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))} />
              ) : field.type === "checkbox" ? (
                <input type="checkbox" checked={values[field.name] === "true"} onChange={(e) => setValues((v) => ({ ...v, [field.name]: String(e.target.checked) }))} />
              ) : (
                <input
                  type={field.type ?? "text"}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              )}
            </label>
          ))}
        </div>
        <div className="form-actions"><button className="primary-btn" disabled={busy}>{busy ? "Saving…" : submitLabel}</button></div>
      </form>
    </section>
  );
}
