import Redis from 'ioredis';

export const redis = new Redis({
  host: 'localhost',
  port: 16379,
  password: 'password',
});
