import { STRAPI_API_URL } from '@/constants/paths';
import { err, ok, ResultAsync } from 'neverthrow';
import { withJson } from '../infra-utils';
import { getStrapiErrorFromGet, StrapiError } from './strapi-error';
import { z } from 'zod';
import qs from 'qs';
import { normalizeError } from '@/lib/err-utils';
import { CreateObjOneKey } from '@/lib/utils';
import { Language } from '@/domain/entities/language';

/** Strapi の Relations の含めるデータを実際に指定 */
type StrapiPopulatingAttributes<T extends { [key in string]: unknown }> =
  | keyof T
  | keyof T['attributes']
  | (keyof T | keyof T['attributes'])[]
  | {
      [K in keyof T]?: Required<T>[K] extends {
        data: object;
      }
        ? StrapiQueryParam<Required<T>[K]['data']>
        : never;
    }
  | {
      [K in keyof T['attributes']]?: Required<T['attributes']>[K] extends {
        data: object;
      }
        ? StrapiQueryParam<Required<T['attributes']>[K]['data']>
        : never;
    };

/** Strapi の Relations もデータに含める際に指定 */
export type StrapiPopulating<T extends object> =
  | '*'
  | (T extends Array<unknown>
      ? T[number] extends { [key in string]: unknown }
        ? StrapiPopulatingAttributes<T[number]>
        : never
      : T extends { [key in string]: unknown }
        ? StrapiPopulatingAttributes<T>
        : never);

/** 演算子の右辺に 1 つの値をとる
 * @see {@link StrapiFilteringArrayOperator} も参照
 */
type StrapiFilteringOperator =
  /** Equal */
  | '$eq'
  /** Equal (case-insensitive) */
  | '$eqi'
  /** Not equal */
  | '$ne'
  /** Not equal (case-insensitive) */
  | '$nei'
  /** Less than */
  | '$lt'
  /** Less than or equal to */
  | '$lte'
  /** Greater than */
  | '$gt'
  /** Greater than or equal to */
  | '$gte'
  /** Contains */
  | '$contains'
  /** Does not contain */
  | '$notContains'
  /** Contains (case-insensitive) */
  | '$containsi'
  /** Does not contain (case-insensitive) */
  | '$notContainsi'
  /** Is null */
  | '$null'
  /** Is not null */
  | '$notNull'
  /** Starts with */
  | '$startsWith'
  /** Starts with (case-insensitive) */
  | '$startsWithi'
  /** Ends with */
  | '$endsWith'
  /** Ends with (case-insensitive) */
  | '$endsWithi';

/** 演算子の右辺に配列をとる
 * @see {@link StrapiFilteringOperator} も参照 */
type StrapiFilteringArrayOperator =
  /** Included in an array */
  | '$in'
  /** Not included in an array */
  | '$notIn'
  /** Is between */
  | '$between';

/** 他の operator をまとめる演算子 */
type StrapiFilteringJoinOperator =
  /** Joins the filters in an "or" expression */
  | '$or'
  /** Joins the filters in an "and" expression */
  | '$and'
  /** Joins the filters in an "not" expression */
  | '$not';

/** Strapi で実際にフィルタリング箇所を指定 */
type StrapiFilteringAttributes<T extends { [key in string]: unknown }> =
  // ID や UserDTO のフィルター (attributes 以下ではない属性)
  | {
      [K in keyof T]?: Required<T>[K] extends { data: object }
        ? // Relations によって、更に深いデータをフィルター (再帰的に呼び出す)
          StrapiFiltering<Required<T>[K]['data']>
        :
            | CreateObjOneKey<StrapiFilteringOperator, T[K]>
            | CreateObjOneKey<StrapiFilteringArrayOperator, T[K][]>;
    }
  // attributes の内部の属性をフィルター
  | {
      [K in keyof T['attributes']]?: Required<T['attributes']>[K] extends {
        data: object;
      }
        ? // Relations によって、更に深いデータをフィルター (再帰的に呼び出す)
          StrapiFiltering<Required<T['attributes']>[K]['data']>
        :
            | CreateObjOneKey<StrapiFilteringOperator, T['attributes'][K]>
            | CreateObjOneKey<
                StrapiFilteringArrayOperator,
                T['attributes'][K][]
              >;
    };

/** Strapi のフィルタリングのパラメータ
 * @see {@link https://docs-v4.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering Filtering}
 */
export type StrapiFiltering<T extends object> =
  // or, and, not
  | CreateObjOneKey<StrapiFilteringJoinOperator, StrapiFiltering<T>[]>
  | (T extends Array<unknown>
      ? // 元のデータ型が配列の場合
        T[number] extends { [key in string]: unknown }
        ? StrapiFilteringAttributes<T[number]>
        : never
      : T extends { [ket in string]: unknown }
        ? StrapiFilteringAttributes<T>
        : never);

/** Strapi の API パラメータ
 * @see {@link https://docs-v4.strapi.io/dev-docs/api/rest/parameters REST API parameters}
 */
