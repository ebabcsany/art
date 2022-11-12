import {StringManipulation} from "./stringManipulation";
import {getValidInteger, StringPart} from "./stringPart";
import {
    getConsecutiveMatchingSearchsPartsCountInString,
    getConsecutiveMatchingSearchsPartsIndexesInString,
    isValidSearchThInStringParameters,
    removeConsecutiveMatchingSearchsInString,
    removeSearchThInString,
    validateMinAndMax
} from "./s$ArgumentsInString";

// noinspection JSDeprecatedSymbols
window.getMousePos = (element) => ({
    x: event.clientX - element.getBoundingClientRect().left,
    y: event.clientY - element.getBoundingClientRect().top
});
window.canvas = null;
window.context = null;
export const getValidString = value => createIfAndElseAndReturns(typeof value === "string", value, "" + value);
export const getValidArray = value => createIfAndElseAndReturns(Array.isArray(value), value, []);
const isValidNumber = value => !isNaN(value) && value !== Infinity && value !== -Infinity;
export const getValidNumber = value => createIfAndElseAndReturns(isValidNumber(value), value, 0);
export const isValidInteger = value => isValidNumber(value) && isStringInteger(value);
export const isEmptyString = string => getValidString(string).length === 0;
export const getStringIndexOf = (string, search) => getValidString(string).indexOf(getValidString(search));
export const isContainsSearchInString = (string, search) => getStringIndexOf(string, search) > -1;
const random = (scale, min, max) => {
    scale = getValidNumber(scale);
    min = getValidNumber(min);
    max = getValidNumber(max);
    return Math.floor(Math.random() * (max - min + scale) + min);
};

