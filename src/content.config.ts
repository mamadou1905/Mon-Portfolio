import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorBio: z.string().optional(),
    category: z.enum(['Software Engineering', 'Artificial Intelligence', 'Projects & Entrepreneurship', 'Personal Insights']),
    date: z.coerce.date(),
    language: z.enum(['fr', 'en']),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
    guest: z.boolean().default(false)
  })
});
export const collections = { blog };
