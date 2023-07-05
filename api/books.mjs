import { db } from '@vercel/postgres';

export default async function handler(event, context) {
  const client = await db.connect();
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
