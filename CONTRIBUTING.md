# Contributing to Portfolio Project

Thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, versions)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case and benefits**
- **Possible implementation approach**

### 🔧 Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit with conventional commits
6. Push to your fork
7. Open a Pull Request

---

## Development Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### Setup Steps

1. **Clone the repository**:
```bash
git clone https://github.com/elleuchmohamedbechir/Express-Pastry-Shop.git
cd Express-Pastry-Shop
```

2. **Backend setup**:
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
mvn clean install
mvn spring-boot:run
```

3. **Frontend setup**:
```bash
cd frontend
npm install
npm run dev
```

---

## Coding Standards

### Backend (Java/Spring Boot)

- Follow **Java naming conventions**
- Use **Spring Boot best practices**
- Write **meaningful variable names**
- Add **JavaDoc** for public methods
- Keep methods **small and focused**
- Use **Lombok** to reduce boilerplate
- Follow **SOLID principles**

**Example**:
```java
/**
 * Retrieves all active projects from the database.
 * 
 * @return List of ProjectDTO objects
 */
@GetMapping
public ResponseEntity<List<ProjectDTO>> getAllProjects() {
    List<ProjectDTO> projects = projectService.getAllProjects();
    return ResponseEntity.ok(projects);
}
```

### Frontend (React/JavaScript)

- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful component names** (PascalCase)
- Keep components **small and reusable**
- Use **PropTypes** or TypeScript for type checking
- Follow **ESLint** configuration
- Use **CSS modules** or **Tailwind** for styling

**Example**:
```javascript
/**
 * ProjectCard component displays a single project
 * @param {Object} project - Project data object
 */
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
};
```

### General Guidelines

- **DRY** (Don't Repeat Yourself)
- **KISS** (Keep It Simple, Stupid)
- **YAGNI** (You Aren't Gonna Need It)
- Write **self-documenting code**
- Add **comments** for complex logic only
- **Test your code** before committing

---

## Commit Guidelines

We follow **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(backend): add project filtering by technology
fix(frontend): resolve navbar mobile menu toggle issue
docs(readme): update installation instructions
style(backend): format code according to Google Java Style
refactor(frontend): extract reusable Button component
perf(backend): optimize database queries with indexes
test(backend): add unit tests for ProjectService
chore(deps): update Spring Boot to 3.2.3
ci(github): add automated deployment workflow
```

### Scope

- `backend`: Backend changes
- `frontend`: Frontend changes
- `docs`: Documentation
- `deps`: Dependencies
- `config`: Configuration files

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Run tests** and ensure they pass
3. **Run linter** and fix issues
4. **Update CHANGELOG.md** (if applicable)
5. **Ensure no merge conflicts**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. At least **one approval** required
2. All **CI checks must pass**
3. No **merge conflicts**
4. **Code review feedback** addressed

---

## Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `docs/documentation-update` - Documentation
- `refactor/code-improvement` - Code refactoring

---

## Questions?

Feel free to:
- Open an issue for discussion
- Contact: elleuchmohamedbechir@gmail.com

---

**Thank you for contributing!** 🙏
