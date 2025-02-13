import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BoardProvider } from './context/BoardContext.tsx'
import { KanbanProvider } from './context/KanbanContext.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <BoardProvider>
          <KanbanProvider>
            <App />
          </KanbanProvider>
        </BoardProvider>
      </AuthProvider>
    </StrictMode>,
)