export const DIGITS = '0123456789';
const canvasWidthInputText = "canvas-width";
const canvasHeightInputText = "canvas-height";
export const canvasWidthInput = document.getElementById(canvasWidthInputText);
export const canvasHeightInput = document.getElementById(canvasHeightInputText);
const black = "#000000";
const white = "#ffffff";
const transparent = "rgba(0, 0, 0, 0)";
const half = 1 / 2;
const quarter = half / 2;
export const threeQuarter = half + quarter;
const eighth = quarter / 2;
const threeEighths = quarter + eighth;
const fiveEighths = half + eighth;
const sevenEighths = threeQuarter + eighth;
const sixteenth = eighth / 2;
const lowercaseLettersAToZ = 'abcdefghijklmnopqrstuvwxyz';
const capitalLettersAToZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseAndCapitalLettersAToZ = lowercaseLettersAToZ + capitalLettersAToZ;
const lowercaseLettersAToF = StringPart.subStringWithToIndex(lowercaseLettersAToZ, 5);
const capitalLettersAToF = StringPart.subStringWithToIndex(capitalLettersAToZ, 5);
const digitsAndLowercaseLettersAToF = DIGITS + lowercaseLettersAToF;
const digitsAndCapitalLettersAToF = DIGITS + capitalLettersAToF;
const hexChars = DIGITS + lowercaseLettersAToF + capitalLettersAToF;
const hexStringLength = lowercaseLettersAToF.length;
const numberWithNumberTypePossibleParameters = ["half", "quarter", "three-quarter", "eighth", "three-eighths", "five-eighths", "seven-eighths", "sixteenth", "three-sixteenths", "five-sixteenths", "seven-sixteenths", "nine-sixteenths", "eleven-sixteenths", "thirteen-sixteenths", "fifteen-sixteenths"];
const minToMaxNumberWithNumberTypePossibleParameters = ["quarter to three-quarter", "eighth to seven-eighths", "three-eighths to five-eighths", "sixteenth to fifteen-sixteenths", "three-sixteenths to thirteen-sixteenths", "five-sixteenths to eleven-sixteenths", "seven-sixteenths to nine-sixteenths"];
const numberWithTypePossibleParameters = ["number", "min to max"];
export const tHex = {};
tHex.min = 0;
tHex.max = 255;
tHex.numberWithTypeReferenceNumber = type => createIfAndElseAndReturns(type === numberWithTypePossibleParameters[0], null, createIfAndElseAndReturns(type === numberWithTypePossibleParameters[1], 256, 0));
tHex.isSearchEqualsMinToMaxWithNumberTypePossibleParametersSomeElement = function (search) {
    return isObjectEqualsSomeElementOfArray(getValidString(search), minToMaxNumberWithNumberTypePossibleParameters);
};
tHex.hexColor = hex => StringPart.subStringWithFromIndex(hex, 1);
tHex.subStringHexPart = (hex, fromIndex) => StringPart.subString(tHex.hexColor(hex), fromIndex, fromIndex + 1);
tHex.isHexColor = function (value) {
    const stringManipulation = new StringManipulation(value);
    const length = getValidString(value).length;
    const isHexChars = stringManipulation.isElementsMatchSomeOfCharsInText(hexChars);
    return value !== null && isHexChars && (length === 3 || length === 6 || length === 8);
};
tHex.isHex = value => tHex.isHexColor(tHex.hexColor(value)) && value[0] === "#";
tHex.getValidRgbHex = value => createIfAndElseAndReturns(tHex.isHex(value), value, "#000000");
tHex.getValidRgbaHex = value => createIfAndElseAndReturns(tHex.isHex(value), value, "#00000000");
tHex.isHexColorChar = function (hexColorChar) {
    return hexColorChar !== null && isCharEqualsCharacterOfText(hexColorChar, hexChars) && getValidString(hexColorChar).length === 1;
};
tHex.changeUppercaseHexCharToLowercaseHexChar = function (hexChar) {
    let value = "";
    hexChar = getValidString(hexChar);
    if (tHex.isHexColorChar(hexChar)) {
        if (isCharEqualsCharacterOfText(hexChar, digitsAndCapitalLettersAToF)) {
            hexChar = digitsAndLowercaseLettersAToF[digitsAndCapitalLettersAToF.indexOf(hexChar)];
        }
        value = hexChar;
    }
    return value;
};
tHex.changeUppercaseHexPartToLowercaseHexPart = function (hexPart) {
    hexPart = getValidString(hexPart);
    return tHex.changeUppercaseHexCharToLowercaseHexChar(hexPart[0]) + tHex.changeUppercaseHexCharToLowercaseHexChar(hexPart[1]);
};
tHex.changeUppercaseHexToLowercaseHex = function (hex) {
    let value = "";
    for (let i = 0; i < tHex.hexColor(hex).length; i += 2) {
        value += tHex.changeUppercaseHexPartToLowercaseHexPart(tHex.subStringHexPart(hex, i));
    }
    return "#" + value;
};
tHex.getHexCharIndex = hexChar => digitsAndLowercaseLettersAToF.indexOf(tHex.changeUppercaseHexCharToLowercaseHexChar(hexChar));
tHex.getReverseHexCharIndex = hexChar => (hexStringLength - 1) - tHex.getHexCharIndex(hexChar);
tHex.getQuarterToThreeQuarterInteger = integer => getSevenEighthsInteger(integer) + getSixteenthInteger(integer);
tHex.validateIntegerIfIntegerBetween0And255 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= tHex.min && integer <= tHex.max) {
        value = integer;
    }
    return value;
};
tHex.validateIntegerIfIntegerBetween255And510 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= tHex.max && integer <= 510) {
        value = tHex.validateIntegerIfIntegerBetween0And255(tHex.max - (integer - tHex.max));
    }
    return value;
};
tHex.validateIntegerIfIntegerBetween0And510 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= tHex.min && integer <= 510) {
        if (integer <= tHex.max) {
            value = tHex.validateIntegerIfIntegerBetween0And255(integer);
        } else if (integer >= tHex.max) {
            value = tHex.validateIntegerIfIntegerBetween255And510(integer);
        }
    }
    return value;
};
tHex.validateIntegerIfIntegerGreaterThanOrEquals0 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= tHex.min) {
        let i = integer;
        if (integer > 510) {
            while (i > 510) {
                i -= 510;
            }
        }
        value = tHex.validateIntegerIfIntegerBetween0And510(i);
    }
    return value;
};
tHex.validateInteger = integer => tHex.validateIntegerIfIntegerGreaterThanOrEquals0(getPositiveInteger(integer));
tHex.convertHexPartToInteger = function (hexPart) {
    hexPart = tHex.changeUppercaseHexPartToLowercaseHexPart(hexPart);
    return ((digitsAndLowercaseLettersAToF.indexOf(hexPart[0]) * 16) - 1) + (digitsAndLowercaseLettersAToF.indexOf(hexPart[1]) + 1);
};
tHex.convertHexToRgbaArray = function (hex) {
    let value = [0, 0, 0, 0];
    hex = getValidString(hex);
    if (tHex.isHex(hex) && hex.length === 9) {
        const red = tHex.convertHexPartToInteger(tHex.subStringHexPart(hex, 0));
        const green = tHex.convertHexPartToInteger(tHex.subStringHexPart(hex, 2));
        const blue = tHex.convertHexPartToInteger(tHex.subStringHexPart(hex, 4));
        const alpha = tHex.convertHexPartToInteger(tHex.subStringHexPart(hex, 6));
        value = [red, green, blue, alpha];
    }
    return value;
};
tHex.convertHexToRgbArray = function (hex) {
    let value = [0, 0, 0];
    hex = getValidString(hex);
    if (tHex.isHex(hex) && hex.length === 7) {
        value = tHex.convertHexToRgbaArray(hex + "ff");
        value.pop();
    }
    return value;
};
tHex.convertIntegerToHexPartIfIntegerBetween0And255 = function (integer) {
    let value = "";
    integer = getValidInteger(integer);
    if (integer >= tHex.min && integer <= tHex.max) {
        if ((integer + 1) % 16 === 0) {
            value = digitsAndLowercaseLettersAToF[((integer + 1) / 16) - 1] + "f";
        } else if ((integer + 1) % 16 !== 0) {
            let i = integer + 1;
            let counter = 0;
            while (i % 16 !== 0) {
                i--;
                counter++;
            }
            if (i < 16) {
                value = "0" + digitsAndLowercaseLettersAToF[counter - 1];
            } else if (i >= 16) {
                value = digitsAndLowercaseLettersAToF[i / 16] + digitsAndLowercaseLettersAToF[counter - 1];
            }
        }
    }
    return value;
};
tHex.convertIntegerToHexPartIfIntegerBetween255And510 = function (integer) {
    integer = tHex.validateIntegerIfIntegerBetween255And510(integer);
    return tHex.convertIntegerToHexPartIfIntegerBetween0And255(integer);
};
tHex.convertIntegerToHexPartIfIntegerBetween0And510 = function (integer) {
    integer = tHex.validateIntegerIfIntegerBetween0And510(integer);
    return tHex.convertIntegerToHexPartIfIntegerBetween0And255(integer);
};
tHex.convertIntegerToHexPartIfIntegerGreaterThanOrEquals0 = function (integer) {
    integer = tHex.validateIntegerIfIntegerGreaterThanOrEquals0(integer);
    return tHex.convertIntegerToHexPartIfIntegerBetween0And255(integer);
};
tHex.convertIntegerToHexPart = function (integer) {
    integer = tHex.validateInteger(integer);
    return tHex.convertIntegerToHexPartIfIntegerBetween0And255(integer);
};
tHex.convertRgbaIntegersToHex = function (red, green, blue, alpha) {
    const redPart = tHex.convertIntegerToHexPart(red);
    const greenPart = tHex.convertIntegerToHexPart(green);
    const bluePart = tHex.convertIntegerToHexPart(blue);
    const alphaPart = tHex.convertIntegerToHexPart(alpha);
    return "#" + redPart + greenPart + bluePart + alphaPart;
};
tHex.convertRgbIntegersToHex = (red, green, blue) => StringPart.subStringWithToIndex(tHex.convertRgbaIntegersToHex(red, green, blue, tHex.max), 6);
tHex.convertRgbaIntegersArrayToHex = function (rgbaArray) {
    rgbaArray = getValidArray(rgbaArray);
    return tHex.convertRgbaIntegersToHex(rgbaArray[0], rgbaArray[1], rgbaArray[2], rgbaArray[3]);
};
tHex.convertRgbIntegersArrayToHex = function (rgbArray) {
    rgbArray = getValidArray(rgbArray);
    return tHex.convertRgbIntegersToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
};
tHex.getNumberWithTypePossibleParameters = function (type) {
    return createIfAndElseAndReturns(type === numberWithTypePossibleParameters[0], numberWithNumberTypePossibleParameters, createIfAndElseAndReturns(type === numberWithTypePossibleParameters[1], minToMaxNumberWithNumberTypePossibleParameters, []));
}
tHex.getNumberWithTypeIndexPossibleParameters = function (typeIndex) {
    return tHex.getNumberWithTypePossibleParameters(numberWithTypePossibleParameters[typeIndex]);
}
tHex.getRgbaTHexWithNumberType = function (hex, type, integerType) {
    const possibleParameters = numberWithTypePossibleParameters;
    let value = "";
    if (tHex.isHex(hex) && hex.length === 9 && isObjectEqualsSomeElementOfArray(type, possibleParameters)) {
        const rgbaArray = tHex.convertHexToRgbaArray(hex);
        const redPart = tHex.convertIntegerToHexPart(getIntegerWithType(type, tHex.numberWithTypeReferenceNumber(type), integerType, rgbaArray[0] + 1) - 1);
        const greenPart = tHex.convertIntegerToHexPart(getIntegerWithType(type, tHex.numberWithTypeReferenceNumber(type), integerType, rgbaArray[1] + 1) - 1);
        const bluePart = tHex.convertIntegerToHexPart(getIntegerWithType(type, tHex.numberWithTypeReferenceNumber(type), integerType, rgbaArray[2] + 1) - 1);
        const alphaPart = tHex.convertIntegerToHexPart(getIntegerWithType(type, tHex.numberWithTypeReferenceNumber(type), integerType, rgbaArray[3] + 1) - 1);
        value = "#" + redPart + greenPart + bluePart + alphaPart;
    }
    return value;
};
tHex.getRgbaTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => tHex.getRgbaTHexWithNumberType(hex, type, tHex.getNumberWithTypePossibleParameters(type)[numberTypeIndex]);
tHex.getRgbaTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => tHex.getRgbaTHexWithNumberType(hex, numberWithTypePossibleParameters[typeIndex], numberType);
tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => tHex.getRgbaTHexWithNumberType(hex, numberWithTypePossibleParameters[typeIndex], tHex.getNumberWithTypeIndexPossibleParameters(typeIndex)[numberTypeIndex]);
tHex.getRgbaHalfHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 0);
tHex.getRgbaQuarterHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 1);
tHex.getRgbaThreeQuarterHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 2);
tHex.getRgbaEighthHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 3);
tHex.getRgbaThreeEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 4);
tHex.getRgbaFiveEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 5);
tHex.getRgbaSevenEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 6);
tHex.getRgbaSixteenthHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 7);
tHex.getRgbaThreeSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 8);
tHex.getRgbaFiveSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 9);
tHex.getRgbaSevenSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 10);
tHex.getRgbaNineSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 11);
tHex.getRgbaElevenSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 12);
tHex.getRgbaThirteenSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 13);
tHex.getRgbaFifteenSixteenthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 14);
tHex.getRgbaQuarterToThreeQuarterHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getRgbaEighthToSevenEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
tHex.getRgbaThreeEighthsToFiveEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 2);
tHex.getRgbaSixteenToFifteenSixteensHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 3);
tHex.getRgbaThreeSixteenthsToThirteenSixteensHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 4);
tHex.getRgbaFiveSixteenthsToElevenSixteensHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 5);
tHex.getRgbaSevenSixteenthsToNineSixteensHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 6);
tHex.getRgbTHexWithNumberType = (hex, type, numberType) => StringPart.subStringWithToIndex(tHex.getRgbaTHexWithNumberType(hex + "ff", type, numberType), 6);
tHex.getRgbTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => StringPart.subStringWithToIndex(tHex.getRgbaTHexWithTypeAndNumberTypeIndex(hex + "ff", type, numberTypeIndex), 6);
tHex.getRgbTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => StringPart.subStringWithToIndex(tHex.getRgbaTHexWithTypeIndexAndNumberType(hex + "ff", typeIndex, numberType), 6);
tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => StringPart.subStringWithToIndex(tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex + "ff", typeIndex, numberTypeIndex), 6);
tHex.getRgbHalfHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 0);
tHex.getRgbQuarterHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 1);
tHex.getRgbThreeQuarterHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 2);
tHex.getRgbEighthHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 3);
tHex.getRgbThreeEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 4);
tHex.getRgbFiveEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 5);
tHex.getRgbSevenEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 6);
tHex.getRgbSixteenthHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 7);
tHex.getRgbThreeSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 8);
tHex.getRgbFiveSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 9);
tHex.getRgbSevenSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 10);
tHex.getRgbNineSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 11);
tHex.getRgbElevenSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 12);
tHex.getRgbThirteenSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 13);
tHex.getRgbFifteenSixteenthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 14);
tHex.getRgbQuarterToThreeQuarterHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getRgbEighthToSevenEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
tHex.getRgbThreeEighthsToFiveEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 2);
tHex.getRgbSixteenToFifteenSixteensHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 3);
tHex.getRgbThreeSixteenthsToThirteenSixteensHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 4);
tHex.getRgbFiveSixteenthsToElevenSixteensHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 5);
tHex.getRgbSevenSixteenthsToNineSixteensHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 6);
tHex.getReverseHexCharWithIndex = function (hexCharIndex) {
    return new StringManipulation(digitsAndLowercaseLettersAToF).reverse().charAt(hexCharIndex);
};
tHex.getReverseHexChar = function (hexChar) {
    return tHex.getReverseHexCharWithIndex(tHex.getHexCharIndex(hexChar));
};
tHex.getReverseHexPart = function (hexPart) {
    return tHex.getReverseHexChar(hexPart[0]) + tHex.getReverseHexChar(hexPart[1]);
};
tHex.getReverseHex = function (hex) {
    const hexColor = tHex.hexColor(hex);
    let value = "";
    if (tHex.isHex(hex) && (hexColor.length === 6 || hexColor.length === 8)) {
        for (const element of tHex.hexColor(hex)) {
            value += tHex.getReverseHexChar(element);
        }
        value = "#" + value;
    }
    return value;
};
tHex.getReverseRgbaTHexWithNumberType = function (hex, type, numberType) {
    const possibleParameters = numberWithTypePossibleParameters;
    const referenceNumber = createIfAndElseAndReturns(type === possibleParameters[0], null, createIfAndElseAndReturns(type === possibleParameters[1], tHex.max + 1, 0));
    let value = "";
    if (tHex.isHex(hex) && hex.length === 9 && isObjectEqualsSomeElementOfArray(type, possibleParameters)) {
        const rgbaArray = tHex.convertHexToRgbaArray(hex);
        const redPart = tHex.getReverseHexPart(tHex.convertIntegerToHexPart(getIntegerWithType(type, referenceNumber, numberType, rgbaArray[0] + 1)));
        const greenPart = tHex.getReverseHexPart(tHex.convertIntegerToHexPart(getIntegerWithType(type, referenceNumber, numberType, rgbaArray[1] + 1)));
        const bluePart = tHex.getReverseHexPart(tHex.convertIntegerToHexPart(getIntegerWithType(type, referenceNumber, numberType, rgbaArray[2] + 1)));
        const alphaPart = tHex.getReverseHexPart(tHex.convertIntegerToHexPart(getIntegerWithType(type, referenceNumber, numberType, rgbaArray[3] + 1)));
        value = "#" + redPart + greenPart + bluePart + alphaPart;
    }
    return value;
};
tHex.getReverseRgbaTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => tHex.getReverseRgbaTHexWithNumberType(hex, type, tHex.getNumberWithTypePossibleParameters(type)[numberTypeIndex]);
tHex.getReverseRgbaTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => tHex.getReverseRgbaTHexWithNumberType(hex, numberWithTypePossibleParameters[typeIndex], numberType);
tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => tHex.getReverseRgbaTHexWithNumberType(hex, numberWithTypePossibleParameters[typeIndex], tHex.getNumberWithTypeIndexPossibleParameters(typeIndex)[numberTypeIndex]);
tHex.getReverseRgbaHalfHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 0);
tHex.getReverseRgbaQuarterHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 1);
tHex.getReverseRgbaThreeQuarterHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 2);
tHex.getReverseRgbaEighthHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 3);
tHex.getReverseRgbaThreeEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 4);
tHex.getReverseRgbaFiveEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 5);
tHex.getReverseRgbaSevenEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 6);
tHex.getReverseRgbaSixteenthHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 7);
tHex.getReverseRgbaThreeSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 8);
tHex.getReverseRgbaFiveSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 9);
tHex.getReverseRgbaSevenSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 10);
tHex.getReverseRgbaNineSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 11);
tHex.getReverseRgbaElevenSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 12);
tHex.getReverseRgbaThirteenSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 13);
tHex.getReverseRgbaFifteenSixteenthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 14);
tHex.getReverseRgbaQuarterToThreeQuarterHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getReverseRgbaEighthToSevenEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
tHex.getReverseRgbaThreeEighthsToFiveEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 2);
tHex.getReverseRgbaSixteenToFifteenSixteensHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 3);
tHex.getReverseRgbaThreeSixteenthsToThirteenSixteensHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 4);
tHex.getReverseRgbaFiveSixteenthsToElevenSixteensHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 5);
tHex.getReverseRgbaSevenSixteenthsToNineSixteensHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 6);
tHex.getReverseRgbTHexWithNumberType = (hex, type, numberType) => StringPart.subStringWithToIndex(tHex.getReverseRgbaTHexWithNumberType(hex + "ff", type, numberType), 6);
tHex.getReverseRgbTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => StringPart.subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeAndNumberTypeIndex(hex + "ff", type, numberTypeIndex), 6);
tHex.getReverseRgbTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => StringPart.subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeIndexAndNumberType(hex + "ff", typeIndex, numberType), 6);
tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => StringPart.subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex + "ff", typeIndex, numberTypeIndex), 6);
tHex.getReverseRgbHalfHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 0);
tHex.getReverseRgbQuarterHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 1);
tHex.getReverseRgbThreeQuarterHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 2);
tHex.getReverseRgbEighthHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 3);
tHex.getReverseRgbThreeEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 4);
tHex.getReverseRgbFiveEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 5);
tHex.getReverseRgbSevenEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 6);
tHex.getReverseRgbSixteenthHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 7);
tHex.getReverseRgbThreeSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 8);
tHex.getReverseRgbFiveSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 9);
tHex.getReverseRgbSevenSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 10);
tHex.getReverseRgbNineSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 11);
tHex.getReverseRgbElevenSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 12);
tHex.getReverseRgbThirteenSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 13);
tHex.getReverseRgbFifteenSixteenthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 0, 14);
tHex.getReverseRgbQuarterToThreeQuarterHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getReverseRgbEighthToSevenEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
tHex.getReverseRgbThreeEighthsToFiveEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 2);
tHex.getReverseRgbSixteenToFifteenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 3);
tHex.getReverseRgbThreeSixteenthsToThirteenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 4);
tHex.getReverseRgbFiveSixteenthsToElevenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 5);
tHex.getReverseRgbSevenSixteenthsToNineSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 6);

