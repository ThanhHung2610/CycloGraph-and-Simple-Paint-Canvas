import { shape, Point } from "./shapes/shape.js";
import { brush } from "./shapes/brush.js";
import { line } from "./shapes/line.js";
import { ellipse } from "./shapes/ellipse.js";
import { polygon }  from "./shapes/polygon.js";
import { rectangle } from "./shapes/rectangle.js";
import {circle} from "./shapes/circle.js";

// Context provides functions used for drawing and 
// working with Canvas
let line_Width = 5;
let currentColor ="black" ;
//Background color
let currentBg = "#FFFFFF";
// Tool currently using
let currentTool = 'brush';
//Fill Color
let currentFillColor = "green";
// List of shapes
//let shapesList = new Array();
// Temp shape to handle draw current shape
let shapeCur = new shape();
// Flag to handle painting event
let drawing = false;

// Store position of mouse event
let mouseDownPos;
let mouseMovePos;
// List points of brush
let brushPoints = new Array(Point);

// Number of Sides of the polygon
let polygonSides = 6;

let canvas;
let ctx;
let canvasHeight = 500;
let canvasWidth = 1000;
// store flag eraser
let flagEraser=false;
let polySide;
let ColBackUp;


// Properties of cyclography drawing
let CGSides = 36, CGSide = 36;
//Center for CycloGraph
let CGcenter=new Point(500,250);


// Store canvas data
let saveImgdata;
// Fill mode
let isFill = false;
// Cyclograph Mode
let CGMode = false;
// HTML element show mouse position in canvas
let showMp;
// Load page ->
document.addEventListener('DOMContentLoaded', setupCanvas());

// Change background color
document.getElementById('bgcolorpicker').addEventListener('input',function(){
    let oldRed = parseInt(currentBg.substring(1,3),16);
    let oldGreen = parseInt(currentBg.substring(3,5),16);
    let oldBlue = parseInt(currentBg.substring(5,7),16);
    currentBg = this.value;
    let newRed = parseInt(currentBg.substring(1,3),16);
    let newGreen = parseInt(currentBg.substring(3,5),16);
    let newBlue = parseInt(currentBg.substring(5,7),16);

    // Update color if in erase mode
    if (flagEraser){
        currentColor=currentBg;
    }
    // loop canvas.data and change background color
    let data = saveImgdata.data;
    let n = data.length;   
    for(let i = 0; i < n-4; i+=4){
        if (data[i] === oldRed && data[i+1] === oldGreen && data[i+2] === oldBlue)
        {
            data[i]=newRed;
            data[i+1]=newGreen;
            data[i+2]=newBlue;
        }
    }
    RedrawCanvasImage();
});


document.getElementById('fillcolorpicker').addEventListener('input',function(){
    currentFillColor =this.value;
})

document.getElementById('colorpicker').addEventListener('input',function(){
    currentColor=this.value;
});

document.getElementById('controlSize').addEventListener('change', function() {
    line_Width = this.value;
    document.getElementById("showSize").innerHTML = this.value;
});

document.getElementById('eraser').addEventListener('click',function(){
    saveColor();
    flagEraser=true;
    currentColor= currentBg;
    currentTool='brush';
})

document.getElementById('clear').addEventListener('click',function(){
    drawCanvas();
})


function saveColor(){
    ColBackUp=currentColor;
}
// Change fill mode
document.getElementById("fillColor").addEventListener('click',function(){
    if(this.checked){
        isFill=true;
    }
    else{
        isFill=false;
    }
})

document.getElementById("polygonSide").addEventListener('change',function(){
    polySide = parseInt(this.value);
    if (polySide>360 || polySide<3){
        alert("Invalid Polygonside");
        this.value = polygonSides;
    }else{
        polygonSides=polySide;
    }
})


document.getElementById("CGSide").addEventListener('change',function(){
    CGSide = parseInt(this.value);
    if (CGSide>360 || CGSide<2){
        alert("Invalid side");
        this.value = CGSides;
    }else{
        CGSides = CGSide;
    }
})

