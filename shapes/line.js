import { shape } from "./shape.js";

class line extends shape{
    constructor(start,end,size,color,fillColor,isFill){
        super(start,end,size,color,fillColor,isFill);
    }
    draw(CanvasContext){
        CanvasContext.strokeStyle = this.color;
        
        CanvasContext.beginPath();
        CanvasContext.moveTo(start.x,start.y);
        CanvasContext.lineTo(end.x, end.y);
        CanvasContext.closePath();
        CanvasContext.stroke();
    }
}