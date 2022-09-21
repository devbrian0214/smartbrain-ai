import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

// Connect local database
export const db = knex({
  client: process.env.CLIENT,
  connection: {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});
