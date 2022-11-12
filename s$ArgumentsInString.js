import {
    createIfAndElseAndReturns,
    getValidInteger,
    getValidNumber,
    getValidString,
    isValidNumber,
    StringPart
} from "./stringPart";
import {StringManipulation} from "./stringManipulation";
import {
    containsConsecutiveMatchingSearchsCountInString,
    createArrayFromObjects,
    getOutsideOfConsecutiveMatchingSearchsPartsFromString,
    getSearchThIndexOfString,
    getStringIndexOf,
    getValidArray,
    getValidSearchTh,
    isContainsSearchArrayElementsInString,
    isContainsSearchInString,
    isEmptyString,
    isEmptyStrings
} from "./script";

export function validateMinAndMax(min, max) {
    min = getValidNumber(min);
    max = getValidNumber(max);
    if (max < min) {
        const i = min;
        min = max;
        max = i;
    }
    return [min, max];
}

export function isValidSearchThInStringParameters(string, search, searchTh) {
    const stringManipulation = new StringManipulation(string);
    const containsSearchCount = stringManipulation.containsSearchsCount(search);
    const isValidParameters = typeof string === "string" && typeof search === "string" && typeof searchTh === "number";
    return isValidParameters && (!isEmptyString(string) || isEmptyStrings(string, search) || containsSearchCount >= getValidSearchTh(searchTh));
}

export function removeSearchThInString(string, search, searchTh) {
    const isValid = isValidSearchThInStringParameters(string, search, searchTh);
    string = getValidString(string);
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    const fromIndex = getSearchThIndexOfString(string, search, searchTh);
    const valueIfValid = StringManipulation.removeSubStringWithLength(string, fromIndex, search.length);
    return createIfAndElseAndReturns(isValid, valueIfValid, string);
}

function removeAllSearchsInString(string, search) {
    string = getValidString(string);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let value = string;
    for (let i = 0; i < containsSearchsCount; i++) {
        value = StringManipulation.removeSearchInString(value, search);
    }
    return value;
}

function removeConsecutiveSearchsInString(string, search, fromSearchTh, toSearchTh) {
    string = getValidString(string);
    fromSearchTh = getValidSearchTh(fromSearchTh);
    toSearchTh = getValidSearchTh(toSearchTh);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const validFromAndToSearchTh = validateMinAndMax(fromSearchTh, toSearchTh);
    fromSearchTh = validFromAndToSearchTh[0];
    toSearchTh = validFromAndToSearchTh[1];
    let value = string;
    const max = Math.min(toSearchTh - (fromSearchTh - 1), containsSearchsCount);
    for (let i = 0; i < max; i++) {
        value = removeSearchThInString(value, search, fromSearchTh);
    }
    return value;
}

export function removeConsecutiveMatchingSearchsInString(string, search, fromSearchTh) {
    string = getValidString(string);
    const fromSearchThIndex = getSearchThIndexOfString(string, search, fromSearchTh);
    const containsConsecutiveMatchingSearchsCount = containsConsecutiveMatchingSearchsCountInString(string, search, fromSearchThIndex);
    const toSearchTh = fromSearchTh + containsConsecutiveMatchingSearchsCount - 1;
    return removeConsecutiveSearchsInString(string, search, fromSearchTh, toSearchTh);
}

function removeConsecutiveMatchingFirstSearchsInString(string, search) {
    return removeConsecutiveMatchingSearchsInString(string, search, 1);
}

