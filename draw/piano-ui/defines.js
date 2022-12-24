import {
    createIfAndElseAndReturns,
    getValidString,
    isEmptyString,
    placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ
} from "../../art-script/script.js";
import {StringManipulation} from "../../art-script/stringManipulation.js";
import {StringPart} from "../../art-script/stringPart.js";

export function getCanvasColorInputId(type) {
    type = getValidString(type);
    const isTypeEmpty = isEmptyString(type);
    const validType = type + createIfAndElseAndReturns(isTypeEmpty, "", "-");
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

class CanvasColorElement extends HTMLElement {
    static ifValidType(type) {
        const isTypeEmpty = isEmptyString(type);
        return createIfAndElseAndReturns(isTypeEmpty, "", "-");
    }

    static getValidType(type) {
        const isTypeString = typeof type === "string";
        return createIfAndElseAndReturns(!isTypeString || isEmptyString(type), "", getValidString(type));
    }

    static getValidTypeValue(value, type) {
        value = getValidString(value);
        type = getValidString(type);
        const containsSpaceCount = StringManipulation.containsSearchCount(type, " ");
        const containsSpaceCountSpaces = StringManipulation.createStringFromOneSearch(" ", containsSpaceCount);
        const ifValidType = this.ifValidType(value);
        const validTypesArray = [
            "before",
            "after",
            "before," + containsSpaceCountSpaces + "after"
        ];
        let returnTypeValue = "";
        if (!isEmptyString(value)) {
            switch (type) {
                case validTypesArray[0]:
                    returnTypeValue = ifValidType + value;
                    break;
                case validTypesArray[1]:
                    returnTypeValue = value + ifValidType;
                    break;
                case validTypesArray[2]:
                    returnTypeValue = ifValidType + value + ifValidType;
                    break;
                default:
                    returnTypeValue = value;
                    break;
            }
        }
        return returnTypeValue;
    }

    constructor(type) {
        super();
        type = CanvasColorElement.getValidType(type);

        const text = this.textContent;
        const ifTextType = CanvasColorElement.getValidTypeValue(text, "before");
        const thisIdIfTypeEmpty = getCanvasColorInputId(text);
        const thisIdIfTypeNotEmpty = getCanvasColorInputId(type + ifTextType);
        const thisId = createIfAndElseAndReturns(isEmptyString(type), thisIdIfTypeEmpty, thisIdIfTypeNotEmpty);
        const thisResetColorId = thisId + "-reset-color";
        const firstParagraphItem = document.createElement('p');
        const firstTextItem = document.createElement('text-item');
        const firstLabelItem = document.createElement('label');
        const firstInputItem = document.createElement('input');
        const firstSpanItem = document.createElement('span');
        const firstSpanTextItem = document.createElement('text-item');
        const firstSpanButtonItem = document.createElement('button');
        const ifFirstTextItemType = CanvasColorElement.getValidTypeValue(text, "after");
        firstTextItem.textContent = ifFirstTextItemType + "color:";
        firstLabelItem.setAttribute("title", thisId);
        firstLabelItem.setAttribute("for", thisId);
        firstInputItem.id = thisId;
        firstInputItem.name = thisId;
        firstInputItem.type = "color";
        firstInputItem.value = this.getAttribute("color");
        firstSpanItem.id = thisResetColorId + "-part";
        firstSpanItem.hidden = true;
        firstSpanItem.append(" ");
        firstSpanTextItem.textContent = "-";
        firstSpanItem.appendChild(firstSpanTextItem);
        firstSpanItem.append(" ");
        firstSpanButtonItem.id = thisResetColorId + "-button";
        firstSpanButtonItem.name = thisResetColorId + "-button";
        firstSpanButtonItem.textContent = "reset-color";
        firstSpanItem.appendChild(firstSpanButtonItem);
        firstParagraphItem.appendChild(firstTextItem);
        firstParagraphItem.append(" ");
        firstParagraphItem.appendChild(firstLabelItem);
        firstParagraphItem.appendChild(firstInputItem);
        firstParagraphItem.appendChild(firstSpanItem);
        this.textContent = "";

        this.appendChild(firstParagraphItem);
    }
}

class CanvasPianoColorInputElement extends CanvasColorElement {
    constructor(type) {
        type = CanvasColorElement.getValidType(type);
        const ifValidType = CanvasColorElement.getValidTypeValue(type, "before");
        super("piano" + ifValidType);
    }
}

class CanvasPianoActivePartColorInputElement extends CanvasPianoColorInputElement {
    constructor(type) {
        type = CanvasColorElement.getValidType(type);
        const ifValidType = CanvasColorElement.getValidTypeValue(type, "before");
        super("active-part" + ifValidType);
    }
}

class FileSelectorElement extends HTMLElement {
    constructor() {
        super();

        const labelItem = document.createElement("label");
        const fileInputItem = document.createElement("input");
        labelItem.setAttribute("title", this.id);
        labelItem.setAttribute("for", this.id);
        fileInputItem.setAttribute("id", this.id);
        fileInputItem.setAttribute("type", "type");
        fileInputItem.setAttribute("name", this.id);

        this.appendChild(labelItem);
        this.appendChild(fileInputItem);
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

customElements.define("canvas-color-input", CanvasColorElement);
customElements.define("canvas-piano-color-input", CanvasPianoColorInputElement);
customElements.define("canvas-piano-active-part-color-input", CanvasPianoActivePartColorInputElement);
customElements.define("file-selector", FileSelectorElement);
