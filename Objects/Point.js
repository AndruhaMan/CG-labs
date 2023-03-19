const Vector = require("./Vector");

module.exports = class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    subtract(point) {
        return new Vector(
            this.x - point.x,
            this.y - point.y,
            this.z - point.z
        );
    }
    toVector() {
        return new Vector(this.x, this.y, this.z)
    }
}