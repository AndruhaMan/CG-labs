const Point = require("./Point")
const Vector = require("./Vector");
const Ray = require("./Ray");

module.exports = class Camera extends Point {

    getRay(screen, x, y) {
        const px = - ((2 * (x + 0.5)) / screen.width - 1) * Math.tan(screen.fov / 2) * screen.aspectRatio;
        const py = (1 - (2 * (y + 0.5)) / screen.height) * Math.tan(screen.fov / 2);
        const rayDirection = new Vector(px, py, -1).normalize();
        return new Ray(this, rayDirection);
    }
};