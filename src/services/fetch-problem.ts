'use server';

import { Problem } from '@/domain/entities/problem';
import { cookies } from 'next/headers';
import { responseHandler } from './response-handler';

const HOST_URL = process.env.HOST_URL || 'http://localhost:3000';

export async function fetchProblemById(id: number): Promise<Problem> {
  const res = await fetch(`${HOST_URL}/api/problem/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: (await cookies()).toString(),
    },
  });

  const responseResult = await responseHandler<Problem>(res);

  if (!responseResult.success) throw responseResult.error;

  return responseResult.json;
}
