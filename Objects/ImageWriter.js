class ImageWriter {
    writeFile(image, sourceFile, goalFormat) {
        const filename = sourceFile.split(".")[0];
        let Writer;
        if (goalFormat === "ppm") {
            Writer = require("./Writers/WriterPPM");
        } else if (goalFormat === "bmp") {
            Writer = require("./Writers/WriterBMP");
        } else if (goalFormat === "console") {
            Writer = require("./Writers/WriterConsole");
        } else throw new Error("We don't support this goal format")
        Writer.write(image, filename);
    }
}

module.exports = new ImageWriter();