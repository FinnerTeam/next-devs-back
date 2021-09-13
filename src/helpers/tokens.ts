import jwt from "jsonwebtoken";

type tokenType = "ACCESS" | "REFRESH";

export const tokenGenerator = (
  email: string,
  userId: string,
  type: tokenType
) => {
  if (process.env.JWT_SECRET_KEY) {
    const time = type === "ACCESS" ? "1h" : "365d";
    return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: time,
    });
  }
};
