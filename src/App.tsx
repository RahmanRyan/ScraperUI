import { AuthProvider } from './contexts/AuthContext'
import ItemListManager from './components/ItemListManager'
import Login from './components/Login'
import { useAuth } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

function AppContent() {
  const { user } = useAuth()
  console.log('Current user:', user)  // Add this

  console.log('Rendering:', user ? 'ItemListManager' : 'Login')

  return (
    <main className="min-h-screen bg-background">
      {user ? <ItemListManager /> : <Login />}
      <Toaster />
    </main>
  )
}

export default function App() {
  useEffect(()=>{
    document.title = 'AI Shopping List'
  },[])
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}