import {shape} from "./shape.js";

class line{
    constructor(start,end,size,color,fillColor,isFill){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
    }
    draw(CanvasContext){
        CanvasContext.beginPath();
        CanvasContext.strokeStyle = this.color;
        CanvasContext.lineWidth = this.size;
        CanvasContext.moveTo(this.start.x,this.start.y);
        CanvasContext.lineTo(this.end.x, this.end.y);
        CanvasContext.closePath();
        CanvasContext.stroke();
    }
}

export {line};
