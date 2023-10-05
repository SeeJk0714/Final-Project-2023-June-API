const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;

// setup cors
const corsHandler = cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/tool")
    .then(() => console.log("MongoDBConnected... "))
    .catch((err) => console.log(err));

// routes
const journalRouter = require("./routes/journal");
const planRouter = require("./routes/plan");
const todolistRouter = require("./routes/todolist");
const listRouter = require("./routes/list");
const budgetRouter = require("./routes/budget");
const billRouter = require("./routes/bill");
// const incomeRouter = require("./routes/income");
// const expenseRouter = require("./routes/expense");
const authRouter = require("./routes/auth");

app.use("/journals", journalRouter);
app.use("/plans", planRouter);
app.use("/todolists", todolistRouter);
app.use("/lists", listRouter);
app.use("/budgets", budgetRouter);
app.use("/bills", billRouter);
// app.use("/incomes", incomeRouter);
// app.use("/expenses", expenseRouter);
app.use("/auth", authRouter);

//set the uploads folder as static path
// app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Tools");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
