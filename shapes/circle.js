import {Point, shape} from "./shape.js";

class circle {
    constructor(start,end,size,color,fillColor,isFill){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.radius = Math.hypot(end.x-start.x,end.y-start.y);
    }
    
    draw(CanvasContext){
        CanvasContext.strokeStyle = this.color;
        CanvasContext.lineWidth = this.size;
        CanvasContext.beginPath();
        CanvasContext.arc(this.start.x,this.start.y,this.radius,0,Math.PI*2);
        CanvasContext.stroke();
        if (this.isFill){
            CanvasContext.fillStyle =  this.fillColor;
            CanvasContext.fill();
        }
    }
}

export {circle};