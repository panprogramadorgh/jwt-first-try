import express from "express";
import db from "./utils/db.js";
import indexRouter from "./routers/index.router.js";
import authRouter from "./routers/auth.router.js";

db();
const app = express();
app.use(express.json());
app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`App runnint at localhost:${PORT}`);
});
