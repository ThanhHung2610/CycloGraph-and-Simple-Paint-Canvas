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

<<<<<<< HEAD
    draw(CanvasContext){
=======
    draw(CanvasContext);
}
>>>>>>> 304faed0a8724a7b788d1592220f2c1fb596e65a

    }
}
export {Point, shape};