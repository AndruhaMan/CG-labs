const Point = require("./Point");

module.exports = class PointLight extends Point {
    constructor(x, y, z, intensity, color) {
        super(x, y, z);
        this.intensity = intensity;
        this.color = color; //{r: xxx, g: xxx, b: xxx}
    }
}
