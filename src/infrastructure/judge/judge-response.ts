import { z } from 'zod';

export const judgeSubmission = z.object({
  stdout: z.string(),
  time: z.string().transform((v) => parseFloat(v)),
  memory: z.number(),
  stderr: z.string().nullable(),
  token: z.string(),
  compile_output: z.string().nullable(),
  message: z.string().nullable(),
  status: z.object({
    id: z.number(),
    description: z.string(),
  }),
});

export type JudgeSubmission = z.infer<typeof judgeSubmission>;

export const judgeResponse = z.object({
  submissions: z.array(judgeSubmission),
  meta: z.object({
    current_page: z.number(),
    next_page: z.number().nullable(),
    prev_page: z.number().nullable(),
    total_pages: z.number(),
    total_count: z.number(),
  }),
});

export type JudgeResponse = z.infer<typeof judgeResponse>;
