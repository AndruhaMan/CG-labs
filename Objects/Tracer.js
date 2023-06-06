const Camera = require("./Camera");
const Light = require("./Light");
const Vector = require("./Vector");
const Plane = require("./Plane");
const Point = require("./Point");
const Intersection = require("./Intersection");
const Ray = require("./Ray");
module.exports = class Tracer {
    constructor(objReader, imageWriter, screen, image) {
        this.objReader = objReader;
        this.imageWriter = imageWriter;
        this.screen = screen;
        this.image = image
    }
    run() {
        const source = process.env.npm_config_source;
        const scene = process.env.npm_config_scene;
        const output = process.env.npm_config_output;
        const goalFormat = output.split('.')[1];

        let camera;
        let light;
        let objects;
        let scene_objects;

        if (source) {
            camera = new Camera(this.screen.width / 2, this.screen.height / 2, -this.screen.width / 5);
            light = new Light(new Vector(1, 1, -1));
            objects = this.objReader.readObj(source, this.screen);
        } else if (scene) {
            scene_objects = require(`../Input/${scene}`);
            camera = scene_objects.camera;
            light = scene_objects.light;
            objects = scene_objects.objects;
        }

        const lowerPoint = this.findLowerPoint(objects);
        objects.push(new Plane(new Vector(0, 1, 0), new Point(0, lowerPoint, 0)));

        for (let y = this.screen.height - 1; y >= 0; y--) {
            for (let x = 0; x < this.screen.width; x++) {
                const intersection = this.getNearestIntersection(x, y, objects, camera);
                this.choosePixelColor(x, y, intersection, light, lowerPoint, objects)
            }
        }

        this.imageWriter.writeFile(this.image, output, goalFormat);



    }

    getNearestIntersection(x, y, objects, camera) {
        const ray = camera.getRay(this.screen, x, y);
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

    choosePixelColor(x, y, intersection, light, lowerPoint, objects) {
        if(intersection.intersectionPoint) {
            if(!this.isShadow(intersection.intersectionPoint, lowerPoint, objects, light)) {
                const normal = intersection.object.getNorm(intersection.intersectionPoint);
                this.image.pixels[y][x].intensity = light.scalarMultiple(normal);
            } else {
                this.image.pixels[y][x].intensity = 0
            }
            this.image.pixels[y][x].setGrayColor();
        }
    }

    isShadow(point, lowerPoint, objects, light) {
        if(point.y === lowerPoint) {
            const ray = new Ray(point, light.numberMultiple(-1).subtract(point.normalize()));
            return !!this.getFastIntersection(ray, objects);
        }
    }

    getFastIntersection(ray, objects) {
        for (let object of objects) {
            const intersection = object.intersect(ray);
            if(!intersection) {
                continue;
            }
            return new Intersection(intersection, object);
        }
        return null;
    }

    findLowerPoint(objects) {
        let lowerPoint = Infinity;
        for(let object of objects) {
            lowerPoint = Math.min(object.getLowerPoint(), lowerPoint);
        }

        return lowerPoint;
    }
};