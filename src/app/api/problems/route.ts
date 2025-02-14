import { NextResponse } from 'next/server';
import { ApiProblemRepository } from '@/infrastructure/repositories/api-problem-repository';
import { ProblemUseCase } from '@/usecases/problem-usecase';
import { ResponseError } from '@/domain/entities/error';

const problemRepository = new ApiProblemRepository();
const problemUseCase = new ProblemUseCase(problemRepository);

export async function GET() {
  try {
    const problems = await problemUseCase.getAllProblems();
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    if (error instanceof ResponseError)
      // Strapi のエラー
      return NextResponse.json(
        { error: error.object },
        { status: error.status, statusText: error.statusText }
      );

    // 不明なエラー
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
