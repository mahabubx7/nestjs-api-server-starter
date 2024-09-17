import { envParser } from '@utils';

type StandardNodeEnvOptions =
  | 'dev'
  | 'development'
  | 'prod'
  | 'production'
  | 'test'
  | 'testing'
  | 'staging'
  | 'ci';

export const env = () => ({
  /* General Environment Variables */
  nodeEnv: envParser.get<StandardNodeEnvOptions>(
    'NODE_ENV',
    ['string'],
    'dev', // default value
  ),
  host: envParser.get<string>('APP_HOST', ['ipv4'], '0.0.0.0' /* default */),
  port: envParser.get<number>(
    'APP_PORT',
    ['number', 'unsigned'],
    5454, // default value
  ),

  /* Databases */
  mongoDb: envParser.get<string>(
    'MONGODB_URI',
    ['string'],
    'mongodb://127.0.0.1:27017/nestjs_db', // default value
  ),
});
