# 🚀 Deployment Guide

This document provides comprehensive deployment instructions for the Portfolio application.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Local Deployment](#local-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Cloud Deployment](#cloud-deployment)
6. [Production Checklist](#production-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Git**: Version control
- **Java JDK**: 17 or higher
- **Node.js**: 18 or higher
- **MySQL**: 8.0 or higher
- **Maven**: 3.8 or higher (for backend)
- **Docker & Docker Compose**: (Optional, for containerized deployment)

### Recommended Tools
- **Postman**: API testing
- **MySQL Workbench**: Database management
- **VS Code**: Code editing

---

## Environment Setup

### 1. Backend Environment Variables

Create `backend/.env` file:

```bash
# Database
DATABASE_URL=jdbc:mysql://localhost:3306/portfolio_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_secure_password

# JWT (Generate with: openssl rand -base64 64)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits-change-in-production

# Email (Optional)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password

# Application
CONTACT_EMAIL=elleuchmohamedbechir@gmail.com
SPRING_PROFILES_ACTIVE=prod

# CORS (comma-separated)
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### 2. Frontend Environment Variables

Create `frontend/.env` file:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-backend-domain.com/api

# Application
VITE_APP_NAME=Portfolio
VITE_APP_VERSION=1.0.0
```

---

## Local Deployment

### Backend

```bash
# Navigate to backend
cd backend

# Build the project
mvn clean install

# Run with production profile
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

**Verify**: http://localhost:8080/api/v1/about

### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

**Verify**: http://localhost:4173

---

## Docker Deployment

### Option 1: Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Access**:
- Frontend: http://localhost
- Backend: http://localhost:8080
- MySQL: localhost:3306

### Option 2: Individual Containers

#### Backend
```bash
cd backend
docker build -t portfolio-backend .
docker run -d \
  --name portfolio-backend \
  -p 8080:8080 \
  --env-file .env \
  portfolio-backend
```

#### Frontend
```bash
cd frontend
docker build -t portfolio-frontend .
docker run -d \
  --name portfolio-frontend \
  -p 80:80 \
  portfolio-frontend
```

---

## Cloud Deployment

### 🌐 Heroku

#### Backend Deployment

1. **Create Heroku App**:
```bash
heroku create portfolio-backend-prod
```

2. **Add MySQL Add-on**:
```bash
heroku addons:create jawsdb:kitefin
```

3. **Set Environment Variables**:
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set MAIL_USERNAME=your-email@gmail.com
heroku config:set MAIL_PASSWORD=your-app-password
```

4. **Deploy**:
```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment (Netlify)

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build and Deploy**:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

3. **Configure Environment Variables** in Netlify Dashboard:
   - `VITE_API_BASE_URL`: Your Heroku backend URL

---

### ☁️ AWS Deployment

#### Backend (Elastic Beanstalk)

1. **Create JAR**:
```bash
cd backend
mvn clean package -DskipTests
```

2. **Create Elastic Beanstalk Application**:
```bash
eb init -p java-17 portfolio-backend
eb create portfolio-backend-env
```

3. **Set Environment Variables**:
```bash
eb setenv DATABASE_URL=jdbc:mysql://your-rds-endpoint:3306/portfolio_db \
  DATABASE_USERNAME=admin \
  DATABASE_PASSWORD=your-password \
  JWT_SECRET=your-secret \
  SPRING_PROFILES_ACTIVE=prod
```

4. **Deploy**:
```bash
eb deploy
```

#### Frontend (S3 + CloudFront)

1. **Build**:
```bash
cd frontend
npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Invalidate CloudFront Cache**:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### 🔵 Azure Deployment

#### Backend (App Service)

1. **Create Resource Group**:
```bash
az group create --name portfolio-rg --location eastus
```

2. **Create App Service Plan**:
```bash
az appservice plan create --name portfolio-plan --resource-group portfolio-rg --sku B1 --is-linux
```

3. **Create Web App**:
```bash
az webapp create --resource-group portfolio-rg --plan portfolio-plan --name portfolio-backend --runtime "JAVA:17-java17"
```

4. **Deploy JAR**:
```bash
az webapp deploy --resource-group portfolio-rg --name portfolio-backend --src-path backend/target/backend-1.0.0-SNAPSHOT.jar
```

#### Frontend (Static Web Apps)

```bash
cd frontend
npm run build
az staticwebapp create --name portfolio-frontend --resource-group portfolio-rg --source dist --location eastus
```

---

### 🟢 Google Cloud Platform

#### Backend (Cloud Run)

1. **Build Docker Image**:
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/portfolio-backend
```

2. **Deploy to Cloud Run**:
```bash
gcloud run deploy portfolio-backend \
  --image gcr.io/YOUR_PROJECT_ID/portfolio-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=jdbc:mysql://...,JWT_SECRET=...
```

#### Frontend (Firebase Hosting)

```bash
cd frontend
npm run build
firebase init hosting
firebase deploy
```

---

## Production Checklist

### Security

- [ ] Change default admin password
- [ ] Use strong JWT secret (minimum 256 bits)
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL connection
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable security headers

### Performance

- [ ] Enable Gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up database connection pooling
- [ ] Enable HTTP/2
- [ ] Optimize images
- [ ] Enable browser caching
- [ ] Minify CSS/JS (done by Vite)

### Monitoring

- [ ] Set up application logging
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Enable health checks
- [ ] Set up uptime monitoring
- [ ] Configure database backups
- [ ] Set up alerts for critical errors

### Database

- [ ] Create production database
- [ ] Run database migrations
- [ ] Set up automated backups
- [ ] Configure read replicas (if needed)
- [ ] Optimize indexes
- [ ] Set up monitoring

---

## Troubleshooting

### Backend Issues

#### Application won't start
```bash
# Check logs
docker logs portfolio-backend

# Verify environment variables
docker exec portfolio-backend env | grep DATABASE

# Check database connection
docker exec -it portfolio-mysql mysql -u root -p
```

#### Database connection errors
- Verify MySQL is running
- Check DATABASE_URL format
- Ensure database exists
- Verify credentials

### Frontend Issues

#### API calls failing
- Check VITE_API_BASE_URL
- Verify CORS configuration
- Check backend is running
- Inspect browser console

#### Build errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Docker Issues

#### Container won't start
```bash
# Check container logs
docker logs <container-name>

# Inspect container
docker inspect <container-name>

# Restart container
docker restart <container-name>
```

#### Port conflicts
```bash
# Check what's using the port
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Mac/Linux

# Kill the process or change port in docker-compose.yml
```

---

## Support

For additional help:

1. Check the [main README](README.md)
2. Review [GitHub Issues](https://github.com/elleuchmohamedbechir/Express-Pastry-Shop/issues)
3. Contact: elleuchmohamedbechir@gmail.com

---

**Last Updated**: February 2026  
**Version**: 1.0.0
