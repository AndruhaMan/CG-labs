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
                const intersectPoint = ray.origin.toVector().add(ray.direction.numberMultiple(t));
                if (intersectPoint.y !== ray.origin.y) return intersectPoint;
            }
        }

        return null;
    }

    getNorm() {
        return this.normal;
    }

    getLowerPoint() {
        return this.origin.y;
    }
}