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
const canvasColorInputTypes = [
    "border",
    "background",
    "song-editor-lines",
    "song-editor-sides",
    "piano-background",
    "piano-top-most-upper-part",
    "piano-top-upper-part",
    "piano-top-upper-part-center",
    "piano-top-lower-part",
    "piano-top-most-lower-part",
    "piano-whole-key",
    "piano-half-key"
];
createTheDefaultCanvasColorInputFieldsAndListeners("border");
createTheDefaultCanvasColorInputFieldsAndListeners("background");
createTheDefaultCanvasColorInputFieldsAndListeners("song-editor-lines");
createTheDefaultCanvasColorInputFieldsAndListeners("song-editor-sides");
const canvasPianoInputsButton = getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = getElementById("canvas-piano-inputs");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-background");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-top-most-upper-part");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-top-upper-part");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-top-upper-part-center");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-top-lower-part");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-top-most-lower-part");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-whole-key");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-half-key");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-active-part-clicking-whole-key");
createTheDefaultCanvasColorInputFieldsAndListeners("piano-active-part-clicking-half-key");
const backgroundColorInput = getElementById("background-color");
const saveChangedColorsOnCanvasInput = getElementById("save-changed-colors-on-canvas-by-modified-background-color-input-value");
const resetColorsOnCanvasPart = getElementById("reset-colors-on-canvas-part");
const resetColorsOnCanvasInput = getElementById("reset-colors-on-canvas");
const reloadingTimeInput = getElementById("reloading-time");
const reloadingTimeSubmitButton = getElementById("reloading-time-submit-button");
const textItems = document.getElementsByTagName("text-item");
const textItemsColorInput = document.getElementById("text-items-color");
const defaultBackgroundColorValue = backgroundColorInput.value;
const defaultWholeKeyWidth = 16;
const defaultWholeKeyHeight = 104;
const defaultHalfKeyWidth = 7;
const defaultHalfKeyHeight = 68;
const defaultWholeOctaveWidth = 112;
const defaultWholeOctavesCount = 7;
let drawnKeysIndexes = [];
let drawnKeys = [];
let drawnHalfKeys = [];
let drawnWholeKeys = [];
let drawnKeysCount = 0;
let drawnWholeKeysCount = 0;
let drawnHalfKeysCount = 0;
let soundFrequency = 30;
let isStopDrawingKeys = false;
let isWindowClicked = false;
let isCanvasClicked = false;
let isCanvasWidthInputFocus = false;
let isCanvasHeightInputFocus = false;
let isCanvasWidthInputColorInputClicked = false;
let isCanvasHeightInputColorInputClicked = false;
let isCanvasInputsButtonClicked = false;
let isCanvasPianoInputsButtonClicked = false;
let isBackgroundColorInputClicked = false;
let isCanvasListener = false;
let isCanvasInputsHidden = true;
let isCanvasPianoInputsHidden = true;
let isCanvasInputsVisible = false;
let isCanvasInputsAndCanvasPianoInputsVisible = false;
let isAllCanvasInputsVisible = false;
let isCanvasPianoInputsVisible = false;
let isWindowMouseMove = false;
let isCanvasMouseMove = false;
let isWindowMouseDown = false;
let isCanvasMouseDown = false;
let isCanvasInputsResetColorsButtonMouseDown = false;
let isCanvasPianoInputsResetColorsButtonMouseDown = false;
let isReloadingTimeSubmitButtonMouseDown = false;
let isReloadingTimeSubmitButtonMouseUp = false;
let savedCanvasMouseValidPos = {
    x: NaN,
    y: NaN
};
window.addEventListener("mousemove", function () {
    isCanvasMouseMove = false;
    savedCanvasMouseValidPos.x = NaN;
    savedCanvasMouseValidPos.y = NaN;
}, true);
window.addEventListener("mouseup", function () {
    isWindowMouseDown = false;
    isCanvasMouseDown = false;
}, true);
window.addEventListener("mousedown", function () {
    isCanvasClicked = false;
    isCanvasInputsButtonClicked = false;
    isCanvasPianoInputsButtonClicked = false;
    window["isCanvasBorderColorInputClicked"] = false;
    window["isCanvasBackgroundColorInputClicked"] = false;
    window["isCanvasSongEditorLinesColorInputClicked"] = false;
    window["isCanvasSongEditorSidesColorInputClicked"] = false;
    window["isCanvasPianoBackgroundColorInputClicked"] = false;
    window["isCanvasPianoTopMostUpperPartColorInputClicked"] = false;
    window["isCanvasPianoTopUpperPartColorInputClicked"] = false;
    window["isCanvasPianoTopUpperPartCenterColorInputClicked"] = false;
    window["isCanvasPianoTopLowerPartColorInputClicked"] = false;
    window["isCanvasPianoTopMostLowerPartColorInputClicked"] = false;
    window["isCanvasPianoWholeKeyColorInputClicked"] = false;
    window["isCanvasPianoHalfKeyColorInputClicked"] = false;
    isCanvasInputsResetColorsButtonMouseDown = false;
    isCanvasPianoInputsResetColorsButtonMouseDown = false;
    isCanvasMouseDown = false;
    isWindowMouseDown = true;
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
    isWindowMouseMove = false;
    savedCanvasMouseValidPos.x = getValidInteger(getCanvasMousePos().x);
    savedCanvasMouseValidPos.y = getValidInteger(getCanvasMousePos().y);
    isCanvasMouseMove = true;
};
canvas.onmousedown = function () {
    isWindowMouseDown = false;
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
    saveChangedColorsOnCanvasInput.checked = false;
    if (!canvasInputs.hidden) {
        setCanvasInputs();
        if (!canvasPianoInputs.hidden) {
            setCanvasPianoInputs();
        }
    }
    canvasInputsResetColorsPart.hidden = true;
    canvasPianoInputsResetColorsPart.hidden = true;
};
canvasPianoInputsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasPianoInputsButtonClicked = true;
    if (isCanvasInputsVisible) {
        isAllCanvasInputsVisible = true;
    }
    isCanvasPianoInputsHidden = canvasPianoInputs.hidden = !canvasPianoInputs.hidden;
    isCanvasInputsAndCanvasPianoInputsVisible = isCanvasPianoInputsVisible = !canvasPianoInputs.hidden;
    canvasPianoInputsResetColorsPart.hidden = true;
};
canvasPianoInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    saveChangedColorsOnCanvasInput.checked = false;
    if (!canvasInputs.hidden && !canvasPianoInputs.hidden) {
        setCanvasPianoInputs();
    }
    canvasPianoInputsResetColorsPart.hidden = true;
};
backgroundColorInput.onclick = function () {
    isWindowClicked = false;
    isBackgroundColorInputClicked = true;
};
saveChangedColorsOnCanvasInput.onclick = function () {
    isWindowClicked = false;
};
resetColorsOnCanvasInput.onclick = function () {
    isWindowClicked = false;
    setCanvasInputs();
    setCanvasPianoInputs();
    saveChangedColorsOnCanvasInput.checked = false;
}
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
    const context = new AudioContext();
    let o = context.createOscillator();
    const g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    o.frequency.value = soundFrequency;
    o.start(0);
    o.detune = 200;
    console.log(g);
    soundFrequency *= 1.06;
    isWindowClicked = false;
    const isEmpty = isEmptyString(reloadingTimeInput.value);
    const reloadingTime = createIfAndElseAndReturns(isEmpty, 10, reloadingTimeInput.value);
    main(reloadingTime);
};

