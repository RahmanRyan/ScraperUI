const API_BASE_URL = 'http://localhost:8080/api/scraper';

export interface Product {
   id: string;
   url: string;
   name: string;
   price: string;   
   scrapedAt: string;
   userId?: string;
}

export const apiService = {
   async verifyToken(token: string): Promise<{userId: string}> {
       const response = await fetch(`${API_BASE_URL}/verify-token`, {
           method: 'POST',
           headers: {
               'Authorization': `Bearer ${token}`
           }
       });
       if (!response.ok) throw new Error('Failed to verify token');
       return response.json();
   },

   async getAllProducts(token: string): Promise<Product[]> {
    console.log("hello")
    console.log(token)

       const response = await fetch(`${API_BASE_URL}/products`, {
           headers: {
               'Authorization': `Bearer ${token}`
           }
       });
       if (!response.ok) throw new Error('Failed to fetch products');
       return response.json();
   },

   async scrapeProduct(url: string, token: string): Promise<Product> {
       const response = await fetch(`${API_BASE_URL}/extract/gpt?url=${encodeURIComponent(url)}`, {
           method: 'GET',
           headers: {
               'Authorization': `Bearer ${token}`
           }
       });
       if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.error || 'Failed to scrape product');
       }
       return response.json();
   },

   async deleteProduct(id: string, token: string): Promise<void> {
       const response = await fetch(`${API_BASE_URL}/products/${id}`, {
           method: 'DELETE',
           headers: {
               'Authorization': `Bearer ${token}`
           }
       });
       if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.error || 'Failed to delete product');
       }
   }
};