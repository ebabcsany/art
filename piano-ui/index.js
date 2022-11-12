import {
    getCanvasColorInputClickedNameFromName,
    getCanvasColorInputClickedNameFromType, getCanvasColorInputId, getCanvasColorInputNameFromType,
    getDefaultCanvasColorInputNameFromName, setDefaultCanvasColorInputValueFromType
} from "./defines.js";
import {
    canvasHeightInput,
    canvasWidthInput,
    changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs,
    changeLowercaseStringFirstLetterToUppercaseWithAToZ, createArrayFromOneElement,
    createIfAndElseAndReturns, createSubRepeatedConnectedArraysWithLength,
    fillColoredRect,
    getCanvasMousePos,
    getElementById,
    getObjectIfEqualsObjects,
    getReturnIfObjectEqualsArrayFirst,
    getStringIndexOf,
    getValidArray,
    getValidInteger,
    getValidNumber,
    getValidSearchTh,
    getValidString,
    isContainsSearchInString,
    isEmptyString,
    isIntegersArray,
    isObjectEqualsSomeElementOfString,
    isStringNumber,
    isValidInteger,
    placeIntegerToTheIncreasingIntegersArray,
    placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ,
    subArray,
    subArrayWithFromIndex,
    subArrayWithToIndex,
    tHex,
    validateNumber
} from "../art-script/script.js";
import {S$ArgumentsInString} from "../art-script/s$ArgumentsInString.js";
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
const defaultWholeKeyWidth = 16;
const defaultWholeKeyHeight = 104;
const defaultHalfKeyWidth = 7;
const defaultHalfKeyHeight = 68;
const defaultWholeOctaveWidth = 112;
const defaultWholeOctavesCount = 7;
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
        setCanvasWidth(createIfAndElseAndReturns(isCanvasWidthInputFocus, canvasWidth, innerWidth * threeQuarter));
        setCanvasHeight(createIfAndElseAndReturns(isCanvasHeightInputFocus, canvasHeight, innerHeight * threeQuarter));
    }
}

function addDrawnKeyIndex(index) {
    if (isValidInteger(index) && index > -1 && index < drawnKeysCount) {
        drawnKeysIndexes = placeIntegerToTheIncreasingIntegersArray(drawnKeysIndexes, index);
    }
}

/**
 * add value(drawn key properties), to {@link drawnKeys}
 * @param value the value is <strong><code>{
 *     {@link String type},
 *     {@link String sizeType},
 *     {@link CanvasFillStrokeStyles.fillStyle fillStyle},
 *     {@link Number width},
 *     {@link Number height},
 *     {@link Number posX},
 *     {@link Number posY}
 * }</code></strong>
 */
function addDrawnKey(value) {
    drawnKeys.push(value);
    drawnKeysCount++;
}

/**
 * add value(drawn whole key properties), to {@link drawnWholeKeys}
 * @param value the value is <strong><code>{
 *     {@link String type},
 *     {@link String sizeType},
 *     {@link CanvasFillStrokeStyles.fillStyle fillStyle},
 *     {@link Number width},
 *     {@link Number height},
 *     {@link Number posX},
 *     {@link Number posY}
 * }</code></strong>
 */
function addDrawnWholeKey(value) {
    drawnWholeKeys.push(value);
    drawnWholeKeysCount++;
}

/**
 * add value(drawn half key properties), to {@link drawnHalfKeys}
 * @param value the value is <strong><code>{
 *     {@link CanvasFillStrokeStyles.fillStyle fillStyle},
 *     {@link Number width},
 *     {@link Number height},
 *     {@link Number posX},
 *     {@link Number posY}
 * }</code></strong>
 */
