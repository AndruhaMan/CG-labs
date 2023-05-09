const fs = require("fs");

class ImageOutput {
    consoleLog(image) {
        for (let y = image.height - 1; y >= 0; y--) {
            for(let x = 0; x < image.width; x++) {
                process.stdout.write(image.pixels[y][x].getConsoleColor() + " ");
            }
            process.stdout.write("\n");
        }
    }

    fileLog(image, filename) {
        let fileContent = `P3\n${image.width} ${image.height}\n255\n`;
        for (let y = image.height - 1; y >= 0; y--) {
            for (let x = 0; x < image.width; x++) {
                fileContent += image.pixels[y][x].colorToString() + "\n";
            }
        }
        fs.writeFile(`${filename}.ppm`, fileContent, (err) => {
            if (err) throw err;
            console.log('File created!');
        });
    }
}

module.exports = new ImageOutput();