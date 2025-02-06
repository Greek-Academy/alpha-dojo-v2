import { Difficulty } from '@/domain/entities/problem';

export type ProblemDTO = {
  id: number;
  attributes: {
    title: string;
    description: string;
    difficulty: Difficulty;
    createdAt: string;
    updatedAt: string;
  };
};
