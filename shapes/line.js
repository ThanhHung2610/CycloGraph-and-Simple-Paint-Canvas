import {shape} from "./shape.js";

class line extends shape{
    constructor(start,end,size,color,fillColor,isFill){
        super(start,end,size,color,fillColor,isFill);
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