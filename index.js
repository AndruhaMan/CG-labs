const Sphere = require("./Objects/Sphere");
const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");
const Light = require("./Objects/Light");
const Normal = require("./Objects/Normal");
const Screen = require("./Objects/Screen");
const Intersection = require("./Objects/Intersection");
const Pixel = require("./Objects/Pixel");
const Image = require("./Objects/Image");
const ImageOutput = require("./Objects/ImageOutput");

const screen = new Screen(100, 100, Math.PI / 2);
const sphere1 = new Sphere(new Point(50, 50, 4), 10);
const sphere2 = new Sphere(new Point(70, 60, 20), 10);
const camera = new Camera(screen.width / 2, screen.height / 2, -20);
const light = new Light(new Vector(-1, 1, -1));
const image = new Image(
    screen.width,
    screen.height,
    new Array(screen.height).fill(null).map(() => new Array(screen.width).fill(null).map(() => new Pixel({r: 0, g: 0, b: 0}, -1)))
)

const objects = [sphere2, sphere1]


for (let y = screen.height - 1; y >= 0; y--) {
  for (let x = 0; x < screen.width; x++) {
      const intersection = getNearestIntersection(objects, x, y);
      choosePixelColor(x, y, intersection)
  }
}

ImageOutput.consoleLog(image);

function getNearestIntersection(objects, x, y) {
    const ray = camera.getRay(screen, x, y);
    let nearestIntersect = null;
    let nearestDistance = Infinity;
    let nearestObject = null;
    for (let object of objects) {
        const intersection = object.intersect(ray);
        if(!intersection) {
            continue;
        }
        const distance = intersection.z - camera.z;
        if(distance < nearestDistance) {
            nearestDistance = distance;
            nearestObject = object;
            nearestIntersect = intersection;
        }
    }
    return new Intersection(nearestIntersect, nearestObject);
}

function choosePixelColor(x, y, intersection) {
    if(intersection.intersectionPoint) {
        const normal = intersection.object.getNorm(intersection.intersectionPoint);
        image.pixels[y][x].intensity = light.scalarMultiple(normal);
        image.pixels[y][x].setGrayColor();
    }
}
