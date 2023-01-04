(function () {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const moveXText = "moveX";
  const moveYText = "moveY";
  const lineXText = "lineX";
  const lineYText = "lineY";
  const redText = "rgbRedCount";
  const greenText = "rgbGreenCount";
  const blueText = "rgbBlueCount";

  rgbColoredLineToCenter();

  function rgbColoredLineToCenter() {
    let moveX = canvasBorders(prompt(moveXText), canvasWidth, moveXText, moveXText);
    let moveY = canvasBordersI(prompt(moveYText), moveX, canvasHeight, canvasWidth, moveYText, moveXText, moveYText);
    let lineX = canvasBorders(prompt(lineXText), canvasWidth, lineXText, lineXText);
    let lineY = canvasBordersI(prompt(lineYText), lineX, canvasHeight, canvasWidth, lineYText, lineXText, lineYText);
    context.beginPath();
    context.moveTo(moveX, moveY);
    context.lineTo(lineX, lineY);
    let red = rgbColorCountBorders(redText, prompt(redText), redText);
    let green = rgbColorCountBorders(greenText, prompt(greenText), greenText);
    let blue = rgbColorCountBorders(blueText, prompt(blueText), blueText);
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
