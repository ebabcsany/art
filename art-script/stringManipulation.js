import {
    createArrayFromObjects,
    createIfAndElseAndReturns,
    DIGITS,
    getConsecutiveMatchingSearchsPartsCountInString,
    getConsecutiveMatchingSearchsPartsIndexesInString,
    getSearchIndexOrNearestFollowingSearchIndexInString,
    getSearchsIndexesInString,
    getStringIndexOf,
    getValidInteger,
    getValidSearchTh,
    getValidString,
    isCharEqualsCharacterOfText,
    isContainsSearchInString,
    isEmptyString,
    isEmptyStrings,
    isValidStringAndText,
    validateMinAndMax
} from "./script.js";
import {StringPart} from "./stringPart.js";

export class StringManipulation {
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

    static isValidSearchThParameters(string, search, searchTh) {
        const containsSearchCount = this.containsSearchsCount(string, search);
        const isValidParameters = typeof string === "string" && typeof search === "string" && typeof searchTh === "number";
        return isValidParameters && (!isEmptyString(string) || isEmptyStrings(string, search) || containsSearchCount >= getValidSearchTh(searchTh));
    }

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

    static isNotJustSpaces(string) {
        string = getValidString(string);
        const {length} = string;
        const spacesCount = this.containsSearchCount(string, " ");
        const isNotJustSpaces = length > spacesCount;
        return !isEmptyString(string) && isNotJustSpaces;
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

    static containsConsecutiveMatchingSearchsCount(string, search, firstSearchIndex) {
        string = getValidString(string);
        search = getValidString(search);
        let value = 0;
        let i = getValidInteger(firstSearchIndex);
        while (i < string.length) {
            if (StringPart.subString(string, i, i + search.length - 1) === search) {
                i += search.length;
                value++;
            } else {
                break;
            }
        }
        return value;
    }

    static containsConsecutiveMatchingFirstSearchsCount(string, search) {
        return this.containsConsecutiveMatchingSearchsCount(string, search, getStringIndexOf(string, search));
    }

    static containsConsecutiveReverseMatchingSearchsCount(string, search, lastSearchIndex) {
        string = getValidString(string);
        search = getValidString(search);
        let value = 0;
        let i = getValidInteger(lastSearchIndex);
        while (i > -1) {
            if (StringPart.subString(string, i, i + search.length - 1) === search) {
                i -= search.length;
                value++;
            } else {
                break;
            }
        }
        return value;
    }

    static convertElementsToArray(string) {
        string = getValidString(string);
        let value = [];
        for (const element of string) {
            value.push(element);
        }
        return value;
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

    static removeSearch(string, search) {
        string = getValidString(string);
        search = getValidString(search);
        return string.replace(search, "");
    }

    static getSearchThIndex(string, search, searchTh) {
        search = getValidString(search);
        searchTh = getValidSearchTh(searchTh);
        const containsSearchsCount = StringManipulation.containsSearchsCount(string, search);
        let value = -1;
        if (containsSearchsCount > 0 && searchTh > 0 && searchTh <= containsSearchsCount) {
            let disassembledString = getValidString(string);
            for (let i = 1; i < searchTh; i++) {
                disassembledString = StringManipulation.removeSearch(disassembledString, search);
            }
            const isContainsSearch = isContainsSearchInString(disassembledString, search);
            const addCountOfSearchIndex = createIfAndElseAndReturns(isContainsSearch, (searchTh * search.length) - 1, 0);
            const ifContainsSearch = getStringIndexOf(disassembledString, search) + addCountOfSearchIndex;
            value = createIfAndElseAndReturns(isContainsSearch, ifContainsSearch, value) - (search.length - 1);
        }
        return value;
    }

    static getSearchThOfIndex(string, search, index) {
        string = getValidString(string);
        search = getValidString(search);
        index = getValidInteger(index);
        const {length} = string;
        const containsSearchsCount = this.containsSearchCount(string, search);
        const searchsIndexes = getSearchsIndexesInString(string, search);
        const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
        const searchIndexOrNearestFollowingSearchIndex = getSearchIndexOrNearestFollowingSearchIndexInString(string, search, index);
        const isValid = containsSearchsCount > 0 && index === lastSearchIndex || index === searchIndexOrNearestFollowingSearchIndex;
        let value = -1;
        if (isValid) {
            for (let i = 0; i < length; i++) {
                const element = searchsIndexes[i];
                if (element === index) {
                    value = i + 1;
                }
            }
        }
        return value;
    }

    static removeSubString(string, fromIndex, toIndex) {
        string = getValidString(string);
        const stringPart = new StringPart(string);
        const isValidParameters = StringPart.isValidSubStringParameters(string, fromIndex, toIndex);
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

    static removeSearchTh(string, search, searchTh) {
        const isValid = this.isValidSearchThParameters(string, search, searchTh);
        string = getValidString(string);
        search = getValidString(search);
        searchTh = getValidSearchTh(searchTh);
        const fromIndex = this.getSearchThIndex(string, search, searchTh);
        const valueIfValid = this.removeSubStringWithLength(string, fromIndex, search.length);
        return createIfAndElseAndReturns(isValid, valueIfValid, string);
    }

    static removeAllSearchs(string, search) {
        string = getValidString(string);
        const containsSearchsCount = this.containsSearchsCount(string, search);
        let value = string;
        for (let i = 0; i < containsSearchsCount; i++) {
            value = this.removeSearch(value, search);
        }
        return value;
    }

    static removeConsecutiveSearchs(string, search, fromSearchTh, toSearchTh) {
        string = getValidString(string);
        fromSearchTh = getValidSearchTh(fromSearchTh);
        toSearchTh = getValidSearchTh(toSearchTh);
        const containsSearchsCount = this.containsSearchsCount(string, search);
        const validFromAndToSearchTh = validateMinAndMax(fromSearchTh, toSearchTh);
        fromSearchTh = validFromAndToSearchTh[0];
        toSearchTh = validFromAndToSearchTh[1];
        let value = string;
        const max = Math.min(toSearchTh - (fromSearchTh - 1), containsSearchsCount);
        for (let i = 0; i < max; i++) {
            value = this.removeSearchTh(value, search, fromSearchTh);
        }
        return value;
    }

    static removeConsecutiveMatchingSearchs(string, search, fromSearchTh) {
        string = getValidString(string);
        const fromSearchThIndex = this.getSearchThIndex(string, search, fromSearchTh);
        const containsConsecutiveMatchingSearchsCount = this.containsConsecutiveMatchingSearchsCount(string, search, fromSearchThIndex);
        const toSearchTh = fromSearchTh + containsConsecutiveMatchingSearchsCount - 1;
        return this.removeConsecutiveSearchs(string, search, fromSearchTh, toSearchTh);
    }

    static removeConsecutiveReverseMatchingSearchs(string, search, fromSearchTh) {
        string = getValidString(string);
        const fromSearchThIndex = this.getSearchThIndex(string, search, fromSearchTh);
        const containsConsecutiveReverseMatchingSearchsCount = this.containsConsecutiveReverseMatchingSearchsCount(string, search, fromSearchThIndex);
        const toSearchTh = fromSearchTh - (containsConsecutiveReverseMatchingSearchsCount - 1);
        return this.removeConsecutiveMatchingSearchs(string, search, toSearchTh);
    }

    static removeConsecutiveMatchingFirstSearchs(string, search) {
        return this.removeConsecutiveMatchingSearchs(string, search, 1);
    }

    static removeConsecutiveMatchingSearchsPart(string, search, partTh) {
        const isValidParameters = this.isValidSearchThParameters(string, search, partTh);
        const containsSearchsCount = this.containsSearchsCount(string, search);
        const isContainsSearch = containsSearchsCount > 0;
        const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
        const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
        const isValid = isValidParameters && isContainsSearch && partTh > 0 && partTh <= partsCount;
        let value = string;
        if (isValid) {
            const partIndex = partsIndexes[partTh - 1];
            const partLength = this.containsConsecutiveMatchingSearchsCount(string, search, partIndex);
            value = this.removeSubStringWithLength(string, partIndex, partLength);
        }
        return value;
    }

    static removeCharWithIndex(string, index) {
        return this.removeSubString(string, index, index);
    }

    static replaceString(string, fromIndex, toIndex, replace) {
        const stringPart = new StringPart(string);
        const beforeReplacePart = stringPart.subStringWithToIndex(fromIndex);
        const afterReplacePart = stringPart.subStringWithFromIndex(toIndex);
        return beforeReplacePart + replace + afterReplacePart;
    }

    static placeStringFromIndex(string, index, place) {
        const stringPart = new StringPart(string);
        const beforePlacePart = stringPart.subStringWithToIndex(index - 1);
        const afterPlacePart = stringPart.subStringWithFromIndex(index);
        return beforePlacePart + place + afterPlacePart;
    }

    constructor(string) {
        this.string = getValidString(string);
    }

    isValidSearchThParameters = (search, searchTh) => StringManipulation.isValidSearchThParameters(this.string, search, searchTh);
    isElementsMatchSomeOfCharsInText = text => StringManipulation.isElementsMatchSomeOfCharsInText(this.string, text);
    isDigits = () => StringManipulation.isDigits(this.string);
    containsSearchCount = search => StringManipulation.containsSearchCount(this.string, search);
    isNotJustSpaces = () => StringManipulation.isNotJustSpaces(this.string);
    containsSearchsArrayElementsCount = searchsArray => StringManipulation.containsSearchsArrayElementsCount(this.string, searchsArray);
    containsSearchsCount = (...searchs) => StringManipulation.containsSearchsCount(this.string, searchs);
    containsConsecutiveMatchingSearchsCount = (search, firstSearchIndex) => StringManipulation.containsConsecutiveMatchingSearchsCount(this.string, search, firstSearchIndex);
    containsConsecutiveMatchingFirstSearchsCount = (search) => StringManipulation.containsConsecutiveMatchingFirstSearchsCount(this.string, search);
    containsConsecutiveReverseMatchingSearchsCount = (search, lastSearchIndex) => StringManipulation.containsConsecutiveReverseMatchingSearchsCount(this.string, search, lastSearchIndex);
    convertElementsToArray = () => StringManipulation.convertElementsToArray(this.string);
    reverse = () => StringManipulation.reverse(this.string);
    removeSearch = (search) => StringManipulation.removeSearch(this.string, search);
    getSearchThIndex = (search, searchTh) => StringManipulation.getSearchThIndex(this.string, search, searchTh);
    getSearchThOfIndex = (search, index) => StringManipulation.getSearchThOfIndex(this.string, search, index);
    removeSubString = (fromIndex, toIndex) => StringManipulation.removeSubString(this.string, fromIndex, toIndex);
    removeSubStringWithFromIndex = fromIndex => StringManipulation.removeSubStringWithFromIndex(this.string, fromIndex);
    removeSubStringWithToIndex = toIndex => StringManipulation.removeSubStringWithToIndex(this.string, toIndex);
    removeSubStringWithLength = (fromIndex, length) => StringManipulation.removeSubStringWithLength(this.string, fromIndex, length);
    removeSearchTh = (search) => StringManipulation.removeSearch(this.string, search);
    removeAllSearchs = (search) => StringManipulation.removeAllSearchs(this.string, search);
    removeConsecutiveSearchs = (search, fromSearchTh, toSearchTh) => StringManipulation.removeConsecutiveSearchs(this.string, search, fromSearchTh, toSearchTh);
    removeConsecutiveMatchingSearchs = (search, fromSearchTh) => StringManipulation.removeConsecutiveMatchingSearchs(this.string, search, fromSearchTh);
    removeConsecutiveReverseMatchingSearchs = (search, fromSearchTh) => StringManipulation.removeConsecutiveReverseMatchingSearchs(this.string, search, fromSearchTh)
    removeConsecutiveMatchingFirstSearchs = (search) => StringManipulation.removeConsecutiveMatchingFirstSearchs(this.string, search);
    removeConsecutiveMatchingSearchsPart = (search, partTh) => StringManipulation.removeConsecutiveMatchingSearchsPart(this.string, search, partTh);
    removeCharWithIndex = (index) => StringManipulation.removeCharWithIndex(this.string, index);
    replaceString = (fromIndex, toIndex, replace) => StringManipulation.replaceString(this.string, fromIndex, toIndex, replace);
    placeStringFromIndex = (index, place) => StringManipulation.placeStringFromIndex(this.string, index, place);
}
