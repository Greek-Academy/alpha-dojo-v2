'use server';

import { Problem } from '@/domain/entities/problem';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const HOST_URL = process.env.HOST_URL || 'http://localhost:3000';

export async function fetchProblem(id: number): Promise<Problem> {
  const res = await fetch(`${HOST_URL}/api/problem/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: (await cookies()).toString(),
    },
  });

  const data = await res.json();

  switch (res.status) {
    case 401:
      throw new Error(data.error);
    case 404:
      throw notFound();
    case 500:
      throw new Error(data.error);
  }

  return data;
}
