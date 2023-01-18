import {
    addNewArrayToAfterOfTheArray,
    canvasHeightInput,
    canvasWidthInput,
    createArrayFromOneElement,
    createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength,
    createStringArrayFromObjectsArray,
    fillColoredRect,
    getArrayElementsWithIndexesArray,
    getCanvasMousePos,
    getObjectIfEqualsObjects,
    getReturnIfArrayFirstTrue,
    getReturnIfObjectEqualsArrayFirst,
    getValidArray,
    getValidInteger,
    getValidNumber,
    getValidOnceOccurringIntegersArray,
    getValidSearchTh,
    getValidString,
    isArrayElementsTrue,
    isEmptyArray,
    isEmptyString,
    isIntegersArray,
    isObjectEqualsSomeElementOfArray,
    isObjectEqualsSomeElementOfObjects,
    isObjectEqualsSomeElementOfString,
    isValidInteger,
    placeIntegerToTheIncreasingIntegersArray,
    replaceElementInArray,
    subArray,
    subArrayWithFromIndex,
    subArrayWithToIndex,
    tHex,
    threeQuarter,
    validateInteger,
    validateIntegerWithMin,
    validateNumberWithMin
} from "../../art-script/script.js";
import {
    changeCanvasColorInputNameFirstLetterToCapitalFromId,
    getCanvasColorInputClickedNameFromName,
    getCanvasColorInputClickedNameFromType,
    getCanvasColorInputId,
    getCanvasColorInputIdFromName,
    getCanvasColorInputNameFromId,
    getCanvasColorInputNameFromType,
    getCanvasColorInputTypeFromId,
    getDefaultCanvasColorInputNameFromId,
    getDefaultCanvasColorInputNameFromName,
    getValidType, getValidTypeOfElementValue,
    setDefaultCanvasColorInputValueFromType
} from "./defines.js";
import {StringManipulation} from "../../art-script/stringManipulation.js";
import {saveAs} from "./js/FileSaver.js";

window.canvas = document.getElementById("piano-song-editor");
window.canvasContext = canvas.getContext("2d");
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
    "piano-active-part-moving-strip-for-clicking-whole-key",
    "piano-active-part-moving-strip-for-clicking-half-key"
];
const getCanvasColorValues = (color) => {
    let value = [];
    if (typeof color === "undefined") {
        for (const element of canvasColorInputTypes) {
            const name = getCanvasColorInputNameFromType(element);
            const inputName = name + "Input";
            value.push(window[inputName].value);
        }
    } else {
        color = tHex.getValidRgbHex(color);
        value = [
            tHex.getReverseRgbQuarterToThreeQuarterHex(color),
            color,
            tHex.getReverseRgbQuarterToThreeQuarterHex(color),
            tHex.getReverseRgbQuarterToThreeQuarterHex(color),
            tHex.getReverseRgbQuarterToThreeQuarterHex(color),
            tHex.getRgbEighthToSevenEighthsHex(color),
            color,
            tHex.getReverseRgbSixteenToFifteenSixteensHex(color),
            tHex.getReverseRgbEighthToSevenEighthsHex(color),
            color,
            tHex.getReverseHex(color),
            tHex.getRgbEighthToSevenEighthsHex(color),
            tHex.getReverseRgbEighthToSevenEighthsHex(color),
            tHex.getReverseRgbEighthToSevenEighthsHex(color),
            tHex.getReverseRgbEighthToSevenEighthsHex(color)
        ];
    }
    return value;
};
const getCanvasColorInputsIds = () => {
    let value = [];
    for (const element of canvasColorInputTypes) {
        const canvasColorInputId = getCanvasColorInputId(element);
        value.push(canvasColorInputId);
    }
    return value;
};
const getCanvasColorInputsNames = () => {
    let value = [];
    for (const element of canvasColorInputTypes) {
        const canvasColorInputName = getCanvasColorInputNameFromType(element);
        value.push(canvasColorInputName);
    }
    return value;
};
const getCanvasColorValuesWithName = (color) => {
    color = tHex.getValidRgbHex(color);
    const values = getCanvasColorValues(color);
    const names = getCanvasColorInputsIds();
    let value = {};
    for (let i = 0; i < values.length; i++) {
        const name = names[i];
        value[name] = values[i];
    }
    return value;
};
const getCanvasColorValueWithName = (color, name) => {
    color = tHex.getValidRgbHex(color);
    name = getValidString(name);
    const valuesWithName = getCanvasColorValuesWithName(color);
    return valuesWithName[name];
};
const getCanvasColorValuesWithIdsArray = (color, idsArray) => {
    idsArray = getValidArray(idsArray);
    const values = getCanvasColorValues(color);
    const names = getCanvasColorInputsIds();
    let value = [];
    let idCounter = 0;
    for (let i = 0; i < idsArray.length; i++) {
        const id = idsArray[idCounter];
        if (names.indexOf(id) > -1) {
            value.push(values[i]);
            idCounter++;
        }
    }
    return value;
};
const getCanvasColorValuesWithTypesArray = (color, typesArray) => {
    typesArray = getValidArray(typesArray);
    const idsArray = [];
    for (const type of typesArray) {
        const id = getCanvasColorInputId(type);
        idsArray.push(id);
    }
    return getCanvasColorValuesWithIdsArray(color, idsArray);
};
const canvasColorInputsIds = getCanvasColorInputsIds();
const canvasColorInputsNames = getCanvasColorInputsNames();
const defaultTextItemsColorValue = "#000000";
const defaultBackgroundColorValue = "#ffffff";
const defaultCanvasColorValues = getCanvasColorValues(defaultBackgroundColorValue);
const defaultCanvasColorValuesWithName = getCanvasColorValuesWithName(defaultBackgroundColorValue);
for (const canvasColorInputType of canvasColorInputTypes) {
    createTheDefaultCanvasColorInputFieldsAndListeners(canvasColorInputType);
}
createTheDefaultColorInputFieldsAndListenersWithElementIdWithDefaultValue("text-items-color", "textItemsColor", defaultTextItemsColorValue);
createTheDefaultColorInputFieldsAndListenersWithElementIdWithDefaultValue("background-color", "backgroundColor", defaultBackgroundColorValue);
const canvasInputsColorInputsTypes = subArrayWithToIndex(canvasColorInputTypes, 2);
const canvasPianoInputsColorInputsTypes = subArray(canvasColorInputTypes, 3, 10);
const canvasPianoActivePartInputsColorInputsTypes = subArrayWithFromIndex(canvasColorInputTypes, 11);
const canvasPianoInputsButton = document.getElementById("canvas-piano-inputs-button");
const canvasPianoInputsResetColorsPart = document.getElementById("canvas-piano-inputs-reset-colors-part");
const canvasPianoInputsResetColorsButton = document.getElementById("canvas-piano-inputs-reset-colors-button");
const canvasPianoInputs = document.getElementById("canvas-piano-inputs");
const canvasPianoActivePartInputsButton = document.getElementById("canvas-piano-active-part-inputs-button");
const canvasPianoActivePartInputsResetColorsPart = document.getElementById("canvas-piano-active-part-inputs-reset-colors-part");
const canvasPianoActivePartInputsResetColorsButton = document.getElementById("canvas-piano-active-part-inputs-reset-colors-button");
const canvasPianoActivePartInputs = document.getElementById("canvas-piano-active-part-inputs");
const backgroundColorInput = document.getElementById("background-color");
const backgroundColorInputResetColorsPart = document.getElementById("background-color-reset-color-part");
const textItemsColorInputResetColorsPart = document.getElementById("text-items-color-reset-color-part");
const isSaveTheParametersOfTheStripsToAFile = document.getElementById("is-save-the-parameters-of-the-strips-to-a-file");
const saveTheParametersOfTheStripsToAFileEnterTheFileName = document.getElementById("save-the-parameters-of-the-strips-to-a-file-enter-the-name");
const isCanvasBackgroundColorTransparentInput = document.getElementById("is-canvas-background-color-transparent");
const saveChangedColorsOnCanvasInput = document.getElementById("save-changed-colors-on-canvas-by-modified-background-color-input-value");
const saveAndSetCanvasColorsInputs = document.getElementById("save-and-set-colors-inputs");
const saveCanvasInputsColors = document.getElementById("save-canvas-inputs-colors");
const arrowOfSaveCanvasInputsColors = ((document.body.children)[9].children)[3];
const firstOpeningBracketOfSaveCanvasInputsColors = ((document.body.children)[9].children)[4];
const firstClosingBracketOfSaveCanvasInputsColors = ((document.body.children)[9].children)[5];
const closingBracketOfSaveCanvasInputsColors = ((document.body.children)[11].children)[0];
const saveCanvasInputsColorsButton = document.getElementById("save-canvas-inputs-colors-button");
const setCanvasInputsColorsButton = document.getElementById("set-canvas-inputs-colors-button");
const setCanvasInputsColorsFromFile = document.getElementById("set-colors-from-file");
const saveColorsToFile = document.getElementById("save-colors-to-file");
const saveEnterTheFileSelectorId = document.getElementById("save-enter-the-file-selector-id");
const setFileSelector = document.getElementById("set-file-selector");
let savedFileContent = "";
let settedFileContent = "";
const resetColorsOnCanvasPart = document.getElementById("reset-colors-on-canvas-part");
const resetColorsOnCanvasButton = document.getElementById("reset-colors-on-canvas");
const reloadingTimeInput = document.getElementById("reloading-time");
const reloadingTimeSubmitButton = document.getElementById("reloading-time-submit-button");
const textItems = document.getElementsByTagName("text-item");
const textItemsColorInput = document.getElementById("text-items-color");
let savedDefaultCanvasInputsColors = undefined;
let savedCanvasInputsColors = undefined;
const defaultWholeKeyWidthOfPiano = 15;
const defaultWholeKeyHeightOfPiano = 104;
const defaultHalfKeyWidth = 7;
const defaultHalfKeyHeight = 68;
const defaultWholeOctaveWidth = 112;
const defaultPianoHeight = 114;
const defaultWholeOctavesCount = 7;
const keySoundPitchesArray = [];
const keyBetweenSoundsSpacesArray = [];
const pianoKeyOctaveFirstTypes = replaceElementInArray(createArrayFromOneElement("whole", 12), "half", 1, 3, 6, 8, 10);
const pianoKeysFirstTypes = createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength(pianoKeyOctaveFirstTypes, 9, 88);
let drawnKeyIndex = -1;
let drawnKeysIndexes = [];
let drawnKeys = [];
let drawnHalfKeys = [];
let drawnWholeKeys = [];
let actualStrip = [];
window.strips = [];
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
let isCanvasPianoActivePartInputsButtonClicked = false;
let isBackgroundColorInputClicked = false;
let isCanvasListener = false;
let isCanvasInputsHidden = true;
let isCanvasPianoInputsHidden = true;
let isCanvasPianoActivePartInputsHidden = true;
let isCanvasInputsVisible = false;
let isCanvasAndPianoInputsVisible = false;
let isCanvasAndPianoAndActivePartInputsVisible = false;
let isAllCanvasInputsVisible = false;
let isSaveCanvasInputsColorsButtonClicked = false;
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
    isCanvasPianoActivePartInputsButtonClicked = false;
    resetCanvasInputsClickedFieldsWithTypesArray(canvasColorInputTypes);
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
canvas.onclick = function (ev) {
    ev.preventDefault();
    isWindowClicked = false;
    isCanvasMouseDown = false;
    isCanvasPianoInputsButtonClicked = false;
    isCanvasPianoActivePartInputsButtonClicked = false;
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
        isCanvasPianoActivePartInputsHidden = canvasPianoActivePartInputs.hidden = true;
    }
};
canvasPianoInputsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasPianoInputsButtonClicked = true;
    isCanvasPianoInputsHidden = canvasPianoInputs.hidden = !canvasPianoInputs.hidden;
    isCanvasAndPianoInputsVisible = !canvasPianoInputs.hidden;
    canvasPianoInputsResetColorsPart.hidden = true;
    if (isCanvasPianoInputsHidden) {
        isCanvasPianoActivePartInputsHidden = canvasPianoActivePartInputs.hidden = true;
    }
};
canvasPianoActivePartInputsButton.onclick = function () {
    isWindowClicked = false;
    isCanvasPianoActivePartInputsButtonClicked = true;
    if (isCanvasAndPianoInputsVisible) {
        isAllCanvasInputsVisible = !canvasInputs.hidden && !canvasPianoInputs.hidden;
    }
    isCanvasPianoActivePartInputsHidden = canvasPianoActivePartInputs.hidden = !canvasPianoActivePartInputs.hidden;
    isCanvasAndPianoAndActivePartInputsVisible = !canvasPianoActivePartInputs.hidden;
};
canvasInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    saveChangedColorsOnCanvasInput.checked = false;
    if (!canvasInputs.hidden) {
        setJustCanvasInputs();
        if (!canvasPianoInputs.hidden) {
            setJustCanvasPianoInputs();
            if (!canvasPianoActivePartInputs.hidden) {
                setCanvasPianoActivePartInputs();
            }
        }
    }
    canvasInputsResetColorsPart.hidden = true;
    canvasPianoInputsResetColorsPart.hidden = true;
    canvasPianoActivePartInputsResetColorsPart.hidden = true;
};
canvasPianoInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    saveChangedColorsOnCanvasInput.checked = false;
    if (!canvasInputs.hidden && !canvasPianoInputs.hidden) {
        setJustCanvasPianoInputs();
        if (!canvasPianoActivePartInputs.hidden) {
            setCanvasPianoActivePartInputs();
        }
    }
    canvasPianoInputsResetColorsPart.hidden = true;
    canvasPianoActivePartInputsResetColorsPart.hidden = true;
};
canvasPianoActivePartInputsResetColorsButton.onclick = function () {
    isWindowClicked = false;
    saveChangedColorsOnCanvasInput.checked = false;
    if (!canvasInputs.hidden && !canvasPianoInputs.hidden && !canvasPianoActivePartInputs.hidden) {
        setCanvasPianoActivePartInputs();
    }
    canvasPianoActivePartInputsResetColorsPart.hidden = true;
};
arrowOfSaveCanvasInputsColors.onclick = function () {
    isWindowClicked = false;
    if (this.textContent === "◂") {
        this.textContent = "▾";
    } else if (this.textContent === "▾") {
        this.textContent = "◂";
    }
    firstOpeningBracketOfSaveCanvasInputsColors.hidden = arrowOfSaveCanvasInputsColors.hidden;
    firstClosingBracketOfSaveCanvasInputsColors.hidden = saveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "◂";
    closingBracketOfSaveCanvasInputsColors.hidden = saveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "▾";
    saveAndSetCanvasColorsInputs.hidden = arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "▾";
}
saveCanvasInputsColors.onclick = function () {
    isWindowClicked = false;
    if (!saveCanvasInputsColors.checked) {
        savedCanvasInputsColors = undefined;
        for (const element of canvasColorInputTypes) {
            const name = getCanvasColorInputNameFromType(element);
            const inputName = name + "Input";
            const defaultName = getDefaultCanvasColorInputNameFromName(name);
            window[inputName].value = window[defaultName];
        }
    }
}
saveCanvasInputsColorsButton.onclick = function () {
    isWindowClicked = false;
    if (!Array.isArray(savedFileContent)) {
        const values = getCanvasInputsValues();
        const defaultValues = getCanvasInputsDefaultValues();
        savedCanvasInputsColors = saveCanvasInputsColors.checked ? values : defaultValues;
    } else try {
        savedCanvasInputsColors = JSON.parse(settedFileContent);
    } catch (e) {
        console.info(e);
        savedCanvasInputsColors = defaultCanvasColorValues;
    }
};
saveColorsToFile.onclick = function () {
    isWindowClicked = false;
    const fileName = saveEnterTheFileSelectorId.value;
    const canvasColorValues = createStringArrayFromObjectsArray(getCanvasColorValues());
    saveFile("" + fileName + ".txt", canvasColorValues, {
        type: "text/plain;charset=utf-8",
    });
    savedFileContent = canvasColorValues;
}

