(function () {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const lineCount = prompt('line count');

  function randomRgbColoredLineToCenterCount() {
    for (let int = 0; int < lineCount; int++) {
      rgbColoredLineToCenterRandom();
    }
  }

  function rgbColoredLineToCenterRandom() {
    rgbColoredLineToCenter(randomWithMax(canvasWidth), randomWithMax(canvasHeight), randomWithMax(255), randomWithMax(255), randomWithMax(255));
  }

  function rgbColoredLineToCenter(posX, posY, red, green, blue) {
    context.beginPath();
    let canvasWidthHalf = canvasWidth / 2;
    let canvasHeightHalf = canvasHeight / 2;
    let canvasWidthHalfOutOfPosX = canvasWidthHalf - posX;
    let canvasHeightHalfOutOfPosY = canvasHeightHalf - posY;
    context.moveTo(posX, posY);
    context.lineTo(canvasWidthHalf + canvasWidthHalfOutOfPosX, canvasHeightHalf + canvasHeightHalfOutOfPosY);
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
})();
