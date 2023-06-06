const Normal = require("./Normal");

module.exports = class VectorLight extends Normal {
    constructor(x, y, z, intensity, color) {
        super();
        this.intensity = intensity;
        this.color = color; //{r: xxx, g: xxx, b: xxx}
    }
};