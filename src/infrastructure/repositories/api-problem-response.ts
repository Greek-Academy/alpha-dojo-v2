import { z } from "zod";
import { problemDTO } from "../dto/problem-dto";
import { errorResponse } from "../dto/error";

export const problemsResponse = z
  .object({
    data: z.array(problemDTO),
  })
  .or(errorResponse);

export type ProblemsResponse = z.infer<typeof problemsResponse>;