function addDrawnHalfKey(value) {
    drawnHalfKeys.push(value);
    drawnHalfKeysCount++;
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
    const listOfNumberOfSpacesBetweenStripes = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumberOfSpacesBetweenStripes.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenStripes[counter] : 0), counter++) {
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
    const newKeyTypeArguments = new S$ArgumentsInString(keyType);
    const keyTypeArguments = newKeyTypeArguments.getArguments();
    const keyTypeArgumentsCount = createIfAndElseAndReturns(isEmptyString(keyType), 0, keyTypeArguments.length);
    const firstName = newKeyTypeArguments.getArgumentValidName(1);
    const firstValue = newKeyTypeArguments.getArgumentValidValue(1);
    const lastName = newKeyTypeArguments.getArgumentValidName(2);
    const lastValue = newKeyTypeArguments.getArgumentValidValue(2);
    let keyFirstType = getReturnIfObjectEqualsArrayFirst(sizeOrKey, ["size", wholeKeyWidth, ["key", "0", null]]);
    let keyLastType = getReturnIfObjectEqualsArrayFirst(sizeOrKey, ["size", wholeKeyHeight, ["key", "0", null]]);
    if (keyTypeArgumentsCount <= 2) {
        function setOneKeyTypePart(argumentName, argumentValue) {
            const isSize = sizeOrKey = "size";
            const isKey = sizeOrKey = "key";
            const isWidth = argumentName === "width";
            const isHeight = argumentName === "height";
            const isLeft = argumentName === "left";
            const isRight = argumentName === "right";
            const valueIfWidth = partOfWidth(Number.parseFloat(argumentValue));
            const valueIfHeight = partOfHeightWithResizedCanvas(Number.parseFloat(argumentValue));
            const valueIfValidKey = createIfAndElseAndReturns(isValidKeyTypeValue(argumentValue), argumentValue, "1");
            const firstTypeValueIfKey = createIfAndElseAndReturns(isLeft, valueIfValidKey, keyFirstType);
            const lastTypeValueIfKey = createIfAndElseAndReturns(isRight, valueIfValidKey, keyLastType);
            const firstTypeValueIfNotSize = createIfAndElseAndReturns(isKey, firstTypeValueIfKey, keyFirstType);
            const lastTypeValueIfNotSize = createIfAndElseAndReturns(isKey, lastTypeValueIfKey, keyLastType);
            const isSizeAndWidth = isSize && isWidth;
            const isSizeAndHeight = isSize && isHeight;
            const isSizeAndWidthAndValidValue = isSizeAndWidth && isStringNumber(argumentValue);
            const isSizeAndHeightAndValidValue = isSizeAndHeight && isStringNumber(argumentValue);
            keyFirstType = createIfAndElseAndReturns(isSizeAndWidthAndValidValue, valueIfWidth, firstTypeValueIfNotSize);
            keyLastType = createIfAndElseAndReturns(isSizeAndHeightAndValidValue, valueIfHeight, lastTypeValueIfNotSize);
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
    const upperPartHeightIfGreaterThanMinusWholeKeyHeight = createIfAndElseAndReturns(canBeAddedHeightPart >= -defaultLowerPartHeight, wholeKeyHeight, wholeKeyHeight + canBeAddedHeightPart);
    const upperPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -wholeKeyHeight, upperPartHeightIfGreaterThanMinusWholeKeyHeight, 0);
    const lowerPartHeight = createIfAndElseAndReturns(canBeAddedHeightPart > -defaultLowerPartHeight, defaultLowerPartHeight + canBeAddedHeightPart, 0);
    const drawnWholeKeyParameters = {type, sizeType, fillStyle, width, height, posX, posY};
    const drawnKeyParameters = {type: "whole:" + type, sizeType, fillStyle, width, height, posX, posY};
    return {
        style: fillStyle,
        upperPartPosX: leftShapeXPart,
        upperPartPosY: posY,
        lowerPartPosX: posX,
        lowerPartPosY: lowerPartUp,
        upperPartWidth: upperPartWidth,
        upperPartHeight: upperPartHeight,
        lowerPartWidth: lowerPartWidth,
        lowerPartHeight: lowerPartHeight,
        drawnWholeKeyParameters: drawnWholeKeyParameters,
        drawnKeyParameters: drawnKeyParameters
    }
}

function getTypeFirstName(type) {
    const typeFirstArgumentName = new S$ArgumentsInString(type).getArgumentBeforeColonPart(1);
    const isTypeContainsColon = isContainsSearchInString(type, ":");
    const isTypeHalf = type === "half";
    const isTypeWhole = typeFirstArgumentName === "whole" && isTypeContainsColon;
    const wholeAndElseType = createIfAndElseAndReturns(isTypeWhole, "whole", type);
    return createIfAndElseAndReturns(isTypeHalf, "half", wholeAndElseType);
}

function drawKeyOfPiano(type, sizeType, fillStyle, width, height, posX, posY) {
    const isTypeFirstArgumentName = new S$ArgumentsInString(type).isArgumentNameAndColon(1);
    const sizeTypes = getFirstAndLastKeyTypeOfPiano("size", sizeType, width, height);
    const typeFirstName = getTypeFirstName(type);
    let drawnKeyParameters = {type, sizeType, fillStyle, width, height, posX, posY};
    let drawnWholeKeyParameters = {type, sizeType, fillStyle, width, height, posX, posY};
    const drawnHalfKeyParameters = {fillStyle, width, height, posX, posY};
    let keyWidth = sizeTypes[0];
    let keyHeight = sizeTypes[1];
    let isDrawnHalfKey = false;
    let isDrawnWholeKey = false;
    let isStopDrawingKey = false;
    context.beginPath();
    if (typeFirstName === "whole") {
        keyWidth = getWholeKeyWidth(width);
        keyHeight = getWholeKeyHeight(height);
        if (isTypeFirstArgumentName) {
            const colonIndex = getStringIndexOf(type, ":");
            const validType = StringManipulation.removeSubStringWithToIndex(type, colonIndex);
            const parameters = getWholeKeyParametersOfPiano(validType, sizeType, fillStyle, width, height, posX, posY);
            const style = parameters.style;
            const upperPartX = parameters.upperPartPosX;
            const upperPartY = parameters.upperPartPosY;
            const lowerPartX = parameters.lowerPartPosX;
            const lowerPartY = parameters.lowerPartPosY;
            const upperPartWidth = parameters.upperPartWidth;
            const upperPartHeight = parameters.upperPartHeight;
            const lowerPartWidth = parameters.lowerPartWidth;
            const lowerPartHeight = parameters.lowerPartHeight;
            drawnKeyParameters = parameters.drawnKeyParameters;
            drawnWholeKeyParameters = parameters.drawnWholeKeyParameters;

            context.beginPath();
            fillColoredRect(style, upperPartX, upperPartY, upperPartWidth, upperPartHeight);
            fillColoredRect(style, lowerPartX, lowerPartY, lowerPartWidth, lowerPartHeight);
            isStopDrawingKey = true;
        }
        isDrawnWholeKey = true;
    } else {
        if (type === "half") {
            keyWidth = getHalfKeyWidth(width);
            keyHeight = getHalfKeyHeight(width, height);
            isDrawnHalfKey = true;
        }
    }
    if (!isStopDrawingKey) {
        fillColoredRect(fillStyle, posX, posY, keyWidth, keyHeight);
    }
    if (!isStopDrawingKeys) {
        addDrawnKey(drawnKeyParameters);
        if (isDrawnWholeKey) {
            addDrawnWholeKey(drawnWholeKeyParameters);
        }
        if (isDrawnHalfKey) {
            addDrawnHalfKey(drawnHalfKeyParameters);
        }
    }
}

function drawHalfKeyOfPiano(fillStyle, width, height, posX) {
    const posY = getTopOfPianoKeys(height);
    drawKeyOfPiano("half", "", fillStyle, width, height, getPartOfWidth(width, posX), posY);
}

function drawWholeKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += defaultWholeKeyWidth, counter++) {
        const type = "whole:" + getWholeKeyTypeInOctave(counter);
        const posX = getPartOfWidth(width, i);
        const posY = getTopOfPianoKeys(height);
        drawKeyOfPiano(type, "", fillStyle, width, height, posX, posY);
    }
}

