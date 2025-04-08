import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { relationalUserDTO } from '../user/user-response';
import { ProblemDTO, problemDTO } from '../problem/problem-response';
import { languageDTO } from '../language/language-response';

export const baseSubmissionAttributesDTO = strapiCommonAttributesDTO.extend({
  author: z
    .object({
      data: relationalUserDTO,
    })
    .optional(),
  language: z
    .object({
      data: languageDTO,
    })
    .optional(),
  code: z.string(),
  test_result_id: z.string(),
});

/** {@link baseSubmissionAttributesDTO} の全プロパティが必須 (1次階層まで) */
const baseSubmissionAttributesRequiredDTO =
  baseSubmissionAttributesDTO.required();

const baseSubmissionDTO = strapiCommonDTO.extend({
  attributes: baseSubmissionAttributesDTO,
});

/** {@link baseSubmissionDTO} の全プロパティが必須 (1次階層まで) */
const baseSubmissionRequiredDTO = strapiCommonDTO.extend({
  attributes: baseSubmissionAttributesRequiredDTO,
});

export type SubmissionDTO = z.infer<typeof baseSubmissionDTO> & {
  attributes: {
    problem?: {
      data: ProblemDTO;
    };
  };
};

/** {@link SubmissionDTO} の全プロパティが必須 (1次階層まで) */
export type SubmissionRequiredDTO = z.infer<
  typeof baseSubmissionRequiredDTO
> & {
  attributes: {
    problem: {
      data: ProblemDTO;
    };
  };
};

export const submissionDTO: z.ZodType<SubmissionDTO> = baseSubmissionDTO.extend(
  {
    attributes: baseSubmissionAttributesDTO.extend({
      problem: z
        .object({
          data: z.lazy(() => problemDTO),
        })
        .optional(),
    }),
  }
);

/** {@link submissionDTO} の全プロパティが必須 (1次階層まで) */
export const submissionRequiredDTO: z.ZodType<SubmissionRequiredDTO> =
  baseSubmissionRequiredDTO.extend({
    attributes: baseSubmissionAttributesRequiredDTO.extend({
      problem: z.object({
        data: z.lazy(() => problemDTO),
      }),
    }),
  });
