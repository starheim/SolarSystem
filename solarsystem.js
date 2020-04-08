var canvas;
var width;
var height;
var ctx;
var bodies = [];
var G = 1;

function run(){
    canvas = document.getElementById("canvas");
    width = 1200;
    height = 900;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText("REEEE, WORK YOU SHIT", 10, 50);   

    createObjects();

    ctx.beginPath();
    ctx.arc(300, 300, 50, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();

    setInterval(function(){
        drawObjects();
        updateForcesOnObject();
        updateObjectsPosition();
        ctx.clearRect(0,0,width,height);
    },10);
}

function createObjects(){
    bodies.push(new SolarSystemObject(width/2, height/2, 20, 1600)); //The Sun

    bodies.push(new SolarSystemObject(width/2 - 50, height/2, 20, 0.005, "#cd7f32"));  //Mercur
    bodies.push(new SolarSystemObject(width/2 - 100, height/2, 20, 0.01, "orange"));   //Venus
    bodies.push(new SolarSystemObject(width/2 - 150, height/2, 20, 0.02, "blue"));   //Earth
    bodies.push(new SolarSystemObject(width/2 - 225, height/2, 20, 0.05, "red"));   //Mars
    bodies.push(new SolarSystemObject(width/2 - 400, height/2, 20, 20, "brown"));   //Jupiter
    
    //Set initial velocity of planets
    bodies[1].vy = 0.64;
    bodies[2].vy = 0.8;
    bodies[3].vy = 1.2;
    bodies[4].vy = 1.7;
    bodies[5].vy = 2.3;
}

function drawObjects(){
    for(var i = 0; i < objects.length; i++){
        objects[i].drawObject(ctx);
    }
}

function updateForcesOnObject(){
    for(var i = 0; i < objects.length; i++){
        bodies[i].fx=0;
		bodies[i].fy=0;
        for(var j = 0; j < objects.length; i++){
            if(i != j){
                bodies[i].attraction(bodies[j]);q
            }
        }
    }
}

function updateObjectsPosition(){
    for(var i = 0; i < objects.length; i++){
        objects[i].update();
    }
}

function SolarSystemObject(x, y, m, d, col){
    this.m = m;
    this.px = x;
    this.py = y;
    this.d = d;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
    this.col = col;

    this.attraction = function(otherObject){
        var r = distance(otherObject);
        var f = 0;
        if(r != 0) {
            f = (G*this.m *otherObject.m)/(Math.pow(r, 2));
        }
        var angle = Math.atan2(otherObject.py-this.py, otherObject.px-this-px);
        this.fx += f*Math.cos(angle);
        this.fy += f*Math.cos(angle);
    };

    this.distance = function(otherObject){
        return Math.sqrt(Math.pow((px-otherObject.px), 2) + Math.pow((py-otherObject.py), 2));
    };

    this.update = function(){
        this.vx += (this.fx/this.m)*0.01;
        this.vy += (this.fy/this.m)*0.01;

        this.px += (this.vx * 0.01);
        this.py += (this.vy * 0.01);
    };

    this.drawObject = function(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.d/2, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = this.col;
        ctx.fill();
    };
}