function getConsecutiveMatchingSearchsPartThIndexInString(string, search, partTh) {
    const isValidParameters = isValidSearchThInStringParameters(string, search, partTh);
    let stringManipulation = new StringManipulation(string);
    let containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let isContainsSearch = containsSearchsCount > 0;
    search = getValidString(search);
    partTh = getValidSearchTh(partTh);
    let value = createIfAndElseAndReturns(isValidParameters, -1, 0);
    let counter = 0;
    let i = getStringIndexOf(string, search);
    if (isContainsSearch && partTh > 0) {
        let containsConsecutiveMatchingFirstSearchsCount = containsConsecutiveMatchingFirstSearchsCountInString(string, search);
        let disassembledString = getValidString(string);
        stringManipulation = new StringManipulation(disassembledString);
        let searchIndex = getStringIndexOf(disassembledString, search);
        let removedBetweenFirstAndSecondPart = stringManipulation.removeSubStringWithToIndex(searchIndex);
        while (counter < partTh) {
            counter++;
            if (counter < partTh) {
                let disassembledStringSearchIndex = getStringIndexOf(disassembledString, search);
                let isContainsMoreThan1Search = disassembledStringSearchIndex > 0;
                disassembledString = createIfAndElseAndReturns(isContainsMoreThan1Search, removedBetweenFirstAndSecondPart, disassembledString);
                disassembledStringSearchIndex = getStringIndexOf(disassembledString, search);
                isContainsMoreThan1Search = disassembledStringSearchIndex > 0;
                i += createIfAndElseAndReturns(isContainsMoreThan1Search, 0, containsConsecutiveMatchingFirstSearchsCount - 1);
                const newDisassembledStringIfContains1Search = removeConsecutiveMatchingFirstSearchsInString(disassembledString, search);
                disassembledString = createIfAndElseAndReturns(isContainsMoreThan1Search, disassembledString, newDisassembledStringIfContains1Search);
                if (isEmptyString(disassembledString)) {
                    i = -1;
                    break;
                } else {
                    stringManipulation = new StringManipulation(disassembledString);
                    disassembledStringSearchIndex = getStringIndexOf(disassembledString, search);
                    removedBetweenFirstAndSecondPart = stringManipulation.removeSubStringWithToIndex(disassembledStringSearchIndex);
                    stringManipulation = new StringManipulation(disassembledString);
                    containsConsecutiveMatchingFirstSearchsCount = containsConsecutiveMatchingFirstSearchsCountInString(disassembledString, search);
                    containsSearchsCount = stringManipulation.containsSearchsCount(search);
                    isContainsSearch = containsSearchsCount > 0;
                    i += createIfAndElseAndReturns(isContainsSearch, getStringIndexOf(disassembledString, search) + 1, 0);
                }
            }
        }
        value = i;
    }
    return value;
}

export function getConsecutiveMatchingSearchsPartsCountInString(string, search) {
    string = getValidString(string);
    search = getValidString(search);
    let stringManipulation = new StringManipulation(string);
    let containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let isContainsSearch = containsSearchsCount > 0;
    let value = 0;
    let disassembledString = string;
    while (isContainsSearch) {
        value++;
        disassembledString = removeConsecutiveMatchingFirstSearchsInString(disassembledString, search);
        stringManipulation = new StringManipulation(disassembledString);
        containsSearchsCount = stringManipulation.containsSearchsCount(search);
        isContainsSearch = containsSearchsCount > 0;
    }
    return value;
}

export function getConsecutiveMatchingSearchsPartsIndexesInString(string, search) {
    const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
    let value = [];
    for (let i = 1; i <= partsCount; i++) {
        const partThIndex = getConsecutiveMatchingSearchsPartThIndexInString(string, search, i);
        value.push(partThIndex);
    }
    return value;
}

function containsConsecutiveMatchingFirstSearchsCountInString(string, search) {
    return containsConsecutiveMatchingSearchsCountInString(string, search, getStringIndexOf(string, search));
}

function isContainsSearchsInString(string, ...searchs) {
    return isContainsSearchArrayElementsInString(string, createArrayFromObjects(searchs));
}

function isContainsOneSearchInString(string, search) {
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    return containsSearchsCount === 1;
}

/**
 * Returns - ...;
 * <pre>
 *     S$ArgumentsInString.constructor(string) string format => {
 *         one argument: {
 *             the string first part can only contain characters other than ":,";
 *             the string second part can only be ":";
 *             the string third part can only contain characters other than ":,";
 *         };
 *         arguments separator: ",";
 *         string: arguments;
 *     };
 * </pre>
 */
