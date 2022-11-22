import {
    changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs,
    changeLowercaseStringFirstLetterToUppercaseWithAToZ, getValidString,
    placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ
} from "../art-script/script.js";

const setCanvasColorInputs = () => new CanvasColorInputElement();
const setCanvasPianoColorInputs = () => new CanvasPianoColorInputElement();
const setCanvasPianoActivePartColorInputs = () => new CanvasPianoActivePartColorInputElement();

export function getCanvasColorInputId(type) {
    type = getValidString(type);
    return "canvas-" + type + "-color";
}

function getCanvasColorInputNameFromId(id) {
    id = getValidString(id);
    return changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(id, "-");
}

export function getCanvasColorInputNameFromType(type) {
    const elementId = getCanvasColorInputId(type);
    return getCanvasColorInputNameFromId(elementId);
}

export function getDefaultCanvasColorInputNameFromName(name) {
    const changedElementNameFirstLetter = changeLowercaseStringFirstLetterToUppercaseWithAToZ(name);
    return "default" + changedElementNameFirstLetter + "Value";
}

function getDefaultCanvasColorInputNameFromId(id) {
    const elementName = getCanvasColorInputNameFromId(id);
    return getDefaultCanvasColorInputNameFromName(elementName);
}

function getDefaultCanvasColorInputNameFromType(type) {
    const elementId = getCanvasColorInputId(type);
    return getDefaultCanvasColorInputNameFromId(elementId);
}

export function getCanvasColorInputClickedNameFromName(name) {
    const nameWithFirstUppercaseAToZ = changeLowercaseStringFirstLetterToUppercaseWithAToZ(name);
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

class CanvasColorInputElement extends HTMLInputElement {
    static getCanvasColorInputs(qualifiedName) {
        return document.getElementsByTagName(qualifiedName);
    }

    static getCanvasColorInputInnerHTML(type, id, color) {
        type = getValidString(type);
        id = getValidString(id);
        const elementName = getCanvasColorInputNameFromId(id);
        const fieldResetColorPartName = elementName + "ResetColorPart";
        const fieldResetColorName = elementName + "ResetColor";
        const fieldResetColorPartId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorPartName, "-");
        const fieldResetColorId = placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(fieldResetColorName, "-");
        const firstTextItem = "<text-item>" + type + "-color:</text-item> ";
        const firstLabel = "<label for=\"" + id + "\"></label>";
        const firstInput = "<input id=\"" + id + "\" name=\"" + id + "\" type=\"color\" value=\"" + color + "\">";
        const firstPart = firstTextItem + firstLabel + firstInput;
        const firstResetColorPartFirstText = " <text-item>-</text-item> ";
        const firstResetColorPartButton = "<button id=\"" + fieldResetColorId + "-button\" name=\"" + fieldResetColorId + "-button\">reset-color</button>";
        const firstResetColorPart = "<span id=\"" + fieldResetColorPartId + "\" hidden>" + firstResetColorPartFirstText + firstResetColorPartButton + "</span>";
        return firstPart + firstResetColorPart;
    }

    static getCanvasColorInputInnerHTMLWithType(type, color) {
        const elementId = getCanvasColorInputId(type);
        return this.getCanvasColorInputInnerHTML(type, elementId, color);
    }

    static getCanvasColorInputOuterHTMLWithElement(element) {
        const canvasColorInput = element;
        const canvasColorInputValue = canvasColorInput.attributes.getNamedItem("value").value;
        const type = canvasColorInput.innerText;
        const innerHTML = this.getCanvasColorInputInnerHTMLWithType(type, canvasColorInputValue);
        return "<p>" + innerHTML + "</p>";
    }

    static setCanvasColorInput(element) {
        const canvasColorInput = element;
        canvasColorInput.innerHTML = this.getCanvasColorInputOuterHTMLWithElement(canvasColorInput);
    }

    constructor() {
        super();
        const canvasColorInputs = CanvasColorInputElement.getCanvasColorInputs("canvas-color-input");
        for (const canvasColorInput of canvasColorInputs) {
            CanvasColorInputElement.setCanvasColorInput(canvasColorInput);
        }
    }
}

