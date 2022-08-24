window.canvas = getElementById("piano-song-editor");
window.context = canvas.getContext("2d");
const canvasInputsButton = getElementById("canvas-inputs-button");
const canvasInputsResetColorsPart = getElementById("canvas-inputs-reset-colors-part");
const canvasInputsResetColorsButton = getElementById("canvas-inputs-reset-colors-button");
const canvasInputs = getElementById("canvas-inputs");
const canvasBorderColorInput = getElementById("canvas-border-color");
const canvasBackgroundColorInput = getElementById("canvas-background-color");
const canvasPianoSongEditorLinesColorInput = getElementById("canvas-piano-song-editor-lines-color");
const canvasPianoInputsButton = getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = getElementById("canvas-piano-inputs");
const canvasPianoTopMustUpperPartColorInput = getElementById("canvas-piano-top-most-upper-part-color");
const canvasPianoTopUpperPartColorInput = getElementById("canvas-piano-top-upper-part-color");
const canvasPianoTopUpperPartCenterColorInput = getElementById("canvas-piano-top-upper-part-center-color");
const canvasPianoTopLowerPartColorInput = getElementById("canvas-piano-top-lower-part-color");
const canvasPianoTopMustLowerPartColorInput = getElementById("canvas-piano-top-must-lower-part-color");
const canvasPianoSeparatingSpacesOfKeysColorInput = getElementById("canvas-piano-separating-spaces-of-keys-color");
const canvasPianoWholeKeyColorInput = getElementById("canvas-piano-whole-key-color");
const canvasPianoHalfKeyColorInput = getElementById("canvas-piano-half-key-color");
const backgroundColorInput = getElementById("background-color");
const reloadTimeInput = getElementById("reload-time");
const reloadTimeSubmitButton = getElementById("reload-time-submit-button");
const canvasTextItems = document.getElementsByTagName("canvas-text");
const defaultCanvasBorderColorValue = canvasBorderColorInput.value;
const defaultCanvasBackgroundColorValue = canvasBackgroundColorInput.value;
const defaultCanvasPianoSongEditorLinesColorValue = canvasPianoSongEditorLinesColorInput.value;
const defaultCanvasPianoTopMustUpperPartColorValue = canvasPianoTopMustUpperPartColorInput.value;
const defaultCanvasPianoTopUpperPartColorValue = canvasPianoTopUpperPartColorInput.value;
const defaultCanvasPianoTopUpperPartCenterColorValue = canvasPianoTopUpperPartCenterColorInput.value;
const defaultCanvasPianoTopLowerPartColorValue = canvasPianoTopLowerPartColorInput.value;
const defaultCanvasPianoTopMustLowerPartColorValue = canvasPianoTopMustLowerPartColorInput.value;
const defaultCanvasPianoSeparatingSpacesOfKeysColorValue = canvasPianoSeparatingSpacesOfKeysColorInput;
const defaultCanvasPianoWholeKeyColorValue = canvasPianoWholeKeyColorInput.value;
const defaultCanvasPianoHalfKeyColorValue = canvasPianoHalfKeyColorInput.value;
const defaultBackgroundColorValue = backgroundColorInput.value;
let allWindowClickCount = 0;
let savedAllWindowClickedCountWhenCanvasClicked = 0;
let savedAllWindowClickedCountWhenBackgroundColorInputClicked = 0;
/**
 * <strong>if this parameters are greater than 0</strong>
 * <ul>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">0</code>]: <code style="color: #7f008f">{@link window}</code><co,ode></code>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">1</code>]: <code style="color: #7f008f">{@link canvasWidthInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">2</code>]: <code style="color: #7f008f">{@link canvasHeightInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">3</code>]: <code style="color: #7f008f">{@link canvas}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">4</code>]: <code style="color: #7f008f">{@link canvasInputsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">5</code>]: <code style="color: #7f008f">{@link canvasInputsResetColorsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">6</code>]: <code style="color: #7f008f">{@link canvasBorderColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">7</code>]: <code style="color: #7f008f">{@link canvasBackgroundColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">8</code>]: <code style="color: #7f008f">{@link canvasPianoSongEditorLinesColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">9</code>]: <code style="color: #7f008f">{@link canvasPianoInputsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">10</code>]: <code style="color: #7f008f">{@link canvasPianoInputsResetColorsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">11</code>]: <code style="color: #7f008f">{@link canvasPianoTopMustUpperPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">12</code>]: <code style="color: #7f008f">{@link canvasPianoTopUpperPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">13</code>]: <code style="color: #7f008f">{@link canvasPianoTopUpperPartCenterColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">14</code>]: <code style="color: #7f008f">{@link canvasPianoTopLowerPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">15</code>]: <code style="color: #7f008f">{@link canvasPianoTopMustLowerPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">16</code>]: <code style="color: #7f008f">{@link canvasPianoSeparatingSpacesOfKeysColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">17</code>]: <code style="color: #7f008f">{@link canvasPianoWholeKeyColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">18</code>]: <code style="color: #7f008f">{@link canvasPianoHalfKeyColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">19</code>]: <code style="color: #7f008f">{@link backgroundColorInput}</code>,</code></p>
 * </ul>
 */
