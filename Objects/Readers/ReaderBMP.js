const Pixel = require("../Pixel");
const Image = require("../Image");

class ReaderBMP {
    read(content) {
        const pixelDataOffset = content.readUInt32LE(10);
        const width = content.readInt32LE(18);
        const height = content.readInt32LE(22);
        const bitsPerPixel = content.readInt16LE(28);
        const bytesPerPixel = bitsPerPixel / 8;
        const paddingSize = (4 - (width * bytesPerPixel) % 4) % 4;

        const pixels = [];

        for (let i = 0; i < height; i++) {
            const row = [];
            const rowIndex = pixelDataOffset + (i * ((width * bytesPerPixel) + paddingSize));
            for (let j = 0; j < width; j++) {
                const pixelIndex = rowIndex + (j * bytesPerPixel);
                const r = content.readUInt8(pixelIndex + 2);
                const g = content.readUInt8(pixelIndex + 1);
                const b = content.readUInt8(pixelIndex);
                row.push(new Pixel({r, g, b}, r/255));
            }
            pixels.push(row);
        }

        return new Image(width, height, pixels);
    }
}

module.exports = new ReaderBMP();