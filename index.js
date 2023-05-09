const Sphere = require("./Objects/Sphere");
const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");
const Light = require("./Objects/Light");
const Screen = require("./Objects/Screen");
const Intersection = require("./Objects/Intersection");
const Pixel = require("./Objects/Pixel");
const Image = require("./Objects/Image");
const ImageOutput = require("./Objects/ImageOutput");
const Triangle = require("./Objects/Triangle");
const ObjReader = require("./Objects/ObjReader");
const Plane = require("./Objects/Plane");
const Ray = require("./Objects/Ray");

const screen = new Screen(100, 100, Math.PI / 2);
const sphere1 = new Sphere(new Point(50, 50, 4), 10);
const sphere2 = new Sphere(new Point(70, 60, 20), 10);
const triangle = new Triangle(new Point(30, 40, 10), new Point(30, 60, 10), new Point(50, 50, 1));
const camera = new Camera(screen.width / 2, screen.height / 2, -screen.width / 5);
const light = new Light(new Vector(1, 1, -1));
const image = new Image(
    screen.width,
    screen.height,
    new Array(screen.height).fill(null).map(() => new Array(screen.width).fill(null).map(() => new Pixel({r: 0, g: 0, b: 0}, -1)))
)

const objects = ObjReader.readObj("cow.obj", screen);
let lowerPoint = Infinity;
let plane;
for(let triangle of objects) {
    lowerPoint = Math.min(lowerPoint, triangle.vert1.y, triangle.vert2.y, triangle.vert3.y);
    plane = new Plane(new Vector(0, 1, 0), new Point(0, lowerPoint, 0));
}
objects.push(plane);

for (let y = screen.height - 1; y >= 0; y--) {
    for (let x = 0; x < screen.width; x++) {
        const intersection = getNearestIntersection(objects, x, y);
        choosePixelColor(x, y, intersection)
    }
}

ImageOutput.consoleLog(image, "cow");

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
        if(!isShadow(intersection.intersectionPoint)) {
            const normal = intersection.object.getNorm(intersection.intersectionPoint);
            image.pixels[y][x].intensity = light.scalarMultiple(normal);
        } else {
            image.pixels[y][x].intensity = 0
        }
        image.pixels[y][x].setGrayColor();
    }
}

function isShadow(point) {
    if(point.y === lowerPoint) {
        const ray = new Ray(point, point.normalize().subtract(light.numberMultiple(-1)));
        return !!getFastIntersection(ray);
    }
}

function getFastIntersection(ray) {
    for (let object of objects) {
        const intersection = object.intersect(ray);
        if(!intersection || !Triangle.prototype.isPrototypeOf(object)) {
            continue;
        }
        return new Intersection(intersection, object);
    }
    return null;
}
