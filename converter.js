const ImageWriter = require("./Objects/ImageWriter");
const ImageReader = require("./Objects/ImageReader");

const source = process.env.npm_config_source;
const goalFormat = process.env.npm_config_goalFormat;

const filename = source.split(".")[0];
const inputFormat = source.split(".")[1];
let image;
try {
    readFile(filename, inputFormat);
    try {
        writeFile(filename, goalFormat);
    } catch (e) {
        throw e;
    }
} catch (e) {
    console.log(e.message);
}

function readFile(filename, inputFormat) {
    if(inputFormat === "ppm") {
        image = ImageReader.readPPM(filename);
    } else if (inputFormat === "bmp") {
        image = ImageReader.readBMP(filename);
    } else {
        throw new Error("We does not support this input format");
    }
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

