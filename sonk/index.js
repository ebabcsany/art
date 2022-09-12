window.canvas = document.getElementById("piano-song-editor");
window.context = canvas.getContext("2d");
const canvasMousePositionXSpan = getElementById("canvas-mouse-position-x");
const canvasMousePositionYSpan = getElementById("canvas-mouse-position-y");
const canvasWidthInputBackgroundColorInput = getElementById("canvas-width-input-background-color");
const canvasHeightInputBackgroundColorInput = getElementById("canvas-height-input-background-color");
const canvasWidthInputColorInput = getElementById("canvas-width-input-color");
const canvasHeightInputColorInput = getElementById("canvas-height-input-color");
const canvasInputsButton = getElementById("canvas-inputs-button");
const canvasInputsResetColorsPart = getElementById("canvas-inputs-reset-colors-part");
const canvasInputsResetColorsButton = getElementById("canvas-inputs-reset-colors-button");
const canvasInputs = getElementById("canvas-inputs");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-border-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-background-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-song-editor-lines-color");
const canvasPianoInputsButton = getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = getElementById("canvas-piano-inputs");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-top-most-upper-part-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-top-upper-part-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-top-upper-part-center-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-top-lower-part-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-top-most-lower-part-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-separating-spaces-of-keys-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-whole-key-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-half-key-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-active-part-clicking-whole-key-color");
createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault("canvas-piano-active-part-clicking-half-key-color");
const backgroundColorInput = getElementById("background-color");
const saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput = getElementById("save-changed-colors-on-canvas-by-modified-background-color-input-value");
const resetColorsOnCanvasInput = getElementById("reset-colors-on-canvas");
const reloadingTimeInput = getElementById("reloading-time");
const reloadingTimeSubmitButton = getElementById("reloading-time-submit-button");
const textItems = document.getElementsByTagName("text-item");
const textItemsColorInput = document.getElementById("text-items-color");
const defaultBackgroundColorValue = backgroundColorInput.value;
let soundFrequency = 300;
let savedLineWidth = 0;
let isWindowClicked = false;
let isCanvasClicked = false;
let isCanvasWidthInputFocus = false;
let isCanvasHeightInputFocus = false;
let isCanvasWidthInputColorInputClicked = false;
let isCanvasHeightInputColorInputClicked = false;
let isCanvasInputsButtonClicked = false;
let isCanvasInputsResetColorsButtonClicked = false;
let isCanvasPianoInputsButtonClicked = false;
let isCanvasPianoInputsResetColorsButtonClicked = false;
let isBackgroundColorInputClicked = false;
let isSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked = false;
let isCanvasListener = false;
let isCanvasInputsHidden = true;
let isCanvasPianoInputsHidden = true;
let isCanvasInputsVisible = false;
let isCanvasInputsAndCanvasPianoInputsVisible = false;
let isAllCanvasInputsVisible = false;
let isCanvasPianoInputsVisible = false;
let isCanvasMouseMove = false;
let isCanvasMouseDown = false;
let isCanvasInputsResetColorsButtonMouseDown = false;
let isCanvasPianoInputsResetColorsButtonMouseDown = false;
let isReloadingTimeSubmitButtonMouseDown = false;
let isReloadingTimeSubmitButtonMouseUp = false;
let savedCanvasMouseValidPos = {
    x: 0,
    y: 0
};
window.addEventListener("mousemove", function () {
    isCanvasMouseMove = false;
}, true);
window.addEventListener("mousedown", function () {
    isCanvasClicked = false;
    isCanvasInputsButtonClicked = false;
    window["isCanvasBorderColorInputClicked"] = false;
    window["isCanvasBackgroundColorInputClicked"] = false;
    window["isCanvasSongEditorLinesColorInputClicked"] = false;
    isCanvasPianoInputsButtonClicked = false;
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
    isCanvasInputsResetColorsButtonClicked = false;
    isCanvasPianoInputsResetColorsButtonClicked = false;
}, true);
window.addEventListener("click", function () {
    isWindowClicked = true;
}, true);
canvasWidthInput.onclick = function () {
    isWindowClicked = false;
    isCanvasWidthInputFocus = true;
};
canvasHeightInput.onclick = function () {
    isWindowClicked = false;
    isCanvasHeightInputFocus = true;
};
canvasWidthInputColorInput.onclick = function () {
    isWindowClicked = false;
    isCanvasWidthInputColorInputClicked = true;
};
canvasHeightInputColorInput.onclick = function () {
    isWindowClicked = false;
    isCanvasHeightInputColorInputClicked = true;
};
canvas.onmousemove = function () {
    savedCanvasMouseValidPos.x = getValidInteger(getCanvasMousePos().x);
    savedCanvasMouseValidPos.y = getValidInteger(getCanvasMousePos().y);
    isCanvasMouseMove = true;
};
canvas.onmousedown = function () {
    isWindowClicked = false;
    isCanvasMouseDown = true;
};
canvas.onmouseup = function () {
    isCanvasMouseDown = false;
};
canvas.onclick = function () {
    isWindowClicked = false;
    isCanvasMouseDown = false;
    isCanvasPianoInputsButtonClicked = false;
    isCanvasClicked = true;
};
canvasInputsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasInputsButtonClicked = true;
    isCanvasInputsHidden = canvasInputs.hidden = !canvasInputs.hidden;
    isCanvasInputsVisible = !canvasInputs.hidden;
    canvasInputsResetColorsPart.hidden = true;
    if (isCanvasInputsHidden) {
        isCanvasPianoInputsHidden = canvasPianoInputs.hidden = true;
        isCanvasPianoInputsVisible = false;
    }
};
canvasInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasInputsResetColorsButtonClicked = true;
};
canvasPianoInputsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasPianoInputsButtonClicked = true;
    isCanvasPianoInputsHidden = canvasPianoInputs.hidden = !canvasPianoInputs.hidden;
    isCanvasInputsAndCanvasPianoInputsVisible = isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
    canvasPianoInputsResetColorsPart.hidden = true;
};
canvasPianoInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasPianoInputsResetColorsButtonClicked = true;
    if (isCanvasInputsVisible) {
        isAllCanvasInputsVisible = true;
    }
};
backgroundColorInput.onclick = function () {
    isWindowClicked = false;
    isBackgroundColorInputClicked = true;
};
saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput.onclick = function () {
    isWindowClicked = false;
    isSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked = true;
};
reloadingTimeInput.onclick = function () {
    isWindowClicked = false;
};
reloadingTimeSubmitButton.onmousedown = function () {
    isWindowClicked = false;
    isReloadingTimeSubmitButtonMouseDown = true;
};
reloadingTimeSubmitButton.onmouseup = function () {
    isWindowClicked = false;
    isReloadingTimeSubmitButtonMouseUp = true;
};
reloadingTimeSubmitButton.onclick = function () {
    //const context = new AudioContext();
    //let o = context.createOscillator();
    //const g = context.createGain();
    //o.connect(g);
    //g.connect(context.destination);
    //o.frequency.value = soundFrequency;
    //o.start(0);
    //o.detune = 200;
    //console.log(g);
    //soundFrequency *= 1.06;
    isWindowClicked = false;
    main(createIfAndElseAndReturns(isEmptyString(reloadingTimeInput.value), 0, reloadingTimeInput.value));
};

