const express = require("express");
const mongoose = require("mongoose");
const { MOGODB_URL } = require("./config");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;

const corsHandler = cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);

mongoose
    .connect(MOGODB_URL + "tool")
    .then(() => console.log("MongoDBConnected... "))
    .catch((err) => console.log(err));

const journalRouter = require("./routes/journal");
const planRouter = require("./routes/plan");
const todolistRouter = require("./routes/todolist");
const listRouter = require("./routes/list");
const budgetRouter = require("./routes/budget");
const billRouter = require("./routes/bill");
const authRouter = require("./routes/auth");

app.use("/journals", journalRouter);
app.use("/plans", planRouter);
app.use("/todolists", todolistRouter);
app.use("/lists", listRouter);
app.use("/budgets", budgetRouter);
app.use("/bills", billRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Tools");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
