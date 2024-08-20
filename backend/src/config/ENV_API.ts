import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const ENV_API = {
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
  saltRounds: Number(process.env.SALT_ROUNDS),
  secretKey: String(process.env.SECRET_KEY),
}