// Change Cyclo Graph Mode
document.getElementById("CGMode").addEventListener('click',function(){
    if(this.checked){
        CGMode = true;
    }
    else{
        CGMode = false;
    }
})


document.getElementById('Xcord').addEventListener('change',function(){
    if(this.value<0 || this.value>canvasWidth){
        alert("X value out of canvas space")
    }else{
        CGcenter.x=this.value;
    }
})

document.getElementById('Ycord').addEventListener('change',function(){
    if(this.value<0 || this.value>canvasHeight){
        alert("Y value out of canvas space")
    }else{
        CGcenter.y=this.value;
    }
})



document.ChangeTool = function ChangeTool(toolClicked){
    if (flagEraser){
        currentColor = ColBackUp;
        flagEraser = false;
    }
    document.getElementById("brush").className = "";
    document.getElementById("line").className = "";
    document.getElementById("rectangle").className = "";
    document.getElementById("circle").className = "";
    document.getElementById("ellipse").className = "";
    document.getElementById("polygon").className = "";

    // Highlight the last selected tool on toolbar
    document.getElementById(toolClicked).className = "selected";
    // Change current tool used for drawing
    currentTool = toolClicked;
}



function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = canvas.getBoundingClientRect();
    let newx=(x - canvasSizeData.left) * ( canvas.width  / canvasSizeData.width);
    let newy= (y - canvasSizeData.top)  * ( canvas.height / canvasSizeData.height)
    let newPoint=new Point(newx,newy);
    return newPoint;
}


function setupCanvas(){

    // Get reference to canvas element
    canvas = document.getElementById('my-canvas');
    // Get methods for manipulating the canvas
    ctx = canvas.getContext('2d');
    // Get element shows mouse position
    showMp = document.getElementById("position");
    drawCanvas();
   // Execute ReactToMouseDown when the mouse is clicked
    canvas.addEventListener("mousedown",  ReactToMouseDown);
   // Execute ReactToMouseMove when the mouse is clicked
    canvas.addEventListener("mousemove",  ReactToMouseMove);
   // Execute ReactToMouseUp when the mouse is clicked
    canvas.addEventListener("mouseup",  ReactToMouseUp);
}


function drawCanvas(){
    // Draw background
    canvas.style.border = "1px solid";
    ctx.strokeStyle =  currentColor;
    ctx.lineWidth =  line_Width;
    ctx.lineCap = "round";
    ctx.fillStyle =  currentBg;
    ctx.fillRect(0, 0,  canvas.width,  canvas.height);
}

function drawCurrentShape(){
    canvas.strokeStyle=currentColor;
    canvas.strokeColor=currentColor;    
    ctx.fillStyle = currentBg;
    ctx.lineWidth =  line_Width;
    let shapeCur;


    if( currentTool === "brush"){
        // Create paint brush
        shapeCur = new brush(line_Width,currentColor,brushPoints);
        shapeCur.draw(ctx);
    }else if( currentTool === "line"){
        // Creates line
        shapeCur = new line(mouseDownPos,mouseMovePos,line_Width,currentColor,currentFillColor,isFill);
        shapeCur.draw(ctx);
    } else if(currentTool === "rectangle"){
        // Creates rectangles
        shapeCur = new rectangle(mouseDownPos,mouseMovePos,line_Width,currentColor,currentFillColor,isFill);
        shapeCur.draw(ctx);
    } else if(currentTool === "circle"){
       // Creates circle
       shapeCur = new circle(mouseDownPos,mouseMovePos,line_Width,currentColor,currentFillColor,isFill);
       shapeCur.draw(ctx);
    } else if(currentTool === "ellipse"){
        // Create ellipses
        shapeCur = new ellipse(mouseDownPos,mouseMovePos,line_Width,currentColor,currentFillColor,isFill,0);
        shapeCur.draw(ctx);
    } else if(currentTool === "polygon"){
        shapeCur = new polygon(mouseDownPos,mouseMovePos,line_Width,currentColor,currentFillColor,isFill,polygonSides);
        shapeCur.draw(ctx);
    }  
}


