import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // false for fresh data in studio
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getProducts(collection?: string) {
  const query = collection
    ? `*[_type == "product" && collection == $collection && inStock == true] | order(_createdAt desc)`
    : `*[_type == "product" && inStock == true] | order(_createdAt desc)`;
  
  const params = collection ? { collection } : {};
  
  return await sanityClient.fetch(query, params);
}

export async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}
