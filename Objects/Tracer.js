const Camera = require("./Camera");
const VectorLight = require("./VectorLight");
const Vector = require("./Vector");
const Plane = require("./Plane");
const Point = require("./Point");
const Intersection = require("./Intersection");
const Ray = require("./Ray");
const PointLight = require("./PointLight");
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
        let lights;
        let objects;
        let scene_objects;

        if (source) {
            camera = new Camera(this.screen.width / 2, this.screen.height / 2, -this.screen.width / 5);
            lights = [
                new PointLight(0, this.screen.height, -this.screen.width / 5, 0.5, {r: 219, g: 69, b: 73}),
                new PointLight(this.screen.width * 0.8, this.screen.height, -this.screen.width / 5, 0.9, {r: 219, g: 232, b: 73})];
            objects = this.objReader.readObj(source, this.screen);
        } else if (scene) {
            scene_objects = require(`../Input/${scene}`);
            camera = scene_objects.camera;
            lights = scene_objects.light;
            objects = scene_objects.objects;
        }

        const lowerPoint = this.findLowerPoint(objects);
        objects.push(new Plane(new Vector(0, 1, 0), new Point(0, lowerPoint, 0)));

        for (let y = this.screen.height - 1; y >= 0; y--) {
            for (let x = 0; x < this.screen.width; x++) {
                const intersection = this.getNearestIntersection(x, y, objects, camera);
                this.choosePixelColor(x, y, intersection, lights, lowerPoint, objects)
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

    choosePixelColor(x, y, intersection, lights, lowerPoint, objects) {
        if(intersection.intersectionPoint) {
            if(!this.isShadow(intersection.intersectionPoint, lowerPoint, objects, lights)) {
                const normal = intersection.object.getNorm(intersection.intersectionPoint);
                let intensity = 0;
                let color = {
                    r: 0,
                    g: 0,
                    b: 0
                };
                for (let light of lights) {
                    let colorIntensity = 0;
                    if (light.constructor.name === "PointLight") {
                        colorIntensity = light.subtract(intersection.intersectionPoint).normalize().scalarMultiple(normal);
                    } else if (light.constructor.name === "VectorLight") {
                        colorIntensity = light.scalarMultiple(normal);
                    }
                    if (colorIntensity < 0) colorIntensity = 0;
                    else if (colorIntensity > 1) colorIntensity = 1;
                    const pixelIntensity = (colorIntensity * light.intensity);
                    intensity += pixelIntensity;
                    color.r += light.color.r * pixelIntensity;
                    color.g += light.color.g * pixelIntensity;
                    color.b += light.color.b * pixelIntensity;
                }
                color.r /= lights.length;
                color.g /= lights.length;
                color.b /= lights.length;
                if (intensity < 0) this.image.pixels[y][x].intensity = 0;
                else if (intensity > 1) this.image.pixels[y][x].intensity = 1;
                else this.image.pixels[y][x].intensity = intensity;
                this.image.pixels[y][x].color = color;
            } else {
                this.image.pixels[y][x].intensity = 0
            }
        }
    }

    isShadow(point, lowerPoint, objects, lights) {
        if(point.y === lowerPoint) {
            let isShadow = true;
            for (let light of lights) {
                const ray = new Ray(point, light.numberMultiple(-1).subtract(point.normalize()));
                if (!this.getFastIntersection(ray, objects)) isShadow = false;
            }
            return isShadow;
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