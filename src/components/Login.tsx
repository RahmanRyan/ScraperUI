import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc' // You'll need to install react-icons

export default function Login() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to Product List Manager</h1>
          <p className="text-gray-500">Sign in to manage your product list</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={signInWithGoogle}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}