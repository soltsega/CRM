# Premium Mini CRM

A high-performance Client Lead Management System (Mini CRM) designed for agencies, freelancers, and startups to track and convert leads efficiently.

![CRM Dashboard](file:///C:/Users/My%20Device/.gemini/antigravity/brain/3815c988-48b2-4160-94d1-66380513b422/crm_dashboard_leads_1777182679474.png)

## ✨ Features

- **Lead Capture & Storage:** Robust API to receive leads from any website form.
- **Dynamic Dashboard:** Real-time metrics and lead status tracking (New, Contacted, Converted).
- **Secure Admin Access:** JWT-protected dashboard with password hashing.
- **Follow-Up Notes:** Add detailed interaction history for every lead.
- **Premium Design:** Modern, sleek interface with glassmorphism and smooth animations.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Framer Motion, Lucide React, Axios.
- **Backend:** Node.js, Express, JSON Web Tokens (JWT), BcryptJS.
- **Database:** MongoDB (via Mongoose).

## 🚀 Quick Start

### 1. Prerequisites
- MongoDB installed and running locally.
- Node.js installed.

### 2. Backend Setup
```bash
cd backend
npm install
node seeder.js # Creates default admin (admin/password123) and sample leads
npm run start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Default Credentials
- **Username:** `admin`
- **Password:** `password123`

---
Built by Antigravity 🚀
