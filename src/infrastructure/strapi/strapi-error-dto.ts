import { z } from 'zod';

export const strapiErrorDTO = z.object({
  data: z.null(),
  error: z.object({
    status: z.string(),
    name: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()),
  }),
});

export type StrapiErrorDTO = z.infer<typeof strapiErrorDTO>;
