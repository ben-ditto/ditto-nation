import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

const alg = "HS256";

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error("Env variable JWT_SECRET_KEY is not set");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );

    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Token expired");
  }
};
