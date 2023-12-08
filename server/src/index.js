import express from "express";
import cors from "cors";
import mapsRouter from "./maps/route.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/maps", mapsRouter);
try {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`server running on PORT :${PORT}`));
} catch (error) {
  console.log(error);
}
