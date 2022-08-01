let isCanvasWidthInputClicked = false;
let isCanvasHeightInputClicked = false;
let isBackgroundColorInputClicked = false;
canvasWidthInput.addEventListener("click", function () {
    isCanvasWidthInputClicked = true;
});
canvasHeightInput.addEventListener("click", function () {
    isCanvasHeightInputClicked = true;
});
document.getElementById("background-color").addEventListener("click", function () {
    isBackgroundColorInputClicked = true;
});

function getPartOfWidth(width, partOfWidth) {
    return canvas.width / (width / partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return canvas.height / (height / partOfHeight);
}

function drawVerticalColoredLineWithWidthAndPartOfWidth(style, width, partOfWidth, moveY, lineY) {
    drawVerticalColoredLine(style, getPartOfWidth(width, partOfWidth), moveY, lineY);
}

function drawHorizontalColoredLineWithHeightAndPartOfHeight(style, moveX, lineX, height, partOfHeight) {
    drawHorizontalColoredLine(style, moveX, lineX, getPartOfHeight(height, partOfHeight));
}

function drawOctaveOfPianoVerticalSonkEditorLines(style, width, partOfWidthAndStart, moveY, lineY) {
    const listOfNumbersOfSpacesBetweenLines = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumbersOfSpacesBetweenLines.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumbersOfSpacesBetweenLines[counter] : 0), counter++) {
        drawVerticalColoredLineWithWidthAndPartOfWidth(style, width, i, moveY, lineY);
    }
}

function drawWholeKeyOfPiano(strokeStyle, fillStyle, x, y, width, height) {
    begin();
    defaultStrokeStyle(strokeStyle);
    defaultMoveTo(x, y);
    y += height;
    defaultLineTo(x, y);
    x += width;
    defaultLineTo(x, y);
    y -= height;
    defaultLineTo(x, y);
    defaultStroke();
    defaultFillStyle(fillStyle);
    fill();
}

function drawWholeKeyOctaveOfPiano(strokeStyle, fillStyle, Width, partOfWidthAndStart, fromY, toY) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += 17, counter++) {
        drawWholeKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(Width, i), fromY, i + getPartOfWidth(Width, 16), toY);
    }
}

function drawOctaveOfPiano(style, width, partOfWidthAndStart, moveY, lineY) {
    const listOfNumbersOfSpacesBetweenLines = [1];
    const maxLength = listOfNumbersOfSpacesBetweenLines.length;
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += 17, counter++) {
        drawVerticalColoredLineWithWidthAndPartOfWidth(style, width, i, moveY, lineY);
        fillWhiteRectWithCoordinates(width, i, moveY, lineY);
    }
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumbersOfSpacesBetweenLines[counter] : 0), counter++) {
        drawHorizontalColoredLineWithHeightAndPartOfHeight(style, moveX, lineX, width, i);
    }
}