export function isLowercaseLetterAToZ(letter) {
    const isCharacterOfLowercaseLetters = isCharEqualsCharacterOfText(letter, lowercaseLettersAToZ);
    return letter !== null && isCharacterOfLowercaseLetters && getValidString(letter).length === 1;
}

export function isCapitalLetterAToZ(letter) {
    const isCharacterOfCapitalLetters = isCharEqualsCharacterOfText(letter, capitalLettersAToZ);
    return letter !== null && isCharacterOfCapitalLetters && getValidString(letter).length === 1;
}

export function isLetterAToZ(letter) {
    const isCharacterOfLetters = isCharEqualsCharacterOfText(letter, lowercaseAndCapitalLettersAToZ);
    return letter !== null && isCharacterOfLetters && getValidString(letter).length === 1;
}

export function changeLowercaseLetterToUppercaseWithAToZ(letter) {
    let value = letter;
    if (isLetterAToZ(letter) && isLowercaseLetterAToZ(letter)) {
        value = capitalLettersAToZ[lowercaseLettersAToZ.indexOf(letter)];
    }
    return value;
}

export function changeLowercaseLettersToUppercaseWithAToZ(letters) {
    let value = "";
    letters = getValidString(letters);
    for (const letter of letters) {
        const uppercaseLetter = changeLowercaseLetterToUppercaseWithAToZ(letter);
        value += createIfAndElseAndReturns(isLetterAToZ(letter), uppercaseLetter, letter);
    }
    return value;
}

export function changeLowercaseStringFirstLetterToUppercaseWithAToZ(string) {
    const stringPart = new StringPart(string);
    const firstLetter = getValidString(string)[0];
    const firstPart = stringPart.subStringWithFromIndex(1);
    return changeLowercaseLetterToUppercaseWithAToZ(firstLetter) + firstPart;
}

export function changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray) {
    let value = [];
    for (const element of getValidArray(stringArray)) {
        const validElement = getValidString(element);
        value += changeLowercaseStringFirstLetterToUppercaseWithAToZ(validElement);
    }
    return value;
}

export function changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(string, search, searchTh) {
    const stringPart = new StringPart(string);
    const searchThIndex = getSearchThIndexOfString(string, search, searchTh);
    const afterSearchThIndex = searchThIndex + getValidString(search).length;
    const beforeLetterPart = stringPart.subStringWithToIndex(searchThIndex);
    const searchThFirstLetter = getValidString(string)[afterSearchThIndex];
    const changedLetter = changeLowercaseLetterToUppercaseWithAToZ(searchThFirstLetter);
    const afterLetterPart = stringPart.subStringWithFromIndex(afterSearchThIndex + 1);
    return beforeLetterPart + changedLetter + afterLetterPart;
}

export function changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    const changedLetterInString = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(string, search, searchTh);
    return removeSearchThInString(changedLetterInString, search, searchTh);
}

export function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(string, search) {
    const stringManipulation = new StringManipulation(string);
    const searchsCount = stringManipulation.containsSearchsCount(search);
    let value = string;
    for (let i = 1; i <= searchsCount; i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

export function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZ(string, search) {
    const stringManipulation = new StringManipulation(string);
    const searchsCount = stringManipulation.containsSearchsCount(search);
    let value = string;
    for (let i = 1; i <= searchsCount; i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(value, search, i);
    }
    return value;
}

export function changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(stringArray) {
    const changedArrayElementsFirstLetter = changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray);
    return stringifyArrayElements(changedArrayElementsFirstLetter);
}

export function changeLowercaseStringsFirstLetterToUppercaseWithAToZ(...strings) {
    const stringArray = createArrayFromObjects(strings);
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray);
}

export function changeLowercaseStringsFirstLetterToUppercaseWithAToZAndStringifyElements(...strings) {
    const stringArray = createArrayFromObjects(strings);
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(stringArray);
}

export function isContainsCapitalLetterInString(string) {
    let value = false;
    for (const element of string) {
        if (isCapitalLetterAToZ(element)) {
            value = true;
            break;
        }
    }
    return value;
}

export function getStringCapitalLetterIndex(string) {
    let letterIndex = -1;
    for (let i = 0; i < string.length; i++) {
        if (isCapitalLetterAToZ(string[i])) {
            letterIndex = i;
            break;
        }
    }
    return letterIndex;
}

export function getStringCapitalLetter(string) {
    const stringChar = string[getStringCapitalLetterIndex(string)];
    return createIfAndElseAndReturns(typeof stringChar === "string", stringChar, "");
}

export function removeCapitalLetterInString(string) {
    return StringManipulation.removeSearchInString(string, getStringCapitalLetter(string));
}

export function containsCapitalLetterCountInString(string) {
    let capitalLetterCounter = 0;
    let disassembledString = string;
    while (isContainsCapitalLetterInString(disassembledString)) {
        capitalLetterCounter++;
        disassembledString = removeCapitalLetterInString(disassembledString);
    }
    return capitalLetterCounter;
}

export function isContainsCapitalLetterCountInString(string, capitalLetterCount) {
    return containsCapitalLetterCountInString(string) >= validateNumberWithMin(capitalLetterCount, 0);
}

export function getStringCapitalLetterThIndex(string, capitalLetterTh) {
    string = getValidString(string);
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const capitalLetterCount = containsCapitalLetterCountInString(string);
    let disassembledString = string;
    let value = 0;
    if (capitalLetterTh <= capitalLetterCount) {
        let i = 0;
        while (i < capitalLetterTh) {
            value = getStringCapitalLetterIndex(disassembledString) + i;
            disassembledString = removeCapitalLetterInString(disassembledString);
            i++;
        }
    } else {
        value = string.length;
    }
    return value;
}

export function changeUppercaseLetterToLowercaseWithAToZ(letter) {
    let value = letter;
    if (isLetterAToZ(letter) && isCapitalLetterAToZ(letter)) {
        value = lowercaseLettersAToZ[capitalLettersAToZ.indexOf(letter)];
    }
    return value;
}

export function changeUppercaseLettersToLowercaseWithAToZ(letters) {
    let value = "";
    for (const letter of getValidString(letters)) {
        const lowercaseLetter = changeUppercaseLetterToLowercaseWithAToZ(letter);
        value += createIfAndElseAndReturns(isLetterAToZ(letter), lowercaseLetter, letter);
    }
    return value;
}

export function changeUppercaseStringFirstLetterToLowercaseWithAToZ(string) {
    const stringPart = new StringPart(string);
    const firstLetter = getValidString(string)[0];
    const afterFirstLetterPart = stringPart.subStringWithFromIndex(1);
    return changeUppercaseLetterToLowercaseWithAToZ(firstLetter) + afterFirstLetterPart;
}

export function changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray) {
    let value = [];
    for (const element of getValidArray(stringArray)) {
        const validElement = getValidString(element);
        value += changeUppercaseStringFirstLetterToLowercaseWithAToZ(validElement);
    }
    return value;
}

export function changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(string, search, searchTh) {
    const stringPart = new StringPart(string);
    const searchThIndex = getSearchThIndexOfString(string, search, searchTh);
    const afterSearchThIndex = searchThIndex + getValidString(search).length;
    const beforeLetterPart = stringPart.subStringWithToIndex(searchThIndex);
    const searchThFirstLetter = getValidString(string)[afterSearchThIndex];
    const changedLetter = changeUppercaseLetterToLowercaseWithAToZ(searchThFirstLetter);
    const afterLetterPart = stringPart.subStringWithFromIndex(afterSearchThIndex + 1);
    return beforeLetterPart + changedLetter + afterLetterPart;
}

export function changeStringUppercaseLetterThToLowercaseWithAToZ(string, capitalLetterTh) {
    const stringPart = new StringPart(string);
    const capitalLetterThIndex = getStringCapitalLetterThIndex(string, capitalLetterTh);
    const beforeLetterThIndex = capitalLetterThIndex - 1;
    const afterLetterThIndex = capitalLetterThIndex + 1;
    const beforeLetterPart = stringPart.subStringWithToIndex(beforeLetterThIndex);
    const capitalLetter = getValidString(string)[capitalLetterThIndex];
    const changedLetter = changeUppercaseLetterToLowercaseWithAToZ(capitalLetter);
    const afterLetterPart = stringPart.subStringWithFromIndex(afterLetterThIndex);
    return beforeLetterPart + changedLetter + afterLetterPart;
}

export function placeStringCapitalLetterThBeforeToPlace(string, capitalLetterTh, place) {
    string = getValidString(string);
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const capitalLetterThIndex = getStringCapitalLetterThIndex(string, capitalLetterTh);
    const placedBeforeLetterTh = placeStringFromIndexInString(string, capitalLetterThIndex, place);
    return createIfAndElseAndReturns(capitalLetterTh > 0, placedBeforeLetterTh, string);
}

export function placeStringAllCapitalLetterThBeforeToPlace(string, place) {
    let value = string;
    for (let i = 1; i <= containsCapitalLetterCountInString(string); i++) {
        value = placeStringCapitalLetterThBeforeToPlace(value, i, place);
    }
    return value;
}

export function placeStringCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(string, capitalLetterTh, place) {
    const placedBeforeLetterTh = placeStringCapitalLetterThBeforeToPlace(string, capitalLetterTh, place);
    return changeStringUppercaseLetterThToLowercaseWithAToZ(placedBeforeLetterTh);
}

export function placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(string, place) {
    const capitalLetterCount = containsCapitalLetterCountInString(string);
    let value = string;
    for (let i = 1; i <= capitalLetterCount; i++) {
        value = placeStringCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(value, 1, place);
    }
    return value;
}

export function getStringCapitalLetterThToNextSearch(string, capitalLetterTh) {
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(capitalLetterTh > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, capitalLetterTh));
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((capitalLetterTh + 1) > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, getValidSearchTh(capitalLetterTh) + 1) - 1);
    const searchedStringStartIndex = createIfAndElseAndReturns(capitalLetterTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(capitalLetterTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringCapitalLetter(string) - 1);
    return StringPart.subString(string, searchedStringStartIndex, searchedStringEndIndex);
}

export function isStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, capitalLetterTh, afterSearch) {
    return getStringCapitalLetterThToNextSearch(string, capitalLetterTh) === getValidString(afterSearch);
}

export function getStringAfterSearchIfStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, searchTh, afterSearch) {
    return createIfAndElseAndReturns(isStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, searchTh, afterSearch), afterSearch, "");
}

export function replaceStringCapitalLetterThToNextSearch(string, capitalLetterTh, replace) {
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const stringPart = new StringPart(string);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(capitalLetterTh > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, capitalLetterTh) - 1);
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((capitalLetterTh + 1) > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, getValidSearchTh(capitalLetterTh) + 1));
    const searchedStringStartIndex = createIfAndElseAndReturns(getValidSearchTh(capitalLetterTh) > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(getValidSearchTh(capitalLetterTh) > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringCapitalLetterIndex(string));
    const beforeReplacePart = stringPart.subStringWithToIndex(searchedStringStartIndex);
    const afterReplacePart = stringPart.subStringWithToIndex(searchedStringEndIndex);
    return beforeReplacePart + getValidString(replace) + afterReplacePart;
}

export function getStringAfterOfSearchThToNextSearch(string, search, searchTh) {
    searchTh = getValidSearchTh(searchTh);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchsCount, string.length, getSearchThIndexOfString(string, search, searchTh) + 1);
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchsCount, string.length, getSearchThIndexOfString(string, search, getValidSearchTh(searchTh) + 1) - 1);
    const searchedStringStartIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search) - 1);
    return StringPart.subString(string, searchedStringStartIndex, searchedStringEndIndex);
}

