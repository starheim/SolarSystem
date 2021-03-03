var canvas;
var width = 1500;
var height = 1000;
var ctx;
var solarSystemObjects = [];
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
    case 82:
      solarSystemObjects = [];
      createObjects();
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
  ctx.fillText("Press F to toggle force vectors.", width / 2 - 110, 105);
  ctx.fillText("Press P to pause simualtion.", width / 2 - 100, 130);
  ctx.fillText("Press R to reset simualtion.", width / 2 - 100, 155);
}

function createObjects() {
  //Instantiate solar system objects
  solarSystemObjects.push(
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

  solarSystemObjects.push(
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
  solarSystemObjects.push(
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
  solarSystemObjects.push(
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
  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 270,
      height / 2,
      3,
      5,
      "red",
      "Mars",
      "planet"
    )
  ); //Mars
  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 450,
      height / 2,
      120,
      15,
      "brown",
      "Jupiter",
      "planet"
    )
  ); //Jupiter

  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 470,
      height / 2,
      0.001,
      3,
      "white",
      "Io",
      "satelite"
    )
  ); //Io
  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 475,
      height / 2,
      0.001,
      3,
      "white",
      "Europa",
      "satelite"
    )
  ); //Europa
  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 478,
      height / 2,
      0.001,
      3,
      "white",
      "Ganymede",
      "satelite"
    )
  ); //Ganymede
  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 480,
      height / 2,
      0.001,
      3,
      "white",
      "Callisto",
      "satelite"
    )
  ); //Callisto

  solarSystemObjects.push(
    new SolarSystemObject(
      width / 2 - 212,
      height / 2,
      0.001,
      3,
      "white",
      "Luna",
      "satelite"
    )
  ); //The Moon

  //Set initial velocity of planets
  solarSystemObjects[0].vy = -0.01;
  solarSystemObjects[1].vy = 0.6;
  solarSystemObjects[2].vy = 0.35;
  solarSystemObjects[3].vy = 0.28;
  solarSystemObjects[4].vy = 0.23;
  solarSystemObjects[5].vy = 0.2;
  solarSystemObjects[6].vy = 0.41;
  solarSystemObjects[7].vy = 0.4;
  solarSystemObjects[8].vy = 0.37;
  solarSystemObjects[9].vy = 0.37;
  solarSystemObjects[10].vy = 0.33;

  console.log(solarSystemObjects.length + " objects initiated successfully.");
}

function drawObjects() {
  for (var i = 0; i < solarSystemObjects.length; i++) {
    solarSystemObjects[i].drawObject(ctx);
    if (objectInfo) {
      /*ctx.fillStyle = "white";
        ctx.fillText(getObjectFromName(bodies[3].name).name, 100, 100);
        ctx.fillText("Velocity y-axis: " + getObjectFromName(bodies[3].name).vy, 100, 120);
        ctx.fillText("Velocity x-axis: " + getObjectFromName(bodies[3].name).vx, 100, 140);
        ctx.fillText(getObjectFromName(bodies[3].name).m, 100, 160);*/

      //Stats about all objects in the system
      ctx.fillStyle = "white";
      ctx.fillText(
          solarSystemObjects[i].name +
          " mass: " +
          solarSystemObjects[i].m +
          " diameter: " +
          solarSystemObjects[i].d,
        10,
        25 + 20 * i
      );

      solarSystemObjects[i].drawObjectInfo(ctx);
    }
    if (forceVectors) {
      solarSystemObjects[i].drawForceVector(ctx);
    }
  }
}

function updateForcesOnObject() {
  for (var i = 0; i < solarSystemObjects.length; i++) {
    solarSystemObjects[i].fx = 0;
    solarSystemObjects[i].fy = 0;
    for (var n = 0; n < solarSystemObjects.length; n++) {
      if (i != n) {
        solarSystemObjects[i].attraction(solarSystemObjects[n]);
      }
    }
  }
}

function updatePositionOfObjects() {
  for (var i = 0; i < solarSystemObjects.length; i++) {
    solarSystemObjects[i].update();
  }
}

function getObjectFromName(objectName) {
  return solarSystemObjects.find((element) => element.name == objectName);
}
