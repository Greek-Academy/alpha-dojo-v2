import { writeFileSync } from 'fs';
import { Eslinter } from './linters/eslinter';
import { Pylinter } from './linters/pylinter';
import { ILinter, Output } from './linters/iLinter';

const linters = new Map<string, ILinter>([
  ['typescript', new Eslinter()],
  ['python', new Pylinter()],
]);

export function runLint(
  code: string,
  lang: string,
  format: string
): Promise<Output> {
  const linter = linters.get(lang);

  if (linter === undefined) return Promise.reject('Unsupported language');

  writeFileSync('input', code);
  if (format === 'json') return linter.runJson();
  if (format === 'default') return linter.runDefault();

  return Promise.reject('Unsupported format');
}
