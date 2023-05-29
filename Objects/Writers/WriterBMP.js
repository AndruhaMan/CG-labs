const fs = require("fs");

class WriterBMP {
    write(image, filename) {
        const rowPaddingSize = (4 - ((image.width * (24 / 8)) % 4)) % 4;
        const fileSize = 14 + 40 + (image.height * (image.width * (24 / 8) + rowPaddingSize));
        const buffer = Buffer.alloc(fileSize);

        buffer.write("BM", 0);
        buffer.writeUInt32LE(fileSize, 2);
        buffer.writeUInt32LE(14 + 40, 10);
        buffer.writeUInt32LE(40, 14);
        buffer.writeInt32LE(image.width, 18);
        buffer.writeInt32LE(image.height, 22);
        buffer.writeUInt16LE(1, 26);
        buffer.writeUInt16LE(24, 28);
        buffer.writeUInt32LE(0, 30);
        buffer.writeUInt32LE(0, 34);
        buffer.writeInt32LE(0, 38);
        buffer.writeInt32LE(0, 42);
        buffer.writeUInt32LE(0, 46);
        buffer.writeUInt32LE(0, 50);
        let offset = 14 + 40;
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                const pixel = image.pixels[y][x];
                const {r, g, b} = pixel.color;
                buffer.writeUInt8(b, offset);
                buffer.writeUInt8(g, offset + 1);
                buffer.writeUInt8(r, offset + 2);
                offset += 3;
            }
            for (let i = 0; i < rowPaddingSize; i++) {
                buffer.writeUInt8(0, offset);
                offset++;
            }
        }
        fs.writeFileSync(`Output/${filename}.bmp`, buffer);
        console.log('File created!');
    }
}

module.exports = new WriterBMP();