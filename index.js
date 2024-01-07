const express = require("express");
const URLRoute = require("./routes/url");
const connectToMongoose = require("./connect");

const app = express();
const PORT = 8001;

connectToMongoose("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/url", URLRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
