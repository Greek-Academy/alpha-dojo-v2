import { ResponseError } from '@/domain/entities/error';

export type ResponseResult<T> =
  | {
      success: true;
      json: T;
    }
  | {
      success: false;
      error: ResponseError;
    };

/** レスポンスの HTTP ステータスコードに応じて、エラーを判別します。
 * @returns
 * * HTTP 4xx, 5xx の場合は な場合は `{ success: false, error: ResponseError }`
 * * それ以外の場合は `{ success: true, json: T }`
 */
export async function responseHandler<T>(
  res: Response
): Promise<ResponseResult<T>> {
  const data = await res.json();

  if (res.status < 400) return { success: true, json: data as T };

  let responseError: ResponseError;
  try {
    responseError = new ResponseError(data.error.message, res.status);
  } catch (_e) {
    responseError = new ResponseError(
      data || 'No error message provided',
      res.status
    );
  }

  return { success: false, error: responseError };
}
