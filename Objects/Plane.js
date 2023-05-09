module.exports = class Plane {

    constructor(normal, point) {
        this.normal = normal.normalize();
        this.origin = point;
    }

    intersect(ray) {
        const d = ray.direction.scalarMultiple(this.normal);

        if (d > Number.EPSILON || d < -Number.EPSILON) {
            const dif = this.origin.subtract(ray.origin);
            const t = dif.scalarMultiple(this.normal) / d;
            if (t <= 0) {
                return ray.origin.toVector().add(ray.direction.numberMultiple(t));
            }
        }

        return null;
    }

    getNorm() {
        return this.normal;
    }
}