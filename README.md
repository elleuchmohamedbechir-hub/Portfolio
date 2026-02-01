# 🚀 Modern Full-Stack Portfolio

[![CI/CD Pipeline](https://github.com/elleuchmohamedbechir/Express-Pastry-Shop/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/elleuchmohamedbechir/Express-Pastry-Shop/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)

A professional, production-ready personal portfolio website featuring a stunning React frontend with modern animations, a robust Spring Boot backend with JWT authentication, and a comprehensive admin dashboard for dynamic content management.

![Portfolio Preview](https://via.placeholder.com/1200x600/1a1a2e/eee?text=Portfolio+Preview)

---

## ✨ Key Features

### 🎨 **Public Portfolio**
- **Modern Design**: Glassmorphism effects, dark mode, and smooth animations using Framer Motion
- **Fully Responsive**: Optimized for all devices (Desktop, Tablet, Mobile)
- **Dynamic Content**: All sections dynamically fetched from backend API
  - 👤 About Me
  - 🛠️ Skills & Technologies
  - 💼 Projects Portfolio
  - 📊 Professional Experience
  - 🎓 Education
  - 🗣️ Languages
  - ❤️ Interests & Hobbies
- **Contact Form**: Functional contact form with database storage and email notifications
- **Internationalization (i18n)**: Multi-language support (English, French, Arabic)
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets

### 🔐 **Admin Dashboard**
- **Secure Authentication**: JWT-based authentication with role-based access control (RBAC)
- **Complete CRUD Operations**: Manage all portfolio content through intuitive UI
- **Dashboard Analytics**: View contact messages and portfolio statistics
- **Message Center**: View, manage, and respond to contact form submissions
- **Robust Error Handling**: User-friendly error messages and retry mechanisms

---

## 🏗️ Architecture

```
mon-portfolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
├── backend/                        # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/portfolio/backend/
│   │   │   │   ├── config/        # Security, CORS, Locale config
│   │   │   │   ├── controller/    # REST API Controllers
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── entity/        # JPA Entities
│   │   │   │   ├── exception/     # Global Exception Handling
│   │   │   │   ├── mapper/        # Entity-DTO Mappers
│   │   │   │   ├── repository/    # Data Access Layer
│   │   │   │   ├── security/      # JWT & Spring Security
│   │   │   │   ├── service/       # Business Logic
│   │   │   │   └── util/          # Utility Classes
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       └── application-prod.yml
│   │   └── test/                  # Unit & Integration Tests
│   ├── .env.example               # Environment variables template
│   └── pom.xml                    # Maven dependencies
├── frontend/                       # React + Vite Frontend
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── context/               # Global state (Auth)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── locales/               # i18n translations
│   │   ├── pages/                 # Public & Admin pages
│   │   ├── services/              # API integration (Axios)
│   │   ├── utils/                 # Utility functions
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── .env.example               # Environment variables template
│   ├── package.json               # NPM dependencies
│   └── vite.config.js             # Vite configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

---

## 🛠️ Technology Stack

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.2 | Application Framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data JPA | 3.x | Data Persistence |
| MySQL | 8.0+ | Relational Database |
| JWT | 0.11.5 | Token-based Authentication |
| Lombok | Latest | Boilerplate Code Reduction |
| Swagger/OpenAPI | 2.3.0 | API Documentation |
| Maven | 3.8+ | Build & Dependency Management |

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.2.4 | Build Tool & Dev Server |
| Tailwind CSS | 4.1.18 | Utility-first CSS Framework |
| Framer Motion | 12.29.2 | Animation Library |
| Axios | 1.13.3 | HTTP Client |
| React Router DOM | 7.13.0 | Client-side Routing |
| React Hook Form | 7.71.1 | Form Validation |
| i18next | 25.8.0 | Internationalization |
| Lucide React | 0.563.0 | Icon Library |
| React Hot Toast | 2.6.0 | Toast Notifications |

### **DevOps & Tools**
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, SonarCloud (optional)
- **Security Scanning**: Trivy
- **Containerization**: Docker (optional)

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Java JDK** 17+ ([Download](https://www.oracle.com/java/technologies/downloads/))
- **MySQL** 8.0+ ([Download](https://dev.mysql.com/downloads/))
- **Maven** 3.8+ (Usually bundled with Java)
- **Git** ([Download](https://git-scm.com/downloads))

---

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/elleuchmohamedbechir/Express-Pastry-Shop.git
cd Express-Pastry-Shop
```

---

### **2️⃣ Database Setup**

1. **Start MySQL Server** and create the database:

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Verify Connection**:
```bash
mysql -u root -p
# Enter your MySQL password
USE portfolio_db;
```

---

### **3️⃣ Backend Setup**

#### **Step 1: Configure Environment Variables**

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Edit `.env` and update the following:
```properties
# Database Configuration
DATABASE_URL=jdbc:mysql://localhost:3306/portfolio_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_mysql_password

# JWT Configuration (Generate a secure key)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits

# Email Configuration (Optional - for contact form)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password

# Contact Email
CONTACT_EMAIL=your-email@gmail.com

# Spring Profile
SPRING_PROFILES_ACTIVE=dev
```

#### **Step 2: Build and Run**

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on **`http://localhost:8080`**

#### **Default Admin Credentials** (Auto-created on first run):
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change the default admin password immediately after first login!

#### **Step 3: Verify Backend**

- **API Health Check**: http://localhost:8080/api/v1/about
- **Swagger UI**: http://localhost:8080/swagger-ui.html

---

### **4️⃣ Frontend Setup**

#### **Step 1: Install Dependencies**

```bash
cd frontend
npm install
```

#### **Step 2: Configure Environment Variables**

1. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Edit `.env` (default values work for local development):
```properties
VITE_API_BASE_URL=/api
VITE_APP_NAME=Portfolio
VITE_APP_VERSION=1.0.0
```

#### **Step 3: Run Development Server**

```bash
npm run dev
```

The frontend will start on **`http://localhost:5173`**

#### **Step 4: Build for Production**

```bash
npm run build
```

Production files will be generated in the `dist/` directory.

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

### **Public API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/about` | Get about information |
| GET | `/api/v1/skills` | Get all skills |
| GET | `/api/v1/projects` | Get all projects |
| GET | `/api/v1/experiences` | Get work experience |
| GET | `/api/v1/education` | Get education history |
| GET | `/api/v1/languages` | Get languages |
| GET | `/api/v1/interests` | Get interests |
| POST | `/api/v1/contact` | Submit contact message |

### **Admin API Endpoints** (Requires JWT Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Admin login |
| GET | `/api/v1/admin/dashboard` | Get dashboard stats |
| GET/POST/PUT/DELETE | `/api/v1/admin/projects` | Manage projects |
| GET/POST/PUT/DELETE | `/api/v1/admin/skills` | Manage skills |
| GET/POST/PUT/DELETE | `/api/v1/admin/experiences` | Manage experiences |
| GET/POST/PUT/DELETE | `/api/v1/admin/education` | Manage education |
| GET/POST/PUT/DELETE | `/api/v1/admin/languages` | Manage languages |
| GET/POST/PUT/DELETE | `/api/v1/admin/interests` | Manage interests |
| GET | `/api/v1/admin/messages` | Get contact messages |

---

## 🔒 Security Features

- ✅ **JWT Authentication**: Stateless, token-based authentication
- ✅ **Password Hashing**: BCrypt encryption for secure password storage
- ✅ **CORS Configuration**: Configurable allowed origins via environment variables
- ✅ **Input Validation**: Backend `@Valid` annotations and frontend form validation
- ✅ **Global Exception Handling**: Centralized error handling with consistent API responses
- ✅ **SQL Injection Prevention**: JPA/Hibernate parameterized queries
- ✅ **XSS Protection**: React's built-in XSS protection
- ✅ **HTTPS Ready**: Production configuration supports SSL/TLS
- ✅ **Environment Variables**: Sensitive data stored in environment variables

---

## 🚢 Deployment

### **Backend Deployment Options**

#### **Option 1: Deploy as JAR**

```bash
cd backend
mvn clean package -DskipTests
java -jar target/backend-1.0.0-SNAPSHOT.jar
```

#### **Option 2: Docker Deployment**

Create `backend/Dockerfile`:

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t portfolio-backend .
docker run -p 8080:8080 --env-file .env portfolio-backend
```

#### **Option 3: Cloud Platforms**

- **Heroku**: Use `Procfile` with `web: java -jar target/backend-1.0.0-SNAPSHOT.jar`
- **AWS Elastic Beanstalk**: Upload JAR file
- **Google Cloud Run**: Deploy Docker container
- **Azure App Service**: Deploy JAR or Docker container

---

### **Frontend Deployment Options**

#### **Option 1: GitHub Pages**

1. Update `vite.config.js` with base path:
```javascript
export default defineConfig({
  base: '/Express-Pastry-Shop/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

#### **Option 2: Netlify**

1. Build the project:
```bash
npm run build
```

2. Deploy via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect your GitHub repository to Netlify for automatic deployments.

#### **Option 3: Vercel**

```bash
npm install -g vercel
vercel --prod
```

#### **Option 4: Traditional Web Server (Nginx/Apache)**

1. Build the project:
```bash
npm run build
```

2. Copy `dist/` contents to your web server's document root.

3. Configure reverse proxy for API requests (Nginx example):
```nginx
location /api {
    proxy_pass http://your-backend-url:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

---

## 🧪 Testing

### **Backend Tests**

```bash
cd backend
mvn test
```

### **Frontend Tests** (if configured)

```bash
cd frontend
npm test
```

### **Run Linter**

```bash
cd frontend
npm run lint
```

---

## 🔧 Environment Variables Reference

### **Backend (.env)**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | MySQL connection URL |
| `DATABASE_USERNAME` | Yes | `root` | Database username |
| `DATABASE_PASSWORD` | Yes | - | Database password |
| `JWT_SECRET` | Yes | - | JWT signing secret (min 256 bits) |
| `MAIL_USERNAME` | No | - | SMTP email username |
| `MAIL_PASSWORD` | No | - | SMTP email password |
| `CONTACT_EMAIL` | No | - | Contact form recipient email |
| `SPRING_PROFILES_ACTIVE` | No | `dev` | Active Spring profile (`dev`/`prod`) |
| `CORS_ALLOWED_ORIGINS` | No | `localhost:5173` | Comma-separated allowed origins |

### **Frontend (.env)**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | No | `/api` | Backend API base URL |
| `VITE_APP_NAME` | No | `Portfolio` | Application name |
| `VITE_APP_VERSION` | No | `1.0.0` | Application version |

---

## 📖 Project Scripts

### **Backend**

```bash
mvn clean install      # Build project
mvn spring-boot:run    # Run development server
mvn test               # Run tests
mvn package            # Create JAR file
```

### **Frontend**

```bash
npm install            # Install dependencies
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### **Code Style Guidelines**

- **Backend**: Follow Java naming conventions and Spring Boot best practices
- **Frontend**: Use ESLint configuration provided in the project
- **Commits**: Use conventional commit messages (e.g., `feat:`, `fix:`, `docs:`)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Mohamed Bechir Elleuch**  
*Full Stack Developer*

- 🌐 **Portfolio**: [Coming Soon]
- 💼 **LinkedIn**: [linkedin.com/in/mohamed-bechir-elleuch](https://linkedin.com/in/mohamed-bechir-elleuch)
- 🐙 **GitHub**: [github.com/elleuchmohamedbechir](https://github.com/elleuchmohamedbechir)
- 📧 **Email**: elleuchmohamedbechir@gmail.com

---

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon library

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/elleuchmohamedbechir/Express-Pastry-Shop/issues) page
2. Create a new issue with detailed information
3. Contact me via email: elleuchmohamedbechir@gmail.com

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Mohamed Bechir Elleuch](https://github.com/elleuchmohamedbechir)

</div>