function setCanvasInputsColors() {
    if (savedCanvasInputsColors !== undefined) {
        const canvasInputsColorsEqualsSavedColorsArray = [];
        for (let i = 0; i < canvasColorInputTypes.length; i++) {
            const type = canvasColorInputTypes[i];
            const name = getCanvasColorInputNameFromType(type) + "Input";
            const input = window[name];
            const color = input.value;
            const savedColor = savedCanvasInputsColors[i];
            canvasInputsColorsEqualsSavedColorsArray.push(color === savedColor);
            input.value = savedColor;
        }
        if (!isArrayElementsTrue(canvasInputsColorsEqualsSavedColorsArray)) {
            saveChangedColorsOnCanvasInput.checked = false;
        }
    }
}

setCanvasInputsColorsButton.onclick = function () {
    isWindowClicked = false;
    setCanvasInputsColors();
};
setCanvasInputsColorsFromFile.onclick = function () {
    isWindowClicked = false;
    let isChangedFile = false;
    setFileSelector.onchange = function (ev) {
        const files = ev.target.files;
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        settedFileContent = "";
        if (files.length > 0) {
            reader.readAsText(files[0]);
        }
        isChangedFile = true;
    };

    function handleFileLoad(ev) {
        const errorStrings = [
            "Unexpected error: ",
            "Invalid array",
            "This is not an array",
            "Array is not found",
            " (use an array of square brackets)"
        ];
        const result = getValidString(ev.target.result);

        const openingSquareBracketIndex = result.indexOf("[");
        const openingBraceIndex = result.indexOf("{");
        const isContainsOpeningSquareBracket = openingSquareBracketIndex > -1;
        const isContainsClosingSquareBracket = StringManipulation.isContainsSearch(result, "]");
        const isContainsOpeningBrace = openingBraceIndex > -1;
        const isContainsClosingBrace = StringManipulation.isContainsSearch(result, "}");
        const isContainsOpenOrClosingSquareBracket =
            isContainsOpeningSquareBracket ||
            isContainsClosingSquareBracket;
        const isContainsOpenOrClosingBrace =
            isContainsOpeningBrace ||
            isContainsClosingBrace;
        const isContainsBracket =
            isContainsOpenOrClosingSquareBracket ||
            isContainsOpenOrClosingBrace;
        const isFirstJustSquareBrackets = openingSquareBracketIndex < openingBraceIndex || !isContainsOpenOrClosingBrace;

        let content = [];
        let error = "";
        try {
            content = JSON.parse(result);
            const isValid =
                isContainsBracket &&
                Array.isArray(content) &&
                isFirstJustSquareBrackets;
            if (isValid) {
                settedFileContent = content;
                const savedFileContent = tHex.getValidRgbHexsArray(content);
                if (content.length <= defaultCanvasColorValues.length) {
                    const specifiedColors = subArrayWithFromIndex(defaultCanvasColorValues, content.length);
                    savedCanvasInputsColors = addNewArrayToAfterOfTheArray(savedFileContent, specifiedColors);
                } else {
                    const toIndex = defaultCanvasColorValues.length - 1;
                    savedCanvasInputsColors = subArrayWithToIndex(savedFileContent, toIndex);
                }
                setCanvasInputsColorsButton.click();
            } else {
                settedFileContent = [];
                error += errorStrings[0];
                error += errorStrings[isContainsBracket ? 1 : 3];
                error += isContainsBracket && Array.isArray(content) ? errorStrings[4] : "";
            }
            if (!isValid) {
                console.error(error);
            }
        } catch (e) {
            error = isContainsBracket ? errorStrings[2] : errorStrings[3];
            console.error(e + " (" + error + ")");
            settedFileContent = [];
        }
    }

    try {
        setFileSelector.click();
    } catch (e) {
        console.error(e);
        saveColorsToFile.click();
        setFileSelector.click();
    }
};
backgroundColorInput.onclick = function () {
    isWindowClicked = false;
    isBackgroundColorInputClicked = true;
};
saveChangedColorsOnCanvasInput.onclick = function () {
    isWindowClicked = false;
};
resetColorsOnCanvasButton.onclick = function () {
    isWindowClicked = false;
    setCanvasInputs();
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
    const reloadingTime = isEmpty ? 10 : reloadingTimeInput.value;
    main(reloadingTime);
};
let isCanvasInterval = false;

/**
 * @param element {HTMLElement}
 * @param name {string}
 * @param defaultValue {color}
 * @returns <code style="color: #000000">creates the fields <em>({@link element <code style="color: #7f008f">element</code>},
 * {@link name <code style="color: #7f008f">name</code>},
 * {@link defaultValue <code style="color: #7f008f">defaultValue</code>})</em> associated with the color input element;</code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementWithDefaultValue(element, name, defaultValue) {
    const fieldName = name + "Input";
    const fieldDefaultValueName = getDefaultCanvasColorInputNameFromName(name);
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = getCanvasColorInputIdFromName(fieldResetColorPartName);
    window[fieldName] = element;
    window[fieldDefaultValueName] = defaultValue;
    window[getCanvasColorInputClickedNameFromName(name)] = false;
    window[fieldResetColorPartName] = document.getElementById(fieldResetColorPartId);
    window[fieldResetColorPartName].hidden = window[fieldName].value === defaultValue;
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdWithDefaultValue(elementId, name, defaultValue) {
    const element = document.getElementById(elementId);
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementWithDefaultValue(element, name, defaultValue);
}

function createTheDefaultColorInputFieldsAndListenersWithElementIdWithDefaultValue(elementId, name, defaultValue) {
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementByIdWithDefaultValue(elementId, name, defaultValue);
    const fieldName = name + "Input";
    const fieldResetColorPartName = name + "ResetColorPart";
    const fieldResetColorPartId = getCanvasColorInputIdFromName(fieldResetColorPartName);
    const fieldResetColorPart = document.getElementById(fieldResetColorPartId);
    const field = window[fieldName];
    field.onclick = function () {
        isWindowClicked = false;
        window[getCanvasColorInputClickedNameFromName(name)] = true;
        saveChangedColorsOnCanvasInput.checked = false;
    };
    field.onchange = function () {
        saveCanvasInputsColorsButton.hidden = false;
    };
    fieldResetColorPart.onclick = function () {
        isWindowClicked = false;
        saveChangedColorsOnCanvasInput.checked = false;
        if (field.value !== defaultValue) {
            saveCanvasInputsColorsButton.hidden = false;
        }
        field.value = defaultValue;
    }
}

/**
 * @param element {HTMLElement}
 * @param name {string}
 * @returns <code style="color: #000000">
 *     creates the fields <em>({@link element <code style="color: #7f008f">element</code>},
 *     {@link name <code style="color: #7f008f">name</code>})</em>
 *     associated with the color input element;
 * </code>
 */