function getDefaultWholeKeyThPosXInOctave(partOfWidthAndStart, keyTh) {
    partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    const isValidKeyTh = keyTh > 0 && keyTh <= 7;
    let value = 0;
    if (isValidKeyTh) {
        for (let i = partOfWidthAndStart, counter = 0; counter <= keyTh; i += defaultWholeKeyWidth, counter++) {
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
        drawHalfKeyOfPiano(fillStyle, width, height, halfKeyPos);
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
                i += defaultWholeKeyWidth;
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

function drawKeysOfPiano(typesArray, sizeTypesArray, fillStylesArray, widthsArray, heightsArray, posXsArray, posYsArray) {
    typesArray = getValidArray(typesArray);
    sizeTypesArray = getValidArray(sizeTypesArray);
    fillStylesArray = getValidArray(fillStylesArray);
    widthsArray = getValidArray(widthsArray);
    heightsArray = getValidArray(heightsArray);
    posXsArray = getValidArray(posXsArray);
    posYsArray = getValidArray(posYsArray);
    const typesCount = typesArray.length;
    const sizeTypesCount = sizeTypesArray.length;
    const fillStylesCount = fillStylesArray.length;
    const widthsCount = widthsArray.length;
    const heightsCount = heightsArray.length;
    const posXsCount = posXsArray.length;
    const posYsCount = posYsArray.length;
    const keysCount = Math.max(typesCount, sizeTypesCount, fillStylesCount, widthsCount, heightsCount, posXsCount, posYsCount);
    for (let i = 0; i < keysCount; i++) {
        const type = typesArray[i];
        const sizeType = sizeTypesArray[i];
        const fillStyle = fillStylesArray[i];
        const width = widthsArray[i];
        const height = heightsArray[i];
        const posX = posXsArray[i];
        const posY = posYsArray[i];
        drawKeyOfPiano(type, sizeType, fillStyle, width, height, posX, posY);
    }
}

function drawKeysWithWidthAndHeightOfPiano(typesArray, sizeTypesArray, fillStylesArray, width, height, posXsArray, posYsArray) {
    typesArray = getValidArray(typesArray);
    sizeTypesArray = getValidArray(sizeTypesArray);
    fillStylesArray = getValidArray(fillStylesArray);
    posXsArray = getValidArray(posXsArray);
    posYsArray = getValidArray(posYsArray);
    const typesCount = typesArray.length;
    const sizeTypesCount = sizeTypesArray.length;
    const fillStylesCount = fillStylesArray.length;
    const posXsCount = posXsArray.length;
    const posYsCount = posYsArray.length;
    const keysCount = Math.max(typesCount, sizeTypesCount, fillStylesCount, posXsCount, posYsCount);
    const widthsArray = createArrayFromOneElement(width, keysCount);
    const heightsArray = createArrayFromOneElement(height, keysCount);
    drawKeysOfPiano(typesArray, sizeTypesArray, fillStylesArray, widthsArray, heightsArray, posXsArray, posYsArray);
}

function drawNextToEachOtherKeysWithWidthAndHeightOfPiano(sizeTypesArray, fillStylesArray, width, height, posXAndStart, posY, startKeyIndexInOctave) {
    sizeTypesArray = getValidArray(sizeTypesArray);
    fillStylesArray = getValidArray(fillStylesArray);
    const firstTypesInOctave = getKeyOctaveFirstTypes();
    const sizeTypesCount = sizeTypesArray.length;
    const fillStylesCount = fillStylesArray.length;
    const keysCount = Math.max(sizeTypesCount, fillStylesCount);
    const typesArray = createSubRepeatedConnectedArraysWithLength(firstTypesInOctave, );
    const posYsArray = createArrayFromOneElement(posY, keysCount);
    const posXsArray = getNextToEachOtherKeysPosXsInOctaves(width, posXAndStart, startKeyIndexInOctave, keysCount);
    drawKeysWithWidthAndHeightOfPiano(typesArray, sizeTypesArray, fillStylesArray, width, height, posXsArray, posYsArray);
}

function drawKeyOfOctaveOfPiano(fillStyle, width, height, octavePartOfWidthAndStart, keyTh) {
    fillStyle = tHex.getValidRgbHex(fillStyle);
    octavePartOfWidthAndStart = getValidInteger(octavePartOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    let wholeKeyCounter = 0;
    for (let i = 0; i < 12; i++) {
        const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
        wholeKeyCounter += createIfAndElseAndReturns(isWholeFirstType, 1, 0);
        const wholeKeyType = createIfAndElseAndReturns(isWholeFirstType, getWholeKeyTypeInOctave(wholeKeyCounter - 1), null);
        const keyType = createIfAndElseAndReturns(isWholeFirstType, "whole:" + wholeKeyType, "half");
        const posX = getOctaveKeyPosXOfPiano(width, octavePartOfWidthAndStart, keyTh);
        const posY = getTopOfPianoKeys(height);
        if (i + 1 === keyTh) {
            drawKeyOfPiano(keyType, "", fillStyle, width, height, posX, posY);
        }
    }
}

function drawKeyOctaveOfPiano(wholeKeyFillStyle, halfKeyFillStyle, width, height, partOfWidthAndStart) {
    for (let i = 0; i < 12; i++) {
        const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
        const fillStyle = createIfAndElseAndReturns(isWholeFirstType, wholeKeyFillStyle, halfKeyFillStyle);
        drawKeyOfOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart, i + 1);
    }
}

function getClickingWholeKeyParametersOfPiano(type, sizeType, fillStyle, width, height, posX, posY) {
    const wholeKeyParameters = getWholeKeyParametersOfPiano(type, sizeType, fillStyle, width, height, posX, posY);
    return {
        leftTypePosX: wholeKeyParameters.leftTypePosX,
        rightTypePosX: wholeKeyParameters.rightTypePosX,
        halfKeyDownPosY: wholeKeyParameters.halfKeyDownPosY
    }
}

function isValidWholeKeyClickingMousePosition(type, width, height, posX) {
    width = getValidInteger(width);
    const parameters = clickingWholeKeyParameters(type, width, height, posX);
    const leftTypePosX = parameters.leftTypePosX;
    const rightTypePosX = parameters.rightTypePosX;
    const halfKeyDownPosY = parameters.halfKeyDownPosY;
    const isMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.y <= halfKeyDownPosY;
    const ifMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.x >= leftTypePosX && savedCanvasMouseValidPos.x <= rightTypePosX;
    const ifMousePosYGreaterThanHalfKeyDownPosY = savedCanvasMouseValidPos.x >= partOfWidth(posX) && savedCanvasMouseValidPos.x <= partOfWidth(posX + defaultWholeKeyWidth);
    const ifMousePosYLessThanOrEqualsWholeKeyDownPosY = createIfAndElseAndReturns(isMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYLessThanOrEqualsHalfKeyDownPosY, ifMousePosYGreaterThanHalfKeyDownPosY);
    return createIfAndElseAndReturns(isMousePosLessThanOrEqualsWholeKeyDown, ifMousePosYLessThanOrEqualsWholeKeyDownPosY, false);
}

function isValidHalfKeyClickingMousePosition(posX) {
    const isMousePosXLessThanOrEqualsHalfKeyWidthPos = savedCanvasMouseValidPos.x <= partOfWidth(posX + defaultHalfKeyWidth);
    const isMousePosXBetweenHalfKeyAndWidthPos = savedCanvasMouseValidPos.x >= partOfWidth(posX) && isMousePosXLessThanOrEqualsHalfKeyWidthPos;
    return savedCanvasMouseValidPos.y <= (topOfKeys + halfKeyHeight) && isMousePosXBetweenHalfKeyAndWidthPos;
}

function drawClassicPianoAndSonkEditorStripes() {
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
            fillVerticalColoredStripeWithWidthAndPartOfWidth(stripesColor, width, height, partOfWidthAndStart, 1, defaultPianoTop);
        }

        function drawOctave(from) {
            fillOctaveOfPianoVerticalSongEditorStripes(stripesColor, width, height, from, 1, defaultPianoTop);
        }

        fillVerticalColoredStripeFrom0ToPianoTop(0);
        fillVerticalColoredStripeFrom0ToPianoTop(14);
        fillVerticalColoredStripeFrom0ToPianoTop(22);
        for (let i = 33, counter = 0; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
            drawOctave(i);
        }
        fillVerticalColoredStripeFrom0ToPianoTop(width - 1);
    }

    function drawClassicPiano() {
        const topMostUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-upper-part-color", namedModifiedColors.canvasPianoTopMostUpperPartColor);
        const topUpperPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-color", namedModifiedColors.canvasPianoTopUpperPartColor);
        const topUpperPartCenterColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-upper-part-center-color", namedModifiedColors.canvasPianoTopUpperPartCenterColor);
        const topLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-lower-part-color", namedModifiedColors.canvasPianoTopLowerPartColor);
        const topMostLowerPartColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-top-most-lower-part-color", namedModifiedColors.canvasPianoTopMostLowerPartColor);

        function drawWholeKey(type, sizeType, partOfWidthPosX) {
            drawKeyOfPiano("whole:" + type, sizeType, wholeKeyColor, width, height, partOfWidth(partOfWidthPosX), topOfKeys);
        }

        function drawHalfKey(partOfWidthPosX) {
            drawHalfKeyOfPiano(halfKeyColor, width, height, partOfWidthPosX);
        }

        function drawOctave(from) {
            drawKeyOctaveOfPiano(wholeKeyColor, halfKeyColor, width, height, from);
        }

        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(style, partOfWidth(1), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - (114 - posY)), partOfWidth(width - 2), partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(rectHeight));
        }

        fillColoredRect(pianoBackgroundColor, 0, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - 114), canvas.width, partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(114));
        fillColoredRectWithPartOfHeight(topMostUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(topUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(topUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(topLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(topMostLowerPartColor, 8, 1);
        drawWholeKey("right: 1", "width: 16", 1);
        drawHalfKey(15);
        drawWholeKey("left: 3", "", 18);
        let i = 34;
        for (let counter = 0; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
            drawOctave(i);
        }
        drawWholeKey("", "", i);
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
    if (isCanvasMouseDown) {
        const isValidPianoMousePosY = savedCanvasMouseValidPos.y >= topOfKeys && savedCanvasMouseValidPos.y <= canvas.height;
        const isMousePosLessThanOrEqualsWholeKeyDown = savedCanvasMouseValidPos.y <= (topOfKeys + wholeKeyHeight);
        const isValidMousePosY = isValidPianoMousePosY && isMousePosLessThanOrEqualsWholeKeyDown;
        let isClickedKey = false;
        window.isValidMousePosY = isValidMousePosY;
        if (isValidMousePosY) {
            const clickingWholeKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-whole-key-color", tHex.getRgbThreeQuarterHex(backgroundColorInput.value));
            const clickingHalfKeyColor = getColorWithNotSaveChangedColorsOnCanvas("canvas-piano-active-part-clicking-half-key-color", tHex.getReverseRgbThreeQuarterHex(backgroundColorInput.value));
            let isValidKeyClickingPosition = false;
            let keyCounter = 0;

            function setKeySound() {
                isValidKeyClickingPosition = true;
                if (window.audioContextOscillator === undefined) {
                    createKeySoundWithKeyTh(1, keyCounter, 30);
                    window.drawnKeyIndex = keyCounter;
                }
                if (window.audioContextOscillator !== undefined && window.drawnKeyIndex !== keyCounter) {
                    window.audioContextOscillator.stop();
                    window.audioContextOscillator = undefined;
                }
            }

            function loadingHalfKeyClickingPosition(fillStyle, posX) {
                const isValidPos = isValidHalfKeyClickingMousePosition(posX);
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    const keyPosX = partOfWidth(posX);
                    drawKeyOfPiano("half", "", fillStyle, width, height, keyPosX, topOfKeys);
                    window.keyPosX = keyPosX;
                    isClickedKey = true;
                    setKeySound();
                }
            }

            function loadingWholeKeyClickingPosition(type, sizeType, fillStyle, posX) {
                const isValidPos = isValidWholeKeyClickingMousePosition(type, posX);
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    const keyPosX = partOfWidth(posX);
                    drawKeyOfPiano("whole:" + type, sizeType, fillStyle, width, height, keyPosX, topOfKeys);
                    window.keyPosX = keyPosX;
                    isClickedKey = true;
                    setKeySound();
                }
            }

            function loadingKeyOctaveClickingPositions(fillStyle, partOfWidthAndStart) {
                fillStyle = tHex.getValidRgbHex(fillStyle);
                partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
                const startsOfKeys = getKeyOctaveClickingPositions(partOfWidthAndStart);
                let wholeKeyCounter = 0;
                for (let i = 0; i < 12; i++) {
                    const keyPosX = startsOfKeys[i];
                    const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
                    if (isWholeFirstType) {
                        const wholeKeyType = getWholeKeyTypeInOctave(wholeKeyCounter);
                        loadingWholeKeyClickingPosition(wholeKeyType, "", fillStyle, keyPosX);
                        wholeKeyCounter++;
                    } else {
                        loadingHalfKeyClickingPosition(fillStyle, keyPosX);
                    }
                }
            }

            const clickingKeyColor = "#e71111";

            loadingWholeKeyClickingPosition("right: 1", "width: 16", clickingKeyColor, 1);
            loadingHalfKeyClickingPosition(clickingKeyColor, 15);
            loadingWholeKeyClickingPosition("left: 3", "", clickingKeyColor, 18);
            let j = 34;
            for (let counter = 0; counter < 7; j += defaultOctaveWidth, counter++) {
                loadingKeyOctaveClickingPositions(clickingKeyColor, j);
            }
            loadingWholeKeyClickingPosition("", "", clickingKeyColor, j);
            if (isValidKeyClickingPosition) {
                isStopCanvasReloading = false;
                canvasReloadingCounter++;
            }
        } else {
            if (!isNotOscillator) {
                window.audioContextOscillator.stop();
                window.audioContextOscillator = undefined;
            }
            canvasReloadingCounter = 0;
        }
    } else {
        if (!isNotOscillator) {
            window.audioContextOscillator.stop();
            window.audioContextOscillator = undefined;
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

function createKeySoundWithKeyTh(gainValue, keyTh, time) {
    keyTh = getValidSearchTh(keyTh);
    createKeySoundPitchWithSteps(gainValue, keyTh + 9, time);
}

function createSoundWithExponentialRampToValueAtTime(gainValue, frequency, rampValue, time) {
    window.audioContext = new AudioContext();
    window.audioContextOscillator = window.audioContext.createOscillator();
    const context = window.audioContext;
    const o = window.audioContextOscillator;
    const g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.value = getValidNumber(gainValue);
    g.gain.exponentialRampToValueAtTime(rampValue, audioContext.currentTime + time);
    o.frequency.value = getValidNumber(frequency);
    o.start(0);
}

function createKeySound(gainValue, frequency, time) {
    createSoundWithExponentialRampToValueAtTime(gainValue, frequency, 0.00001, time);
}

function createKeySoundPitchWithSteps(gainValue, steps, time) {
    const frequency = getKeySoundPitchWithSteps(steps);
    return createKeySound(gainValue, frequency, time);
}

function createKeySoundPitch(gainValue, octave, note, time) {
    const frequency = getKeySoundPitch(octave, note);
    return createKeySound(gainValue, frequency, time);
}

function getKeySoundPitchWithSteps(steps) {
    steps = getValidSearchTh(steps);
    // ("A", 4) => 440
    // multiply by 2^(1/12) N times to get N steps higher
    const power = Math.pow(2, (steps - 57) / 12);
    return 440 * power;
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
    return "left:" + leftType + ",right:" + rightType;
}

function getWholeKeyTypesInOctave() {
    let value = [];
    for (let i = 0; i < 7; i++) {
        value.push(getWholeKeyTypeInOctave(i));
    }
    return value;
}

drawPianoSongEditor();
