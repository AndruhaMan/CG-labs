const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");
const Light = require("./Objects/Light");
const Screen = require("./Objects/Screen");
const Intersection = require("./Objects/Intersection");
const Pixel = require("./Objects/Pixel");
const Image = require("./Objects/Image");
const ImageWriter = require("./Objects/ImageWriter");
const ObjReader = require("./Objects/ObjReader");
const Plane = require("./Objects/Plane");
const Ray = require("./Objects/Ray");

const source = process.env.npm_config_source;
const scene = process.env.npm_config_scene;
const output = process.env.npm_config_output;
const goalFormat = output.split('.')[1];

const screen = new Screen(100, 100, Math.PI / 2);
process.env.WIDTH = screen.width;
process.env.HEIGHT = screen.height;
const image = new Image(
    screen.width,
    screen.height,
    new Array(screen.height).fill(null).map(() => new Array(screen.width).fill(null).map(() => new Pixel({r: 0, g: 0, b: 0}, -1)))
)
let camera;
let light;
let objects;
let scene_objects;

if (source) {
    camera = new Camera(screen.width / 2, screen.height / 2, -screen.width / 5);
    light = new Light(new Vector(1, 1, -1));
    objects = ObjReader.readObj(source, screen);
} else if (scene) {
    scene_objects = require(`./Input/${scene}`);
    camera = scene_objects.camera;
    light = scene_objects.light;
    objects = scene_objects.objects;
}

const lowerPoint = findLowerPoint(objects);
objects.push(new Plane(new Vector(0, 1, 0), new Point(0, lowerPoint, 0)));

for (let y = screen.height - 1; y >= 0; y--) {
    for (let x = 0; x < screen.width; x++) {
        const intersection = getNearestIntersection(objects, x, y);
        choosePixelColor(x, y, intersection)
    }
}

ImageWriter.writeFile(image, output, goalFormat);


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
        const ray = new Ray(point, light.numberMultiple(-1).subtract(point.normalize()));
        return !!getFastIntersection(ray);
    }
}

function getFastIntersection(ray) {
    for (let object of objects) {
        const intersection = object.intersect(ray);
        if(!intersection) {
            continue;
        }
        return new Intersection(intersection, object);
    }
    return null;
}

function findLowerPoint(objects) {
    let lowerPoint = Infinity;
    for(let object of objects) {
        lowerPoint = Math.min(object.getLowerPoint(), lowerPoint);
    }

    return lowerPoint;
}