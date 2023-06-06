const Screen = require("./Objects/Screen");
const Pixel = require("./Objects/Pixel");
const Image = require("./Objects/Image");
const ImageWriter = require("./Objects/ImageWriter");
const ObjReader = require("./Objects/ObjReader");
const Tracer = require("./Objects/Tracer");

const objReader = new ObjReader();
const imageWriter = new ImageWriter();
const screen = new Screen(100, 100, Math.PI / 2);
process.env.WIDTH = screen.width;
process.env.HEIGHT = screen.height;
const image = new Image(
    screen.width,
    screen.height,
    new Array(screen.height).fill(null).map(() => new Array(screen.width).fill(null).map(() => new Pixel({r: 0, g: 0, b: 0}, -1)))
)
const tracer = new Tracer(objReader, imageWriter, screen, image);
tracer.run();