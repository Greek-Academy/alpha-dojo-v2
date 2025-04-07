import { Hint } from '@/domain/entities/hint';
import { hintDTO, HintDTO } from './hint-response';
import { fetchStrapiData } from '../strapi/strapi-utils';
import { ok } from 'neverthrow';
import {
  HintFilters,
  HintRepository,
} from '@/domain/repositories/hint-repository';

export const newHintFromDTO = (hint: HintDTO) => {
  return new Hint(
    hint.id.toString(),
    hint.attributes.order,
    hint.attributes.description,
    new Date(hint.attributes.createdAt),
    new Date(hint.attributes.updatedAt)
  );
};

const hintEndpoint = '/hints';

export class ApiSubmissionRepository implements HintRepository {
  constructor(private readonly authToken?: string) {}

  getHintById = (id: string) =>
    fetchStrapiData<HintDTO>(
      `${hintEndpoint}/${id}`,
      hintDTO,
      {},
      this.authToken
    )
      .andThen((hint) => ok(newHintFromDTO(hint)))
      .mapErr((err) => err.toResponseError());

  getHints = (filters?: HintFilters) =>
    fetchStrapiData<HintDTO[]>(
      hintEndpoint,
      hintDTO.array(),
      {
        filters: {
          problem_id: {
            id: {
              $eq: Number(filters?.problemId),
            },
          },
        },
      },
      this.authToken
    )
      .andThen((hints) => ok(hints.map((hint) => newHintFromDTO(hint))))
      .mapErr((err) => err.toResponseError());
}
