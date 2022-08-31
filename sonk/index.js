window.canvas = document.getElementById("piano-song-editor");
window.context = canvas.getContext("2d");
const canvasMousePositionXSpan = getElementById("canvas-mouse-position-x");
const canvasMousePositionYSpan = getElementById("canvas-mouse-position-y");
const canvasWidthInputColorInput = getElementById("canvas-width-input-color");
const canvasHeightInputColorInput = getElementById("canvas-height-input-color");
const canvasInputsButton = getElementById("canvas-inputs-button");
const canvasInputsResetColorsPart = getElementById("canvas-inputs-reset-colors-part");
const canvasInputsResetColorsButton = getElementById("canvas-inputs-reset-colors-button");
const canvasInputs = getElementById("canvas-inputs");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-border-color", 6, "canvasBorderColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-background-color", 7, "canvasBackgroundColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-song-editor-lines-color", 8, "canvasPianoSongEditorLinesColor");
const canvasPianoInputsButton = getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = getElementById("canvas-piano-inputs");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-top-most-upper-part-color", 11, "canvasPianoTopMostUpperPartColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-top-upper-part-color", 12, "canvasPianoTopUpperPartColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-top-upper-part-center-color", 13, "canvasPianoTopUpperPartCenterColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-top-lower-part-color", 14, "canvasPianoTopLowerPartColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-top-most-lower-part-color", 15, "canvasPianoTopMostLowerPartColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-separating-spaces-of-keys-color", 16, "canvasPianoSeparatingSpacesOfKeysColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-whole-key-color", 17, "canvasPianoWholeKeyColor");
createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault("canvas-piano-half-key-color", 18, "canvasPianoHalfKeyColor");
const backgroundColorInput = getElementById("background-color");
const reloadingTimeInput = getElementById("reloading-time");
const reloadingTimeSubmitButton = getElementById("reloading-time-submit-button");
const textItems = document.getElementsByTagName("text-item");
const textItemsColorInput = document.getElementById("text-items-color");
const defaultCanvasWidthInputColorValue = canvasWidthInput.value;
const defaultCanvasHeightInputColorValue = canvasHeightInput.value;
const defaultBackgroundColorValue = backgroundColorInput.value;
const defaultTextItemsColorValue = textItemsColorInput.value;
let allWindowClickedCount = 0;
let savedAllWindowClickedCountWhenCanvasClicked = 0;
let savedAllWindowClickedCountWhenBackgroundColorInputClicked = 0;
/**
 * <strong>if this parameters are greater than 0</strong>
 * <ul>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">0</code>]: <code style="color: #7f008f">{@link window}</code>,</code>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">1</code>]: <code style="color: #7f008f">{@link canvasWidthInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">2</code>]: <code style="color: #7f008f">{@link canvasHeightInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">3</code>]: <code style="color: #7f008f">{@link canvas}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">4</code>]: <code style="color: #7f008f">{@link canvasInputsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">5</code>]: <code style="color: #7f008f">{@link canvasInputsResetColorsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">6</code>]: <code style="color: #7f008f">{@link HTMLElement canvasBorderColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">7</code>]: <code style="color: #7f008f">{@link HTMLElement canvasBackgroundColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">8</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoSongEditorLinesColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">9</code>]: <code style="color: #7f008f">{@link canvasPianoInputsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">10</code>]: <code style="color: #7f008f">{@link canvasPianoInputsResetColorsButton}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">11</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoTopMostUpperPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">12</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoTopUpperPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">13</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoTopUpperPartCenterColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">14</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoTopLowerPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">15</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoTopMostLowerPartColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">16</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoSeparatingSpacesOfKeysColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">17</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoWholeKeyColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">18</code>]: <code style="color: #7f008f">{@link HTMLElement canvasPianoHalfKeyColorInput}</code>,</code></p>
 *     <p><code style="color: #000000"><code style="color: #1f3faf">{@link allClickedElementsAndCount this}</code>[<code style="color: #3f5fef">19</code>]: <code style="color: #7f008f">{@link backgroundColorInput}</code>,</code></p>
 * </ul>
 */
