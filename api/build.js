const fs = require("fs");
const path = require("path");

const serverFile = path.join(__dirname, "server.js");

if (!fs.existsSync(serverFile)) {
    console.error("Build failed: server.js not found.");
    process.exit(1);
}

console.log("API build completed successfully.");
console.log(`Build source: ${serverFile}`);