let allClickedElementsAndCount = createArrayOfOneObject(0, 20);
let savedAllClickedElementsAndCount = allClickedElementsAndCount;
let savedClickedElementAndIndexAndCount = [HTMLElement, 0, 0];
let savedLineWidth = 0;
let windowClickCount = 0;
let canvasClickCount = 0;
let canvasWidthInputClickCount = 0;
let canvasHeightInputClickCount = 0;
let canvasInputsButtonClickCount = 0;
let canvasInputsResetColorsButtonClickCount = 0;
let canvasBorderColorInputClickCount = 0;
let canvasBackgroundColorInputClickCount = 0;
let canvasPianoSongEditorLinesColorInputClickCount = 0;
let canvasPianoInputsButtonClickCount = 0;
let canvasPianoInputsResetColorsButtonClickCount = 0;
let canvasPianoTopMustUpperPartColorInputClickCount = 0;
let canvasPianoTopUpperPartColorInputClickCount = 0;
let canvasPianoTopUpperPartCenterColorInputClickCount = 0;
let canvasPianoTopLowerPartColorInputClickCount = 0;
let canvasPianoTopMustLowerPartColorInputClickCount = 0;
let canvasPianoSeparatingSpacesOfKeysColorInputClickCount = 0;
let canvasPianoWholeKeyColorInputClickCount = 0;
let canvasPianoHalfKeyColorInputClickCount = 0;
let backgroundColorInputClickCount = 0;
let isWindowClicked = false;
let isCanvasClicked = false;
let isCanvasWidthInputClicked = false;
let isCanvasHeightInputClicked = false;
let isCanvasInputsButtonClicked = false;
let isCanvasInputsResetColorsButtonClicked = false;
let isCanvasBorderColorInputClicked = false;
let isCanvasBackgroundColorInputClicked = false;
let isCanvasPianoSongEditorLinesColorInputClicked = false;
let isCanvasPianoInputsButtonClicked = false;
let isCanvasPianoInputsResetColorsButtonClicked = false;
let isCanvasPianoTopMustUpperPartColorInputClicked = false;
let isCanvasPianoTopUpperPartColorInputClicked = false;
let isCanvasPianoTopUpperPartCenterColorInputClicked = false;
let isCanvasPianoTopLowerPartColorInputClicked = false;
let isCanvasPianoTopMustLowerPartColorInputClicked = false;
let isCanvasPianoSeparatingSpacesOfKeysColorInputClicked = false;
let isCanvasPianoWholeKeyColorInputClicked = false;
let isCanvasPianoHalfKeyColorInputClicked = false;
let isBackgroundColorInputClicked = false;
let isCanvasAndBackgroundColorInputClicked = false;
let isBackgroundColorInputAndCanvasClicked = false;
let isCanvasListener = false;
let isCanvasInputsHidden = true;
let isCanvasPianoInputsHidden = true;
let isCanvasInputsVisible = false;
let isCanvasPianoInputsVisible = false;
let savedCanvasMousePos = {
    x: 0,
    y: 0
}
window.addEventListener("click", function () {
    allWindowClickCount++;
    allClickedElementsAndCount[0]++;
    windowClickCount++;
    savedAllClickedElementsAndCount = allClickedElementsAndCount;
    savedClickedElementAndIndexAndCount = [window.toString(), 0, canvasClickCount];
    isCanvasClicked = false;
    isCanvasInputsButtonClicked = false;
    isCanvasInputsResetColorsButtonClicked = false;
    isCanvasBorderColorInputClicked = false;
    isCanvasBackgroundColorInputClicked = false;
    isCanvasPianoSongEditorLinesColorInputClicked = false;
    isCanvasPianoInputsButtonClicked = false;
    isCanvasPianoInputsResetColorsButtonClicked = false;
    isCanvasPianoTopMustUpperPartColorInputClicked = false;
    isCanvasPianoTopUpperPartColorInputClicked = false;
    isCanvasPianoTopUpperPartCenterColorInputClicked = false;
    isCanvasPianoTopLowerPartColorInputClicked = false;
    isCanvasPianoTopMustLowerPartColorInputClicked = false;
    isCanvasPianoSeparatingSpacesOfKeysColorInputClicked = false;
    isCanvasPianoWholeKeyColorInputClicked = false;
    isCanvasPianoHalfKeyColorInputClicked = false;
    isBackgroundColorInputClicked = false;
    isWindowClicked = true;
}, true);
canvasWidthInput.onclick = function () {
    defaultNotWindowClicked();
    canvasWidthInputClickCount++;
    allClickedElementsAndCount[1]++;
    savedAllClickedElementsAndCount = allClickedElementsAndCount;
    savedClickedElementAndIndexAndCount = [this.id, 1, canvasWidthInputClickCount];
    isCanvasWidthInputClicked = true;
};
canvasHeightInput.onclick = function () {
    defaultNotWindowClicked();
    canvasHeightInputClickCount++;
    allClickedElementsAndCount[2]++;
    savedAllClickedElementsAndCount = allClickedElementsAndCount;
    savedClickedElementAndIndexAndCount = [this.id, 2, canvasHeightInputClickCount];
    isCanvasHeightInputClicked = true;
};
canvas.onclick = function () {
    defaultNotWindowClicked();
    canvasClickCount++;
    allClickedElementsAndCount[3]++;
    savedClickedElementAndIndexAndCount = [this.id, 3, canvasClickCount];
    savedAllWindowClickedCountWhenCanvasClicked = allWindowClickCount;
    isCanvasClicked = true;
    isCanvasInputsButtonClicked = false;
    isCanvasPianoInputsButtonClicked = false;
    if ((savedAllWindowClickedCountWhenBackgroundColorInputClicked + 1) === savedAllWindowClickedCountWhenCanvasClicked) {
        isCanvasAndBackgroundColorInputClicked = true;
    }
    savedCanvasMousePos.x = getCanvasMousePos().x;
    savedCanvasMousePos.y = getCanvasMousePos().y;
};
canvasInputsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasInputsButtonClickCount++;
    allClickedElementsAndCount[4]++;
    savedClickedElementAndIndexAndCount = [this.id, 4, canvasInputsButtonClickCount];
    isCanvasInputsButtonClicked = true;
    isCanvasInputsHidden = canvasInputs.hidden = !canvasInputs.hidden;
    isCanvasInputsVisible = !canvasInputs.hidden;
    if (isCanvasInputsHidden) {
        isCanvasPianoInputsHidden = canvasPianoInputs.hidden = true;
        isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
    }
};
canvasInputsResetColorsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasInputsResetColorsButtonClickCount++;
    allClickedElementsAndCount[5]++;
    savedClickedElementAndIndexAndCount = [this.id, 5, canvasInputsResetColorsButtonClickCount];
    isCanvasPianoInputsResetColorsButtonClicked = true;
    setCanvasInputs();
}
canvasBorderColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasBorderColorInputClickCount++;
    allClickedElementsAndCount[6]++;
    savedClickedElementAndIndexAndCount = [this.id, 6, canvasBorderColorInputClickCount];
    isCanvasBorderColorInputClicked = true;
};
canvasBackgroundColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasBackgroundColorInputClickCount++;
    allClickedElementsAndCount[7]++;
    savedClickedElementAndIndexAndCount = [this.id, 7, canvasBackgroundColorInputClickCount];
    isCanvasBackgroundColorInputClicked = true;
};
canvasPianoSongEditorLinesColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoSongEditorLinesColorInputClickCount++;
    allClickedElementsAndCount[8]++;
    savedClickedElementAndIndexAndCount = [this.id, 8, canvasPianoSongEditorLinesColorInputClickCount];
    isCanvasPianoSongEditorLinesColorInputClicked = true;
};
canvasPianoInputsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoInputsButtonClickCount++;
    allClickedElementsAndCount[9]++;
    savedClickedElementAndIndexAndCount = [this.id, 9, canvasInputsButtonClickCount];
    isCanvasPianoInputsButtonClicked = true;
    isCanvasPianoInputsHidden = canvasPianoInputs.hidden = !canvasPianoInputs.hidden;
    isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
};
canvasPianoInputsResetColorsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoInputsResetColorsButtonClickCount++;
    allClickedElementsAndCount[10]++;
    savedClickedElementAndIndexAndCount = [this.id, 10, canvasPianoInputsResetColorsButtonClickCount];
    isCanvasPianoInputsResetColorsButtonClicked = true;
    setCanvasPianoInputs();
}
canvasPianoTopMustUpperPartColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoTopMustUpperPartColorInputClickCount++;
    allClickedElementsAndCount[11]++;
    savedClickedElementAndIndexAndCount = [this.id, 11, canvasPianoTopMustUpperPartColorInputClickCount];
    isCanvasPianoTopMustUpperPartColorInputClicked = true;
};
canvasPianoTopUpperPartColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoTopUpperPartColorInputClickCount++;
    allClickedElementsAndCount[12]++;
    savedClickedElementAndIndexAndCount = [this.id, 12, canvasPianoTopUpperPartColorInputClickCount];
    isCanvasPianoTopUpperPartColorInputClicked = true;
};
canvasPianoTopUpperPartCenterColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoTopUpperPartCenterColorInputClickCount++;
    allClickedElementsAndCount[13]++;
    savedClickedElementAndIndexAndCount = [this.id, 13, canvasPianoTopUpperPartCenterColorInputClickCount];
    isCanvasPianoTopUpperPartCenterColorInputClicked = true;
};
canvasPianoTopLowerPartColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoTopLowerPartColorInputClickCount++;
    allClickedElementsAndCount[14]++;
    savedClickedElementAndIndexAndCount = [this.id, 14, canvasPianoTopLowerPartColorInputClickCount];
    isCanvasPianoTopLowerPartColorInputClicked = true;
};
canvasPianoTopMustLowerPartColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoTopMustLowerPartColorInputClickCount++;
    allClickedElementsAndCount[15]++;
    savedClickedElementAndIndexAndCount = [this.id, 15, canvasPianoTopMustLowerPartColorInputClickCount];
    isCanvasPianoTopMustLowerPartColorInputClicked = true;
};
canvasPianoSeparatingSpacesOfKeysColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoSeparatingSpacesOfKeysColorInputClickCount++;
    allClickedElementsAndCount[16]++;
    savedClickedElementAndIndexAndCount = [this.id, 16, canvasPianoSeparatingSpacesOfKeysColorInputClickCount];
    isCanvasPianoSeparatingSpacesOfKeysColorInputClicked = true;
};
canvasPianoWholeKeyColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoWholeKeyColorInputClickCount++;
    allClickedElementsAndCount[17]++;
    savedClickedElementAndIndexAndCount = [this.id, 17, canvasPianoWholeKeyColorInputClickCount];
    isCanvasPianoWholeKeyColorInputClicked = true;
};
canvasPianoHalfKeyColorInput.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoHalfKeyColorInputClickCount++;
    allClickedElementsAndCount[18]++;
    savedClickedElementAndIndexAndCount = [this.id, 18, canvasPianoHalfKeyColorInputClickCount];
    isCanvasPianoHalfKeyColorInputClicked = true;
};
backgroundColorInput.onclick = function () {
    defaultNotWindowClicked();
    backgroundColorInputClickCount++;
    allClickedElementsAndCount[19]++;
    savedClickedElementAndIndexAndCount = [this.id, 19, backgroundColorInputClickCount];
    savedAllWindowClickedCountWhenBackgroundColorInputClicked = allWindowClickCount;
    isBackgroundColorInputClicked = true;
    if ((savedAllWindowClickedCountWhenCanvasClicked + 1) === savedAllWindowClickedCountWhenBackgroundColorInputClicked) {
        isBackgroundColorInputAndCanvasClicked = true;
    }
};
reloadTimeInput.onclick = function () {
    defaultNotWindowClicked();
};
reloadTimeSubmitButton.onclick = function () {
    defaultNotWindowClicked();
    main(isEmptyString(reloadTimeInput.value) ? 0 : reloadTimeInput.value);
}