let allClickedElementsAndCount = createArrayOfOneObject(0, 20);
let savedClickedElementAndIdAndIndexAndCount = [HTMLElement, "", 0, 0];
let savedLineWidth = 0;
let windowClickedCount = 0;
let canvasClickedCount = 0;
let canvasWidthInputClickedCount = 0;
let canvasHeightInputClickedCount = 0;
let canvasInputsButtonClickedCount = 0;
let canvasInputsResetColorsButtonClickedCount = 0;
let canvasPianoInputsButtonClickedCount = 0;
let canvasPianoInputsResetColorsButtonClickedCount = 0;
let backgroundColorInputClickedCount = 0;
let isWindowClicked = false;
let isCanvasClicked = false;
let isCanvasWidthInputMouseDown = false;
let isCanvasHeightInputMouseDown = false;
let isCanvasInputsButtonClicked = false;
let isCanvasInputsResetColorsButtonClicked = false;
let isCanvasPianoInputsButtonClicked = false;
let isCanvasPianoInputsResetColorsButtonClicked = false;
let isBackgroundColorInputClicked = false;
let isCanvasAndBackgroundColorInputClicked = false;
let isBackgroundColorInputAndCanvasClicked = false;
let isCanvasListener = false;
let isCanvasInputsHidden = true;
let isCanvasPianoInputsHidden = true;
let isCanvasInputsVisible = false;
let isCanvasPianoInputsVisible = false;
let isCanvasMouseMove = false;
let isCanvasMouseDown = false;
let isCanvasInputsResetColorsButtonMouseDown = false;
let isCanvasPianoInputsResetColorsButtonMouseDown = false;
let savedCanvasMousePos = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", function () {
    isCanvasMouseMove = false;
}, true);
window.addEventListener("mousedown", function () {
    allWindowClickedCount++;
    allClickedElementsAndCount[0]++;
    windowClickedCount++;
    isCanvasInputsButtonClicked = false;
    isCanvasInputsResetColorsButtonClicked = false;
    window["isCanvasBorderColorInputClicked"] = false;
    window["isCanvasBackgroundColorInputClicked"] = false;
    window["isCanvasPianoSongEditorLinesColorInputClicked"] = false;
    isCanvasPianoInputsButtonClicked = false;
    isCanvasPianoInputsResetColorsButtonClicked = false;
    window["isCanvasPianoTopMostUpperPartColorInputClicked"] = false;
    window["isCanvasPianoTopUpperPartColorInputClicked"] = false;
    window["isCanvasPianoTopUpperPartCenterColorInputClicked"] = false;
    window["isCanvasPianoTopLowerPartColorInputClicked"] = false;
    window["isCanvasPianoTopMostLowerPartColorInputClicked"] = false;
    window["isCanvasPianoSeparatingSpacesOfKeysColorInputClicked"] = false;
    window["isCanvasPianoWholeKeyColorInputClicked"] = false;
    window["isCanvasPianoHalfKeyColorInputClicked"] = false;
    isCanvasInputsResetColorsButtonMouseDown = false;
    isCanvasPianoInputsResetColorsButtonMouseDown = false;
    isWindowClicked = true;
}, true);
canvasWidthInput.onfocus = function () {
    defaultNotWindowClicked();
    canvasWidthInputClickedCount++;
    allClickedElementsAndCount[1]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 1, canvasWidthInputClickedCount];
    isBackgroundColorInputClicked = false;
    isCanvasWidthInputMouseDown = true;
};
canvasHeightInput.onfocus = function () {
    defaultNotWindowClicked();
    canvasHeightInputClickedCount++;
    allClickedElementsAndCount[2]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 2, canvasHeightInputClickedCount];
    isBackgroundColorInputClicked = false;
    isCanvasHeightInputMouseDown = true;
};
canvas.onmousemove = function () {
    savedCanvasMousePos.x = getCanvasMousePos().x;
    savedCanvasMousePos.y = getCanvasMousePos().y;
    isCanvasMouseMove = true;
};
canvas.onmousedown = function () {
    defaultNotWindowClicked();
    isCanvasMouseDown = true;
};
canvas.onclick = function () {
    canvasClickedCount++;
    allClickedElementsAndCount[3]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 3, canvasClickedCount];
    savedAllWindowClickedCountWhenCanvasClicked = allWindowClickedCount;
    isCanvasInputsButtonClicked = false;
    isCanvasPianoInputsButtonClicked = false;
    isBackgroundColorInputAndCanvasClicked = isBackgroundColorInputClicked;
    isBackgroundColorInputClicked = false;
    isCanvasClicked = true;
};
canvasInputsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasInputsButtonClickedCount++;
    allClickedElementsAndCount[4]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 4, canvasInputsButtonClickedCount];
    isCanvasInputsButtonClicked = true;
    isBackgroundColorInputClicked = false;
    isCanvasInputsHidden = canvasInputs.hidden = !canvasInputs.hidden;
    isCanvasInputsVisible = !canvasInputs.hidden;
    canvasInputsResetColorsPart.hidden = true;
    if (isCanvasInputsHidden) {
        isCanvasPianoInputsHidden = canvasPianoInputs.hidden = true;
        isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
    }
};
canvasInputsResetColorsButton.onmousedown = function () {
    defaultNotWindowClicked();
    isCanvasInputsResetColorsButtonMouseDown = true;
};
canvasInputsResetColorsButton.onclick = function () {
    canvasInputsResetColorsButtonClickedCount++;
    allClickedElementsAndCount[5]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 5, canvasInputsResetColorsButtonClickedCount];
    isBackgroundColorInputClicked = false;
    isCanvasInputsResetColorsButtonClicked = true;
};
canvasPianoInputsButton.onclick = function () {
    defaultNotWindowClicked();
    canvasPianoInputsButtonClickedCount++;
    allClickedElementsAndCount[9]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 9, canvasInputsButtonClickedCount];
    isCanvasPianoInputsButtonClicked = true;
    isBackgroundColorInputClicked = false;
    isCanvasPianoInputsHidden = canvasPianoInputs.hidden = !canvasPianoInputs.hidden;
    isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
    canvasPianoInputsResetColorsPart.hidden = true;
};
canvasPianoInputsResetColorsButton.onmousedown = function () {
    defaultNotWindowClicked();
    isCanvasPianoInputsResetColorsButtonMouseDown = true;
};
canvasPianoInputsResetColorsButton.onclick = function () {
    canvasPianoInputsResetColorsButtonClickedCount++;
    allClickedElementsAndCount[10]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 10, canvasPianoInputsResetColorsButtonClickedCount];
    isBackgroundColorInputClicked = false;
    isCanvasPianoInputsResetColorsButtonClicked = true;
};
backgroundColorInput.onclick = function () {
    defaultNotWindowClicked();
    backgroundColorInputClickedCount++;
    allClickedElementsAndCount[19]++;
    savedClickedElementAndIdAndIndexAndCount = [this, this.id, 19, backgroundColorInputClickedCount];
    savedAllWindowClickedCountWhenBackgroundColorInputClicked = allWindowClickedCount;
    isCanvasAndBackgroundColorInputClicked = isCanvasClicked;
    isCanvasClicked = false;
    isBackgroundColorInputClicked = true;
};

