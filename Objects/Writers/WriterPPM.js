const fs = require("fs");

module.exports = class WriterPPM {
    write(image, filename) {
        let fileContent = `P3\n${image.width} ${image.height}\n255\n`;
        for (let y = image.height - 1; y >= 0; y--) {
            for (let x = 0; x < image.width; x++) {
                fileContent += image.pixels[y][x].colorToString() + "\n";
            }
        }
        fs.writeFileSync(`Output/${filename}.ppm`, fileContent);
        console.log('File created!');
    }
}