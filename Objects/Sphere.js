const Normal = require("./Normal");

module.exports = class Sphere {
  constructor(center, radius) {
    this.center = center; //Point
    this.radius = radius; //Number
  }
  
  sphereIntersect(ray) {
    const b = 2 * ray.direction.scalarMultiple(ray.origin.subtract(this.center));
    const c = ray.origin.subtract(this.center).scalarMultiple(ray.origin.subtract(this.center)) - this.radius**2;
    const discrim = b**2 - 4*c;
    if(discrim>=0) {
      const t1 = (-b + Math.sqrt(discrim)) / 2;
      const t2 = (-b - Math.sqrt(discrim)) / 2;
      if (t1 < 0 && t2 < 0) {
        const t = Math.min(t1, t2);
        const intersectPoint = ray.origin.toVector().add(ray.direction.numberMultiple(t));
        return new Normal(intersectPoint.subtract(this.center));
      }
    }
  }
};