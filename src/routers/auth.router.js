import { Router } from "express";
import UserModel from "../models/user.model.js";
import { hash, compare } from "../utils/bcryptjs.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

class LoginError {
  constructor(message, status) {
    (this.status = status), (this.message = message);
  }
}

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({ name, email, password: hash(password) });
  try {
    const document = await newUser.save();
    res.json({
      message: "Documento insertado",
      document,
    });
  } catch {
    res.status(422).json({
      error:
        "Error al insertar el documento. Error de validacion | Error de key duplicada",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // TODO: comprobacion de existencia de email
    const matchingEmailUsers = await UserModel.find({ email });
    if (matchingEmailUsers.length === 0) {
      throw new LoginError("No se encontro el usuario", 404);
    }
    // TODO: Comprobacion de password
    const [user] = matchingEmailUsers;
    const passwordIsCorrect = compare(password, user.password);

    if (passwordIsCorrect) {
      // TODO: En este caso extraProps hace referencia a las propiedades ocultas provenientes de la base de datos. Al obtener los usuarios, spongamos, tendria que dar informacion recortada
      const token = jwt.sign({ ...user, extraProps: {} }, "secreto", {
        expiresIn: 500,
      });

      return res.status(200).json({ message: "Logeado con exito", token });
    }
    throw new LoginError("El email o la contraseña es invalido", 422);

    //
  } catch (error) {
    console.log(error);
    if (error instanceof LoginError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json(error);
  }
});

export default authRouter;
