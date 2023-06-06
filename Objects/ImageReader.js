const fs = require("fs");

module.exports = class ImageReader {
    constructor(...plugins) {
        this.plugins = plugins;
    }
    readFile(filename) {
        const content = fs.readFileSync(`Input/${filename}`);
        for (let reader of this.plugins) {
            if(reader.canRead(content)) return reader.read(content);
        }
        throw new Error("We don't support this source format");
    }

}