# ⚡ Quick Start Guide

Get your portfolio up and running in **5 minutes**!

---

## 🚀 Prerequisites

- ✅ Java 17+
- ✅ Node.js 18+
- ✅ MySQL 8.0+
- ✅ Git

---

## 📦 Installation

### 1. Clone & Navigate

```bash
git clone https://github.com/elleuchmohamedbechir/Express-Pastry-Shop.git
cd Express-Pastry-Shop
```

### 2. Database Setup

```sql
CREATE DATABASE portfolio_db;
```

### 3. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
mvn clean install
mvn spring-boot:run
```

✅ Backend running on: **http://localhost:8080**

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on: **http://localhost:5173**

---

## 🔑 Default Admin Login

- **URL**: http://localhost:5173/admin/login
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Change this password immediately!**

---

## 🧪 Verify Installation

### Backend Health Check
```bash
curl http://localhost:8080/api/v1/about
```

### Frontend
Open: http://localhost:5173

---

## 📚 Next Steps

1. **Read the full [README.md](README.md)**
2. **Check [DEPLOYMENT.md](DEPLOYMENT.md)** for production deployment
3. **Review [CONTRIBUTING.md](CONTRIBUTING.md)** if you want to contribute

---

## 🆘 Troubleshooting

### Backend won't start?
- ✅ Check MySQL is running
- ✅ Verify database credentials in `.env`
- ✅ Ensure port 8080 is available

### Frontend won't start?
- ✅ Run `npm install` again
- ✅ Clear cache: `rm -rf node_modules dist && npm install`
- ✅ Ensure port 5173 is available

### Database connection error?
- ✅ Verify MySQL is running: `mysql -u root -p`
- ✅ Check DATABASE_URL in `.env`
- ✅ Ensure database exists: `SHOW DATABASES;`

---

## 📞 Need Help?

- 📧 Email: elleuchmohamedbechir@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/elleuchmohamedbechir/Express-Pastry-Shop/issues)

---

**Happy Coding! 🎉**