/**
 * @return <code style="color: #000000">creates the fields <em>({@link HTMLElement <code style="color: #7f008f">element</code>}, {@link PaymentCurrencyAmount.value <code style="color: #7f008f">defaultValue</code>}, {@link Number <code style="color: #3f5fef">clickedCount</code>}, {@link Boolean <code style="color: #1f3faf">isClicked</code>})</em> associated with the color input element;</code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name, isClicked, clickedCount) {
    const fieldName = name + "Input";
    const fieldDefaultValueName = "default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value";
    const fieldResetColorPartName = name + "ResetColorPart";
    window[fieldName] = element;
    window[fieldDefaultValueName] = element.value;
    window[fieldName + "ClickedCount"] = clickedCount;
    window["is" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName) + "Clicked"] = isClicked;
    window[fieldResetColorPartName] = document.getElementById(placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-"));
    window[fieldResetColorPartName].hidden = window[fieldName].value === window[fieldDefaultValueName];
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name, isClicked, clickedCount) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(document.getElementById(elementId), name, isClicked, clickedCount);
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputFieldNameWithWordsSeparatorsHyphenWithDefault(fieldNameWithWordsSeparatorsOfHyphen) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(document.getElementById(fieldNameWithWordsSeparatorsOfHyphen), changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(fieldNameWithWordsSeparatorsOfHyphen, "-"), false, 0);
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndAddOnclickValue(elementId, name, isClicked, clickedCount) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name, isClicked, clickedCount);
    const fieldName = name + "Input";
    const fieldDefaultValueName = "default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value";
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPart = document.getElementById(placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-"));
    window[fieldName].onclick = function () {
        isWindowClicked = false;
        window["is" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName) + "Clicked"] = true;
    };
    //fieldResetColorPart.onclick = function () {
    //    isWindowClicked = false;
    //    window[fieldName] = window[fieldDefaultValueName];
    //}
}

function createsTheDefaultColorInputFieldsAndClickListenerAssociatedWithColorInputFieldNameWithWordsSeparatorsHyphenWithDefault(fieldNameWithWordsSeparatorsOfHyphen) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdAndAddOnclickValue(fieldNameWithWordsSeparatorsOfHyphen, changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(fieldNameWithWordsSeparatorsOfHyphen, "-"), false, 0);
}

function setCanvasInputs() {
    window["canvasBorderColorInput"].value = window["defaultCanvasBorderColorValue"];
    window["canvasBackgroundColorInput"].value = window["defaultCanvasBackgroundColorValue"];
    window["canvasSongEditorLinesColorInput"].value = window["defaultCanvasSongEditorLinesColorValue"];
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

function loadCanvasSize() {
    if (!isCanvasWidthInputFocus && !isCanvasHeightInputFocus) {
        setCanvasSize(Math.min(innerWidth, innerHeight) * threeQuarter);
    } else {
        setCanvasWidth(createIfAndElseAndReturns(isCanvasWidthInputFocus, canvasWidthInput.value, innerWidth * threeQuarter));
        setCanvasHeight(createIfAndElseAndReturns(isCanvasHeightInputFocus, canvasHeightInput.value, innerHeight * threeQuarter));
    }
}

function getPartOfNumber(number, numberOfParts, partOfNumber) {
    return number / (getValidNumber(numberOfParts) / validateNumber(partOfNumber, 0, numberOfParts));
}

function getPartOfWidth(width, partOfWidth) {
    return getPartOfNumber(canvas.width, width, partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return getPartOfNumber(canvas.height, height, partOfHeight);
}

function getHalfKeyHeight(width, height) {
    return createIfAndElseAndReturns(canvas.height > canvas.width, getPartOfWidth(width, 62), getPartOfHeight(height, 68));
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @param partOfHeight this is part of canvas-height
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, partOfHeight) {
    return getValidNumber(createIfAndElseAndReturns(canvas.height > canvas.width, canvas.height - (canvas.width * (1 / getValidNumber(outOfCanvasHeightOfDivider))), getValidNumber(partOfHeight)));
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(outOfCanvasHeightOfDivider) {
    outOfCanvasHeightOfDivider = getValidNumber(outOfCanvasHeightOfDivider);
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, getValidNumber(canvas.height * (1 - (1 / outOfCanvasHeightOfDivider))));
}

function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(getValidNumber(height / (height - partOfHeightOfCanvas)));
}

function getTopOfPianoKeys(height) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 105);
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

function drawKeyOfPiano(strokeStyle, fillStyle, posX, posY, keyWidth, keyHeight) {
    begin();
    defaultLineWidth(0);
    defaultStrokeStyle(strokeStyle);
    defaultMoveTo(posX, posY);
    posY += keyHeight;
    defaultLineTo(posX, posY);
    posX += keyWidth;
    defaultLineTo(posX, posY);
    posY -= keyHeight;
    defaultLineTo(posX, posY);
    posX -= keyWidth;
    defaultLineTo(posX, posY);
    defaultStroke();
    defaultFillStyle(fillStyle);
    fill();
}

function drawWholeKeyOfPiano(strokeStyle, fillStyle, width, height, posX) {
    drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, posX), getTopOfPianoKeys(height), getPartOfWidth(width, 16), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 1));
}

function drawHalfKeyOfPiano(strokeStyle, fillStyle, width, height, posX) {
    drawKeyOfPiano(strokeStyle, fillStyle, getPartOfWidth(width, posX), getTopOfPianoKeys(height), getPartOfWidth(width, 8), getHalfKeyHeight(width, height));
}

function drawWholeKeyOctaveOfPiano(strokeStyle, fillStyle, width, height, partOfWidthAndStart) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += 16, counter++) {
        drawWholeKeyOfPiano(strokeStyle, fillStyle, width, height, i);
    }
}

function drawHalfKeyOctaveOfPiano(strokeStyle, fillStyle, width, height, partOfWidthAndStart) {
    const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
        drawHalfKeyOfPiano(strokeStyle, fillStyle, width, height, i);
    }
}

function drawOctaveOfPiano(wholeKeyStrokeStyle, wholeKeyFillStyle, halfKeyStrokeStyle, halfKeyFillStyle, width, height, partOfWidthAndStart) {
    drawWholeKeyOctaveOfPiano(wholeKeyStrokeStyle, wholeKeyFillStyle, width, height, partOfWidthAndStart);
    drawHalfKeyOctaveOfPiano(halfKeyStrokeStyle, halfKeyFillStyle, width, height, partOfWidthAndStart + 11);
}

function drawClassicPianoAndSonkEditorLines() {
    isCanvasListener = true;
    loadCanvasSize();
    const width = 834;
    const height = 912;
    const wholeKeyWidth = partOfWidth(16);
    const halfKeyWidth = partOfWidth(8);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const pianoTop = partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 114);
    const topOfKeys = partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 105);
    const wholeKeyColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-whole-key-color", backgroundColorInput.value);
    const halfKeyColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-half-key-color", tHex.getReverseHex(backgroundColorInput.value));
    const separatingSpacesOfKeysColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-separating-spaces-of-keys-color", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));

    function partOfWidth(value) {
        return getPartOfWidth(width, value);
    }

    function partOfHeight(value) {
        return getPartOfHeight(height, value);
    }

    function partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(partOfHeightOfCanvas) {
        return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas);
    }

    function getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked(fieldNameWithWordsSeparatorsOfHyphen, modifiedColor) {
        const validName = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(fieldNameWithWordsSeparatorsOfHyphen, "-");
        const inputString = validName + "Input";
        let colorValue = window[inputString].value;
        window[inputString].value = colorValue = createIfAndElseAndReturns(saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput.checked, modifiedColor, colorValue);
        return colorValue;
    }

    function drawVerticalSonkEditorLines() {
        const linesColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-song-editor-lines-color", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));

        function drawVertical50PercentGrayLineFrom0ToPianoTop(from) {
            drawVerticalColoredLineWithWidthAndPartOfWidth(linesColor, width, from, 0, pianoTop);
        }

        function drawOctave(from) {
            drawOctaveOfPianoVerticalSonkEditorLines(linesColor, width, from, 0, pianoTop);
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
        const topMostUpperPartColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-top-most-upper-part-color", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));
        const topUpperPartColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-top-upper-part-color", tHex.getRgbEighthToSevenEighthsHex(backgroundColorInput.value));
        const topUpperPartCenterColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-top-upper-part-center-color", backgroundColorInput.value);
        const topLowerPartColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-top-lower-part-color", tHex.getReverseRgbSixteenToFifteenSixteensHex(backgroundColorInput.value));
        const topMostLowerPartColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-top-most-lower-part-color", tHex.getReverseRgbEighthToSevenEighthsHex(backgroundColorInput.value));

        function drawWholeKey(partOfWidthAndStart) {
            drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(partOfWidthAndStart), topOfKeys, wholeKeyWidth, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        }

        function drawHalfKey(partOfWidthAndStart) {
            drawHalfKeyOfPiano(separatingSpacesOfKeysColor, halfKeyColor, width, height, partOfWidthAndStart);
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
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(0), topOfKeys, partOfWidth(17), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        drawWholeKey(17);
        drawHalfKey(14);
        let i = 33;
        for (let counter = 0; counter < 7; i += 112, counter++) {
            drawOctave(i);
        }
        drawKeyOfPiano(separatingSpacesOfKeysColor, wholeKeyColor, partOfWidth(i), topOfKeys, partOfWidth(17), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 1));
        drawVerticalColoredLine(separatingSpacesOfKeysColor, 0, pianoTop, canvas.height);
        drawVerticalColoredLine(separatingSpacesOfKeysColor, canvas.width, pianoTop, canvas.height);
        drawHorizontalColoredLine(separatingSpacesOfKeysColor, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < textItems.length; i++) {
        textItems.item(i).setAttribute("style", "color: " + textItemsColorInput.value);
    }

    canvas.style.border = "1px solid" + getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-border-color", tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value));
    canvas.style.backgroundColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-background-color", backgroundColorInput.value);
    document.body.style.backgroundColor = getObjectIfEqualsObjects(backgroundColorInput.value, defaultBackgroundColorValue);
    document.getElementById("canvas-width").style.backgroundColor = canvasWidthInputBackgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = canvasHeightInputBackgroundColorInput.value;
    document.getElementById("canvas-width").style.color = canvasWidthInputColorInput.value;
    document.getElementById("canvas-height").style.color = canvasHeightInputColorInput.value;
    drawVerticalSonkEditorLines();
    drawClassicPiano();
    if (isCanvasMouseDown) {
        if (savedCanvasMouseValidPos.y >= topOfKeys && savedCanvasMouseValidPos.y <= canvas.height) {
            const clickingHalfKeyColor = getColorWithNotSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked("canvas-piano-active-part-clicking-half-key-color", tHex.getRgbThreeQuarterHex(backgroundColorInput.value));

            function loadingHalfKeyClickingPosition(strokeStyle, fillStyle, posX) {
                if (savedCanvasMouseValidPos.x >= partOfWidth(posX) && savedCanvasMouseValidPos.x <= partOfWidth(posX + 9)) {
                    //console.log("f");
                    drawHalfKeyOfPiano(strokeStyle, fillStyle, width, height, posX);
                }
            }

            function loadingHalfKeyOctaveClickingPositions(strokeStyle, fillStyle, partOfWidthAndStart) {
                const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
                const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
                for (let j = partOfWidthAndStart, counter = 0; counter <= maxLength; j += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
                    if (savedCanvasMouseValidPos.x >= partOfWidth(j) && savedCanvasMouseValidPos.x <= partOfWidth(j + 9)) {
                        //console.log("f");
                        drawHalfKeyOfPiano(strokeStyle, fillStyle, width, height, j);
                    }
                }
            }

            loadingHalfKeyClickingPosition(separatingSpacesOfKeysColor, "#ff007f", 14);
            let i = 44;
            for (let counter = 0; counter < 7; i += 112, counter++) {
                loadingHalfKeyOctaveClickingPositions(separatingSpacesOfKeysColor, "#ff007f", i);
            }
        }
    }
}

let reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, 10, false);

function main(timeout) {
    window.clearInterval(reloadCanvasTimeIntervalHandler);
    reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, timeout, false);
}

function drawPianoSongEditor() {
    const self = this;

    if (isWindowClicked) {
        if (isEmptyString(canvasWidthInput.value) && isCanvasWidthInputFocus) {
            isCanvasWidthInputFocus = false;
        }
        if (isEmptyString(canvasHeightInput.value) && isCanvasHeightInputFocus) {
            isCanvasHeightInputFocus = false;
        }
        loadCanvasSize();
        isBackgroundColorInputClicked = false;
        isSaveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInputClicked = false;
    }

    if (isCanvasMouseMove) {
        canvasMousePositionXSpan.innerText = savedCanvasMouseValidPos.x;
        canvasMousePositionYSpan.innerText = savedCanvasMouseValidPos.y;
    }

    function canvasFieldValidName(type) {
        const validType = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(type, "-");
        return "canvas" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(validType) + "Color";
    }

    function createIsCanvasColorInputValueEqualsDefaultColorField(type) {
        const validName = canvasFieldValidName(type);
        const capitalValidNameFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(validName);
        self["is" + capitalValidNameFirstLetterAToZ + "EqualsDefaultColor"] = window[validName + "Input"].value === window["default" + capitalValidNameFirstLetterAToZ + "Value"];
    }

    function isCanvasField(type) {
        const validName = canvasFieldValidName(type);
        return self["is" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(validName) + "EqualsDefaultColor"];
    }

    function isCanvasFields(...types) {
        let isTrue = true;
        for (const element of types) {
            isTrue = isTrue && isCanvasField(element);
        }
        return isTrue;
    }

    createIsCanvasColorInputValueEqualsDefaultColorField("border");
    createIsCanvasColorInputValueEqualsDefaultColorField("background");
    createIsCanvasColorInputValueEqualsDefaultColorField("song-editor-lines");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-top-most-upper-part");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-top-upper-part");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-top-upper-part-center");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-top-lower-part");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-top-most-lower-part");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-separating-spaces-of-keys");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-whole-key");
    createIsCanvasColorInputValueEqualsDefaultColorField("piano-half-key");
    const isCanvasInputsEqualsDefaultColorIfPianoInputsHidden = isCanvasFields("border", "background", "song-editor-lines");
    const isCanvasPianoInputsEqualsDefaultColor = isCanvasFields("piano-top-most-upper-part", "piano-top-upper-part", "piano-top-upper-part-center", "piano-top-lower-part", "piano-top-most-lower-part", "piano-separating-spaces-of-keys", "piano-whole-key", "piano-half-key");
    const isCanvasInputsEqualsDefaultColor = isCanvasInputsEqualsDefaultColorIfPianoInputsHidden && isCanvasPianoInputsEqualsDefaultColor;
    canvasInputsResetColorsPart.hidden = createIfAndElseAndReturns(isCanvasInputsVisible, createIfAndElseAndReturns(isCanvasPianoInputsHidden, isCanvasInputsEqualsDefaultColorIfPianoInputsHidden, isCanvasInputsEqualsDefaultColor), true);
    canvasPianoInputsResetColorsPart.hidden = createIfAndElseAndReturns(isCanvasInputsAndCanvasPianoInputsVisible, isCanvasPianoInputsEqualsDefaultColor, true);
    resetColorsOnCanvasInput.hidden = isCanvasInputsEqualsDefaultColor;
    if (isCanvasInputsVisible) {
        if (isCanvasPianoInputsHidden && isCanvasInputsResetColorsButtonClicked) {
            saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput.checked = false;
            setCanvasInputs();
            canvasInputsResetColorsPart.hidden = true;
        }
        if (isCanvasPianoInputsVisible && isCanvasInputsResetColorsButtonClicked) {
            saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput.checked = false;
            setCanvasInputs();
            setCanvasPianoInputs();
            canvasInputsResetColorsPart.hidden = true;
            canvasPianoInputsResetColorsPart.hidden = true;
        }
        if (isCanvasPianoInputsVisible && isCanvasPianoInputsResetColorsButtonClicked) {
            saveChangedColorsOnCanvasByModifiedBackgroundColorInputValueInput.checked = false;
            setCanvasPianoInputs();
            canvasPianoInputsResetColorsPart.hidden = true;
        }
    }
    drawClassicPianoAndSonkEditorLines();
}

drawPianoSongEditor();
