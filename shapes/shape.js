class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class shape{
    constructor(start,end,size,color,fillColor,isFill){
        this.start = start;
        this.end = end;
        this.size = size;
        this.color = color;
        this.fillColor = fillColor;
        this.isFill = isFill;
    }

    showShape(CanvasContext);
}

export {Point, shape};