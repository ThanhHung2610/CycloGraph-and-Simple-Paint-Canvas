import { shape } from "./shape.js";

class polygon {

    constructor(start,end,size,color,fillColor,isFill){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
    }
    // Converts degrees to radians
    degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
    }

    radiansToDegrees(rad){
        if(rad < 0){
            // Correct the bottom error by adding the negative
            // angle to 360 to get the correct result around
            // the whole circle
            return (360.0 + (rad * (180 / Math.PI))).toFixed(2);
        } else {
            return (rad * (180 / Math.PI)).toFixed(2);
        }
    }
    

    // Get the polygon points and draw the polygon
    getPolygon(){
        let polygonPoints = getPolygonPoints();
        ctx.beginPath();
        ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
        for(let i = 1; i < polygonSides; i++){
            ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
        }
        ctx.closePath();
    }

    // Returns the angle using x and y
    // x = Adjacent Side
    // y = Opposite Side
    // Tan(Angle) = Opposite / Adjacent
    // Angle = ArcTan(Opposite / Adjacent)
    getAngleUsingXAndY(mouselocX, mouselocY){
        let adjacent = this.start.x - mouselocX;
        let opposite = this.start.y - mouselocY;
        return radiansToDegrees(Math.atan2(opposite, adjacent));
    }


    getPolygonPoints(){
        // Get angle in radians based on x & y of mouse location
        let angle =  degreesToRadians(getAngleUsingXAndY(this.end.x, this.end.y));
    
        // Stores all points in the polygon
        let polygonPoints = [];
    
        // Each point in the polygon is found by breaking the 
        // parts of the polygon into triangles
        // Then I can use the known angle and adjacent side length
        // to find the X = mouseLoc.x + radiusX * Sin(angle)
        // You find the Y = mouseLoc.y + radiusY * Cos(angle)
        let radius = Math.hypot(this.end.x-this.start.x,this.end.y-this.start.y);
        for(let i = 0; i < polygonSides; i++){
            polygonPoints.push(new PolygonPoint(this.start.x + radius * Math.sin(angle),
            this.start.y + radius * Math.cos(angle)));
    
            // 2 * PI equals 360 degrees
            // Divide 360 into parts based on how many polygon 
            // sides you want 
            angle += 2 * Math.PI / polygonSides;
        }
        return polygonPoints;
    }

    draw(CanvasContext){
        this.getPolygon();
        CanvasContext.stroke();
        if (this.isFill){
            CanvasContext.fillStyle =  this.fillColor;
            CanvasContext.fill();
        }
    }
}

export {polygon};