/**
 * @return <code style="color: #000000">creates the fields <em>({@link HTMLElement <code style="color: #7f008f">element</code>}, {@link PaymentCurrencyAmount.value <code style="color: #7f008f">defaultValue</code>}, {@link Number <code style="color: #3f5fef">clickedCount</code>}, {@link Boolean <code style="color: #1f3faf">isClicked</code>})</em> associated with the color input element;</code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name) {
    const fieldName = name + "Input";
    const fieldNameWithFirstUppercaseAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName);
    const fieldDefaultValueName = "default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value";
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-");
    window[fieldName] = element;
    window[fieldDefaultValueName] = element.value;
    window["is" + fieldNameWithFirstUppercaseAToZ + "Clicked"] = false;
    window[fieldResetColorPartName] = document.getElementById(fieldResetColorPartId);
    window[fieldResetColorPartName].hidden = window[fieldName].value === window[fieldDefaultValueName];
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(document.getElementById(elementId), name);
}

function createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, name) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name);
    const fieldName = name + "Input";
    const fieldNameWithFirstUppercaseAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(fieldName);
    const fieldDefaultValueName = "default" + changeLowercaseStringFirstLetterToUppercaseWithAToZ(name) + "Value";
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-");
    const fieldResetColorPart = document.getElementById(fieldResetColorPartId);
    window[fieldName].onclick = function () {
        isWindowClicked = false;
        window["is" + fieldNameWithFirstUppercaseAToZ + "Clicked"] = true;
        saveChangedColorsOnCanvasInput.checked = false;
    };
    fieldResetColorPart.onclick = function () {
        isWindowClicked = false;
        saveChangedColorsOnCanvasInput.checked = false;
        window[fieldName].value = window[fieldDefaultValueName];
    }
}

function createTheDefaultCanvasColorInputFieldsAndListeners(type) {
    const elementId = "canvas-" + type + "-color";
    const elementName = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(elementId, "-");
    createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, elementName);
}

function setCanvasInputs() {
    window["canvasBorderColorInput"].value = window["defaultCanvasBorderColorValue"];
    window["canvasBackgroundColorInput"].value = window["defaultCanvasBackgroundColorValue"];
    window["canvasSongEditorLinesColorInput"].value = window["defaultCanvasSongEditorLinesColorValue"];
    window["canvasSongEditorSidesColorInput"].value = window["defaultCanvasSongEditorSidesColorValue"];
}

function setCanvasPianoInputs() {
    window["canvasPianoBackgroundColorInput"].value = window["defaultCanvasPianoBackgroundColorValue"];
    window["canvasPianoTopMostUpperPartColorInput"].value = window["defaultCanvasPianoTopMostUpperPartColorValue"];
    window["canvasPianoTopUpperPartColorInput"].value = window["defaultCanvasPianoTopUpperPartColorValue"];
    window["canvasPianoTopUpperPartCenterColorInput"].value = window["defaultCanvasPianoTopUpperPartCenterColorValue"];
    window["canvasPianoTopLowerPartColorInput"].value = window["defaultCanvasPianoTopLowerPartColorValue"];
    window["canvasPianoTopMostLowerPartColorInput"].value = window["defaultCanvasPianoTopMostLowerPartColorValue"];
    window["canvasPianoWholeKeyColorInput"].value = window["defaultCanvasPianoWholeKeyColorValue"];
    window["canvasPianoHalfKeyColorInput"].value = window["defaultCanvasPianoHalfKeyColorValue"];
}

/**
 * @param value if this less than 0, then equal to 0; else this
 * @returns {number}
 */
