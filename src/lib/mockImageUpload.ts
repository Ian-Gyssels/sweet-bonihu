/**
 * Mock image upload service simulating Cloudflare R2.
 * Replace this with a real fetch to your backend when ready.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockUploadImage = async (file: File): Promise<string> => {
    // Simulate network delay (500-1000ms)
    await delay(500 + Math.random() * 500);

    const uuid = crypto.randomUUID();
    const ext = 'webp';

    // Return a fake CDN URL
    return `https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg`;
};