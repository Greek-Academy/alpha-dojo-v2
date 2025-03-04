import { z } from 'zod';

export const strapiCommonAttributesDTO = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const strapiCommonDTO = z.object({
  id: z.number(),
});
