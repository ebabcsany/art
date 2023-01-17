import {
    getValidString,
    isEmptyString, isEqualsElementsToObject, isObjectEqualsSomeElementOfObjects,
    placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ
} from "../../art-script/script.js";
import {StringManipulation} from "../../art-script/stringManipulation.js";
import {StringPart} from "../../art-script/stringPart.js";

export function getCanvasColorInputId(type) {
    type = getValidString(type);
    const isTypeEmpty = isEmptyString(type);
    const validType = type + (isTypeEmpty ? "" : "-");
    return "canvas-" + validType + "color";
}

export function getCanvasColorInputIdFromName(name) {
    name = getValidString(name);
    return placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(name, "-");
}

export function getCanvasColorInputTypeFromId(id) {
    id = getValidString(id);
    const isContainsSpace = StringManipulation.isContainsSearch(id, " ");
    const isContainsCanvas = StringManipulation.isContainsSearch(id, "canvas");
    const isContainsColor = StringManipulation.isContainsSearch(id, "color");
    const isContainsHyphen = StringManipulation.isContainsSearch(id, "-");
    const containsHyphenCount = StringManipulation.containsSearchCount(id, "-");
    const hyphenIndex = id.indexOf("-");
    const canvasAndHyphenIndex = id.indexOf("canvas-");
    const isFirstCanvasAndHyphen = canvasAndHyphenIndex === 0;
    const lastHyphenIndex = StringManipulation.getSearchThIndex(id, "-", containsHyphenCount);
    const hyphenAfterColor = "-color";
    const hyphenAfterColorPart = StringPart.subStringWithFromIndex(id, lastHyphenIndex);
    const isLastHyphenAfterColor = hyphenAfterColorPart === hyphenAfterColor;
    const afterFirstHyphenIndex = hyphenIndex + 1;
    const beforeLastHyphenIndex = lastHyphenIndex - 1;
    const isValid =
        isContainsCanvas &&
        isContainsColor &&
        isContainsHyphen &&
        !isContainsSpace &&
        isFirstCanvasAndHyphen &&
        isLastHyphenAfterColor;
    let value = id;
    if (isValid) {
        if (containsHyphenCount > 1) {
            value = StringPart.subString(id, afterFirstHyphenIndex, beforeLastHyphenIndex);
        } else {
            value = "";
        }
    }
    return value;
}

export function getCanvasColorInputNameFromId(id) {
    id = getValidString(id);
    return StringManipulation
        .change.letter.s.lowercase.allSearchAfterToUppercaseWithAToZAndRemoveAllSearchs(id, "-");
}

export function getCanvasColorInputNameFromType(type) {
    const elementId = getCanvasColorInputId(type);
    return getCanvasColorInputNameFromId(elementId);
}

export function changeCanvasColorInputNameFirstLetterToCapitalFromId(id) {
    const name = getCanvasColorInputNameFromId(id);
    return StringManipulation.change.letter.lowercase.firstToUppercaseWithAToZ(name);
}

export function changeCanvasColorInputNameFirstLetterToCapitalFromType(type) {
    const id = getCanvasColorInputId(type);
    return changeCanvasColorInputNameFirstLetterToCapitalFromId(id);
}

export function getDefaultCanvasColorInputNameFromName(name) {
    const changedElementNameFirstLetter = StringManipulation.change.letter.lowercase.firstToUppercaseWithAToZ(name);
    return "default" + changedElementNameFirstLetter + "Value";
}

export function getDefaultCanvasColorInputNameFromId(id) {
    const elementName = getCanvasColorInputNameFromId(id);
    return getDefaultCanvasColorInputNameFromName(elementName);
}

export function getDefaultCanvasColorInputNameFromType(type) {
    const elementId = getCanvasColorInputId(type);
    return getDefaultCanvasColorInputNameFromId(elementId);
}

export function getCanvasColorInputClickedNameFromName(name) {
    const nameWithFirstUppercaseAToZ = StringManipulation.change.letter.lowercase.firstToUppercaseWithAToZ(name);
    return "is" + nameWithFirstUppercaseAToZ + "InputClicked";
}

function getCanvasColorInputClickedNameFromId(id) {
    const elementName = getCanvasColorInputNameFromId(id);
    return getCanvasColorInputClickedNameFromName(elementName);
}

export function getCanvasColorInputClickedNameFromType(type) {
    const elementId = getCanvasColorInputId(type);
    return getCanvasColorInputClickedNameFromId(elementId);
}

export function getValidType(type) {
    const isTypeString = typeof type === "string";
    const isInvalid = !isTypeString || isEmptyString(type);
    return isInvalid ? "" : getValidString(type);
}

function getValidTypeOfElementValue(value, type) {
    value = getValidString(value);
    type = getValidString(type);
    const containsSpaceCount = StringManipulation.containsSearchCount(type, " ");
    const containsSpaceCountSpaces = StringManipulation.createStringFromOneSearch(" ", containsSpaceCount);
    const ifValid = isEmptyString(value) ? "" : "-";
    const validTypesArray = [
        "before",
        "after",
        "before," + containsSpaceCountSpaces + "after"
    ];
    let returnTypeValue = "";
    if (!isEmptyString(value)) {
        switch (type) {
            case validTypesArray[0]:
                returnTypeValue = ifValid + value;
                break;
            case validTypesArray[1]:
                returnTypeValue = value + ifValid;
                break;
            case validTypesArray[2]:
                returnTypeValue = ifValid + value + ifValid;
                break;
            default:
                returnTypeValue = value;
                break;
        }
    }
    return returnTypeValue;
}