export function isStringAfterOfSearchThToNextSearchEqualsAfterSearch(string, search, searchTh, afterSearch) {
    return getStringAfterOfSearchThToNextSearch(string, search, searchTh) === getValidString(afterSearch);
}

export function replaceStringAfterOfSearchThToNextSearch(string, search, searchTh, replace) {
    searchTh = getValidSearchTh(searchTh);
    const stringPart = new StringPart(string);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchsCount, string.length, getSearchThIndexOfString(string, search, searchTh));
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchsCount, string.length, getSearchThIndexOfString(string, search, getValidSearchTh(searchTh) + 1));
    const searchedStringStartIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search));
    const beforeReplacePart = stringPart.subStringWithToIndex(searchedStringStartIndex);
    const afterReplacePart = stringPart.subStringWithToIndex(searchedStringEndIndex);
    return beforeReplacePart + getValidString(replace) + afterReplacePart;
}

export function changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    const changedLetter = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(string, search, searchTh);
    return removeSearchThInString(changedLetter, search, searchTh);
}

export function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZAndRemoveAllSearchs(string, search) {
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let value = string;
    for (let i = 1; i <= containsSearchsCount; i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

export function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZ(string, search) {
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let value = string;
    for (let i = 1; i <= containsSearchsCount; i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(value, search, i);
    }
    return value;
}

export function changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(stringArray) {
    const changedElementsFirstLetter = changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray);
    return stringifyArrayElements(changedElementsFirstLetter);
}

export function changeUppercaseStringsFirstLetterToLowercaseWithAToZ(...strings) {
    const stringArray = createArrayFromObjects(strings);
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray);
}

export function changeUppercaseStringsFirstLetterToLowercaseWithAToZAndStringifyElements(...strings) {
    const stringArray = createArrayFromObjects(strings);
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(stringArray);
}

export function getSearchsCountsInString(string, searchStringArray) {
    searchStringArray = getValidArray(searchStringArray);
    let value = [];
    for (const element of searchStringArray) {
        const stringManipulation = new StringManipulation(string);
        const containsSearchsCount = stringManipulation.containsSearchsCount(element);
        value.push(containsSearchsCount);
    }
    return value;
}

export function getSearchCharsCountsInString(string, search) {
    let value = [];
    for (const element of search) {
        const stringManipulation = new StringManipulation(string);
        const containsSearchsCount = stringManipulation.containsSearchsCount(element);
        value.push(containsSearchsCount);
    }
    return value;
}

function sqrXTh(x, xXth) {
    x = getValidNumber(x);
    xXth = getValidNumber(xXth);
    if (xXth > 0) {
        const I = x;
        let X = x;
        for (let i = 1; i < xXth; i++) {
            X = X * I;
        }
        return X;
    } else if (xXth < 0) {
        const I = x;
        let X = x;
        for (let i = -1; i > xXth; i--) {
            X = X * I;
        }
        return x / X;
    } else {
        if (xXth === 0) {
            return 1;
        }
    }
}

function isEqualsObjectArrayElements(array) {
    array = getValidArray(array);
    let isEquals = false;
    const length = array.length;
    if (length === 1) {
        isEquals = true;
    } else {
        for (let i = 0; i < length; i++) {
            const firstObject = array[i];
            let lastObject = firstObject;
            if (i < length - 1) {
                lastObject = array[i + 1];
            }
            isEquals = firstObject === lastObject;
            if (!isEquals) {
                break;
            }
        }
    }
    return isEquals;
}

function isArrayElementsTrue(array) {
    const isEmpty = isEmptyArray(array);
    const isFirstTrue = createIfAndElseAndReturns(isEmpty, false, array[0] === true);
    return isEqualsObjectArrayElements(array) && isFirstTrue;
}

export function isIntegersArray(array) {
    let value = false;
    if (Array.isArray(array)) {
        const elementsIsIntegersArray = [];
        for (const element of array) {
            const isIntegerElement = isValidInteger(element);
            elementsIsIntegersArray.push(isIntegerElement);
        }
        value = isArrayElementsTrue(elementsIsIntegersArray);
    }
    return value;
}

function isIncreasingIntegersArray(array) {
    let value = false;
    if (isIntegersArray(array)) {
        const {length} = array;
        let savedElement = null;
        for (let i = 0; i < length; i++) {
            const element = array[i];
            if (savedElement !== null) {
                value = element > savedElement;
            }
            if (i + 1 < length) {
                savedElement = element;
            }
        }
    }
    return value;
}

function isEqualsObjects(...objects) {
    return isEqualsObjectArrayElements(createArrayFromObjects(objects));
}

function getObjectWithConditionalBoolean(condition, ifTrue, ifFalse) {
    return condition ? ifTrue : ifFalse;
}

function getReturnIfArrayFirstTrue(equalsAndReturnsArray) {
    return getReturnIfObjectEqualsArrayFirst(true, equalsAndReturnsArray);
}

export function getReturnIfObjectEqualsArrayFirst(object, equalsAndReturnsArray) {
    equalsAndReturnsArray = getValidArray(equalsAndReturnsArray);
    let value = equalsAndReturnsArray;
    if (equalsAndReturnsArray.length === 3) {
        if (object === equalsAndReturnsArray[0]) {
            value = equalsAndReturnsArray[1];
        } else if (Array.isArray(equalsAndReturnsArray[2])) {
            value = getReturnIfObjectEqualsArrayFirst(object, equalsAndReturnsArray[2]);
        } else {
            value = equalsAndReturnsArray[2];
        }
    }
    return value;
}

function getReturnsArrayElementIfObjectEqualsArrayElement(object, equalsArray, returnsArray) {
    equalsArray = getValidArray(equalsArray);
    returnsArray = getValidArray(returnsArray);
    let value = null;
    let returnValue = null;
    for (let i = 0; i < equalsArray.length; i++) {
        const isEquals = object === equalsArray[i];
        returnValue = createIfAndElseAndReturns(returnsArray.length > i, returnsArray[i], null);
        if (isEquals) {
            value = returnValue;
            break;
        } else {
            if (i === equalsArray.length - 1) {
                if (returnsArray.length > i + 1) {
                    value = returnsArray[i + 1];
                } else {
                    value = null;
                }
            }
        }
    }
    return value;
}

function getReturnIfObjectArrayElementEqualsArrayFirst(objectArray, equalsAndReturnsArray) {
    objectArray = getValidArray(objectArray);
    equalsAndReturnsArray = getValidArray(equalsAndReturnsArray);
    let value = equalsAndReturnsArray;
    if (equalsAndReturnsArray.length === 3) {
        if (objectArray[0] === equalsAndReturnsArray[0]) {
            value = equalsAndReturnsArray[1];
        } else if (Array.isArray(equalsAndReturnsArray[2])) {
            value = getReturnIfObjectArrayElementEqualsArrayFirst(subArrayWithFromIndex(objectArray, 1), equalsAndReturnsArray[2]);
        } else {
            value = equalsAndReturnsArray[2];
        }
    }
    return value;
}

function convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray) {
    equalsAndElseArray = getValidArray(equalsAndElseArray);
    let value = equalsAndElseArray;
    if (equalsAndElseArray.length === 2) {
        if (Array.isArray(equalsAndElseArray[1])) {
            const equalsAndReturnsArray = convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray[1]);
            const placedFirstElementToAfter = placeObjectToTheArray(equalsAndElseArray, equalsAndElseArray[0], 1);
            value = replaceObjectToTheArray(placedFirstElementToAfter, equalsAndReturnsArray, 2);
        } else {
            value = placeObjectToTheArray(equalsAndElseArray, equalsAndElseArray[0], 1);
        }
    }
    return value;
}

export function getObjectIfObjectEqualsArrayFirst(object, equalsAndElseArray) {
    return getReturnIfObjectEqualsArrayFirst(object, convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray));
}

function getObjectIfObjectArrayElementEqualsArrayFirst(objectsArray, equalsAndElseArray) {
    return getReturnIfObjectArrayElementEqualsArrayFirst(objectsArray, convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray));
}

function getObjectIfEqualsObjects(a, b) {
    return createIfAndElseAndReturns(a === b, b, a);
}

export function createArrayFromObjects(...elements) {
    let array = [];
    for (const element of elements) {
        array.push(element);
    }
    return array;
}

function isStringAllCharsEqualsDigitsAndLength(string, length) {
    const stringManipulation = new StringManipulation(string);
    if (string === null) {
        string = DIGITS;
    }
    const isDigits = stringManipulation.isDigits(string);
    return isDigits && string.length === getValidInteger(length);
}

export function isStringNumber(string) {
    string = getValidString(string);
    const stringManipulation = new StringManipulation(string);
    const containsDotCount = stringManipulation.containsSearchsCount(".");
    const isContainsDot = containsDotCount > 0;
    const isValidDotCount = containsDotCount <= 1;
    const dotIndex = getStringIndexOf(string, ".");
    const afterDotPartIfContainsDot = StringPart.subStringWithFromIndex(string, dotIndex + 1);
    const afterDotPart = createIfAndElseAndReturns(isContainsDot, afterDotPartIfContainsDot, string);
    const isAfterDotIndexDigits = StringManipulation.isDigits(afterDotPart);
    const isDigits = stringManipulation.isDigits();
    const isFirstDigit = isDigit(string[0]);
    const isSecondDigit = isDigit(string[1]);
    const secondElements = StringPart.subStringWithFromIndex(string, 2);
    const isSecondDigits = StringManipulation.isDigits(secondElements);
    const isFirstHyphen = string[0] === "-";
    const isBeginDigit = createIfAndElseAndReturns(isFirstHyphen, isSecondDigit, isFirstDigit);
    const isBeginDigits = createIfAndElseAndReturns(isFirstHyphen, isSecondDigits, isDigits);
    return isBeginDigit && ((isValidDotCount && isAfterDotIndexDigits) || isBeginDigits);
}

function isStringInteger(string) {
    string = getValidString(string);
    const isValidStringNumber = isStringNumber(string);
    const isNotContainsDot = !isContainsSearchInString(string, ".");
    return isValidStringNumber && isNotContainsDot;
}

function max1DigitOfNumberAddOrOutOfOneIfNumberGreaterThan0(digit, digitsType) {
    let digits;
    let value;
    if (digitsType === "reverse") {
        digits = new StringManipulation(DIGITS).reverse();
    } else if (digitsType === "normal") {
        digits = DIGITS;
    }
    if (isCharEqualsCharacterOfText(digit, digits)) {
        const index = digits.indexOf(digit);
        value = index === createIfAndElseAndReturns(digits.length - 1, digits[0], digits[index + 1]);
    } else {
        value = DIGITS[0];
    }
    return value;
}

function max1DigitOfNumberAddOneIfNumberGreaterThan0(digit) {
    return max1DigitOfNumberAddOrOutOfOneIfNumberGreaterThan0(digit, "normal");
}

function max1DigitOfNumberOutOfOneIfNumberGreaterThan0(digit) {
    return max1DigitOfNumberAddOrOutOfOneIfNumberGreaterThan0(digit, "reverse");
}

function max1DigitOfNumberAddOne(digit) {
    const stringManipulation = new StringManipulation(digit);
    let value;
    if (stringManipulation.isElementsMatchSomeOfCharsInText("-" + DIGITS)) {
        if (digit.length === 2 && digit[0] === "-" && isDigit(digit[1]) && max1DigitOfNumberOutOfOneIfNumberGreaterThan0(digit[1]) === DIGITS[0]) {
            value = "-" + max1DigitOfNumberOutOfOneIfNumberGreaterThan0(digit[1]);
        } else if (digit.length === 1 && isDigit(digit[0])) {
            value = max1DigitOfNumberAddOneIfNumberGreaterThan0(digit);
        }
    } else {
        value = DIGITS[0];
    }
    return value;
}

