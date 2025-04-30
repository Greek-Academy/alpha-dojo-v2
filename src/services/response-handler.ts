import { notFound } from 'next/navigation';

export type ResponseResult<T> =
  | {
      success: true;
      json: T;
    }
  | {
      success: false;
      error: Error;
    };

/** レスポンスの HTTP ステータスコードに応じて、エラーを判別します。
 * @returns
 * * HTTP 4xx, 5xx の場合は な場合は `{ success: false, error: Error }`
 * * それ以外の場合は `{ success: true, json: T }`
 */
export async function responseHandler<T>(
  res: Response
): Promise<ResponseResult<T>> {
  const data = await res.json();

  if (res.status < 400) return { success: true, json: data as T };

  if (res.status === 404) return notFound();

  let responseError: Error;
  try {
    responseError = new Error(
      `HTTP ${res.status}: ${data.error.message || data.error}`
    );
  } catch (_e) {
    responseError = new Error(`HTTP ${res.status}: ${data.toString()}`);
  }

  return { success: false, error: responseError };
}