function drawClassicPianoAndSonkEditorLines() {
    const backgroundColorInput = document.getElementById("background-color");
    const canvasTextItems = document.getElementsByTagName("canvas-text");
    const width = 834;
    const height = 912;
    const pianoTop = canvas.height * sevenEighths;
    const rgb50PercentGray = "rgb(64, 64, 64)";

    function partOfWidth(value) {
        return getPartOfWidth(width, value);
    }

    function partOfHeight(value) {
        return getPartOfHeight(height, value);
    }

    function drawVerticalSonkEditorLines() {
        function drawVertical50PercentGrayLineFrom0ToPianoTop(from) {
            drawVerticalColoredLineWithWidthAndPartOfWidth(rgb50PercentGray, width, from, 0, pianoTop);
        }

        function drawOctave(from) {
            drawOctaveOfPianoVerticalSonkEditorLines(rgb50PercentGray, width, from, 0, pianoTop);
        }

        drawVertical50PercentGrayLineFrom0ToPianoTop(0);
        drawVertical50PercentGrayLineFrom0ToPianoTop(14);
        drawVertical50PercentGrayLineFrom0ToPianoTop(22);
        for (let i = 33, counter = 0; counter < 7; i += 112, counter++) {
            drawOctave(i);
        }
        drawVertical50PercentGrayLineFrom0ToPianoTop(width);
    }

    function drawClassicPiano() {
        const heightMultiplySevenEighths = height * sevenEighths;

        function heightMultiplySevenEighthsAdd(value) {
            return heightMultiplySevenEighths + value;
        }

        function heightMultiplySevenEighthsAddWithPartOfHeightValue(value) {
            return heightMultiplySevenEighthsAdd(canvas.height / (height / value));
        }

        function drawHorizontalColoredLineFromAndTo(style, from, to, pos) {
            drawHorizontalColoredLine(style, from, to, canvas.height / (height / pos));
        }

        function drawHorizontalColoredLineFrom0AndToCanvasWidth(style, pos) {
            drawHorizontalColoredLineFromAndTo(style, 0, canvas.width, canvas.height / (height / pos));
        }

        function drawHorizontal50PercentGrayLineFrom0ToCanvasWidth(pos) {
            drawHorizontalColoredLineFrom0AndToCanvasWidth(rgb50PercentGray, pos);
        }

        function drawWholeKey(from) {
            drawWholeKeyOfPiano(rgb50PercentGray, white, from, canvas.height / (height / (height - 105)), canvas.width / (width / 16), canvas.height / (height / (height - 1)));
        }

        function drawOctave(from) {
            for (let j = from, counter = 0; counter < 7; j+=16, counter++) {
                drawWholeKey(partOfWidth(j));
            }
        }

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, 0, pianoTop + canvas.height / (height / posY), canvas.width, canvas.height / (height / rectHeight));
        }

        fillColoredRectWithPartOfHeight(rgb50PercentGray, 0, 1);
        fillColoredRectWithPartOfHeight("rgb(224, 224, 224)", 1, 3);
        fillColoredRectWithPartOfHeight("rgb(255, 255, 255)", 2, 1);
        fillColoredRectWithPartOfHeight("rgb(16, 16, 16)", 4, 5);
        fillColoredRectWithPartOfHeight("rgb(32, 32, 32)", 8, 1);
        drawWholeKey(partOfWidth(0));
        drawWholeKey(partOfWidth(16));
        let i = 33;
        for (let counter = 0; counter < 7; i+=112, counter++) {
            drawOctave(i);
        }
        drawWholeKey(partOfWidth(i));
        drawVerticalColoredLine(rgb50PercentGray, 0, pianoTop, canvas.height);
        drawVerticalColoredLine(rgb50PercentGray, canvas.width, pianoTop, canvas.height);
    }

    if (!isCanvasWidthInputClicked && !isCanvasHeightInputClicked) {
        setCanvasSize(Math.min(innerWidth, innerHeight) * threeQuarters);
    } else {
        setCanvasWidth(isCanvasWidthInputClicked ? canvasWidthInput.value : innerWidth * threeQuarters);
        setCanvasHeight(isCanvasHeightInputClicked ? canvasHeightInput.value : innerHeight * threeQuarters);
    }

    function setStyleColorAttributeCanvasTextItems(color) {
        for (let i = 0; i < canvasTextItems.length; i++) {
            canvasTextItems.item(i).setAttribute("style", "color: " + color);
        }
        document.getElementById("canvas-width").style.color = color;
        document.getElementById("canvas-height").style.color = color;
    }

    document.body.style.backgroundColor = !isBackgroundColorInputClicked ? white : backgroundColorInput.value;
    document.getElementById("canvas-width").style.backgroundColor = backgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = backgroundColorInput.value;
    setStyleColorAttributeCanvasTextItems(getReverseHex(backgroundColorInput.value));
    lineWidth(canvas.width / width);
    drawVerticalSonkEditorLines();
    drawClassicPiano();
}

if (canvas.title === "sonk") {
    window.setInterval(drawClassicPianoAndSonkEditorLines, 1);
}
