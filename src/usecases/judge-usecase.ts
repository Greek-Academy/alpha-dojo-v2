import { JudgeRepository } from '@/domain/repositories/judge-repository';

export class JudgeUseCase {
  constructor(private readonly judgeRepository: JudgeRepository) {}

  createSubmission = this.judgeRepository.createSubmission;
  getSubmission = this.judgeRepository.getSubmission;
}
