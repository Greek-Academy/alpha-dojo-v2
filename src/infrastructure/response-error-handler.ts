/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseError } from '@/domain/entities/error';

export async function responseErrorHandler(res: Response, data: unknown) {
  if (res.status < 400) return;

  let responseError: ResponseError;
  try {
    responseError = new ResponseError(
      res.status,
      res.statusText,
      (data as any).error,
      (data as any).error.message
    );
  } catch (_e) {
    responseError = new ResponseError(
      res.status,
      res.statusText,
      data || 'No error data provided'
    );
  }

  throw responseError;
}
