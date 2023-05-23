const fs = require("fs");
const Image = require("./Image");
const Pixel = require("./Pixel");

class ImageReader {
    turn1DArrayTo2D(array, width, height) {
        let result = [];
        let temp = [];
        for (let i = 0; i < array.length; i++){
            temp.push(array[i]);
            if (temp.length === width){
                result.unshift(temp);
                temp = [];
            }
        }
        return result;
    }

    readPPM(filename) {
        const content = fs.readFileSync(`Input/${filename}.ppm`, "utf-8");
        const lines = content.split("\n");
        const width = parseInt(lines[1].split(" ")[0]);
        const height = parseInt(lines[1].split(" ")[1]);
        const formatPixels = lines.slice(3).map((line) => {
            const split = line.split(" ");
            return new Pixel ({r: parseInt(split[0]),
                    g: parseInt(split[1]),
                    b: parseInt(split[2])
        }, parseInt(split[0])/255)});
        const pixels = this.turn1DArrayTo2D(formatPixels, width, height);
        return new Image(width, height, pixels);
    }

    readBMP(filename) {
        const data = fs.readFileSync(`Input/${filename}.bmp`);
        const pixelDataOffset = data.readUInt32LE(10);
        const width = data.readInt32LE(18);
        const height = data.readInt32LE(22);
        const bitsPerPixel = data.readInt16LE(28);
        const bytesPerPixel = bitsPerPixel / 8;
        const paddingSize = (4 - (width * bytesPerPixel) % 4) % 4;

        const pixels = [];

        for (let i = 0; i < height; i++) {
            const row = [];
            const rowIndex = pixelDataOffset + (i * ((width * bytesPerPixel) + paddingSize));
            for (let j = 0; j < width; j++) {
                const pixelIndex = rowIndex + (j * bytesPerPixel);
                const r = data.readUInt8(pixelIndex + 2);
                const g = data.readUInt8(pixelIndex + 1);
                const b = data.readUInt8(pixelIndex);
                row.push(new Pixel({r, g, b}, r/255));
            }
            pixels.push(row);
        }

        return new Image(width, height, pixels);
    }
}

module.exports = new ImageReader();