import { NextResponse } from 'next/server';
import { ApiProblemRepository } from '@/infrastructure/repositories/api-problem-repository';
import { ProblemUseCase } from '@/usecases/problem-usecase';
import { getAuthToken } from '@/lib/get-auth-token';

const problemRepository = new ApiProblemRepository();
const problemUseCase = new ProblemUseCase(problemRepository);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const authToken = await getAuthToken();
    if (!authToken)
      return NextResponse.json({ error: 'Failed to get jwt' }, { status: 401 });

    const problem = await problemUseCase.getProblem(
      (await params).id,
      authToken
    );
    return NextResponse.json(problem, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch problem' },
      { status: 500 }
    );
  }
}
