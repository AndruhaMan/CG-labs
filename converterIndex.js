const ImageWriter = require("./Objects/ImageWriter");
const ImageReader = require("./Objects/ImageReader");
const Converter = require("./Objects/Converter");
const ReaderPPM = require("./Objects/Readers/ReaderPPM");
const ReaderBMP = require("./Objects/Readers/ReaderBMP");
const WriterPPM = require("./Objects/Writers/WriterPPM");
const WriterBMP = require("./Objects/Writers/WriterBMP");
const WriterConsole = require("./Objects/Writers/WriterConsole");


const readerPPM = new ReaderPPM();
const readerBMP = new ReaderBMP();
const writerPPM = new WriterPPM();
const writerBMP = new WriterBMP();
const writerConsole = new WriterConsole();
const imageReader = new ImageReader(readerPPM, readerBMP);
const imageWriter = new ImageWriter(writerPPM, writerBMP, writerConsole);


const converter = new Converter(imageReader, imageWriter);
converter.convert();