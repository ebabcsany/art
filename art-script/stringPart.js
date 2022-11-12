import {StringManipulation} from "./stringManipulation.js";
import {getValidInteger, getValidString, isEmptyString} from "./script.js";

export class StringPart extends StringManipulation {
    static subString(string, fromIndex, toIndex) {
        string = getValidString(string);
        const isValid = this.isValidSubStringParameters(string, fromIndex, toIndex);
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

    static isValidSubStringParameters(string, fromIndex, toIndex) {
        const isValidIndexes = typeof fromIndex === "number" && typeof toIndex === "number";
        return !isEmptyString(string) && isValidIndexes;
    }

    static removeSearchInString(string, search) {
        string = getValidString(string);
        search = getValidString(search);
        return string.replace(search, "");
    }

    static removeSubString(string, fromIndex, toIndex) {
        string = getValidString(string);
        const stringPart = new StringPart(string);
        const isValidParameters = this.isValidSubStringParameters(string, fromIndex, toIndex);
        fromIndex = getValidInteger(fromIndex);
        toIndex = getValidInteger(toIndex);
        const isValid = isValidParameters && fromIndex <= toIndex;
        const beforeFromIndex = stringPart.subStringWithToIndex(fromIndex - 1);
        const afterToIndex = stringPart.subStringWithFromIndex(toIndex + 1);
        return createIfAndElseAndReturns(isValid, beforeFromIndex + afterToIndex, string);
    }

    static removeSubStringWithFromIndex(string, fromIndex) {
        string = getValidString(string);
        return this.removeSubString(string, fromIndex, string.length - 1);
    }

    static removeSubStringWithToIndex(string, toIndex) {
        return this.removeSubString(string, 0, toIndex);
    }

    static removeSubStringWithLength(string, fromIndex, length) {
        fromIndex = getValidInteger(fromIndex);
        length = getValidInteger(length);
        const toIndex = fromIndex + createIfAndElseAndReturns(length > -1, length - 1, 0);
        return this.removeSubString(string, fromIndex, toIndex);
    }

    constructor(string) {
        super(string);
    }

    subString = (fromIndex, toIndex) => StringPart.subString(this.string, fromIndex, toIndex);
    subStringWithLength = (fromIndex, length) => StringPart.subStringWithLength(this.string, fromIndex, length);
    subStringWithFromIndex = fromIndex => StringPart.subStringWithFromIndex(this.string, fromIndex);
    subStringWithToIndex = toIndex => StringPart.subStringWithToIndex(this.string, toIndex);
    isValidSubStringParameters = (fromIndex, toIndex) => StringPart.isValidSubStringParameters(this.string, fromIndex, toIndex);
    removeSearchInString = (search) => StringPart.removeSearchInString(this.string, search);
    removeSubString = (fromIndex, toIndex) => StringPart.removeSubString(this.string, fromIndex, toIndex);
    removeSubStringWithFromIndex = fromIndex => StringPart.removeSubStringWithFromIndex(this.string, fromIndex);
    removeSubStringWithToIndex = toIndex => StringPart.removeSubStringWithToIndex(this.string, toIndex);
    removeSubStringWithLength = (fromIndex, length) => StringPart.removeSubStringWithLength(this.string, fromIndex, length);
}

export function createIfAndElseAndReturns(condition, ifTrue, ifFalse) {
    if (condition) {
        return ifTrue;
    } else {
        return ifFalse;
    }
}