//function createsTheFieldsAssociatedWithTheElement() {
//
//}

function defaultNotWindowClicked() {
    windowClickCount--;
    allClickedElementsAndCount[0]--;
    isWindowClicked = false;
}

function setCanvasInputs() {
    canvasBorderColorInput.value = defaultCanvasBorderColorValue;
    canvasBackgroundColorInput.value = defaultCanvasBackgroundColorValue;
    canvasPianoSongEditorLinesColorInput.value = defaultCanvasPianoSongEditorLinesColorValue;
}

function setCanvasPianoInputs() {
    canvasPianoTopMustUpperPartColorInput.value = defaultCanvasPianoTopMustUpperPartColorValue;
    canvasPianoTopUpperPartColorInput.value = defaultCanvasPianoTopUpperPartColorValue;
    canvasPianoTopUpperPartCenterColorInput.value = defaultCanvasPianoTopUpperPartCenterColorValue;
    canvasPianoTopLowerPartColorInput.value = defaultCanvasPianoTopLowerPartColorValue;
    canvasPianoTopMustLowerPartColorInput.value = defaultCanvasPianoTopMustLowerPartColorValue;
    canvasPianoSeparatingSpacesOfKeysColorInput.value = defaultCanvasPianoSeparatingSpacesOfKeysColorValue;
    canvasPianoWholeKeyColorInput.value = defaultCanvasPianoWholeKeyColorValue;
    canvasPianoHalfKeyColorInput.value = defaultCanvasPianoHalfKeyColorValue;
}

