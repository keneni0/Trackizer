                                             🧾 Trackizer – Subscription Tracker
Trackizer is a modern full-stack web app to manage and track your digital subscriptions. Get insights, manage renewals, and avoid surprise charges — all in a sleek, responsive dashboard.

<img width="1362" height="648" alt="image" src="https://github.com/user-attachments/assets/2c2176ea-e6dd-4bae-a01d-02f4653ed241" />
<img width="1353" height="630" alt="image" src="https://github.com/user-attachments/assets/19e6f312-7ccd-439d-9f03-66302864e455" />
<img width="1332" height="483" alt="image" src="https://github.com/user-attachments/assets/875752c4-61e0-4729-82af-d7732fb5d90a" />


🚀 Features

🔐 User Registration & Login (JWT Auth)

➕ Add / ✏️ Edit / ❌ Delete Subscriptions

📅 Track Renewal Dates, Prices & Categories

📊 Dashboard Analytics for Monthly Costs

🌗 Dark / Light Theme

📱 Responsive UI (Desktop & Mobile)

🛠️ Tech Stack
Layer	Tools
Frontend	React, Vite, TypeScript, Tailwind CSS
Backend	Node.js, Express, MongoDB, Mongoose
Auth	JWT, Secure Cookies
⚙️ Getting Started
1. Clone the Repository
git clone https://github.com/your-username/trackizer.git
cd trackizer

2. Install Dependencies
Backend: npm install
Frontend:
        cd frontend
        npm install

3. Environment Setup
Create a .env file in the project root with your variables (e.g. MongoDB URI, JWT secret, etc).

4. Run the App
Open two terminals:

Backend:
npm run dev

Frontend:
cd frontend
npm run dev

Frontend: http://localhost:3001
Backend API: http://localhost:3000/api/v1


🧩 Customization

Change theme or logo in /frontend/src/components/layout/Sidebar.tsx

Modify routes in /frontend/src/App.tsx

Extend data models in /models/
