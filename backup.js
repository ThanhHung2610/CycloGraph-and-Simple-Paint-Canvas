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
let currentBg = "white";
// Tool currently using
let currentTool = 'brush';
let currentFillColor = 'green';
// List of shapes
let shapesList = new Array();
// Temp shape to handle draw current shape
let shapeCur;
// Flag to handle painting event
let drawing = false;
let done = true;
// free = true;

// Save position of mouse event
let mouseDownPos;
let mouseMovePos;

let brushPoints = new Array(Point);

let rotatedAngle = null;
// Number of Sides of the polygon
let poolygonSides = 6;

let canvas;
let ctx;
let canvasHeight = 600;
let canvasWidth = 500;


// load page ->
document.addEventListener('DOMContentLoaded', setupCanvas());

document.getElementById('bgcolorpicker').addEventListener('input',function(){
    currentColor = this.value;
});

document.getElementById('colorpicker').addEventListener('input',function(){
    currentBg = this.value;
});


document.ChangeTool = function ChangeTool(toolClicked){
    document.getElementById("open").className = "";
    document.getElementById("save").className = "";
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
    ctx.fillStyle =  currentBg;
    ctx.fillRect(0, 0,  canvas.width,  canvas.height);

    // Draw shapes List
    let n =  shapesList.length;
    alert(n);
    for (let i = 0; i < n; i++){
         shapesList[i].draw(ctx);
    }
}

function drawCurrentShape(){
    canvas.strokeStyle=currentColor;
    canvas.strokeColor=currentColor;    
    ctx.fillStyle = currentBg;
    if( currentTool === "brush"){
        // Create paint brush
        shapeCur = new brush(mouseDownPos,null,line_Width,currentColor,null,false,brushPoints);
        shapeCur.draw(ctx);
    }else if( currentTool === "line"){
        // Creates line
        shapeCur = new line(mouseDownPos,mouseMovePos,line_Width,currentColor,null,false);
        shapeCur.draw(ctx);
    } else if(currentTool === "rectangle"){
        // Creates rectangles
        shapeCur = new rectangle(mouseDownPos,mouseMovePos,line_Width,currentColor,null,false);
        shapeCur.draw(ctx);
    } else if(currentTool === "circle"){
       // Creates circle
       shapeCur = new circle(mouseDownPos,mouseMovePos,line_Width,currentColor,null,false);
       shapeCur.draw(ctx);
    } else if(currentTool === "ellipse"){
        // Create ellipses
        shapeCur = new ellipse(mouseDownPos,mouseMovePos,line_Width,currentColor,'red',false,0);
        shapeCur.draw(ctx);
    } else if(currentTool === "polygon"){
        shapeCur = new polygon(mouseDownPos,mouseMovePos,line_Width,currentColor,null,false);
        shapeCur.draw(ctx);
    }  
}

    function SaveCanvasImage(){
    // Save image
    savedImageData =  ctx.getImageData(0,0,canvas.width,canvas.height);
    }

    function RedrawCanvasImage(){
        drawCanvas();
        ctx.strokeStyle =  currentColor;
        ctx.lineWidth =  line_Width;
        ctx.fillStyle =  currentBg;
    }

    function ReactToMouseDown(e){
    // Change the mouse pointer to a crosshair
        canvas.style.cursor = "crosshair";

        ctx.strokeStyle=currentColor;

    // Store location 
        mouseDownPos = GetMousePosition(e.clientX, e.clientY, canvas);

    // Store that yes the mouse is being held down
    drawing = true;

    // Brush will store points in an array
    if( currentTool === 'brush'){
            brushPoints.push( mouseDownPos);
    }
    };

function ReactToMouseMove(e){
    // canvas.style.cursor = "crosshair";
    mouseMovePos = GetMousePosition(e.clientX, e.clientY,  canvas);
    if (drawing){
        // If using brush tool and dragging store each point
        if( currentTool === 'brush'){
            // Throw away brush drawings that occur outside of the canvas
            if( mouseMovePos.x > 0 &&  mouseMovePos.x < canvasWidth &&  mouseMovePos.y > 0 &&  mouseMovePos.y < canvasHeight){
                brushPoints.push( mouseMovePos);
            }
        //RedrawCanvasImage();
        drawCurrentShape();
        }
    }
};

function ReactToMouseUp(e){
   // canvas.style.cursor = "default";
    mouseDownPos = GetMousePosition(e.clientX, e.clientY,  canvas);
    if ( currentTool==='brush'){
        brushPoints.push( mouseMovePos);
    }
    drawCurrentShape();
    shapesList.push( shape);
    RedrawCanvasImage();
    brushPoints.splice(0, brushPoints.length);
    drawing = false;
};  