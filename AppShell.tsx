import Link from "next/link";
import { ReactNode } from "react";

const navGroups = [
  {
    label: "OVERVIEW",
    items: [{ href: "/", icon: "▦", label: "Dashboard" }]
  },
  {
    label: "PEOPLE & ADMIN",
    items: [
      { href: "/staff", icon: "♙", label: "Staff & ID" },
      { href: "/roster", icon: "▤", label: "Staff roster" },
      { href: "/kpi", icon: "◎", label: "Quarterly KPI" },
      { href: "/requests", icon: "⇢", label: "Office requests" },
      { href: "/reports", icon: "▧", label: "Department reports" }
    ]
  },
  {
    label: "BROADCAST & TECHNICAL",
    items: [
      { href: "/equipment", icon: "▣", label: "Equipment inventory" },
      { href: "/studio", icon: "◉", label: "Studio & guests" },
      { href: "/schedule", icon: "◷", label: "Airtime schedule" },
      { href: "/sponsorship", icon: "✓", label: "Sponsorship checklist" },
      { href: "/maintenance", icon: "⚙", label: "Maintenance" },
      { href: "/news", icon: "✦", label: "News service requests" }
    ]
  },
  {
    label: "COMMERCIAL & FINANCE",
    items: [
      { href: "/finance", icon: "₦", label: "Income & expenses" },
      { href: "/jobs", icon: "↗", label: "Marketing & commission" }
    ]
  }
];

export function AppShell({
  children,
  activePath
}: {
  children: ReactNode;
  activePath: string;
}) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">AC</div>
          <div><h1>ACNN TV</h1><p>OPERATIONS HUB</p></div>
        </div>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="nav-label">{group.label}</div>
            <nav className="nav-list">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className={`nav-link ${activePath === item.href ? "active" : ""}`}>
                  <span aria-hidden="true">{item.icon}</span>{item.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
        <div style={{ marginTop: 28, padding: "14px 10px", color: "#94a3b8", fontSize: 11, lineHeight: 1.7 }}>
          Church of Nigeria<br />Anglican Communion<br />ACNN TV internal operations
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div><strong style={{ fontSize: 13 }}>Operations workspace</strong><small>Manage the work behind every broadcast.</small></div>
          <div className="user-pill">Demo workspace · Not authenticated</div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
