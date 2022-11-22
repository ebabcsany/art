import {
    getCanvasColorInputClickedNameFromName,
    getCanvasColorInputClickedNameFromType,
    getCanvasColorInputId,
    getCanvasColorInputNameFromType,
    getDefaultCanvasColorInputNameFromName,
    setDefaultCanvasColorInputValueFromType
} from "./defines.js";
import {
    canvasHeightInput,
    canvasWidthInput,
    changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs,
    changeLowercaseStringFirstLetterToUppercaseWithAToZ,
    createArrayFromOneElement,
    createIfAndElseAndReturns,
    createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength,
    fillColoredRect,
    getCanvasMousePos,
    getObjectIfEqualsObjects,
    getObjectIfObjectArrayElementEqualsArrayFirst,
    getObjectIfObjectEqualsArrayFirst,
    getReturnIfArrayFirstTrue,
    getReturnIfObjectEqualsArrayFirst,
    getValidArray,
    getValidInteger,
    getValidNumber,
    getValidSearchTh,
    getValidString,
    isEmptyString,
    isIntegersArray,
    isObjectEqualsSomeElementOfString,
    isValidInteger,
    placeIntegerToTheIncreasingIntegersArray,
    placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ,
    subArray,
    subArrayWithFromIndex,
    subArrayWithToIndex,
    tHex,
    threeQuarter,
    validateIntegerWithMin,
    validateNumberWithMin
} from "../art-script/script.js";
import {StringManipulation} from "../art-script/stringManipulation.js";

window.canvas = document.getElementById("piano-song-editor");
window.context = canvas.getContext("2d");
const canvasMousePositionXSpan = document.getElementById("canvas-mouse-position-x");
const canvasMousePositionYSpan = document.getElementById("canvas-mouse-position-y");
const canvasWidthInputBackgroundColorInput = document.getElementById("canvas-width-input-background-color");
const canvasHeightInputBackgroundColorInput = document.getElementById("canvas-height-input-background-color");
const canvasWidthInputColorInput = document.getElementById("canvas-width-input-color");
const canvasHeightInputColorInput = document.getElementById("canvas-height-input-color");
const canvasInputsButton = document.getElementById("canvas-inputs-button");
const canvasInputsResetColorsPart = document.getElementById("canvas-inputs-reset-colors-part");
const canvasInputsResetColorsButton = document.getElementById("canvas-inputs-reset-colors-button");
const canvasInputs = document.getElementById("canvas-inputs");
const canvasColorInputTypes = [
    "border",
    "background",
    "song-editor-stripes",
    "piano-background",
    "piano-top-most-upper-part",
    "piano-top-upper-part",
    "piano-top-upper-part-center",
    "piano-top-lower-part",
    "piano-top-most-lower-part",
    "piano-whole-key",
    "piano-half-key",
    "piano-active-part-clicking-whole-key",
    "piano-active-part-clicking-half-key",
    "piano-active-part-moving-bar-belonging-whole-key",
    "piano-active-part-moving-bar-belonging-half-key"
];
for (const canvasColorInputType of canvasColorInputTypes) {
    createTheDefaultCanvasColorInputFieldsAndListeners(canvasColorInputType);
}
const canvasInputsColorInputsTypes = subArrayWithToIndex(canvasColorInputTypes, 2);
const canvasPianoInputsColorInputsTypes = subArray(canvasColorInputTypes, 3, 10);
const canvasPianoActivePartInputsColorInputsTypes = subArrayWithFromIndex(canvasColorInputTypes, 11);
const canvasPianoInputsButton = document.getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = document.getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = document.getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = document.getElementById("canvas-piano-inputs");
const backgroundColorInput = document.getElementById("background-color");
const isCanvasBackgroundColorTransparentInput = document.getElementById("is-canvas-background-color-transparent");
const saveChangedColorsOnCanvasInput = document.getElementById("save-changed-colors-on-canvas-by-modified-background-color-input-value");
const saveCanvasInputsColors = document.getElementById("save-canvas-inputs-colors");
const resetColorsOnCanvasPart = document.getElementById("reset-colors-on-canvas-part");
const resetColorsOnCanvasInput = document.getElementById("reset-colors-on-canvas");
const reloadingTimeInput = document.getElementById("reloading-time");
const reloadingTimeSubmitButton = document.getElementById("reloading-time-submit-button");
const textItems = document.getElementsByTagName("text-item");
const textItemsColorInput = document.getElementById("text-items-color");
const defaultBackgroundColorValue = backgroundColorInput.value;
let savedCanvasInputsColors = undefined;
const defaultWholeKeyWidthOfPiano = 15;
const defaultWholeKeyHeightOfPiano = 104;
const defaultHalfKeyWidth = 7;
const defaultHalfKeyHeight = 68;
const defaultWholeOctaveWidth = 112;
const keySoundPitchesArray = [];
const keyBetweenSoundsSpacesArray = [];
let drawnKeyIndex = -1;
let drawnKeysIndexes = [];
let drawnKeys = [];
let drawnHalfKeys = [];
let drawnWholeKeys = [];
let drawnKeysCount = 0;
let drawnWholeKeysCount = 0;
let drawnHalfKeysCount = 0;
let canvasReloadingCounter = 0;
let isStopCanvasReloading = false;
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
    const getNameFromType = (type) => getCanvasColorInputClickedNameFromType(type);
    window[getNameFromType("border")] = false;
    window[getNameFromType("background")] = false;
    window[getNameFromType("song-editor-stripes")] = false;
    window[getNameFromType("piano-background")] = false;
    window[getNameFromType("piano-top-most-upper-part")] = false;
    window[getNameFromType("piano-top-upper-part")] = false;
    window[getNameFromType("piano-top-upper-part-center")] = false;
    window[getNameFromType("piano-top-lower-part")] = false;
    window[getNameFromType("piano-top-most-lower-part")] = false;
    window[getNameFromType("piano-whole-key")] = false;
    window[getNameFromType("piano-half-key")] = false;
    window[getNameFromType("piano-active-part-clicking-whole-key")] = false;
    window[getNameFromType("piano-active-part-clicking-half-key")] = false;
    window[getNameFromType("piano-active-part-moving-bar-belonging-whole-key")] = false;
    window[getNameFromType("piano-active-part-moving-bar-belonging-half-key")] = false;
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
    if (isWindowMouseDown) {
        isCanvasMouseDown = true;
    }
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
saveCanvasInputsColors.onclick = function () {
    const values = getCanvasInputsValues();
    const defaultValues = getCanvasInputsDefaultValues();
    if (saveCanvasInputsColors.checked) {
        savedCanvasInputsColors = values;
    } else {
        savedCanvasInputsColors = defaultValues;
    }
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
    isWindowClicked = false;
    const soundVolume = getKeySoundVolumeWithSteps(1, 100);
    console.log(soundVolume);
    createKeySoundPitchWithSteps(soundVolume, 63, 30);
    const isEmpty = isEmptyString(reloadingTimeInput.value);
    const reloadingTime = createIfAndElseAndReturns(isEmpty, 10, reloadingTimeInput.value);
    main(reloadingTime);
};

