# Mini CRM - TODO List

## ✅ Completed

- [x] Project Setup (folder structure, Git, env config)
- [x] Backend Express server with MongoDB
- [x] Lead model (name, email, source, status, notes)
- [x] Lead API endpoints (CRUD + notes)
- [x] JWT Authentication (register, login, protect)
- [x] React frontend with Vite
- [x] Login page with auth flow
- [x] Dashboard with stats & lead table
- [x] Leads view with status updates & notes
- [x] Analytics view with metrics & funnel
- [x] Settings view with profile & notifications
- [x] Add Lead modal (frontend → backend)
- [x] Database seeder with sample data

---

## 🔴 High Priority — Core Functionality

- [ ] Delete Lead
	- [ ] Add `DELETE /api/leads/:id` backend endpoint
	- [ ] Add delete button with confirmation modal in UI
- [ ] Edit Lead Details
	- [ ] Add `PUT /api/leads/:id` backend endpoint
	- [ ] Add edit modal pre-filled with lead data
- [ ] Settings Backend Integration
	- [ ] Wire password change to `PATCH /api/auth/password`
	- [ ] Wire profile update to `PATCH /api/auth/profile`
- [ ] Responsive Mobile Layout
	- [ ] Collapsible sidebar with hamburger toggle
	- [ ] Stack stats grid on small screens
	- [ ] Mobile-friendly table (card layout fallback)
- [ ] Toast Notifications
	- [ ] Show success/error toasts on lead actions
	- [ ] Replace all `console.error` with user-facing feedback

---

## 🟡 Medium Priority — Professional Polish

- [ ] Pagination
	- [ ] Add `?page=1&limit=20` to backend GET endpoint
	- [ ] Add page controls in frontend table
- [ ] Real-time Analytics
	- [ ] Calculate actual trends from date ranges (week-over-week)
	- [ ] Replace hardcoded `+12%` with real data
- [ ] Export to CSV
	- [ ] Add "Download CSV" button on Dashboard
	- [ ] Generate CSV from current filtered leads
- [ ] Lead Detail Page
	- [ ] Full-page view with complete lead history
	- [ ] Timeline of all status changes and notes
- [ ] Dark / Light Mode Toggle
	- [ ] Add theme context with CSS variable switching
	- [ ] Persist preference in localStorage
- [ ] Sort by Column
	- [ ] Clickable table headers (name, date, status, source)
	- [ ] Toggle ascending / descending

---

## 🟢 Bonus — Portfolio Standouts

- [ ] Email Notifications
	- [ ] Set up Nodemailer with Gmail
	- [ ] Send email alert when a new lead is created
- [ ] Role-Based Access (RBAC)
	- [ ] Add `role` field to User model (admin / viewer)
	- [ ] Restrict edit/delete actions to admin role
- [ ] Lead Assignment
	- [ ] Add `assignedTo` field on Lead model
	- [ ] UI to assign leads to team members
- [ ] Activity Timeline
	- [ ] Log every action (status change, note added) with timestamp
	- [ ] Display timeline on lead detail page
- [ ] Dashboard Charts (Recharts)
	- [ ] Line chart: leads over time
	- [ ] Bar chart: leads by source
	- [ ] Pie chart: status distribution
- [ ] Embeddable Contact Form Widget
	- [ ] Standalone HTML/JS snippet for external websites
	- [ ] Posts lead data to the CRM API
- [ ] CI/CD Deployment Pipeline
	- [ ] Auto-deploy from GitHub to Railway
	- [ ] Configure environment variables in production

---

*Last updated: 2026-04-26*
