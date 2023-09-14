const express = require("express");
const routor = express.Router();
const fs = require("fs");
const path = require("path");
const githubData = require("../module/getRepositoryCount");
const getHoldJson = require("../module/holdJSON");
const data = require("../data.json");
// const fetch = require('node-fetch')

// Main
routor.get("/", require("../module/checkDATA"), async (req, res) => {
  const getAllRepoFromGITHUB = await githubData.getRepositoryCount();
  res.render(
    res.locals.hview,
    await getHoldJson.holdJSON(data, getAllRepoFromGITHUB)
  );
});

// Download Resume
routor.get(
  "/downloadResume",
  async (req, res) => await res.download("public/pdf/MatinNasiriAndroid.pdf")
);

// Setting
routor.get("/setting", (req, res) => {
  res.render("setting");
});

// Update The Json Data
routor.post("/json", async (req, res) => {
  if (req.body.token !== process.env.TOKEN)
    res.status(403).json({ message: "Your token is invalid!", date: Date() });
  
  await fs.writeFile("data.json", JSON.stringify(req.body.json.replace(/\\/g, '')), (err) => {
    if (err)
      res.status(500).json({
        message: "An error occurred on the server",
        error: err.message,
        date: Date(),
      });
    console.log("Json Is Update!");
    res.status(201).json({ message: "Done!", newData: req.body, date: Date() });
  });
});

// Test Upload Image!
routor.post("/imgs", require("../module/checkTOKEN"), async (req, res) => {
  if (!res.locals.oky)
    res.status(403).json({ message: "Your token is invalid!", date: Date() });
});

// Save messages And Send
routor
  .route("/message")
  .get((req, res) => res.send("hi"))
  .post((req,res)=> res.json({oky:"true"}))

// 404
routor.use((req, res, next) => res.redirect("/"));

module.exports = routor;