function setCanvasWidth(value) {
    canvas.width = getValueWithGreaterThanOrEqualsZero(value);
}

function setCanvasHeight(value) {
    canvas.height = getValueWithGreaterThanOrEqualsZero(value);
}

function setCanvasSize(size) {
    setCanvasWidth(size);
    setCanvasHeight(size);
}

function getPartOfWidth(width, partOfWidth) {
    return canvas.width / (width / partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return canvas.height / (height / partOfHeight);
}

function drawVerticalColoredLineWithWidthAndPartOfWidth(style, width, partOfWidth, moveY, lineY) {
    drawVerticalColoredLine(style, getPartOfWidth(width, partOfWidth), moveY, lineY);
}

function drawOctaveOfPianoVerticalSonkEditorLines(style, width, partOfWidthAndStart, moveY, lineY) {
    const listOfNumberOfSpacesBetweenLines = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumberOfSpacesBetweenLines.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenLines[counter] : 0), counter++) {
        drawVerticalColoredLineWithWidthAndPartOfWidth(style, width, i, moveY, lineY);
    }
}

function drawKeyOfPiano(strokeStyle, fillStyle, x, y, width, height) {
    begin();
    defaultLineWidth(savedLineWidth);
    defaultStrokeStyle(strokeStyle);
    defaultMoveTo(x, y);
    y += height;
    defaultLineTo(x, y);
    x += width;
    defaultLineTo(x, y);
    y -= height;
    defaultLineTo(x, y);
    x -= width;
    defaultLineTo(x, y);
    defaultStroke();
    defaultFillStyle(fillStyle);
    fill();
}

