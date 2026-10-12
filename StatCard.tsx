export function StatCard({
  label,
  value,
  note,
  icon
}: {
  label: string;
  value: string;
  note: string;
  icon: string;
}) {
  return (
    <section className="card">
      <div className="stat-top"><span style={{ color: "#475569", fontSize: 12 }}>{label}</span><span className="stat-icon">{icon}</span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">{note}</div>
    </section>
  );
}
