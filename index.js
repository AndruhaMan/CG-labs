const Sphere = require("./Objects/Sphere");
const Ray = require("./Objects/Ray");
const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");
const Light = require("./Objects/Light");

const width = 100;
const height = 100;
const fov = Math.PI / 2;
const aspectRatio = width / height;
const printingSymbols = ["  ", ". ", "* ", "O ", "# "];

const sphere = new Sphere(new Point(50, 50, 4), 10);
const camera = new Camera(width / 2, height / 2, -20);
const light = new Light(new Vector(-1, -1, 1));



function castRay(x, y) {
    const px = - ((2 * (x + 0.5)) / width - 1) * Math.tan(fov / 2) * aspectRatio;
    const py = (1 - (2 * (y + 0.5)) / height) * Math.tan(fov / 2);
    const rayDirection = new Vector(px, py, -1).normalize();
    const ray = new Ray(camera, rayDirection);
    return sphere.sphereIntersect(ray);
}
function printSymbol(scalarMul) {
    if(scalarMul <= 0) return printingSymbols[0];
    if(scalarMul > 0 && scalarMul <= 0.2) return printingSymbols[1];
    if(scalarMul > 0.2 && scalarMul <= 0.5) return printingSymbols[2];
    if(scalarMul > 0.5 && scalarMul <= 0.8) return printingSymbols[3];
    if(scalarMul > 0.8) return printingSymbols[4];
}

for (let y = height - 1; y >= 0; y--) {
  for (let x = 0; x < width; x++) {
      const intersectNormal = castRay(x, y);
      if(intersectNormal){
          const scalarMul = light.scalarMultiple(intersectNormal);
          process.stdout.write(printSymbol(scalarMul));
      } else {
          process.stdout.write("  ");
      }

  }
    process.stdout.write("\n");
}
