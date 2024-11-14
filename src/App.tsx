import { ThemeProvider } from "./components/theme-provider"
import HomePage from "./pages/HomePage"
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastContainer 
            toastClassName='bg-neutral-200 dark:bg-neutral-950 border border-neutral-400 dark:border-neutral-800 text-neutral-900 dark:text-neutral-300 rounded-2xl' 
          />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
        </ThemeProvider>
      </Router>
  )
}

export default App
