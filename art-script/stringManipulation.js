import {
    DIGITS,
    getConsecutiveMatchingSearchsPartsCountInString,
    getConsecutiveMatchingSearchsPartsIndexesInString,
    getReturnsArrayElementIfObjectEqualsArrayElement,
    getReturnsArrayElementIfObjectNotEqualsArrayElement,
    getSearchIndexOrNearestFollowingSearchIndexInString,
    getSearchsIndexesInString,
    getStringCapitalLetterThIndex,
    getStringIndexOf,
    getValidArray,
    getValidInteger,
    getValidOnceOccurringObjectsArray,
    getValidSearchTh,
    getValidString,
    isCharEqualsCharacterOfText,
    isContainsSearchArrayElementsInString,
    isEmptyArray,
    isEmptyString,
    isEmptyStrings,
    isValidStringAndText,
    stringifyArrayElements,
    validateInteger,
    validateIntegerWithMin,
    validateMinAndMax
} from "./script.js";
import {StringPart} from "./stringPart.js";

export class StringManipulation {
    #value = "";
    static value = "";

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
        return isEmptyString(search) ? Infinity : counter;
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
        return this.containsSearchsArrayElementsCount(string, searchs);
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

    static containsConsecutiveMatchingFirstSearchsCountFromStringFirst(string, search) {
        string = getValidString(string);
        const isStringFirstSearch = string[0] === search;
        const consecutiveMatchingFirstSearchsCount = this.containsConsecutiveMatchingFirstSearchsCount(string, search);
        return isStringFirstSearch ? consecutiveMatchingFirstSearchsCount : 0;
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

    static isContainsSearch(string, search) {
        return getValidString(string).indexOf(search) > -1;
    }

    static isContainsSearchs(string, ...searchs) {
        return isContainsSearchArrayElementsInString(string, searchs);
    }

    static isContainsOneSearch(string, search) {
        const containsSearchsCount = this.containsSearchCount(string, search);
        return containsSearchsCount === 1;
    }

    static isContainsOneSearchs(string, ...searchs) {
        let value = false;
        const searchsArray = searchs;
        if (isEmptyArray(searchsArray)) {
            value = true;
            for (const element of searchs) {
                value = value && this.isContainsOneSearch(string, element);
            }
        }
        return value;
    }

    static isContainsSearchCount(string, count, search) {
        count = getValidInteger(count);
        const containsSearchCount = this.containsSearchCount(string, search);
        return containsSearchCount === count;
    }

    static isContainsSearchsCount(string, count, ...searchs) {
        count = getValidInteger(count);
        const containsSearchsCount = this.containsSearchsCount(string, searchs);
        return containsSearchsCount === count;
    }

    static isContainsMinAndMaxSearchCount(string, min, max, search) {
        min = getValidInteger(min);
        max = getValidInteger(max);
        const containsSearchCount = this.containsSearchCount(string, search);
        return validateInteger(containsSearchCount, min, max);
    }

    static isContainsMinAndMaxSearchsCount(string, min, max, ...searchs) {
        min = getValidInteger(min);
        max = getValidInteger(max);
        const containsSearchsCount = this.containsSearchsCount(string, searchs);
        return validateInteger(containsSearchsCount, min, max);
    }

    static createStringFromOneSearch(search, length) {
        length = getValidInteger(length);
        let value = "";
        for (let i = 0; i < length; i++) {
            value += search;
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
        const containsSearchsCount = this.containsSearchsCount(string, search);
        let value = -1;
        if (containsSearchsCount > 0 && searchTh > 0 && searchTh <= containsSearchsCount) {
            let disassembledString = getValidString(string);
            for (let i = 1; i < searchTh; i++) {
                disassembledString = this.removeSearch(disassembledString, search);
            }
            const isContainsSearch = this.isContainsSearch(disassembledString, search);
            const addCountOfSearchIndex = isContainsSearch ? (searchTh * search.length) - 1 : 0;
            const ifContainsSearch = getStringIndexOf(disassembledString, search) + addCountOfSearchIndex;
            value = (isContainsSearch ? ifContainsSearch : value) - (search.length - 1);
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
        const isValidParameters = new StringPart(string).isValidParameters(fromIndex, toIndex);
        fromIndex = getValidInteger(fromIndex);
        toIndex = getValidInteger(toIndex);
        const isValid = isValidParameters && fromIndex <= toIndex;
        const beforeFromIndex = stringPart.subStringWithToIndex(fromIndex - 1);
        const afterToIndex = stringPart.subStringWithFromIndex(toIndex + 1);
        return isValid ? beforeFromIndex + afterToIndex : string;
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
        const toIndex = fromIndex + (length > -1 ? length - 1 : 0);
        return this.removeSubString(string, fromIndex, toIndex);
    }

    /**
     * Returns remove search th
     * @param string {string}
     * @param search {string}
     * @param searchTh {number}
     * @returns {string}
     */
    static removeSearchTh(string, search, searchTh) {
        const isValid = this.isValidSearchThParameters(string, search, searchTh);
        string = getValidString(string);
        search = getValidString(search);
        searchTh = getValidSearchTh(searchTh);
        const validPosition = arguments[3] === undefined ? 0 : getValidInteger(arguments[3]);
        const fromIndex = this.getSearchThIndex(string, search, searchTh);
        const position = fromIndex > -1 ? validPosition : -1;
        const length = getValidInteger(search.length);
        const valueIfValid = this.removeSubStringWithLength(string, fromIndex + position, length);
        return isValid ? valueIfValid : string;
    }

    static removeAfterSearchTh(string, search, searchTh) {
        search = getValidString(search);
        return this.removeSearchTh(string, search, searchTh, search.length, 1);
    }

    static removeSearchAndAfterSearchTh(string, search, searchTh) {
        search = getValidString(search);
        return this.removeSearchTh(string, search, searchTh, 0, search.length + 1);
    }

    static removeAllSearch(string, search) {
        string = getValidString(string);
        const containsSearchsCount = this.containsSearchCount(string, search);
        let value = string;
        for (let i = 0; i < containsSearchsCount; i++) {
            value = this.removeSearch(value, search);
        }
        return value;
    }

    static removeAllSearchs(string, ...searchs) {
        string = getValidString(string);
        const searchsArray = searchs;
        const onceOccurringSearchsArray = getValidOnceOccurringObjectsArray(searchsArray);
        let value = string;
        for (const element of onceOccurringSearchsArray) {
            value = this.removeAllSearch(value, element);
        }
        return value;
    }

    static removeAllSearchAndAfterSearch(string, search) {
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

    static removeConsecutiveMatchingFirstSearchsFromStringFirst(string, search) {
        const firstSearchsCount = this.containsConsecutiveMatchingFirstSearchsCountFromStringFirst(string, search);
        let value = string;
        if (firstSearchsCount > 0) {
            value = this.removeConsecutiveMatchingSearchs(string, search, 1);
        }
        return value;
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

    static getContainsFirstSearchCountFromBeforeOfFirstSecondSearch(string, firstSearch, secondSearch) {
        string = getValidString(string);
        const newManipulation = new StringManipulation(string);
        const newPart = new StringPart(string);
        const isContainsFirstSearch = newManipulation.isContainsSearch(firstSearch);
        const isContainsSecondSearch = newManipulation.isContainsSearch(secondSearch);
        const firstSearchIndex = string.indexOf(firstSearch);
        const secondSearchIndex = string.indexOf(secondSearch);
        const isValid = isContainsFirstSearch && isContainsSecondSearch && firstSearchIndex < secondSearchIndex;
        let value = 0;
        if (isValid) {
            const beforeOfSecondSearch = newPart.subStringWithToIndex(secondSearchIndex - 1);
            value = this.containsSearchCount(beforeOfSecondSearch, firstSearch);
        }
        return value;
    }

    static squareBrackets = class squareBrackets extends StringManipulation {
        /**
         * Returns is consecutive opening square bracket and closing square bracket;
         * @param string {string}
         * @returns {boolean}
         */
        static isOneSquareBrackets(string) {
            string = getValidString(string);
            const newManipulation = new StringManipulation(string);
            const isContainsOneOpeningSquareBracket = newManipulation.isContainsOneSearch("[");
            const isContainsOneClosingSquareBracket = newManipulation.isContainsOneSearch("]");
            const openingSquareBracketIndex = string.indexOf("[");
            const closingSquareBracketIndex = string.indexOf("]");
            return isContainsOneOpeningSquareBracket &&
                isContainsOneClosingSquareBracket &&
                openingSquareBracketIndex < closingSquareBracketIndex;
        }

        static isFirstSquareBrackets(string) {
            string = getValidString(string);
            const openingBracketIndex = string.indexOf("[");
            const closingBracketIndex = string.indexOf("]");
            const secondOpeningBracketIndex = this.getSearchThIndex(string, "[", 2);
            return openingBracketIndex > -1 &&
                closingBracketIndex > -1 &&
                closingBracketIndex < secondOpeningBracketIndex &&
                openingBracketIndex < closingBracketIndex;
        }

        static containsNextToEachOtherSquareBracketCount(string, bracketType, fromIndex) {
            const bracket = getReturnsArrayElementIfObjectEqualsArrayElement(
                bracketType,
                ["open", "close", "[", "]"],
                ["[", "]", "[", "]", "["]
            );
            return this.containsConsecutiveMatchingSearchsCount(string, bracket, fromIndex);
        }

        static containsNextToEachOtherSquareBracketCountFromFirst(string, bracketType) {
            return this.containsNextToEachOtherSquareBracketCount(string, bracketType);
        }

        /**
         * Returns searching opening bracket and after closing bracket
         * @param string {string}
         * @returns {number|number|number}
         */
        static getOneSquareBracketsIndex(string) {
            string = getValidString(string);
            const isFromThUndefined = typeof arguments[1] === "undefined";
            const fromTh = typeof arguments[1] === "undefined" ? 0 : getValidInteger(arguments[1]);
            const openingBracketIndex = this.getSearchThIndex(string, "[", fromTh);
            const newString = StringPart.subStringWithFromIndex(string, openingBracketIndex);
            const isFirstBrackets = this.isFirstSquareBrackets(newString);
            if (isFirstBrackets) {
                return openingBracketIndex;
            } else if (isFromThUndefined) {
                if (isEmptyString(string)) {
                    return -1;
                } else {
                    if (fromTh < 0) {
                        return -1;
                    } else {
                        return this.getOneSquareBracketsIndex(string, 0);
                    }
                }
            } else if (fromTh < 0) {
                return -1;
            } else {
                return this.getOneSquareBracketsIndex(string, fromTh + 1);
            }
        }

        static getOneNestingSquareBracketsIndexAndBrackets(string) {
            string = getValidString(string);
            const isOneBracketsIndexUndefined = typeof arguments[1] === "undefined";
            const oneBracketsIndex = isOneBracketsIndexUndefined ? this.getOneSquareBracketsIndex(string) : validateIntegerWithMin(arguments[1], 0);
            const openingBracketIndex = string.indexOf("[");
            const closingBracketIndex = string.indexOf("]");
            const stringFirst = StringPart.subStringWithToIndex(string, oneBracketsIndex);
            const containsFirstOpeningBracketsCount = this.containsSearchCount(stringFirst, "[");
            const stringLast = StringPart.subStringWithFromIndex(string, closingBracketIndex);
            const isConsecutiveMatchingLastClosingBrackets = this.isContainsSearchCount(
                stringLast,
                containsFirstOpeningBracketsCount,
                "]"
            );
            const isContainsLastOpeningBracket = this.isContainsSearch(
                stringLast,
                "["
            );
            const isValid =
                oneBracketsIndex > -1 &&
                closingBracketIndex > oneBracketsIndex &&
                isConsecutiveMatchingLastClosingBrackets &&
                !isContainsLastOpeningBracket;
            let index = -1;
            let brackets = undefined;
            if (isValid) {
                const stringLastEndIndex = this.getSearchThIndex(
                    stringLast,
                    "]",
                    containsFirstOpeningBracketsCount
                );
                const bracketsEndIndex = closingBracketIndex + stringLastEndIndex;
                index = openingBracketIndex;
                brackets = StringPart.subString(string, index, bracketsEndIndex);
            }
            return [index, brackets];
        }

        static getOneNestingSquareBracketsIndex(string) {
            const oneNestingBracketsIndexAndBrackets = this.getOneNestingSquareBracketsIndexAndBrackets(string);
            return oneNestingBracketsIndexAndBrackets[0];
        }

        static getOneNestingSquareBrackets(string) {
            const oneNestingBracketsIndexAndBrackets = this.getOneNestingSquareBracketsIndexAndBrackets(string);
            return oneNestingBracketsIndexAndBrackets[1];
        }

        static removeOneNestingSquareBrackets(string) {
            string = getValidString(string);
            const oneNestingBracketsIndexAndBrackets = this.getOneNestingSquareBracketsIndexAndBrackets(string);
            const oneNestingBracketsIndex = oneNestingBracketsIndexAndBrackets[0];
            const oneNestingBrackets = oneNestingBracketsIndexAndBrackets[1];
            const oneNestingBracketsEndIndex = oneNestingBracketsIndex + oneNestingBrackets.length - 1;
            return StringManipulation.removeSubString(string, oneNestingBracketsIndex, oneNestingBracketsEndIndex);
        }

        static getOneNestingSquareBracketsCount(string) {
            string = getValidString(string);
            let replace = string;
            let counter = 0;
            while (true) {
                const removedSearchReplace = this.removeOneNestingSquareBrackets(string);
                if (removedSearchReplace === replace) {
                    break;
                } else {
                    replace = removedSearchReplace;
                    counter++;
                }
            }
            return counter;
        }

        static getOneNestingSquareBracketsIndexes(string) {
            string = getValidString(string);
            let containsOneNestingBracketsCount = this.getOneNestingSquareBracketsCount(string);
            let value = [];
            const {length} = string;
            let i = 0;
            if (containsOneNestingBracketsCount > 0) {
                while (i < length) {
                    const oneNestingBracketsIndexAndBrackets = this.getOneNestingSquareBracketsIndexAndBrackets(string);
                    const oneNestingBracketsIndex = oneNestingBracketsIndexAndBrackets[0];
                    const oneNestingBrackets = oneNestingBracketsIndexAndBrackets[1];
                    const oneNestingBracketsEndIndex = oneNestingBracketsIndex + oneNestingBrackets.length - 1;
                    string[oneNestingBracketsIndex] = "_";
                    string[oneNestingBracketsEndIndex] = "_";
                    const isSearch = oneNestingBracketsIndex === i;
                    if (isSearch) {
                        value.push(i);
                        containsOneNestingBracketsCount--;
                        i++;
                    } else {
                        if (containsOneNestingBracketsCount > 0) {
                            i++;
                        } else {
                            break;
                        }
                    }
                }
            }
            return value;
        }

        static getOneNestingSquareBracketsThIndex(string, th) {
            const indexes = this.getOneNestingSquareBracketsIndexes(string);
            return indexes[getValidInteger(th)];
        }

        static getOneNestingSquareBracketsThOfIndex(string, index) {
            const indexes = this.getOneNestingSquareBracketsIndexes(string);
            let value = -1;
            for (const element of indexes) {
                if (index === element) {
                    value = element;
                }
            }
            return value;
        }

        /**
         * Returns brackets count
         * @param bracketsCount brackets count
         * @returns {number | undefined}
         */
        static #validateBracketsCount(bracketsCount = 1) {
            const is3ThArgumentUndefined = typeof arguments[2] === "undefined";
            const is4ThArgumentUndefined = typeof arguments[3] === "undefined";
            const is3And4ThArgumentsUndefined = is3ThArgumentUndefined && is4ThArgumentUndefined;
            const remainingOpeningBracketsCount = validateIntegerWithMin(arguments[2], 0);
            const remainingClosingBracketsCount = validateIntegerWithMin(arguments[3], 0);
            const isEqualsRemainingBracketsCounts = remainingOpeningBracketsCount === remainingClosingBracketsCount;
            return typeof bracketsCount === "undefined" ? is3And4ThArgumentsUndefined ? undefined : is3ThArgumentUndefined || is4ThArgumentUndefined ? getReturnsArrayElementIfObjectNotEqualsArrayElement(
                undefined,
                [
                    arguments[2],
                    arguments[3],
                ],
                [
                    remainingOpeningBracketsCount,
                    remainingClosingBracketsCount,
                    undefined
                ]
            ) : isEqualsRemainingBracketsCounts ? remainingOpeningBracketsCount : Math.min(
                remainingOpeningBracketsCount,
                remainingClosingBracketsCount
            ) : validateIntegerWithMin(
                bracketsCount,
                0
            );
        }

        /*static isSquareBrackets(string, bracketsCount = 1) {
            const self = class self {
                static #isSearchStarted = false;
                static #isSearchOpeningSquareBracketsEnded = false;
                static #isSearchEnded = false;
                static #searchedInvalidBracketsCount = 0;

                constructor(string, bracketsCount = 1) {
                    string = getValidString(string);
                    const isBracketsCountUndefined = typeof bracketsCount === "undefined";
                    bracketsCount = squareBrackets.#validateBracketsCount(
                        bracketsCount,
                        arguments[2],
                        arguments[3]
                    );
                    let remainingOpeningBracketsCount = validateIntegerWithMin(arguments[2], 0);
                    let remainingClosingBracketsCount = validateIntegerWithMin(arguments[3], 0);
                    const newManipulation = new StringManipulation(string);
                    const newPart = new StringPart(string);
                    const openingBracketCount = newManipulation.containsSearchCount("[");
                    const closingBracketCount = newManipulation.containsSearchCount("]");
                    const isEqualsBracketsCounts = openingBracketCount === closingBracketCount;
                    const firstOpeningBracketIndex = string.indexOf("[");
                    const firstClosingBracketIndex = string.indexOf("]");
                    const lastOpeningBracketIndex = string.lastIndexOf("[");
                    const lastClosingBracketIndex = string.lastIndexOf("]");
                    const isBracketsCount1 = bracketsCount === 1;
                    const isOneSquareBrackets = squareBrackets.isOneSquareBrackets(string);
                    const isBracketsCount1AndOneSquareBrackets = isBracketsCount1 && isOneSquareBrackets;
                    const isFirstBrackets = squareBrackets.isFirstSquareBrackets(string);
                    const oneNestingSquareBracketsIndexes = squareBrackets.getOneNestingSquareBracketsIndexes(string);
                    let isValid =
                        !isBracketsCountUndefined &&
                        bracketsCount > 1 &&
                        isEqualsBracketsCounts &&
                        firstOpeningBracketIndex < firstClosingBracketIndex &&
                        remainingOpeningBracketsCount <= openingBracketCount &&
                        remainingClosingBracketsCount <= closingBracketCount &&
                        openingBracketCount > 1 &&
                        firstOpeningBracketIndex < lastOpeningBracketIndex &&
                        firstClosingBracketIndex < lastClosingBracketIndex &&
                        lastOpeningBracketIndex < lastClosingBracketIndex;
                    let value = isBracketsCount1AndOneSquareBrackets;
                    if (!isBracketsCountUndefined) {
                        remainingOpeningBracketsCount = createIfAndElseAndReturns(
                            isValid && arguments[2] === undefined,
                            openingBracketCount,
                            remainingOpeningBracketsCount
                        );
                        remainingClosingBracketsCount = createIfAndElseAndReturns(
                            isValid && arguments[3] === undefined,
                            closingBracketCount,
                            remainingClosingBracketsCount
                        );
                    }
                    if (isValid || self.#isSearchStarted) {
                        const openingBracketCountOfBeforeOfFirstClosingBracket =
                            newManipulation.getContainsFirstSearchCountFromBeforeOfFirstSecondSearch("[", "]");
                        if (openingBracketCountOfBeforeOfFirstClosingBracket > 0) {
                            if (self.#searchedInvalidBracketsCount < bracketsCount) {
                                const newString = newPart.subStringWithFromIndex(
                                    firstOpeningBracketIndex + 1
                                );
                                self.#isSearchStarted = true;
                                self.#searchedInvalidBracketsCount++;
                                value = new self(
                                    newString,
                                    bracketsCount,
                                    remainingOpeningBracketsCount - 1,
                                    remainingClosingBracketsCount,
                                );
                            } else {
                                if (remainingClosingBracketsCount > 0) {
                                    const newString = newPart.subStringWithFromIndex(
                                        firstClosingBracketIndex + 1
                                    );
                                    self.#searchedInvalidBracketsCount--;
                                    value = new self(
                                        newString,
                                        bracketsCount,
                                        remainingOpeningBracketsCount,
                                        remainingClosingBracketsCount - 1
                                    );
                                } else {
                                    value = self.#searchedInvalidBracketsCount === 0;
                                }
                            }
                        } else {
                            if (remainingClosingBracketsCount > 0) {
                                const newString = newPart.subStringWithFromIndex(firstClosingBracketIndex + 1);
                                self.#searchedInvalidBracketsCount--;
                                value = new self(
                                    newString,
                                    bracketsCount,
                                    remainingOpeningBracketsCount,
                                    remainingClosingBracketsCount - 1
                                );
                            } else {
                                value = self.#searchedInvalidBracketsCount === 0;
                            }
                        }
                    }
                    return value;
                }
            }
            return new self(string, bracketsCount).value;
        }*/

        static getStringInOneSquareBrackets(string) {
            string = getValidString(string);
            const isSquareBrackets = this.isOneSquareBrackets(string);
            const openingSquareBracketIndex = string.indexOf("[");
            const closingSquareBracketIndex = string.indexOf("]");
            let value = "";
            if (isSquareBrackets) {
                value = StringPart.subString(
                    string,
                    openingSquareBracketIndex + 1,
                    closingSquareBracketIndex - 1
                );
            }
            return value;
        }

        static isContainsSearchInOneSquareBrackets(string, search) {
            string = getValidString(string);
            const stringInSquareBrackets = this.getStringInOneSquareBrackets(string);
            return StringManipulation.isContainsSearch(
                stringInSquareBrackets,
                search
            );
        }

        constructor(value) {
            super(value);
            this.value = value;
            squareBrackets.value = this.value;
        }

        isOneSquareBrackets = () => squareBrackets.isOneSquareBrackets(squareBrackets.value);
        //isSquareBrackets = (bracketsCount) => squareBrackets.isSquareBrackets(squareBrackets.value, bracketsCount);
    }

    static change = class change {
        static letter = class letter {
            static lowercase = class lowercase {
                static toUppercaseWithAToZ(lowercaseLetter) {
                    return getValidString(lowercaseLetter).toUpperCase();
                }

                static firstToUppercaseWithAToZ(string) {
                    const firstLetter = getValidString(string)[0];
                    const firstPart = StringPart.subStringWithFromIndex(string, 1);
                    return firstLetter.toUpperCase() + firstPart;
                }

                static stringsArrayElementsFirstToUppercaseWithAToZ(stringsArray) {
                    let value = [];
                    for (const element of getValidArray(stringsArray)) {
                        const validElement = getValidString(element);
                        value += this.firstToUppercaseWithAToZ(validElement);
                    }
                    return value;
                }

                static searchThAfterToUppercaseWithAToZ(string, search, searchTh) {
                    const stringPart = new StringPart(string);
                    const searchThIndex = StringManipulation.getSearchThIndex(string, search, searchTh);
                    const afterSearchThIndex = searchThIndex + getValidString(search).length;
                    const beforeLetterPart = stringPart.subStringWithToIndex(searchThIndex);
                    const searchThFirstLetter = getValidString(string)[afterSearchThIndex];
                    const changedLetter = searchThFirstLetter.toUpperCase();
                    const afterLetterPart = stringPart.subStringWithFromIndex(afterSearchThIndex + 1);
                    return beforeLetterPart + changedLetter + afterLetterPart;
                }

                static searchThAfterToUppercaseWithAToZAndRemoveSearch(string, search, searchTh) {
                    const changedLetterInString = this.searchThAfterToUppercaseWithAToZ(string, search, searchTh);
                    return StringManipulation.removeSearchTh(changedLetterInString, search, searchTh);
                }
            };

            static uppercase = class uppercase {
                static toLowercaseWithAToZ(uppercaseLetter) {
                    return getValidString(uppercaseLetter).toLowerCase();
                }

                static firstToLowercaseWithAToZ(string) {
                    const stringPart = new StringPart(string);
                    const firstLetter = getValidString(string)[0];
                    const afterFirstLetterPart = stringPart.subStringWithFromIndex(1);
                    return firstLetter.toLowerCase() + afterFirstLetterPart;
                }

                static searchThAfterToLowercaseWithAToZ(string, search, searchTh) {
                    const stringPart = new StringPart(string);
                    const searchThIndex = StringManipulation.getSearchThIndex(string, search, searchTh);
                    const afterSearchThIndex = searchThIndex + getValidString(search).length;
                    const beforeLetterPart = stringPart.subStringWithToIndex(searchThIndex);
                    const searchThFirstLetter = getValidString(string)[afterSearchThIndex];
                    const changedLetter = searchThFirstLetter.toLowerCase();
                    const afterLetterPart = stringPart.subStringWithFromIndex(afterSearchThIndex + 1);
                    return beforeLetterPart + changedLetter + afterLetterPart;
                }

                static thToLowercaseWithAToZ(string, capitalLetterTh) {
                    const stringPart = new StringPart(string);
                    const capitalLetterThIndex = getStringCapitalLetterThIndex(string, capitalLetterTh);
                    const beforeLetterThIndex = capitalLetterThIndex - 1;
                    const afterLetterThIndex = capitalLetterThIndex + 1;
                    const beforeLetterPart = stringPart.subStringWithToIndex(beforeLetterThIndex);
                    const capitalLetter = getValidString(string)[capitalLetterThIndex];
                    const changedLetter = capitalLetter.toLowerCase();
                    const afterLetterPart = stringPart.subStringWithFromIndex(afterLetterThIndex);
                    return beforeLetterPart + changedLetter + afterLetterPart;
                }

                static searchThAfterToLowercaseWithAToZAndRemoveSearch(string, search, searchTh) {
                    const changedLetter = this.searchThAfterToLowercaseWithAToZ(string, search, searchTh);
                    return StringManipulation.removeSearchTh(changedLetter, search, searchTh);
                }
            };

            static s = class s {
                static lowercase = class lowercase {
                    static toUppercaseWithAToZ(lowercaseLetters) {
                        return getValidString(lowercaseLetters).toUpperCase();
                    }

                    static allSearchAfterToUppercaseWithAToZAndRemoveAllSearchs(string, search) {
                        const searchsCount = StringManipulation.containsSearchCount(string, search);
                        let value = string;
                        for (let i = 1; i <= searchsCount; i++) {
                            value = letter.lowercase.searchThAfterToUppercaseWithAToZAndRemoveSearch(value, search, 1);
                        }
                        return value;
                    }

                    static allSearchAfterToUppercaseWithAToZ(string, search) {
                        const searchsCount = StringManipulation.containsSearchCount(string, search);
                        let value = string;
                        for (let i = 1; i <= searchsCount; i++) {
                            value = letter.lowercase.searchThAfterToUppercaseWithAToZ(value, search, i);
                        }
                        return value;
                    }

                    static stringsArrayElementsFirstToUppercaseWithAToZAndStringifyElements(stringsArray) {
                        const changedArrayElementsFirstLetter = letter.lowercase.stringsArrayElementsFirstToUppercaseWithAToZ(stringsArray);
                        return stringifyArrayElements(changedArrayElementsFirstLetter);
                    }

                    static stringsFirstToUppercaseWithAToZ(...strings) {
                        return letter.lowercase.stringsArrayElementsFirstToUppercaseWithAToZ(strings);
                    }

                    static stringsFirstToUppercaseWithAToZAndStringifyElements(...strings) {
                        return this.stringsArrayElementsFirstToUppercaseWithAToZAndStringifyElements(strings);
                    }
                };

                static uppercase = class uppercase {
                    static toLowercaseWithAToZ(uppercaseLetters) {
                        return getValidString(uppercaseLetters).toLowerCase();
                    }

                    static allSearchAfterToLowercaseWithAToZAndRemoveAllSearchs(string, search) {
                        const containsSearchsCount = StringManipulation.containsSearchCount(string, search);
                        let value = string;
                        for (let i = 1; i <= containsSearchsCount; i++) {
                            value = letter.uppercase.searchThAfterToLowercaseWithAToZAndRemoveSearch(value, search, 1);
                        }
                        return value;
                    }

                    static allSearchAfterToLowercaseWithAToZ(string, search) {
                        const containsSearchsCount = StringManipulation.containsSearchCount(string, search);
                        let value = string;
                        for (let i = 1; i <= containsSearchsCount; i++) {
                            value = letter.uppercase.searchThAfterToLowercaseWithAToZ(value, search, i);
                        }
                        return value;
                    }

                    static stringArrayElementsFirstToLowercaseWithAToZ(stringsArray) {
                        let value = [];
                        for (const element of getValidArray(stringsArray)) {
                            const validElement = getValidString(element);
                            value += letter.uppercase.firstToLowercaseWithAToZ(validElement);
                        }
                        return value;
                    }

                    static stringArrayElementsFirstToLowercaseWithAToZAndStringifyElements(stringArray) {
                        const changedElementsFirstLetter = this.stringArrayElementsFirstToLowercaseWithAToZ(stringArray);
                        return stringifyArrayElements(changedElementsFirstLetter);
                    }

                    static stringsFirstToLowercaseWithAToZ(...strings) {
                        return this.stringArrayElementsFirstToLowercaseWithAToZ(strings);
                    }

                    static stringsFirstToLowercaseWithAToZAndStringifyElements(...strings) {
                        return this.stringArrayElementsFirstToLowercaseWithAToZAndStringifyElements(strings);
                    }
                };
            };

            lowercase = letter.lowercase;
            uppercase = letter.uppercase;
            s = letter.s;
        };

        letter = change.letter;
    };

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }

    constructor(value) {
        this.value = getValidString(value);
    }

    isValidSearchThParameters = (search, searchTh) => StringManipulation.isValidSearchThParameters(this.value, search, searchTh);
    isElementsMatchSomeOfCharsInText = text => StringManipulation.isElementsMatchSomeOfCharsInText(this.value, text);
    isDigits = () => StringManipulation.isDigits(this.value);
    containsSearchCount = search => StringManipulation.containsSearchCount(this.value, search);
    isNotJustSpaces = () => StringManipulation.isNotJustSpaces(this.value);
    containsSearchsArrayElementsCount = searchsArray => StringManipulation.containsSearchsArrayElementsCount(this.value, searchsArray);
    containsSearchsCount = (...searchs) => StringManipulation.containsSearchsCount(this.value, searchs);
    containsConsecutiveMatchingSearchsCount = (search, firstSearchIndex) => StringManipulation.containsConsecutiveMatchingSearchsCount(this.value, search, firstSearchIndex);
    containsConsecutiveMatchingFirstSearchsCount = (search) => StringManipulation.containsConsecutiveMatchingFirstSearchsCount(this.value, search);
    containsConsecutiveMatchingFirstSearchsCountFromStringFirst = (search) => StringManipulation.containsConsecutiveMatchingFirstSearchsCountFromStringFirst(this.value, search);
    containsConsecutiveReverseMatchingSearchsCount = (search, lastSearchIndex) => StringManipulation.containsConsecutiveReverseMatchingSearchsCount(this.value, search, lastSearchIndex);
    isContainsSearch = (search) => StringManipulation.isContainsSearch(this.value, search);
    isContainsSearchs = (...searchs) => StringManipulation.isContainsSearchs(this.value, searchs);
    isContainsSearchCount = (count, search) => StringManipulation.isContainsSearchCount(this.value, count, search);
    isContainsSearchsCount = (count, ...searchs) => StringManipulation.isContainsSearchsCount(this.value, count, searchs);
    isContainsOneSearch = (search) => StringManipulation.isContainsOneSearch(this.value, search);
    convertElementsToArray = () => StringManipulation.convertElementsToArray(this.value);
    reverse = () => StringManipulation.reverse(this.value);
    removeSearch = (search) => StringManipulation.removeSearch(this.value, search);
    getSearchThIndex = (search, searchTh) => StringManipulation.getSearchThIndex(this.value, search, searchTh);
    getSearchThOfIndex = (search, index) => StringManipulation.getSearchThOfIndex(this.value, search, index);
    removeSubString = (fromIndex, toIndex) => StringManipulation.removeSubString(this.value, fromIndex, toIndex);
    removeSubStringWithFromIndex = fromIndex => StringManipulation.removeSubStringWithFromIndex(this.value, fromIndex);
    removeSubStringWithToIndex = toIndex => StringManipulation.removeSubStringWithToIndex(this.value, toIndex);
    removeSubStringWithLength = (fromIndex, length) => StringManipulation.removeSubStringWithLength(this.value, fromIndex, length);
    removeSearchTh = (search) => StringManipulation.removeSearch(this.value, search);
    removeAllSearchs = (search) => StringManipulation.removeAllSearchs(this.value, search);
    removeConsecutiveSearchs = (search, fromSearchTh, toSearchTh) => StringManipulation.removeConsecutiveSearchs(this.value, search, fromSearchTh, toSearchTh);
    removeConsecutiveMatchingSearchs = (search, fromSearchTh) => StringManipulation.removeConsecutiveMatchingSearchs(this.value, search, fromSearchTh);
    removeConsecutiveReverseMatchingSearchs = (search, fromSearchTh) => StringManipulation.removeConsecutiveReverseMatchingSearchs(this.value, search, fromSearchTh)
    removeConsecutiveMatchingFirstSearchs = (search) => StringManipulation.removeConsecutiveMatchingFirstSearchs(this.value, search);
    removeConsecutiveMatchingFirstSearchsFromStringFirst = (search) => StringManipulation.removeConsecutiveMatchingFirstSearchsFromStringFirst(this.value, search);
    removeConsecutiveMatchingSearchsPart = (search, partTh) => StringManipulation.removeConsecutiveMatchingSearchsPart(this.value, search, partTh);
    removeCharWithIndex = (index) => StringManipulation.removeCharWithIndex(this.value, index);
    replaceString = (fromIndex, toIndex, replace) => StringManipulation.replaceString(this.value, fromIndex, toIndex, replace);
    placeStringFromIndex = (index, place) => StringManipulation.placeStringFromIndex(this.value, index, place);
    getContainsFirstSearchCountFromBeforeOfFirstSecondSearch = (firstSearch, secondSearch) => StringManipulation.getContainsFirstSearchCountFromBeforeOfFirstSecondSearch(this.value, firstSearch, secondSearch);
    squareBrackets = StringManipulation.squareBrackets;
    change = StringManipulation.change;
}

const changedLettersWithSeparatedHyphens = "|-b-v-s-|".toUpperCase();
const changedLetters = " | b v s | ".toUpperCase();
//const search1Square1Brackets = "[ [[[[[[hhhhhhh[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]hhs]f[]-Łłlk], [isk] lol [gr]][b]]]cr[]k[sv]b[4]],{}[k[f[l], [h], d[ag]]b, ,5b[[t]t]bs]vr4[666666666] b c 5 6 [    1    b{4j}], , jjbijgvzfjr[]hvsdefuuztzzhguzhgimjzujo,-]     lj[oooooooooooooooooooooooooooop]p[]";
//const newSearch1Manipulation = new StringManipulation(search1Square1Brackets);
//const newSearch1ManipSqBrackets = newSearch1Manipulation.squareBrackets;
//const isNewSearch1ManipulationSquareBrackets = newSearch1ManipSqBrackets.isSquareBrackets(search1Square1Brackets, 7);
console.log(changedLettersWithSeparatedHyphens);
console.log(changedLetters);
//console.log(isNewSearch1ManipulationSquareBrackets);