function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name) {
    const id = getCanvasColorInputIdFromName(name);
    const defaultValue = getCanvasColorValueWithName(defaultBackgroundColorValue, id);
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementWithDefaultValue(element, name, defaultValue);
}

function createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElementById(elementId, name) {
    const element = document.getElementById(elementId);
    createsTheDefaultColorInputFieldsAssociatedWithTheColorInputElement(element, name);
}

function createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, name) {
    const id = getCanvasColorInputIdFromName(name);
    const defaultValue = getCanvasColorValueWithName(defaultBackgroundColorValue, id);
    createTheDefaultColorInputFieldsAndListenersWithElementIdWithDefaultValue(elementId, name, defaultValue);
}

function getCanvasInputsValues() {
    const value = [];
    for (const element of canvasColorInputTypes) {
        const validId = getCanvasColorInputId(element);
        const field = document.getElementById(validId);
        value.push(field.value);
    }
    return value;
}

function getCanvasInputsDefaultValues() {
    const value = [];
    for (const element of canvasColorInputTypes) {
        const validId = getCanvasColorInputId(element);
        const field = document.getElementById(validId);
        value.push(field.defaultValue);
    }
    return value;
}

function createTheDefaultCanvasColorInputFieldsAndListeners(type) {
    const elementId = getCanvasColorInputId(type);
    const elementName = getCanvasColorInputNameFromType(type);
    createTheDefaultColorInputFieldsAndListenersWithElementId(elementId, elementName);
}

function setCanvasInput(inputType, type) {
    inputType = getValidType(inputType);
    type = getValidString(type);
    const validType = inputType + getValidTypeOfElementValue(type, "before");
    setDefaultCanvasColorInputValueFromType(validType);
}

function setJustCanvasInputs() {
    setCanvasInput("", "border");
    setCanvasInput("", "background");
    setCanvasInput("", "song-editor-stripes");
}

function setJustCanvasPianoInputs() {
    setCanvasInput("piano", "background");
    setCanvasInput("piano", "top-most-upper-part");
    setCanvasInput("piano", "top-upper-part");
    setCanvasInput("piano", "top-upper-part-center");
    setCanvasInput("piano", "top-lower-part");
    setCanvasInput("piano", "top-most-lower-part");
    setCanvasInput("piano", "whole-key");
    setCanvasInput("piano", "half-key");
}

function setCanvasPianoActivePartInputs() {
    setCanvasInput("piano-active-part", "clicking-whole-key");
    setCanvasInput("piano-active-part", "clicking-half-key");
    setCanvasInput("piano-active-part", "moving-strip-for-clicking-half-key");
    setCanvasInput("piano-active-part", "moving-strip-for-clicking-half-key");
}

function setJustCanvasAndPianoInputs() {
    setJustCanvasInputs();
    setJustCanvasPianoInputs();
}

function setCanvasInputs() {
    setJustCanvasAndPianoInputs();
    setCanvasPianoActivePartInputs();
}

function setCanvasPianoInputs() {
    setJustCanvasPianoInputs();
    setCanvasPianoActivePartInputs();
}

function resetCanvasInputsClickedFieldsWithTypesArray(typesArray) {
    typesArray = getValidArray(typesArray);
    for (const typesArrayElement of typesArray) {
        const elementClickedName = getCanvasColorInputClickedNameFromType(typesArrayElement);
        window[elementClickedName] = false;
    }
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
        const newCanvasWidth = isCanvasWidthInputFocus ? canvasWidth : innerWidth * threeQuarter;
        const newCanvasHeight = isCanvasHeightInputFocus ? canvasHeight : innerHeight * threeQuarter;
        setCanvasWidth(newCanvasWidth);
        setCanvasHeight(newCanvasHeight);
    }
}

function addStrips(fillStyle, width, height, stripWidth, posX) {
    fillStyle = tHex.getValidRgbHex(fillStyle);
    try {
        const isFillStyle = fillStyle === strips.fillStyle;
        if (!isEmptyArray(strips) && !isFillStyle) {
            window.strips.value.forEach(strip => {
                strip.fillStyle = fillStyle;
            });
        }
    } catch (e) {}
    fillStyle = tHex.getValidRgbHex(fillStyle);
    width = validateIntegerWithMin(width, 0);
    height = validateIntegerWithMin(height, 0);
    stripWidth = validateIntegerWithMin(stripWidth, 0);
    posX = getValidInteger(posX);
    const outOfPianoTop = 1;
    fillStyle = tHex.getValidRgbHex(fillStyle);
    const strip = {
        fillStyle,
        width,
        height,
        posX,
        outOfPianoTop,
        stripWidth,
        stripHeight: 1
    };
    if (arguments.length > 0) {
        if (isEmptyArray(strips)) {
            window.strips.push(strip);
        } else {
            const lastStrip = strips[strips.length - 1];
            const stripParamsEqLast =
                strip.fillStyle === lastStrip.fillStyle &&
                strip.width === lastStrip.width &&
                strip.height === lastStrip.height &&
                strip.posX === lastStrip.posX &&
                strip.outOfPianoTop === lastStrip.outOfPianoTop &&
                strip.stripWidth === lastStrip.stripWidth &&
                strip.stripHeight === lastStrip.stripHeight;
            if (stripParamsEqLast) {
                lastStrip.outOfPianoTop++;
                lastStrip.stripHeight++;
            } else {
                window.strips.forEach(strip => {
                    strip.outOfPianoTop++;
                });
                window.strips.push(strip);
            }
        }
    } else {
        window.strips.forEach(strip => {
            strip.outOfPianoTop++;
        });
    }
}

function drawStrips() {
    const {length} = strips;
    if (!isEmptyArray(strips)) {
        const width = strips[length - 1].width;
        const height = strips[length - 1].height;
        const pianoHeight = getPartOfHeightWithResizedCanvas(width, height, defaultPianoHeight);
        const pianoTop = canvas.height - pianoHeight;
        window.strips.forEach(strip => {
            const fillStyle = strip.fillStyle;
            const width = strip.width;
            const height = strip.height;
            const posX = strip.posX;
            const posY = pianoTop - getPartOfHeightWithResizedCanvas(width, height, strip.outOfPianoTop);
            const stripWidth = strip.stripWidth;
            const stripHeight = strip.stripHeight;
            fillColoredRect(
                fillStyle,
                getPartOfWidth(width, posX),
                posY,
                getPartOfWidth(width, stripWidth),
                getPartOfHeightWithResizedCanvas(width, height, stripHeight)
            );
        });
    }
}

function addDrawnKeyIndex(index) {
    if (isValidInteger(index) && index > -1 && index < drawnKeysCount) {
        drawnKeysIndexes = placeIntegerToTheIncreasingIntegersArray(drawnKeysIndexes, index);
    }
}

function getDrawnKeyParameters(type, fillStyle, width, height, posX, posY) {
    const keyType = {
        type,
        width: arguments[6],
        height: arguments[7],
        left: arguments[8],
        right: arguments[9]
    };
    const newParameters = new KeyParametersOfPiano(keyType, fillStyle, width, height, posX, posY);
    let value = {
        type: newParameters.type,
        canvasParts: newParameters.getCanvasPartsCount(),
        fillStyle: newParameters.fillStyle,
        pos: newParameters.getPos(),
        keyType: newParameters.getType()
    };
    if (type === "whole") {
        const parameters = newParameters.getParameters("whole");
        value.upperPart = parameters.upperPart;
        value.lowerPart = parameters.lowerPart;
    }
    return value;
}

function addDrawnKey(type, fillStyle, width, height, posX, posY) {
    const keyParameters = getDrawnKeyParameters(type, fillStyle, width, height, posX, posY);
    drawnKeys.push(keyParameters);
    drawnKeysCount++;
}

function addDrawnWholeKey(fillStyle, width, height, posX, posY) {
    const keyParameters = getDrawnKeyParameters("whole", fillStyle, width, height, posX, posY);
    addDrawnKey("whole", fillStyle, width, height, posX, posY);
    drawnWholeKeys.push(keyParameters);
    drawnWholeKeysCount++;
}

function addDrawnHalfKey(fillStyle, width, height, posX, posY) {
    const keyParameters = getDrawnKeyParameters("half", fillStyle, width, height, posX, posY);
    addDrawnKey("half", fillStyle, width, height, posX, posY);
    drawnHalfKeys.push(keyParameters);
    drawnHalfKeysCount++;
}

function getPartOfNumber(number, numberOfParts, partOfNumber) {
    number = getValidNumber(number);
    numberOfParts = validateIntegerWithMin(numberOfParts, 0);
    partOfNumber = getValidNumber(partOfNumber);
    return number / (numberOfParts / partOfNumber);
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
    height = getValidInteger(height);
    partOfHeight = getValidNumber(partOfHeight);
    let value = getPartOfHeight(height, partOfHeight);
    if (canvas.height > canvas.width) {
        value = getPartOfWidth(width, partOfHeight * (height / 1000));
    }
    return value;
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
    let value = getValidNumber(partOfHeight);
    if (canvas.height > canvas.width) {
        value = canvas.height - canvas.width * (1 / getValidNumber(outOfCanvasHeightOfDivider));
    }
    return getValidNumber(value);
}

/**
 * get part of height
 * @param outOfCanvasHeightOfDivider this is (out of canvas-height of divider)
 * @returns {number}
 */
function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(outOfCanvasHeightOfDivider) {
    outOfCanvasHeightOfDivider = getValidNumber(outOfCanvasHeightOfDivider);
    const partOfHeight = getValidNumber(canvas.height * (1 - (1 / outOfCanvasHeightOfDivider)));
    const valuePart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthThenPartOfWidthOrElsePartOfHeight(outOfCanvasHeightOfDivider, partOfHeight);
    return outOfCanvasHeightOfDivider >= 1 ? valuePart : canvas.height;
}

function getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas) {
    height = validateIntegerWithMin(height, 0);
    const valuePart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidth(getValidNumber(height / (height - getValidNumber(partOfHeightOfCanvas))));
    return partOfHeightOfCanvas < height ? valuePart : canvas.height;
}

function fillColoredRectOfPiano(style, width, height, rectX, rectY, rectWidth, rectHeight) {
    const x = getPartOfWidth(width, rectX);
    const y = getPartOfHeightWithResizedCanvas(width, height, rectY);
    const partOfWidth = getPartOfWidth(width, rectWidth);
    const partOfHeight = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, rectHeight);
    fillColoredRect(style, x, y, partOfWidth, partOfHeight);
}

