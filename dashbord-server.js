const express = require("express");
const app = express();
const cors = require("cors");
const csvtojson = require("csvtojson");
app.use(cors());

const mongoose = require("mongoose");

function connectTodb() {
  return mongoose.connect("mongodb://localhost/dashbord", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}
connectTodb().then(async () => {
  console.log("Connectid");

  const bookkeepingscema = new mongoose.Schema({
    project: String,
    code: Number,
    name: String,
    date: String,
    index: String,
    debt: Number,
    reciev: Number,
  });

  const bookkeepinmodel = mongoose.model("bookkeepinmodel", bookkeepingscema);
  // const fullstack100 = new bookkeepinmodel({
  //   project: "ui-ux",
  //   code: 201,
  //   name: "gov eco",
  //   date: "29/04/2019",
  //   index: "support",
  //   debt: "",
  //   reciev: 5000,
  // });
  // fullstack100.save();
  const budgetschema = new mongoose.Schema({
    code: Number,
    budget: Number,
  });
  const budgetnmodel = mongoose.model("budgetnmodel", budgetschema);

  const data = await bookkeepinmodel.find().exec();

  app.get("/dashboard", (req, res) => {
    res.send(data);
  });
  const PORT = process.env.PORT || 9000;

  app.listen(PORT, () => {
    console.log(" app listening on port 9000!");
  });
});
