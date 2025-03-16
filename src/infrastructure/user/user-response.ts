import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';

const userBaseDTO = z.object({
  username: z.string(),
  email: z.string().email(),
  provider: z.string(),
  confimed: z.boolean(),
  blocked: z.boolean(),
});

/** User を直接取得する際の DTO */
export const userDTO = strapiCommonDTO.merge(
  userBaseDTO.extend({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);

/** Relations で User を取得する際の DTO */
export const relationalUserDTO = strapiCommonDTO.extend({
  attributes: strapiCommonAttributesDTO.merge(userBaseDTO),
});

/** User を直接取得する際の DTO
 *
 * Strapi v4 の Users & Permissions plugin による User は、
 * 直接 User を取得した時と、Relations で取得した時で
 * データ構造が異なることに注意
 */
export type UserDTO = z.infer<typeof userDTO>;

/** Relations で User を取得する際の DTO
 *
 * Strapi v4 の Users & Permissions plugin による User は、
 * 直接 User を取得した時と、Relations で取得した時で
 * データ構造が異なることに注意
 */
export type RelationalUserDTO = z.infer<typeof relationalUserDTO>;
