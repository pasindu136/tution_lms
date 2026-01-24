import mysql from 'mysql2/promise';

let pool;

export const dbRequest = async (query, values = []) => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tution_lms',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};
