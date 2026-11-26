
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const publicFolder = path.join(__dirname, "public");
const imagePath = path.join(publicFolder, "images", "hug.png");

console.log("Project location:", __dirname);
console.log("Public folder exists:", fs.existsSync(publicFolder));
console.log("Hug image exists:", fs.existsSync(imagePath));

app.use(express.static(publicFolder));

app.get("/test-image", (req, res) => {
    res.sendFile(imagePath);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
