const Scene = require("../Objects/Scene");
const Sphere = require("../Objects/Sphere");
const Point = require("../Objects/Point");
const Triangle = require("../Objects/Triangle");
const Camera = require("../Objects/Camera");
const VectorLight = require("../Objects/VectorLight");
const Vector = require("../Objects/Vector");
const ObjReader = require("../Objects/ObjReader");
const Screen = require("../Objects/Screen");
const PointLight = require("../Objects/PointLight");

const width = process.env.WIDTH;
const height = process.env.HEIGHT;
const objReader = new ObjReader();

const screen = new Screen(100, 100, Math.PI / 2);

const sphere1 = new Sphere(new Point(50, 50, 4), 10);
const sphere2 = new Sphere(new Point(70, 60, 20), 10);
const triangle = new Triangle(new Point(30, 40, 5), new Point(30, 60, 10), new Point(50, 50, 1));
const camera = new Camera(width / 2, height / 2, -width / 5);
const lights = [new PointLight(50, 100, 4)];
const cow = objReader.readObj('cow.obj', screen);

module.exports = new Scene(camera, lights, [sphere1, sphere2]);