import jwt from "jsonwebtoken";

export const accessTokenGenerator = (email: string, userId: string) => {
  if (process.env.JWT_SECRET_KEY) {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  }
};

export const refreshTokenGenerator = (
  email: string,
  userId: string,
  tokenId: string
) => {
  if (process.env.JWT_SECRET_KEY) {
    return jwt.sign({ email, tokenId, userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "365d",
    });
  }
};
