# Frontend API Communication Fix - Summary

## Overview
This document summarizes all changes made to fix the frontend API communication issues.

## 1. Centralized Axios Instance (`src/services/api.js`)

### Key Features:
- **Base URL Configuration**: Automatically uses `/api` for development (proxied by Vite) 
- **Request Timeout**: 10 second timeout to prevent hanging requests
- **JWT Token Handling**: Automatically adds Authorization header if token exists
- **Response Interceptor**: Handles common HTTP errors (401, 403, 500, etc.)
- **User-Friendly Error Messages**: Provides readable error messages for each status code
- **401 Handling**: Clears auth state and redirects to login (only for admin pages)
- **Debug Logging**: Logs API requests/responses in development mode

### Usage:
```javascript
import api from './services/api';

// Making API calls
const response = await api.get('/v1/admin/experiences');
```

## 2. Vite Proxy Configuration (`vite.config.js`)

### Configuration:
- All `/api/*` requests are proxied to `http://localhost:8080`
- WebSocket support enabled
- 30 second timeout for long-running requests
- Detailed logging for debugging proxy issues

### How It Works:
```
Frontend Request: GET /api/v1/admin/experiences
     ↓ (Vite Proxy)
Backend Request: GET http://localhost:8080/api/v1/admin/experiences
```

## 3. Service Files Structure

Each entity now has its own service file for better organization:

| Service File | Purpose |
|-------------|---------|
| `auth.service.js` | Authentication (login, logout, token validation) |
| `dashboard.service.js` | Dashboard statistics |
| `experience.service.js` | Experience CRUD operations |
| `education.service.js` | Education CRUD operations |
| `skills.service.js` | Skills CRUD operations |
| `projects.service.js` | Projects CRUD operations |
| `languages.service.js` | Languages CRUD operations |
| `interests.service.js` | Interests CRUD operations |
| `about.service.js` | About section operations |
| `messages.service.js` | Contact messages operations |

### Importing Services:
```javascript
// Individual service imports
import experienceService from './services/experience.service';

// Or use the legacy adminService pattern (backward compatible)
import { adminService } from './services';
await adminService.getExperiences();
```

## 4. Error Handling Improvements

### Global Error Handling (api.js):
- 401 → Clears auth, redirects to login (for admin routes)
- 403 → Logs warning about permissions
- 404 → Logs resource not found
- 500/502/503 → Logs server error message
- Network errors → Logs connectivity issues

### Component-Level Error Handling:
- Session validation before API calls
- Error state with retry functionality
- User-friendly error messages displayed in UI
- Toast notifications for errors

### Example Error UI Pattern:
```jsx
if (error) {
    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <AlertCircle className="w-16 h-16 text-red-400" />
                <h2 className="text-xl font-bold text-white">{error}</h2>
                <button onClick={handleRetry} className="btn-primary">
                    <RefreshCw className="w-5 h-5" />
                    <span>Retry</span>
                </button>
            </div>
        </AdminLayout>
    );
}
```

## 5. Authentication Flow

### AuthContext Enhancements:
- Token expiration validation (JWT exp claim)
- Session validity checks before API calls
- Role-based access control (Admin role check)
- Error state management

### ProtectedRoute Enhancements:
- Session validation using `hasValidSession()`
- Preserves intended destination for redirect after login
- Admin role verification

### Login Flow:
1. User enters credentials
2. POST `/api/auth/login` with credentials
3. Backend returns JWT token
4. Token stored in localStorage
5. User data parsed and stored
6. Redirect to intended page (or dashboard)

## 6. Preventing Infinite Re-fetch Loops

### Strategies Used:
- `useCallback` with proper dependencies
- Session validation before fetching
- Retry count limiting (max 2 retries)
- Don't retry on 401/403 (auth issues handled globally)

## 7. Environment Configuration (`.env`)

```env
# API URL Configuration
# In development, leave this as /api to use Vite proxy
# In production, set this to your actual backend URL
VITE_API_URL=/api

# Optional: Enable debug logging
VITE_DEBUG=true
```

## 8. API Endpoint Mapping

### Public Endpoints (no auth required):
| Frontend Path | Backend Path |
|--------------|--------------|
| `/skills` | `/api/skills` |
| `/projects` | `/api/projects` |
| `/experiences` | `/api/experiences` |
| `/education` | `/api/education` |
| `/languages` | `/api/languages` |
| `/interests` | `/api/interests` |
| `/about` | `/api/about` |
| `/contact` | `/api/contact` |

### Admin Endpoints (JWT required):
| Frontend Path | Backend Path |
|--------------|--------------|
| `/auth/login` | `/api/auth/login` |
| `/v1/admin/dashboard/stats` | `/api/v1/admin/dashboard/stats` |
| `/v1/admin/experiences` | `/api/v1/admin/experiences` |
| `/v1/admin/education` | `/api/v1/admin/education` |
| `/v1/admin/skills` | `/api/v1/admin/skills` |
| `/v1/admin/projects` | `/api/v1/admin/projects` |
| `/v1/admin/languages` | `/api/v1/admin/languages` |
| `/v1/admin/interests` | `/api/v1/admin/interests` |
| `/v1/admin/about` | `/api/v1/admin/about` |
| `/v1/admin/messages` | `/api/v1/admin/messages` |

## 9. Testing the Fix

### Prerequisites:
1. Start backend server: `mvn spring-boot:run` (port 8080)
2. Start frontend dev server: `npm run dev` (port 5173)

### Verify Public API:
```bash
# Should return skills data
curl http://localhost:5173/api/skills
```

### Verify Admin API:
1. Login via http://localhost:5173/admin/login
2. Check browser console for API requests
3. Requests should go to http://localhost:8080/api/v1/admin/*

## 10. Files Modified

| File | Changes |
|------|---------|
| `src/services/api.js` | Complete rewrite with enhanced error handling |
| `src/services/index.js` | Updated exports, added individual service imports |
| `src/services/*.service.js` | 10 new service files created |
| `src/context/AuthContext.jsx` | Enhanced with token validation, session checking |
| `src/components/ProtectedRoute.jsx` | Added session validation, redirect state |
| `src/pages/admin/Dashboard.jsx` | Added error handling, session validation |
| `src/pages/admin/ExperienceManagement.jsx` | Added error handling, session validation |
| `src/pages/admin/SkillsManagement.jsx` | Added error handling, session validation |
| `src/pages/admin/AdminLogin.jsx` | Added redirect handling, error display |
| `src/pages/Home.jsx` | Enhanced error logging |
| `src/hooks/useApiCall.js` | New reusable hook for API calls |
| `vite.config.js` | Enhanced proxy configuration with logging |
| `.env` | Updated with documentation |
