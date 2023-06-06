const ImageWriter = require("./Objects/ImageWriter");
const ImageReader = require("./Objects/ImageReader");
const Converter = require("./Objects/Converter");

const imageReader = new ImageReader();
const imageWriter = new ImageWriter();


const converter = new Converter(imageReader, imageWriter);
converter.convert();