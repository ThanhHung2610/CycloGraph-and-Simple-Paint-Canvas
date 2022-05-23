import { shape, Point } from "./shape.js";
class brush{
    constructor(start,end,size,color,fillColor,isFill,listBrushPoints){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.listBrushPoints = listBrushPoints;
    }
    draw(CanvasContext){
        CanvasContext.strokeStyle = this.color;
        let nPoints = this.listBrushPoints.length;
        for(let i = 1; i < nPoints; i++){
            // draw points in list
            CanvasContext.beginPath();
            CanvasContext.moveTo(this.listBrushPoints[i-1].x,this.listBrushPoints[i-1].y);
            CanvasContext.lineTo(this.listBrushPoints[i].x, this.listBrushPoints[i].y);
            CanvasContext.closePath();
            CanvasContext.stroke();
        }
    }
}

export {brush};
