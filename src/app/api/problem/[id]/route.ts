import { NextResponse } from 'next/server';
import { ApiProblemRepository } from '@/infrastructure/repositories/api-problem-repository';
import { ProblemUseCase } from '@/usecases/problem-usecase';

const problemRepository = new ApiProblemRepository();
const problemUseCase = new ProblemUseCase(problemRepository);

export async function GET({ params }: { params: Promise<{ id: number }> }) {
  try {
    const problem = await problemUseCase.getProblem((await params).id);
    return NextResponse.json(problem, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch problem' },
      { status: 500 }
    );
  }
}
