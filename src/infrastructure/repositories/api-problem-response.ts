import { z } from "zod";
import { problemDTO } from "../dto/problem-dto";
import { errorResponse } from "../dto/error";

export const strapiProblems = z
  .object({
    data: z.array(problemDTO),
  })
  .or(errorResponse);

export type StrapiProblems = z.infer<typeof strapiProblems>;
