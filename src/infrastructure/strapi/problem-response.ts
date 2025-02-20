import { z } from 'zod';
import { problemDTO } from '../dto/problem-dto';

export const strapiProblems = z.object({
  data: z.array(problemDTO),
});

export type StrapiProblems = z.infer<typeof strapiProblems>;