function getValueIfGreaterThanOrEqualsZero(value) {
    value = getValidInteger(value);
    const stringValue = getValidString(value);
    value = stringValue.length > 0 ? value : 0;
    return stringValue[0] === "-" ? 0 : value;
}

function setCanvasWidth(value) {
    canvas.width = getValueIfGreaterThanOrEqualsZero(value);
}

function setCanvasHeight(value) {
    canvas.height = getValueIfGreaterThanOrEqualsZero(value);
}

function setCanvasSize(size) {
    setCanvasWidth(size);
    setCanvasHeight(size);
}

function loadCanvasSize() {
    const canvasWidth = canvasWidthInput.value;
    const canvasHeight = canvasHeightInput.value;
    if (!isCanvasWidthInputFocus && !isCanvasHeightInputFocus) {
        setCanvasSize(Math.min(innerWidth, innerHeight) * threeQuarter);
    } else {
        setCanvasWidth(createIfAndElseAndReturns(isCanvasWidthInputFocus, canvasWidth, innerWidth * threeQuarter));
        setCanvasHeight(createIfAndElseAndReturns(isCanvasHeightInputFocus, canvasHeight, innerHeight * threeQuarter));
    }
}

function addDrawnKeyIndex(index) {
    if (isValidInteger(index) && index > -1 && index < drawnKeysCount) {
        drawnKeysIndexes = placeIntegerToTheIncreasingIntegersArray(drawnKeysIndexes, index);
    }
}

function addDrawnKey(value) {
    drawnKeys.push(value);
}

function addDrawnWholeKeysParameters(value) {
    drawnWholeKeys.push({
        width: value.width,
        height: value.height,
        leftPart: value.leftPart,
        rightPart: value.rightPart,
        color: value.color
    });
}

function getPartOfNumber(number, numberOfParts, partOfNumber) {
    return getValidNumber(number) / (getValidNumber(numberOfParts) / validateNumber(partOfNumber, 0, numberOfParts));
}

function getPartOfWidth(width, partOfWidth) {
    return getPartOfNumber(canvas.width, width, partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return getPartOfNumber(canvas.height, height, partOfHeight);
}

function getWholeKeyWidth(width) {
    return getPartOfWidth(width, defaultWholeKeyWidth);
}

function getHalfKeyWidth(width) {
    return getPartOfWidth(width, defaultHalfKeyWidth);
}

function getPartOfHeightWithResizedCanvas(width, height, partOfHeight) {
    return createIfAndElseAndReturns(canvas.height > canvas.width, getPartOfWidth(width, partOfHeight * (height / 1000)), getPartOfHeight(height, partOfHeight));
}

function getHalfKeyHeight(width, height) {
    return getPartOfHeightWithResizedCanvas(width, height, defaultHalfKeyHeight);
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @param partOfHeight this is part of canvas-height
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, partOfHeight) {
    return getValidNumber(createIfAndElseAndReturns(canvas.height > canvas.width, canvas.height - canvas.width * (1 / getValidNumber(outOfCanvasHeightOfDivider)), getValidNumber(partOfHeight)));
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(outOfCanvasHeightOfDivider) {
    const partOfHeight = getValidNumber(canvas.height * (1 - (1 / outOfCanvasHeightOfDivider)));
    const valuePart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, partOfHeight);
    return createIfAndElseAndReturns(outOfCanvasHeightOfDivider >= 1, valuePart, canvas.height);
}

function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas) {
    height = getValidNumber(height);
    const valuePart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(getValidNumber(height / (height - getValidNumber(partOfHeightOfCanvas))));
    return createIfAndElseAndReturns(partOfHeightOfCanvas < height, valuePart, canvas.height);
}

function getTopOfPianoKeys(height) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 105);
}

function getWholeKeyHeight(height) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, defaultWholeKeyHeight);
}

function fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, partOfWidthPosX, stripeWidthPartOfWidth, stripeHeight) {
    fillColoredRect(style, getPartOfWidth(width, partOfWidthPosX), 0, getPartOfWidth(width, stripeWidthPartOfWidth), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, stripeHeight));
}

function fillOctaveOfPianoVerticalSongEditorStripes(style, width, height, partOfWidthAndStart, stripeWidth, stripeHeight) {
    const listOfNumberOfSpacesBetweenLines = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumberOfSpacesBetweenLines.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenLines[counter] : 0), counter++) {
        fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, i, stripeWidth, stripeHeight);
    }
}

