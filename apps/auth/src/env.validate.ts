import { z } from 'zod';

const EnvAuthSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  MONGODB_URI: z.string(),
  PORT: z.string().transform((arg, ctx) => {
    const port = Number.parseInt(arg);
    if (isNaN(port)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'PORT is Not a Number',
      });
      return null;
    }
    return port;
  }),
  RABBIT_MQ_URI: z.string(),
  RABBIT_MQ_QUEUE: z.string(),
});

export type TEnvAuth = z.infer<typeof EnvAuthSchema>;

export function validateAuthEnv(
  config: Record<string, any>,
): Record<string, any> {
  const env = EnvAuthSchema.parse(config);
  console.log('Auth ENV', env);
  return env;
}
