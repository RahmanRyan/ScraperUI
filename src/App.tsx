import ItemListManager from './components/ItemListManager'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <main className="min-h-screen bg-background">
      <ItemListManager />
      <Toaster />
    </main>
  )
}

export default App