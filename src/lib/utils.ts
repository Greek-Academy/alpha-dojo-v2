import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const fontSizes = [
  'large',
  'large-prominent',
  'medium',
  'medium-prominent',
  'small',
  'small-prominent',
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            {
              display: fontSizes,
              headline: fontSizes,
              title: fontSizes,
              body: fontSizes,
              label: fontSizes,
            },
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1 つのキーのみを持つオブジェクトを作成
 * @see {@link https://stackoverflow.com/questions/71777084/typescript-a-object-only-allow-one-specific-key Typescript: a object only allow one Specific key}
 */
type CreateObjHelper<Keys extends string, Value> = {
  [K in Keys]: {
    [K2 in Keys]?: K2 extends K ? Value : never;
  };
};

/** 1 つのキーのみを持つオブジェクトを作成
 * @param Keys オブジェクトのキーの型
 * @param Value オブジェクトの値の型
 * @example
 * ```
 * type MyKeys = 'a' | 'b' | 'c'
 * type MyObjOneKey = CreateObjOneKey<MyKeys, string>
 * const obj: MyObjOneKey = {
 *   a: ''
 * }
 * ```
 * @see {@link https://stackoverflow.com/questions/71777084/typescript-a-object-only-allow-one-specific-key Typescript: a object only allow one Specific key}
 */
export type CreateObjOneKey<Keys extends string, Value> = CreateObjHelper<
  Keys,
  Value
>[keyof CreateObjHelper<Keys, Value>];
