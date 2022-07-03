import { z } from 'zod';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

const ENVSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.Development),
  RABBIT_MQ_URI: z.string(),
  RABBIT_MQ_BILLING_QUEUE: z.string(),
});

export type TBillingEnv = z.infer<typeof ENVSchema>;

export function validateBillingEnv(config: Record<string, any>) {
  const env = ENVSchema.parse(config);
  return env;
}
