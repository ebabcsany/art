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

/**
 * <strong>(</strong>In {@link HTMLElement HTML} code<strong>)</strong>
 * <p><code style="color: #000000">(</code>from <code>&lt;{@link CanvasColorInputElement canvas-color-input} value="<code style="color: #3f5fef">{@link PaymentCurrencyAmount#value #000000}</code>"><code style="color: #7f008f">{@link Function#name example}</code>&lt;{@link CanvasColorInputElement canvas-color-input}></code><code style="color: #000000">)</code></p>
 * <p><code style="color: #000000">(</code>to <code>&lt;{@link CanvasColorInputElement canvas-color-input} value="<code style="color: #3f5fef">{@link PaymentCurrencyAmount#value #000000}</code>">&lt;p>&lt;text-item style="color: #000000"><code style="color: #7f008f">{@link Function#name example}</code>-color:&lt;/text-item>&lt;label for="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color">&lt;/label>&lt;input id="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color" name="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color" type="color" value="<code style="color: #3f5fef">{@link PaymentCurrencyAmount#value #000000}</code>">&lt;span id="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color-reset-color-part" hidden="">&lt;text-item style="color: #000000">-&lt;/text-item>&lt;button id="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color-reset-color-button" name="canvas-<code style="color: #7f008f">{@link Function#name example}</code>-color-reset-color-button">reset-color&lt;/button>&lt;/span>&lt;/p>&lt;/{@link CanvasColorInputElement canvas-color-input}></code><code style="color: #000000">)</code></p>
 */
class CanvasColorInputElement extends HTMLParagraphElement {
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

class CanvasPianoColorInputElement extends HTMLParagraphElement {
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

class CanvasPianoActivePartColorInputElement extends HTMLParagraphElement {
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

customElements.define("canvas-color-input", CanvasColorInputElement, {extends: "p"});
customElements.define("canvas-piano-color-input", CanvasPianoColorInputElement, {extends: "p"});
customElements.define("canvas-piano-active-part-color-input", CanvasPianoActivePartColorInputElement, {extends: "p"});
setCanvasColorInputs();
setCanvasPianoColorInputs();
setCanvasPianoActivePartColorInputs();
