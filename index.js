const express = require("express");
const URLRoute = require("./routes/url");
const connectToMongoose = require("./connect");
const URL = require("./models/url");

const app = express();
app.use(express.json());
const PORT = 8001;

connectToMongoose("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/url", URLRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  console.log(entry)
  res.redirect(entry.redirect);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
