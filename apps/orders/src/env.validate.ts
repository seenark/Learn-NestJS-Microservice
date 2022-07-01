import { z } from 'zod';

// const ENVIRONMENT = ['development', 'production', 'test', 'provision'] as const;
enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}
const ENVSchema = z.object({
  MONGODB_URI: z.string(),
  NODE_ENV: z.nativeEnum(Environment),
});

export function ENV_Validate(config: Record<string, any>): Record<string, any> {
  try {
    const env = ENVSchema.parse(config);
    return env;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
