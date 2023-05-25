import { env } from 'shared/utils';

export type AuthOptions = any;

export type Provider = keyof typeof env;
