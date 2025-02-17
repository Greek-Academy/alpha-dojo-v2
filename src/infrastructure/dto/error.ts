// INFO: Strapi のレスポンスエラー
// TODO: Strapi フォルダを作成し、そこへ移動？

import { z } from 'zod';

export const errorResponse = z.object({
  data: z.null(),
  error: z.object({
    status: z.string(),
    name: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()),
  }),
});

export type ErrorResponse = z.infer<typeof errorResponse>;
