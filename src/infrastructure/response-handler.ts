import { ResponseError, ResponseErrorCode } from '@/domain/entities/error';

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

  const statusCode = res.status;

  if (statusCode < 400) return { success: true, json: data as T };

  let message: string;
  try {
    message = data.error.message;
  } catch (_e) {
    message = data || 'No error message provided';
  }

  let errorCode: ResponseErrorCode;
  switch (statusCode) {
    case 401:
      errorCode = 'Unauthorized';
      break;
    case 403:
      errorCode = 'Forbidden';
      break;
    case 404:
      errorCode = 'Unauthorized';
      break;
    default:
      errorCode = 'Unknown';
  }

  return { success: false, error: new ResponseError(message, errorCode) };
}
