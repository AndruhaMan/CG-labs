const ImageWriter = require("./Objects/ImageWriter");
const ImageReader = require("./Objects/ImageReader");

const source = process.env.npm_config_source;
const goalFormat = process.env.npm_config_goalFormat;


try {
    const image = ImageReader.readFile(source);
    ImageWriter.writeFile(image, source, goalFormat);
} catch (e) {
    console.log(e.message);
}