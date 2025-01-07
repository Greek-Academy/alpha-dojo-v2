export interface Output {
  stdout: string;
  stderr: string;
  exit_code: number;
}

export interface ILinter {
  runDefault(): Promise<Output>;
  runJson(): Promise<Output>;
}