function drawColoredRectOfHalfKeyOfPiano(style, width, height, rectX, rectY, rectHeight) {
    fillColoredRectOfPiano(style, width, height, rectX, rectY, 7, rectHeight);
}

function getValidKeyIndexInOctaveFromIndex(
    index = getValidInteger(index)) {
    while (index < 0 || index >= 12) {
        index += index >= 0 ? -12 : 12;
    }
    return index;
}

function drawColoredRectOfOctaveOfPiano(style, width, height, rectX, rectY, rectHeight, index) {
    const listOfNumberOfSpacesBetweenStripes = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const validIndex = getValidKeyIndexInOctaveFromIndex(index);
    const rectWidth = listOfNumberOfSpacesBetweenStripes[validIndex];
    fillColoredRectOfPiano(style, width, height, rectX, rectY, rectWidth, rectHeight);
}

function getTopOfPianoKeys(height) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, height - 105);
}

function getWholeKeyHeight(height) {
    return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, defaultWholeKeyHeightOfPiano);
}

function fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, partOfWidthPosX, stripeWidthPartOfWidth, stripeHeight) {
    fillColoredRectOfPiano(style, width, height, partOfWidthPosX, 0, stripeWidthPartOfWidth, stripeHeight);
}

function fillOctaveOfPianoVerticalSongEditorStripes(style, width, height, partOfWidthAndStart, stripeWidth, stripeHeight) {
    const listOfNumberOfSpacesBetweenStripes = [11, 8, 10, 8, 11, 11, 8, 9, 8, 9, 8, 11];
    const maxLength = listOfNumberOfSpacesBetweenStripes.length;
    for (let i = partOfWidthAndStart, counter = 0; counter <= maxLength; i += (counter < maxLength ? listOfNumberOfSpacesBetweenStripes[counter] : 0), counter++) {
        fillVerticalColoredStripeWithWidthAndPartOfWidth(style, width, height, i, stripeWidth, stripeHeight);
    }
}

