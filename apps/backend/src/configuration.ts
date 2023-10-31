import * as Joi from 'joi';

export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

export const validationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),
});
