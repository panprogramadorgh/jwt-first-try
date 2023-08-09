import { Router } from "express";
import UserModel from "../models/user.model.js";
import checkToken from "../middleware/checkToken.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "Visita `/api/users` to get the users" });
});

indexRouter.get("/users", async (req, res) => {
  const userDocs = await UserModel.find();
  const noPasswordDocs = userDocs.map((userDoc) => {
    return Object.assign(userDoc, { password: undefined });
  });
  res.json(noPasswordDocs);
});

indexRouter.get("/users/:userid", async (req, res) => {
  const { userid: _id } = req.params;
  try {
    const matchingIdUsers = await UserModel.find({ _id });
    if (matchingIdUsers.length === 0) {
      throw new Error();
    }
    return res.json({ ...matchingIdUsers[0], password: undefined });
  } catch {
    res.status(404).json({ error: "No se encontro el usuario" });
  }
});

indexRouter.get("/profile", checkToken, (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  res.status(200).json({ message: "Autorizado" });
});

export default indexRouter;
