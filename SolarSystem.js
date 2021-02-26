var canvas;
var width = 1500;
var height = 1000;
var ctx;
var bodies = [];
var G = 0.01;
var refreshRateMilliSeconds = 1;
var objectInfo = false;
var forceVectors = false;
var pauseSimulation = false;

function run() {
  canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  createObjects();
  document.addEventListener("keydown", keyPush);

  setInterval(updateFrame, refreshRateMilliSeconds);
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 66:
      objectInfo = !objectInfo;
      break;
    case 80:
      pauseSimulation = !pauseSimulation;
      break;
    case 70:
      forceVectors = !forceVectors;
      break;
  }
}

function updateFrame() {
  if (pauseSimulation == false) {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, width, height);

    drawTitle();
    drawPracticalInfo();
    drawObjects();
    updateForcesOnObject();
    updatePositionOfObjects();
  }
}

function drawTitle() {
  ctx.fillStyle = "orange";
  ctx.font = "20px Lucida Console";
  ctx.fillText("The Solar System", width / 2 - 90, 50);
}

function drawPracticalInfo() {
  ctx.fillStyle = "orange";
  ctx.font = "14px Lucida Console";
  ctx.fillText(
    "Press B to toggle information about the solar system objects.",
    width / 2 - 220,
    80
  );
  ctx.fillText("Press F to toggle force vectors.", width / 2 - 110, 110);
  ctx.fillText("Press P to pause simualtion.", width / 2 - 100, 140);
}

function createObjects() {
  //Instantiate solar system objects
  bodies.push(
    new SolarSystemObject(
      width / 2,
      height / 2,
      1600,
      40,
      "yellow",
      "Sun",
      "star"
    )
  ); //The Sun

  bodies.push(
    new SolarSystemObject(
      width / 2 - 50,
      height / 2,
      0.1,
      5,
      "#cd7f32",
      "Mercury",
      "planet"
    )
  ); //Mercury
  bodies.push(
    new SolarSystemObject(
      width / 2 - 120,
      height / 2,
      2,
      9,
      "orange",
      "Venus",
      "planet"
    )
  ); //Venus
  bodies.push(
    new SolarSystemObject(
      width / 2 - 200,
      height / 2,
      5,
      10,
      "blue",
      "Earth",
      "planet"
    )
  ); //Earth
  bodies.push(
    new SolarSystemObject(
      width / 2 - 300,
      height / 2,
      5,
      5,
      "red",
      "Mars",
      "planet"
    )
  ); //Mars
  bodies.push(
    new SolarSystemObject(
      width / 2 - 450,
      height / 2,
      30,
      15,
      "brown",
      "Jupiter",
      "planet"
    )
  ); //Jupiter

  bodies.push(
    new SolarSystemObject(
      width / 2 - 466,
      height / 2,
      0.001,
      3,
      "white",
      "Io",
      "satelite"
    )
  ); //Io
  bodies.push(
    new SolarSystemObject(
      width / 2 - 470,
      height / 2,
      0.001,
      3,
      "white",
      "Europa",
      "satelite"
    )
  ); //Europa
  bodies.push(
    new SolarSystemObject(
      width / 2 - 475,
      height / 2,
      0.001,
      3,
      "white",
      "Ganymede",
      "satelite"
    )
  ); //Ganymede
  bodies.push(
    new SolarSystemObject(
      width / 2 - 478,
      height / 2,
      0.001,
      3,
      "white",
      "Callisto",
      "satelite"
    )
  ); //Callisto

  bodies.push(
    new SolarSystemObject(
      width / 2 - 213,
      height / 2,
      0.001,
      3,
      "white",
      "Luna",
      "satelite"
    )
  ); //The Moon

  //Set initial velocity of planets
  bodies[0].vy = -0.005;
  bodies[1].vy = 0.6;
  bodies[2].vy = 0.35;
  bodies[3].vy = 0.28;
  bodies[4].vy = 0.23;
  bodies[5].vy = 0.2;
  bodies[6].vy = 0.33;
  bodies[7].vy = 0.3;
  bodies[8].vy = 0.3;
  bodies[9].vy = 0.3;
  bodies[10].vy = 0.322;

  console.log(bodies.length + " objects initiated successfully.");
}

function drawObjects() {
  for (var i = 0; i < bodies.length; i++) {
    bodies[i].drawObject(ctx);
    if (objectInfo) {
      /*ctx.fillStyle = "white";
        ctx.fillText(getObjectFromName(bodies[3].name).name, 100, 100);
        ctx.fillText("Velocity y-axis: " + getObjectFromName(bodies[3].name).vy, 100, 120);
        ctx.fillText("Velocity x-axis: " + getObjectFromName(bodies[3].name).vx, 100, 140);
        ctx.fillText(getObjectFromName(bodies[3].name).m, 100, 160);*/

      //Stats about all objects in the system
      ctx.fillStyle = "white";
      ctx.fillText(
          bodies[i].name +
          " mass: " +
          bodies[i].m +
          " diameter: " +
          bodies[i].d,
        10,
        25 + 20 * i
      );

      bodies[i].drawObjectInfo(ctx);
    }
    if (forceVectors) {
      bodies[i].drawForceVector(ctx);
    }
  }
}

function updateForcesOnObject() {
  for (var i = 0; i < bodies.length; i++) {
    bodies[i].fx = 0;
    bodies[i].fy = 0;
    for (var n = 0; n < bodies.length; n++) {
      if (i != n) {
        bodies[i].attraction(bodies[n]);
      }
    }
  }
}

function updatePositionOfObjects() {
  for (var i = 0; i < bodies.length; i++) {
    bodies[i].update();
  }
}

function getObjectFromName(objectName) {
  return bodies.find((element) => element.name == objectName);
}
