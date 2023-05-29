const Pixel = require("../Pixel");
const Image = require("../Image");

class ReaderPPM {
    turn1DArrayTo2D(array, width, height) {
        let result = [];
        let temp = [];
        for (let i = 0; i < array.length; i++){
            temp.push(array[i]);
            if (temp.length === width){
                result.unshift(temp);
                temp = [];
            }
        }
        return result;
    }

    read(contentBuffer) {
        const content = contentBuffer.toString();
        const lines = content.split("\n");
        const width = parseInt(lines[1].split(" ")[0]);
        const height = parseInt(lines[1].split(" ")[1]);
        const formatPixels = lines.slice(3).map((line) => {
            const split = line.split(" ");
            return new Pixel ({r: parseInt(split[0]),
                g: parseInt(split[1]),
                b: parseInt(split[2])
            }, parseInt(split[0])/255)});
        const pixels = this.turn1DArrayTo2D(formatPixels, width, height);
        return new Image(width, height, pixels);
    }
}

module.exports = new ReaderPPM();