function wholeKeyShapeXEqualsAndReturnsArray(width) {
    const partOfWidth = value => getPartOfWidth(width, value);
    const thirdElseReturn = ["3", partOfWidth(5), partOfWidth(3)];
    const secondElseReturn = ["2", partOfWidth(4), thirdElseReturn];
    const elseReturn = ["1", partOfWidth(3), secondElseReturn];
    return ["0", 0, elseReturn];
}

function getWholeKeyShapeX(type, width) {
    type = getValidString(type);
    const equalsAndReturnsArray = wholeKeyShapeXEqualsAndReturnsArray(width);
    return getReturnIfObjectEqualsArrayFirst(type, equalsAndReturnsArray);
}

function getWholeKeyShapeXs(typesArray, width) {
    let value = [];
    for (const element of getValidArray(typesArray)) {
        value.push(getWholeKeyShapeX(element, width));
    }
    return value;
}

function getFirstAndLastKeyTypeOfPiano(sizeOrKey, keyType, width, height) {
    const partOfWidth = value => getPartOfWidth(width, value);
    const partOfHeightWithResizedCanvas = value => getPartOfHeightWithResizedCanvas(width, height, value);
    const getValidFirstType = (firstType, first, last) => getObjectIfObjectEqualsArrayFirst(firstType, [first, [last, null]]);
    const isValidKeyTypeValue = keyTypeValue => isObjectEqualsSomeElementOfString(keyTypeValue, "0123");
    sizeOrKey = getValidFirstType(sizeOrKey, "size", "key");
    const wholeKeyWidth = getWholeKeyWidth(width) - partOfWidth(1);
    const wholeKeyHeight = getWholeKeyHeight(height);
    const keyTypeArguments = getArgumentsFromStringInArray(keyType);
    const keyTypeArgumentsCount = createIfAndElseAndReturns(isEmptyString(keyType), 0, keyTypeArguments.length);
    const firstName = getArgumentValidNameFromArgumentsInString(keyType, 1);
    const firstValue = getArgumentValidValueFromArgumentsInString(keyType, 1);
    const lastName = getArgumentValidNameFromArgumentsInString(keyType, 2);
    const lastValue = getArgumentValidValueFromArgumentsInString(keyType, 2);
    let keyFirstType = getReturnIfObjectEqualsArrayFirst(sizeOrKey, ["size", wholeKeyWidth, ["key", "0", null]]);
    let keyLastType = getReturnIfObjectEqualsArrayFirst(sizeOrKey, ["size", wholeKeyHeight, ["key", "0", null]]);
    if (keyTypeArgumentsCount <= 2) {
        function setOneKeyTypePart(argumentName, argumentValue) {
            if (sizeOrKey === "size" && argumentName === "width" && isStringNumber(argumentValue)) {
                keyFirstType = partOfWidth(Number.parseFloat(argumentValue));
            } else if (sizeOrKey === "key" && argumentName === "left") {
                keyFirstType = createIfAndElseAndReturns(isValidKeyTypeValue(argumentValue), argumentValue, "1");
            }
            if (sizeOrKey === "size" && argumentName === "height" && isStringNumber(argumentValue)) {
                keyLastType = partOfHeightWithResizedCanvas(Number.parseFloat(argumentValue));
            } else if (sizeOrKey === "key" && argumentName === "right") {
                keyLastType = createIfAndElseAndReturns(isValidKeyTypeValue(argumentValue), argumentValue, "1");
            }
        }
        setOneKeyTypePart(firstName, firstValue);
        setOneKeyTypePart(lastName, lastValue);
    }
    return [keyFirstType, keyLastType];
}

function getWholeKeyParametersOfPiano(type, sizeType, fillStyle, width, height, posX, posY) {
    const firstAndLastKeyType = (sizeOrKey, keyType) => getFirstAndLastKeyTypeOfPiano(sizeOrKey, keyType, width, height);
    const partOfHeightWithResizedCanvas = value => getPartOfHeightWithResizedCanvas(width, height, value);
    fillStyle = getValidString(fillStyle);
    width = getValidNumber(width);
    height = getValidNumber(height);
    posX = getValidNumber(posX);
    posY = getValidNumber(posY);
    const wholeKeyWidth = getWholeKeyWidth(width) - getPartOfWidth(width, 1);
    const wholeKeyHeight = getWholeKeyHeight(height);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const sizeTypes = firstAndLastKeyType("size", sizeType);
    const keyTypes = firstAndLastKeyType("key", type);
    const keyWidth = sizeTypes[0];
    const keyHeight = sizeTypes[1];
    const keyLeftType = keyTypes[0];
    const keyRightType = keyTypes[1];
    const canBeAddedWidthPart = keyWidth - wholeKeyWidth;
    const canBeAddedHeightPart = keyHeight - wholeKeyHeight;
    const leftPart = getWholeKeyShapeX(keyLeftType, width);
    const rightPart = getWholeKeyShapeX(keyRightType, width);
    const leftShapeXPart = posX + leftPart;
    const defaultUpperPartWidth = wholeKeyWidth - leftPart - rightPart;
    const lowerPartUp = posY + halfKeyHeight + partOfHeightWithResizedCanvas(1);
    const upperPartWidth = defaultUpperPartWidth + canBeAddedWidthPart;
    const lowerPartWidth = wholeKeyWidth + canBeAddedWidthPart;
    const defaultLowerPartHeight = wholeKeyHeight - halfKeyHeight - partOfHeightWithResizedCanvas(1);
    const upperPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -wholeKeyHeight, createIfAndElseAndReturns(canBeAddedHeightPart >= -defaultLowerPartHeight, wholeKeyHeight, wholeKeyHeight + canBeAddedHeightPart), 0);
    const lowerPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -defaultLowerPartHeight, defaultLowerPartHeight + canBeAddedHeightPart, 0);
    return {
        style: fillStyle,
        upperPartX: leftShapeXPart,
        upperPartY: posY,
        lowerPartX: posX,
        lowerPartY: lowerPartUp,
        upperPartWidth: upperPartWidth,
        upperPartHeight: upperPartHeight,
        lowerPartWidth: lowerPartWidth,
        lowerPartHeight: lowerPartHeight
    }
}

