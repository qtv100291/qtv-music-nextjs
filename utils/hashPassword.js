import { compare, hash } from "bcryptjs";

export default async function hashPassword(password){
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function comparePassword(password, hashedPassword){
  const isEqual = await compare(password, hashedPassword)
  return isEqual
}