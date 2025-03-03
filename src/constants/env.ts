import { HOST } from './paths';

export const NODE_ENV = process.env.NODE_ENV;
export const JUDGE_API_KEY = process.env.JUDGE_API_KEY ?? '';

export interface EnvValue {
  host: string;
  secure: boolean;
  port: number;
}

export function getEnvValues(env: NodeJS.ProcessEnv['NODE_ENV']): EnvValue {
  switch (env) {
    case 'production': {
      return {
        host: HOST,
        secure: true,
        port: 1337,
      };
    }

    default: {
      return {
        host: HOST,
        secure: false,
        port: 1337,
      };
    }
  }
}

export const envValues = getEnvValues(NODE_ENV);
