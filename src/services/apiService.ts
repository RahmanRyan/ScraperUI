const API_BASE_URL = 'http://localhost:8080/api/scraper';

export interface Product {
    id: string;
    url: string;
    name: string;
    price: string;
    scrapedAt: string;
}

export const apiService = {
    async getAllProducts(): Promise<Product[]> {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    async scrapeProduct(url: string): Promise<Product> {
        const response = await fetch(`${API_BASE_URL}/extract/gpt?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Failed to scrape product');
        return response.json();
    },

    async deleteProduct(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
    }
};