function validIdOfElement(type, ifTypeEmptyString, ifTypeNotEmptyString) {
    type = getValidString(type);
    ifTypeEmptyString = getValidString(ifTypeEmptyString);
    ifTypeNotEmptyString = getValidString(ifTypeNotEmptyString);
    return isEmptyString(type) ? ifTypeEmptyString : ifTypeNotEmptyString;
}

class CanvasColorInputElement extends HTMLElement {
    validId(type, text) {
        const isTypeString = typeof type === "string";
        type = isTypeString ? getValidString(type) : "";
        const ifTextType = getValidTypeOfElementValue(text, "before");
        const thisIdIfTypeEmpty = getCanvasColorInputId(text);
        const thisIdIfTypeNotEmpty = getCanvasColorInputId(type + ifTextType);
        return validIdOfElement(type, thisIdIfTypeEmpty, thisIdIfTypeNotEmpty);
    }

    constructor() {
        super();

        const type = this.getAttribute("type");
        const validType = getValidType(type);
        const text = this.textContent;
        const thisId = typeof this.name === "undefined" ? this.validId(validType, text) : this.name;
        const color = this.getAttribute("color");
        const thisResetColor = this.getAttribute("reset-color");
        let thisResetColorItems;
        try {
            const text = "{" + thisResetColor + "}";
            const validText = text.replaceAll("'", "\"");
            thisResetColorItems = JSON.parse(validText);
        } catch (e) {
            thisResetColorItems = {};
        }
        let thisResetColorName = thisResetColorItems.name;
        let thisResetColorPartName = thisResetColorItems.partName;
        let thisResetColorButtonName = thisResetColorItems.buttonName;
        let thisResetColorButtonText = thisResetColorItems.buttonText;
        if (thisResetColor === null) {
            thisResetColorName = null;
            thisResetColorPartName = null;
            thisResetColorButtonName = null;
            thisResetColorButtonText = null;
        }
        const isUOrNull = (obj) => isObjectEqualsSomeElementOfObjects(obj, undefined, null);
        const resetColorName = isUOrNull(thisResetColorName) ? thisId + "-reset-color" : thisResetColorName;
        const resetColorPartId = isUOrNull(thisResetColorPartName) ? resetColorName + "-part" : thisResetColorPartName;
        const resetColorButtonName = isUOrNull(thisResetColorButtonName) ? resetColorName + "-button" : thisResetColorButtonName;
        const resetColorButtonText = isUOrNull(thisResetColorButtonText) ? "Reset color" : thisResetColorButtonText;
        const firstParagraphItem = document.createElement('p');
        const firstTextItem = document.createElement('text-item');
        const firstLabelItem = document.createElement('label');
        const firstInputItem = document.createElement('input');
        const firstSpanItem = document.createElement('span');
        const firstSpanTextItem = document.createElement('text-item');
        const firstResetColorButtonItem = document.createElement('button');
        const ifFirstTextItemType = getValidTypeOfElementValue(text, "after");
        const firstTextWithHyphens = ifFirstTextItemType + "color";
        const firstTextWithSpaces = firstTextWithHyphens.replaceAll("-", " ");
        const firstText = StringManipulation.change.letter.lowercase.firstToUppercaseWithAToZ(firstTextWithSpaces);
        window.canvasColorsIds.push(thisId);
        window.canvasColorsNames.push(getCanvasColorInputNameFromId(thisId));
        window.canvasColorsValues.push(color);
        firstTextItem.textContent = firstText + ":";
        firstLabelItem.setAttribute("for", thisId);
        firstInputItem.setAttribute("title", firstText);
        firstInputItem.id = thisId;
        firstInputItem.type = "color";
        firstInputItem.value = color;
        firstSpanItem.id = resetColorPartId;
        firstSpanItem.hidden = true;
        firstSpanItem.append(" ");
        firstSpanTextItem.textContent = "-";
        firstSpanItem.appendChild(firstSpanTextItem);
        firstSpanItem.append(" ");
        firstResetColorButtonItem.setAttribute("title", "Reset color");
        firstResetColorButtonItem.id = resetColorButtonName;
        firstResetColorButtonItem.name = resetColorButtonName;
        firstResetColorButtonItem.textContent = resetColorButtonText;
        firstSpanItem.appendChild(firstResetColorButtonItem);
        firstParagraphItem.appendChild(firstTextItem);
        firstParagraphItem.append(" ");
        firstParagraphItem.appendChild(firstLabelItem);
        firstParagraphItem.appendChild(firstInputItem);
        firstParagraphItem.appendChild(firstSpanItem);
        this.textContent = "";

        this.appendChild(firstParagraphItem);
    }
}

function setDefaultCanvasColorInputValueFromName(name) {
    const defaultInputValueName = getDefaultCanvasColorInputNameFromName(name);
    window[name + "Input"].value = window[defaultInputValueName];
}

function setDefaultCanvasColorInputValueFromId(id) {
    const elementName = getCanvasColorInputNameFromId(id);
    setDefaultCanvasColorInputValueFromName(elementName);
}

export function setDefaultCanvasColorInputValueFromType(type) {
    const elementId = getCanvasColorInputNameFromType(type);
    setDefaultCanvasColorInputValueFromId(elementId);
}

customElements.define("canvas-color-input", CanvasColorInputElement);
