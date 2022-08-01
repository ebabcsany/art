var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var count = prompt("rgbColoredLineToCenterCount");
var posXText = "positionX";
var posYText = "positionY";
var redText = "rgbRedCount";
var greenText = "rgbGreenCount";
var blueText = "rgbBlueCount";

rgbColoredLineToCenterCount();

function rgbColoredLineToCenterCount() {
  for (i = 1; i <= count; i++) {
    rgbColoredLineToCenter();
  }
}

function rgbColoredLineToCenter() {
  posX = canvasBorders(prompt(posXText),canvasWidth,posXText,posXText);
  posY = canvasBordersI(prompt(posYText),posX,canvasHeight,canvasWidth,posYText,posXText,posYText);
  context.beginPath();
  canvasWidthHalf = canvasWidth/2;
  canvasHeightHalf = canvasHeight/2;
  canvasWidthHalfOutOfPosX = canvasWidthHalf - posX;
  canvasHeightHalfOutOfPosY = canvasHeightHalf - posY;
  context.moveTo(posX, posY);
  context.lineTo(canvasWidthHalf + canvasWidthHalfOutOfPosX,canvasHeightHalf + canvasHeightHalfOutOfPosY);
  red = rgbColorCountBorders(redText,prompt(redText),redText);
  green = rgbColorCountBorders(greenText,prompt(greenText),greenText);
  blue = rgbColorCountBorders(blueText,prompt(blueText),blueText);
  rgbStrokeStyle(red,green,blue);
  context.stroke();
}

function rgbStrokeStyle(red,green,blue) {
  context.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function canvasBorders(i,I,canvas) {
  Ł = 0;
  while ((i < Ł) || (i > I)) {
    alert(countBordersText(canvas,i,Ł,I));
    i = prompt(posXText);
  }
  return i;
}

function canvasBordersI(i,i1,I,I1,canvas,canvas1) {
  Ł = 0;
  while ((i < Ł) || (i > I)) {
    alert(countBordersText(canvas,i,Ł,I));
    canvasBorders(i1,I1,canvas1);
    i = prompt(posYText);
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
