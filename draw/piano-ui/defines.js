import {
    getValidString,
    isEmptyString,
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

function getValidType(type) {
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
        const thisResetColorName = this.getAttribute("reset-color-name") === null ? thisId + "-reset-color" : this.getAttribute("reset-color-name");
        const thisResetColorPartId = this.getAttribute("reset-color-part-name") === null ? thisResetColorName + "-part" : this.getAttribute("reset-color-part-name");
        const thisResetColorButtonName = this.getAttribute("reset-color-button-name") === null ? thisResetColorName + "-button" : this.getAttribute("reset-color-button-name");
        const thisResetColorButtonText = this.getAttribute("reset-color-button-text") === null ? "reset-color" : this.getAttribute("reset-color-button-text");
        const firstParagraphItem = document.createElement('p');
        const firstTextItem = document.createElement('text-item');
        const firstLabelItem = document.createElement('label');
        const firstInputItem = document.createElement('input');
        const firstSpanItem = document.createElement('span');
        const firstSpanTextItem = document.createElement('text-item');
        const firstResetColorButtonItem = document.createElement('button');
        const ifFirstTextItemType = getValidTypeOfElementValue(text, "after");
        window.canvasColorsIds.push(thisId);
        window.canvasColorsNames.push(getCanvasColorInputNameFromId(thisId));
        window.canvasColorsValues.push(color);
        firstTextItem.textContent = ifFirstTextItemType + "color:";
        firstLabelItem.setAttribute("title", thisId);
        firstLabelItem.setAttribute("for", thisId);
        firstInputItem.id = thisId;
        firstInputItem.name = thisId;
        firstInputItem.type = "color";
        firstInputItem.value = color;
        firstSpanItem.id = thisResetColorPartId;
        firstSpanItem.hidden = true;
        firstSpanItem.append(" ");
        firstSpanTextItem.textContent = "-";
        firstSpanItem.appendChild(firstSpanTextItem);
        firstSpanItem.append(" ");
        firstResetColorButtonItem.setAttribute("title", "reset-color");
        firstResetColorButtonItem.id = thisResetColorButtonName;
        firstResetColorButtonItem.name = thisResetColorButtonName;
        firstResetColorButtonItem.textContent = thisResetColorButtonText;
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

class FileSelectorElement extends HTMLElement {
    static validId(type) {
        const isTypeString = typeof type === "string";
        const isInvalidType = !isTypeString || isEmptyString(type);
        const thisType = getValidType(arguments[1]);
        const thisInputType = getValidType(arguments[2]);
        const thisId = getValidType(arguments[3]);
        type = getValidType(isInvalidType ? thisType : type);
        const ifThisValidType = getValidTypeOfElementValue(type, "after");
        const ifValidType = getValidTypeOfElementValue(thisInputType, "before");
        const validId = ifThisValidType + "file-selector" + ifValidType;
        return isEmptyString(type) ? thisId : validId;
    }

    static getElement(type, hidden) {
        const element = document.createElement("file-selector");
        const thisHidden = getValidType(arguments[2]);
        if (typeof hidden === "undefined") {
            if (typeof thisHidden === "boolean") {
                hidden = thisHidden;
            } else {
                hidden = false;
            }
        }
        const thisType = getValidType(arguments[3]);
        const thisId = getValidType(arguments[4]);
        const thisValidId = FileSelectorElement.validId(type, thisType, "", thisId);
        const labelItem = document.createElement("label");
        const fileInputItem = document.createElement("input");
        element.setAttribute("hidden", arguments[2]);
        element.setAttribute("type", arguments[3]);
        element.setAttribute("name", arguments[4]);
        labelItem.setAttribute("title", thisValidId);
        labelItem.setAttribute("for", thisValidId);
        fileInputItem.setAttribute("id", thisValidId);
        fileInputItem.setAttribute("name", thisValidId);
        fileInputItem.setAttribute("type", "file");
        fileInputItem.hidden = hidden;

        element["type"] = "";
        element["id"] = "";
        element.appendChild(labelItem);
        element.appendChild(fileInputItem);
        return element;
    }

    constructor(type, hidden) {
        super();

        const element = FileSelectorElement.getElement(type, hidden, true, )
        const shadow = this.attachShadow({mode: "closed"});
        shadow.appendChild()
    }
}
//
// class FileSelectorWithButtonAndTextElement extends HTMLElement {
//     constructor() {
//         super();
//
//         const thisType = getValidType(this.getAttribute("type"));
//         const buttonId = getValidType(this.getAttribute("button-name"));
//         const buttonText = getValidType(this.getAttribute("button-text"));
//         const selectedId = getValidType(this.getAttribute("selected-name"));
//         const selectedText = getValidType(this.getAttribute("selected-text"));
//         const selectorId = getValidType(this.getAttribute("selector-name"));
//         const thisValidButtonName = FileSelectorElement.validId("", thisType, "button", buttonId);
//         const thisValidSelectedPartName = FileSelectorElement.validId("", thisType, "selected", selectedId);
//         const thisValidSelectorPartId = FileSelectorElement.validId("", thisType, "selector", selectorId);
//         const buttonItem = document.createElement("button");
//         const textItem = document.createElement("text-item");
//         const fileSelectorItem = FileSelectorElement.getElement();
//         buttonItem.setAttribute("title", thisValidButtonName);
//         buttonItem.setAttribute("id", thisValidButtonName);
//         buttonItem.setAttribute("name", thisValidButtonName);
//         buttonItem.textContent = buttonText;
//         textItem.setAttribute("title", thisValidSelectedPartName);
//         textItem.setAttribute("id", thisValidSelectedPartName);
//         textItem.setAttribute("name", thisValidSelectedPartName);
//         textItem.textContent = selectedText;
//         fileSelectorItem.setAttribute("type", thisType);
//         fileSelectorItem.setAttribute("id", thisValidSelectorPartId);
//         fileSelectorItem.setAttribute("hidden", true);
//
//         this.appendChild(buttonItem);
//         this.appendChild(textItem);
//         this.appendChild(fileSelectorItem);
//     }
// }

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
// customElements.define("file-selector", FileSelectorElement);
// customElements.define("file-selector-with-button-and-text", FileSelectorWithButtonAndTextElement);