function getWholeKeyShapeX(type) {
    type = getValidString(type);
    const wholeKeyShapeXEqualsAndReturnsArray = ["0", 0, ["1", 3, ["2", 4, ["3", 5, 3]]]];
    return getReturnIfObjectEqualsArrayFirst(type, wholeKeyShapeXEqualsAndReturnsArray);
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
        return this.isValidWholeKeyType(value) ? value : "0";
    }

    constructor(keyType, fillStyle, width, height, posX, posY) {
        keyType = Object.create(keyType);
        const keyLeftType = this.isValidWholeKeyType(keyType.left) ? keyType.left : undefined;
        const keyRightType = this.isValidWholeKeyType(keyType.right) ? keyType.right : undefined;
        const isKeyTypesUndefined = keyLeftType === undefined && keyRightType === undefined;
        const typeIfTypeInKeyTypeUndefined = isKeyTypesUndefined ? "half" : "whole";
        const keyWidth = validateNumberWithMin(keyType.width, 0);
        const keyHeight = validateNumberWithMin(keyType.height, 0);
        this.keyParameters = {keyType, fillStyle, width, height, posX, posY};
        this.type = keyType.type === undefined ? typeIfTypeInKeyTypeUndefined : keyType.type;
        this.keyType = {
            default: keyType,
            type: this.type,
            width: keyType.width,
            height: keyType.height,
            defaultWidth: getPartOfWidth(width, keyWidth),
            defaultHeight: getPartOfHeightWithResizedCanvas(width, height, keyHeight)
        };
        if (this.type === "whole") {
            this.keyType.left = this.getValidWholeKeyType(keyType.left);
            this.keyType.right = this.getValidWholeKeyType(keyType.right);
        }
        this.fillStyle = tHex.getValidRgbHex(fillStyle);
        this.canvasPartsCount = {
            width: validateIntegerWithMin(width, 0),
            height: validateIntegerWithMin(height, 0),
            defaultWidth: canvas.width,
            defaultHeight: canvas.height
        };
        this.pos = {
            x: validateIntegerWithMin(posX, 0),
            y: validateIntegerWithMin(posY, 0),
            defaultX: getPartOfWidth(width, posX),
            defaultY: getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, posY)
        };
    }

    getParameters(type) {
        const isValidType = isObjectEqualsSomeElementOfObjects(type, "whole", "half");
        type = isValidType ? type : this.type;
        let value = this.keyParameters;
        if (type === "whole") {
            this.type = "whole";
            const fillStyle = this.fillStyle;
            const width = this.canvasPartsCount.width;
            const height = this.canvasPartsCount.height;
            const posX = this.pos.x;
            const posY = this.pos.y;
            let keyLeftType = this.keyType.left;
            let keyRightType = this.keyType.right;
            let keyWidth = this.keyType.width;
            let keyHeight = this.keyType.height;
            const isValidKeyWidth = isValidInteger(keyWidth);
            const isValidKeyHeight = isValidInteger(keyHeight);
            const validKeyWidth = getValidInteger(keyWidth) < 0 ? 0 : keyWidth;
            const validKeyHeight = getValidInteger(keyHeight) < 0 ? 0 : keyHeight;
            const keyType = this.keyType;
            keyType.width = 15;
            keyType.height = 104;
            keyType.defaultWidth = getPartOfWidth(width, keyType.width);
            keyType.defaultHeight = getPartOfHeightWithResizedCanvas(width, height, keyType.height);
            keyLeftType = this.getValidWholeKeyType(keyLeftType);
            keyRightType = this.getValidWholeKeyType(keyRightType);
            keyWidth = isValidKeyWidth ? validKeyWidth : keyType.width;
            keyHeight = isValidKeyHeight ? validKeyHeight : keyType.height;
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

            const wholeKeyWidth = keyWidth === keyType.width ? keyWidth : 15;
            const wholeKeyHeight = keyHeight === keyType.height ? keyHeight : 104;
            const canBeAddedWidthPart = keyWidth - wholeKeyWidth;
            const canBeAddedHeightPart = keyHeight - wholeKeyHeight;
            const leftShapeXPart = posX + leftPart;
            const defaultUpperPartWidth = wholeKeyWidth - leftPart - rightPart;
            const lowerPartUp = posY + defaultUpperPartHeight + 1;
            const upperPartWidth = defaultUpperPartWidth + canBeAddedWidthPart;
            const lowerPartWidth = wholeKeyWidth + canBeAddedWidthPart;
            const defaultLowerPartHeight = wholeKeyHeight - defaultUpperPartHeight - 1;
            const upperPartHeightIfGreaterThanMinusWholeKeyHeight = canBeAddedHeightPart >= -defaultLowerPartHeight ? wholeKeyHeight : wholeKeyHeight + canBeAddedHeightPart;
            const upperPartHeight = canBeAddedHeightPart > -wholeKeyHeight ? upperPartHeightIfGreaterThanMinusWholeKeyHeight : 0;
            const lowerPartHeight = canBeAddedHeightPart > -defaultLowerPartHeight ? defaultLowerPartHeight + canBeAddedHeightPart : 0;

            const defaultLeftShapeXPart = getPartOfWidth(width, leftShapeXPart);
            const lowerPartUpPart = getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, lowerPartUp);
            const upperPartWidthPart = getPartOfWidth(width, upperPartWidth);
            const lowerPartWidthPart = getPartOfWidth(width, lowerPartWidth);
            const upperPartHeightPart = getPartOfHeightWithResizedCanvas(width, height, upperPartHeight);
            const lowerPartHeightPart = getPartOfHeightWithResizedCanvas(width, height, lowerPartHeight);

            this.wholeKeyParameters = {keyType: keyType.default, fillStyle, width, height, posX, posY};
            this.keyParameters = {type: "whole", keyType: keyType.default, fillStyle, width, height, posX, posY};
            value = {
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
        } else if (type === "half") {
            this.type = "half";
            value = {
                type: "half",
                keyType: this.keyType.type,
                fillStyle: this.fillStyle,
                width: this.canvasPartsCount.width,
                height: this.canvasPartsCount.height,
                posX: this.pos.x,
                posY: this.pos.y
            };
        }
        this.keyParameters = value;
        return value;
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

class KeyOfPiano extends KeyParametersOfPiano {
    constructor(keyType, fillStyle, width, height, posX, posY) {
        super(keyType, fillStyle, width, height, posX, posY);
    }

    draw(type) {
        const isValidType = isObjectEqualsSomeElementOfObjects(type, "whole", "half");
        type = isValidType ? type : this.type;
        const key = this;

        function draw() {
            const fillStyle = key.getFillStyle();
            const pos = key.getPos();
            const posX = pos.defaultX;
            const posY = pos.defaultY;
            const keyType = key.getKeyType();
            const keyWidth = keyType.defaultWidth;
            const keyHeight = keyType.defaultHeight;
            fillColoredRect(fillStyle, posX, posY, keyWidth, keyHeight);
        }

        if (type === "whole") {
            const parameters = key.getParameters("whole");
            const keyColor = parameters.fillStyle;
            const upperPart = parameters.upperPart;
            const upperPartPos = upperPart.pos;
            const upperPartType = upperPart.keyType;
            const upperPartX = upperPartPos.defaultX;
            const upperPartY = upperPartPos.defaultY;
            const upperPartWidth = upperPartType.defaultWidth;
            const wholeKeyParameters = parameters.wholeKeyParameters;
            const wholeKeyHeight = key.keyType.defaultHeight;

            const lowerPart = parameters.lowerPart;
            const lowerPartPos = lowerPart.pos;
            const lowerPartType = lowerPart.keyType;
            const lowerPartX = lowerPartPos.defaultX;
            const lowerPartY = lowerPartPos.defaultY;
            const lowerPartWidth = lowerPartType.defaultWidth;
            const lowerPartHeight = lowerPartType.defaultHeight;
            fillColoredRect(keyColor, upperPartX, upperPartY, upperPartWidth, wholeKeyHeight);
            if (upperPartWidth !== lowerPartWidth) {
                fillColoredRect(keyColor, lowerPartX, lowerPartY, lowerPartWidth, lowerPartHeight);
            }
            if (!isStopDrawingKeys) {
                addDrawnWholeKey(wholeKeyParameters);
            }
        } else {
            const fillStyle = key.getFillStyle();
            const keyType = key.getKeyType();
            const pos = key.getPos();
            const keyWidth = keyType.defaultWidth;
            const keyHeight = keyType.defaultHeight;
            const posX = pos.defaultX;
            const posY = pos.defaultY;
            draw();
            if (type === "half") {
                if (!isStopDrawingKeys) {
                    addDrawnHalfKey(fillStyle, keyWidth, keyHeight, posX, posY);
                }
            } else {
                if (!isStopDrawingKeys) {
                    addDrawnKey(type, fillStyle, keyWidth, keyHeight, posX, posY);
                }
            }
        }
    }
}

class DrawKeyOfPiano extends KeyOfPiano {
    constructor(keyType, fillStyle, width, height, posX, posY) {
        super(keyType, fillStyle, width, height, posX, posY);
        super.draw(this.type);
    }
}

function drawKeyOfPiano(keyType, fillStyle, width, height, posX, posY) {
    return new DrawKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
}

function drawWholeKeyOctaveOfPiano(fillStyle, width, height, partOfWidthAndStart) {
    for (let i = partOfWidthAndStart, counter = 0; counter < 7; i += defaultWholeKeyWidthOfPiano + 1, counter++) {
        const type = getWholeKeyTypeInOctave(counter);
        const posX = getPartOfWidth(width, i);
        const posY = getTopOfPianoKeys(height);
        const keyType = {
            type: "whole",
            left: type[0],
            right: type[1],
            width: type[2],
            height: type[3]
        };
        drawKeyOfPiano(keyType, fillStyle, width, height, posX, posY);
    }
}

function getDefaultWholeKeyThPosXInOctave(partOfWidthAndStart, keyTh) {
    partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
    keyTh = getValidSearchTh(keyTh);
    const isValidKeyTh = keyTh > 0 && keyTh <= 7;
    let value = 0;
    if (isValidKeyTh) {
        for (
            let i = partOfWidthAndStart,
                counter = 0;
            counter <= keyTh;
            i += defaultWholeKeyWidthOfPiano + 1,
                counter++
        ) {
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
            value += i < keyTh ? spacesPart : 0;
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
        const keyType = {
            keyWidth,
            keyHeight
        };
        drawKeyOfPiano(keyType, fillStyle, width, height, halfKeyPos, topOfKeys);
    }
}

function getKeyOctaveFirstType(index) {
    index = getValidSearchTh(index);
    return pianoKeyOctaveFirstTypes[index];
}

function isKeyOctaveFirstType(index, firstType) {
    return getKeyOctaveFirstType(index) === firstType;
}

function getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(index) {
    index = getValidInteger(index);
    let repairsCount = 0;
    let i = index;
    while (i < 0 || i > 11) {
        i += index < 0 ? 12 : -12;
        repairsCount++;
    }
    return {
        startKeyIndex: i,
        repairsCount: repairsCount
    };
}

function getStartKeyIndex(index) {
    return getStartKeyIndexAndRepairsCountFromOctaveFromIndexOfPiano(index).startKeyIndex;
}

function getDefaultOctaveKeyPosXOfPiano(octaveStartPosX, keyTh) {
    octaveStartPosX = getValidInteger(octaveStartPosX);
    keyTh = getValidSearchTh(keyTh);
    let value = 0;
    const numberOfSpacesBetweenHalfKeys = [18, 30, 17, 17];
    const halfKeyOctaveStart = octaveStartPosX + 11;
    const isValid = keyTh >= 1 && keyTh <= 12;
    let wholeKeyCounter = 0;
    let halfKeyCounter = 0;
    if (isValid) {
        value = octaveStartPosX;
        for (let i = 0; i < 12; i++) {
            const th = i + 1;
            const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
            if (isWholeFirstType) {
                wholeKeyCounter++;
            } else {
                halfKeyCounter++;
            }
            const halfKeyPosX = getDefaultHalfKeyThPosXInOctave(halfKeyOctaveStart, numberOfSpacesBetweenHalfKeys, halfKeyCounter);
            const wholeKeyPosX = getDefaultWholeKeyThPosXInOctave(octaveStartPosX, wholeKeyCounter);
            const posX = isWholeFirstType ? wholeKeyPosX : halfKeyPosX;
            if (th === keyTh) {
                value = posX;
                break;
            }
        }
    }
    return value;
}

function getDefaultOctaveStartPosXOfPianoWithKeyPosX(keyPosX, keyTh) {
    const partOfOctaveStartToKeyPosX = getDefaultOctaveKeyPosXOfPiano(0, keyTh);
    return keyPosX - partOfOctaveStartToKeyPosX;
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
        if (!isPositive || !isValid) {
            octavePartOfWidthAndStart += !isPositive ? -defaultWholeOctaveWidth : !isValid ? defaultWholeOctaveWidth : 0;
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
        const validPos = isWholeFirstType ? i : i1;
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
    const keysFillStyles = getNextToEachOtherOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle, startKeyIndexInOctave, keysCount);
    drawNextToEachOtherNormalKeysWithWidthAndHeightOfPiano(keysFillStyles, width, height, posXAndStart, posY, startKeyIndexInOctave);
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

/**
 * Returns (keys parameters) array
 * @param width {number} integer
 * @param height {number} integer
 * @param posX {number} integer
 * @param posY {number} integer
 * @param wholeKeyFillStyle {string} rgb hex
 * @param halfKeyFillStyle {string} rgb hex
 * @param startKeyIndexFromOctave {number} integer
 * @param keysCount {number} integer
 * @return {[]}
 */
function getPianoNextToEachOtherKeysParameters(
    width = validateIntegerWithMin(width, 0),
    height = validateIntegerWithMin(height, 0),
    posX = getValidInteger(posX),
    posY = getValidInteger(posY),
    {
        wholeKeyFillStyle = tHex.getValidRgbHex(wholeKeyFillStyle),
        halfKeyFillStyle = tHex.getValidRgbHex(halfKeyFillStyle)
    },
    startKeyIndexFromOctave = validateInteger(startKeyIndexFromOctave, 0, 11),
    keysCount = validateIntegerWithMin(keysCount, 0)
) {
    const wholeKeyIndexesInOctave = [0, 2, 4, 5, 7, 9, 11];
    const isStartKeyWholeFromOctave = isObjectEqualsSomeElementOfArray(startKeyIndexFromOctave, wholeKeyIndexesInOctave);
    const wholeKeyWidth = 15;
    const wholeKeyHeight = 104;
    const value = [];
    const keyTypesInOctave = getKeyTypesInOctave();
    const firstKeyType = keyTypesInOctave[startKeyIndexFromOctave];
    const lastKeyIndexFromOctaves = getValidKeyIndexInOctaveFromIndex(startKeyIndexFromOctave + keysCount - 1);
    const lastKeyFirstType = getKeyOctaveFirstType(lastKeyIndexFromOctaves);
    const lastKeyType = keyTypesInOctave[lastKeyIndexFromOctaves];
    const isLastKeyHalf = lastKeyFirstType === "half";
    const keysFillStyles = getNextToEachOtherOctaveKeysFillStyles(wholeKeyFillStyle, halfKeyFillStyle, startKeyIndexFromOctave, keysCount);
    const canvasPartsCount = {
        width,
        height
    };
    let keyPosX = posX;
    let remainedKeysCount = keysCount;
    let connectedNormalKeysCount;
    let i = 0;
    let normalStartKeyIndexFromOctave = startKeyIndexFromOctave;
    let defaultNormalStartKeyIndexFromOctave = startKeyIndexFromOctave;
    const firstOctaveStartToFirstKeyIndexPosX = getDefaultOctaveKeyPosXInOctaves(0, startKeyIndexFromOctave);
    const newDefaultFirstWholeKeyParameters = {
        canvasPartsCount,
        pos: {
            x: posX,
            y: posY
        },
        fillStyle: keysFillStyles[0],
        keyType: {
            type: "whole",
            left: "0",
            right: firstKeyType.right,
            width: firstKeyType.width,
            height: firstKeyType.height
        }
    };
    if (isStartKeyWholeFromOctave) {
        value.push(newDefaultFirstWholeKeyParameters);
        i++;
        remainedKeysCount = keysCount - 1;
        defaultNormalStartKeyIndexFromOctave++;
        if (normalStartKeyIndexFromOctave < 11) {
            normalStartKeyIndexFromOctave += 1;
        } else {
            normalStartKeyIndexFromOctave = 0;
        }
    }
    connectedNormalKeysCount = isStartKeyWholeFromOctave ? isLastKeyHalf ? remainedKeysCount : remainedKeysCount - 1 : isLastKeyHalf ? keysCount : keysCount - 1;
    const connectedNormalKeysTypesArray = createRepeatedConnectedArraysNextToEachOtherElementsWithFromIndexAndLength(
        keyTypesInOctave, normalStartKeyIndexFromOctave, connectedNormalKeysCount);
    const keysPosXsArray = getDefaultNextToEachOtherKeysPosXsInOctaves(
        keyPosX - firstOctaveStartToFirstKeyIndexPosX, defaultNormalStartKeyIndexFromOctave, keysCount - i);
    const lastNormalKeyTh = isLastKeyHalf ? keysCount : keysCount - 1;
    while (i < lastNormalKeyTh) {
        const outOfKeyIndex = isStartKeyWholeFromOctave ? 1 : 0;
        const newKeyPosX = keysPosXsArray[i - outOfKeyIndex];
        keyPosX = newKeyPosX;
        const newKeyFillStyle = keysFillStyles[i];
        const keyType = connectedNormalKeysTypesArray[i - outOfKeyIndex];
        const newKeyParameters = {
            canvasPartsCount,
            pos: {
                x: newKeyPosX,
                y: posY
            },
            fillStyle: newKeyFillStyle,
            keyType
        };
        value.push(newKeyParameters);
        i++;
        remainedKeysCount--;
    }
    if (remainedKeysCount > 0 && !isLastKeyHalf) {
        const beforeLastKeyType = value[i - 1].keyType;
        const lastKeyTypeLeft = getWholeKeyShapeX(lastKeyType.left);
        const beforeLastKeyTypeWidth = getValidInteger(beforeLastKeyType.width);
        const isBeforeLastKeyHalf = getValidString(beforeLastKeyType.type) === "half";
        keyPosX += isBeforeLastKeyHalf ? beforeLastKeyTypeWidth - lastKeyTypeLeft + 1 : beforeLastKeyTypeWidth + 1 - lastKeyTypeLeft;
        const newKeyParameters = {
            canvasPartsCount,
            pos: {
                x: keyPosX,
                y: posY
            },
            fillStyle: keysFillStyles[i],
            keyType: {
                type: "whole",
                left: lastKeyType.left,
                right: "0",
                width: wholeKeyWidth,
                height: wholeKeyHeight
            }
        };
        value.push(newKeyParameters);
    }
    return value;
}

function getKeysParametersOfPianoWithPianoType(pianoType, {
    wholeKeyFillStyle,
    halfKeyFillStyle
}) {
    let width = canvas.width;
    let height = canvas.height;
    let posX = 0;
    let posY = 0;
    let startKeyIndexFromOctave = 0;
    let keysCount = 0;
    if (pianoType === "classic") {
        width = 833;
        height = 912;
        posX = 1;
        posY = height - 105;
        startKeyIndexFromOctave = 9;
        keysCount = 88;
    }
    return getPianoNextToEachOtherKeysParameters(
        width,
        height,
        posX,
        posY,
        {
            wholeKeyFillStyle,
            halfKeyFillStyle
        },
        startKeyIndexFromOctave,
        keysCount
    );
}

function getKeysParametersOfPianoWithPianoTypeAndKeysIndexesArray(pianoType, {
                                                                      wholeKeyFillStyle,
                                                                      halfKeyFillStyle
                                                                  }, keysIndexesArray = getValidOnceOccurringIntegersArray(keysIndexesArray)
) {
    const keysParameters = getKeysParametersOfPianoWithPianoType(pianoType, {
        wholeKeyFillStyle,
        halfKeyFillStyle
    });
    return getArrayElementsWithIndexesArray(keysParameters, keysIndexesArray);
}

function getValidKeyParametersOfPiano(keyParameters) {
    keyParameters = Object.create(keyParameters);
    const width = keyParameters.canvasPartsCount.width;
    const height = keyParameters.canvasPartsCount.height;
    const posX = keyParameters.pos.x;
    const posY = keyParameters.pos.y;
    const fillStyle = keyParameters.fillStyle;
    const type = keyParameters.keyType.type;
    const keyLeftType = keyParameters.keyType.left;
    const keyRightType = keyParameters.keyType.right;
    const keyWidth = keyParameters.keyType.width;
    const keyHeight = keyParameters.keyType.height;
    const keyType = {
        type,
        left: keyLeftType,
        right: keyRightType,
        width: keyWidth,
        height: keyHeight
    };
    return new KeyParametersOfPiano(keyType, fillStyle, width, height, posX, posY);
}

function getValidKeysParametersOfPiano(keysParameters) {
    keysParameters = getValidArray(keysParameters);
    let value = [];
    for (const keyParameters of keysParameters) {
        const validKeyParameters = getValidKeyParametersOfPiano(keyParameters);
        value.push(validKeyParameters);
    }
    return value;
}

function drawKeysFromKeysParametersOfPiano(keysParameters) {
    keysParameters = getValidKeysParametersOfPiano(keysParameters);
    for (const keyParameters of keysParameters) {
        const keyType = keyParameters.keyType;
        const fillStyle = keyParameters.fillStyle;
        const width = keyParameters.canvasPartsCount.width;
        const height = keyParameters.canvasPartsCount.height;
        const posX = keyParameters.pos.x;
        const posY = keyParameters.pos.y;
        const key = new KeyOfPiano(keyType, fillStyle, width, height, posX, posY);
        key.draw();
    }
}

function getClickingWholeKeyParametersOfPiano(keyType, width, height, partOfWidthPosX) {
    const isValidKeyType = value => isObjectEqualsSomeElementOfString(value, "0123");
    const getValidKeyType = value => isValidKeyType(value) ? value : "0";
    let keyWidth = keyType.width;
    let keyHeight = keyType.height;
    const isValidKeyWidth = isValidInteger(keyWidth);
    const isValidKeyHeight = isValidInteger(keyHeight);
    const validKeyWidth = getValidInteger(keyWidth) < 0 ? 0 : keyWidth;
    const validKeyHeight = getValidInteger(keyHeight) < 0 ? 0 : keyHeight;
    keyWidth = isValidKeyWidth ? validKeyWidth : 15;
    keyHeight = isValidKeyHeight ? validKeyHeight : 104;
    partOfWidthPosX = getValidInteger(partOfWidthPosX);
    const posX = getPartOfWidth(width, partOfWidthPosX);
    const topOfKeys = getTopOfPianoKeys(height);
    const wholeKeyWidth = getPartOfWidth(width, keyWidth);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const leftType = getValidKeyType(keyType.left);
    const rightType = getValidKeyType(keyType.right);
    const leftTypeValue = getDefaultWholeKeyShapeX(leftType, width);
    const rightTypeValue = getDefaultWholeKeyShapeX(rightType, width);
    const leftTypePosX = posX + leftTypeValue;
    const rightTypePosX = posX + wholeKeyWidth - rightTypeValue;
    const upperPartDownPosY = topOfKeys + halfKeyHeight;
    return {
        keyWidth,
        leftTypePosX,
        rightTypePosX,
        upperPartDownPosY,
        lowerPartDownPosY: topOfKeys + getPartOfHeightWithResizedCanvas(width, height, keyHeight)
    }
}

function isValidWholeKeyClickingMousePosition(keyType, width, height, partOfWidthPosX) {
    const partOfWidth = value => getPartOfWidth(width, value);
    const parameters = getClickingWholeKeyParametersOfPiano(keyType, width, height, partOfWidthPosX);
    const wholeKeyWidth = parameters.keyWidth;
    const leftTypePosX = parameters.leftTypePosX;
    const rightTypePosX = parameters.rightTypePosX;
    const upperPartDownPosY = parameters.upperPartDownPosY;
    const lowerPartDownPosY = parameters.lowerPartDownPosY;
    const isMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.y <= upperPartDownPosY;
    const isMousePosYLessThanOrEqualsWholeKeyDownPosY = savedCanvasMouseValidPos.y <= lowerPartDownPosY;
    const ifMousePosYLessThanOrEqualsHalfKeyDownPosY = savedCanvasMouseValidPos.x >= leftTypePosX && savedCanvasMouseValidPos.x <= rightTypePosX;
    const ifMousePosYGreaterThanHalfKeyDownPosY = savedCanvasMouseValidPos.x >= partOfWidth(partOfWidthPosX) && savedCanvasMouseValidPos.x <= partOfWidth(partOfWidthPosX + wholeKeyWidth);
    const ifMousePosYLessThanOrEqualsWholeKeyDownPosY = isMousePosYLessThanOrEqualsHalfKeyDownPosY ? ifMousePosYLessThanOrEqualsHalfKeyDownPosY : ifMousePosYGreaterThanHalfKeyDownPosY;
    return isMousePosYLessThanOrEqualsWholeKeyDownPosY ? ifMousePosYLessThanOrEqualsWholeKeyDownPosY : false;
}

function isValidHalfKeyClickingMousePosition(width, height, posX) {
    const topOfKeys = getTopOfPianoKeys(height);
    const halfKeyHeight = getHalfKeyHeight(width, height);
    const isMousePosXLessThanOrEqualsHalfKeyWidthPos = savedCanvasMouseValidPos.x <= getPartOfWidth(width, posX + defaultHalfKeyWidth);
    const isMousePosXBetweenHalfKeyAndWidthPos = savedCanvasMouseValidPos.x >= getPartOfWidth(width, posX) && isMousePosXLessThanOrEqualsHalfKeyWidthPos;
    return savedCanvasMouseValidPos.y <= (topOfKeys + halfKeyHeight) && isMousePosXBetweenHalfKeyAndWidthPos;
}

function getColorWithNotSaveChangedColorsOnCanvasOfPiano(fieldNameWithWordsSeparatorsOfHyphen, modifiedColor) {
    const change = StringManipulation.change;
    const validName = change.letter.s.lowercase.allSearchAfterToUppercaseWithAToZAndRemoveAllSearchs(
        fieldNameWithWordsSeparatorsOfHyphen,
        "-"
    );
    const inputString = validName + "Input";
    let colorValue = window[inputString].value;
    window[inputString].value = colorValue = saveChangedColorsOnCanvasInput.checked ? modifiedColor : colorValue;
    return colorValue;
}

function drawClassicPianoClickingKeysAndCreateKeysSounds() {
    const width = 833;
    const height = 912;
    const overThePiano = height - 115;
    const topOfKeys = height - 105;
    const defaultOctaveWidth = 112;
    const halfKeyWidth = 7;
    const halfKeyHeight = 68;
    const wholeKeyHeight = 104;
    const modifiedColors = subArray(getCanvasColorValues(backgroundColorInput.value), 11, 14);
    const namedColorsWithNotSaveChangedColorsOnCanvas = {
        pianoActivePartClickingWholeKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano(canvasColorsIds[11], modifiedColors[0]),
        pianoActivePartClickingHalfKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano(canvasColorsIds[12], modifiedColors[1]),
        pianoActivePartMovingStripForClickingWholeKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano(canvasColorsIds[13], modifiedColors[3]),
        pianoActivePartMovingStripForClickingHalfKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano(canvasColorsIds[14], modifiedColors[4]),
    };
    const colorsWithNotSaveChangedColorsOnCanvas = [
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoActivePartClickingWholeKeyColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoActivePartClickingHalfKeyColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoActivePartMovingStripForClickingWholeKeyColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoActivePartMovingStripForClickingHalfKeyColor
    ];
    const pianoActivePartClickingWholeKeyColor = colorsWithNotSaveChangedColorsOnCanvas[0];
    const pianoActivePartClickingHalfKeyColor = colorsWithNotSaveChangedColorsOnCanvas[1];
    const pianoActivePartMovingStripForClickingWholeKeyColor = colorsWithNotSaveChangedColorsOnCanvas[2];
    const pianoActivePartMovingStripForClickingHalfKeyColor = colorsWithNotSaveChangedColorsOnCanvas[3];

    function partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(partOfHeightOfCanvas) {
        return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas);
    }

    function drawKey(type, keyType, fillStyle, partOfWidthPosX) {
        try {
            keyType.type = type;
        } catch (e) {
            console.info(e);
            keyType = {
                type
            };
        }
        const key = new KeyOfPiano(keyType, fillStyle, width, height, partOfWidthPosX, topOfKeys);
        key.draw(type);
    }

    function drawWholeKey(keyType, fillStyle, partOfWidthPosX) {
        drawKey("whole", keyType, fillStyle, partOfWidthPosX);
    }

    function drawHalfKey(keyType, fillStyle, partOfWidthPosX) {
        drawKey("half", keyType, fillStyle, partOfWidthPosX);
    }

    const isNotOscillator = window.audioContextOscillator === undefined;
    const stopActivePart = () => {
        if (!isNotOscillator) {
            drawStrips();
            stopSound();
        }
        canvasReloadingCounter = 0;
    };
    if (isCanvasMouseDown) {
        const isValidPianoMousePosY = savedCanvasMouseValidPos.y >= partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(topOfKeys) && savedCanvasMouseValidPos.y <= canvas.height;
        const isMousePosYLessThanOrEqualsWholeKeyDown = savedCanvasMouseValidPos.y <= partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(topOfKeys + wholeKeyHeight);
        const isValidMousePosY = isValidPianoMousePosY && isMousePosYLessThanOrEqualsWholeKeyDown;
        let isClickedKey = false;
        window.isValidMousePosY = isValidMousePosY;
        if (isValidMousePosY) {
            let isValidKeyClickingPosition = false;
            let keyCounter = 0;

            function loadingHalfKeyOfClickingPosition(fillStyle, posX) {
                const isValidPos = isValidHalfKeyClickingMousePosition(width, height, posX);
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    const keyType = {
                        width: halfKeyWidth,
                        height: halfKeyHeight
                    }
                    drawHalfKey(keyType, fillStyle, posX);
                    isClickedKey = true;
                    isValidKeyClickingPosition = true;
                    setKeySound(keyCounter);
                    addStrips(pianoActivePartMovingStripForClickingHalfKeyColor, width, height, 7, posX);
                }
            }

            function loadingWholeKeyOfClickingPosition(keyType, fillStyle, posX, partWidth) {
                const isValidPos = isValidWholeKeyClickingMousePosition(keyType, width, height, posX);
                const parts = {
                    left: typeof keyType.left === "undefined" ? 0 : getWholeKeyShapeX(keyType.left),
                    right: typeof keyType.right === "undefined" ? 0 : getWholeKeyShapeX(keyType.right)
                };
                const partPosXAndWidth = {
                    posX: posX + parts.left,
                    width: 15 - parts.left - parts.right
                };
                const partPosX = partPosXAndWidth.posX;
                partWidth = typeof partWidth === "undefined" ? partPosXAndWidth.width : validateIntegerWithMin(partWidth, 0);
                partWidth = partWidth === partPosXAndWidth.width ? partPosXAndWidth.width : partWidth;
                keyCounter++;
                if (isValidPos && !isClickedKey) {
                    drawWholeKey(keyType, fillStyle, posX);
                    isClickedKey = true;
                    isValidKeyClickingPosition = true;
                    setKeySound(keyCounter);
                    addStrips(pianoActivePartMovingStripForClickingWholeKeyColor, width, height, partWidth, partPosX);
                }
            }

            function loadingKeyOctaveOfClickingPosition(wholeKeyFillStyle, halfKeyFillStyle, partOfWidthAndStart) {
                wholeKeyFillStyle = tHex.getValidRgbHex(wholeKeyFillStyle);
                halfKeyFillStyle = tHex.getValidRgbHex(halfKeyFillStyle);
                partOfWidthAndStart = getValidInteger(partOfWidthAndStart);
                const startsOfKeys = getKeyOctavePosXsOfPiano(partOfWidthAndStart);
                let wholeKeyCounter = 0;
                for (let i = 0; i < 12; i++) {
                    const keyPosX = startsOfKeys[i];
                    const isWholeFirstType = isKeyOctaveFirstType(i, "whole");
                    if (isWholeFirstType) {
                        const wholeKeyType = getWholeKeyTypeInOctave(wholeKeyCounter);
                        loadingWholeKeyOfClickingPosition(wholeKeyType, wholeKeyFillStyle, keyPosX);
                        wholeKeyCounter++;
                    } else {
                        loadingHalfKeyOfClickingPosition(halfKeyFillStyle, keyPosX);
                    }
                }
            }

            loadingWholeKeyOfClickingPosition({
                right: "1",
            }, pianoActivePartClickingWholeKeyColor, 1);
            loadingHalfKeyOfClickingPosition(pianoActivePartClickingHalfKeyColor, 14);
            loadingWholeKeyOfClickingPosition({
                left: "3",
            }, pianoActivePartClickingWholeKeyColor, 17);
            let j = 33;
            for (let counter = 0; counter < 7; j += defaultOctaveWidth, counter++) {
                loadingKeyOctaveOfClickingPosition(pianoActivePartClickingWholeKeyColor, pianoActivePartClickingHalfKeyColor, j);
            }
            loadingWholeKeyOfClickingPosition({}, pianoActivePartClickingWholeKeyColor, j);
            if (isValidKeyClickingPosition) {
                drawStrips();
                isStopCanvasReloading = false;
                canvasReloadingCounter++;
            } else {
                stopActivePart();
            }
        } else {
            stopActivePart();
        }
    } else {
        stopActivePart();
    }
    const pianoHeight = getPartOfHeightWithResizedCanvas(width, height, defaultPianoHeight);
    const pianoTop = canvas.height - pianoHeight;
    try {
        const posY = pianoTop - getPartOfHeightWithResizedCanvas(width, height, strips[0].outOfPianoTop);
        if (!isEmptyArray(strips) && posY < 0) {
            window.strips.shift();
        }
    } catch (e) {}
    if (isNotOscillator) {
        addStrips();
        drawStrips();
    }
}

let reloadCanvasTimeIntervalHandler = window.setInterval(function () {
    isCanvasInterval = true;
    drawPianoSongEditor();
}, 10, false);

function main(timeout) {
    timeout = validateIntegerWithMin(timeout, 1);
    window.clearInterval(reloadCanvasTimeIntervalHandler);
    reloadCanvasTimeIntervalHandler = window.setInterval(function () {
        isCanvasInterval = true;
        drawPianoSongEditor();
    }, timeout, false);
}

function drawPianoSongEditor() {
    const self = drawPianoSongEditor;
    const values = getCanvasInputsValues();
    const definedValues = values;
    self.canvasFieldsCount = 0;

    arrowOfSaveCanvasInputsColors.hidden = !saveCanvasInputsColors.checked;
    firstOpeningBracketOfSaveCanvasInputsColors.hidden = arrowOfSaveCanvasInputsColors.hidden;
    firstClosingBracketOfSaveCanvasInputsColors.hidden = saveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "◂";
    closingBracketOfSaveCanvasInputsColors.hidden = saveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "▾";
    saveAndSetCanvasColorsInputs.hidden = arrowOfSaveCanvasInputsColors.hidden || arrowOfSaveCanvasInputsColors.textContent !== "▾";
    textItemsColorInputResetColorsPart.hidden = textItemsColorInput.value === defaultTextItemsColorValue;
    backgroundColorInputResetColorsPart.hidden = backgroundColorInput.value === defaultBackgroundColorValue;

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

    function createIsInputValueEqualsDefaultColorField(type) {
        const changedValidNameFirstLetterAToZ = changeCanvasColorInputNameFirstLetterToCapitalFromId(type);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsDefaultColor";
        const validName = getCanvasColorInputNameFromId(type);
        const inputName = validName + "Input";
        const defaultValueName = getDefaultCanvasColorInputNameFromId(type);
        self[fieldName] = window[inputName].value === window[defaultValueName];
    }

    function createIsInputValueEqualsSavedColorField(type) {
        const canvasColorInputType = getCanvasColorInputTypeFromId(type);
        const savedColorIndex = canvasColorInputTypes.indexOf(canvasColorInputType);
        const changedValidNameFirstLetterAToZ = changeCanvasColorInputNameFirstLetterToCapitalFromId(type);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsSavedColor";
        const inputName = getCanvasColorInputNameFromId(type) + "Input";
        const inputValue = values[savedColorIndex];
        definedValues[savedColorIndex] = inputValue;
        self[fieldName] = window[inputName].value === inputValue;
    }

    function createIsCanvasColorInputValueEqualsDefaultColorField(type) {
        const canvasColorInputId = getCanvasColorInputId(type);
        createIsInputValueEqualsDefaultColorField(canvasColorInputId);
        self.canvasFieldsCount++;
    }

    function createIsCanvasColorInputValueEqualsSavedColorField(type) {
        const canvasColorInputId = getCanvasColorInputId(type);
        createIsInputValueEqualsSavedColorField(canvasColorInputId);
    }

    function createAllIsCanvasColorInputValueEqualsDefaultColorFields(typesArray) {
        typesArray = getValidArray(typesArray);
        for (const element of typesArray) {
            createIsCanvasColorInputValueEqualsDefaultColorField(element);
        }
    }

    function createAllIsCanvasColorInputValueEqualsSavedColorFields(typesArray) {
        typesArray = getValidArray(typesArray);
        for (const element of typesArray) {
            createIsCanvasColorInputValueEqualsSavedColorField(element);
        }
    }

    function isFieldValueEqualsDefaultColor(type) {
        const changedValidNameFirstLetterAToZ = changeCanvasColorInputNameFirstLetterToCapitalFromId(type);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsDefaultColor";
        return self[fieldName];
    }

    function isFieldValueEqualsSavedColor(type) {
        const changedValidNameFirstLetterAToZ = changeCanvasColorInputNameFirstLetterToCapitalFromId(type);
        const fieldName = "is" + changedValidNameFirstLetterAToZ + "EqualsSavedColor";
        return self[fieldName];
    }

    function isCanvasField(type) {
        const canvasColorInputId = getCanvasColorInputId(type);
        return isFieldValueEqualsDefaultColor(canvasColorInputId);
    }

    function isCanvasFieldSaved(type) {
        const canvasColorInputId = getCanvasColorInputId(type);
        return isFieldValueEqualsSavedColor(canvasColorInputId);
    }

    function isCanvasFieldsWithArray(typesArray) {
        typesArray = getValidArray(typesArray);
        let isTrue = true;
        for (const element of typesArray) {
            isTrue = isTrue && isCanvasField(element);
        }
        return isTrue;
    }

    function isCanvasFieldsSavedWithArray(typesArray) {
        typesArray = getValidArray(typesArray);
        let isTrue = true;
        for (const element of typesArray) {
            isTrue = isTrue && isCanvasFieldSaved(element);
        }
        return isTrue;
    }

    function isAllCanvasFields() {
        return isCanvasFieldsWithArray(canvasColorInputTypes);
    }

    function isAllCanvasFieldsSaved() {
        return isCanvasFieldsSavedWithArray(canvasColorInputTypes);
    }

    createAllIsCanvasColorInputValueEqualsDefaultColorFields(canvasColorInputTypes);
    createAllIsCanvasColorInputValueEqualsSavedColorFields(canvasColorInputTypes);
    createIsInputValueEqualsDefaultColorField("text-items-color");
    createIsInputValueEqualsDefaultColorField("background-color");
    for (let i = 0; i < self.canvasFieldsCount; i++) {
        const inputType = canvasColorInputTypes[i];
        const fieldValidName = getCanvasColorInputNameFromType(inputType);
        window[fieldValidName + "ResetColorPart"].hidden = isCanvasField(inputType);
    }
    window["textItemsColorResetColorPart"].hidden = isFieldValueEqualsDefaultColor("text-items-color");
    window["backgroundColorResetColorPart"].hidden = isFieldValueEqualsDefaultColor("background-color");
    const isJustCanvasInputsEqualsDefaultColor = isCanvasFieldsWithArray(canvasInputsColorInputsTypes);
    const isJustCanvasPianoInputsEqualsDefaultColor = isCanvasFieldsWithArray(canvasPianoInputsColorInputsTypes);
    const isCanvasPianoActivePartInputsEqualsDefaultColor = isCanvasFieldsWithArray(canvasPianoActivePartInputsColorInputsTypes);
    const isCanvasPianoAndActivePartInputsEqualsDefaultColor = isJustCanvasPianoInputsEqualsDefaultColor && isCanvasPianoActivePartInputsEqualsDefaultColor;
    const isJustCanvasAndPianoInputsEqualsDefaultColor = isJustCanvasInputsEqualsDefaultColor && isJustCanvasPianoInputsEqualsDefaultColor;
    const isCanvasInputsEqualsDefaultColor = isAllCanvasFields();
    const ifCanvasAndPianoInputsVisibleOfJustCanvasInputs = canvasPianoActivePartInputs.hidden ? isJustCanvasAndPianoInputsEqualsDefaultColor : isCanvasInputsEqualsDefaultColor;
    const ifCanvasInputsVisibleOfJustCanvasInputs = canvasPianoInputs.hidden ? isJustCanvasInputsEqualsDefaultColor : ifCanvasAndPianoInputsVisibleOfJustCanvasInputs;
    const ifCanvasAndPianoInputsVisibleOfJustCanvasAndPianoInputs = canvasPianoActivePartInputs.hidden ? isJustCanvasPianoInputsEqualsDefaultColor : isCanvasPianoAndActivePartInputsEqualsDefaultColor;
    canvasInputsResetColorsPart.hidden = canvasInputs.hidden ? true : ifCanvasInputsVisibleOfJustCanvasInputs;
    canvasPianoInputsResetColorsPart.hidden = canvasInputs.hidden || canvasPianoInputs.hidden ? true : ifCanvasAndPianoInputsVisibleOfJustCanvasAndPianoInputs;
    canvasPianoActivePartInputsResetColorsPart.hidden = canvasInputs.hidden || canvasPianoInputs.hidden || canvasPianoActivePartInputs.hidden ? true : isCanvasPianoActivePartInputsEqualsDefaultColor;
    resetColorsOnCanvasPart.hidden = isCanvasInputsEqualsDefaultColor;
    const isAllCanvasFieldsEqualsSavedCanvasColors = isAllCanvasFieldsSaved();
    if (savedDefaultCanvasInputsColors === undefined || isAllCanvasFieldsEqualsSavedCanvasColors) {
        savedDefaultCanvasInputsColors = saveCanvasInputsColors.checked ? values : definedValues;
    }
    if (isCanvasInterval) {
        drawClassicPianoAndSongEditorStripes();
    }
    drawClassicPianoClickingKeysAndCreateKeysSounds();
}

function stopSound() {
    if (window.audioContextOscillator !== undefined) {
        window.audioContextOscillator.stop();
        window.audioContextOscillator = undefined;
    }
}

function setKeySound(keyTh) {
    if (window.audioContextOscillator === undefined) {
        const volume = getKeySoundVolumeWithKeyTh(1, keyTh);
        createKeySoundWithKeyTh(volume, keyTh, 30);
        window.drawnKeyIndex = keyTh;
    } else if (window.drawnKeyIndex !== keyTh) {
        stopSound();
    }
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

function createKeysSoundSimultaneouslyOneAfterTheOther(volumes, frequencies, rampValues, times) {

}

function createKeySound(volume, frequency, time) {
    createSoundWithExponentialRampToValueAtTime(volume, frequency, 0.00001, time);
}

function createKeySoundPitchWithSteps(volume, steps, time) {
    const frequency = getKeySoundPitchWithSteps(steps);
    return createKeySound(volume, frequency, time);
}

function createKeySoundWithPitch(volume, octave, note, time) {
    const frequency = getKeySoundPitch(octave, note);
    return createKeySound(volume, frequency, time);
}

function getKeyPowerWithSqrXTh(x, xXTh, steps) {
    x = getValidNumber(x);
    xXTh = getValidNumber(xXTh);
    steps = getValidNumber(steps);
    return Math.pow(x, steps / xXTh);
}

function getKeySoundPitchWithSqrXTh(x, xXTh, steps) {
    const power = getKeyPowerWithSqrXTh(x, xXTh, steps);
    return 440 * power;
}

function getKeyPowerWithSteps(steps) {
    steps = getValidSearchTh(steps);
    // ("A", 4) => 440
    // multiply by 2^(1/12) N times to get N steps higher
    return getKeyPowerWithSqrXTh(2, 12, steps - 57);
}

function getKeySoundPitchWithSteps(steps) {
    const power = getKeyPowerWithSteps(steps);
    return 440 * power;
}

function getKeySoundVolumeWithSteps(volume, steps) {
    volume = validateNumberWithMin(volume, 0);
    const power = getKeyPowerWithSteps(steps);
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
        left: leftType,
        right: rightType,
        width: 15,
        height: 104
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
        wholeKeyCounter += isWholeFirstType ? 1 : 0;
        const wholeKeyType = isWholeFirstType ? getWholeKeyTypeInOctave(wholeKeyCounter - 1) : null;
        const halfKeyType = {
            type: "half",
            left: undefined,
            right: undefined,
            width: 7,
            height: 68
        };
        const keyType = isWholeFirstType ? wholeKeyType : halfKeyType;
        value.push(keyType);
    }
    return value;
}

function getKeyTypesInOctaveWithWidthAndHeight(width, height) {
    const keyTypesInOctave = getKeyTypesInOctave();
    for (const element of keyTypesInOctave) {
        element.width = getPartOfWidth(width, element.width);
        element.height = getPartOfHeightWithResizedCanvas(width, height, element.height);
    }
    return keyTypesInOctave;
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

function addKeyToCanvas({type, canvasWidth, canvasHeight, posX, posY, fillStyle, keyWidth, keyHeight, }) {

}

function drawClassicPianoAndSongEditorStripes() {
    isCanvasListener = true;
    loadCanvasSize();
    const width = 833;
    const height = 912;
    const pianoTop = height - defaultPianoHeight;
    const defaultOctaveWidth = 112;
    const wholeOctavesCount = 7;
    const partOfWidth = value => getPartOfWidth(width, value);
    const modifiedColors = subArrayWithToIndex(getCanvasColorValues(backgroundColorInput.value), 10);
    const namedColorsWithNotSaveChangedColorsOnCanvas = {
        borderColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-border-color", modifiedColors[0]),
        backgroundColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-background-color", modifiedColors[1]),
        songEditorStripesColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-song-editor-stripes-color", modifiedColors[2]),
        pianoBackgroundColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-background-color", modifiedColors[3]),
        pianoTopMostUpperPartColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-top-most-upper-part-color", modifiedColors[4]),
        pianoTopUpperPartColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-top-upper-part-color", modifiedColors[5]),
        pianoTopUpperPartCenterColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-top-upper-part-center-color", modifiedColors[6]),
        pianoTopLowerPartColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-top-lower-part-color", modifiedColors[7]),
        pianoTopMostLowerPartColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-top-most-lower-part-color", modifiedColors[8]),
        pianoWholeKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-whole-key-color", modifiedColors[9]),
        pianoHalfKeyColor: getColorWithNotSaveChangedColorsOnCanvasOfPiano("canvas-piano-half-key-color", modifiedColors[10]),
    };
    const colorsWithNotSaveChangedColorsOnCanvas = [
        namedColorsWithNotSaveChangedColorsOnCanvas.borderColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.backgroundColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.songEditorStripesColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoBackgroundColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoTopMostUpperPartColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoTopUpperPartColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoTopUpperPartCenterColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoTopLowerPartColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoTopMostLowerPartColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoWholeKeyColor,
        namedColorsWithNotSaveChangedColorsOnCanvas.pianoHalfKeyColor,
    ];
    const borderColor = colorsWithNotSaveChangedColorsOnCanvas[0];
    const backgroundColor = colorsWithNotSaveChangedColorsOnCanvas[1];
    const songEditorStripesColor = colorsWithNotSaveChangedColorsOnCanvas[2];
    const pianoBackgroundColor = colorsWithNotSaveChangedColorsOnCanvas[3];
    const pianoTopMostUpperPartColor = colorsWithNotSaveChangedColorsOnCanvas[4];
    const pianoTopUpperPartColor = colorsWithNotSaveChangedColorsOnCanvas[5];
    const pianoTopUpperPartCenterColor = colorsWithNotSaveChangedColorsOnCanvas[6];
    const pianoTopLowerPartColor = colorsWithNotSaveChangedColorsOnCanvas[7];
    const pianoTopMostLowerPartColor = colorsWithNotSaveChangedColorsOnCanvas[8];
    const pianoWholeKeyColor = colorsWithNotSaveChangedColorsOnCanvas[9];
    const pianoHalfKeyColor = colorsWithNotSaveChangedColorsOnCanvas[10];

    function partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(partOfHeightOfCanvas) {
        return getPartOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height, partOfHeightOfCanvas);
    }

    function drawVerticalSonkEditorStripes() {
        function fillVerticalColoredStripeFrom0ToPianoTop(partOfWidthAndStart) {
            fillVerticalColoredStripeWithWidthAndPartOfWidth(
                songEditorStripesColor,
                width,
                height,
                partOfWidthAndStart,
                1,
                pianoTop
            );
        }

        function drawOctave(from) {
            fillOctaveOfPianoVerticalSongEditorStripes(
                songEditorStripesColor,
                width,
                height,
                from,
                1,
                pianoTop
            );
        }

        fillVerticalColoredStripeFrom0ToPianoTop(0);
        fillVerticalColoredStripeFrom0ToPianoTop(13);
        fillVerticalColoredStripeFrom0ToPianoTop(21);
        for (let i = 32, counter = 0; counter < wholeOctavesCount; i += defaultOctaveWidth, counter++) {
            drawOctave(i);
        }
        fillVerticalColoredStripeFrom0ToPianoTop(width - 1);
    }

    function drawClassicPiano() {
        function fillColoredRectWithPartOfHeight(style, posY, rectHeight) {
            fillColoredRect(
                style,
                partOfWidth(1),
                partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(
                    height - (defaultPianoHeight - posY)
                ),
                partOfWidth(width - 2),
                partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(rectHeight)
            );
        }

        fillColoredRect(
            pianoBackgroundColor,
            0,
            partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(height - defaultPianoHeight),
            canvas.width,
            partOfHeightWithIfCanvasHeightGreaterThanCanvasWidthAndWidthAndHeight(defaultPianoHeight)
        );
        fillColoredRectWithPartOfHeight(pianoTopMostUpperPartColor, 0, 1);
        fillColoredRectWithPartOfHeight(pianoTopUpperPartColor, 1, 3);
        fillColoredRectWithPartOfHeight(pianoTopUpperPartCenterColor, 2, 1);
        fillColoredRectWithPartOfHeight(pianoTopLowerPartColor, 4, 5);
        fillColoredRectWithPartOfHeight(pianoTopMostLowerPartColor, 8, 1);
        const keysFillStyles = {
            wholeKeyFillStyle: pianoWholeKeyColor,
            halfKeyFillStyle: pianoHalfKeyColor
        }
        const keysParameters = getKeysParametersOfPianoWithPianoType("classic", keysFillStyles);
        drawKeysFromKeysParametersOfPiano(keysParameters);
    }

    for (let i = 0; i < textItems.length; i++) {
        textItems.item(i).setAttribute("style", "color: " + textItemsColorInput.value);
    }

    canvas.style.border = "1px solid" + borderColor;
    canvas.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = getObjectIfEqualsObjects(backgroundColorInput.value, defaultBackgroundColorValue);
    document.getElementById("canvas-width").style.backgroundColor = canvasWidthInputBackgroundColorInput.value;
    document.getElementById("canvas-height").style.backgroundColor = canvasHeightInputBackgroundColorInput.value;
    document.getElementById("canvas-width").style.color = canvasWidthInputColorInput.value;
    document.getElementById("canvas-height").style.color = canvasHeightInputColorInput.value;
    // if (isSaveTheParametersOfTheStripsToAFile.checked && false) {
    //     const fileName = "" + saveTheParametersOfTheStripsToAFileEnterTheFileName.value;
    //     const fileContent = "" + strips;
    //     saveFile(fileName, fileContent);
    // }
    if (!isCanvasBackgroundColorTransparentInput.checked) {
        fillColoredRect(backgroundColor, 0, 0, canvas.width, canvas.height);
    }
    drawVerticalSonkEditorStripes();
    drawClassicPiano();
    isStopDrawingKeys = true;
}

drawPianoSongEditor();