class CanvasPianoColorInputElement extends HTMLInputElement {
    static getCanvasPianoColorInputInnerHTMLWithType(type, color) {
        const elementId = getCanvasColorInputId("piano-" + type);
        return CanvasColorInputElement.getCanvasColorInputInnerHTML(type, elementId, color);
    }

    static getCanvasPianoColorInputOuterHTMLWithElement(element) {
        const canvasPianoColorInput = element;
        const canvasPianoColorInputValue = canvasPianoColorInput.attributes.getNamedItem("value").value;
        const type = canvasPianoColorInput.innerText;
        const innerHTML = this.getCanvasPianoColorInputInnerHTMLWithType(type, canvasPianoColorInputValue);
        return "<p>" + innerHTML + "</p>";
    }

    static setCanvasPianoColorInput(element) {
        const canvasPianoColorInput = element;
        canvasPianoColorInput.innerHTML = this.getCanvasPianoColorInputOuterHTMLWithElement(canvasPianoColorInput);
    }

    constructor() {
        super();
        const canvasPianoColorInputs = CanvasColorInputElement.getCanvasColorInputs("canvas-piano-color-input");
        for (const canvasPianoColorInput of canvasPianoColorInputs) {
            CanvasPianoColorInputElement.setCanvasPianoColorInput(canvasPianoColorInput);
        }
    }
}

class CanvasPianoActivePartColorInputElement extends HTMLInputElement {
    static getCanvasPianoActivePartColorInputInnerHTMLWithType(type, color) {
        const elementId = getCanvasColorInputId("piano-active-part-" + type);
        return CanvasColorInputElement.getCanvasColorInputInnerHTML(type, elementId, color);
    }

    static getCanvasPianoActivePartColorInputInnerHTMLWithElement(element) {
        const canvasPianoActivePartColorInput = element;
        const canvasPianoActivePartColorInputValue = canvasPianoActivePartColorInput.attributes.getNamedItem("value").value;
        const type = canvasPianoActivePartColorInput.innerText;
        const innerHTML = this.getCanvasPianoActivePartColorInputInnerHTMLWithType(type, canvasPianoActivePartColorInputValue);
        return "<p>" + innerHTML + "</p>";
    }

    static setCanvasPianoActivePartColorInput(element) {
        const canvasPianoActivePartColorInput = element;
        canvasPianoActivePartColorInput.innerHTML = this.getCanvasPianoActivePartColorInputInnerHTMLWithElement(canvasPianoActivePartColorInput);
    }

    constructor() {
        super();
        const canvasPianoActivePartColorInputs = CanvasColorInputElement.getCanvasColorInputs("canvas-piano-active-part-color-input");
        for (const canvasPianoActivePartColorInput of canvasPianoActivePartColorInputs) {
            CanvasPianoActivePartColorInputElement.setCanvasPianoActivePartColorInput(canvasPianoActivePartColorInput);
        }
    }
}

function setDefaultCanvasColorInputValueFromName(name) {
    const defaultInputValueName = getDefaultCanvasColorInputNameFromName(name);
    window[name].value = window[defaultInputValueName];
}

function setDefaultCanvasColorInputValueFromId(id) {
    const elementName = getCanvasColorInputNameFromId(id);
    setDefaultCanvasColorInputValueFromName(elementName);
}

export function setDefaultCanvasColorInputValueFromType(type) {
    const elementId = getCanvasColorInputNameFromType(type);
    setDefaultCanvasColorInputValueFromId(elementId);
}

customElements.define("canvas-color-input", CanvasColorInputElement, {extends: "input"});
customElements.define("canvas-piano-color-input", CanvasPianoColorInputElement, {extends: "input"});
customElements.define("canvas-piano-active-part-color-input", CanvasPianoActivePartColorInputElement, {extends: "input"});
setCanvasColorInputs();
setCanvasPianoColorInputs();
setCanvasPianoActivePartColorInputs();
