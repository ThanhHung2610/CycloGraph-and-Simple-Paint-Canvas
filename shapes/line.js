<<<<<<< HEAD
import {shape} from "./shape.js";
=======
import { shape } from "./shape.js";
>>>>>>> 304faed0a8724a7b788d1592220f2c1fb596e65a

class line extends shape{
    constructor(start,end,size,color,fillColor,isFill){
        super(start,end,size,color,fillColor,isFill);
    }
    draw(CanvasContext){
<<<<<<< HEAD
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
=======
        CanvasContext.strokeStyle = this.color;
        
        CanvasContext.beginPath();
        CanvasContext.moveTo(start.x,start.y);
        CanvasContext.lineTo(end.x, end.y);
        CanvasContext.closePath();
        CanvasContext.stroke();
    }
}
>>>>>>> 304faed0a8724a7b788d1592220f2c1fb596e65a
