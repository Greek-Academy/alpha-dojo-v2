import { NextResponse } from 'next/server';
import { ApiProblemRepository } from '@/infrastructure/repositories/api-problem-repository';
import { ProblemUseCase } from '@/usecases/problem-usecase';

const problemRepository = new ApiProblemRepository();
const problemUseCase = new ProblemUseCase(problemRepository);

export async function GET() {
  try {
    const problems = await problemUseCase.getAllProblems();
    return NextResponse.json(problems, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
