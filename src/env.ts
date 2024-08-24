import { load } from 'ts-dotenv';
import path from 'path';

const schema = {
  PORT: Number,
} as const;

export const env = load(schema, {
  path: path.resolve(__dirname, '.env'),
});
