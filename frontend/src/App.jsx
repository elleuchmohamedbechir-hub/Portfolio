import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import SkillsManagement from './pages/admin/SkillsManagement';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';
import EducationManagement from './pages/admin/EducationManagement';
import LanguagesManagement from './pages/admin/LanguagesManagement';
import InterestsManagement from './pages/admin/InterestsManagement';
import AboutManagement from './pages/admin/AboutManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ProjectsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <SkillsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <ExperienceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/education"
            element={
              <ProtectedRoute>
                <EducationManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/languages"
            element={
              <ProtectedRoute>
                <LanguagesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/interests"
            element={
              <ProtectedRoute>
                <InterestsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/about"
            element={
              <ProtectedRoute>
                <AboutManagement />
              </ProtectedRoute>
            }
          />
          {/* Catch all admin routes */}
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#0ea5e9',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
