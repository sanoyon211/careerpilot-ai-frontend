# 🚀 CareerPilot AI 

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</div>

<br />

**CareerPilot AI** is a next-generation, AI-powered full-stack career platform and job portal. It bridges the gap between job seekers and recruiters by integrating advanced Artificial Intelligence to streamline resume analysis, job matching, career roadmapping, and the recruitment process.

---

## ✨ Key Features

### 🤖 AI-Powered Capabilities
- **📄 AI Resume Analyzer & Builder:** Analyzes resumes, calculates ATS (Applicant Tracking System) compatibility scores, identifies weaknesses, and provides AI-driven recommendations.
- **🎯 AI Agentic Job Search:** Understands user intent and skill context to provide highly personalized job matches using advanced AI prompts.
- **🛣️ AI Career Roadmap:** Generates step-by-step learning and growth roadmaps tailored to the user's career goals.
- **💬 Real-Time AI Chat Assistant:** A built-in AI chatbot (powered by Google Gemini & Groq AI) to guide candidates in interview preparation and career advice.
- **✍️ AI Cover Letter Generator:** Instantly drafts tailored cover letters based on the job description and user profile.

### 💼 For Job Seekers
- **🔍 Advanced Job Search & Filters:** Search jobs by category, location, salary, and work mode.
- **📌 Job Tracking:** Save favorite jobs and track live application statuses.
- **👤 Profile Management:** Keep personal information, experience, and skillsets up-to-date.

### 🏢 For Recruiters
- **➕ Job Management:** Easily post new job openings and manage active circulars.
- **📊 Analytics Dashboard:** Visualize applicant statistics and job views using interactive charts (Recharts).
- **💬 Live Messaging:** Chat with candidates in real-time utilizing Socket.io.

---

## 🛠️ Tech Stack

### **Frontend** (`careerpilot-ai-frontend`)
- **Framework:** Next.js 15 (App Router, Turbopack) & React 19
- **State Management:** Redux Toolkit, RTK Query
- **Styling & UI:** Tailwind CSS v4, Framer Motion, Lucide React Icons
- **Forms & Validation:** React Hook Form, Zod
- **Realtime & Auth:** Socket.io-client, Firebase Auth
- **Visuals & Feedback:** Recharts, Sonner (Toast notifications)

### **Backend** (`careerpilot-ai-backend`)
- **Runtime & Framework:** Node.js, Express.js v5 (TypeScript)
- **Database:** MongoDB & Mongoose ORM
- **AI Integration:** `@google/genai` (Google Gemini API), `groq-sdk`
- **Realtime Communication:** Socket.io
- **Security & Auth:** JWT (JSON Web Tokens), Bcrypt, Cookie-parser
- **File Upload:** Multer, Cloudinary

---

## 🚀 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Deployed on [Render](https://render.com/)

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

### Backend (`careerpilot-ai-backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI="your_mongodb_connection_string"
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_ACCESS_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="365d"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
GEMINI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
CLIENT_URL="http://localhost:3000" # Update to Vercel domain in production
```

### Frontend (`careerpilot-ai-frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:5000" # Update to Render domain in production
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
```

---

## ⚡ Running the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/career-pilot-ai.git
cd career-pilot-ai
```

### 2️⃣ Backend Setup
```bash
cd careerpilot-ai-backend
npm install
npm run dev
```
*The backend will start running on `http://localhost:5000`.*

### 3️⃣ Frontend Setup
Open a new terminal window:
```bash
cd careerpilot-ai-frontend
npm install
npm run dev
```
*The frontend will start running on `http://localhost:3000`.*

---

## 📁 Directory Structure

```text
career-pilot-ai/
├── careerpilot-ai-frontend/       # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/                   # App Router Pages (auth, dashboard, public)
│   │   ├── components/            # Reusable UI & Layout Components
│   │   ├── redux/                 # Redux Toolkit Slices & RTK Query APIs
│   │   └── services/              # API and Service logic
│   └── package.json
│
├── careerpilot-ai-backend/        # Node.js Express Backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/           # Modular Architecture (ai, job, user, etc.)
│   │   │   ├── middlewares/       # Auth & Validation Middlewares
│   │   │   ├── routes/            # Central Application Routes
│   │   │   └── utils/             # Helper utilities
│   │   ├── app.ts                 # Express App Configuration
│   │   ├── server.ts              # Server bootstrap & DB Connection
│   │   └── socket.ts              # Socket.io Server Setup
│   └── package.json
└── README.md
```

---

<div align="center">
  <sub>Built with ❤️ by an amazing developer. Empowering careers through Artificial Intelligence.</sub>
</div>
