import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  KAKFA_HOST: string;
  KAKFA_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  NATS_SERVERS: joi.array().items( joi.string() ).required(),
  KAKFA_HOST: joi.string().required(),
  KAKFA_PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
  KAKFA_HOST: process.env.KAKFA_HOST || 'kafka',
  KAKFA_PORT: process.env.KAKFA_PORT ? parseInt(process.env.KAKFA_PORT, 10) : 9092,
});
  
  
console.log(process.env.NATS_SERVERS);


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  kafkaHost: envVars.KAKFA_HOST,
  kafkaPort: envVars.KAKFA_PORT,
}