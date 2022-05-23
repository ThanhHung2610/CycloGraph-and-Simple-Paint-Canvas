import {Point, shape} from "./shape.js";

class ellipse extends shape{
    constructor(start,end,size,color,fillColor,isFill,angle){
        super(start,end,size,color,fillColor,isFill);
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