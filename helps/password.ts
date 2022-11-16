import argon2 from "argon2";

export function generateHashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export function checkPassword(
  passwordHash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(passwordHash, password);
}
