const ImageWriter = require("./Objects/ImageWriter");
const ImageReader = require("./Objects/ImageReader");

const source = process.env.npm_config_source;
const goalFormat = process.env.npm_config_goalFormat;

const filename = source.split(".")[0];
let image;
try {
    image = ImageReader.readFile(source);
    try {
        writeFile(filename, goalFormat);
    } catch (e) {
        throw e;
    }
} catch (e) {
}


function writeFile(filename, goalFormat) {
    if(goalFormat === "ppm") {
        ImageWriter.writePPM(image, filename);
    } else if (goalFormat === "console") {
        ImageWriter.writeConsole(image);
    } else if (goalFormat === "bmp") {
        ImageWriter.writeBMP(image, filename);
    } else {
        throw new Error("We does not support this goal format");
    }
}