/**
 * @return <code style="color: #000000">creates the fields <em>({@link HTMLElement <code style="color: #7f008f">element</code>}, {@link String <code style="color: #7f008f">name</code>})</em> associated with the color input element;</code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name) {
    const fieldName = name + "Input";
    const fieldDefaultValueName = getDefaultCanvasColorInputNameFromName(name);
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-");
    window[fieldName] = element;
    window[fieldDefaultValueName] = element.value;
    window[getCanvasColorInputClickedNameFromName(name)] = false;
    window[fieldResetColorPartName] = document.getElementById(fieldResetColorPartId);
    window[fieldResetColorPartName].hidden = window[fieldName].value === window[fieldDefaultValueName];
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(document.getElementById(elementId), name);
}

function createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, name) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name);
    const fieldName = name + "Input";
    const fieldDefaultValueName = getDefaultCanvasColorInputNameFromName(name);
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-");
    const fieldResetColorPart = document.getElementById(fieldResetColorPartId);
    window[fieldName].onclick = function () {
        isWindowClicked = false;
        window[getCanvasColorInputClickedNameFromName(name)] = true;
        saveChangedColorsOnCanvasInput.checked = false;
    };
    fieldResetColorPart.onclick = function () {
        isWindowClicked = false;
        saveChangedColorsOnCanvasInput.checked = false;
        window[fieldName].value = window[fieldDefaultValueName];

    }
}

function getCanvasInputsValues() {
    let value = [];
    for (const element of canvasColorInputTypes) {
        const field = document.getElementById(getCanvasColorInputId(element));
        value.push(field.value);
    }
    return value;
}

function getCanvasInputsDefaultValues() {
    let value = [];
    for (const element of canvasColorInputTypes) {
        const field = document.getElementById(getCanvasColorInputId(element));
        value.push(field.defaultValue);
    }
    return value;
}

function createTheDefaultCanvasColorInputFieldsAndListeners(type) {
    const elementId = getCanvasColorInputId(type);
    const elementName = getCanvasColorInputNameFromType(type);
    createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, elementName);
}

function setCanvasInputs() {
    setDefaultCanvasColorInputValueFromType("border");
    setDefaultCanvasColorInputValueFromType("background");
    setDefaultCanvasColorInputValueFromType("song-editor-stripes");
}

function setCanvasPianoInputs() {
    setDefaultCanvasColorInputValueFromType("piano-background");
    setDefaultCanvasColorInputValueFromType("piano-top-most-upper-part");
    setDefaultCanvasColorInputValueFromType("piano-top-upper-part");
    setDefaultCanvasColorInputValueFromType("piano-top-upper-part-center");
    setDefaultCanvasColorInputValueFromType("piano-top-lower-part");
    setDefaultCanvasColorInputValueFromType("piano-top-most-lower-part");
    setDefaultCanvasColorInputValueFromType("piano-whole-key");
    setDefaultCanvasColorInputValueFromType("piano-half-key");
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
        const newCanvasWidth = createIfAndElseAndReturns(isCanvasWidthInputFocus, canvasWidth, innerWidth * threeQuarter);
        const newCanvasHeight = createIfAndElseAndReturns(isCanvasHeightInputFocus, canvasHeight, innerHeight * threeQuarter);
        setCanvasWidth(newCanvasWidth);
        setCanvasHeight(newCanvasHeight);
    }
}

function addDrawnKeyIndex(index) {
    if (isValidInteger(index) && index > -1 && index < drawnKeysCount) {
        drawnKeysIndexes = placeIntegerToTheIncreasingIntegersArray(drawnKeysIndexes, index);
    }
}

function addDrawnKey(value) {
    drawnKeys.push(value);
    drawnKeysCount++;
}

function addDrawnWholeKey(value) {
    drawnWholeKeys.push(value);
    drawnWholeKeysCount++;
}

function addDrawnHalfKey(value) {
    drawnHalfKeys.push(value);
    drawnHalfKeysCount++;
}

function getPartOfNumber(number, numberOfParts, partOfNumber) {
    number = getValidNumber(number);
    numberOfParts = validateIntegerWithMin(numberOfParts, 0);
    partOfNumber = getValidNumber(partOfNumber);
    return number / (numberOfParts / partOfNumber);
}

function getNumberOfPart(number, numberOfParts, part) {
    number = getValidNumber(number);
    numberOfParts = validateIntegerWithMin(numberOfParts, 0);
    part = getValidNumber(part);
    return numberOfParts / (number / part);
}

function getPartOfWidth(width, partOfWidth) {
    return getPartOfNumber(canvas.width, width, partOfWidth);
}

function getPartOfHeight(height, partOfHeight) {
    return getPartOfNumber(canvas.height, height, partOfHeight);
}

function getWholeKeyWidth(width) {
    return getPartOfWidth(width, defaultWholeKeyWidthOfPiano);
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
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, defaultWholeKeyHeightOfPiano);
}

function fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, partOfWidthPosX, stripeWidthPartOfWidth, stripeHeight) {
    fillColoredRect(style, getPartOfWidth(width, partOfWidthPosX), 0, getPartOfWidth(width, stripeWidthPartOfWidth), getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, stripeHeight));
}

function fillOctaveOfPianoVerticalSongEditorStripes(style, width, height, partOfWidthAndStart, stripeWidth, stripeHeight) {
    const listOfNumberOfSpacesBetweenStripes = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumberOfSpacesBetweenStripes.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenStripes[counter] : 0), counter++) {
        fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, i, stripeWidth, stripeHeight);
    }
}

function getWholeKeyShapeXEqualsAndReturnsArray() {
    return ["0", 0, ["1", 3, ["2", 4, ["3", 5, 3]]]];
}

function getWholeKeyShapeX(type) {
    type = getValidString(type);
    const equalsAndReturnsArray = getWholeKeyShapeXEqualsAndReturnsArray();
    return getReturnIfObjectEqualsArrayFirst(type, equalsAndReturnsArray);
}

function getWholeKeyShapeXs(typesArray, width) {
    let value = [];
    for (const element of getValidArray(typesArray)) {
        const defaultShapeX = getWholeKeyShapeX(element);
        const shapeX = getPartOfWidth(width, defaultShapeX);
        value.push(shapeX);
    }
    return value;
}

function getDefaultWholeKeyShapeX(type, width) {
    const shapeX = getWholeKeyShapeX(type);
    return getPartOfWidth(width, shapeX);
}

function getDefaultWholeKeyShapeXs(typesArray, width) {
    let value = [];
    for (const element of getValidArray(typesArray)) {
        const wholeKeyShapeX = getDefaultWholeKeyShapeX(element, width);
        value.push(wholeKeyShapeX);
    }
    return value;
}

class KeyParametersOfPiano {
    isValidWholeKeyType(value) {
        return isObjectEqualsSomeElementOfString(value, "0123");
    }

    getValidWholeKeyType(value) {
        return createIfAndElseAndReturns(this.isValidWholeKeyType(value), value, "0");
    }

    constructor(keyWidth, keyHeight, fillStyle, width, height, posX, posY) {
        keyWidth = validateNumberWithMin(keyWidth, 0);
        keyHeight = validateNumberWithMin(keyHeight, 0);
        width = validateIntegerWithMin(width, 0);
        height = validateIntegerWithMin(height, 0);
        posX = validateIntegerWithMin(posX, 0);
        posY = validateIntegerWithMin(posY, 0);
        this.keyParameters = {keyWidth, keyHeight, fillStyle, width, height, posX, posY};
        this.type = "";
        this.keyType = {
            width: keyWidth,
            height: keyHeight,
            defaultWidth: getPartOfWidth(width, keyWidth),
            defaultHeight: getPartOfHeightWithResizedCanvas(width, height, keyHeight)
        };
        this.fillStyle = tHex.getValidRgbHex(fillStyle);
        this.canvasPartsCount = {
            width,
            height,
            defaultWidth: canvas.width,
            defaultHeight: canvas.height
        };
        this.pos = {
            x: posX,
            y: posY,
            defaultX: getPartOfWidth(width, posX),
            defaultY: getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, posY)
        };
    }

    getType() {
        return this.type;
    }

    getKeyType() {
        return this.keyType;
    }

    getFillStyle() {
        return this.fillStyle;
    }

    getCanvasPartsCount() {
        return this.canvasPartsCount;
    }

    getPos() {
        return this.pos;
    }
}

class WholeKeyParametersOfPiano extends KeyParametersOfPiano {
    constructor({keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY) {
        super(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
        const isValidKeyWidth = isValidInteger(keyWidth);
        const isValidKeyHeight = isValidInteger(keyHeight);
        const validKeyWidth = createIfAndElseAndReturns(getValidInteger(keyWidth) < 0, 0, keyWidth);
        const validKeyHeight = createIfAndElseAndReturns(getValidInteger(keyHeight) < 0, 0, keyHeight);
        const keyType = super.getKeyType();
        keyType.width = 15;
        keyType.height = 104;
        keyType.defaultWidth = getPartOfWidth(width, keyType.width);
        keyType.defaultHeight = getPartOfHeightWithResizedCanvas(width, height, keyType.height);
        keyLeftType = this.getValidWholeKeyType(keyLeftType);
        keyRightType = this.getValidWholeKeyType(keyRightType);
        keyWidth = createIfAndElseAndReturns(isValidKeyWidth, validKeyWidth, keyType.width);
        keyHeight = createIfAndElseAndReturns(isValidKeyHeight, validKeyHeight, keyType.height);
        fillStyle = this.fillStyle;
        posX = this.pos.x;
        posY = this.pos.y;
        this.type = "whole";
        const defaultLeftPart = getDefaultWholeKeyShapeX(keyLeftType, width);
        const defaultRightPart = getDefaultWholeKeyShapeX(keyRightType, width);
        const leftPart = getWholeKeyShapeX(keyLeftType);
        const rightPart = getWholeKeyShapeX(keyRightType);
        keyType.leftType = keyLeftType;
        keyType.rightType = keyRightType;
        keyType.defaultLeftPart = defaultLeftPart;
        keyType.defaultRightPart = defaultRightPart;
        keyType.leftPart = leftPart;
        keyType.rightPart = rightPart;
        const defaultUpperPartHeight = 68;

        const wholeKeyWidth = createIfAndElseAndReturns(keyWidth === keyType.width, keyWidth, 15);
        const wholeKeyHeight = createIfAndElseAndReturns(keyHeight === keyType.height, keyHeight, 104);
        const canBeAddedWidthPart = keyWidth - wholeKeyWidth;
        const canBeAddedHeightPart = keyHeight - wholeKeyHeight;
        const leftShapeXPart = posX + leftPart;
        const defaultUpperPartWidth = wholeKeyWidth - leftPart - rightPart;
        const lowerPartUp = posY + defaultUpperPartHeight + 1;
        const upperPartWidth = defaultUpperPartWidth + canBeAddedWidthPart;
        const lowerPartWidth = wholeKeyWidth + canBeAddedWidthPart;
        const defaultLowerPartHeight = wholeKeyHeight - defaultUpperPartHeight - 1;
        const upperPartHeightIfGreaterThanMinusWholeKeyHeight = createIfAndElseAndReturns(canBeAddedHeightPart >= -defaultLowerPartHeight, wholeKeyHeight, wholeKeyHeight + canBeAddedHeightPart);
        const upperPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -wholeKeyHeight, upperPartHeightIfGreaterThanMinusWholeKeyHeight, 0);
        const lowerPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -defaultLowerPartHeight, defaultLowerPartHeight + canBeAddedHeightPart, 0);

        const defaultLeftShapeXPart = getPartOfWidth(width, leftShapeXPart);
        const lowerPartUpPart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, lowerPartUp);
        const upperPartWidthPart = getPartOfWidth(width, upperPartWidth);
        const lowerPartWidthPart = getPartOfWidth(width, lowerPartWidth);
        const upperPartHeightPart = getPartOfHeightWithResizedCanvas(width, height, upperPartHeight);
        const lowerPartHeightPart = getPartOfHeightWithResizedCanvas(width, height, lowerPartHeight);

        this.wholeKeyParameters = {keyLeftType, keyRightType, keyWidth, keyHeight, fillStyle, width, height, posX, posY};
        this.keyParameters = {type: "whole", keyWidth, keyHeight, fillStyle, width, height, posX, posY};
        this.parameters = {
            fillStyle: fillStyle,
            upperPart: {
                pos: {
                    x: leftShapeXPart,
                    y: posY,
                    defaultX: defaultLeftShapeXPart,
                    defaultY: getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, posY)
                },
                keyType: {
                    width: upperPartWidth,
                    height: upperPartHeight,
                    defaultWidth: upperPartWidthPart,
                    defaultHeight: upperPartHeightPart
                }
            },
            lowerPart: {
                pos: {
                    x: posX,
                    y: lowerPartUp,
                    defaultX: getPartOfWidth(width, posX),
                    defaultY: lowerPartUpPart
                },
                keyType: {
                    width: lowerPartWidth,
                    height: lowerPartHeight,
                    defaultWidth: lowerPartWidthPart,
                    defaultHeight: lowerPartHeightPart
                }
            },
            wholeKeyParameters: this.wholeKeyParameters,
            keyParameters: this.keyParameters
        };
    }

    getParameters() {
        return this.parameters;
    }
}

class HalfKeyParametersOfPiano extends KeyParametersOfPiano {
    constructor(keyWidth, keyHeight, fillStyle, width, height, posX, posY) {
        super(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
        this.keyParameters = {type: "half", keyWidth, keyHeight, fillStyle, width, height, posX, posY};
        this.type = "half";
    }
}

class KeyOfPiano extends KeyParametersOfPiano {
    constructor(keyWidth, keyHeight, fillStyle, width, height, posX, posY) {
        super(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
    }

    draw() {
        const keyType = super.getKeyType();
        const keyWidth = keyType.defaultWidth;
        const keyHeight = keyType.defaultHeight;
        const fillStyle = super.getFillStyle();
        const pos = super.getPos();
        const posX = pos.defaultX;
        const posY = pos.defaultY;
        fillColoredRect(fillStyle, posX, posY, keyWidth, keyHeight);
        if (!isStopDrawingKeys) {
            addDrawnKey(this.keyParameters);
        }
    }
}

class WholeKeyOfPiano extends WholeKeyParametersOfPiano {
    constructor({keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY) {
        super({keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY);
        const parameters = super.getParameters();
        const upperPart = parameters.upperPart;
        const upperPartPos = upperPart.pos;
        const upperPartType = upperPart.keyType;
        const upperPartX = upperPartPos.x;
        const upperPartY = upperPartPos.y;
        const upperPartWidth = upperPartType.width;
        const wholeKeyHeight = parameters.wholeKeyParameters.keyHeight;
        this.key = new KeyOfPiano(upperPartWidth, wholeKeyHeight, fillStyle, width, height, upperPartX, upperPartY);
    }

    draw() {
        const parameters = super.getParameters();
        const keyColor = parameters.fillStyle;
        const lowerPart = parameters.lowerPart;
        const lowerPartPos = lowerPart.pos;
        const lowerPartType = lowerPart.keyType;
        const lowerPartX = lowerPartPos.defaultX;
        const lowerPartY = lowerPartPos.defaultY;
        const lowerPartWidth = lowerPartType.defaultWidth;
        const lowerPartHeight = lowerPartType.defaultHeight;
        this.key.draw();
        fillColoredRect(keyColor, lowerPartX, lowerPartY, lowerPartWidth, lowerPartHeight);
        if (!isStopDrawingKeys) {
            addDrawnKey(this.keyParameters);
            addDrawnWholeKey(this.wholeKeyParameters);
        }
    }
}

class HalfKeyOfPiano extends HalfKeyParametersOfPiano {
    constructor(keyWidth, keyHeight, fillStyle, width, height, posX, posY) {
        super(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
        this.key = new KeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
    }

    draw() {
        this.key.draw();
        if (!isStopDrawingKeys) {
            addDrawnHalfKey(this.keyParameters);
        }
    }
}

class DrawKeyOfPiano extends KeyOfPiano {
    constructor({type, keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY) {
        super(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
        const validTypeEqualsAndElseArray = ["whole", ["half", undefined]];
        const validTypeIfTypeWholeOrHalf = getObjectIfObjectEqualsArrayFirst(type, validTypeEqualsAndElseArray);
        const keyLeftAndRightType = [keyLeftType, keyRightType];
        const validTypeIfTypeUndefinedValidKeyLeftOrRightType = getObjectIfObjectArrayElementEqualsArrayFirst(keyLeftAndRightType, validTypeEqualsAndElseArray);
        const validType = createIfAndElseAndReturns(type === undefined, validTypeIfTypeUndefinedValidKeyLeftOrRightType, validTypeIfTypeWholeOrHalf);
        const wholeKeyType = {keyLeftType, keyRightType, keyWidth, keyHeight};
        const wholeKey = new WholeKeyOfPiano(wholeKeyType, fillStyle, width, height, posX, posY);
        const halfKey = new HalfKeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
        context.beginPath();
        if (validType === "whole") {
            wholeKey.draw();
        } else {
            if (validType === "half") {
                halfKey.draw();
            } else {
                super.draw();
            }
        }
    }
}

function drawKeyOfPiano({type, keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY) {
    const keyType = {type, keyLeftType, keyRightType, keyWidth, keyHeight};
    return new DrawKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
}

function drawWholeKeyOfPiano({keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, width, height, posX, posY) {
    const keyType = {keyLeftType, keyRightType, keyWidth, keyHeight};
    const wholeKey = new WholeKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
    wholeKey.draw();
}

function drawHalfKeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, posX, posY) {
    const halfKey = new HalfKeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, posX, posY);
    halfKey.draw();
}

function drawWholeKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += defaultWholeKeyWidthOfPiano + 1, counter++) {
        const type = getWholeKeyTypeInOctave(counter);
        const posX = getPartOfWidth(width, i);
        const posY = getTopOfPianoKeys(height);
        const keyType = {
            keyLeftType: type[0],
            keyRightType: type[1],
            keyWidth: type[2],
            keyHeight: type[3]
        };
        drawWholeKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
    }
}

function getDefaultWholeKeyThPosXInOctave(partOfWidthAndStart, keyTh) {
    partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    const isValidKeyTh = keyTh > 0 && keyTh <= 7;
    let value = 0;
    if (isValidKeyTh) {
        for (let i = partOfWidthAndStart, counter = 0; counter <= keyTh; i += defaultWholeKeyWidthOfPiano + 1, counter++) {
            if (counter === keyTh - 1) {
                value = i;
            }
        }
    }
    return value;
}

function getDefaultHalfKeyThPosXInOctave(partOfWidthAndStart, numberOfSpacesArray, keyTh) {
    partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    const isValidKeyTh = keyTh > 0 && keyTh <= 5;
    let value = partOfWidthAndStart;
    if (isIntegersArray(numberOfSpacesArray) && isValidKeyTh) {
        for (let i = 1; i <= keyTh; i++) {
            const spacesPart = numberOfSpacesArray[i - 1];
            value += createIfAndElseAndReturns(i < keyTh, spacesPart, 0);
        }
    }
    return value;
}

function getWholeKeyThPosXInOctave(width, partOfWidthAndStart, keyTh) {
    const defaultValue = getDefaultWholeKeyThPosXInOctave(partOfWidthAndStart, keyTh)
    return getPartOfWidth(width, defaultValue);
}

function getHalfKeyThPosXInOctave(width, partOfWidthAndStart, numberOfSpacesArray, keyTh) {
    const defaultValue = getDefaultHalfKeyThPosXInOctave(partOfWidthAndStart, numberOfSpacesArray, keyTh);
    return getPartOfWidth(width, defaultValue);
}

function drawHalfKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    const numberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = numberOfSpacesBetweenHalfKeys.length;
    for (let i = 0; i <= maxLength; i++) {
        const halfKeyPos = getHalfKeyThPosXInOctave(partOfWidthAndStart, numberOfSpacesBetweenHalfKeys, i);
        const topOfKeys = getTopOfPianoKeys(height);
        const keyWidth = getHalfKeyWidth(width);
        const keyHeight = getHalfKeyHeight(width, height);
        drawHalfKeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, halfKeyPos, topOfKeys);
    }
}

function getKeyOctaveFirstTypes() {
    const whole = "whole";
    const half = "half";
    return [whole, half, whole, half, whole, whole, half, whole, half, whole, half, whole];
}

function getKeyOctaveFirstType(index) {
    index = getValidSearchTh(index);
    const keyFirstTypes = getKeyOctaveFirstTypes();
    return keyFirstTypes[index];
}

function isKeyOctaveFirstType(index, firstType) {
    return getKeyOctaveFirstType(index) === firstType;
}

function getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(index) {
    index = getValidInteger(index);
    let repairsCount = 0;
    let i = index;
    while (i < 0 || i > 11) {
        if (index < 0) {
            i += 12;
        } else {
            i -= 12;
        }
        repairsCount++;
    }
    return {
        startKeyIndex: i,
        repairsCount: repairsCount
    };
}

function getStartKeyIndexFromOctaveFromIndexOfPiano(index) {
    const startKeyIndexAndRepairsCount = getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(index);
    return startKeyIndexAndRepairsCount[0];
}

function getRepairsCountFromOctaveFromIndexOfPiano(index) {
    const startKeyIndexAndRepairsCount = getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(index);
    return startKeyIndexAndRepairsCount[1];
}

function getDefaultOctaveKeyPosXOfPiano(octavePartOfWidthAndStart, keyTh) {
    octavePartOfWidthAndStart = getValidInteger(octavePartOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    let value = 0;
    const numberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const halfKeyOctaveStart = octavePartOfWidthAndStart + 11;
    const isValid = keyTh >= 1 && keyTh <= 12;
    let wholeKeyCounter = 0;
    let halfKeyCounter = 0;
    if (isValid) {
        value = octavePartOfWidthAndStart;
        for (let i = 0; i < 12; i++) {
            const th = i + 1;
            const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
            if (isWholeFirstType) {
                wholeKeyCounter++;
            } else {
                halfKeyCounter++;
            }
            const halfKeyPosX = getDefaultHalfKeyThPosXInOctave(halfKeyOctaveStart, numberOfSpacesBetweenHalfKeys, halfKeyCounter);
            const wholeKeyPosX = getDefaultWholeKeyThPosXInOctave(octavePartOfWidthAndStart, wholeKeyCounter);
            const posX = createIfAndElseAndReturns(isWholeFirstType, wholeKeyPosX, halfKeyPosX);
            if (th === keyTh) {
                value = posX;
                break;
            }
        }
    }
    return value;
}

function getOctaveKeyPosXOfPiano(width, octavePartOfWidthAndStart, keyTh) {
    const defaultValue = getDefaultOctaveKeyPosXOfPiano(octavePartOfWidthAndStart, keyTh);
    return getPartOfWidth(width, defaultValue);
}

function getKeyThOctaveKeyPosXDiscrepancyOfPiano(keyTh) {
    return getDefaultOctaveKeyPosXOfPiano(0, keyTh);
}

function getPartOfWidthKeyThOctaveKeyPosXDiscrepancyOfPiano(width, keyTh) {
    const defaultValue = getKeyThOctaveKeyPosXDiscrepancyOfPiano(keyTh);
    return getPartOfWidth(width, defaultValue);
}

function getDefaultOctaveKeyPosXInOctaves(octavePartOfWidthAndStart, keyIndex) {
    octavePartOfWidthAndStart = getValidInteger(octavePartOfWidthAndStart);
    keyIndex = getValidInteger(keyIndex);
    const isPositive = keyIndex >= 0;
    const isValid = isPositive && keyIndex <= 11;
    const startKeyIndexAndRepairsCount = getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(keyIndex);
    const startKeyIndex = startKeyIndexAndRepairsCount.startKeyIndex;
    const partOfWidthKeyThOctaveKeyPosXDiscrepancy = getKeyThOctaveKeyPosXDiscrepancyOfPiano(startKeyIndex + 1);
    const repairsCount = startKeyIndexAndRepairsCount.repairsCount;
    let i = 0;
    while (i < repairsCount) {
        if (isPositive) {
            if (!isValid) {
                octavePartOfWidthAndStart += defaultWholeOctaveWidth;
                i++;
            }
        } else {
            octavePartOfWidthAndStart -= defaultWholeOctaveWidth;
            i++;
        }
    }
    return octavePartOfWidthAndStart + partOfWidthKeyThOctaveKeyPosXDiscrepancy;
}

function getOctaveKeyPosXInOctaves(width, octavePartOfWidthAndStart, keyIndex) {
    const defaultValue = getDefaultOctaveKeyPosXInOctaves(octavePartOfWidthAndStart, keyIndex);
    return getPartOfWidth(width, defaultValue);
}

function getDefaultOctaveKeysPosXsInOctaves(octavePartOfWidthAndStart, keyIndexesArray) {
    keyIndexesArray = getValidArray(keyIndexesArray);
    let value = [];
    for (const element of keyIndexesArray) {
        const defaultOctaveKeyPosX = getDefaultOctaveKeyPosXInOctaves(octavePartOfWidthAndStart, element);
        value.push(defaultOctaveKeyPosX);
    }
    return value;
}

function getOctaveKeysPosXsInOctaves(width, octavePartOfWidthAndStart, keyIndexesArray) {
    const defaultOctaveKeysPosXs = getDefaultOctaveKeysPosXsInOctaves(octavePartOfWidthAndStart, keyIndexesArray);
    let value = [];
    for (const element of defaultOctaveKeysPosXs) {
        const keyPosX = getPartOfWidth(width, element);
        value.push(keyPosX);
    }
    return value;
}

function getDefaultNextToEachOtherKeysPosXsInOctaves(octavePartOfWidthAndStart, firstKeyIndex, keysCount) {
    octavePartOfWidthAndStart = getValidInteger(octavePartOfWidthAndStart);
    firstKeyIndex = getValidInteger(firstKeyIndex);
    keysCount = getValidInteger(keysCount);
    let keyIndexesArray = [];
    for (let i = 0; i < keysCount; i++) {
        keyIndexesArray.push(firstKeyIndex + i);
    }
    return getDefaultOctaveKeysPosXsInOctaves(octavePartOfWidthAndStart, keyIndexesArray);
}

function getNextToEachOtherKeysPosXsInOctaves(width, octavePartOfWidthAndStart, firstKeyIndex, keysCount) {
    const defaultNextToEachOtherKeysPosXs = getDefaultNextToEachOtherKeysPosXsInOctaves(octavePartOfWidthAndStart, firstKeyIndex, keysCount);
    let value = [];
    for (const element of defaultNextToEachOtherKeysPosXs) {
        const keyPosX = getPartOfWidth(width, element);
        value.push(keyPosX);
    }
    return value;
}

function getKeyOctavePosXsOfPiano(partOfWidthAndStart) {
    const numberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const maxLength = numberOfSpacesBetweenHalfKeys.length;
    let value = [];
    let i = partOfWidthAndStart, i1 = partOfWidthAndStart + 11, counter = 0, counter1 = 0;
    let savedFirstTypeIndex = 0;
    while (savedFirstTypeIndex < 12) {
        const betweenHalfKeysSpacesCount = numberOfSpacesBetweenHalfKeys[counter1];
        let isWholeFirstType = isKeyOctaveFirstType(counter + counter1, "whole");
        if (savedFirstTypeIndex > 0) {
            if (isWholeFirstType) {
                i += defaultWholeKeyWidthOfPiano + 1;
                counter++;
            } else {
                if (counter1 < maxLength) {
                    i1 += betweenHalfKeysSpacesCount;
                }
                counter1++;
            }
            isWholeFirstType = isKeyOctaveFirstType(counter + counter1, "whole");
        }
        const validPos = createIfAndElseAndReturns(isWholeFirstType, i, i1);
        value.push(validPos);
        savedFirstTypeIndex++;
    }
    return value;
}

function getNextToEachOtherOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle, firstOctaveKeyIndex, keysCount) {
    const octaveKeysFillStyles = getOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle);
    return createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength(octaveKeysFillStyles, firstOctaveKeyIndex, keysCount);
}

function drawKeysOfPiano(keyTypesArray, fillStylesArray, widthsArray, heightsArray, posXsArray, posYsArray) {
    keyTypesArray = getValidArray(keyTypesArray);
    fillStylesArray = getValidArray(fillStylesArray);
    widthsArray = getValidArray(widthsArray);
    heightsArray = getValidArray(heightsArray);
    posXsArray = getValidArray(posXsArray);
    posYsArray = getValidArray(posYsArray);
    const typesCount = keyTypesArray.length;
    const fillStylesCount = fillStylesArray.length;
    const widthsCount = widthsArray.length;
    const heightsCount = heightsArray.length;
    const posXsCount = posXsArray.length;
    const posYsCount = posYsArray.length;
    const keysCount = Math.max(typesCount, fillStylesCount, widthsCount, heightsCount, posXsCount, posYsCount);
    for (let i = 0; i < keysCount; i++) {
        const keyType = keyTypesArray[i];
        const fillStyle = fillStylesArray[i];
        const width = widthsArray[i];
        const height = heightsArray[i];
        const posX = posXsArray[i];
        const posY = posYsArray[i];
        drawKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
    }
}

function drawKeysWithWidthAndHeightOfPiano(keyTypesArray, fillStylesArray, width, height, posXsArray, posYsArray) {
    keyTypesArray = getValidArray(keyTypesArray);
    fillStylesArray = getValidArray(fillStylesArray);
    posXsArray = getValidArray(posXsArray);
    posYsArray = getValidArray(posYsArray);
    const typesCount = keyTypesArray.length;
    const fillStylesCount = fillStylesArray.length;
    const posXsCount = posXsArray.length;
    const posYsCount = posYsArray.length;
    const keysCount = Math.max(typesCount, fillStylesCount, posXsCount, posYsCount);
    const widthsArray = createArrayFromOneElement(width, keysCount);
    const heightsArray = createArrayFromOneElement(height, keysCount);
    drawKeysOfPiano(keyTypesArray, fillStylesArray, widthsArray, heightsArray, posXsArray, posYsArray);
}

function drawNextToEachOtherKeysWithWidthAndHeightOfPiano(fillStylesArray, width, height, posXAndStart, posY, startKeyIndexInOctave) {
    fillStylesArray = getValidArray(fillStylesArray);
    const keyTypesInOctave = getKeyTypesInOctave();
    const fillStylesCount = fillStylesArray.length;
    const keysCount = Math.max(fillStylesCount);
    const typesArray = createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength(keyTypesInOctave, startKeyIndexInOctave, keysCount);
    const posYsArray = createArrayFromOneElement(posY, keysCount);
    const posXsArray = getDefaultNextToEachOtherKeysPosXsInOctaves(posXAndStart, startKeyIndexInOctave, keysCount);
    drawKeysWithWidthAndHeightOfPiano(typesArray, fillStylesArray, width, height, posXsArray, posYsArray);
}

function drawNextToEachOtherNormalKeysWithWidthAndHeightOfPiano(fillStylesArray, width, height, posXAndStart, posY, startKeyIndexInOctave) {
    fillStylesArray = getValidArray(fillStylesArray);
    drawNextToEachOtherKeysWithWidthAndHeightOfPiano(fillStylesArray, width, height, posXAndStart, posY, startKeyIndexInOctave);
}

function drawNextToEachOtherNormalKeysWithOctaveKeysFillStylesAndWidthAndHeightAndKeysCountOfPiano({
                                                                                                       wholeKeyFillStyle,
                                                                                                       halfKeyFillStyle
                                                                                                   },
                                                                                                   width,
                                                                                                   height,
                                                                                                   posXAndStart,
                                                                                                   posY,
                                                                                                   startKeyIndexInOctave,
                                                                                                   keysCount) {
    const keyFillStyles = getNextToEachOtherOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle, startKeyIndexInOctave, keysCount);
    drawNextToEachOtherNormalKeysWithWidthAndHeightOfPiano(keyFillStyles, width, height, posXAndStart, posY, startKeyIndexInOctave);
}

function drawKeyOfOctaveOfPiano(fillStyle, width, height, octavePartOfWidthAndStart, keyTh) {
    fillStyle = tHex.getValidRgbHex(fillStyle);
    octavePartOfWidthAndStart = getValidInteger(octavePartOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    for (let i = 0; i < 12; i++) {
        const keyType = getKeyTypeInOctave(i);
        const posX = getOctaveKeyPosXOfPiano(width, octavePartOfWidthAndStart, keyTh);
        const posY = getTopOfPianoKeys(height);
        if (i + 1 === keyTh) {
            drawKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
        }
    }
}

function drawKeyOctaveOfPiano(wholeKeyFillStyle, halfKeyFillStyle, width, height, partOfWidthAndStart) {
    for (let i = 0; i < 12; i++) {
        const fillStyle = getOctaveKeyFillStyle(wholeKeyFillStyle, halfKeyFillStyle, i);
        drawKeyOfOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart, i + 1);
    }
}

function getClickingWholeKeyParametersOfPiano({keyLeftType, keyRightType, keyWidth, keyHeight}, width, height, partOfWidthPosX) {
    const isValidKeyType = value => isObjectEqualsSomeElementOfString(value, "0123");
    const getValidKeyType = value => createIfAndElseAndReturns(isValidKeyType(value), value, "0");
    const isValidKeyWidth = isValidInteger(keyWidth);
    const isValidKeyHeight = isValidInteger(keyHeight);
    const validKeyWidth = createIfAndElseAndReturns(getValidInteger(keyWidth) < 0, 0, keyWidth);
    const validKeyHeight = createIfAndElseAndReturns(getValidInteger(keyHeight) < 0, 0, keyHeight);
    keyWidth = createIfAndElseAndReturns(isValidKeyWidth, validKeyWidth, 15);
    keyHeight = createIfAndElseAndReturns(isValidKeyHeight, validKeyHeight, 104);
    partOfWidthPosX = getValidInteger(partOfWidthPosX);
    const posX = getPartOfWidth(width, partOfWidthPosX);
    const topOfKeys = getTopOfPianoKeys(height);
    const wholeKeyWidth = getPartOfWidth(width, keyWidth);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const leftType = getValidKeyType(keyLeftType);
    const rightType = getValidKeyType(keyRightType);
    const leftTypeValue = getDefaultWholeKeyShapeX(leftType, width);
    const rightTypeValue = getDefaultWholeKeyShapeX(rightType, width);
    const leftTypePosX = posX + leftTypeValue;
    const rightTypePosX = posX + wholeKeyWidth - rightTypeValue;
    const upperPartDownPosY = topOfKeys + halfKeyHeight + getPartOfWidth(width, 1);
    return {
        leftTypePosX: leftTypePosX,
        rightTypePosX: rightTypePosX,
        upperPartDownPosY: upperPartDownPosY,
        lowerPartDownPosY: topOfKeys + keyHeight
    }
}

function isValidWholeKeyClickingMousePosition({keyLeftType, keyRightType, keyWidth, keyHeight}, width, height, partOfWidthPosX) {
    const partOfWidth = value => getPartOfWidth(width, value);
    const keyType = {keyLeftType, keyRightType, keyWidth, keyHeight};
    const parameters = getClickingWholeKeyParametersOfPiano(keyType, width, height, partOfWidthPosX);
    const leftTypePosX = parameters.leftTypePosX;
    const rightTypePosX = parameters.rightTypePosX;
    const upperPartDownPosY = parameters.upperPartDownPosY;
    const lowerPartDownPosY = parameters.lowerPartDownPosY;
    const isMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.y <= upperPartDownPosY;
    const isMousePosYLessThanOrEqualsWholeKeyDownPosY = savedCanvasMouseValidPos.y <= lowerPartDownPosY;
    const ifMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.x >= leftTypePosX && savedCanvasMouseValidPos.x <= rightTypePosX;
    const ifMousePosYGreaterThanHalfKeyDownPosY = savedCanvasMouseValidPos.x >= partOfWidth(partOfWidthPosX) && savedCanvasMouseValidPos.x <= partOfWidth(partOfWidthPosX + 15);
    const ifMousePosYLessThanOrEqualsWholeKeyDownPosY = createIfAndElseAndReturns(isMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYGreaterThanHalfKeyDownPosY);
    return createIfAndElseAndReturns(isMousePosYLessThanOrEqualsWholeKeyDownPosY, ifMousePosYLessThanOrEqualsWholeKeyDownPosY, false);
}

function isValidHalfKeyClickingMousePosition(width, height, posX) {
    const topOfKeys = getTopOfPianoKeys(height);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const isMousePosXLessThanOrEqualsHalfKeyWidthPos = savedCanvasMouseValidPos.x <= getPartOfWidth(width, posX + defaultHalfKeyWidth);
    const isMousePosXBetweenHalfKeyAndWidthPos = savedCanvasMouseValidPos.x >= getPartOfWidth(width, posX) && isMousePosXLessThanOrEqualsHalfKeyWidthPos;
    return savedCanvasMouseValidPos.y <= (topOfKeys + halfKeyHeight) && isMousePosXBetweenHalfKeyAndWidthPos;
}

function drawClassicPianoAndSonkEditorStripes() {
    isCanvasListener = true;
    loadCanvasSize();
    const width = 834;
    const height = 912;
    const pianoTop = height - 114;
    const topOfKeys = height - 105;
    const defaultOctaveWidth = 112;
    const wholeOctavesCount = 7;
    const halfKeyWidth = 7;
    const halfKeyHeight = 68;
    const wholeKeyWidth = 16;
    const wholeKeyHeight = 104;
    const namedModifiedColors = {
        canvasBorderColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
        canvasBackgroundColor: backgroundColorInput.value,
        canvasSongEditorStripesColor: tHex.getReverseRgbQuarterToThreeQuarterHex(backgroundColorInput.value),
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
        namedModifiedColors.canvasSongEditorStripesColor,
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

    function partOfHeight(value) {
        return getPartOfHeight(height, value);
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

    function drawVerticalSonkEditorStripes() {
        const stripesColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-song-editor-stripes-color", namedModifiedColors.canvasSongEditorStripesColor);

        function fillVerticalColoredStripeFrom0ToPianoTop(partOfWidthAndStart) {
            fillVerticalColoredStripeWithWidthAndPartOfWidth(stripesColor, width, height, partOfWidthAndStart, 1, pianoTop);
        }

        function drawOctave(from) {
            fillOctaveOfPianoVerticalSongEditorStripes(stripesColor, width, height, from, 1, pianoTop);
        }

        fillVerticalColoredStripeFrom0ToPianoTop(0);
        fillVerticalColoredStripeFrom0ToPianoTop(14);
        fillVerticalColoredStripeFrom0ToPianoTop(22);
        for (let i = 33, counter = 0; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
            drawOctave(i);
        }
        fillVerticalColoredStripeFrom0ToPianoTop(width - 1);
    }

    function drawWholeKey(keyType, fillStyle, partOfWidthPosX) {
        drawWholeKeyOfPiano(keyType, fillStyle, width, height, partOfWidthPosX, topOfKeys);
    }

    function drawHalfKey(keyWidth, keyHeight, fillStyle, partOfWidthPosX) {
        drawHalfKeyOfPiano(keyWidth, keyHeight, fillStyle, width, height, partOfWidthPosX, topOfKeys);
    }

    function drawClassicPiano() {
        const topMostUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-upper-part-color", namedModifiedColors.canvasPianoTopMostUpperPartColor);
        const topUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-color", namedModifiedColors.canvasPianoTopUpperPartColor);
        const topUpperPartCenterColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-center-color", namedModifiedColors.canvasPianoTopUpperPartCenterColor);
        const topLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-lower-part-color", namedModifiedColors.canvasPianoTopLowerPartColor);
        const topMostLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-lower-part-color", namedModifiedColors.canvasPianoTopMostLowerPartColor);

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, partOfWidth(1), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - (114 - posY)), partOfWidth(width - 2), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(rectHeight));
        }

        fillColoredRect(pianoBackgroundColor, 0, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 114), canvas.width, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(114));
        fillColoredRectWithPartOfHeight(topMostUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(topUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(topUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(topLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(topMostLowerPartColor, 8, 1);
        drawWholeKey({
            keyRightType: "1",
            keyWidth: 16
        }, wholeKeyColor, 1);
        const fillStylesArray = getNextToEachOtherOctaveKeysFillStyles(wholeKeyColor, halfKeyColor, 10, 86);
        drawNextToEachOtherKeysWithWidthAndHeightOfPiano(fillStylesArray, width, height, 34 - defaultOctaveWidth, topOfKeys, 10);
        drawWholeKey({
            keyLeftType: "0",
            keyRightType: "0"
        }, wholeKeyColor, width - 16);
    }

    for (let i = 0; i < textItems.length; i++) {
        textItems.item(i).setAttribute("style", "color: " + textItemsColorInput.value);
    }

    canvas.style.border = "1px solid" + getColorWithNotSaveChangedColorsOnCanvas("canvas-border-color", namedModifiedColors.canvasBorderColor);
    const backgroundColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-background-color", namedModifiedColors.canvasBackgroundColor);
    canvas.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = getObjectIfEqualsObjects(backgroundColorInput.value, defaultBackgroundColorValue);
    document.getElementById("canvas-width").style.backgroundColor = canvasWidthInputBackgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = canvasHeightInputBackgroundColorInput.value;
    document.getElementById("canvas-width").style.color = canvasWidthInputColorInput.value;
    document.getElementById("canvas-height").style.color = canvasHeightInputColorInput.value;
    if (!isCanvasBackgroundColorTransparentInput.checked) {
        fillColoredRect(backgroundColor, 0, 0, canvas.width, canvas.height);
    }
    drawVerticalSonkEditorStripes();
    drawClassicPiano();
    isStopDrawingKeys = true;
    const isNotOscillator = window.audioContextOscillator === undefined;
    const stopSound = () => {
        const gain = window.audioContextOscillatorGain;
        gain.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime);
        window.audioContextOscillator.stop();
        window.audioContextOscillator = undefined;
    };
    if (isCanvasMouseDown) {
        const isValidPianoMousePosY = savedCanvasMouseValidPos.y >= partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(topOfKeys) && savedCanvasMouseValidPos.y <= canvas.height;
        const isMousePosYLessThanOrEqualsWholeKeyDown = savedCanvasMouseValidPos.y <= partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(topOfKeys + wholeKeyHeight);
        const isValidMousePosY = isValidPianoMousePosY && isMousePosYLessThanOrEqualsWholeKeyDown;
        let isClickedKey = false;
        window.isValidMousePosY = isValidMousePosY;
        if (isValidMousePosY) {
            const clickingWholeKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-whole-key-color", tHex.getRgbThreeQuarterHex(backgroundColorInput.value));
            const clickingHalfKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-half-key-color", tHex.getReverseRgbThreeQuarterHex(backgroundColorInput.value));
            let isValidKeyClickingPosition = false;
            let keyCounter = 0;

            function createKeySound() {
                isValidKeyClickingPosition = true;
                if (window.audioContextOscillator === undefined) {
                    const volume = getKeySoundVolumeWithKeyTh(1, keyCounter);
                    createKeySoundWithKeyTh(volume, keyCounter, 30);
                    window.drawnKeyIndex = keyCounter;
                }
                if (window.audioContextOscillator !== undefined && window.drawnKeyIndex !== keyCounter) {
                    stopSound();
                }
            }

            function loadingHalfKeyOfClickingPosition(fillStyle, posX) {
                const isValidPos = isValidHalfKeyClickingMousePosition(width, height, posX);
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    drawHalfKey(halfKeyWidth, halfKeyHeight, fillStyle, posX);
                    isClickedKey = true;
                    createKeySound();
                }
            }

            function loadingWholeKeyOfClickingPosition({keyLeftType, keyRightType, keyWidth, keyHeight}, fillStyle, posX) {
                const keyType = {keyLeftType, keyRightType, keyWidth, keyHeight};
                const isValidPos = isValidWholeKeyClickingMousePosition(keyType, width, height, posX);
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    drawWholeKey(keyType, fillStyle, posX);
                    isClickedKey = true;
                    createKeySound();
                }
            }

            function loadingKeyOctaveOfClickingPosition(fillStyle, partOfWidthAndStart) {
                fillStyle = tHex.getValidRgbHex(fillStyle);
                partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
                const startsOfKeys = getKeyOctavePosXsOfPiano(partOfWidthAndStart);
                let wholeKeyCounter = 0;
                for (let i = 0; i < 12; i++) {
                    const keyPosX = startsOfKeys[i];
                    const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
                    if (isWholeFirstType) {
                        const wholeKeyType = getWholeKeyTypeInOctave(wholeKeyCounter);
                        loadingWholeKeyOfClickingPosition(wholeKeyType, fillStyle, keyPosX);
                        wholeKeyCounter++;
                    } else {
                        loadingHalfKeyOfClickingPosition(fillStyle, keyPosX);
                    }
                }
            }

            const clickingKeyColor = "#e71111";

            loadingWholeKeyOfClickingPosition({
                keyRightType: "1",
                keyWidth: 16,
            }, clickingKeyColor, 1);
            loadingHalfKeyOfClickingPosition(clickingKeyColor, 15);
            loadingWholeKeyOfClickingPosition({
                keyLeftType: "3",
            }, clickingKeyColor, 18);
            let j = 34;
            for (let counter = 0; counter < 7; j += defaultOctaveWidth, counter++) {
                loadingKeyOctaveOfClickingPosition(clickingKeyColor, j);
            }
            loadingWholeKeyOfClickingPosition({
            }, clickingKeyColor, j);
            if (isValidKeyClickingPosition) {
                isStopCanvasReloading = false;
                canvasReloadingCounter++;
            }
        } else {
            if (!isNotOscillator) {
                stopSound();
            }
            canvasReloadingCounter = 0;
        }
    } else {
        if (!isNotOscillator) {
            stopSound();
        }
        canvasReloadingCounter = 0;
    }
}

let reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, 10, false);

function main(timeout) {
    window.clearInterval(reloadCanvasTimeIntervalHandler);
    reloadCanvasTimeIntervalHandler = window.setInterval(drawPianoSongEditor, timeout, false);
}

function drawPianoSongEditor() {
    const self = drawPianoSongEditor;
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

    function createIsCanvasColorInputValueEqualsDefaultColorField(type) {
        const validName = getCanvasColorInputNameFromType(type);
        const changedValidNameFirstLetterAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(validName);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsDefaultColor";
        const inputName = validName + "Input";
        const defaultValue = getDefaultCanvasColorInputNameFromName(validName);
        self[fieldName] = window[inputName].value === window[defaultValue];
        self.canvasFieldsCount++;
    }

    function createAllIsCanvasColorInputValueEqualsDefaultColorFields(typesArray) {
        typesArray = getValidArray(typesArray);
        for (const element of typesArray) {
            createIsCanvasColorInputValueEqualsDefaultColorField(element);
        }
    }

    function isCanvasField(type) {
        const validName = getCanvasColorInputNameFromType(type);
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
        const fieldValidName = getCanvasColorInputNameFromType(inputType);
        window[fieldValidName + "ResetColorPart"].hidden = isCanvasField(inputType);
    }
    const isCanvasInputsEqualsDefaultColorIfPianoInputsHidden = isCanvasFieldsWithArray(canvasInputsColorInputsTypes);
    const isCanvasPianoInputsEqualsDefaultColor = isCanvasFieldsWithArray(canvasPianoInputsColorInputsTypes);
    const isCanvasInputsEqualsDefaultColor = isAllCanvasFields();
    canvasInputsResetColorsPart.hidden = createIfAndElseAndReturns(!canvasInputs.hidden, createIfAndElseAndReturns(canvasPianoInputs.hidden, isCanvasInputsEqualsDefaultColorIfPianoInputsHidden, isCanvasInputsEqualsDefaultColor), true);
    canvasPianoInputsResetColorsPart.hidden = createIfAndElseAndReturns(!canvasInputs.hidden && !canvasPianoInputs.hidden, isCanvasPianoInputsEqualsDefaultColor, true);
    resetColorsOnCanvasPart.hidden = isCanvasInputsEqualsDefaultColor;
    drawClassicPianoAndSonkEditorStripes();
}

function createKeySoundWithKeyTh(volume, keyTh, time) {
    keyTh = getValidSearchTh(keyTh);
    createKeySoundPitchWithSteps(volume, keyTh + 9, time);
}

function createSoundWithExponentialRampToValueAtTime(volume, frequency, rampValue, time) {
    window.audioContext = new AudioContext();
    window.audioContextOscillator = window.audioContext.createOscillator();
    window.audioContextOscillatorGain = window.audioContext.createGain();
    const context = window.audioContext;
    const o = window.audioContextOscillator;
    const g = window.audioContextOscillatorGain;
    o.connect(g);
    g.connect(context.destination);
    g.gain.value = getValidNumber(volume);
    g.gain.exponentialRampToValueAtTime(rampValue, audioContext.currentTime + time);
    o.frequency.value = getValidNumber(frequency);
    o.start(0);
}

function createKeySound(volume, frequency, time) {
    createSoundWithExponentialRampToValueAtTime(volume, frequency, 0.00001, time);
}

function createKeySoundPitchWithSteps(volume, steps, time) {
    const frequency = getKeySoundPitchWithSteps(steps);
    return createKeySound(volume, frequency, time);
}

function createKeySoundPitch(volume, octave, note, time) {
    const frequency = getKeySoundPitch(octave, note);
    return createKeySound(volume, frequency, time);
}
function getKeyPowerWithSteps(steps) {
    steps = getValidSearchTh(steps);
    // ("A", 4) => 440
    // multiply by 2^(1/12) N times to get N steps higher
    return Math.pow(2, (steps - 57) / 12);
}

function getKeySoundPitchWithSteps(steps) {
    const power = getKeyPowerWithSteps(steps);
    return 440 * power;
}

function getKeySoundVolumeWithSteps(volume, steps) {
    volume = validateNumberWithMin(volume, 0);
    const power = getKeyPowerWithSteps(steps);
    console.log(power);
    return volume / power;
}

function getKeySoundVolumeWithKeyTh(volume, keyTh) {
    return getKeySoundVolumeWithSteps(volume, keyTh + 9);
}

function getKeySoundPitch(octave, note) {
    octave = getValidSearchTh(octave);
    note = getValidString(note);
    const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];
    const step = NOTES.indexOf(note);
    let value = [octave, note];
    if (step > -1) {
        value = getKeySoundPitchWithSteps(octave * 12 + step);
    }
    return value;
}

function getWholeKeyTypeInOctave(index) {
    const leftTypes = StringManipulation.convertElementsToArray("0130123");
    const rightTypes = StringManipulation.convertElementsToArray("3103210");
    const leftType = leftTypes[index];
    const rightType = rightTypes[index];
    return {
        type: "whole",
        keyLeftType: leftType,
        keyRightType: rightType,
        keyWidth: 15,
        keyHeight: 104
    };
}

function getWholeKeyTypesInOctave() {
    let value = [];
    for (let i = 0; i < 7; i++) {
        const wholeKeyType = getWholeKeyTypeInOctave(i);
        value.push(wholeKeyType);
    }
    return value;
}

function getKeyTypesInOctave() {
    let value = [];
    let wholeKeyCounter = 0;
    for (let i = 0; i < 12; i++) {
        const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
        wholeKeyCounter += createIfAndElseAndReturns(isWholeFirstType, 1, 0);
        const wholeKeyType = createIfAndElseAndReturns(isWholeFirstType, getWholeKeyTypeInOctave(wholeKeyCounter - 1), null);
        const halfKeyType = {
            type: "half",
            keyLeftType: undefined,
            keyRightType: undefined,
            keyWidth: 7,
            keyHeight: 68
        };
        const keyType = createIfAndElseAndReturns(isWholeFirstType, wholeKeyType, halfKeyType);
        value.push(keyType);
    }
    return value;
}

function getKeyTypeInOctave(index) {
    index = validateIntegerWithMin(index, 0);
    const keyTypes = getKeyTypesInOctave();
    return keyTypes[index];
}

function getOctaveKeyFillStyle(wholeKeyFillStyle, halfKeyFillStyle, index) {
    wholeKeyFillStyle = tHex.getValidRgbHex(wholeKeyFillStyle);
    halfKeyFillStyle = tHex.getValidRgbHex(halfKeyFillStyle);
    const isWholeKey = isKeyOctaveFirstType(index, "whole");
    const isHalfKey = isKeyOctaveFirstType(index, "half");
    const equalsAndReturnsArray = [isWholeKey, wholeKeyFillStyle, [isHalfKey, halfKeyFillStyle, "#000000"]];
    return getReturnIfArrayFirstTrue(equalsAndReturnsArray);
}

function getOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle) {
    let value = [];
    for (let i = 0; i < 12; i++) {
        const keyFillStyle = getOctaveKeyFillStyle(wholeKeyFillStyle, halfKeyFillStyle, i);
        value.push(keyFillStyle);
    }
    return value;
}

drawPianoSongEditor();
