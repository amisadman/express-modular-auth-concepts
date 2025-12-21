import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const login = async (payload: Record<string, unknown>) => {
  const { name, email, password } = payload;

  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email]
  );

  
  if (result.rows.length === 0) return null;

  const matchedPassword = await bcrypt.compare(
    password as string,
    result.rows[0].password
  );

  if (!matchedPassword) {
    return false;
  } else {
    delete result.rows[0].password;
    return result.rows[0];
  }
};

export const authService = {
  login,
};
