import { compare, hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12); // 암호화 정도를 결정하는 값으로 숫자가 클수록 보안성이 크고, 함수완료가 오래걸림
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
