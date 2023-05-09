const assert = require('assert');
const Sphere = require("./Objects/Sphere");
const Ray = require("./Objects/Ray");
const Point = require("./Objects/Point");
const Vector = require("./Objects/Vector");
const Camera = require("./Objects/Camera");
const Screen = require("./Objects/Screen");

const screen = new Screen(100, 100, Math.PI / 2);
const sphere = new Sphere(new Point(50, 50, 3), 1);
const camera = new Camera(50, 50, -1);

const testCastRay = () => {
  // Test 1: should return intersection point
  const ray1 = camera.getRay(screen, 50, 50);
  const intersect1 = new Point(
      Math.round(sphere.intersect(ray1).x),
      Math.round(sphere.intersect(ray1).y),
      Math.round(sphere.intersect(ray1).z)
  );
  assert.deepEqual(intersect1, new Point(50, 50, 2));

  // Test 2: should return null if no intersection
  const ray2 = new Ray(camera, new Vector(0, 0, 1));
  const intersect2 = sphere.intersect(ray2);
  assert.equal(intersect2, null);

  // Test 3: should work for non-zero camera position
  const sphere3 = new Sphere(new Point(50, 50, 10), 1);
  const ray3 = camera.getRay(screen, 50, 50);
  const intersect3 = new Point(
      Math.round(sphere3.intersect(ray3).x),
      Math.round(sphere3.intersect(ray3).y),
      Math.round(sphere3.intersect(ray3).z)
  );
  assert.deepEqual(intersect3, new Point(50, 50, 9));

  // Test 4: should return correct intersection point for oblique ray
  const sphere4 = new Sphere(new Point(50, 50, 1), 1);
  const camera4 = new Camera(0, 0, -1);
  const ray4 = camera.getRay(screen, 51, 51);
  const intersect4 = new Point(
      Math.round(sphere4.intersect(ray4).x),
      Math.round(sphere4.intersect(ray4).y),
      Math.round(sphere4.intersect(ray4).z)
  );
  assert.deepEqual(intersect4, new Point(50, 50, 0));

  console.log("All tests passed successfully!");
}

testCastRay();
