const Vector = require("./Vector");

module.exports = class Normal extends Vector{
    constructor(vector) {
        super();
        this.x = vector.normalize().x;
        this.y = vector.normalize().y;
        this.z = vector.normalize().z;
    }
};