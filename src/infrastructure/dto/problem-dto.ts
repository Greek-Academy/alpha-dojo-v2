import { difficulty } from '@/domain/entities/problem';
import { z } from 'zod';

export const problemDTO = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: difficulty,
    constraints: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type ProblemDTO = z.infer<typeof problemDTO>;
