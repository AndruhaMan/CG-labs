const Scene = require("../Objects/Scene");
const Sphere = require("../Objects/Sphere");
const Point = require("../Objects/Point");
const Triangle = require("../Objects/Triangle");
const Camera = require("../Objects/Camera");
const Light = require("../Objects/Light");
const Vector = require("../Objects/Vector");
const ObjReader = require("../Objects/ObjReader");
const Screen = require("../Objects/Screen");

const width = process.env.WIDTH;
const height = process.env.HEIGHT;

const screen = new Screen(100, 100, Math.PI / 2);

const sphere1 = new Sphere(new Point(50, 50, 4), 10);
const sphere2 = new Sphere(new Point(70, 60, 20), 10);
const triangle = new Triangle(new Point(30, 40, 5), new Point(30, 60, 10), new Point(50, 50, 1));
const camera = new Camera(width / 2, height / 2, -width / 5);
const light = new Light(new Vector(1, 1, -1));
const cow = ObjReader.readObj('cow.obj', screen);

module.exports = new Scene(camera, light, [sphere1, sphere2]);