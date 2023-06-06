const Normal = require("./Normal");
module.exports = class Sphere {

  constructor(center, radius) {
    this.center = center; //Point
    this.radius = radius; //Number
  }
  getNorm(point) {
    return new Normal(point.subtract(this.center).normalize());
  }

  intersect(ray) {
    const b = 2 * ray.direction.scalarMultiple(ray.origin.subtract(this.center));
    const c = ray.origin.subtract(this.center).scalarMultiple(ray.origin.subtract(this.center)) - this.radius**2;
    const discrim = b**2 - 4*c;
    if(discrim>=0) {
      const t1 = (-b + Math.sqrt(discrim)) / 2;
      const t2 = (-b - Math.sqrt(discrim)) / 2;
      if (t1 < 0 && t2 < 0) {
        const t = Math.max(t1, t2);
        return ray.origin.toVector().add(ray.direction.numberMultiple(t));
      }
    }
    return null;
  }

  getLowerPoint() {
    return this.center.y - this.radius;
  }
};