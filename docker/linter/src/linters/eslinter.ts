import { ILinter, Output } from './iLinter';
import { execp } from '../lib/execp';

export class Eslinter implements ILinter {
  async runDefault(): Promise<Output> {
    const output = await execp('npx eslint input');
    return {
      ...output,
      stdout: output.stdout.split('\n').slice(2).join('\n'),
    };
  }

  async runJson(): Promise<Output> {
    return await execp('npx eslint input --format json');
  }
}
