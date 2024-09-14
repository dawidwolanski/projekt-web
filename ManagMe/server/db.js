import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'managme',
  connectionLimit : 10,
  //waitForConnections: true,
});

export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

export default query;
