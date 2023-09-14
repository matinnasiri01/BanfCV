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
routor.post("/json", require("../module/checkTOKEN"), async (req, res) => {
  if (!res.locals.oky)
    res.status(403).json({ message: "Your token is invalid!", date: Date() });

  await fs.writeFile("data.json", JSON.stringify(req.body), (err) => {
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

  
  if (Object.keys(req.body).length == 0)
    res.json({ message: "Boro Bache Koni!" });

  
    async function downloadImages() {
      req.body.forEach(async (element) => {
        const imagePath = path.join(__dirname, "public", "img", element.name);
        const response = await fetch(element.url);
    
        if (response.ok) {
          const fileStream = fs.createWriteStream(imagePath);
          response.body.pipe(fileStream);
          
          
          await new Promise((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
          });

          res.json({state:"Done!"})
        } else {
          console.error(element.name , response.statusText);
        }
      });
    }
    
    downloadImages();
});


// 404
routor.use((req, res, next) => res.redirect("/"));


module.exports = routor;