reloadingTimeInput.onmousedown = function () {
    defaultNotWindowClicked();
    isBackgroundColorInputClicked = false;
};
reloadingTimeInput.onkeydown = function () {
    isBackgroundColorInputClicked = false;
};
reloadingTimeSubmitButton.onclick = function () {
    defaultNotWindowClicked();
    main(createIfAndElseAndReturns(isEmptyString(reloadingTimeInput.value), 0, reloadingTimeInput.value));
};

/**
 * @return <code style="color: #000000">creates the fields <em>({@link HTMLElement <code style="color: #7f008f">element</code>}, {@link PaymentCurrencyAmount.value <code style="color: #7f008f">defaultValue</code>}, {@link Number <code style="color: #3f5fef">clickedCount</code>}, {@link Boolean <code style="color: #1f3faf">isClicked</code>})</em> associated with the color input element;</code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name, isClicked, clickedCount) {
    const fieldName = name + "Input";
    window[fieldName] = element;
    window["default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value"] = element.value;
    window[fieldName + "ClickedCount"] = clickedCount;
    window["is" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName) + "Clicked"] = isClicked;
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name, isClicked, clickedCount) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(document.getElementById(elementId), name, isClicked, clickedCount);
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValue(elementId, index, name, isClicked, clickedCount) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name, isClicked, clickedCount);
    const fieldName = name + "Input";
    window[fieldName].onclick = function () {
        defaultNotWindowClicked();
        window[fieldName + "ClickedCount"]++;
        allClickedElementsAndCount[index]++;
        savedClickedElementAndIdAndIndexAndCount = [window[fieldName], elementId, index, window[fieldName + "ClickedCount"]];
        isBackgroundColorInputClicked = false;
        window["is" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName) + "Clicked"] = true;
    };
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValueWithDefault(elementId, index, name) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndElementIndexAndAddOnclickValue(elementId, index, name, false, 0);
}

function defaultNotWindowClicked() {
    windowClickedCount--;
    allClickedElementsAndCount[0]--;
    isWindowClicked = false;
}

function setCanvasInputs() {
    window["canvasBorderColorInput"].value = window["defaultCanvasBorderColorValue"];
    window["canvasBackgroundColorInput"].value = window["defaultCanvasBackgroundColorValue"];
    window["canvasPianoSongEditorLinesColorInput"].value = window["defaultCanvasPianoSongEditorLinesColorValue"];
}

function setCanvasPianoInputs() {
    window["canvasPianoTopMostUpperPartColorInput"].value = window["defaultCanvasPianoTopMostUpperPartColorValue"];
    window["canvasPianoTopUpperPartColorInput"].value = window["defaultCanvasPianoTopUpperPartColorValue"];
    window["canvasPianoTopUpperPartCenterColorInput"].value = window["defaultCanvasPianoTopUpperPartCenterColorValue"];
    window["canvasPianoTopLowerPartColorInput"].value = window["defaultCanvasPianoTopLowerPartColorValue"];
    window["canvasPianoTopMostLowerPartColorInput"].value = window["defaultCanvasPianoTopMostLowerPartColorValue"];
    window["canvasPianoSeparatingSpacesOfKeysColorInput"].value = window["defaultCanvasPianoSeparatingSpacesOfKeysColorValue"];
    window["canvasPianoWholeKeyColorInput"].value = window["defaultCanvasPianoWholeKeyColorValue"];
    window["canvasPianoHalfKeyColorInput"].value = window["defaultCanvasPianoHalfKeyColorValue"];
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

function getPartOfNumber(number, numberOfParts, partOfNumber) {
    return number / (getNonNullNumber(numberOfParts) / validateNumber(partOfNumber, 0, numberOfParts));
}

function getPartOfWidth(width, partOfWidth) {
    return getPartOfNumber(canvas.width, width, partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return getPartOfNumber(canvas.height, height, partOfHeight);
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @param partOfHeight this is part of canvas-height
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, partOfHeight) {
    return getNonNullNumber(createIfAndElseAndReturns(canvas.height > canvas.width, canvas.height - (canvas.width * (1 / getNonNullNumber(outOfCanvasHeightOfDivider))), getNonNullNumber(partOfHeight)));
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(outOfCanvasHeightOfDivider) {
    outOfCanvasHeightOfDivider = getNonNullNumber(outOfCanvasHeightOfDivider);
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, getNonNullNumber(canvas.height * (1 - (1 / outOfCanvasHeightOfDivider))));
}

function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(getNonNullNumber(height / (height - partOfHeightOfCanvas)));
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
        drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, i), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 105), getPartOfWidth(width, 16), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 1));
    }
}

function drawHalfKeyOctaveOfPiano(strokeStyle, fillStyle, width, height, partOfWidthAndStart) {
    const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
        drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, i), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 105), getPartOfWidth(width, 9), canvas.height > canvas.width ? getPartOfWidth(width, 62) : getPartOfHeight(height, 68));
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
    const pianoTopOfHeight = partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 114);

    function partOfWidth(value) {
        return getPartOfWidth(width, value);
    }

    function partOfHeight(value) {
        return getPartOfHeight(height, value);
    }

    function partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(partOfHeightOfCanvas) {
        return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas);
    }

    function getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor(name, modifiedColor) {
        const inputValue = window[name + "Input"].value;
        const defaultValue = window["default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value"].value;
        return createIfAndElseAndReturns(!isBackgroundColorInputClicked, inputValue, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked || isBackgroundColorInputAndCanvasClicked, modifiedColor, getObjectIfEqualsObjects(inputValue, defaultValue)));
    }

    function drawVerticalSonkEditorLines() {
        const linesColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoSongEditorLinesColor", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));
        function drawVertical50PercentGrayLineFrom0ToPianoTop(from) {
            drawVerticalColoredLineWithWidthAndPartOfWidth(linesColor, width, from, 0, pianoTopOfHeight);
        }
        function drawOctave(from) {
            drawOctaveOfPianoVerticalSonkEditorLines(linesColor, width, from, 0, pianoTopOfHeight);
        }
        savedLineWidth = canvas.width / width;
        drawVertical50PercentGrayLineFrom0ToPianoTop(0);
        drawVertical50PercentGrayLineFrom0ToPianoTop(14);
        drawVertical50PercentGrayLineFrom0ToPianoTop(22);
        for (let i = 33, counter = 0; counter < 7; i += 112, counter++) {
            drawOctave(i);
        }
        drawVertical50PercentGrayLineFrom0ToPianoTop(width);
    }

    function drawClassicPiano() {
        const topMostUpperPartColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoTopMostUpperPartColor", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));
        const topUpperPartColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoTopUpperPartColor", tHex.getRgbSixteenToFifteenSixteensHex(backgroundColorInput.value));
        const topUpperPartCenterColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoTopUpperPartCenterColor", backgroundColorInput.value);
        const topLowerPartColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoTopLowerPartColor", tHex.getReverseRgbSixteenToFifteenSixteensHex(backgroundColorInput.value));
        const topMostLowerPartColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoTopMostLowerPartColor", tHex.getReverseRgbEighthToSevenEighthsHex(backgroundColorInput.value));
        const separatingSpacesOfKeysColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoSeparatingSpacesOfKeysColor", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));
        const wholeKeyColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoWholeKeyColor", backgroundColorInput.value);
        const halfKeyColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasPianoHalfKeyColor", tHex.getReverseHex(backgroundColorInput.value));

        function drawWholeKey(partOfWidthAndStart) {
            drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(partOfWidthAndStart), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 105), partOfWidth(16), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        }

        function drawHalfKey(partOfWidthAndStart) {
            drawKeyOfPiano(separatingSpacesOfKeysColor, halfKeyColor, partOfWidth(partOfWidthAndStart), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 105), partOfWidth(9), canvas.height > canvas.width ? partOfWidth(62) : partOfHeight(68));
        }

        function drawOctave(from) {
            drawOctaveOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, separatingSpacesOfKeysColor, halfKeyColor, width, height, from);
        }

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, 0, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - (114 - posY)), canvas.width, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(rectHeight));
        }

        fillColoredRectWithPartOfHeight(topMostUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(topUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(topUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(topLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(topMostLowerPartColor, 8, 1);
        savedLineWidth = canvas.width / width;
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(0), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 105), partOfWidth(17), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        drawWholeKey(17);
        drawHalfKey(13);
        let i = 33;
        for (let counter = 0; counter < 7; i += 112, counter++) {
            drawOctave(i);
        }
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(i), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 105), partOfWidth(17), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        drawVerticalColoredLine(separatingSpacesOfKeysColor, 0, pianoTopOfHeight, canvas.height);
        drawVerticalColoredLine(separatingSpacesOfKeysColor, canvas.width, pianoTopOfHeight, canvas.height);
        drawHorizontalColoredLine(separatingSpacesOfKeysColor, 0, canvas.width, canvas.height);
    }

    if (!isCanvasWidthInputMouseDown && !isCanvasHeightInputMouseDown) {
        setCanvasSize(Math.min(innerWidth, innerHeight) * threeQuarter);
    } else {
        setCanvasWidth(createIfAndElseAndReturns(isCanvasWidthInputMouseDown, canvasWidthInput.value, innerWidth * threeQuarter));
        setCanvasHeight(createIfAndElseAndReturns(isCanvasHeightInputMouseDown, canvasHeightInput.value, innerHeight * threeQuarter));
    }

    function setStyleColorAttributeCanvasTextItems(color) {
        const texItemsColorInputValue = textItemsColorInput.value = createIfAndElseAndReturns(!isBackgroundColorInputClicked, textItemsColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked || isBackgroundColorInputAndCanvasClicked, color, getObjectIfEqualsObjects(textItemsColorInput.value, defaultTextItemsColorValue)));
        for (let i = 0; i < textItems.length; i++) {
            textItems.item(i).setAttribute("style", "color: " + texItemsColorInputValue);
        }
        document.getElementById("canvas-width").style.color = color;
        document.getElementById("canvas-height").style.color = color;
    }

    canvas.style.border = "1px solid" + getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasBorderColor", getReverseHex(backgroundColorInput.value));
    canvas.style.backgroundColor = getColorWithNotBackgroundColorInputClickedAndValueNotEqualsDefaultColor("canvasBackgroundColor", backgroundColorInput.value);
    document.body.style.backgroundColor = getObjectIfEqualsObjects(backgroundColorInput.value, defaultBackgroundColorValue);
    canvasWidthInputColorInput.value = document.getElementById("canvas-width").style.backgroundColor = createIfAndElseAndReturns(!isBackgroundColorInputClicked, canvasWidthInputColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked || isBackgroundColorInputAndCanvasClicked, backgroundColorInput.value, getObjectIfEqualsObjects(canvasWidthInputColorInput.value, defaultCanvasWidthInputColorValue)));
    canvasHeightInputColorInput.value = document.getElementById("canvas-height").style.backgroundColor = createIfAndElseAndReturns(!isBackgroundColorInputClicked, canvasHeightInputColorInput.value, createIfAndElseAndReturns(isCanvasAndBackgroundColorInputClicked || isBackgroundColorInputAndCanvasClicked, backgroundColorInput.value, getObjectIfEqualsObjects(canvasHeightInputColorInput.value, defaultCanvasHeightInputColorValue)));
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
    const self = this;
    if (isCanvasInputsVisible && isCanvasPianoInputsHidden && (isCanvasInputsResetColorsButtonClicked || isCanvasInputsResetColorsButtonMouseDown)) {
        setCanvasInputs();
    }
    if (isCanvasInputsVisible && isCanvasPianoInputsVisible && (isCanvasInputsResetColorsButtonClicked || isCanvasInputsResetColorsButtonMouseDown)) {
        setCanvasInputs();
        setCanvasPianoInputs();
    }
    if (isCanvasInputsVisible && isCanvasPianoInputsVisible && (isCanvasPianoInputsResetColorsButtonClicked || isCanvasPianoInputsResetColorsButtonMouseDown)) {
        setCanvasPianoInputs();
    }
    function createFieldWithCanvasColorInputValueEqualsDefaultValue(name) {
        const capitalNameFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(name);
        self["isCanvas" + capitalNameFirstLetterAToZ + "ColorEqualsDefaultColor"] = window["canvas" + capitalNameFirstLetterAToZ + "ColorInput"].value === window["defaultCanvas" + capitalNameFirstLetterAToZ + "ColorValue"];
    }
    function isCanvasField(name) {
        return self["isCanvas" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "ColorEqualsDefaultColor"];
    }
    function isCanvasFields(...names) {
        let isTrue = true;
        for (const element of names) {
            isTrue = isTrue && isCanvasField(element);
        }
        return isTrue;
    }
    createFieldWithCanvasColorInputValueEqualsDefaultValue("border");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("background");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoSongEditorLines");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoTopMostUpperPart");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoTopUpperPart");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoTopUpperPartCenter");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoTopLowerPart");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoTopMostLowerPart");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoSeparatingSpacesOfKeys");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoWholeKey");
    createFieldWithCanvasColorInputValueEqualsDefaultValue("pianoHalfKey");
    const isCanvasInputsResetColorsPartHiddenIfPianoInputsHidden = isCanvasFields("border", "background", "pianoSongEditorLines");
    const isCanvasPianoInputsResetColorsPartHidden = isCanvasFields("pianoTopMostUpperPart", "pianoTopUpperPart", "pianoTopUpperPartCenter", "pianoTopLowerPart", "pianoTopMostLowerPart", "pianoSeparatingSpacesOfKeys", "pianoWholeKey", "pianoHalfKey");
    if (isCanvasInputsVisible && isCanvasPianoInputsHidden) {
        canvasInputsResetColorsPart.hidden = isCanvasInputsResetColorsPartHiddenIfPianoInputsHidden;
    }
    if (isCanvasInputsVisible && isCanvasPianoInputsVisible) {
        canvasInputsResetColorsPart.hidden = isCanvasInputsResetColorsPartHiddenIfPianoInputsHidden;
        canvasPianoInputsResetColorsPart.hidden = isCanvasPianoInputsResetColorsPartHidden;
    }
    if (isCanvasMouseMove) {
        canvasMousePositionXSpan.innerText = savedCanvasMousePos.x;
        canvasMousePositionYSpan.innerText = savedCanvasMousePos.y;
    }
    if (isCanvasMouseDown) {
        fillColoredRect("#ff0000", savedCanvasMousePos.x, savedCanvasMousePos.y, 100, 100);
    }
    if (isWindowClicked) {
        savedClickedElementAndIdAndIndexAndCount = [window, window.toString(), 0, canvasClickedCount];
        if (canvasWidthInput.value === "") {
            isCanvasWidthInputMouseDown = false;
        }
        if (canvasHeightInput.value === "") {
            isCanvasHeightInputMouseDown = false;
        }
        isCanvasAndBackgroundColorInputClicked = false;
        isBackgroundColorInputAndCanvasClicked = false;
    }
    //console.log("window clicked count: " + allWindowClickedCount + ", " + windowClickedCount + " | " + isCanvasAndBackgroundColorInputClicked + ", " + isBackgroundColorInputAndCanvasClicked + ", " + canvasClickedCount + ", " + backgroundColorInputClickedCount);
    drawClassicPianoAndSonkEditorLines();
}
