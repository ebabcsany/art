(function () {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const posXText = "positionX";
  const posYText = "positionY";
  const redText = "rgbRedCount";
  const greenText = "rgbGreenCount";
  const blueText = "rgbBlueCount";

  rgbColoredLineToCenter();

  function rgbColoredLineToCenter() {
    const posX = canvasBorders(prompt(posXText), canvasWidth, posXText, posXText);
    const posY = canvasBordersI(prompt(posYText), posX, canvasHeight, canvasWidth, posYText, posXText, posYText);
    context.beginPath();
    const canvasWidthHalf = canvasWidth / 2;
    const canvasHeightHalf = canvasHeight / 2;
    const canvasWidthHalfOutOfPosX = canvasWidthHalf - posX;
    const canvasHeightHalfOutOfPosY = canvasHeightHalf - posY;
    context.moveTo(posX, posY);
    context.lineTo(canvasWidthHalf + canvasWidthHalfOutOfPosX, canvasHeightHalf + canvasHeightHalfOutOfPosY);
    const red = rgbColorCountBorders(redText, prompt(redText), redText);
    const green = rgbColorCountBorders(greenText, prompt(greenText), greenText);
    const blue = rgbColorCountBorders(blueText, prompt(blueText), blueText);
    rgbStrokeStyle(red, green, blue);
    context.stroke();
  }

  function rgbStrokeStyle(red, green, blue) {
    context.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  function canvasBorders(i, I, canvas, K) {
    let L = 0;
    while ((i < L) || (i > I)) {
      alert(countBordersText(canvas, i, L, I));
      i = prompt(K);
    }
    return i;
  }

  function canvasBordersI(i, i1, I, I1, canvas, canvas1, K) {
    let L = 0;
    while ((i < L) || (i > I)) {
      alert(countBordersText(canvas, i, L, I));
      canvasBorders(i1, I1, canvas1);
      i = prompt(K);
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