export class S$ArgumentsInString {
    static getArgument(string, argumentTh) {
        string = getValidString(string);
        argumentTh = getValidSearchTh(argumentTh);
        const {length} = string;
        const stringPart = new StringPart(string);
        const containsCommasCount = stringPart.containsSearchsCount(",");
        const isContainsComma = containsCommasCount > 0;
        const firstCommaIndex = getStringIndexOf(string, ",");
        const isValidArgumentTh = argumentTh > 1 && argumentTh <= containsCommasCount + 1;
        const isValidNextArgumentTh = argumentTh > 1 && argumentTh + 1 <= containsCommasCount + 1;
        const isContainsCommaToValue = argumentTh === 1 && isContainsComma;
        const ifContainsCommaToValue = stringPart.subStringWithToIndex(firstCommaIndex - 1);
        const ifNotContainsCommaToValue = createIfAndElseAndReturns(argumentTh === 1, string, "");
        let value = createIfAndElseAndReturns(isContainsCommaToValue, ifContainsCommaToValue, ifNotContainsCommaToValue);
        if (isValidArgumentTh) {
            const commaThIndex = getSearchThIndexOfString(string, ",", argumentTh - 1);
            const fromIndex = commaThIndex + 1;
            const nextCommaThIndex = getSearchThIndexOfString(string, ",", argumentTh);
            const toIndex = createIfAndElseAndReturns(isValidNextArgumentTh, nextCommaThIndex - 1, length - 1);
            value = stringPart.subString(fromIndex, toIndex);
        }
        return value;
    }

    static getArguments(string) {
        const stringManipulation = new StringManipulation(string);
        const containsCommasCount = stringManipulation.containsSearchsCount(",");
        let value = [];
        for (let i = 1; i <= containsCommasCount + 1; i++) {
            const argument = this.getArgument(string, i);
            value.push(argument);
        }
        return value;
    }

    static isArgumentValidColonCount(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        return isContainsOneSearchInString(argument, ":");
    }

    static getArgumentBeforeColonPart(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isContainsColon = isContainsSearchInString(string, ":");
        const colonIndex = getStringIndexOf(argument, ":");
        const beforeOfColonPart = StringPart.subStringWithToIndex(argument, colonIndex - 1);
        return createIfAndElseAndReturns(isContainsColon, beforeOfColonPart, "");
    }

    static getArgumentAfterColonPart(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isContainsColon = isContainsSearchInString(string, ":");
        const colonIndex = getStringIndexOf(argument, ":");
        const beforeOfColonPart = StringPart.subStringWithToIndex(argument, colonIndex + 1);
        return createIfAndElseAndReturns(isContainsColon, beforeOfColonPart, "");
    }

    static isArgumentNameAndColon(string, argumentTh) {
        const isContainsColon = isContainsSearchInString(string, ":");
        const beforeOfColonPart = this.getArgumentBeforeColonPart(string, argumentTh);
        return isContainsColon && StringManipulation.isNotJustSpacesString(beforeOfColonPart);
    }

    static isArgumentColonAndValue(string, argumentTh) {
        const isContainsColon = isContainsSearchInString(string, ":");
        const afterOfColonPart = this.getArgumentAfterColonPart(string, argumentTh);
        return isContainsColon && StringManipulation.isNotJustSpacesString(afterOfColonPart);
    }

    static isArgumentValidNameAndColon(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidColonCount = this.isArgumentValidColonCount(string, argumentTh);
        const colonIndex = getStringIndexOf(argument, ":");
        const beforeOfColonPart = StringPart.subStringWithToIndex(argument, colonIndex - 1);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(beforeOfColonPart, " ");
        return isValidColonCount && outsideParts.length === 1;
    }

    static isArgumentValidColonAndValue(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidColonCount = this.isArgumentValidColonCount(string, argumentTh);
        const colonIndex = getStringIndexOf(argument, ":");
        const afterOfColonPart = StringPart.subStringWithFromIndex(argument, colonIndex + 1);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(afterOfColonPart, " ");
        return isValidColonCount && outsideParts.length === 1;
    }

    static getArgumentNameIfValidColonCount(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidColonCount = this.isArgumentValidColonCount(string, argumentTh);
        const colonIndex = getStringIndexOf(argument, ":");
        const valueIfValidColonCount = StringPart.subStringWithToIndex(argument, colonIndex - 1);
        return createIfAndElseAndReturns(isValidColonCount, valueIfValidColonCount, "");
    }

