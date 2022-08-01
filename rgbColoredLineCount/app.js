var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var moveXText = "moveX";
var moveYText = "moveY";
var lineXText = "lineX";
var lineYText = "lineY";
var redText = "rgbRedCount";
var greenText = "rgbGreenCount";
var blueText = "rgbBlueCount";

rgbColoredLineToCenter();

function rgbColoredLineToCenter() {
  moveX = canvasBorders(prompt(moveXText),canvasWidth,moveXText,moveXText);
  moveY = canvasBordersI(prompt(moveYText),moveX,canvasHeight,canvasWidth,moveYText,moveXText,moveYText);
  lineX = canvasBorders(prompt(lineXText),canvasWidth,lineXText,lineXText);
  lineY = canvasBordersI(prompt(lineYText),lineX,canvasHeight,canvasWidth,lineYText,lineXText,lineYText);
  context.beginPath();
  context.moveTo(posX, posY);
  context.lineTo(lineX,lineY);
  red = rgbColorCountBorders(redText,prompt(redText),redText);
  green = rgbColorCountBorders(greenText,prompt(greenText),greenText);
  blue = rgbColorCountBorders(blueText,prompt(blueText),blueText);
  rgbStrokeStyle(red,green,blue);
  context.stroke();
}

function rgbStrokeStyle(red,green,blue) {
  context.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function canvasBorders(i,I,canvas,K) {
  Ł = 0;
  while ((i < Ł) || (i > I)) {
    alert(countBordersText(canvas,i,Ł,I));
    i = prompt(K);
  }
  return i;
}

function canvasBordersI(i,i1,I,I1,canvas,canvas1,K) {
  Ł = 0;
  while ((i < Ł) || (i > I)) {
    alert(countBordersText(canvas,i,Ł,I));
    canvasBorders(i1,I1,canvas1);
    i = prompt(K);
  }
  return i;
}

function rgbColorCountBorders(rgbColorCount,count,i) {
  Ł = 0;
  K = 255;
  while ((count < Ł) || (count > K)) {
    alert(countBordersText(rgbColorCount,count,Ł,K));
    count = prompt(i);
  }
  return count;
}

function countBordersText(text,count,min,max) {
  return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
}