function max2DigitsOfNumberAddOne(digits) {
    let value;
    const addOne = max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[digits.length - 1]);
    if (isStringAllCharsEqualsDigitsAndLength(digits, 1)) {
        const isFirstToAddOne = StringPart.subStringWithToIndex(DIGITS, 1);
        value = addOne === createIfAndElseAndReturns(DIGITS[0], isFirstToAddOne, addOne);
    } else if (isStringAllCharsEqualsDigitsAndLength(digits, 2)) {
        if (addOne === DIGITS[0]) {
            const digit = max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[0]);
            value = createIfAndElseAndReturns(digit === DIGITS[0], DIGITS[0], digit + DIGITS[0]);
        } else {
            value = digits[0] + addOne;
        }
    }
    return value;
}

function isValidCharAndText(char, text) {
    return !isEmptyStrings(char, text) && getValidString(char).length === 1;
}

export function isValidStringAndText(string, text) {
    return isEmptyStrings(string, text) || isEmptyString(string) || !isEmptyString(text);
}

function isValidArrayAndElementsInArray(array, elementsInArray) {
    return isEmptyArrays(array, elementsInArray) || isEmptyArray(array) || !isEmptyArray(elementsInArray);
}

export function isCharEqualsCharacterOfText(char, text) {
    let value = isValidCharAndText(char, text);
    for (const element of getValidString(text)) {
        value = getValidString(char) === element;
        if (value) {
            break;
        }
    }
    return value;
}

function isObjectEqualsSomeElementOfArray(object, array) {
    let isBreak = false;
    for (const element of getValidArray(array)) {
        if (isBreak) {
            break;
        } else {
            isBreak = object === element;
        }
    }
    return isBreak;
}

function isArrayAllElementsEqualsMatchSomeOfElementsInEqualsArray(array, equalsArray) {
    let value = isValidArrayAndElementsInArray(array, equalsArray);
    for (const element of getValidArray(array)) {
        value = value && isObjectEqualsSomeElementOfArray(element, getValidArray(equalsArray));
    }
    return value;
}

export function isObjectEqualsSomeElementOfString(object, string) {
    return isObjectEqualsSomeElementOfArray(object, createArrayFromStringElements(getValidString(string)));
}

function isObjectNotEqualsSomeElementOfArray(object, array) {
    const isEmpty = isEmptyArray(array);
    const valueIfArrayNotEmpty = !isObjectEqualsSomeElementOfArray(object, array);
    return createIfAndElseAndReturns(isEmpty, false, valueIfArrayNotEmpty);
}

function isObjectEqualsSomeElementOfObjects(object, ...objects) {
    return isObjectEqualsSomeElementOfArray(object, createArrayFromObjects(objects));
}

function isObjectNotEqualsSomeElementOfObjects(object, ...objects) {
    return !isObjectEqualsSomeElementOfObjects(object, objects);
}

function createNestedEmptyArraysWithArrayThAndLengthInArray(arraysCount, arrayTh, length) {
    arraysCount = getValidInteger(arraysCount);
    arrayTh = getValidSearchTh(arrayTh);
    length = getValidInteger(length);
    const emptyArraysInArray = createEmptyArraysInArray(arraysCount);
    const isValidArraysCount = arraysCount > 0;
    const isValidArrayTh = arrayTh > 0;
    const isValidLength = length > 0;
    let value = [];
    if (isValidArraysCount) {
        if (length > 1) {
            const replaceableArray = createNestedEmptyArraysWithArrayThAndLengthInArray(arraysCount, arrayTh, length - 1);
            value = emptyArraysInArray;
            if (isValidArrayTh) {
                value[arrayTh - 1] = replaceableArray;
            }
        } else {
            value = createIfAndElseAndReturns(isValidLength, emptyArraysInArray, value);
        }
    }
    return value;
}

function createEmptyArraysInArray(arraysCount) {
    arraysCount = getValidInteger(arraysCount);
    let value = [];
    for (let i = 0; i < arraysCount; i++) {
        value.push([]);
    }
    return value;
}

function createArrayFromNested2ArraysOneElements(array, elementTh) {
    elementTh = getValidSearchTh(elementTh);
    let value = [];
    for (const element of getValidArray(array)) {
        value.push(element[elementTh]);
    }
    return value;
}

function createArrayFromNested2ObjectsOneFields(array, fieldName) {
    fieldName = getValidString(fieldName);
    let value = [];
    for (const element of getValidArray(array)) {
        value.push(element[fieldName]);
    }
    return value;
}

function createArrayFromIntegerArrayElementsFieldsMultiply(array, multiply) {
    multiply = getValidInteger(multiply);
    let value = [];
    for (const element of getValidArray(array)) {
        const validIntegerElement = getValidInteger(element);
        value.push(validIntegerElement * multiply);
    }
    return value;
}

function createArrayFromStringElements(string) {
    let array = [];
    for (const element of getValidString(string)) {
        array.push(element);
    }
    return array;
}

function stringifyArrayElements(array) {
    let value = "";
    for (const element of getValidArray(array)) {
        value += element;
    }
    return value;
}

export function createArrayFromOneElement(element, length) {
    let array = [];
    for (let i = 0; i < getValidInteger(length); i++) {
        array.push(element);
    }
    return array;
}

function getRepeatedConnectedArraysCountFromLength(array, length) {
    array = getValidArray(array);
    length = getValidInteger(length);
    let value = 0;
    let i = 0;
    while (i < length) {
        if (i < (length - array.length)) {
            i += array.length;
            value++;
        } else {
            value++;
            break;
        }
    }
    return value;
}

export function getRepeatedConnectedArraysLengthFromSubArraysCount(array, arraysCount, fromIndex, toIndex) {
    array = getValidArray(array);
    arraysCount = validateIntegerWithMin(arraysCount, 0);
    fromIndex = validateInteger(fromIndex, 0, array.length - 1);
    toIndex = validateInteger(toIndex, 0, array.length - 1);
    let value = 0;
    if (arraysCount > 0 && fromIndex <= toIndex) {
        const firstSubArrayLength = array.length - 1 - fromIndex;
        if (arraysCount > 1) {
            const lastSubArrayLength = array.length - 1 - toIndex;
            for (let i = 0; i < arraysCount; i++) {
                if (i > 0) {
                    if (i < arraysCount - 1) {
                        value += array.length;
                    } else {
                        value += lastSubArrayLength;
                    }
                } else {
                    value += firstSubArrayLength;
                }
            }
        } else if (fromIndex < toIndex) {
            value = firstSubArrayLength;
        }
    }
    return value;
}

function getLastArrayLengthFromRepeatedConnectedArraysCountFromLength(array, length) {
    array = getValidArray(array);
    length = getValidInteger(length);
    const repeatedConnectedArraysCount = getRepeatedConnectedArraysCountFromLength(array, length);
    const wholeArraysLengthIfNotJustWholeArrays = array.length * (repeatedConnectedArraysCount - 1);
    let value = 0;
    if (length > 0) {
        value = createIfAndElseAndReturns(isValidInteger(length / array.length), array.length, length - wholeArraysLengthIfNotJustWholeArrays);
    }
    return value;
}

function getLastArrayFromRepeatedConnectedArraysFromLength(array, length) {
    array = getValidArray(array);
    length = getValidInteger(length);
    const lastArrayLength = getLastArrayLengthFromRepeatedConnectedArraysCountFromLength(array, length);
    let value = [];
    if (length > 0) {
        const toIndex = lastArrayLength - 1;
        value = subArrayWithToIndex(array, toIndex);
    }
    return value;
}

function createSubRepeatedConnectedArrays(array, arraysCount, fromIndex, toIndex) {
    array = getValidArray(array);
    arraysCount = getValidInteger(arraysCount);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    let value = [];
    if (arraysCount > 0) {
        if (arraysCount > 1) {
            for (let i = 0; i < arraysCount; i++) {
                const addableArrayIfIGreaterThan0 = createIfAndElseAndReturns(i < arraysCount - 1, array, subArrayWithToIndex(array, toIndex));
                let addableArray = createIfAndElseAndReturns(i > 0, addableArrayIfIGreaterThan0, subArrayWithFromIndex(array, fromIndex));
                value = addNewArrayToAfterOfTheArray(value, addableArray);
            }
        } else {
            value = subArray(array, fromIndex, toIndex);
        }
    }
    return value;
}

function createRepeatedConnectedArraysWithFromIndex(array, arraysCount, fromIndex) {
    array = getValidArray(array);
    arraysCount = getValidInteger(arraysCount);
    fromIndex = getValidInteger(fromIndex);
    const lastArrayLength = getLastArrayLengthFromRepeatedConnectedArraysCountFromLength(array, length);
    return createSubRepeatedConnectedArrays(array, arraysCount, fromIndex, array.length - 1);
}

export function createSubRepeatedConnectedArraysWithLength(array, length, fromIndex, toIndex) {
    const arraysCount = getRepeatedConnectedArraysCountFromLength(array, length);
    return createSubRepeatedConnectedArrays(array, arraysCount, fromIndex, toIndex);
}

function createRepeatedConnectedArraysWithLength(array, length, fromIndex, toIndex) {
    const arraysCount = getRepeatedConnectedArraysCountFromLength(array, length);
    return createSubRepeatedConnectedArrays(array, arraysCount, fromIndex, toIndex);
}

function createStringOfOneSearch(search, length) {
    return stringifyArrayElements(createArrayFromOneElement(search, length));
}

function addNumberArrayElements(numberArray) {
    let value = 0;
    for (const element of getValidArray(numberArray)) {
        value += getValidNumber(element);
    }
    return value;
}

function addSubNumberArrayElements(numberArray, fromIndex, toIndex) {
    return addNumberArrayElements(subArray(numberArray, fromIndex, toIndex));
}

function addSubNumberArrayWithFromIndexElements(numberArray, fromIndex) {
    return addSubNumberArrayElements(numberArray, fromIndex, numberArray.length - 1);
}

function addSubNumberArrayWithToIndexElements(numberArray, toIndex) {
    return addSubNumberArrayElements(numberArray, 0, toIndex);
}

function subarray(array, fromIndex, toIndex) {
    array = getValidArray(array);
    const validFromAndToIndex = validateStartAndEndIntegers(0, array.length, fromIndex, toIndex);
    fromIndex = validFromAndToIndex[0];
    toIndex = validFromAndToIndex[1];
    let value = [];
    for (let i = fromIndex; i < toIndex; i++) {
        value.push(array[i]);
    }
    return value;
}

export function subArray(array, fromIndex, toIndex) {
    let value = [];
    array = getValidArray(array);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    if (!isEmptyArray(array) && toIndex + 1 !== fromIndex) {
        value = subarray(array, fromIndex, toIndex + 1);
    }
    return value;
}

export function subArrayWithFromIndex(array, fromIndex) {
    return subArray(array, fromIndex, array.length - 1);
}

export function subArrayWithToIndex(array, toIndex) {
    return subArray(array, 0, toIndex);
}

function addNewArrayToAfterOfTheArray(array, newArray) {
    const value = getValidArray(array);
    for (const element of getValidArray(newArray)) {
        value.push(element);
    }
    return value;
}

function removeSubArrayInArray(array, fromIndex, toIndex) {
    return addNewArrayToAfterOfTheArray(subArrayWithToIndex(array, fromIndex - 1), subArrayWithFromIndex(array, toIndex + 1));
}

