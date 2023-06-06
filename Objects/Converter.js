module.exports = class Converter {
    constructor(imageReader, imageWriter) {
        this.imageReader = imageReader;
        this.imageWriter = imageWriter;
    }

    convert() {
        const source = process.env.npm_config_source;
        const goalFormat = process.env.npm_config_goalFormat;

        try {
            const image = this.imageReader.readFile(source);
            this.imageWriter.writeFile(image, source, goalFormat);
        } catch (e) {
            console.log(e.message);
        }
    }
}