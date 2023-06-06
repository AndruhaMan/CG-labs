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

    numberMultiple(num) {
        return new Point(
            this.x * num,
            this.y * num,
            this.z * num
        )
    }

    toVector() {
        return new Vector(this.x, this.y, this.z)
    }
}