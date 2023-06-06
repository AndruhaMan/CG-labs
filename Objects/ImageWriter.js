module.exports = class ImageWriter {
    constructor(...plugins) {
        this.plugins = plugins;
    }

    writeFile(image, sourceFile, goalFormat) {
        const filename = sourceFile.split(".")[0];
        for (let writer of this.plugins) {
            if(writer.canWrite(goalFormat)) return writer.write(image, filename);
        }
        throw new Error("We don't support this goal format")
    }
}