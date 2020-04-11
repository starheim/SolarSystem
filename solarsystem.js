var canvas;
var width;
var height;
var ctx;
var bodies = [];
var G = 0.01;
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
    bodies.push(new SolarSystemObject(width/2, height/2, 1600, 40, "yellow", "Sun")); //The Sun

    bodies.push(new SolarSystemObject(width/2 - 50, height/2, 0.1, 5, "#cd7f32", "Mercury"));  //Mercury
    bodies.push(new SolarSystemObject(width/2 - 120, height/2, 2, 9, "orange", "Venus"));   //Venus
    bodies.push(new SolarSystemObject(width/2 - 200, height/2, 3, 10, "blue", "Earth"));   //Earth
    bodies.push(new SolarSystemObject(width/2 - 300, height/2, 5, 5, "red", "Mars"));   //Mars
    bodies.push(new SolarSystemObject(width/2 - 450, height/2, 10, 15, "brown", "Jupiter"));   //Jupiter
    
    //Set initial velocity of planets
    bodies[1].vy = 0.6;
    bodies[2].vy = 0.35;
    bodies[3].vy = 0.28;
    bodies[4].vy = 0.23;
    bodies[5].vy = 0.2;
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

function SolarSystemObject(x, y, m, d, col, name){
    this.px = x;
    this.py = y;
    this.m = m;
    this.d = d;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
    this.col = col;
    this.name = name;

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

        this.drawObjectInfo(ctx);        
    };

    this.drawObjectInfo = function(ctx){
        ctx.fillStyle = "white";
        ctx.font = "14px Comic Sans MS";
        ctx.fillText(this.name, this.px + this.d, this.py + this.d);
    };
}