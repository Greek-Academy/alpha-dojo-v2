import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tseslintparser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

// prettier との連携のため
const tsParser = {
  languageOptions: {
    parser: tseslintparser,
    parserOptions: {
      sourceType: 'module',
      project: 'tsconfig.eslint.json',
    },
  },
  plugins: {
    tseslint,
  },
};

const myRules = {
  rules: {
    eqeqeq: 'error', // ===にしないとエラー
    'no-console': 'warn', // console.xxxを使うと警告
    // 'no-warning-comments': [
    //     // 対象のコメントを書くと警告
    //     'warn',
    //     {terms: ['todo', 'fixme', 'memo'], location: 'anywhere'},
    // ],
    // 'max-statements': ['warn', 30], // 宣言した関数や変数の上限値
    // 'max-lines': ['warn', 500], // 1ファイルの最大行数
    // 'max-lines-per-function': ['warn', {max: 30, skipBlankLines: true}], // 関数内の行数が30行超えると警告
    // 'max-depth': ['warn', 3], // ネストが3を超えると警告
    // complexity: ['warn', 5], // 複雑度が5を超えると警告
    // indent: ['error', 4], // 4スペース以外のインデントはエラー
    // '@typescript-eslint/quotes': ['error', 'single'],
    // '@typescript-eslint/naming-convention': [
    //     'warn',
    //     {selector: 'variableLike', format: ['camelCase']},
    //     {selector: 'method', format: ['camelCase']},
    //     {selector: 'typeLike', format: ['PascalCase']},
    //     {selector: 'parameter', format: ['camelCase']},
    // ],
    // '@typescript-eslint/no-explicit-any': ['error'],
    // FIXME: _ が無視されない
    // '@typescript-eslint/no-unused-vars': [
    //     'warn',
    //     {
    //         "argsIgnorePattern": "^_",
    //         "varsIgnorePattern": "^_",
    //         "caughtErrorsIgnorePattern": "^_",
    //         "destructuredArrayIgnorePattern": "^_"
    //     }
    // ],
    // '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-namespace': ['off'],
    'linebreak-style': ['error', 'unix'],
  },
};

export default tseslint.config(
  {
    ignores: ['docker/*', 'strapi/*'],
  },
  {
    extends: [
      pluginJs.configs.recommended,
      tseslint.configs.recommended,
      tsParser,
      eslintConfigPrettier,
      myRules,
    ],
  }
);
