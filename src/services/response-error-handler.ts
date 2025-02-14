'use server';

import { notFound } from 'next/navigation';

export async function responseErrorHandler(res: Response, data: unknown) {
  if (res.status === 404) notFound();
  if (res.status >= 400)
    // FIXME: コードが読みにくい
    throw new Error(
      typeof data === 'object' &&
      data &&
      'error' in data &&
      typeof data.error === 'string'
        ? data.error
        : ''
    );
}
