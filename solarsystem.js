var canvas;
var width;
var height;
var ctx;
var bodies = [];
var G = 0.1;
var refreshRateMilliSeconds = 1; 

function run(){
    canvas = document.getElementById("canvas");
    width = 1500;
    height = 900;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "white";

    createObjects();

    setInterval(function(){
        ctx.fillStyle = "black";
        ctx.clearRect(0,0,width,height);

        ctx.fillStyle = "orange";
        ctx.fillText("The Solar System", width/2-90, 50); 

        drawObjects(); 
        updateForcesOnObject();
        updatePositionOfObjects();

    },refreshRateMilliSeconds);
}

function createObjects(){
    //Instantiate solar system objects
    bodies.push(new SolarSystemObject(width/2, height/2, 1600, 40, "yellow")); //The Sun

    bodies.push(new SolarSystemObject(width/2 - 50, height/2, 1, 5, "#cd7f32"));  //Mercury
    bodies.push(new SolarSystemObject(width/2 - 100, height/2, 10, 9, "orange"));   //Venus
    bodies.push(new SolarSystemObject(width/2 - 150, height/2, 20, 10, "blue"));   //Earth
    bodies.push(new SolarSystemObject(width/2 - 225, height/2, 5, 5, "red"));   //Mars
    bodies.push(new SolarSystemObject(width/2 - 400, height/2, 50, 15, "brown"));   //Jupiter
    
    //Set initial velocity of planets
    bodies[1].vy = 2;
    bodies[2].vy = 1.5;
    bodies[3].vy = 0.8;
    bodies[4].vy = 0.7;
    bodies[5].vy = 0.5;
}

function drawObjects(){
    for(var i = 0; i < bodies.length; i++){
        bodies[i].drawObject(ctx, i);
    }
}

function updateForcesOnObject(){
    for(var i = 0; i < bodies.length; i++){
        bodies[i].fx=0;
		bodies[i].fy=0;
        for(var n = 0; n < bodies.length; n++){
            if(i != n){
                bodies[i].attraction(bodies[n]);
            }
        }
    }
}

function updatePositionOfObjects(){
    for(var i = 0; i < bodies.length; i++){
        bodies[i].update();
    }
}

function SolarSystemObject(x, y, m, d, col){
    this.px = x;
    this.py = y;
    this.m = m;
    this.d = d;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
    this.col = col;

    this.attraction = function(otherObject){ 
        var r = this.distance(otherObject);
        var f = 0;
        if(r != 0) {
            f = (G*this.m*otherObject.m)/(Math.pow(r, 2));
        }
        var angle = Math.atan2(otherObject.py-this.py, otherObject.px-this.px);
        this.fx += f*Math.cos(angle);
        this.fy += f*Math.sin(angle);    
    };

    this.distance = function(otherObject){ 
        return Math.hypot(this.px-otherObject.px, this.py-otherObject.py);
    };

    this.update = function(){
        this.vx += (this.fx/this.m)*refreshRateMilliSeconds;
        this.vy += (this.fy/this.m)*refreshRateMilliSeconds;

        this.px += (this.vx * refreshRateMilliSeconds);
        this.py += (this.vy * refreshRateMilliSeconds);
    };

    this.drawObject = function(ctx, i){

        //Stats about all objects in the system
        /*ctx.fillStyle = this.col;
        ctx.fillText("IS IT WORKING NOW???? " + 
        " heigth: " + height + 
        " width: " + width + 
        " mass: " + this.m + 
        " diameter: " + this.d + 
        "  fx: " +  this.fx + 
        " fy:" + this.fy
        , 10, 150 + 30 * i);*/
     
        ctx.beginPath();
        ctx.arc(this.px, this.py, this.d/2, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = this.col;
        ctx.fill();
        
    };
}