    static getArgumentValueIfValidColonCount(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidColonCount = this.isArgumentValidColonCount(string, argumentTh);
        const colonIndex = getStringIndexOf(argument, ":");
        const valueIfValidColonCount = StringPart.subStringWithFromIndex(argument, colonIndex + 1);
        return createIfAndElseAndReturns(isValidColonCount, valueIfValidColonCount, "");
    }

    static getArgumentValidNameIfValidColonCount(string, argumentTh) {
        const name = this.getArgumentNameIfValidColonCount(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(name, " ");
        const isOneOutsidePartsCount = outsideParts.length === 1;
        return createIfAndElseAndReturns(isOneOutsidePartsCount, removeAllSearchsInString(name, " "), name);
    }

    static getArgumentValidValueIfValidColonCount(string, argumentTh) {
        const value = this.getArgumentValueIfValidColonCount(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(value, " ");
        const isOneOutsidePartsCount = outsideParts.length === 1;
        return createIfAndElseAndReturns(isOneOutsidePartsCount, removeAllSearchsInString(value, " "), value);
    }

    static isArgument2OutsideParts(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
        return outsideParts.length === 2;
    }

    static isArgument2ValidOutsideParts(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
        const isValidOutsidePartsCount = outsideParts.length === 2;
        let value = false;
        if (isValidOutsidePartsCount) {
            const isValidFirstPart = !isContainsSearchsInString(outsideParts[0], ":");
            const isValidLastPart = !isContainsSearchsInString(outsideParts[1], ":");
            value = isValidFirstPart && isValidLastPart;
        }
        return value;
    }

    static getArgument2OutsidePartsIfValidOutsidePartsCount(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
        const isValidOutsidePartsCount = outsideParts.length === 2;
        let value = ["", ""];
        if (isValidOutsidePartsCount) {
            value = [outsideParts[0], outsideParts[1]];
        }
        return value;
    }

    static getArgument2ValidOutsidePartsIfValidOutsidePartsCount(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
        const isValidOutsideParts = this.isArgument2ValidOutsideParts(string, argumentTh);
        let value = ["", ""];
        if (isValidOutsideParts) {
            value = [outsideParts[0], outsideParts[1]];
        }
        return value;
    }

    static getArgumentName(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidNameAndColon = this.isArgumentValidNameAndColon(string, argumentTh);
        const isValidOutsideParts = this.isArgument2ValidOutsideParts(string, argumentTh);
        const validName = this.getArgumentValidName(string, argumentTh);
        const beforeColonPart = this.getArgumentBeforeColonPart(string, argumentTh);
        const isValidNameAndColonOrOutsideParts = isValidNameAndColon || isValidOutsideParts;
        const isContainsOneColon = isContainsOneSearchInString(argument, ":");
        const ifValidNameAndColonOrOutsideParts = createIfAndElseAndReturns(isContainsOneColon, beforeColonPart, argument);
        return createIfAndElseAndReturns(isValidNameAndColonOrOutsideParts, validName, ifValidNameAndColonOrOutsideParts);
    }

    static getArgumentValue(string, argumentTh) {
        const argument = this.getArgument(string, argumentTh);
        const isValidColonAndValue = this.isArgumentValidColonAndValue(string, argumentTh);
        const isValidOutsideParts = this.isArgument2ValidOutsideParts(string, argumentTh);
        const validValue = this.getArgumentValidName(string, argumentTh);
        const afterColonPart = this.getArgumentBeforeColonPart(string, argumentTh);
        const isValidColonAndValueOrOutsideParts = isValidColonAndValue || isValidOutsideParts;
        const isContainsOneColon = isContainsOneSearchInString(argument, ":");
        const ifValidColonAndValueOrOutsideParts = createIfAndElseAndReturns(isContainsOneColon, afterColonPart, argument);
        return createIfAndElseAndReturns(isValidColonAndValueOrOutsideParts, validValue, ifValidColonAndValueOrOutsideParts);
    }

    static getArgumentValidName(string, argumentTh) {
        const isValidNameAndColon = this.isArgumentValidNameAndColon(string, argumentTh);
        const isValidOutsideParts = this.isArgument2ValidOutsideParts(string, argumentTh);
        const validNameIfValidColonCount = this.getArgumentValidNameIfValidColonCount(string, argumentTh);
        const valid2Parts = this.getArgument2ValidOutsidePartsIfValidOutsidePartsCount(string, argumentTh);
        const valueIfNotContainsColon = createIfAndElseAndReturns(isValidOutsideParts, valid2Parts[0], "");
        return createIfAndElseAndReturns(isValidNameAndColon, validNameIfValidColonCount, valueIfNotContainsColon);
    }

    static getArgumentValidValue(string, argumentTh) {
        const isValidColonAndValue = this.isArgumentValidColonAndValue(string, argumentTh);
        const isValidOutsideParts = this.isArgument2ValidOutsideParts(string, argumentTh);
        const validValueIfValidColonCount = this.getArgumentValidValueIfValidColonCount(string, argumentTh);
        const valid2Parts = this.getArgument2ValidOutsidePartsIfValidOutsidePartsCount(string, argumentTh);
        const valueIfNotContainsColon = createIfAndElseAndReturns(isValidOutsideParts, valid2Parts[1], "");
        return createIfAndElseAndReturns(isValidColonAndValue, validValueIfValidColonCount, valueIfNotContainsColon);
    }

    constructor(string) {
        this.string = getValidString(string);
    }

    getArgument = argumentTh => S$ArgumentsInString.getArgument(this.string, argumentTh);
    getArguments = () => S$ArgumentsInString.getArguments(this.string);
    isArgumentValidColonCount = argumentTh => S$ArgumentsInString.isArgumentValidColonCount(this.string, argumentTh);
    getArgumentBeforeColonPart = argumentTh => S$ArgumentsInString.getArgumentBeforeColonPart(this.string, argumentTh);
    getArgumentAfterColonPart = argumentTh => S$ArgumentsInString.getArgumentAfterColonPart(this.string, argumentTh);
    isArgumentNameAndColon = argumentTh => S$ArgumentsInString.isArgumentNameAndColon(this.string, argumentTh);
    isArgumentColonAndValue = argumentTh => S$ArgumentsInString.isArgumentColonAndValue(this.string, argumentTh);
    isArgumentValidNameAndColon = argumentTh => S$ArgumentsInString.isArgumentValidNameAndColon(this.string, argumentTh);
    isArgumentValidColonAndValue = argumentTh => S$ArgumentsInString.isArgumentValidColonAndValue(this.string, argumentTh);
    getArgumentNameIfValidColonCount = argumentTh => S$ArgumentsInString.getArgumentNameIfValidColonCount(this.string, argumentTh);
    getArgumentValueIfValidColonCount = argumentTh => S$ArgumentsInString.getArgumentValueIfValidColonCount(this.string, argumentTh);
    getArgumentValidNameIfValidColonCount = argumentTh => S$ArgumentsInString.getArgumentValidNameIfValidColonCount(this.string, argumentTh);
    getArgumentValidValueIfValidColonCount = argumentTh => S$ArgumentsInString.getArgumentValidValueIfValidColonCount(this.string, argumentTh);
    isArgument2OutsideParts = argumentTh => S$ArgumentsInString.isArgument2OutsideParts(this.string, argumentTh);
    isArgument2ValidOutsideParts = argumentTh => S$ArgumentsInString.isArgument2ValidOutsideParts(this.string, argumentTh);
    getArgument2OutsidePartsIfValidOutsidePartsCount = argumentTh => S$ArgumentsInString.getArgument2OutsidePartsIfValidOutsidePartsCount(this.string, argumentTh);
    getArgument2ValidOutsidePartsIfValidOutsidePartsCount = argumentTh => S$ArgumentsInString.getArgument2ValidOutsidePartsIfValidOutsidePartsCount(this.string, argumentTh);
    getArgumentName = argumentTh => S$ArgumentsInString.getArgumentName(this.string, argumentTh);
    getArgumentValue = argumentTh => S$ArgumentsInString.getArgumentValue(this.string, argumentTh);
    getArgumentValidName = argumentTh => S$ArgumentsInString.getArgumentValidName(this.string, argumentTh);
    getArgumentValidValue = argumentTh => S$ArgumentsInString.getArgumentValidValue(this.string, argumentTh);
}
