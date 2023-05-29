const fs = require("fs");

class ImageReader {
    readFile(filename) {
        const content = fs.readFileSync(`Input/${filename}`);
        const format = content.subarray(0, 2).toString();
        let Reader;
        if(format === "P3") {
            Reader = require("./Readers/ReaderPPM");
        } else if(format === "BM") {
            Reader = require("./Readers/ReaderBMP");
        } else throw new Error("We don't support this source format");
        return Reader.read(content);
    }

}

module.exports = new ImageReader();