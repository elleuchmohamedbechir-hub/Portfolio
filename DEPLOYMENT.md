# 🚀 Deployment Guide: Spring Boot + React

This guide outlines the steps to deploy your full-stack portfolio application using **Railway** (Backend) and **Vercel** (Frontend).

---

## 🔹 Part 1:   

### 1. Prerequisites
- Push your latest code to GitHub.
- Create an account on [Railway.app](https://railway.app/).

### 2. Create Project
1. Click **"New Project"** > **"Deploy from GitHub repo"**.
2. Select your repository.
3. Click "Add Variables" but **DO NOT deploy yet** (or let it fail first).

### 3. Add Database (MySQL)
1. In your project canvas, right-click (or click "New") -> **Database** -> **MySQL**.
2. Wait for it to initialize.
3. Click on the MySQL card -> **Variables**.
4. Copy the `MYSQL_URL` (or `DATABASE_URL`).

### 4. Configure Backend Service
1. Click on your Backend service card (the GitHub repo one).
2. Go to **Settings** > **Root Directory**: Set to `/backend`.
3. Go to **Variables** and add the following:

| Variable | Value | Description |
|----------|-------|-------------|
| `SPRING_PROFILES_ACTIVE` | `prod` | Activates `application-prod.yml` |
| `JWT_SECRET` | *(Generate a random secure string)* | For JWT Token signing |
| `DATABASE_URL` | `${MYSQL_URL}` | Reference the MySQL service URL |
| `DATABASE_USERNAME` | `${MYSQLUSER}` | Reference MySQL User |
| `DATABASE_PASSWORD` | `${MYSQLPASSWORD}` | Reference MySQL Password |
| `CORS_ALLOWED_ORIGINS` | `*` | **Temporary**. Allows all origins. Update after frontend deploy. |
| `PORT` | `8080` | Optional, Spring Boot defaults to 8080. Railway sets PORT automatically. |

> **Note:** Railway automatically injects `MYSQL_*` variables. Ensure your `application-prod.yml` maps them correctly. We configured it to use `DATABASE_URL`, `DATABASE_USERNAME`, etc. If Railway provides different names, use the "Reference" feature in Railway Variables to map them (e.g., set `DATABASE_PASSWORD` to reference `${MYSQLPASSWORD}`).

### 5. Deploy
- Railway should automatically build using the `Dockerfile` in `/backend`.
- Click **Deploy** if it hasn't started.
- Once active, go to **Settings** > **Networking** > **Generate Domain**.
- **Copy this URL** (e.g., `https://backend-production.up.railway.app`).

---

## 🔹 Part 2: Frontend Deployment (Vercel)

### 1. Prerequisites
- Create an account on [Vercel.com](https://vercel.com/).

### 2. Create Project
1. Click **"Add New..."** > **"Project"**.
2. Import your GitHub repository.

### 3. Configure Project
- **Framework Preset:** Vite
- **Root Directory:** Edit -> Select `frontend`.
- **Build Command:** `npm run build` (Default)
- **Output Directory:** `dist` (Default)

### 4. Environment Variables
Add the following variable:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-backend.up.railway.app` | The Railway URL from Part 1. **No trailing slash.** |

### 5. Deploy
- Click **Deploy**.
- Vercel will build and assign a domain (e.g., `https://your-portfolio.vercel.app`).
- **Copy this URL**.

---

## 🔹 Part 3: Final Security Configuration

Now that you have the Frontend URL, lock down the Backend.

1. Go back to **Railway**.
2. Select your Backend Service.
3. Go to **Variables**.
4. Update `CORS_ALLOWED_ORIGINS`:
   - Change `*` to your Vercel URL (e.g., `https://your-portfolio.vercel.app`).
   - If you have a custom domain, add that too (comma-separated).
5. Railway will automatically redeploy.

---

## 🔹 CI/CD & Automation

- **Automatic Deployment:** Both Railway and Vercel are connected to your GitHub repository. Pushing to the `main` branch will automatically trigger new builds and deployments for both specific services.
- **Resilience:** 
  - The Backend is configured to restart automatically on failure.
  - The Frontend (`vercel.json`) handles React Router 404s by redirecting to `index.html`.

## 🔹 Troubleshooting Checklist

- **Frontend 404 on Refresh:**
  - Verify `vercel.json` exists in `/frontend` and contains the rewrite rules.
- **Backend Connection Failed (Network Error):**
  - Check `VITE_API_URL` in Vercel. NOT `localhost`.
  - Check `CORS_ALLOWED_ORIGINS` in Railway matches the Vercel URL exactly (https vs http, trailing slash).
- **Database Errors:**
  - Check Railway logs. Ensure `ddl-auto` is `update` for the first run.
