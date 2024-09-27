import { defineCollection, z } from 'astro:content';

const intro = defineCollection({
    
    schema: z.object({
        title: z.string(),
        text: z.string(),
    }),
});

const languages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    languages: z.record(
      z.string(), // Para definir la clave como string dinámica
      z.object({
        name: z.string(),
        description: z.string(),
        experience: z.string(),
        icon: z.string(),
        used_with: z.string().optional(),
      })
    ),
  }),
});

const frameworks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    frameworks: z.record(
      z.string(),
      z.object({
        name: z.string(),
        description: z.string(),
        experience: z.string(),
        icon: z.string(),
        used_with: z.string().optional(),
      })
    ),
    libraries: z.record(
      z.string(),
      z.object({
        name: z.string(),
        description: z.string(),
        experience: z.string(),
        icon: z.string(),
        used_with: z.string().optional(),
      })
    ),
  }),
});

const other = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    databases: z.record(
      z.string(),
      z.object({
        name: z.string(),
        description: z.string(),
        experience: z.string(),
        icon: z.string(),
        used_with: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  intro,
  languages,
  frameworks,
  other,
};