function drawWholeKeyOctaveOfPiano(strokeStyle, fillStyle, width, height, partOfWidthAndStart) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += 16, counter++) {
        drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, i), getPartOfHeight(height, height - 105), getPartOfWidth(width, 16), getPartOfHeight(height, height - 1));
    }
}

function drawHalfKeyOctaveOfPiano(strokeStyle, fillStyle, width, height, partOfWidthAndStart) {
    const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
        drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, i), getPartOfHeight(height, height - 105), getPartOfWidth(width, 9), getPartOfHeight(height, 68));
    }
}

function drawOctaveOfPiano(wholeKeyStrokeStyle, wholeKeyFillStyle, halfKeyStrokeStyle, halfKeyFillStyle, width, height, partOfWidthAndStart) {
    drawWholeKeyOctaveOfPiano(wholeKeyStrokeStyle, wholeKeyFillStyle, width, height, partOfWidthAndStart);
    drawHalfKeyOctaveOfPiano(halfKeyStrokeStyle, halfKeyFillStyle, width, height, partOfWidthAndStart + 11);
}

function drawClassicPianoAndSonkEditorLines() {
    isCanvasListener = true;
    const width = 834;
    const height = 912;
    const pianoTop = canvas.height * sevenEighths;
    const rgb50PercentGray = "rgb(64, 64, 64)";

    //canvas.onmousedown = function () {
    //    fillColoredRect("#ff0000", savedCanvasMousePos.x, savedCanvasMousePos.y, 100, 100);
    //}
    //canvas.onmouseup = function () {
    //
    //}

    function partOfWidth(value) {
        return getPartOfWidth(width, value);
    }

    function partOfHeight(value) {
        return getPartOfHeight(height, value);
    }

    function getObjectIfObjectEqualsDefaultObject(object, defaultObject) {
        return createIfAndElseAndReturns(object === defaultObject, defaultObject, object);
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
        const topMustUpperPartColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoTopMustUpperPartColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoTopMustUpperPartColorInput.value, defaultCanvasPianoTopMustUpperPartColorValue)));
        const topUpperPartColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoTopUpperPartColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getRgbSixteenToFifteenSixteensHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoTopUpperPartColorInput.value, defaultCanvasPianoTopUpperPartColorValue)));
        const topUpperPartCenterColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoTopUpperPartColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, backgroundColorInput.value, getObjectIfObjectEqualsDefaultObject(canvasPianoTopUpperPartCenterColorInput.value, defaultCanvasPianoTopUpperPartCenterColorValue)));
        const topLowerPartColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoTopLowerPartColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getReverseRgbEighthToSevenEighthsHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoTopLowerPartColorInput.value, defaultCanvasPianoTopLowerPartColorValue)));
        const topMustLowerPartColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoTopLowerPartColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getReverseRgbSixteenToFifteenSixteensHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoTopMustLowerPartColorInput.value, defaultCanvasPianoTopMustLowerPartColorValue)));
        const separatingSpacesOfKeysColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoSeparatingSpacesOfKeysColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoSeparatingSpacesOfKeysColorInput.value, defaultCanvasPianoSeparatingSpacesOfKeysColorValue)));
        const wholeKeyColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoWholeKeyColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, backgroundColorInput.value, getObjectIfObjectEqualsDefaultObject(canvasPianoWholeKeyColorInput.value, defaultCanvasPianoWholeKeyColorValue)));
        const halfKeyColor = getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(canvasPianoHalfKeyColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked, tHex.getReverseHex(backgroundColorInput.value), getObjectIfObjectEqualsDefaultObject(canvasPianoHalfKeyColorInput.value, defaultCanvasPianoHalfKeyColorValue)));

        function getColorWithCanvasPianoInputsValueNotEqualsDefaultColor(ifTrue, ifFalse) {
            return createIfAndElseAndReturns(isEqualsObjects(), ifTrue, ifFalse);
        }

        function drawWholeKey(partOfWidthAndStart) {
            drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(partOfWidthAndStart), partOfHeight(height - 105), partOfWidth(16), partOfHeight(height - 1));
        }

        function drawHalfKey(partOfWidthAndStart) {
            drawKeyOfPiano(separatingSpacesOfKeysColor, halfKeyColor, partOfWidth(partOfWidthAndStart), partOfHeight(height - 105), partOfWidth(9), partOfHeight(68));
        }

        function drawOctave(from) {
            drawOctaveOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, separatingSpacesOfKeysColor, halfKeyColor, width, height, from);
        }

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, 0, pianoTop + partOfHeight(posY), canvas.width, partOfHeight(rectHeight));
        }

        fillColoredRectWithPartOfHeight(topMustUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(topUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(topUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(topMustLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(topLowerPartColor, 8, 1);
        savedLineWidth = canvas.height / height;
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(0), partOfHeight(height - 105), partOfWidth(17), partOfHeight(height - 1));
        drawWholeKey(17);
        drawHalfKey(13);
        let i = 33;
        for (let counter = 0; counter < 7; i += 112, counter++) {
            drawOctave(i);
        }
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(i), partOfHeight(height - 105), partOfWidth(17), partOfHeight(height - 1));
        drawVerticalColoredLine(separatingSpacesOfKeysColor, 0, pianoTop, canvas.height);
        drawVerticalColoredLine(separatingSpacesOfKeysColor, canvas.width, pianoTop, canvas.height);
        drawHorizontalColoredLine(separatingSpacesOfKeysColor, 0, canvas.width, canvas.height);
    }

    if (!isCanvasWidthInputClicked && !isCanvasHeightInputClicked) {
        setCanvasSize(Math.min(innerWidth, innerHeight) * threeQuarter);
    } else {
        setCanvasWidth(createIfAndElseAndReturns(isCanvasWidthInputClicked, canvasWidthInput.value, innerWidth * threeQuarter));
        setCanvasHeight(createIfAndElseAndReturns(isCanvasHeightInputClicked, canvasHeightInput.value, innerHeight * threeQuarter));
    }

    function setStyleColorAttributeCanvasTextItems(color) {
        for (let i = 0; i < canvasTextItems.length; i++) {
            canvasTextItems.item(i).setAttribute("style", "color: " + color);
        }
        canvas.style.border = "1px solid" + color;
        document.getElementById("canvas-width").style.color = color;
        document.getElementById("canvas-height").style.color = color;
    }

    document.body.style.backgroundColor = createIfAndElseAndReturns(backgroundColorInput.value !== defaultBackgroundColorValue, backgroundColorInput.value, defaultBackgroundColorValue);
    document.getElementById("canvas-width").style.backgroundColor = backgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = backgroundColorInput.value;
    setStyleColorAttributeCanvasTextItems(getReverseHex(backgroundColorInput.value));
    drawVerticalSonkEditorLines();
    drawClassicPiano();
}

