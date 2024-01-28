import * as Joi from 'joi';

export default () => ({
  app: {
    url: process.env.APP_URL,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  storage: {
    url: process.env.STORAGE_URL,
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  email: {
    mailer: process.env.MAIL_MAILER,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10) || 1025,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION,
    fromAddress: process.env.MAIL_FROM_ADDRESS,
    fromName: process.env.MAIL_FROM_NAME,
  },
});

export const validationSchema = Joi.object({
  APP_URL: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),

  STORAGE_URL: Joi.string().required(),
  STORAGE_ACCESS_KEY: Joi.string().required(),
  STORAGE_SECRET_KEY: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  MAIL_MAILER: Joi.string().default('smtp'),
  MAIL_HOST: Joi.string().default('mailhog'),
  MAIL_PORT: Joi.number().default(1025),
  MAIL_USERNAME: Joi.string().allow(''),
  MAIL_PASSWORD: Joi.string().allow(''),
  MAIL_ENCRYPTION: Joi.string().allow('').allow(null),
  MAIL_FROM_ADDRESS: Joi.string().default('info@classroom.com'),
  MAIL_FROM_NAME: Joi.string().default('classroom'),
});
