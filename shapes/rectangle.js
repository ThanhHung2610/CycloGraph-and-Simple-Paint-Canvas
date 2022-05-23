import {Point, shape} from "./shape.js";
import { line } from "./line.js";

class rectangle {
    constructor(start,end,size,color,fillColor,isFill){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.height=Math.abs(end.x-start.x);
        this.width=Math.abs(end.y-start.y);
        
        if (start.x>end.x){
            this.left = end.x;

        }else{
            this.left=start.x;
        }

        if(start.y>end.y){
            this.top=end.y;
        }else{
            this.top=start.y;
        } 
    }
    draw(CanvasContext){
        CanvasContext.strokeStyle=this.color;
        CanvasContext.lineWidth = this.size;
        CanvasContext.beginPath();
        CanvasContext.strokeRect(this.left,this.top,this.width,this.height);
        if (this.isFill){
            CanvasContext.fillStyle =  this.fillColor;
            CanvasContext.fill();
        }
    }
}

export {rectangle};