class SolarSystemObject{
    constructor(x, y, m, d, col, name, objectType){
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
        this.objectType = objectType;
        this.previousPoints = [];
    }

    attraction(otherObject){ 
        var r = this.distance(otherObject);
        var f = 0;
        if(r != 0) {
            f = (G*this.m*otherObject.m)/(Math.pow(r, 2));
        }
        var angle = Math.atan2(otherObject.py-this.py, otherObject.px-this.px);
        this.fx += f*Math.cos(angle);
        this.fy += f*Math.sin(angle);    
    }

    distance(otherObject){ 
        return Math.hypot(this.px-otherObject.px, this.py-otherObject.py);
    }

    update(){
        this.vx += (this.fx/this.m)*refreshRateMilliSeconds;
        this.vy += (this.fy/this.m)*refreshRateMilliSeconds;

        this.px += (this.vx * refreshRateMilliSeconds);
        this.py += (this.vy * refreshRateMilliSeconds);
    }

    drawObject(ctx, i){
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

        //this.drawObjectInfo(ctx);  
        this.drawForceVector(ctx);      
    }

    drawObjectInfo(ctx){
        ctx.fillStyle = "white";
        ctx.font = "14px Lucida Console";
        ctx.fillText(this.name, this.px + this.d, this.py + this.d);
    }

    drawForceVector(ctx){
        var angle = Math.atan2(this.fy, this.fx)
        var vectorLength = 25;
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.px + vectorLength*Math.cos(angle), this.py + vectorLength*Math.sin(angle));
        //ctx.moveTo(this.px + this.r*Math.cos(angle), this.py + this.r*Math.sin(angle));
        //ctx.lineTo(this.px + this.r*Math.cos(angle) + vectorLength*Math.cos(angle), this.py + this.r*Math.sin(angle) + vectorLength*Math.sin(angle));
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.strokeStyle = "black";
    }
}