function removeElementInArray(array, index) {
    return removeSubArrayInArray(array, index, index);
}

function placeNewArrayToTheArray(array, newArray, index) {
    array = getValidArray(array);
    newArray = getValidArray(newArray);
    const newArrayEndIndex = getValidInteger(index) + newArray.length - 1;
    index = validateIntegerWithMax(index, newArrayEndIndex);
    const beforeFromIndex = subArrayWithToIndex(array, index - 1);
    const afterFromIndex = subArrayWithFromIndex(array, index);
    const newArrayAndAfterFromIndex = addNewArrayToAfterOfTheArray(newArray, afterFromIndex);
    return addNewArrayToAfterOfTheArray(beforeFromIndex, newArrayAndAfterFromIndex);
}

function placeObjectToTheArray(array, object, index) {
    return placeNewArrayToTheArray(array, [object], index);
}

function placeIntegerToTheIntegersArray(integersArray, integer, index) {
    index = getValidInteger(index);
    const isValid = isIntegersArray(integersArray) && isStringInteger(integer);
    const ifValid = placeObjectToTheArray(integersArray, integer, index);
    return createIfAndElseAndReturns(isValid, ifValid, integersArray);
}

export function placeIntegerToTheIncreasingIntegersArray(integersArray, integer) {
    const isEmpty = isEmptyArray(integersArray);
    const isValidIntegersArray = isIntegersArray(integersArray);
    const isValidIncreasingIntegersArray = isIncreasingIntegersArray(integersArray);
    const isValidArray = createIfAndElseAndReturns(integersArray.length === 1, isValidIntegersArray, isValidIncreasingIntegersArray);
    const isIntegerNotEqualsIntegerArrayElement = isObjectNotEqualsSomeElementOfArray(integer, integersArray);
    const isValid = isIntegerNotEqualsIntegerArrayElement && isValidArray && isValidInteger(integer);
    let value = createIfAndElseAndReturns(isEmpty, [integer], integersArray);
    if (isValid) {
        const {length} = integersArray;
        for (let i = 0; i < length; i++) {
            const element = integersArray[i];
            if (integer < element) {
                value = placeObjectToTheArray(integersArray, integer, i);
                break;
            }
            if (integer > element || i + 1 === length) {
                value.push(integer);
                break;
            }
        }
    }
    return value;
}

function replaceObjectToTheArray(array, object, index) {
    array = removeElementInArray(array, index);
    return placeObjectToTheArray(array, object, index);
}

function replaceNewArrayToTheArray(array, newArray, index) {
    array = removeElementInArray(array, index);
    return placeNewArrayToTheArray(array, newArray, index);
}

function isDigit(char) {
    return isCharEqualsCharacterOfText(char, DIGITS);
}

function isCharEqualsSomeElementOfDigits(char, digits) {
    let value = false;
    for (const element of digits) {
        value = char === element;
    }
    return value;
}

function getPositiveNumber(number) {
    return createIfAndElseAndReturns(number < 0, -number, number);
}

function getPositiveInteger(integer) {
    return getPositiveNumber(getValidInteger(integer));
}

function getHalfInteger(number) {
    number = getValidNumber(number);
    const isDivisibleBy2 = (number + 1) % 2 === 0;
    const ifDivisibleBy2 = ((number + 1) / 2) - 1;
    const ifNotDivisibleBy2 = createIfAndElseAndReturns(number % 2 === 0, number / 2, number);
    return createIfAndElseAndReturns(isDivisibleBy2, ifDivisibleBy2, ifNotDivisibleBy2);
}

function getQuarterInteger(number) {
    return getHalfInteger(getHalfInteger(number));
}

function getThreeQuarterInteger(number) {
    return getHalfInteger(number) + getQuarterInteger(number + 1);
}

function getEighthInteger(number) {
    return getHalfInteger(getQuarterInteger(number));
}

function getThreeEighthsInteger(number) {
    return getQuarterInteger(number) + getEighthInteger(number + 2);
}

function getFiveEighthsInteger(number) {
    return getHalfInteger(number) + getEighthInteger(number + 2);
}

function getSevenEighthsInteger(number) {
    return getThreeQuarterInteger(number) + getEighthInteger(number + 2);
}

function getSixteenthInteger(number) {
    return getQuarterInteger(getQuarterInteger(number));
}

function getThreeSixteenthsInteger(number) {
    return getEighthInteger(number) + getSixteenthInteger(number + 4);
}

function getFiveSixteenthsInteger(number) {
    return getQuarterInteger(number) + getSixteenthInteger(number + 4);
}

function getSevenSixteenthsInteger(number) {
    return getThreeEighthsInteger(number) + getSixteenthInteger(number + 4);
}

function getNineSixteenthsInteger(number) {
    return getHalfInteger(number) + getSixteenthInteger(number + 4);
}

function getElevenSixteenthsInteger(number) {
    return getFiveEighthsInteger(number) + getSixteenthInteger(number + 4);
}

function getThirteenSixteenthsInteger(number) {
    return getThreeQuarterInteger(number) + getSixteenthInteger(number + 4);
}

function getFifteenthSixteenthsInteger(number) {
    return getSevenEighthsInteger(number) + getSixteenthInteger(number + 4);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(positiveReferenceNumber, numberType, positiveNumber) {
    const possibleParameters = minToMaxNumberWithNumberTypePossibleParameters;
    let value = 0;
    positiveReferenceNumber = getValidInteger(positiveReferenceNumber);
    numberType = getValidString(numberType);
    positiveNumber = getValidInteger(positiveNumber);
    if (numberType === possibleParameters[0]) {
        value = getHalfInteger(positiveNumber) + getQuarterInteger(positiveReferenceNumber + 1);
    } else if (numberType === possibleParameters[1]) {
        value = getThreeQuarterInteger(positiveNumber) + getEighthInteger(positiveReferenceNumber + 2);
    } else if (numberType === possibleParameters[2]) {
        value = getQuarterInteger(positiveNumber) + getThreeEighthsInteger(positiveReferenceNumber + 2);
    } else if (numberType === possibleParameters[3]) {
        value = getSevenEighthsInteger(positiveNumber) + getSixteenthInteger(positiveReferenceNumber + 4);
    } else if (numberType === possibleParameters[4]) {
        value = getFiveEighthsInteger(positiveNumber) + getThreeSixteenthsInteger(positiveReferenceNumber + 4);
    } else if (numberType === possibleParameters[5]) {
        value = getThreeEighthsInteger(positiveNumber) + getFiveSixteenthsInteger(positiveReferenceNumber + 4);
    } else if (numberType === possibleParameters[6]) {
        value = getEighthInteger(positiveNumber) + getSevenSixteenthsInteger(positiveReferenceNumber + 4);
    }
    return createIfAndElseAndReturns(positiveReferenceNumber >= 0 && positiveNumber >= 0 && positiveNumber <= positiveReferenceNumber, value, 0);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetweenReferenceNumberAndOutOfOneOfDoubleReferenceNumber(positiveReferenceNumber, numberType, positiveNumber) {
    positiveReferenceNumber = getValidInteger(positiveReferenceNumber);
    positiveNumber = getValidInteger(positiveNumber);
    return createIfAndElseAndReturns(positiveReferenceNumber >= 0 && positiveNumber >= positiveReferenceNumber && positiveNumber <= (positiveReferenceNumber * 2) - 1, validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(positiveReferenceNumber, numberType, positiveReferenceNumber - (positiveNumber - positiveReferenceNumber)), 0);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndOutOfOneOfDoubleReferenceNumber(positiveReferenceNumber, numberType, positiveNumber) {
    let value = 0;
    positiveReferenceNumber = getValidInteger(positiveReferenceNumber);
    positiveNumber = getValidInteger(positiveNumber);
    if (positiveNumber >= 0 && positiveNumber <= (positiveReferenceNumber * 2) - 1) {
        if (positiveNumber <= positiveReferenceNumber) {
            value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(positiveReferenceNumber, numberType, positiveNumber);
        } else if (positiveNumber >= positiveReferenceNumber) {
            value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetweenReferenceNumberAndOutOfOneOfDoubleReferenceNumber(positiveReferenceNumber, numberType, positiveNumber);
        }
    }
    return value;
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberGreaterThanOrEquals0(positiveReferenceNumber, numberType, positiveNumber) {
    let value = 0;
    positiveReferenceNumber = getValidInteger(positiveReferenceNumber);
    positiveNumber = getValidInteger(positiveNumber);
    if (positiveNumber >= 0) {
        const max = (positiveReferenceNumber * 2) - 1;
        let i = positiveNumber;
        if (positiveNumber > max) {
            while (i > max) {
                i -= max;
            }
        }
        value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndOutOfOneOfDoubleReferenceNumber(positiveReferenceNumber, numberType, i);
    }
    return value;
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0(positiveReferenceNumber, numberType, number) {
    positiveReferenceNumber = getValidInteger(positiveReferenceNumber);
    number = getPositiveInteger(number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberGreaterThanOrEquals0(positiveReferenceNumber, numberType, number);
}

function validateIntegerWithNumberType(referenceNumber, numberType, number) {
    referenceNumber = getValidInteger(referenceNumber);
    number = getValidInteger(number);
    const positiveReferenceNumber = createIfAndElseAndReturns(referenceNumber < 0, -referenceNumber, referenceNumber);
    const positiveNumber = createIfAndElseAndReturns(referenceNumber < 0, -number, number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0(positiveReferenceNumber, numberType, positiveNumber);
}

function getMinToMaxIntegerWithNumberType(referenceNumber, numberType, number) {
    referenceNumber = getValidInteger(referenceNumber);
    number = getValidInteger(number);
    const valueIfPositiveReferenceNumber = validateIntegerWithNumberType(referenceNumber, numberType, number);
    const valueIfNegativeOr0ReferenceNumber = createIfAndElseAndReturns(referenceNumber < 0, -validateIntegerWithNumberType(-referenceNumber, numberType, -number), 0);
    return createIfAndElseAndReturns(referenceNumber > 0, valueIfPositiveReferenceNumber, valueIfNegativeOr0ReferenceNumber);
}

function getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, numberTypeIndex, number) {
    return getMinToMaxIntegerWithNumberType(referenceNumber, minToMaxNumberWithNumberTypePossibleParameters[numberTypeIndex], number);
}

function getQuarterToThreeQuarterInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 0, number);
}

function getEighthToSevenEighthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 1, number);
}

function getThreeEighthsToFiveEighthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 2, number);
}

function getSixteenthToFifteenSixteenthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 3, number);
}

function getThreeSixteenthsToThirteenSixteenthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 4, number);
}

function getFiveSixteenthsToElevenSixteenthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 5, number);
}

function getSevenSixteenthsToNineSixteenthsInteger(referenceNumber, number) {
    return getMinToMaxIntegerWithNumberTypeIndex(referenceNumber, 6, number);
}

