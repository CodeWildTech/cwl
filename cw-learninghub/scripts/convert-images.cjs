const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const folder = "./src/assets";

function convertImages(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      convertImages(fullPath); // 🔥 scan subfolders (mentors etc)
      return;
    }

    if (file.match(/\.(jpg|jpeg|png)$/)) {
      const output = fullPath.replace(/\.(jpg|jpeg|png)/, ".webp");

      sharp(fullPath)
        .resize({ width: 800 })

        .webp({ quality: 80 })
        .toFile(output)
        .then(() => console.log("Converted:", output))
        .catch(err => console.error(err));
    }
  });
}

convertImages(folder);