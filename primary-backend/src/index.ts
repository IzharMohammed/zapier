import express from "express";
import cors from "cors";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";

const app = express();
app.use(express.json());
const port = 4000;
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/zaps", zapRouter);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})