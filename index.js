const Sphere = require("./Objects/Sphere");
const Ray = require("./Objects/Ray");
const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");

const width = 100;
const height = 100;
const fov = Math.PI / 2;
const aspectRatio = width / height;

const sphere = new Sphere(new Point(50, 50, 4), 3);
const camera = new Camera(width / 2, height / 2, -20);



function castRay(x, y) {
    const px = - ((2 * (x + 0.5)) / width - 1) * Math.tan(fov / 2) * aspectRatio;
    const py = (1 - (2 * (y + 0.5)) / height) * Math.tan(fov / 2);
    const rayDirection = new Vector(px, py, -1).normalize();
    const ray = new Ray(camera, rayDirection);
    return sphere.sphereIntersect(ray);
}

for (let y = height - 1; y >= 0; y--) {
  for (let x = 0; x < width; x++) {
      if (castRay(x, y)) {
          process.stdout.write("# ");
      } else {
          process.stdout.write(". ");
      }
  }
  process.stdout.write("\n");
  }

