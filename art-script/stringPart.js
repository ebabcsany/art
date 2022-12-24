import {createIfAndElseAndReturns, getValidInteger, getValidString, isEmptyString, isTypes} from "./script.js";

export class StringPart {
    /**
     * Returns is valid parameters
     * @param string {string}
     * @param fromIndex {number} (integer)
     * @param toIndex {number} (integer)
     * @returns {false|boolean}
     */
    static #isValidSubStringParameters(string, fromIndex, toIndex) {
        return !isEmptyString(string) && isTypes([fromIndex, toIndex], ["number", "number"]);
    }

    /**
     * Returns sub string
     * @param string {string}
     * @param fromIndex {number} (integer)
     * @param toIndex {number} (integer)
     * @returns {string|string}
     */
    static subString(string = "", fromIndex = 0, toIndex = 0) {
        string = getValidString(string);
        const isValid = this.#isValidSubStringParameters(string, fromIndex, toIndex);
        fromIndex = getValidInteger(fromIndex);
        toIndex = getValidInteger(toIndex);
        const substring = string.substring(fromIndex, toIndex + 1);
        const valueIfValid = createIfAndElseAndReturns(fromIndex <= toIndex, substring, "");
        return createIfAndElseAndReturns(isValid, valueIfValid, string);
    }

    static subStringWithLength(string, fromIndex, length) {
        fromIndex = getValidInteger(fromIndex);
        length = getValidInteger(length);
        return this.subString(string, fromIndex, fromIndex + length - 1);
    }

    static subStringWithFromIndex(string, fromIndex) {
        string = getValidString(string);
        return this.subString(string, fromIndex, string.length - 1);
    }

    static subStringWithToIndex(string, toIndex) {
        return this.subString(string, 0, toIndex);
    }

    constructor(string) {
        this.string = getValidString(string);
    }

    isValidParameters = (fromIndex, toIndex) => StringPart.#isValidSubStringParameters(this.string, fromIndex, toIndex);
    subString = (fromIndex, toIndex) => StringPart.subString(this.string, fromIndex, toIndex);
    subStringWithLength = (fromIndex, length) => StringPart.subStringWithLength(this.string, fromIndex, length);
    subStringWithFromIndex = fromIndex => StringPart.subStringWithFromIndex(this.string, fromIndex);
    subStringWithToIndex = toIndex => StringPart.subStringWithToIndex(this.string, toIndex);
}
