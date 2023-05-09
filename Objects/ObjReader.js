const fs = require("fs");
const Point = require("./Point");
const Triangle = require("./Triangle");

class ObjReader {
    readObj(filename, screen) {
        const fileContent = fs.readFileSync(filename, "utf-8");
        let listOfPoints = [];
        let triangles = [];
        for (let string of fileContent.split("\r\n")) {
            if(string[0] === "v" && string[1] === " ") {
                const coordinates = string.split(" ").slice(1);
                listOfPoints.push(new Point(
                    parseFloat(coordinates[0]) * screen.width/10 + screen.width/2,
                    parseFloat(coordinates[2]) * screen.width/10 + screen.width/2,
                    -parseFloat(coordinates[1]) * screen.width/10 - screen.width/8));
            }
            if(string[0] === "f") {
                const points = string.split(" ").slice(1).map((value) => value.split("/")[0]);
                triangles.push(new Triangle(
                    listOfPoints[parseInt(points[0])-1],
                    listOfPoints[parseInt(points[1])-1],
                    listOfPoints[parseInt(points[2])-1]
                ));
            }
        }
        return triangles;
    }
}

module.exports = new ObjReader();