var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var lineCount = prompt('line count');

function randomRgbColoredLineToCenterCount() {
  for (int = 0; int < lineCount; int++) {
    rgbColoredLineToCenterRandom();
  }
}

function rgbColoredLineToCenterRandom() {
  rgbColoredLineToCenter(randomWithMax(canvasWidth), randomWithMax(canvasHeight), randomWithMax(255), randomWithMax(255), randomWithMax(255));
}

function rgbColoredLineToCenter(posX, posY, red, green, blue) {
  context.beginPath();
  canvasWidthHalf = canvasWidth/2;
  canvasHeightHalf = canvasHeight/2;
  canvasWidthHalfOutOfPosX = canvasWidthHalf - posX;
  canvasHeightHalfOutOfPosY = canvasHeightHalf - posY;
  context.moveTo(posX, posY);
  context.lineTo(canvasWidthHalf + canvasWidthHalfOutOfPosX,canvasHeightHalf + canvasHeightHalfOutOfPosY);
  context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ')';
  context.stroke();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomWithMax(max) {
    return random(0, max);
}

randomRgbColoredLineToCenterCount();