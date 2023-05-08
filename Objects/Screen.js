const Vector = require("./Vector");
const Ray = require("./Ray");

module.exports = class Screen {

    constructor(width, height, fov) {
        this.width = width;
        this.height = height;
        this.fov = fov;
        this.aspectRatio = width / height;
    }
}