export interface StrapiQueryParam<T extends object> {
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/populate-select#population Populate relations, components, or dynamic zones} */
  populate?: StrapiPopulating<T>;
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/populate-select#field-selection Select only specific fields to display} */
  fields?: string[];
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering Filter the response} */
  filters?: StrapiFiltering<T>;
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/filters-locale-publication#locale Select one or multiple locales} */
  locale?: string | string[];
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/filters-locale-publication#publication-state Select the Draft & Publish state}
   *
   * Only accepts the following values:
   * * `live` (default)
   * * `preview`
   */
  publicationState?: 'live' | 'preview';
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/sort-pagination#sorting Sort the response} */
  sort?: string | string[];
  /** {@link https://docs-v4.strapi.io/dev-docs/api/rest/sort-pagination#pagination Page through entries} */
  pagination?: {
    /** Page number (default: 1) */
    page?: number;
    /** Page size (default: 25) */
    pageSize?: number;
    /** Adds the total numbers of entries and the number of pages to the response (default: true) */
    withCount?: boolean;
  };
}

/** Strapi からデータを取得
 * @param endpoint Strapi の REST API のエンドポイント (例: `/problems/1`)
 * @param dataSchema Strapi から取得したデータをパースする Zod Schema (data の内部)
 * @param queryParam Strapi の取得オプション (Relations やフィルター、並び替え)。`T` に依存
 * @param authToken Strapi の認証トークン (JWT)
 */
export const fetchStrapiData = <T extends object>(
  endpoint: string,
  dataSchema: z.ZodTypeAny,
  queryParam: StrapiQueryParam<T>,
  authToken?: string
): ResultAsync<T, StrapiError> =>
  ResultAsync.fromPromise(
    fetch(
      `${STRAPI_API_URL}${endpoint}?${qs.stringify(queryParam, {
        encodeValuesOnly: true, // prettify URL
      })}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      }
    ),
    normalizeError
  )
    .andThen(withJson)
    .mapErr(StrapiError.fromUnknown)
    .andThen((res) =>
      res.ok
        ? ok(
            z
              .object({
                data: dataSchema,
              })
              .safeParse(res.js)
          )
        : err(getStrapiErrorFromGet(res))
    )
    .andThen((jres) =>
      jres.success
        ? ok(jres.data.data)
        : err(
            new StrapiError('Invalid response', undefined, {
              cause: jres.error,
            })
          )
    );

/** 複数の要素を含められる Relations の接続 */
type PostStrapiRelations<connect extends boolean> =
  | number
  | {
      id: number;
    }
  | (connect extends true
      ? {
          position?:
            | {
                before: number;
              }
            | {
                after: number;
              }
            | {
                start: boolean;
              }
            | {
                end: boolean;
              };
        }
      : null);

/** Strapi にデータを渡す際の型。
 * Relations を含める方法は以下を参照。
 * @see {@link https://docs-v4.strapi.io/dev-docs/api/rest/relations Managing relations through the REST API}
 */
export type PostStrapiData<T extends { attributes: object }> = {
  [K in keyof T['attributes']]?: Required<T['attributes']>[K] extends {
    data: object;
  }
    ? Required<T['attributes']>[K]['data'] extends Array<unknown>
      ?
          | number[]
          | {
              connect?: PostStrapiRelations<true>[];
              disconnect?: PostStrapiRelations<false>[];
              set?: PostStrapiRelations<false>[];
            }
      :
          | number
          | {
              connect?: PostStrapiRelations<true>[];
              disconnect?: PostStrapiRelations<false>;
              set?: PostStrapiRelations<false>;
            }
    : T['attributes'][K];
};

/** Strapi で新規エントリを作成 */
export const postStrapiData = <ReturnType extends { attributes: object }>(
  endpoint: string,
  data: PostStrapiData<ReturnType>,
  returnDataSchema: z.ZodTypeAny,
  authToken?: string
): ResultAsync<ReturnType, StrapiError> =>
  ResultAsync.fromPromise(
    fetch(`${STRAPI_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        data,
      }),
    }),
    normalizeError
  )
    .andThen(withJson)
    .mapErr(StrapiError.fromUnknown)
    .andThen((res) =>
      res.ok
        ? ok(
            z
              .object({
                data: returnDataSchema,
              })
              .safeParse(res.js)
          )
        : err(getStrapiErrorFromGet(res))
    )
    .andThen((jres) =>
      jres.success
        ? ok(jres.data.data)
        : err(
            new StrapiError('Invalid response', undefined, {
              cause: jres.error,
            })
          )
    );

/** Strapi の Monaco Editor に含まれる、言語情報を含む prefix を除去
 * @example
 * ```
 * const codeText = '__typescript__;class Cat {...}';
 * const codeTextWithoutLanguage = removeCodeTextLanguagePrefix(codeText);
 * // expected: 'class Cat {...}'
 * ```
 */
export const removeCodeTextLanguagePrefix = (codeText: string) => {
  const languageRegExp = /__(.+)__;/;
  return codeText.replace(languageRegExp, '');
};

/** Strapi の Monaco Editor 向けに、言語情報を含む prefix を追加
 * @example
 * ```
 * const codeText = 'class Cat {...}';
 * const codeTextWithLanguage = addCodeTextLanguagePrefix(codeText);
 * // expected: '__typescript__;class Cat {...}'
 * ```
 */
export const addCodeTextLanguagePrefix = (
  codeText: string,
  language: Language
) => {
  let languageKey;
  switch (language.key) {
    case 'TYPESCRIPT':
      languageKey = 'typescript';
      break;
    case 'PYTHON':
      languageKey = 'python';
  }
  return `__${languageKey}__;${codeText}`;
};
