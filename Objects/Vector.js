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

    cross(vector) {
        return new Vector(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        )
    }

	numberMultiple(num) {
        return new Vector(
            this.x * num,
            this.y * num,
            this.z * num
        )
    }

    toVector() {
        return new Vector(this.x, this.y, this.z)
    }
}
