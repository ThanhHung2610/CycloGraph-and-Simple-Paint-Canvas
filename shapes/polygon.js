import { Point } from "./shape.js";
 // Converts degrees to radians
function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(rad){
    return (rad * (180 / Math.PI)).toFixed(2);
}

// Returns the angle using x and y
    // x = Adjacent Side
    // y = Opposite Side
    // Tan(Angle) = Opposite / Adjacent
    // Angle = ArcTan(Opposite / Adjacent)
function  getAngleUsingXAndY(start,end){
    let sadjacent = end.x - start.x;
    let opposite = end.y - start.y;
    return radiansToDegrees(Math.atan2(opposite, sadjacent));
}

function getPolygonPoints(start,end,polygonSides){
    // Get angle in radians based on x & y of mouse location
    let angle =  degreesToRadians(getAngleUsingXAndY(start,end));

    // Stores all points in the polygon
    let polygonPoints = [];

    // Each point in the polygon is found by breaking the 
    // parts of the polygon into triangles
    // Then I can use the known angle and adjacent side length
    // to find the X = mouseLoc.x + radiusX * Sin(angle)
    // You find the Y = mouseLoc.y + radiusY * Cos(angle)
    let radius = Math.hypot(end.x-start.x,end.y-start.y);
    for(let i = 0; i < polygonSides; i++){
        polygonPoints.push(new Point(start.x + radius * Math.cos(angle),
        start.y + radius * Math.sin(angle)));

        // 2 * PI equals 360 degrees
        // Divide 360 into parts based on how many polygon 
        // sides you want 
        angle += 2 * Math.PI / polygonSides;
    }
    return polygonPoints;
}


class polygon {

    constructor(start,end,size,color,fillColor,isFill, polygonSides){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.polygonSides=polygonSides;
        this.polygonPoints=getPolygonPoints(start,end,polygonSides);
    }

    draw(CanvasContext){
        CanvasContext.beginPath();
        CanvasContext.moveTo(this.polygonPoints[0].x, this.polygonPoints[0].y);

        for(let i = 1; i < this.polygonSides; i++){
            CanvasContext.lineTo(this.polygonPoints[i].x, this.polygonPoints[i].y);
        }

        CanvasContext.closePath();
        CanvasContext.stroke();
        if (this.isFill){
            CanvasContext.fillStyle =  this.fillColor;
            CanvasContext.fill();
        }
    }
}

export {polygon};