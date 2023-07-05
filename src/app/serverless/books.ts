import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
export default async function handler(event: any, context: any) {
  const client = new Client({
    host: process.env['VERCEL_DATABASE_HOST'],
    port: parseInt(process.env['VERCEL_DATABASE_PORT']!),
    database: process.env['VERCEL_DATABASE_NAME'],
    user: process.env['VERCEL_DATABASE_USER'],
    password: process.env['VERCEL_DATABASE_PASSWORD'],
  });
  const result = await client.query(`SELECT * FROM Books;`);
  const booksData = result.rows.map(
    ({ title, author, description, image }) => ({
      title,
      author,
      description,
      image,
    })
  );
  context.res.status(200).json(booksData);
}
