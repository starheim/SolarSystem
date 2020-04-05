var canvas;
var width;
var heigth;
var ctx;
var objects=[];

function run(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    crateObjects();

    setInterval(function(){
        drawObjects();
        updateObjectsVelocity()
        updateObjectsPosition()
    }
}

function createObjects(){
    bodies.push(new Object)
}

function Object(xCoordinate, yCoordinate, ){

}