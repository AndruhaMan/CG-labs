const Normal = require("./Normal");
module.exports = class Triangle {

    constructor(vert1, vert2, vert3) {
        this.vert1 = vert1; //Vector
        this.vert2 = vert2; //Vector
        this.vert3 = vert3; //Vector
    }

    getNorm() {
        const a = this.vert1.subtract(this.vert2);
        const b = this.vert1.subtract(this.vert3);
        return new Normal(a.cross(b).normalize());
    }

    intersect(ray) {
        const edge1 = this.vert2.subtract(this.vert1);
        const edge2 = this.vert3.subtract(this.vert1);
        const pvec = ray.direction.cross(edge2);
        const det = edge1.scalarMultiple(pvec);
        const invDet = 1 / det;
        if(det > -Number.EPSILON && det < Number.EPSILON) {
            return null;
        }
        const tvec = ray.origin.subtract(this.vert1);
        let u = tvec.scalarMultiple(pvec) * invDet;
        if (u < 0 || u > 1) {
            return null;
        }
        const qvec = tvec.cross(edge1);
        let v = ray.direction.scalarMultiple(qvec) * invDet;
        if (v < 0 || u + v > 1) {
            return null;
        }
        let t = edge2.scalarMultiple(qvec) * invDet;
        const intersectPoint = ray.origin.toVector().add(ray.direction.numberMultiple(t));
        if (intersectPoint !== ray.origin.toVector()) return intersectPoint;
    }

    getLowerPoint() {
        return Math.min(this.vert1.y, this.vert2.y, this.vert3.y);
    }
};