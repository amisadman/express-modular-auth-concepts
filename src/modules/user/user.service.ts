import { pool } from "../../database/db";
import bcrypt from "bcryptjs";

const getAllUser = async () => {
  const result = await pool.query(`
        SELECT * FROM users
        `);
  return result;
};
const createUser = async (payLoad: Record<string, unknown>) => {
  const { name, email, password } = payLoad;

  const hashedPass = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `
            INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *
        `,
    [name, email, hashedPass]
  );
  delete result.rows[0].password
  return result;
};

export const userService = {
  getAllUser,
  createUser,
};
