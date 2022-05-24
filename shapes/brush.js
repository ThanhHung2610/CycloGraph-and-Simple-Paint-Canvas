import { shape, Point } from "./shape.js";
class brush{
    constructor(size,color,listBrushPoints){

        this.size = size;
        this.color = color;
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
            CanvasContext.stroke();
        }
    }
}

export {brush};
