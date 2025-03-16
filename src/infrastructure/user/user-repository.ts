import { User } from '@/domain/entities/user';
import { RelationalUserDTO, UserDTO } from './user-response';

/** @see {@link UserDTO} */
export const newUserFromDTO = (user: UserDTO) => {
  return new User(
    user.id.toString(),
    user.username,
    user.email,
    new Date(user.createdAt),
    new Date(user.createdAt)
  );
};

/** @see {@link RelationalUserDTO} */
export const newUserFromRelationalDTO = (user: RelationalUserDTO) => {
  return new User(
    user.id.toString(),
    user.attributes.username,
    user.attributes.email,
    new Date(user.attributes.createdAt),
    new Date(user.attributes.createdAt)
  );
};
