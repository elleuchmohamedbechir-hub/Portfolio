# 🚀 Portfolio Backend - Spring Boot REST API

Backend REST API pour le portfolio personnel, construit avec Spring Boot 3.2.2 et Java 17.

## 📋 Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [API Documentation](#api-documentation)
- [Structure du Projet](#structure-du-projet)
- [Données par Défaut](#données-par-défaut)

## ✨ Fonctionnalités

- ✅ API REST complète pour gestion de portfolio
- ✅ Authentification JWT
- ✅ CRUD pour tous les modules (Projects, Skills, Experience, Education, etc.)
- ✅ Gestion des messages de contact
- ✅ Dashboard admin avec statistiques
- ✅ Validation des données
- ✅ Gestion d'erreurs globale
- ✅ Documentation Swagger/OpenAPI
- ✅ Logging avec SLF4J
- ✅ Profils de configuration (dev/prod)
- ✅ DataLoader avec données de démonstration

## 🛠️ Technologies

- **Java**: 17
- **Spring Boot**: 3.2.2
- **Spring Security**: JWT Authentication
- **Spring Data JPA**: ORM
- **MySQL**: Base de données
- **Lombok**: Réduction du boilerplate
- **Swagger/OpenAPI**: Documentation API
- **Maven**: Gestion des dépendances

## 📦 Prérequis

- Java 17 ou supérieur
- Maven 3.6+
- MySQL 8.0+
- Git

## 🔧 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/yourusername/portfolio-backend.git
cd portfolio-backend
```

### 2. Créer la base de données

```sql
CREATE DATABASE portfolio_db;
```

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` vers `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

Éditer `.env` avec vos valeurs :

```env
DATABASE_URL=jdbc:mysql://localhost:3306/portfolio_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
JWT_SECRET=your-secret-key
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### 4. Installer les dépendances

```bash
mvn clean install
```

## ⚙️ Configuration

### Profils disponibles

- **dev**: Développement (par défaut)
- **prod**: Production

### Activer un profil

**Option 1**: Via variable d'environnement
```bash
export SPRING_PROFILES_ACTIVE=dev
```

**Option 2**: Via application.yml
```yaml
spring:
  profiles:
    active: dev
```

**Option 3**: Via ligne de commande
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🚀 Lancement

### Mode Développement

```bash
mvn spring-boot:run
```

### Mode Production

```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

L'application démarre sur `http://localhost:8080`

## 📚 API Documentation

### Swagger UI

Une fois l'application lancée, accéder à la documentation interactive :

```
http://localhost:8080/swagger-ui.html
```

### Endpoints Principaux

#### Public Endpoints

- `GET /api/about` - Informations personnelles
- `GET /api/projects` - Liste des projets
- `GET /api/skills` - Liste des compétences
- `GET /api/experiences` - Expériences professionnelles
- `GET /api/education` - Formations
- `GET /api/languages` - Langues
- `GET /api/interests` - Centres d'intérêt
- `POST /api/contact` - Envoyer un message

#### Admin Endpoints (Authentification requise)

- `GET /api/v1/admin/dashboard/stats` - Statistiques
- `GET|PUT /api/v1/admin/about` - Gérer About
- `GET|POST|PUT|DELETE /api/v1/admin/projects` - Gérer Projects
- `GET|POST|PUT|DELETE /api/v1/admin/skills` - Gérer Skills
- `GET|POST|PUT|DELETE /api/v1/admin/experiences` - Gérer Experiences
- `GET|POST|PUT|DELETE /api/v1/admin/education` - Gérer Education
- `GET|POST|PUT|DELETE /api/v1/admin/languages` - Gérer Languages
- `GET|POST|PUT|DELETE /api/v1/admin/interests` - Gérer Interests
- `GET|PUT|DELETE /api/v1/admin/messages` - Gérer Messages

#### Authentication

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription (si activé)

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/portfolio/backend/
│   │   │   ├── config/          # Configuration (Security, CORS, DataLoader)
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── entity/          # JPA Entities
│   │   │   ├── exception/       # Custom Exceptions
│   │   │   ├── mapper/          # Entity-DTO Mappers
│   │   │   ├── repository/      # JPA Repositories
│   │   │   ├── security/        # JWT, UserDetails
│   │   │   └── service/         # Business Logic
│   │   └── resources/
│   │       ├── application.yml           # Configuration principale
│   │       ├── application-dev.yml       # Configuration dev
│   │       └── application-prod.yml      # Configuration prod
│   └── test/                    # Tests unitaires et d'intégration
├── .env.example                 # Template variables d'environnement
├── .gitignore
├── pom.xml                      # Maven dependencies
└── README.md
```

## 🎯 Données par Défaut

Au premier démarrage, l'application crée automatiquement :

### Utilisateur Admin

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@portfolio.com`

⚠️ **IMPORTANT**: Changez ce mot de passe en production !

### Données de Démonstration

- Section About complète
- 13 compétences (Java, Spring Boot, React, etc.)
- 4 projets
- 3 expériences professionnelles
- 2 formations
- 3 langues
- 4 centres d'intérêt

## 🔐 Sécurité

### JWT Token

Après connexion, vous recevez un JWT token :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "admin",
  "email": "admin@portfolio.com"
}
```

Utilisez ce token dans les requêtes admin :

```
Authorization: Bearer <token>
```

### CORS

CORS est configuré pour accepter les requêtes depuis :
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (Create React App)

Modifiez dans `SecurityConfig.java` pour d'autres origines.

## 📊 Monitoring

### Actuator Endpoints

- `GET /actuator/health` - État de l'application
- `GET /actuator/info` - Informations de l'application
- `GET /actuator/metrics` - Métriques (dev uniquement)

## 🧪 Tests

```bash
# Lancer tous les tests
mvn test

# Lancer les tests avec couverture
mvn test jacoco:report
```

## 🐛 Debugging

### Logs

Les logs sont disponibles dans :
- Console (développement)
- `logs/portfolio-backend.log` (fichier)

### Niveaux de log

- **dev**: DEBUG
- **prod**: WARN/INFO

## 📝 License

MIT License - voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

**Mohamed Bechir Elleuch**
- Email: elleuchmohamedbechir@gmail.com
- GitHub: [@elleuchmohamedbechir](https://github.com/elleuchmohamedbechir)
- LinkedIn: [Mohamed Bechir Elleuch](https://linkedin.com/in/mohamed-bechir-elleuch)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

---

**Fait avec ❤️ et Spring Boot**