function getNumberWithNumberType(numberType, number) {
    const possibleParameters = numberWithNumberTypePossibleParameters;
    let value = 0;
    numberType = getValidString(numberType);
    if (numberType === possibleParameters[0]) {
        value = getHalfInteger(number);
    } else if (numberType === possibleParameters[1]) {
        value = getQuarterInteger(number);
    } else if (numberType === possibleParameters[2]) {
        value = getThreeQuarterInteger(number);
    } else if (numberType === possibleParameters[3]) {
        value = getEighthInteger(number);
    } else if (numberType === possibleParameters[4]) {
        value = getThreeEighthsInteger(number);
    } else if (numberType === possibleParameters[5]) {
        value = getFiveEighthsInteger(number);
    } else if (numberType === possibleParameters[6]) {
        value = getSevenEighthsInteger(number);
    } else if (numberType === possibleParameters[7]) {
        value = getSixteenthInteger(number);
    } else if (numberType === possibleParameters[8]) {
        value = getThreeSixteenthsInteger(number);
    } else if (numberType === possibleParameters[9]) {
        value = getFiveSixteenthsInteger(number);
    } else if (numberType === possibleParameters[10]) {
        value = getSevenSixteenthsInteger(number);
    } else if (numberType === possibleParameters[11]) {
        value = getNineSixteenthsInteger(number);
    } else if (numberType === possibleParameters[12]) {
        value = getElevenSixteenthsInteger(number);
    } else if (numberType === possibleParameters[13]) {
        value = getThirteenSixteenthsInteger(number);
    } else if (numberType === possibleParameters[14]) {
        value = getFifteenthSixteenthsInteger(number);
    }
    return value;
}

function getNumberWithNumberTypeIndex(numberTypeIndex, number) {
    return getNumberWithNumberType(numberWithNumberTypePossibleParameters[numberTypeIndex], number);
}

function getIntegerWithType(type, referenceInteger, integerType, integer) {
    const possibleParameters = numberWithTypePossibleParameters;
    let numberTypeValue = 0;
    if (type === possibleParameters[0] && referenceInteger === null) {
        numberTypeValue = getNumberWithNumberType(integerType, integer);
    } else if (type === possibleParameters[1]) {
        numberTypeValue = getMinToMaxIntegerWithNumberType(referenceInteger, integerType, integer);
    }
    return numberTypeValue;
}

function getReverseArray(array) {
    array = getValidArray(array);
    let value = [];
    if (array !== null) {
        const {length} = array;
        for (let i = 0; i < length; i++) {
            value.push(array[length - 1 - i]);
        }
    }
    return value;
}

function validateNumberWithMin(number, min) {
    min = getValidNumber(min);
    if (number < min) {
        number = min;
    }
    return number;
}

function validateNumberWithMax(number, max) {
    max = getValidNumber(max);
    if (number > max) {
        number = max;
    }
    return number;
}

function validateIntegerWithMin(integer, min) {
    return getValidInteger(validateNumberWithMin(integer, min));
}

function validateIntegerWithMax(integer, max) {
    return getValidInteger(validateNumberWithMax(integer, max));
}

function validateMinAndMaxIntegers(min, max) {
    min = getValidInteger(min);
    max = getValidInteger(max);
    if (max < min) {
        const i = min;
        min = max;
        max = i;
    }
    return [min, max];
}

export function validateNumber(number, min, max) {
    number = getValidNumber(number);
    const validMinAndMax = validateMinAndMax(min, max);
    min = validMinAndMax[0];
    max = validMinAndMax[1];
    let value = number;
    if (number < min) {
        value = min;
    } else if (number > max) {
        value = max;
    }
    return value;
}

function validateInteger(integer, min, max) {
    return getValidInteger(validateNumber(integer, min, max));
}

function validateStartAndEnd(min, max, start, end) {
    start = validateNumber(start, min, max);
    end = validateNumber(end, min, max);
    return [start, end];
}

function validateStartAndEndIntegers(min, max, start, end) {
    start = validateInteger(start, min, max);
    end = validateInteger(end, min, max);
    return [start, end];
}

function replaceAllSearchInString(string, search, replace) {
    string = getValidString(string);
    search = getValidString(search);
    replace = getValidString(replace);
    const containsSearchsCount = StringManipulation.containsSearchCount(string, search);
    let value = string;
    for (let i = 0; i < containsSearchsCount; i++) {
        value = value.replace(search, replace);
    }
    return value;
}

function replaceAllSearchsArrayElementsToReplaceArrayElementsInString(string, searchsArray, replaceArray) {
    searchsArray = getValidArray(searchsArray);
    replaceArray = getValidArray(replaceArray);
    const containsSearchsCount = StringManipulation.containsSearchsArrayElementsCount(string, searchsArray);
    let value = getValidString(string);
    for (let i = 0; i < containsSearchsCount; i++) {
        const search = searchsArray[i];
        const replace = replaceArray[i];
        value = replaceAllSearchInString(value, search, replace);
    }
    return value;
}

function replaceAllSearchsArrayElementsToReplaceInString(string, searchsArray, replace) {
    string = getValidString(string);
    searchsArray = getValidArray(searchsArray);
    const containsSearchsCount = StringManipulation.containsSearchsArrayElementsCount(string, searchsArray);
    let value = string;
    for (let i = 0; i < containsSearchsCount; i++) {
        const search = searchsArray[i];
        value = value.replace(search, getValidString(replace));
    }
    return value;
}

function removeConsecutiveReverseMatchingSearchsInString(string, search, fromSearchTh) {
    string = getValidString(string);
    const fromSearchThIndex = getSearchThIndexOfString(string, search, fromSearchTh);
    const containsConsecutiveReverseMatchingSearchsCount = containsConsecutiveReverseMatchingSearchsCountInString(string, search, fromSearchThIndex);
    const toSearchTh = fromSearchTh - (containsConsecutiveReverseMatchingSearchsCount - 1);
    return removeConsecutiveMatchingSearchsInString(string, search, toSearchTh);
}

function getSearchsIndexesInString(string, search) {
    string = getValidString(string);
    search = getValidString(search);
    const {length} = string;
    const stringManipulation = new StringManipulation(string);
    let containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let value = [];
    let i = 0;
    if (containsSearchsCount > 0) {
        while (i < length) {
            const searchPart = StringPart.subString(string, i, i + search.length - 1);
            const isSearch = searchPart === search;
            if (isSearch) {
                value.push(i);
                containsSearchsCount--;
                i++;
            } else {
                if (containsSearchsCount > 0) {
                    i++;
                } else {
                    break;
                }
            }
        }
    }
    return value;
}

function getOutsideOfConsecutiveMatchingSearchsPartsIndexesFromString(string, search) {
    const {length} = string;
    const partsIndexAndEndIndexArraysInArray = createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search);
    const {length: indexesCount} = partsIndexAndEndIndexArraysInArray;
    const firstSearch = StringPart.subStringWithToIndex(string, search.length - 1);
    const searchIndex = getStringIndexOf(string, search);
    const isFirstSearch = searchIndex === 0 && firstSearch === search;
    let value = createIfAndElseAndReturns(isFirstSearch, [], [0]);
    for (let i = 0; i < indexesCount; i++) {
        const index = partsIndexAndEndIndexArraysInArray[i][1];
        if (i + 1 < indexesCount || index + 1 !== length) {
            value.push(index + 1);
        } else {
            break;
        }
    }
    return value;
}

function getSearchIndexOrNearestFollowingSearchIndexInString(string, search, index) {
    search = getValidString(search);
    index = getValidInteger(index);
    const {length} = getValidString(string);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const isContainsSearch = containsSearchsCount > 0;
    const searchIndex = getStringIndexOf(string, search);
    const searchsIndexes = getSearchsIndexesInString(string, search);
    const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
    let value = -1;
    if (!isEmptyString(string) && isContainsSearch && index > -1 && index <= lastSearchIndex) {
        value = searchIndex;
        let i = index;
        while (i < length) {
            const searchPart = StringPart.subString(string, i, i + search.length - 1);
            const isSearch = searchPart === search;
            if (isSearch) {
                value = i;
                break;
            } else {
                i++;
            }
        }
    }
    return value;
}

function getSearchIndexOrNearestPreviousSearchIndexInString(string, search, index) {
    search = getValidString(search);
    index = getValidInteger(index);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const isContainsSearch = containsSearchsCount > 0;
    const searchIndex = getStringIndexOf(string, search);
    const searchsIndexes = getSearchsIndexesInString(string, search);
    const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
    let value = -1;
    if (!isEmptyString(string) && isContainsSearch && index > -1 && index <= lastSearchIndex) {
        value = searchIndex;
        let i = index;
        while (i > -1) {
            const searchPart = StringPart.subString(string, i, i + search.length - 1);
            const isSearch = searchPart === search;
            if (isSearch) {
                value = i;
                break;
            } else {
                i--;
            }
        }
    }
    return value;
}

function getConsecutiveMatchingSearchsPartsSearchsCountsInString(string, search) {
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
    let value = [];
    for (const element of partsIndexes) {
        const containsPartSearchsCount = containsConsecutiveMatchingSearchsCountInString(string, search, element);
        value.push(containsPartSearchsCount);
    }
    return value;
}

function createConsecutiveMatchingSearchsPartsIndexAndCountArraysInArrayFromString(string, search) {
    const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
    const partsSearchsCounts = getConsecutiveMatchingSearchsPartsSearchsCountsInString(string, search);
    let value = [];
    for (let i = 0; i < partsCount; i++) {
        value.push([partsIndexes[i], partsSearchsCounts[i]]);
    }
    return value;
}

export function createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search) {
    const partsIndexAndCountArraysInArray = createConsecutiveMatchingSearchsPartsIndexAndCountArraysInArrayFromString(string, search);
    let value = [];
    for (let i = 0; i < partsIndexAndCountArraysInArray.length; i++) {
        const indexAndCountArrays = partsIndexAndCountArraysInArray;
        const index = indexAndCountArrays[i][0];
        const count = indexAndCountArrays[i][1];
        value.push([index, index + count - 1]);
    }
    return value;
}

export function getOutsideOfConsecutiveMatchingSearchsPartsFromString(string, search) {
    let stringPart = new StringPart(string);
    const containsSearchsCount = stringPart.containsSearchsCount(search);
    const isContainsSearch = containsSearchsCount > 0;
    const partsIndexAndEndIndexArraysInArray = createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search);
    const {length} = partsIndexAndEndIndexArraysInArray;
    const firstSearch = stringPart.subStringWithToIndex(search.length - 1);
    const searchIndex = getStringIndexOf(string, search);
    const isFirstSearch = searchIndex === 0 && firstSearch === search;
    const firstOutsidePartIfContainsSearch = stringPart.subStringWithToIndex(searchIndex - 1);
    const firstOutsidePart = createIfAndElseAndReturns(isContainsSearch, firstOutsidePartIfContainsSearch, string);
    let value = createIfAndElseAndReturns(isFirstSearch, [], [firstOutsidePart]);
    if (isContainsSearch) {
        for (let i = 0; i < length; i++) {
            const indexAndEndIndexArrays = partsIndexAndEndIndexArraysInArray;
            const index = indexAndEndIndexArrays[i][1];
            if (i + 1 < length) {
                const afterIndex = indexAndEndIndexArrays[i + 1][0];
                const fromIndex = index + 1;
                const toIndex = afterIndex - 1;
                stringPart = new StringPart(string);
                const outsidePart = stringPart.subString(fromIndex, toIndex);
                value.push(outsidePart);
            } else {
                if (index + 1 === string.length) {
                    break;
                } else {
                    stringPart = new StringPart(string);
                    const outsideLastPart = stringPart.subStringWithFromIndex(index + 1);
                    value.push(outsideLastPart);
                }
            }
        }
    }
    return value;
}

