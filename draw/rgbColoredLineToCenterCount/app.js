(function () {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const count = prompt("rgbColoredLineToCenterCount");
  const posXText = "positionX";
  const posYText = "positionY";
  const redText = "rgbRedCount";
  const greenText = "rgbGreenCount";
  const blueText = "rgbBlueCount";

  rgbColoredLineToCenterCount();

  function rgbColoredLineToCenterCount() {
    for (let i = 1; i <= count; i++) {
      rgbColoredLineToCenter();
    }
  }

  function rgbColoredLineToCenter() {
    let posX = canvasBorders(prompt(posXText), canvasWidth, posXText, posXText);
    let posY = canvasBordersI(prompt(posYText), posX, canvasHeight, canvasWidth, posYText, posXText, posYText);
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

  function canvasBorders(i, I, canvas) {
    let L = 0;
    while ((i < L) || (i > I)) {
      alert(countBordersText(canvas, i, L, I));
      i = prompt(posXText);
    }
    return i;
  }

  function canvasBordersI(i, i1, I, I1, canvas, canvas1) {
    let L = 0;
    while ((i < L) || (i > I)) {
      alert(countBordersText(canvas, i, L, I));
      canvasBorders(i1, I1, canvas1);
      i = prompt(posYText);
    }
    return i;
  }

  function rgbColorCountBorders(rgbColorCount, count, i) {
    let L = 0;
    let K = 255;
    while ((count < L) || (count > K)) {
      alert(countBordersText(rgbColorCount, count, L, K));
      count = prompt(i);
    }
    return count;
  }

  function countBordersText(text, count, min, max) {
    return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
  }
})();
