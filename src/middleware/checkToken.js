import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers["token"];

  req.user = null;
  if (token) {
    jwt.verify(token, "secreto", (error, data) => {
      if (error) return res.status(422).json({ error: "Token invalido !" });
      req.user = data;
    });
  }

  next();
};
