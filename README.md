# ACNN TV Operations Hub

Starter codebase for a web-based operations management platform for ACNN TV.

## Included

- Responsive dashboard
- Prisma/PostgreSQL data model for staff, departments, equipment, loans, programmes, guests, schedules, requests, approvals, finance, marketing jobs, KPI, roster, departmental reports, maintenance, news requests and audit logs
- CRUD starter interfaces for staff, equipment, schedules, office requests, finance, marketing jobs, news requests and programme sponsorship metadata
- API routes with input validation
- Schedule overlap check by channel
- 10% net commission calculation utility
- Basic audit records for selected actions
- Health endpoint

## Important security note

This is a development starter, **not production-ready software**. It deliberately does not ship a default administrator password. Before using real ACNN TV staff, financial or guest data, implement and test:

1. Authentication and session management.
2. Server-side role and permission checks on every route.
3. CSRF/origin protections appropriate to the chosen auth setup, rate limiting and security headers.
4. Approval rules, separation of duties, and authenticated audit actors.
5. Data retention, backup and restore procedures.
6. Secure upload handling for documents and ID photographs.
7. Validation and automated tests for all financial and operational workflows.
8. Accessibility, privacy review, logging and monitoring.
9. Accounting controls, reconciliations, tax treatment and approved commission policy.
10. Production deployment, secrets management and penetration testing.

The UI currently labels itself as a demo workspace because authentication is not implemented. Do not expose the app publicly until security controls are complete.

## Requirements

- Node.js 20 or later
- Docker Desktop or a PostgreSQL 16 server
- npm

## Run locally

```bash
# 1. Unzip this project and enter the directory
cd acnn-tv-operations-hub

# 2. Install dependencies
npm install

# 3. Start PostgreSQL
docker compose up -d db

# 4. Configure environment
cp .env.example .env

# 5. Create the database schema
npx prisma migrate dev --name init

# 6. Add initial departments
npm run db:seed

# 7. Start the web app
npm run dev
```

Open http://localhost:3000.

If you don't use Docker, create a PostgreSQL database named `acnn_ops`, then update `DATABASE_URL` in `.env`.

## Inspect the database

```bash
npx prisma studio
```

Prisma Studio is useful for initial testing and for copying a department ID into the staff enrollment form. Do not expose Prisma Studio to the public internet.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET, POST | `/api/staff` | List / create staff |
| GET, POST | `/api/equipment` | List / create assets |
| GET, POST | `/api/schedule` | List / create broadcast items |
| GET, POST | `/api/requests` | List / submit office requests |
| POST | `/api/approvals` | Record an approval decision |
| GET, POST | `/api/finance` | List / create finance entries |
| GET, POST | `/api/jobs` | List / create marketing jobs and commission calculations |
| GET, POST | `/api/news` | List / create news service requests |
| GET, POST | `/api/programmes` | List / create programmes |
| GET | `/api/health` | Health and database status |

The API routes are not yet protected by authentication and should only be used in a local trusted development environment until authorization is implemented.

## Net commission policy

The included helper uses:

`netProfit = collectedRevenue - approvedDirectCosts`

`commission = max(0, netProfit) × commissionRate / 100`

The default rate is 10%. Confirm the exact ACNN TV policy for eligible deductions, collected versus invoiced revenue, taxes, refunds, cancellations and commission payment timing before relying on it.

## Module coverage

| Module | Current status |
|---|---|
| Staff enrollment | Basic UI + API |
| Staff ID card / QR | Data model foundation; print / QR workflow not implemented |
| Equipment inventory | Basic UI + API |
| Outdoor equipment selection / checkout | Schema foundation; reservation workflow not implemented |
| Sponsorship checklist | Basic programme readiness view |
| Airtime and broadcast schedule | Basic UI + API with overlap check |
| Income and expenses | Basic UI + API; not double-entry accounting |
| Studio programme register | Basic UI + API |
| Guest register | Schema included; UI/API not implemented |
| Quarterly staff KPI | Schema included; review UI not implemented |
| Office request and approval | Request UI/API and approval endpoint; role enforcement not implemented |
| Staff roster | Schema included; UI/API not implemented |
| Departmental report | Schema included; submission UI/API not implemented |
| Vehicle / equipment maintenance | Schema included; workflow UI/API not implemented |
| Marketing job / 10% net commission | Basic UI + API |
| News service request | Basic UI + API |
| Audit | Basic audit records for selected actions; needs broader coverage and authenticated actors |
| Authentication / permissions | Not implemented; required before production |

## Recommended next build steps

1. Add an authentication provider (for example, Auth.js or a managed identity service) and enforce server-side permissions.
2. Build the missing roster, KPI, reports, guest, equipment checkout and maintenance forms and APIs.
3. Add approval policies with amount thresholds, delegation, rejection comments and separation of duties.
4. Add automated tests for date overlap, commission edge cases, permissions and status transitions.
5. Add notifications, secure document uploads, export tools and production monitoring.
6. Validate workflows with station staff before importing any live data.