function drawWholeKeyOfPiano(type, sizeType, fillStyle, width, height, posX, posY) {
    const parameters = getWholeKeyParametersOfPiano(type, sizeType, fillStyle, width, height, posX, posY);
    const style = parameters.style;
    const upperPartX = parameters.upperPartX;
    const upperPartY = parameters.upperPartY;
    const lowerPartX = parameters.lowerPartX;
    const lowerPartY = parameters.lowerPartY;
    const upperPartWidth = parameters.upperPartWidth;
    const upperPartHeight = parameters.upperPartHeight;
    const lowerPartWidth = parameters.lowerPartWidth;
    const lowerPartHeight = parameters.lowerPartHeight;

    begin();
    fillColoredRect(style, upperPartX, upperPartY, upperPartWidth, upperPartHeight);
    fillColoredRect(style, lowerPartX, lowerPartY, lowerPartWidth, lowerPartHeight);
    if (!isStopDrawingKeys) {
        drawnKeysCount++;
        drawnWholeKeysCount++;
    }
}

function drawKeyOfPiano(type, sizeType, fillStyle, width, height, posX, posY) {
    const typeFirstArgumentName = getArgumentValidNameFromArgumentsInString(type);
    const isTypeFirstArgumentName = isArgumentValidNameAndColonFromArgumentsInString(type);
    const isTypeContainsColon = isContainsSearchInString(type);
    begin();
    if (typeFirstArgumentName === "whole" && isTypeContainsColon) {
        const colonIndex = getStringIndexOf(type, ":");
        const validType = StringManipulation.removeSubStringWithToIndex(type, colonIndex);
        if (isTypeFirstArgumentName) {
            fillColoredRect(fillStyle, posX, posY, getWholeKeyWidth(width), getWholeKeyHeight(height));
            if (!isStopDrawingKeys) {
                drawnKeysCount++;
            }
        } else {
            drawWholeKeyOfPiano(validType, sizeType, fillStyle, width, height, posX, posY);
        }
    } else if (type === "half") {
        fillColoredRect(fillStyle, posX, posY, getHalfKeyWidth(width), getHalfKeyHeight(width, height));
        if (!isStopDrawingKeys) {
            drawnKeysCount++;
            drawnHalfKeysCount++;
        }
    } else {
        const sizeTypes = getFirstAndLastKeyTypeOfPiano("size", sizeType, width, height);
        const keyWidth = sizeTypes[0];
        const keyHeight = sizeTypes[1];
        fillColoredRect(fillStyle, posX, posY, keyWidth, keyHeight);
        if (!isStopDrawingKeys) {
            drawnKeysCount++;
        }
    }
}

function drawHalfKeyOfPiano(fillStyle, width, height, posX) {
    drawKeyOfPiano("half", "", fillStyle, width, height, getPartOfWidth(width, posX), getTopOfPianoKeys(height));
}

function drawWholeKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    const leftTypes = StringManipulation.convertElementsToArray("0130123");
    const rightTypes = StringManipulation.convertElementsToArray("3103210");
    for (let i = partOfWidthAndStart, counter = 0; counter < defaultWholeOctavesCount; i += defaultWholeKeyWidth, counter++) {
        const type = "left:" + leftTypes[counter] + ",right:" + rightTypes[counter];
        const posX = getPartOfWidth(width, i);
        const posY = getTopOfPianoKeys(height);
        drawWholeKeyOfPiano(type, "", fillStyle, width, height, posX, posY);
    }
}

function drawHalfKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
        drawHalfKeyOfPiano(fillStyle, width, height, i);
    }
}

function drawOctaveOfPiano(wholeKeyFillStyle, halfKeyFillStyle, width, height, partOfWidthAndStart) {
    const halfKeyOctavePartOfWidthAndStart = partOfWidthAndStart + 11;
    drawWholeKeyOctaveOfPiano(wholeKeyFillStyle, width, height, partOfWidthAndStart);
    drawHalfKeyOctaveOfPiano(halfKeyFillStyle, width, height, halfKeyOctavePartOfWidthAndStart);
}

