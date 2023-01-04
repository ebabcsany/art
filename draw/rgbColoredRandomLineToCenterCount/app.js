(function () {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const count = prompt('rgbColoredRandomLineToCenterCount');
  const redText = "rgbRedCount";
  const greenText = "rgbGreenCount";
  const blueText = "rgbBlueCount";

  rgbColoredRandomLineToCenterCount();

  function rgbColoredRandomLineToCenterCount() {
    for (let int = 1; int <= count; int++) {
      rgbColoredRandomLineToCenter();
    }
  }

  function rgbColoredRandomLineToCenter() {
    const posX = random(canvasWidth, 0);
    const posY = random(canvasHeight, 0);
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

  function rgbColorCountBorders(rgbColorCount, count, i) {
    let L = 0;
    let K = 255;
    while ((count < L) || (count > K)) {
      alert(countBordersText(rgbColorCount, count, L, K));
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
