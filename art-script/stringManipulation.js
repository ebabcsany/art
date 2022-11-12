import {
    createArrayFromObjects, createIfAndElseAndReturns,
    DIGITS,
    getValidString,
    isCharEqualsCharacterOfText, isEmptyString,
    isValidStringAndText
} from "./script.js";

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
    isNotJustSpacesString = () => StringManipulation.isNotJustSpacesString(this.string);
}