function drawClassicPianoAndSonkEditorLines() {
    isCanvasListener = true;
    loadCanvasSize();
    const width = 834;
    const height = 912;
    const defaultPianoTop = height - 114;
    const defaultTopOfKeys = height - 105;
    const defaultOctaveWidth = 112;
    const wholeOctavesCount = 7;
    const pianoTop = partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(defaultPianoTop);
    const topOfKeys = partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(defaultTopOfKeys);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const wholeKeyWidth = getWholeKeyWidth(width);
    const wholeKeyHeight = getWholeKeyHeight(height);
    const leftTypes = StringManipulation.convertElementsToArray("0130123");
    const rightTypes = StringManipulation.convertElementsToArray("3103210");
    const leftTypesValues = getWholeKeyShapeXs(leftTypes, width);
    const rightTypesValues = getWholeKeyShapeXs(rightTypes, width);
    const namedModifiedColors = {
        canvasBorderColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasBackgroundColor: backgroundColorInput.value,
        canvasSongEditorLinesColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasSongEditorSidesColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasPianoBackgroundColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasPianoTopMostUpperPartColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasPianoTopUpperPartColor: tHex.getRgbEighthToSevenEighthsHex(backgroundColorInput.value),
        canvasPianoTopUpperPartCenterColor: backgroundColorInput.value,
        canvasPianoTopLowerPartColor: tHex.getReverseRgbSixteenToFifteenSixteensHex(backgroundColorInput.value),
        canvasPianoTopMostLowerPartColor: tHex.getReverseRgbEighthToSevenEighthsHex(backgroundColorInput.value),
        canvasPianoWholeKeyColor: backgroundColorInput.value,
        canvasPianoHalfKeyColor: tHex.getReverseHex(backgroundColorInput.value)
    };
    const modifiedColors = [
        namedModifiedColors.canvasBorderColor,
        namedModifiedColors.canvasBackgroundColor,
        namedModifiedColors.canvasSongEditorLinesColor,
        namedModifiedColors.canvasSongEditorSidesColor,
        namedModifiedColors.canvasPianoBackgroundColor,
        namedModifiedColors.canvasPianoTopMostUpperPartColor,
        namedModifiedColors.canvasPianoTopUpperPartColor,
        namedModifiedColors.canvasPianoTopUpperPartCenterColor,
        namedModifiedColors.canvasPianoTopLowerPartColor,
        namedModifiedColors.canvasPianoTopMostLowerPartColor,
        namedModifiedColors.canvasPianoWholeKeyColor,
        namedModifiedColors.canvasPianoHalfKeyColor
    ];
    const pianoBackgroundColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-background-color", namedModifiedColors.canvasPianoBackgroundColor);
    const wholeKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-whole-key-color", namedModifiedColors.canvasPianoWholeKeyColor);
    const halfKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-half-key-color", namedModifiedColors.canvasPianoHalfKeyColor);

    function partOfWidth(value) {
        return getPartOfWidth(width, value);
    }

    function firstAndLastKeyType(sizeOrKey, keyType) {
        return getFirstAndLastKeyTypeOfPiano(sizeOrKey, keyType, width, height);
    }

    function partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(partOfHeightOfCanvas) {
        return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas);
    }

    function getColorWithNotSaveChangedColorsOnCanvas(fieldNameWithWordsSeparatorsOfHyphen, modifiedColor) {
        const validName = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(fieldNameWithWordsSeparatorsOfHyphen, "-");
        const inputString = validName + "Input";
        let colorValue = window[inputString].value;
        window[inputString].value = colorValue = createIfAndElseAndReturns(saveChangedColorsOnCanvasInput.checked, modifiedColor, colorValue);
        return colorValue;
    }

    function drawVerticalSonkEditorLines() {
        const linesColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-song-editor-lines-color", namedModifiedColors.canvasSongEditorLinesColor);
        const sidesColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-song-editor-sides-color", namedModifiedColors.canvasSongEditorSidesColor);

        function fillVerticalColoredStripeFrom0ToPianoTop(partOfWidthAndStart) {
            fillVerticalColoredStripeWithWidthAndPartOfWidth(linesColor, width, height, partOfWidthAndStart, 1, defaultPianoTop);
        }

        function drawOctave(from) {
            fillOctaveOfPianoVerticalSongEditorStripes(linesColor, width, height, from, 1, defaultPianoTop);
        }

        fillVerticalColoredStripeWithWidthAndPartOfWidth(sidesColor, width, height, 0, 1, height);
        fillVerticalColoredStripeFrom0ToPianoTop(0);
        fillVerticalColoredStripeFrom0ToPianoTop(14);
        fillVerticalColoredStripeFrom0ToPianoTop(22);
        for (let i = 33, counter = 0; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
            drawOctave(i);
        }
        fillVerticalColoredStripeWithWidthAndPartOfWidth(sidesColor, width, height, width - 1, 1, height);
        fillVerticalColoredStripeFrom0ToPianoTop(width - 1);
    }

    function drawClassicPiano() {
        const topMostUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-upper-part-color", namedModifiedColors.canvasPianoTopMostUpperPartColor);
        const topUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-color", namedModifiedColors.canvasPianoTopUpperPartColor);
        const topUpperPartCenterColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-center-color", namedModifiedColors.canvasPianoTopUpperPartCenterColor);
        const topLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-lower-part-color", namedModifiedColors.canvasPianoTopLowerPartColor);
        const topMostLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-lower-part-color", namedModifiedColors.canvasPianoTopMostLowerPartColor);

        function drawWholeKey(type, sizeType, partOfWidthPosX) {
            drawWholeKeyOfPiano(type, sizeType, wholeKeyColor, width, height, partOfWidth(partOfWidthPosX), topOfKeys);
        }

        function drawHalfKey(partOfWidthPosX) {
            drawHalfKeyOfPiano(halfKeyColor, width, height, partOfWidthPosX);
        }

        function drawOctave(from) {
            drawOctaveOfPiano(wholeKeyColor, halfKeyColor, width, height, from);
        }

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, partOfWidth(1), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - (114 - posY)), partOfWidth(width - 2), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(rectHeight));
        }

        fillColoredRectWithPartOfHeight(pianoBackgroundColor, 0, 114);
        fillColoredRectWithPartOfHeight(topMostUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(topUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(topUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(topLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(topMostLowerPartColor, 8, 1);
        drawWholeKey("right: 1", "width: 16", 1);
        drawWholeKey("left: 3", "", 18);
        drawHalfKey(15);
        let startsOfOctaves = 34;
        for (let counter = 0; counter < wholeOctavesCount; startsOfOctaves += defaultOctaveWidth, counter++) {
            drawOctave(startsOfOctaves);
        }
        drawWholeKey("", "", startsOfOctaves);
    }

    for (let i = 0; i < textItems.length; i++) {
        textItems.item(i).setAttribute("style", "color: " + textItemsColorInput.value);
    }

    canvas.style.border = "1px solid" + getColorWithNotSaveChangedColorsOnCanvas("canvas-border-color", namedModifiedColors.canvasBorderColor);
    canvas.style.backgroundColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-background-color", namedModifiedColors.canvasBackgroundColor);
    document.body.style.backgroundColor = getObjectIfEqualsObjects(backgroundColorInput.value, defaultBackgroundColorValue);
    document.getElementById("canvas-width").style.backgroundColor = canvasWidthInputBackgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = canvasHeightInputBackgroundColorInput.value;
    document.getElementById("canvas-width").style.color = canvasWidthInputColorInput.value;
    document.getElementById("canvas-height").style.color = canvasHeightInputColorInput.value;
    drawVerticalSonkEditorLines();
    drawClassicPiano();
    isStopDrawingKeys = true;
    if (isCanvasMouseDown) {
        if (savedCanvasMouseValidPos.y >= topOfKeys && savedCanvasMouseValidPos.y <= canvas.height) {
            const clickingWholeKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-whole-key-color", tHex.getRgbThreeQuarterHex(backgroundColorInput.value));
            const clickingHalfKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-half-key-color", tHex.getReverseRgbThreeQuarterHex(backgroundColorInput.value));
            const isMousePosLessThanOrEqualsHalfKeyDown = savedCanvasMouseValidPos.y <= (topOfKeys + halfKeyHeight);
            const isMousePosLessThanOrEqualsWholeKeyDown = savedCanvasMouseValidPos.y <= (topOfKeys + wholeKeyHeight);

            function loadingHalfKeyClickingPosition(fillStyle, posX) {
                const isMousePosXLessThanOrEqualsHalfKeyWidthPos = savedCanvasMouseValidPos.x <= partOfWidth(posX + defaultHalfKeyWidth);
                const isMousePosXBetweenHalfKeyAndWidthPos = savedCanvasMouseValidPos.x >= partOfWidth(posX) && isMousePosXLessThanOrEqualsHalfKeyWidthPos;
                const isValid = isMousePosLessThanOrEqualsHalfKeyDown && isMousePosXBetweenHalfKeyAndWidthPos;
                if (isValid) {
                    drawHalfKeyOfPiano(fillStyle, width, height, posX);
                }
            }

            function loadingWholeKeyClickingPosition(type, sizeType, fillStyle, posX) {
                const typeArray = firstAndLastKeyType("key", type);
                const leftTypeValue = getWholeKeyShapeX(typeArray[0], width);
                const rightTypeValue = getWholeKeyShapeX(typeArray[1], width);
                const leftTypePosX = partOfWidth(posX) + leftTypeValue;
                const rightTypePosX = partOfWidth(posX) + wholeKeyWidth - rightTypeValue;
                const halfKeyDownPosY = topOfKeys + halfKeyHeight;
                const isMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.y <= halfKeyDownPosY;
                const ifMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.x >= leftTypePosX && savedCanvasMouseValidPos.x <= rightTypePosX;
                const ifMousePosYGreaterThanHalfKeyDownPosY = savedCanvasMouseValidPos.x >= partOfWidth(posX) && savedCanvasMouseValidPos.x <= partOfWidth(posX + defaultWholeKeyWidth);
                const ifMousePosYLessThanOrEqualsWholeKeyDownPosY = createIfAndElseAndReturns(isMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYGreaterThanHalfKeyDownPosY);
                const isValid = createIfAndElseAndReturns(isMousePosLessThanOrEqualsWholeKeyDown, ifMousePosYLessThanOrEqualsWholeKeyDownPosY, false);
                if (isValid) {
                    drawWholeKeyOfPiano(type, sizeType, fillStyle, width, height, partOfWidth(posX), topOfKeys);
                }
            }

            function loadingHalfKeyOctaveClickingPositions(fillStyle, partOfWidthAndStart) {
                const listOfNumberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
                const maxLength = listOfNumberOfSpacesBetweenHalfKeys.length;
                for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenHalfKeys[counter] : 0), counter++) {
                    loadingHalfKeyClickingPosition(fillStyle, i);
                }
            }

            function loadingWholeKeyOctaveClickingPositions(fillStyle, partOfWidthAndStart) {
                for (let i = partOfWidthAndStart, counter = 0; counter < wholeOctavesCount; i += 16, counter++) {
                    loadingWholeKeyClickingPosition("left:" + leftTypes[counter] + ",right:" + rightTypes[counter], "", fillStyle, i);
                }
            }

            const clickingKeyColor = "#e71111";

            loadingHalfKeyClickingPosition(clickingKeyColor, 15);
            for (let counter = 0, i = 45; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
                loadingHalfKeyOctaveClickingPositions(clickingKeyColor, i);
            }

            loadingWholeKeyClickingPosition("right: 1", "width: 16", clickingKeyColor, 1);
            loadingWholeKeyClickingPosition("left: 3", "", clickingKeyColor, 18);
            let j = 34;
            for (let counter = 0; counter < wholeOctavesCount; j += defaultOctaveWidth, counter++) {
                loadingWholeKeyOctaveClickingPositions(clickingKeyColor, j);
            }
            loadingWholeKeyClickingPosition("", "", clickingKeyColor, j);
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
    self.canvasFieldsCount = 0;

    if (isWindowClicked) {
        if (isEmptyString(canvasWidthInput.value) && isCanvasWidthInputFocus) {
            isCanvasWidthInputFocus = false;
        }
        if (isEmptyString(canvasHeightInput.value) && isCanvasHeightInputFocus) {
            isCanvasHeightInputFocus = false;
        }
        loadCanvasSize();
        isBackgroundColorInputClicked = false;
    }

    if (isCanvasMouseMove) {
        canvasMousePositionXSpan.innerText = savedCanvasMouseValidPos.x;
        canvasMousePositionYSpan.innerText = savedCanvasMouseValidPos.y;
    }

    function canvasFieldValidName(type) {
        const validType = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(type, "-");
        const changedValidTypeFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(validType);
        return "canvas" + changedValidTypeFirstLetterAToZ + "Color";
    }

    function createIsCanvasColorInputValueEqualsDefaultColorField(type) {
        const validName = canvasFieldValidName(type);
        const changedValidNameFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(validName);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsDefaultColor";
        const inputName = validName + "Input";
        const defaultValue = "default" + changedValidNameFirstLetterAToZ + "Value";
        self[fieldName] = window[inputName].value === window[defaultValue];
        self.canvasFieldsCount++;
    }

    function createAllIsCanvasColorInputValueEqualsDefaultColorFields(typesArray) {
        for (const element of typesArray) {
            createIsCanvasColorInputValueEqualsDefaultColorField(element);
        }
    }

    function isCanvasField(type) {
        const validName = canvasFieldValidName(type);
        const changedValidNameFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(validName);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsDefaultColor";
        return self[fieldName];
    }

    function isCanvasFieldsWithArray(typesArray) {
        typesArray = getValidArray(typesArray);
        let isTrue = true;
        for (const element of typesArray) {
            isTrue = isTrue && isCanvasField(element);
        }
        return isTrue;
    }

    function isAllCanvasFields() {
        return isCanvasFieldsWithArray(canvasColorInputTypes);
    }

    createAllIsCanvasColorInputValueEqualsDefaultColorFields(canvasColorInputTypes);
    for (let i = 0; i < self.canvasFieldsCount; i++) {
        const inputType = canvasColorInputTypes[i];
        const fieldValidName = canvasFieldValidName(inputType);
        window[fieldValidName + "ResetColorPart"].hidden = isCanvasField(inputType);
    }
    const canvasInputsTypes = subArrayWithToIndex(canvasColorInputTypes, 3);
    const canvasPianoInputsTypes = subArrayWithFromIndex(canvasColorInputTypes, 4);
    const isCanvasInputsEqualsDefaultColorIfPianoInputsHidden = isCanvasFieldsWithArray(canvasInputsTypes);
    const isCanvasPianoInputsEqualsDefaultColor = isCanvasFieldsWithArray(canvasPianoInputsTypes);
    const isCanvasInputsEqualsDefaultColor = isAllCanvasFields();
    canvasInputsResetColorsPart.hidden = createIfAndElseAndReturns(!canvasInputs.hidden, createIfAndElseAndReturns(canvasPianoInputs.hidden, isCanvasInputsEqualsDefaultColorIfPianoInputsHidden, isCanvasInputsEqualsDefaultColor), true);
    canvasPianoInputsResetColorsPart.hidden = createIfAndElseAndReturns(!canvasInputs.hidden && !canvasPianoInputs.hidden, isCanvasPianoInputsEqualsDefaultColor, true);
    resetColorsOnCanvasPart.hidden = isCanvasInputsEqualsDefaultColor;
    drawClassicPianoAndSonkEditorLines();
}

drawPianoSongEditor();
