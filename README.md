                                             🧾 Trackizer – Subscription Tracker
Trackizer is a full‑stack web app for keeping all your digital subscriptions in one clean, opinionated dashboard.  
It helps you see where your money goes each month, avoid surprise renewals, and stay on top of every recurring payment.

<img width="1288" height="620" alt="image" src="https://github.com/user-attachments/assets/7912f872-a2ef-4b4f-9efd-d9e6812985ba" />
<img width="1353" height="630" alt="image" src="https://github.com/user-attachments/assets/19e6f312-7ccd-439d-9f03-66302864e455" />
<img width="1332" height="483" alt="image" src="https://github.com/user-attachments/assets/875752c4-61e0-4729-82af-d7732fb5d90a" />

## Features

- **Secure authentication**
  - Email/password registration and login
  - Passwords hashed before storage
  - JWT‑based auth with secure cookies and middleware‑protected routes
  - Blacklist support for invalidated tokens (sign‑out / logout safety)

- **Subscription management (CRUD)**
  - Create subscriptions with name, price, currency, frequency, category, payment method, and status
  - Inline editing from the subscriptions table
  - Soft workflow for cancelling vs deleting, so you can keep history when needed

- **Renewal dates & smart status**
  - Store both start date and next renewal date
  - Automatic computation of renewal date based on frequency (daily / weekly / monthly / yearly)
  - Auto‑update of status to `expired` when the renewal date has passed
  - Upcoming renewals view so you can see what’s about to be charged

- **Analytics & dashboard**
  - At‑a‑glance overview of all active subscriptions
  - Total monthly spending across all services
  - Breakdown by category (entertainment, food, shopping, other)
  - Highlight cards and lists designed for quick scanning

- **Multi‑currency pricing (including BIRR)**
  - Store subscription prices as numbers plus a currency code
  - Supported currencies include `USD`, `EUR`, `GBP`, `INR`, and `BIRR`
  - All screens show currency + amount together for clarity

- **Cancellation & blacklist workflow**
  - Cancel subscriptions without fully deleting them
  - Token blacklist model to ensure logged‑out sessions can’t be reused
  - Middleware that checks for blacklisted tokens on protected routes

- **Email & workflow hooks**
  - Email sending utility for notifications (e.g. reminders / workflow events)
  - Workflow routes wired for background processes and future automation

- **Dark / light theme**
  - Tailwind‑powered design with both light and dark modes
  - Colors tuned for readability on dashboards and data‑heavy screens

- **Responsive UI**
  - Built with mobile‑first layouts
  - Works cleanly on phones, tablets, and desktops

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose models
- **Auth & security**:
  - JWT + secure cookies
  - Token blacklist model
  - Arcjet middleware for bot / abuse protection
- **Scheduling & email**:
  - `node-cron` for scheduled jobs (e.g. reminders)
  - Nodemailer‑based email utility

## Architecture

- Monorepo layout:
  - `frontend/` – React + Vite SPA for the dashboard experience
  - backend files at the repo root – Express app, routes, models, and utilities
- API:
  - Versioned routes under `/api/v1/*` (e.g. `/api/v1/auth`, `/api/v1/subscriptions`)
  - Unversioned aliases (`/auth`, `/subscriptions`, etc.) for flexibility in clients
- Core domain models:
  - `User` – account and auth information
  - `Subscription` – recurring payment definition and status
  - `Blacklist` – invalidated JWTs for logout and session revocation
