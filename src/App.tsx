import { AuthProvider } from './contexts/AuthContext'
import ItemListManager from './components/ItemListManager'
import Login from './components/Login'
import { useAuth } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const { user } = useAuth()
  console.log('Current user:', user)  // Add this


  return (
    <main className="min-h-screen bg-background">
      {console.log('Rendering:', user ? 'ItemListManager' : 'Login')}
      {user ? <ItemListManager /> : <Login />}
      <Toaster />
    </main>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}