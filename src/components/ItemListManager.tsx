'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiService, Product } from '@/services/apiService'
import { toast } from 'react-hot-toast'

export default function ItemListManager() {
 const [items, setItems] = useState<Product[]>([])
 const [weblink, setWeblink] = useState('')
 const [loading, setLoading] = useState(false)

 // Fetch products on component mount
 useEffect(() => {
   fetchProducts()
 }, [])

 const fetchProducts = async () => {
   try {
     const products = await apiService.getAllProducts()
     setItems(products)
   } catch (error) {
     toast.error('Failed to fetch products')
     console.error(error)
   }
 }

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setLoading(true)
   try {
     await apiService.scrapeProduct(weblink)
     await fetchProducts() // Refresh the list
     setWeblink('')
     toast.success('Product added successfully')
   } catch (error) {
     toast.error('Failed to add product')
     console.error(error)
   } finally {
     setLoading(false)
   }
 }

 const handleDelete = async (id: string) => {
   try {
     await apiService.deleteProduct(id)
     setItems(items.filter(item => item.id !== id))
     toast.success('Product deleted successfully')
   } catch (error) {
     toast.error('Failed to delete product')
     console.error(error)
   }
 }

 return (
   <div className="container mx-auto p-4">
     <h1 className="text-2xl font-bold mb-4">Product List Manager</h1>
     
     <form onSubmit={handleSubmit} className="mb-4 space-y-4">
       <Input
         type="url"
         value={weblink}
         onChange={(e) => setWeblink(e.target.value)}
         placeholder="Paste product URL here"
         required
       />
       <Button type="submit" disabled={loading}>
         {loading ? 'Adding...' : 'Add Product'}
         <Plus className="ml-2 h-4 w-4" />
       </Button>
     </form>

     <Table>
       <TableHeader>
         <TableRow>
           <TableHead>Product Name</TableHead>
           <TableHead>Price</TableHead>
           <TableHead>Link</TableHead>
           <TableHead>Actions</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {items.map(item => (
           <TableRow key={item.id}>
             <TableCell>{item.name}</TableCell>
             <TableCell>{item.price}</TableCell>
             <TableCell>
               <Button 
                 variant="outline" 
                 size="sm"
                 onClick={() => window.open(item.url, '_blank')}
               >
                 Visit Site
               </Button>
             </TableCell>
             <TableCell>
               <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                 <Trash2 className="h-4 w-4" />
               </Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </div>
 )
}