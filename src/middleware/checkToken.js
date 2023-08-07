import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { token } = req.headers;
  if (!token)
    return res.status(409).json({ error: "Cabezera token era esperada !" });

  jwt.verify(token, "secreto", (error, data) => {
    if (error) return res.status(422).json({ error: "Token invalido !" });
    req.user = data;
    next();
  });
};
