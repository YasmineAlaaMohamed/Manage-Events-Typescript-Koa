import Koa from "koa";
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { router } from "./routes";
import { dbConn } from "../db";
import dotenv from 'dotenv';
dotenv.config()

const app = new Koa();
dbConn()
const PORT = process.env.PORT || 8080   ;
app.use(cors())
app.use(bodyParser())

app.use(router.routes());
const x = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}/`);
});

export = x;