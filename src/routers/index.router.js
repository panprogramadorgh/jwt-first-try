import { Router } from "express";
import UserModel from "../models/user.model.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "Visita `/api/users` to get the users" });
});

indexRouter.get("/users", async (req, res) => {
  const userDocs = await UserModel.find();
  const userDocsWithoutPassword = userDocs.map(({ _id, name, email, __v }) => {
    return {
      _id,
      name,
      email,
      __v,
    };
  });
  res.json(userDocsWithoutPassword);
});

export default indexRouter;
