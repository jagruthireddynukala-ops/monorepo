
const fs = require("fs");
const path = require("path");

const publicFolder = path.join(__dirname, "public");

if (!fs.existsSync(publicFolder)) {
    console.error("Build failed: public folder not found.");
    process.exit(1);
}

const requiredFiles = [
    "index.html",
    "app.js",
    "style.css"
];

for (const file of requiredFiles) {
    const filePath = path.join(publicFolder, file);

    if (!fs.existsSync(filePath)) {
        console.error(`Build failed: ${file} not found.`);
        process.exit(1);
    }
}

console.log("UI build completed successfully.");
console.log(`Build source: ${publicFolder}`);
