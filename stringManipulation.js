import {DIGITS, getValidString, isCharEqualsCharacterOfText, isValidStringAndText} from "./script";
import {createArrayFromObjects, isEmptyString} from "./s$ArgumentsInString";
import {createIfAndElseAndReturns, getValidInteger, StringPart} from "./stringPart";

export class StringManipulation {
    static containsSearchCount(string, search) {
        string = getValidString(string);
        search = getValidString(search);
        let replace = string;
        let counter = 0;
        while (true) {
            const removedSearchReplace = replace.replace(search, "");
            if (removedSearchReplace === replace) {
                break;
            } else {
                replace = removedSearchReplace;
                counter++;
            }
        }
        return createIfAndElseAndReturns(isEmptyString(search), Infinity, counter);
    }

    static containsSearchsArrayElementsCount(string, searchsArray) {
        searchsArray = getValidString(searchsArray);
        let counter = 0;
        let arrayCounter = 0;
        while (searchsArray.length > arrayCounter) {
            const search = searchsArray[arrayCounter];
            const searchCount = this.containsSearchCount(string, search);
            counter += searchCount;
            arrayCounter++;
        }
        return counter;
    }

    static containsSearchsCount(string, ...searchs) {
        return this.containsSearchsArrayElementsCount(string, createArrayFromObjects(searchs));
    }

    static convertElementsToArray(string) {
        string = getValidString(string);
        let value = [];
        for (const element of string) {
            value.push(element);
        }
        return value;
    }

    static isElementsMatchSomeOfCharsInText(string, text) {
        string = getValidString(string);
        text = getValidString(text);
        let value = isValidStringAndText(string, text);
        for (const element of string) {
            value = value && isCharEqualsCharacterOfText(element, text);
        }
        return value;
    }

    static isDigits(string) {
        string = getValidString(string);
        return this.isElementsMatchSomeOfCharsInText(string, DIGITS);
    }

    static reverse(string) {
        string = getValidString(string);
        let value = "";
        const {length} = string;
        for (let i = 0; i < length; i++) {
            value += string[length - 1 - i];
        }
        return value;
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

    static isNotJustSpacesString(string) {
        string = getValidString(string);
        const {length} = string;
        const stringManipulation = new StringManipulation(string);
        const spacesCount = stringManipulation.containsSearchsCount(" ");
        const isNotJustSpaces = length > spacesCount;
        return !isEmptyString(string) && isNotJustSpaces;
    }

    constructor(string) {
        this.string = getValidString(string);
    }

    containsSearchCount = search => StringManipulation.containsSearchCount(this.string, search);
    containsSearchsArrayElementsCount = searchsArray => StringManipulation.containsSearchsArrayElementsCount(this.string, searchsArray);
    containsSearchsCount = (...searchs) => StringManipulation.containsSearchsCount(this.string, searchs);
    convertElementsToArray = () => StringManipulation.convertElementsToArray(this.string);
    isElementsMatchSomeOfCharsInText = text => StringManipulation.isElementsMatchSomeOfCharsInText(this.string, text);
    isDigits = () => StringManipulation.isDigits(this.string);
    reverse = () => StringManipulation.reverse(this.string);
    isValidSubStringParameters = (fromIndex, toIndex) => StringManipulation.isValidSubStringParameters(this.string, fromIndex, toIndex);
    removeSearchInString = (search) => StringManipulation.removeSearchInString(this.string, search);
    removeSubString = (fromIndex, toIndex) => StringManipulation.removeSubString(this.string, fromIndex, toIndex);
    removeSubStringWithFromIndex = fromIndex => StringManipulation.removeSubStringWithFromIndex(this.string, fromIndex);
    removeSubStringWithToIndex = toIndex => StringManipulation.removeSubStringWithToIndex(this.string, toIndex);
    removeSubStringWithLength = (fromIndex, length) => StringManipulation.removeSubStringWithLength(this.string, fromIndex, length);
    isNotJustSpacesString = () => StringManipulation.isNotJustSpacesString(this.string);
}