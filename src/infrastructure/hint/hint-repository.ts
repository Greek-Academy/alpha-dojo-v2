import { Hint } from "@/domain/entities/hint";
import { HintDTO } from "../dto/hint-dto";

export const newHintFromDTO = (hint: HintDTO, problemId: string) => {
  return new Hint(
    hint.id.toString(),
    problemId,
    hint.attributes.order,
    hint.attributes.description,
    new Date(hint.attributes.createdAt),
    new Date(hint.attributes.updatedAt)
  )
}
