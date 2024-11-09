import { ThemeProvider } from "./components/theme-provider"
import HomePage from "./pages/HomePage"
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HomePage />
      <ToastContainer 
        toastClassName='bg-neutral-200 dark:bg-neutral-950 border border-neutral-400 dark:border-neutral-800 text-neutral-900 dark:text-neutral-300 rounded-2xl' 
       />
    </ThemeProvider>
  )
}

export default App
