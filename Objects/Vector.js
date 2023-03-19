module.exports = class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        return new Vector(
            this.x / Math.sqrt(this.x**2 + this.y**2 + this.z**2),
            this.y / Math.sqrt(this.x**2 + this.y**2 + this.z**2),
            this.z / Math.sqrt(this.x**2 + this.y**2 + this.z**2)
        );
    }

    subtract(vector) {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z
        );
    }

    add(vector) {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
    )
    }

    scalarMultiple(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
}