let savedAllWindowClickCount = 0;
let savedWindowClickCount = 0;
let isSavedCanvasClicked = false;
let isSavedBackgroundColorClicked = false;
let savedWindowClickedCountWhenCanvasFirstClicked = 0;
let savedWindowClickedCountWhenBackgroundColorInputClicked = 0;

let reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, 10, false);

function main(timeout) {
    window.clearInterval(reloadCanvasTimeIntervalHandler);
    reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, timeout, false);
}

function drawPianoSongEditor() {
    if (isCanvasInputsVisible) {
        const isCanvasBorderColorEqualsToDefaultColor = canvasBorderColorInput.value === defaultCanvasBorderColorValue;
        const isCanvasBackgroundColorEqualsToDefaultColor = canvasBackgroundColorInput.value === defaultCanvasBackgroundColorValue;
        const isCanvasPianoSongEditorLinesColorEqualsToDefaultColor = canvasPianoSongEditorLinesColorInput.value === defaultCanvasPianoSongEditorLinesColorValue;
        canvasInputsResetColorsPart.hidden = isCanvasBorderColorEqualsToDefaultColor && isCanvasBackgroundColorEqualsToDefaultColor && isCanvasPianoSongEditorLinesColorEqualsToDefaultColor;
    }
    if (isCanvasPianoInputsVisible) {
        const isCanvasPianoTopMustUpperPartColorEqualsDefaultColor = canvasPianoTopMustUpperPartColorInput.value === defaultCanvasPianoTopMustUpperPartColorValue;
        const isCanvasPianoTopUpperPartColorEqualsDefaultColor = canvasPianoTopUpperPartColorInput.value === defaultCanvasPianoTopUpperPartColorValue;
        const isCanvasPianoTopLowerPartColorEqualsDefaultColor = canvasPianoTopLowerPartColorInput.value === defaultCanvasPianoTopLowerPartColorValue;
        const isCanvasPianoSeparatingSpacesOfKeysColorEqualsDefaultColor = canvasPianoSeparatingSpacesOfKeysColorInput.value === defaultCanvasPianoSeparatingSpacesOfKeysColorValue;
        const isCanvasPianoWholeKeyColorEqualsDefaultColor = canvasPianoWholeKeyColorInput.value === defaultCanvasPianoWholeKeyColorValue;
        const isCanvasPianoHalfKeyColorEqualsDefaultColor = canvasPianoHalfKeyColorInput.value === defaultCanvasPianoHalfKeyColorValue;
        canvasPianoInputsResetColorsPart.hidden = isCanvasPianoTopMustUpperPartColorEqualsDefaultColor && isCanvasPianoTopUpperPartColorEqualsDefaultColor && isCanvasPianoTopLowerPartColorEqualsDefaultColor && isCanvasPianoTopMustUpperPartColorEqualsDefaultColor && isCanvasPianoSeparatingSpacesOfKeysColorEqualsDefaultColor && isCanvasPianoWholeKeyColorEqualsDefaultColor && isCanvasPianoHalfKeyColorEqualsDefaultColor;
    }
    if (isWindowClicked) {
        if (canvasWidthInput.value === "") {
            isCanvasWidthInputClicked = false;
        }
        if (canvasHeightInput.value === "") {
            isCanvasHeightInputClicked = false;
        }
        isCanvasAndBackgroundColorInputClicked = false;
        isBackgroundColorInputAndCanvasClicked = false;
    }
    drawClassicPianoAndSonkEditorLines();
}
