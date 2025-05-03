import { Submission, SubmissionToCreate } from '@/domain/entities/submission';
import {
  submissionDTO,
  SubmissionDTO,
  submissionRequiredDTO,
  SubmissionRequiredDTO,
} from './submission-response';
import { SupportedLanguageKey } from '@/domain/entities/language';
import {
  SubmissionFilters,
  SubmissionRepository,
} from '@/domain/repositories/submission-repository';
import { ResultAsync } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';
import { StrapiError } from '../strapi/strapi-error';
import { fetchStrapiData, postStrapiData } from '../strapi/strapi-utils';
import { languageToId } from '../language/language-repository';
import { languageKeyToLanguage } from '@/domain/repositories/language-repository';

export const newSubmissionFromRequiredDTO = async (
  submission: SubmissionRequiredDTO
) => {
  return newSubmissionFromDTO(
    submission,
    submission.attributes.author.data.id.toString(),
    submission.attributes.problem.data.id.toString(),
    submission.attributes.language.data.attributes.key
  );
};

export const newSubmissionFromDTO = async (
  submission: SubmissionDTO,
  authorId: string,
  problemId: string,
  languageKey: SupportedLanguageKey
) =>
  new Submission(
    submission.id.toString(),
    authorId,
    problemId,
    languageKeyToLanguage(languageKey),
    submission.attributes.code,
    /* TODO: レビュー機能の実装 */ true,
    /* TODO: レビュー機能の実装 */ true,
    submission.attributes.test_result_id ?? undefined,
    new Date(submission.attributes.createdAt),
    new Date(submission.attributes.updatedAt)
  );

const submissionEndpoint = '/submissions';

export class ApiSubmissionRepository implements SubmissionRepository {
  // TODO: Authorization はログイン時のトークンを使用する
  getSubmissionById = (id: string) =>
    fetchStrapiData<SubmissionRequiredDTO>(
      `${submissionEndpoint}/${id}`,
      submissionRequiredDTO,
      {
        populate: '*',
      },
      process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
    )
      .andThen((subm) =>
        ResultAsync.fromPromise(
          newSubmissionFromRequiredDTO(subm),
          normalizeError
        ).mapErr(StrapiError.fromUnknown)
      )
      .mapErr((err) => err.toResponseError());

  getSubmissions = (filters?: SubmissionFilters) =>
    fetchStrapiData<SubmissionRequiredDTO[]>(
      submissionEndpoint,
      submissionRequiredDTO.array(),
      {
        populate: '*',
        ...(filters
          ? {
              filters: {
                author: {
                  id: {
                    $eq: filters.authorId
                      ? Number(filters.authorId)
                      : undefined,
                  },
                },
                language: {
                  key: {
                    $eq: filters.language ? filters.language.key : undefined,
                  },
                },
                problem: {
                  id: {
                    $eq: filters.problemId
                      ? Number(filters.problemId)
                      : undefined,
                  },
                },
                test_result_id: {
                  $eq: filters.testResultId,
                },
              },
            }
          : null),
      },
      process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
    )
      .andThen((subms) =>
        ResultAsync.fromPromise(
          Promise.all(subms.map((subm) => newSubmissionFromRequiredDTO(subm))),
          normalizeError
        ).mapErr(StrapiError.fromUnknown)
      )
      .mapErr((err) => err.toResponseError());

  postSubmission = (subm: SubmissionToCreate) =>
    languageToId(subm.language)
      .andThen((langId) =>
        postStrapiData<SubmissionDTO>(
          submissionEndpoint,
          {
            author: Number(subm.authorId),
            problem: Number(subm.problemId),
            language: Number(langId),
            code: subm.codeText,
          },
          submissionDTO,
          process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
        ).mapErr((err) => err.toResponseError())
      )
      .andThen((res) =>
        ResultAsync.fromPromise(
          newSubmissionFromDTO(
            res,
            subm.authorId,
            subm.problemId,
            subm.language.key
          ),
          normalizeError
        )
          .mapErr(StrapiError.fromUnknown)
          .mapErr((err) => err.toResponseError())
      );
}
