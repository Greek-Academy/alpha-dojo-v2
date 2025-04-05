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
  created_at: z.string().datetime(),
  finished_at: z.string().datetime(),
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

/** Judge0 の Status ID の一覧
 * @see {@link https://ce.judge0.com/#statuses-and-languages-status-get Judge0 Status}
 */
export const judgeStatusId = {
  inQueue: 1,
  processing: 2,
  accepted: 3,
  wrongAnswer: 4,
  timeLimitExceeded: 5,
  compilationError: 6,
  runtimeError: {
    SIGSEGV: 7,
    SIGXFSZ: 8,
    SIGFPE: 9,
    SIGABRT: 10,
    NZEC: 11,
    other: 12,
  },
  internalError: 13,
  execFormatError: 14,
} as const;
