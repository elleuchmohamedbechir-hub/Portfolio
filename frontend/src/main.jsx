import { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './i18n' // Initialize i18n
import './index.css'

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-slate-950 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