function drawCycloGraph(){
    canvas.strokeStyle=currentColor;
    canvas.strokeColor=currentColor;    
    ctx.fillStyle = currentBg;
    ctx.lineWidth =  line_Width;

    ctx.translate(CGcenter.x,CGcenter.y);
    let angle = 360/CGSides;
   
    let mousedownTrSlate=new Point(mouseDownPos.x-CGcenter.x,mouseDownPos.y-CGcenter.y);
    let mousemoveTrSlate=new Point(mouseMovePos.x-CGcenter.x,mouseMovePos.y-CGcenter.y);

    for(let i = 0;i < CGSides;i++){
        ctx.rotate(angle * Math.PI / 180);    
        if( currentTool === "brush"){
            let brushPointsTrSlate = [];
            let n = brushPoints.length;
            for(let i = 0; i < n; i++){
                brushPointsTrSlate.push(new Point(brushPoints[i].x - CGcenter.x, brushPoints[i].y - CGcenter.y));
            }
            // Create paint brush
            shapeCur = new brush(line_Width,currentColor,brushPointsTrSlate);
            shapeCur.draw(ctx);
        }else if( currentTool === "line"){
            // Creates line
            shapeCur = new line(mousedownTrSlate,mousemoveTrSlate,line_Width,currentColor,currentFillColor,isFill);
            shapeCur.draw(ctx);
        } else if(currentTool === "rectangle"){
            // Creates rectangles
            shapeCur = new rectangle(mousedownTrSlate,mousemoveTrSlate,line_Width,currentColor,currentFillColor,isFill);
            shapeCur.draw(ctx);
        } else if(currentTool === "circle"){
            // Creates circle
            shapeCur = new circle(mousedownTrSlate,mousemoveTrSlate,line_Width,currentColor,currentFillColor,isFill);
            shapeCur.draw(ctx);
        } else if(currentTool === "ellipse"){
            // Create ellipses
            shapeCur = new ellipse(mousedownTrSlate,mousemoveTrSlate,line_Width,currentColor,currentFillColor,isFill,0);
            shapeCur.draw(ctx);
        } else if(currentTool === "polygon"){
            shapeCur = new polygon(mousedownTrSlate,mousemoveTrSlate,line_Width,currentColor,currentFillColor,isFill,polygonSides);
            shapeCur.draw(ctx);
        }  
    }
    ctx.translate(-CGcenter.x,-CGcenter.y);    
}

function SaveCanvasImage(){
    // Save image
    saveImgdata = ctx.getImageData(0,0,canvasWidth,canvasHeight);
}
function RedrawCanvasImage(){
    // Restore image
    ctx.putImageData(saveImgdata,0,0);
    canvas.strokeStyle=currentColor;
}

function ReactToMouseDown(e){
    // Change the mouse pointer to a crosshair
    canvas.style.cursor = "crosshair";

    ctx.strokeStyle=currentColor;

    drawing=true;

    // Store location 
    mouseDownPos = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage()
    // Store that yes the mouse is being held down
    drawing = true;

    // Brush will store points in an array
    if( currentTool === 'brush'){
            brushPoints.push(mouseDownPos);
    }
};

function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    mouseMovePos = GetMousePosition(e.clientX, e.clientY);
    showMp.innerHTML = 'X = '+ parseInt(mouseMovePos.x)+', Y = '+parseInt(mouseMovePos.y);
    
    if (drawing){
        // If using brush tool and dragging store each point
        if( currentTool === 'brush'){
            // Throw away brush drawings that occur outside of the canvas
            if( mouseMovePos.x > 0 &&  mouseMovePos.x < canvasWidth &&  mouseMovePos.y > 0 &&  mouseMovePos.y < canvasHeight){
                brushPoints.push(mouseMovePos);
            }
        }
        RedrawCanvasImage();
        if(CGMode && !flagEraser){
            drawCycloGraph();
        }
        else drawCurrentShape();
    }
};

function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    mouseMovePos = GetMousePosition(e.clientX, e.clientY);
    if ( currentTool==='brush'){
        brushPoints.push( mouseMovePos);
    }
    drawing = false;
    //
    SaveCanvasImage();
    RedrawCanvasImage();
    drawCurrentShape();
    brushPoints.splice(0, brushPoints.length);
};  