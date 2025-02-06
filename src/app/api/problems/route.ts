import { NextResponse } from 'next/server';
import { ApiProblemRepository } from '@/infrastructure/repositories/api-problem-repository';
import { ProblemUseCase } from '@/usecases/problem-use-case';
import { Problem } from '@/domain/entities/problem';

const problemRepository = new ApiProblemRepository();
const problemUseCase = new ProblemUseCase(problemRepository);

export async function GET() {
  try {
    const problems = await problemUseCase.getAllProblems();
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.description || !data.difficulty) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newProblem: Problem = {
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      constrains: data.constrains,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const problem = await problemUseCase.createProblem(newProblem);
    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create problem' },
      { status: 500 }
    );
  }
}
