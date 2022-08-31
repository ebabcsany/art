(function () {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var count = prompt('rgbColoredRandomLineToCenterCount');
  var redText = "rgbRedCount";
  var greenText = "rgbGreenCount";
  var blueText = "rgbBlueCount";

  rgbColoredRandomLineToCenterCount();

  function rgbColoredRandomLineToCenterCount() {
    for (let int = 1; int <= count; int++) {
      rgbColoredRandomLineToCenter();
    }
  }

  function rgbColoredRandomLineToCenter() {
    let posX = random(canvasWidth, 0);
    let posY = random(canvasHeight, 0);
    context.beginPath();
    let canvasWidthHalf = canvasWidth / 2;
    let canvasHeightHalf = canvasHeight / 2;
    let canvasWidthHalfOutOfPosX = canvasWidthHalf - posX;
    let canvasHeightHalfOutOfPosY = canvasHeightHalf - posY;
    context.moveTo(posX, posY);
    context.lineTo(canvasWidthHalf + canvasWidthHalfOutOfPosX, canvasHeightHalf + canvasHeightHalfOutOfPosY);
    let red = rgbColorCountBorders(redText, prompt(redText), redText);
    let green = rgbColorCountBorders(greenText, prompt(greenText), greenText);
    let blue = rgbColorCountBorders(blueText, prompt(blueText), blueText);
    rgbStrokeStyle(red, green, blue);
    context.stroke();
  }

  function rgbStrokeStyle(red, green, blue) {
    context.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  function rgbColorCountBorders(rgbColorCount, count, i) {
    let Ł = 0;
    let K = 255;
    while ((count < Ł) || (count > K)) {
      alert(countBordersText(rgbColorCount, count, Ł, K));
      count = prompt(i);
    }
    return count;
  }

  function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function countBordersText(text, count, min, max) {
    return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
  }
})();
