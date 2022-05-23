import {Point, shape} from "./shape.js";

class ellipse {
    constructor(start,end,size,color,fillColor,isFill,angle){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.angle = angle;
        this.radiusX = Math.abs(end.x-start.x);
        this.radiusY = Math.abs(end.y-start.y);
    }
    draw(CanvasContext){
        CanvasContext.strokeStyle = this.color;
        CanvasContext.lineWidth = this.size;
        CanvasContext.beginPath();
        CanvasContext.ellipse(this.start.x,this.start.y,this.radiusX,this.radiusY,this.angle,0,Math.PI*2);
        CanvasContext.stroke();
        if (this.isFill){
            CanvasContext.fillStyle =  this.fillColor;
            CanvasContext.fill();
        }
    }
}

export {ellipse};