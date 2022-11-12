import {createIfAndElseAndReturns, StringPart} from "./stringPart";
import {StringManipulation} from "./stringManipulation";
import {
    getOutsideOfConsecutiveMatchingSearchsPartsFromString,
    getSearchThIndexOfString,
    getStringIndexOf,
    getValidSearchTh,
    getValidString, isContainsOneSearchInString,
    isContainsSearchInString, isContainsSearchsInString, isEmptyString, removeAllSearchsInString
} from "./script";

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
        return isContainsColon && isNotJustSpacesString(beforeOfColonPart);
    }

    static isArgumentColonAndValue(string, argumentTh) {
        const isContainsColon = isContainsSearchInString(string, ":");
        const afterOfColonPart = this.getArgumentAfterColonPart(string, argumentTh);
        return isContainsColon && isNotJustSpacesString(afterOfColonPart);
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

function isNotJustSpacesString(string) {
    string = getValidString(string);
    const {length} = string;
    const stringManipulation = new StringManipulation(string);
    const spacesCount = stringManipulation.containsSearchsCount(" ");
    const isNotJustSpaces = length > spacesCount;
    return !isEmptyString(string) && isNotJustSpaces;
}
