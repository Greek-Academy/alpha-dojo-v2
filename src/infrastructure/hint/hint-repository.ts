import { Hint } from '@/domain/entities/hint';
import { HintDTO } from './hint-response';

export const newHintFromDTO = (hint: HintDTO) => {
  return new Hint(
    hint.id.toString(),
    hint.attributes.order,
    hint.attributes.description,
    new Date(hint.attributes.createdAt),
    new Date(hint.attributes.updatedAt)
  );
};