function createOutsideAndConsecutiveMatchingSearchsPartIndexesArrayFromString(string, search) {
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(string, search);
    const length = partsIndexes.length + outsideParts.length;
    const searchIndex = getStringIndexOf(string, search);
    const isFirstSearch = searchIndex === 0;
    let value = createIfAndElseAndReturns(isFirstSearch, [], [outsideParts[0]]);
    let partsIndexesCounter = 0;
    let outsidePartsCounter = 0;
    let counter = 0;
    while (!isEmptyString(string) && counter < length) {
        const partIndex = partsIndexes[partsIndexesCounter];
        const outsidePart = outsideParts[outsidePartsCounter];
        const isCounterHalfable = counter % 2 === 0;
        const elementIfCounterHalfable = createIfAndElseAndReturns(isFirstSearch, partIndex, outsidePart);
        const elementIfCounterNotHalfable = createIfAndElseAndReturns(isFirstSearch, outsidePart, partIndex);
        let element = isCounterHalfable ? elementIfCounterHalfable : elementIfCounterNotHalfable;
        if (counter + 1 < length) {
            const counterHalfableFirst = createIfAndElseAndReturns(isCounterHalfable, 1, 0);
            const counterHalfableSecond = createIfAndElseAndReturns(isCounterHalfable, 0, 1);
            partsIndexesCounter += isFirstSearch ? counterHalfableFirst : counterHalfableSecond;
            outsidePartsCounter += isFirstSearch ? counterHalfableSecond : counterHalfableFirst;
        }
        value.push(element);
        counter++;
    }
    return value;
}

function removeConsecutiveMatchingSearchsPartInString(string, search, partTh) {
    const isValidParameters = isValidSearchThInStringParameters(string, search, partTh);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    const isContainsSearch = containsSearchsCount > 0;
    const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
    const isValid = isValidParameters && isContainsSearch && partTh > 0 && partTh <= partsCount;
    let value = string;
    if (isValid) {
        const partIndex = partsIndexes[partTh - 1];
        const partLength = containsConsecutiveMatchingSearchsCountInString(string, search, partIndex);
        value = stringManipulation.removeSubStringWithLength(partIndex, partLength);
    }
    return value;
}

function removeCharWithIndexInString(string, charIndex) {
    const stringManipulation = new StringManipulation(string);
    return stringManipulation.removeSubString(charIndex, charIndex);
}

function replaceStringFromSubString(string, fromIndex, toIndex, replace) {
    const stringPart = new StringPart(string);
    const beforeReplacePart = stringPart.subStringWithToIndex(fromIndex);
    const afterReplacePart = stringPart.subStringWithFromIndex(toIndex);
    return beforeReplacePart + replace + afterReplacePart;
}

function placeStringFromIndexInString(string, index, place) {
    const stringPart = new StringPart(string);
    const beforePlacePart = stringPart.subStringWithToIndex(index - 1);
    const afterPlacePart = stringPart.subStringWithFromIndex(index);
    return beforePlacePart + place + afterPlacePart;
}

function replaceStringFromIndexInString(string, charIndex, replace) {
    return replaceStringFromSubString(string, charIndex, charIndex, replace);
}

function drawDiagonalLineLeftAndDown(moveX, moveY, length) {
    drawLine(moveX, moveY, moveX - length, moveY + length);
}

function drawDiagonalLineLeftAndUp(moveX, moveY, length) {
    drawLine(moveX, moveY, moveX - length, moveY - length);
}

function drawDiagonalLineRightAndDown(moveX, moveY, length) {
    drawLine(moveX, moveY, moveX + length, moveY + length);
}

function drawDiagonalLineRightAndUp(moveX, moveY, length) {
    drawLine(moveX, moveY, moveX + length, moveY - length);
}

function drawDiagonalColoredLineLeftAndDown(style, moveX, moveY, length) {
    drawColoredLine(style, moveX, moveY, moveX - length, moveY + length);
}

function drawDiagonalColoredLineLeftAndUp(style, moveX, moveY, length) {
    drawColoredLine(style, moveX, moveY, moveX - length, moveY - length);
}

function drawDiagonalColoredLineRightAndDown(style, moveX, moveY, length) {
    drawColoredLine(style, moveX, moveY, moveX + length, moveY + length);
}

function drawDiagonalColoredLineRightAndUp(style, moveX, moveY, length) {
    drawColoredLine(style, moveX, moveY, moveX + length, moveY - length);
}

function drawHorizontalLine(moveX, lineX, posY) {
    drawLine(moveX, posY, lineX, posY);
}

function drawVerticalLine(posX, moveY, lineY) {
    drawLine(posX, moveY, posX, lineY);
}

function drawHorizontalColoredLine(style, moveX, lineX, posY) {
    drawColoredLine(style, moveX, posY, lineX, posY);
}

function drawVerticalColoredLine(style, posX, moveY, lineY) {
    drawColoredLine(style, posX, moveY, posX, lineY);
}

function fillHorizontalRectWithCoordinates(fromX, posY, toX, height) {
    fillRectWithCoordinates(fromX, posY, toX, posY + height);
}

function fillHorizontalColoredRectWithCoordinates(style, fromX, posY, toX, height) {
    defaultFillStyle(style);
    fillHorizontalRectWithCoordinates(fromX, posY, toX, posY + height);
}

function fillHorizontalOneHighRectWithCoordinates(fromX, toX, posY) {
    fillHorizontalRectWithCoordinates(fromX, posY, toX, 1);
}

function fillHorizontalOneHighColoredRectWithCoordinates(style, fromX, toX, posY) {
    fillHorizontalColoredRectWithCoordinates(style, fromX, posY, toX, 1);
}

function defaultMoveTo(moveX, moveY) {
    context.moveTo(moveX, moveY);
}

function defaultLineTo(lineX, lineY) {
    context.lineTo(lineX, lineY);
}

function defaultLineWidth(value) {
    context.lineWidth = value;
}

function lineToWithLineWidth(lineX, lineY, lineWidth) {
    defaultLineWidth(lineWidth);
    defaultLineTo(lineX, lineY);
}

function defaultFillRect(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

function defaultStrokeStyle(value) {
    context.strokeStyle = value;
}

function defaultFillStyle(value) {
    context.fillStyle = value;
}

function strokeStyleAndFillStyle(strokeStyle, fillStyle) {
    defaultStrokeStyle(strokeStyle);
    defaultFillStyle(fillStyle);
}

function stroke() {
    context.stroke();
}

function strokeStyleAndStroke(strokeStyle) {
    defaultStrokeStyle(strokeStyle);
    stroke();
}

function fill() {
    context.fill();
}

function fillStyleAndFill(fillStyle) {
    defaultFillStyle(fillStyle);
    fill();
}

function strokeAndFill() {
    stroke();
    fill();
}

function strokeStyleAndFillStyleAndStrokeAndFill(strokeStyle, fillStyle) {
    strokeStyleAndFillStyle(strokeStyle, fillStyle);
    strokeAndFill();
}

function line(moveX, moveY, lineX, lineY) {
    defaultMoveTo(moveX, moveY);
    defaultLineTo(lineX, lineY);
}

function strokeLine(moveX, moveY, lineX, lineY) {
    line(moveX, moveY, lineX, lineY);
    stroke();
}

function coloredLine(style, moveX, moveY, lineX, lineY) {
    defaultStrokeStyle(style);
    line(moveX, moveY, lineX, lineY);
}

function strokeColoredLine(style, moveX, moveY, lineX, lineY) {
    coloredLine(style, moveX, moveY, lineX, lineY);
    stroke();
}

function drawLine(moveX, moveY, lineX, lineY) {
    context.beginPath();
    strokeLine(moveX, moveY, lineX, lineY);
}

function drawColoredLine(style, moveX, moveY, lineX, lineY) {
    defaultStrokeStyle(style);
    drawLine(moveX, moveY, lineX, lineY);
}

function fillRect(x, y, width, height) {
    context.beginPath();
    defaultFillRect(x, y, width, height);
}

export function fillColoredRect(style, x, y, width, height) {
    defaultFillStyle(style);
    fillRect(x, y, width, height);
}

function fillRectWithCoordinates(fromX, fromY, toX, toY) {
    fillRect(fromX, fromY, toX - fromX, toY - fromY);
}

function fillColoredRectWithCoordinates(style, fromX, fromY, toX, toY) {
    defaultFillStyle(style);
    fillRectWithCoordinates(fromX, fromY, toX, toY);
}

export function getElementById(elementId) {
    return document.getElementById(elementId);
}

export function getCanvasMousePos() {
    return window.getMousePos(canvas);
}

function isEmptyArray(array) {
    return getValidArray(array).length === 0;
}

function isEmptyArrays(...array) {
    let value = array.length > 0;
    array.forEach(element => {
        value = value && isEmptyArray(element);
    });
    return value;
}

function getArrayIndexOf(array, search) {
    return getValidArray(array).indexOf(search);
}

function getSearchThOfStringIndex(string, search, index) {
    string = getValidString(string);
    search = getValidString(search);
    index = getValidInteger(index);
    const {length} = string;
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
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

function containsConsecutiveReverseMatchingSearchsCountInString(string, search, lastSearchIndex) {
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

function getConsecutiveMatchingDigitsCountInString(string, startIndex) {
    string = getValidString(string);
    let value = 0;
    let i = getValidInteger(startIndex);
    while (i < string.length) {
        if (isDigit(string[i])) {
            i++;
            value++;
        } else {
            break;
        }
    }
    return value;
}

function isContainsSearchStringElementsInString(string, searchString) {
    return isContainsSearchArrayElementsInString(string, createArrayFromStringElements(searchString));
}

function isContainsSearchInArray(array, search) {
    return getArrayIndexOf(array, search) > -1;
}

function isContainsSearchCharOnIndexInString(string, searchChar, index) {
    string = getValidString(string);
    searchChar = getValidString(searchChar);
    const search = createIfAndElseAndReturns(searchChar.length === 1, searchChar, " ");
    const stringIndex = validateNumber(index, 0, string.length - 1);
    return isContainsSearchInString(string, search) && string[stringIndex] === searchChar;
}

function isContainsOneSearchOnIndexInArray(array, search, index) {
    return getValidArray(array)[validateNumber(index, 0, getValidArray(array).length - 1)] === search;
}

function isContainsOneSearchOnIndexInElements(search, index, ...elements) {
    return isContainsOneSearchOnIndexInArray(createArrayFromObjects(elements), search, index);
}

export function getSearchThIndexOfString(string, search, searchTh) {
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    const stringManipulation = new StringManipulation(string);
    const containsSearchsCount = stringManipulation.containsSearchsCount(search);
    let value = -1;
    if (containsSearchsCount > 0 && searchTh > 0 && searchTh <= containsSearchsCount) {
        let disassembledString = getValidString(string);
        for (let i = 1; i < searchTh; i++) {
            disassembledString = StringManipulation.removeSearchInString(disassembledString, search);
        }
        const isContainsSearch = isContainsSearchInString(disassembledString, search);
        const addCountOfSearchIndex = createIfAndElseAndReturns(isContainsSearch, (searchTh * search.length) - 1, 0);
        const ifContainsSearch = getStringIndexOf(disassembledString, search) + addCountOfSearchIndex;
        value = createIfAndElseAndReturns(isContainsSearch, ifContainsSearch, value) - (search.length - 1);
    }
    return value;
}

export function isContainsSearchArrayElementsInString(string, searchArray) {
    let value = true;
    for (const element of getValidArray(searchArray)) {
        value = value && isContainsSearchInString(string, element);
    }
    return value;
}

export function containsConsecutiveMatchingSearchsCountInString(string, search, firstSearchIndex) {
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

export function getValidSearchTh(searchTh) {
    if (!Number.isSafeInteger(searchTh) && !isValidNumber(Number(searchTh))) {
        searchTh = 1;
    } else {
        if (searchTh <= 0) {
            searchTh = 0;
        } else {
            searchTh = getValidInteger(searchTh);
        }
    }
    return searchTh;
}

export function isEmptyStrings(...strings) {
    let value = strings.length > 0;
    strings.forEach(element => {
        value = value && isEmptyString(element);
    });
    return value;
}

export function createIfAndElseAndReturns(condition, ifTrue, ifFalse) {
    if (condition) {
        return ifTrue;
    } else {
        return ifFalse;
    }
}
