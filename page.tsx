import { ModulePage } from "@/components/ModulePage";
import { CrudForm } from "@/components/CrudForm";
import { DataTable } from "@/components/DataTable";

export default function StudioPage() {
  return <ModulePage path="/studio" title="Studio programmes & guest register" description="Create programme records and maintain sponsorship readiness and production details.">
    <div className="notice">This page registers programme metadata and sponsorship checks. Guest CRUD endpoints and a full studio booking calendar are follow-on tasks.</div>
    <div className="grid two-col">
      <CrudForm title="Register a programme" endpoint="/api/programmes" fields={[
        { name: "title", label: "Programme title", required: true },
        { name: "durationMinutes", label: "Duration (minutes)", type: "number", required: true },
        { name: "producer", label: "Producer" },
        { name: "presenter", label: "Presenter / anchor" },
        { name: "description", label: "Programme description", type: "textarea", full: true },
        { name: "sponsored", label: "Sponsored programme", type: "checkbox" },
        { name: "sponsorName", label: "Sponsor name" },
        { name: "sponsorAgreement", label: "Agreement signed", type: "checkbox" },
        { name: "sponsorPaid", label: "Payment confirmed", type: "checkbox" },
        { name: "requiredSpots", label: "Required advert spots", type: "number" }
      ]}/>
      <DataTable endpoint="/api/programmes" title="Programme register" columns={[
        { key: "title", label: "Programme" },
        { key: "durationMinutes", label: "Duration (min)" },
        { key: "producer", label: "Producer" },
        { key: "presenter", label: "Presenter" },
        { key: "sponsored", label: "Sponsored", format: v => v ? "Yes" : "No" },
        { key: "sponsorAgreement", label: "Agreement", format: v => v ? "Complete" : "Pending" },
        { key: "sponsorPaid", label: "Payment", format: v => v ? "Paid" : "Unconfirmed" }
      ]}/>
    </div>
  </ModulePage>;
}
