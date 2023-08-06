import mongoose from "mongoose";

export default async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/user-login-test");
    console.log("Conectado a db");
  } catch {
    console.log("Error al conectar a db");
  }
};
