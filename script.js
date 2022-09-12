// noinspection JSDeprecatedSymbols
window.getMousePos = (element) => ({
    x: event.clientX - element.getBoundingClientRect().left,
    y: event.clientY - element.getBoundingClientRect().top
});
window.canvas = null;
window.context = null;
const DIGITS = '0123456789';
const canvasWidthInputText = "canvas-width";
const canvasHeightInputText = "canvas-height";
const canvasWidthInput = document.getElementById(canvasWidthInputText);
const canvasHeightInput = document.getElementById(canvasHeightInputText);
const black = "#000000";
const white = "#ffffff";
const transparent = "rgba(0, 0, 0, 0)";
const half = 1 / 2;
const quarter = half / 2;
const threeQuarter = half + quarter;
const eighth = quarter / 2;
const threeEighths = quarter + eighth;
const fiveEighths = half + eighth;
const sevenEighths = threeQuarter + eighth;
const sixteenth = eighth / 2;
const lowercaseLettersAToZ = 'abcdefghijklmnopqrstuvwxyz';
const capitalLettersAToZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLettersAToF = subStringWithToIndex(lowercaseLettersAToZ, 5);
const capitalLettersAToF = subStringWithToIndex(capitalLettersAToZ, 5);
const digitsAndLowercaseLettersAToF = DIGITS + lowercaseLettersAToF;
const digitsAndCapitalLettersAToF = DIGITS + capitalLettersAToF;
const hexChars = DIGITS + lowercaseLettersAToF + capitalLettersAToF;
const hexStringLength = lowercaseLettersAToF.length;
const numberWithNumberTypePossibleParameters = ["half", "quarter", "three-quarter", "eighth", "three-eighths", "five-eighths", "seven-eighths", "sixteenth", "three-sixteenths", "five-sixteenths", "seven-sixteenths", "nine-sixteenths", "eleven-sixteenths", "thirteen-sixteenths", "fifteen-sixteenths"];
const minToMaxNumberWithNumberTypePossibleParameters = ["quarter to three-quarter", "eighth to seven-eighths", "three-eighths to five-eighths", "sixteenth to fifteen-sixteenths", "three-sixteenths to thirteen-sixteenths", "five-sixteenths to eleven-sixteenths", "seven-sixteenths to nine-sixteenths"];
const numberWithTypePossibleParameters = ["number", "min to max"];
const tHex = {};
tHex.min = 0;
tHex.max = 255;
tHex.numberWithTypeReferenceNumber = type => createIfAndElseAndReturns(type === numberWithTypePossibleParameters[0], null, createIfAndElseAndReturns(type === numberWithTypePossibleParameters[1], 256, 0));
tHex.isSearchEqualsMinToMaxWithNumberTypePossibleParametersSomeElement = function (search) {
    return isObjectEqualsSomeElementOfArray(getValidString(search), minToMaxNumberWithNumberTypePossibleParameters);
};
tHex.hexColor = hex => subStringWithFromIndex(hex, 1);
tHex.subStringHexPart = (hex, fromIndex) => subString(tHex.hexColor(hex), fromIndex, fromIndex + 1);
tHex.isHexColor = function (value) {
    const length = getValidString(value).length;
    return value !== null && isStringAllCharsEqualsMatchSomeOfCharsInText(value, hexChars) && (length === 3 || length === 6 || length === 8);
};
tHex.isHex = value => tHex.isHexColor(tHex.hexColor(value)) && value[0] === "#";
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
    if (integer >= 0 && integer <= 255) {
        value = integer;
    }
    return value;
};
tHex.validateIntegerIfIntegerBetween255And510 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= 255 && integer <= 510) {
        value = tHex.validateIntegerIfIntegerBetween0And255(255 - (integer - 255));
    }
    return value;
};
tHex.validateIntegerIfIntegerBetween0And510 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= 0 && integer <= 510) {
        if (integer <= 255) {
            value = tHex.validateIntegerIfIntegerBetween0And255(integer);
        } else if (integer >= 255) {
            value = tHex.validateIntegerIfIntegerBetween255And510(integer);
        }
    }
    return value;
};
tHex.validateIntegerIfIntegerGreaterThanOrEquals0 = function (integer) {
    let value = 0;
    integer = getValidInteger(integer);
    if (integer >= 0) {
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
    if (integer >= 0 && integer <= 255) {
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
tHex.convertRgbIntegersToHex = (red, green, blue) => subStringWithToIndex(tHex.convertRgbaIntegersToHex(red, green, blue, 255), 6);
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
tHex.getRgbTHexWithNumberType = (hex, type, numberType) => subStringWithToIndex(tHex.getRgbaTHexWithNumberType(hex + "ff", type, numberType), 6);
tHex.getRgbTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => subStringWithToIndex(tHex.getRgbaTHexWithTypeAndNumberTypeIndex(hex + "ff", type, numberTypeIndex), 6);
tHex.getRgbTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => subStringWithToIndex(tHex.getRgbaTHexWithTypeIndexAndNumberType(hex + "ff", typeIndex, numberType), 6);
tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => subStringWithToIndex(tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex + "ff", typeIndex, numberTypeIndex), 6);
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
    return getReverseString(digitsAndLowercaseLettersAToF).charAt(hexCharIndex);
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
    const referenceNumber = createIfAndElseAndReturns(type === possibleParameters[0], null, createIfAndElseAndReturns(type === possibleParameters[1], 256, 0));
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
tHex.getReverseRgbTHexWithNumberType = (hex, type, numberType) => subStringWithToIndex(tHex.getReverseRgbaTHexWithNumberType(hex + "ff", type, numberType), 6);
tHex.getReverseRgbTHexWithTypeAndNumberTypeIndex = (hex, type, numberTypeIndex) => subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeAndNumberTypeIndex(hex + "ff", type, numberTypeIndex), 6);
tHex.getReverseRgbTHexWithTypeIndexAndNumberType = (hex, typeIndex, numberType) => subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeIndexAndNumberType(hex + "ff", typeIndex, numberType), 6);
tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex = (hex, typeIndex, numberTypeIndex) => subStringWithToIndex(tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex + "ff", typeIndex, numberTypeIndex), 6);
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

console.log(tHex.convertHexPartToInteger("df"));
console.log("half, " + getHalfInteger(255));
console.log("quarter, " + getQuarterInteger(255));
console.log("threeQuarter, " + getThreeQuarterInteger(255));
console.log("eighth, " + getEighthInteger(255));
console.log("threeEighths, " + getThreeEighthsInteger(255));
console.log("fiveEighths, " + getFiveEighthsInteger(255));
console.log("sevenEighths, " + getSevenEighthsInteger(255));
console.log("sixteenth, " + getSixteenthInteger(255));
console.log("threeSixteenths, " + getThreeSixteenthsInteger(255));
console.log("fiveSixteenths, " + getFiveSixteenthsInteger(255));
console.log("sevenSixteenths, " + getSevenSixteenthsInteger(255));
console.log("nineSixteenths, " + getNineSixteenthsInteger(255));
console.log("elevenSixteenths, " + getElevenSixteenthsInteger(255));
console.log("thirteenSixteenths, " + getThirteenSixteenthsInteger(255));
console.log("fifteenSixteenths, " + getFifteenthSixteenthsInteger(255));
console.log("quarterToThreeQuarter, " + getQuarterToThreeQuarterInteger(255, 255));
console.log("eighthToSevenEighths, " + getEighthToSevenEighthsInteger(255, 255));
console.log("threeEighthsToFiveEighths, " + getThreeEighthsToFiveEighthsInteger(255, 255));
console.log("sixteenthToFifteenSixteenths, " + getSixteenthToFifteenSixteenthsInteger(255, 255));
console.log("threeSixteenthsToThirteenSixteenths, " + getThreeSixteenthsToThirteenSixteenthsInteger(255, 255));
console.log("fiveSixteenthsToElevenSixteenths, " + getFiveSixteenthsToElevenSixteenthsInteger(255, 255));
console.log("sevenSixteenthsToNineSixteenths, " + getSevenSixteenthsToNineSixteenthsInteger(255, 255));
console.log(tHex.getReverseRgbQuarterToThreeQuarterHex("#ffffff"));
console.log(tHex.convertHexToRgbArray("#3f3f3f"));

function isLowercaseLetterAToZ(letter) {
    return letter !== null && isCharEqualsCharacterOfText(letter, lowercaseLettersAToZ) && getValidString(letter).length === 1;
}

function isCapitalLetterAToZ(letter) {
    return letter !== null && isCharEqualsCharacterOfText(letter, capitalLettersAToZ) && getValidString(letter).length === 1;
}

function isLetterAToZ(letter) {
    return letter !== null && isCharEqualsCharacterOfText(letter, lowercaseLettersAToZ + capitalLettersAToZ) && getValidString(letter).length === 1;
}

function changeLowercaseLetterToUppercaseWithAToZ(letter) {
    let value = letter = getValidString(letter);
    if (isLetterAToZ(letter)) {
        if (isLowercaseLetterAToZ(letter)) {
            letter = capitalLettersAToZ[lowercaseLettersAToZ.indexOf(letter)];
        }
        value = letter;
    }
    return value;
}

function changeLowercaseLettersToUppercaseWithAToZ(letters) {
    let value = "";
    letters = getValidString(letters);
    for (const letter of letters) {
        value += createIfAndElseAndReturns(isLetterAToZ(letter), changeLowercaseLetterToUppercaseWithAToZ(letter), letter);
    }
    return value;
}

function changeLowercaseStringFirstLetterToUppercaseWithAToZ(string) {
    return changeLowercaseLetterToUppercaseWithAToZ(getValidString(string)[0]) + subStringWithFromIndex(string, 1);
}

function changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray) {
    let value = [];
    stringArray = getValidArray(stringArray);
    for (const element of stringArray) {
        value += changeLowercaseStringFirstLetterToUppercaseWithAToZ(getValidString(element));
    }
    return value;
}

function changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(string, search, searchTh) {
    const searchThBeforeIndex = getStringIndexOfSearchTh(string, search, searchTh) - 1;
    const searchThAfterIndex = searchThBeforeIndex + (getValidString(search).length + 1);
    return subStringWithToIndex(string, searchThBeforeIndex + 1) + changeLowercaseLetterToUppercaseWithAToZ(getValidString(string)[searchThAfterIndex]) + subStringWithFromIndex(string, searchThAfterIndex + 1);
}

function changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    return removeSearchThInString(changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(string, search, searchTh), search, searchTh);
}

function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchCountInString(string, search); i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZ(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchCountInString(string, search); i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(value, search, i);
    }
    return value;
}

function changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(stringArray) {
    return stringifyArrayElements(changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray));
}

function changeLowercaseStringsFirstLetterToUppercaseWithAToZ(...strings) {
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(createArrayOfObjects(strings));
}

function changeLowercaseStringsFirstLetterToUppercaseWithAToZAndStringifyElements(...strings) {
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(createArrayOfObjects(strings));
}

function isContainsCapitalLetterInString(string) {
    let value = false;
    for (const element of string) {
        if (isCapitalLetterAToZ(element)) {
            value = true;
            break;
        }
    }
    return value;
}

function getStringCapitalLetterIndex(string) {
    let letterIndex = -1;
    for (let i = 0; i < string.length; i++) {
        if (isCapitalLetterAToZ(string[i])) {
            letterIndex = i;
            break;
        }
    }
    return letterIndex;
}

function getStringCapitalLetter(string) {
    const stringChar = string[getStringCapitalLetterIndex(string)];
    return createIfAndElseAndReturns(typeof stringChar === "string", stringChar, "");
}

function removeCapitalLetterInString(string) {
    return removeSearchCharInString(string, getStringCapitalLetter(string));
}

function containsCapitalLetterCountInString(string) {
    let capitalLetterCounter = 0;
    let disassembledString = string;
    while (isContainsCapitalLetterInString(disassembledString)) {
        capitalLetterCounter++;
        disassembledString = removeCapitalLetterInString(disassembledString);
    }
    return capitalLetterCounter;
}

function isContainsCapitalLetterCountInString(string, capitalLetterCount) {
    return containsCapitalLetterCountInString(string) >= validateNumberWithMin(capitalLetterCount, 0);
}

function getStringCapitalLetterThIndex(string, capitalLetterTh) {
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

function changeUppercaseLetterToLowercaseWithAToZ(letter) {
    let value = letter = getValidString(letter);
    if (isLetterAToZ(letter)) {
        if (isCapitalLetterAToZ(letter)) {
            letter = lowercaseLettersAToZ[capitalLettersAToZ.indexOf(letter)];
        }
        value = letter;
    }
    return value;
}

function changeUppercaseLettersToLowercaseWithAToZ(letters) {
    let value = "";
    for (const letter of getValidString(letters)) {
        value += isLetterAToZ(letter) ? changeUppercaseLetterToLowercaseWithAToZ(letter) : letter;
    }
    return value;
}

function changeUppercaseStringFirstLetterToLowercaseWithAToZ(string) {
    return changeUppercaseLetterToLowercaseWithAToZ(getValidString(string)[0]) + subStringWithFromIndex(string, 1);
}

function changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray) {
    let value = [];
    stringArray = getValidArray(stringArray);
    for (const element of stringArray) {
        value += changeUppercaseStringFirstLetterToLowercaseWithAToZ(getValidString(element));
    }
    return value;
}

function changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(string, search, searchTh) {
    const searchThBeforeIndex = getStringIndexOfSearchTh(string, search, searchTh) - 1;
    const searchThAfterIndex = searchThBeforeIndex + (getValidString(search).length + 1);
    return subStringWithToIndex(string, searchThBeforeIndex + 1) + changeUppercaseLetterToLowercaseWithAToZ(getValidString(string)[searchThAfterIndex]) + subStringWithFromIndex(string, searchThAfterIndex + 1);
}

function changeStringUppercaseLetterThToLowercaseWithAToZ(string, capitalLetterTh) {
    const capitalLetterThIndex = getStringCapitalLetterThIndex(string, capitalLetterTh);
    return subStringWithToIndex(string, capitalLetterThIndex - 1) + changeUppercaseLetterToLowercaseWithAToZ(getValidString(string)[capitalLetterThIndex]) + subStringWithFromIndex(string, capitalLetterThIndex + 1);
}

function placeStringCapitalLetterThBeforeToPlace(string, capitalLetterTh, place) {
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    return createIfAndElseAndReturns(capitalLetterTh > 0, placeStringFromIndexInString(string, getStringCapitalLetterThIndex(string, capitalLetterTh), place), string);
}

function placeStringAllCapitalLetterThBeforeToPlace(string, place) {
    let value = string;
    for (let i = 1; i <= containsCapitalLetterCountInString(string); i++) {
        value = placeStringCapitalLetterThBeforeToPlace(value, i, place);
    }
    return value;
}

function placeStringCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(string, capitalLetterTh, place) {
    return changeStringUppercaseLetterThToLowercaseWithAToZ(placeStringCapitalLetterThBeforeToPlace(string, capitalLetterTh, place));
}

function placeStringAllCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(string, place) {
    let value = string;
    for (let i = 1; i <= containsCapitalLetterCountInString(string); i++) {
        value = placeStringCapitalLetterThBeforeToPlaceAndChangeUppercaseLetterThToLowercaseWithAToZ(value, 1, place);
    }
    return value;
}

function getStringCapitalLetterThToNextSearch(string, capitalLetterTh) {
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(capitalLetterTh > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, capitalLetterTh));
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((capitalLetterTh + 1) > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, getValidSearchTh(capitalLetterTh) + 1) - 1);
    const searchedStringStartIndex = createIfAndElseAndReturns(capitalLetterTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(capitalLetterTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringCapitalLetter(string) - 1);
    return subString(string, searchedStringStartIndex, searchedStringEndIndex);
}

function isStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, capitalLetterTh, afterSearch) {
    return getStringCapitalLetterThToNextSearch(string, capitalLetterTh) === getValidString(afterSearch);
}

function getStringAfterSearchIfStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, searchTh, afterSearch) {
    return createIfAndElseAndReturns(isStringAfterOfCapitalLetterThToNextSearchEqualsAfterSearch(string, searchTh, afterSearch), afterSearch, "");
}

function replaceStringCapitalLetterThToNextSearch(string, capitalLetterTh, replace) {
    capitalLetterTh = getValidSearchTh(capitalLetterTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(capitalLetterTh > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, capitalLetterTh) - 1);
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((capitalLetterTh + 1) > containsCapitalLetterCountInString(string), string.length, getStringCapitalLetterThIndex(string, getValidSearchTh(capitalLetterTh) + 1));
    const searchedStringStartIndex = createIfAndElseAndReturns(getValidSearchTh(capitalLetterTh) > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(getValidSearchTh(capitalLetterTh) > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringCapitalLetterIndex(string));
    return subStringWithToIndex(string, searchedStringStartIndex) + getValidString(replace) + subStringWithFromIndex(string, searchedStringEndIndex);
}

const gsłŁ$String = "gs-łŁ$í€Í€˛`-6666666-zgvuvvgvggvgvgz-bzbzbzbbzbzzzbbbzbzuuu-iffuffffufuuufffuuiiifit-gr";
const capitalLetter$String = changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(gsłŁ$String, "-");

console.log(containsCapitalLetterCountInString(capitalLetter$String));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 0));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 1));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 2));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 3));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 4));
console.log(getStringCapitalLetterThToNextSearch(capitalLetter$String, 5));
console.log(replaceStringCapitalLetterThToNextSearch(capitalLetter$String, 0, "_"));
console.log(replaceStringCapitalLetterThToNextSearch(capitalLetter$String, 1, "_"));
console.log(replaceStringCapitalLetterThToNextSearch(capitalLetter$String, 2, "_"));
console.log(replaceStringCapitalLetterThToNextSearch(capitalLetter$String, 3, "_"));
console.log(replaceStringCapitalLetterThToNextSearch(capitalLetter$String, 4, "_"));

function getStringAfterOfSearchThToNextSearch(string, search, searchTh) {
    searchTh = getValidSearchTh(searchTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchCountInString(string, search), string.length, getStringIndexOfSearchTh(string, search, searchTh) + 1);
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchCountInString(string, search), string.length, getStringIndexOfSearchTh(string, search, getValidSearchTh(searchTh) + 1) - 1);
    const searchedStringStartIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search) - 1);
    return subString(string, searchedStringStartIndex, searchedStringEndIndex);
}

function isStringAfterOfSearchThToNextSearchEqualsAfterSearch(string, search, searchTh, afterSearch) {
    return getStringAfterOfSearchThToNextSearch(string, search, searchTh) === getValidString(afterSearch);
}

function replaceStringAfterOfSearchThToNextSearch(string, search, searchTh, replace) {
    searchTh = getValidSearchTh(searchTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchCountInString(string, search), string.length, getStringIndexOfSearchTh(string, search, searchTh));
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchCountInString(string, search), string.length, getStringIndexOfSearchTh(string, search, getValidSearchTh(searchTh) + 1));
    const searchedStringStartIndex = createIfAndElseAndReturns(getValidSearchTh(searchTh) > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(getValidSearchTh(searchTh) > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search));
    return subStringWithToIndex(string, searchedStringStartIndex) + getValidString(replace) + subStringWithFromIndex(string, searchedStringEndIndex);
}

function changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    return removeSearchThInString(changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(string, search, searchTh), search, searchTh);
}

function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZAndRemoveAllSearchs(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchCountInString(string, search); i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZ(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchCountInString(string, search); i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(value, search, i);
    }
    return value;
}

function changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(stringArray) {
    return stringifyArrayElements(changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray));
}

function changeUppercaseStringsFirstLetterToLowercaseWithAToZ(...strings) {
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(createArrayOfObjects(strings));
}

function changeUppercaseStringsFirstLetterToLowercaseWithAToZAndStringifyElements(...strings) {
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(createArrayOfObjects(strings));
}

function containsSearchCountInString(string, search) {
    search = getValidString(search);
    let replace = getValidString(string);
    let counter = 0;
    while (true) {
        if (replace.replace(search, "") === replace) {
            break;
        } else {
            replace = replace.replace(search, "");
            counter++;
        }
    }
    return counter;
}

function getSearchsCountsInString(string, searchStringArray) {
    searchStringArray = getValidArray(searchStringArray);
    let value = [];
    for (const element of searchStringArray) {
        value.push(containsSearchCountInString(string, element));
    }
    return value;
}

function getSearchCharsCountsInString(string, search) {
    let value = [];
    for (const element of search) {
        value.push(containsSearchCountInString(string, element));
    }
    return value;
}

function sqrXTh(x, xXth) {
    x = getValidNumber(x);
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

/*function stringNumber(stringNumberValue) {
    window.stringNumber = stringNumber;
    if (stringNumberValue === null || !isStringAllCharsEqualsDigits(stringNumberValue)) {
        window.stringNumber.value = stringNumberValue === null ? null : "0";
    } else {
        function isNumberBetweenMinAndMax(number, min, max) {
            const validMinAndMax = validateMinAndMax(min, max);
            number = getValidNumber(number);
            return !(number < validMinAndMax[0] || number > validMinAndMax[1]);
        }

        function isNumberBetween0And9(number) {
            return isNumberBetweenMinAndMax(number, 0, 9);
        }

        addOne();

        function addOne() {
            let value = "";
            if (stringNumberValue.length === 1) {
                value = max2DigitsOfNumberAddOne(stringNumberValue);
            } else {
                if (stringNumberValue.length === 2) {
                    value = null;
                }
            }
            return value;
        }
    }
}*/

function isEqualsObjectArrayElements(array) {
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

function isEqualsObjects(...objects) {
    return isEqualsObjectArrayElements(createArrayOfObjects(objects));
}

function createIfAndReturn(condition, returnValue) {
    if (condition) {
        return returnValue;
    }
}

function getObjectWithConditionalBoolean(condition, ifTrue, ifFalse) {
    return condition ? ifTrue : ifFalse;
}

function createIfAndElseAndReturns(condition, ifTrue, ifFalse) {
    if (condition) {
        return ifTrue;
    } else {
        return ifFalse;
    }
}

function getObjectIfEqualsObjects(a, b) {
    return createIfAndElseAndReturns(a === b, b, a);
}

function isStringAllCharsEqualsDigitsAndLength(string, length) {
    if (string === null) {
        string = DIGITS;
    }
    return isStringAllCharsEqualsDigits(string) && string.length === length;
}

function max1DigitOfNumberAddOrOutOfOneIfNumberGreaterThan0(digit, digitsType) {
    let digits;
    let value;
    if (digitsType === "reverse") {
        digits = getReverseString(DIGITS);
    } else if (digitsType === "normal") {
        digits = DIGITS;
    }
    if (isCharEqualsCharacterOfText(digit, digits)) {
        const index = digits.indexOf(digit);
        value = index === digits.length - 1 ? digits[0] : digits[index + 1];
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
    let value;
    if (isStringAllCharsEqualsMatchSomeOfCharsInText(digit, "-" + DIGITS)) {
        if (digit.length === 2 && digit[0] === "-" && isCharEqualsDigit(digit[1]) && max1DigitOfNumberOutOfOneIfNumberGreaterThan0(digit[1]) === DIGITS[0]) {
            value = "-" + max1DigitOfNumberOutOfOneIfNumberGreaterThan0(digit[1]);
        } else if (digit.length === 1 && isCharEqualsDigit(digit[0])) {
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
        value = addOne === "0" ? "10" : addOne;
    } else if (isStringAllCharsEqualsDigitsAndLength(digits, 2)) {
        if (addOne === "0") {
            value = max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[0]) === "0" ? "0" : max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[0]) + "0";
        } else {
            value = digits[0] + addOne;
        }
    }
    return value;
}

function max3DigitsOfNumberAddOne(digits) {
    let value;
    const addOne = max2DigitsOfNumberAddOne(subStringWithFromIndex(digits, 1));
    if (isStringAllCharsEqualsDigitsAndLength(digits, 1)) {
        value = max2DigitsOfNumberAddOne(digits);
    } else if (isStringAllCharsEqualsDigitsAndLength(digits, 2)) {
        value = addOne === "0" ? "100" : addOne;
    } else if (isStringAllCharsEqualsDigitsAndLength(digits, 3)) {
        if (addOne[0] === "0") {
            value = max2DigitsOfNumberAddOne(subStringWithToIndex(digits, 1)) === "0" ? "0" : max2DigitsOfNumberAddOne(subStringWithToIndex(digits, 1)) + "0";
        } else {
            value = digits[0] + addOne;
        }
    }
    return value;
}

function digitsOfNumberAddOne() {
    let value;

    return value;
}

function isCharEqualsCharacterOfText(char, text) {
    let value = true;
    for (const element of getValidString(text)) {
        value = getValidString(char) === element;
        if (value) {
            break;
        }
    }
    return value;
}

function isStringAllCharsEqualsMatchSomeOfCharsInText(string, text) {
    let value = true;
    for (const element of getValidString(string)) {
        value = value && isCharEqualsCharacterOfText(element, getValidString(text));
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

function isObjectEqualsSomeElementOfObjects(object, ...objects) {
    return isObjectEqualsSomeElementOfArray(object, createArrayOfObjects(objects));
}

function createArrayOfObjects(...elements) {
    let array = [];
    for (const element of elements) {
        array.push(element);
    }
    return array;
}

function stringifyArrayElements(array) {
    let value = "";
    for (const element of array) {
        value += element;
    }
    return value;
}

function createArrayOfOneObject(element, length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(element);
    }
    return array;
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

function subArray(array, fromIndex, toIndex) {
    array = getValidArray(array);
    const validFromAndToIndex = validateMinAndMax(fromIndex, toIndex);
    fromIndex = validFromAndToIndex[0];
    toIndex = validFromAndToIndex[1];
    let value = [];
    for (let i = fromIndex; i < toIndex + 1; i++) {
        value.push(array[i]);
    }
    return value;
}

function subArrayWithFromIndex(array, fromIndex) {
    return subArray(array, fromIndex, array.length - 1);
}

function subArrayWithToIndex(array, toIndex) {
    return subArray(array, 0, toIndex);
}

/**
 * @param value if this less than 0, then equal to 0; else this
 * @returns {number}
 */
function getValueWithGreaterThanOrEqualsZero(value) {
    const stringValue = getValidString(getValidInteger(value));
    value = getValidString(value).length > 0 ? value : 0;
    return stringValue[0] === "-" ? 0 : getValidNumber(value);
}

function isCharEqualsDigit(char) {
    return isCharEqualsCharacterOfText(char, DIGITS);
}

function isStringAllCharsEqualsDigits(string) {
    return isStringAllCharsEqualsMatchSomeOfCharsInText(string, DIGITS);
}

function getPositiveNumber(number) {
    return createIfAndElseAndReturns(number < 0, -number, number);
}

function getPositiveInteger(integer) {
    return getPositiveNumber(getValidInteger(integer));
}

function getHalfInteger(number) {
    number = getValidNumber(number);
    return (number + 1) % 2 === 0 ? ((number + 1) / 2) - 1 : createIfAndElseAndReturns(number % 2 === 0, number / 2, number);
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
    number = getValidInteger(number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberGreaterThanOrEquals0(positiveReferenceNumber, numberType, getPositiveNumber(number));
}

function validateIntegerWithNumberType(referenceNumber, numberType, number) {
    referenceNumber = getValidInteger(referenceNumber);
    number = getValidInteger(number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0(createIfAndElseAndReturns(referenceNumber < 0, -referenceNumber, referenceNumber), numberType, createIfAndElseAndReturns(referenceNumber < 0, -number, number));
}

function getMinToMaxIntegerWithNumberType(referenceNumber, numberType, number) {
    referenceNumber = getValidInteger(referenceNumber);
    number = getValidInteger(number);
    return referenceNumber > 0 ? validateIntegerWithNumberType(referenceNumber, numberType, number) : createIfAndElseAndReturns(referenceNumber < 0, -validateIntegerWithNumberType(-referenceNumber, numberType, -number), 0);
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

function getHalfStringChar(string, char) {
    for (let i = 0; i < string; i++) {
        if (char === string[i]) {
            let hexString1Element;
            if (i > 0) {
                if ((i + 1) % 2 === 0) {
                    hexString1Element = ((i + 1) / 2) - 1;
                } else if (i % 2 === 0) {
                    hexString1Element = (i / 2) - 1;
                }
            } else {
                hexString1Element = 0;
            }
            return string[hexString1Element];
        }
    }
}

function getReverseString(string) {
    let value = "";
    if (string !== null) {
        const {length} = string;
        for (let i = 0; i < length; i++) {
            value += string[length - 1 - i];
        }
    }
    return value;
}

function getReverseCharOfString(string, char) {
    let value = 0;
    for (let i = 0; i < string.length; i++) {
        if (char === string[i]) {
            value = getReverseString(string)[i];
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

function validateMinAndMax(min, max) {
    min = getValidNumber(min);
    max = getValidNumber(max);
    if (max < min) {
        const i = min;
        min = max;
        max = i;
    }
    return [min, max];
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

function validateNumber(number, min, max) {
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

function subString(string, fromIndex, toIndex) {
    let value = "";
    string = getValidString(string);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    if (!isEmptyString(string) && toIndex + 1 !== fromIndex) {
        const validFromAndToIndex = validateStartAndEndIntegers(0, string.length, fromIndex, toIndex);
        fromIndex = validFromAndToIndex[0];
        toIndex = validFromAndToIndex[1];
        const substring = string.substring(fromIndex, toIndex + 1);
        value = toIndex < fromIndex ? getReverseString(substring) : substring;
    }
    return value;
}

function subStringWithFromIndex(string, fromIndex) {
    return subString(string, fromIndex, getValidString(string).length - 1);
}

function subStringWithToIndex(string, toIndex) {
    return subString(string, 0, toIndex);
}

function removeSubStringInString(string, fromIndex, toIndex) {
    string = getValidString(string);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    const validFromAndToIndex = validateMinAndMaxIntegers(fromIndex, toIndex);
    let value = "";
    if (toIndex + 1 !== fromIndex) {
        fromIndex = validFromAndToIndex[0];
        toIndex = validFromAndToIndex[1];
        value = subStringWithToIndex(string, fromIndex - 1) + subStringWithFromIndex(string, toIndex + 1);
    }
    return value;
}

function removeSubStringWithSearchTh(string, search, fromSearchTh, toSearchTh) {
    string = getValidString(string);
    search = getValidString(search);
    const validFromAndToIndex = validateMinAndMaxIntegers(fromSearchTh, toSearchTh);
    fromSearchTh = validFromAndToIndex[0];
    toSearchTh = validFromAndToIndex[1];
    return subStringWithToIndex(string, getStringIndexOfSearchTh(string, search, fromSearchTh) - 1) + subStringWithFromIndex(string, getStringIndexOfSearchTh(string, search, toSearchTh) + search.length);
}

function removeSubStringInStringWithLength(string, fromIndex, length) {
    return removeSubStringInString(string, fromIndex, fromIndex + (length - 1));
}

function removeSearchInString(string, search) {
    return string.replace(search, "");
}

function removeSearchCharInString(string, searchChar) {
    return removeSearchInString(string, searchChar);
}

function removeSearchThInString(string, search, searchTh) {
    return removeSubStringInStringWithLength(string, getStringIndexOfSearchTh(string, search, searchTh), search.length);
}

function removeAllSearchsInString(string, search) {
    string = getValidString(string);
    let value = string;
    for (let i = 0; i < containsSearchCountInString(string, search); i++) {
        value = removeSearchInString(value, search);
    }
    return value;
}

function removeConsecutiveSearchsInString(string, search, fromSearchTh, toSearchTh) {
    string = getValidString(string);
    const validFromAndToSearchTh = validateMinAndMax(fromSearchTh, toSearchTh);
    fromSearchTh = validFromAndToSearchTh[0];
    toSearchTh = validFromAndToSearchTh[1];
    let value = string;
    for (let i = 0; i < toSearchTh - fromSearchTh; i++) {
        value = removeSearchThInString(value, search, fromSearchTh);
    }
    return value;
}

function removeCharWithIndexInString(string, charIndex) {
    return removeSubStringInString(string, charIndex, charIndex);
}

function replaceStringFromSubString(string, fromIndex, toIndex, replace) {
    return subStringWithToIndex(string, fromIndex - 1) + replace + subStringWithFromIndex(string, toIndex);
}

function placeStringFromIndexInString(string, index, place) {
    return subStringWithToIndex(string, index - 1) + place + subStringWithFromIndex(string, index);
}

function replaceStringFromCharIndexInString(string, charIndex, replace) {
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

function drawDiagonalBlackLineLeftAndDown(moveX, moveY, length) {
    drawBlackLine(moveX, moveY, moveX - length, moveY + length);
}

function drawDiagonalBlackLineLeftAndUp(moveX, moveY, length) {
    drawBlackLine(moveX, moveY, moveX - length, moveY - length);
}

function drawDiagonalBlackLineRightAndDown(moveX, moveY, length) {
    drawBlackLine(moveX, moveY, moveX + length, moveY + length);
}

function drawDiagonalBlackLineRightAndUp(moveX, moveY, length) {
    drawBlackLine(moveX, moveY, moveX + length, moveY - length);
}

function drawDiagonalWhiteLineLeftAndDown(moveX, moveY, length) {
    drawWhiteLine(moveX, moveY, moveX - length, moveY + length);
}

function drawDiagonalWhiteLineLeftAndUp(moveX, moveY, length) {
    drawWhiteLine(moveX, moveY, moveX - length, moveY - length);
}

function drawDiagonalWhiteLineRightAndDown(moveX, moveY, length) {
    drawWhiteLine(moveX, moveY, moveX + length, moveY + length);
}

function drawDiagonalWhiteLineRightAndUp(moveX, moveY, length) {
    drawWhiteLine(moveX, moveY, moveX + length, moveY - length);
}

function drawDiagonalTransparentLineLeftAndDown(moveX, moveY, length) {
    drawTransparentLine(moveX, moveY, moveX - length, moveY + length);
}

function drawDiagonalTransparentLineLeftAndUp(moveX, moveY, length) {
    drawTransparentLine(moveX, moveY, moveX - length, moveY - length);
}

function drawDiagonalTransparentLineRightAndDown(moveX, moveY, length) {
    drawTransparentLine(moveX, moveY, moveX + length, moveY + length);
}

function drawDiagonalTransparentLineRightAndUp(moveX, moveY, length) {
    drawTransparentLine(moveX, moveY, moveX + length, moveY - length);
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

function drawHorizontalBlackLine(moveX, lineX, posY) {
    drawBlackLine(moveX, posY, lineX, posY);
}

function drawVerticalBlackLine(posX, moveY, lineY) {
    drawBlackLine(posX, moveY, posX, lineY);
}

function drawHorizontalWhiteLine(moveX, lineX, posY) {
    drawWhiteLine(moveX, posY, lineX, posY);
}

function drawVerticalWhiteLine(posX, moveY, lineY) {
    drawWhiteLine(posX, moveY, posX, lineY);
}

function drawHorizontalTransparentLine(moveX, lineX, posY) {
    drawTransparentLine(moveX, posY, lineX, posY);
}

function drawVerticalTransparentLine(posX, moveY, lineY) {
    drawTransparentLine(posX, moveY, posX, lineY);
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

function begin() {
    context.beginPath();
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

function defaultFillRect(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

function defaultFillStyle(value) {
    context.fillStyle = value;
}

function fill() {
    context.fill();
}

function defaultStrokeStyle(value) {
    context.strokeStyle = value;
}

function defaultStroke() {
    context.stroke();
}

function line(moveX, moveY, lineX, lineY) {
    defaultMoveTo(moveX, moveY);
    defaultLineTo(lineX, lineY);
}

function strokeLine(moveX, moveY, lineX, lineY) {
    line(moveX, moveY, lineX, lineY);
    defaultStroke();
}

function coloredLine(style, moveX, moveY, lineX, lineY) {
    defaultStrokeStyle(style);
    line(moveX, moveY, lineX, lineY);
}

function strokeColoredLine(style, moveX, moveY, lineX, lineY) {
    coloredLine(style, moveX, moveY, lineX, lineY);
    defaultStroke();
}

function drawLine(moveX, moveY, lineX, lineY) {
    begin();
    strokeLine(moveX, moveY, lineX, lineY);
}

function drawColoredLine(style, moveX, moveY, lineX, lineY) {
    defaultStrokeStyle(style);
    drawLine(moveX, moveY, lineX, lineY);
}

function drawBlackLine(moveX, moveY, lineX, lineY) {
    drawColoredLine(black, moveX, moveY, lineX, lineY);
}

function drawWhiteLine(moveX, moveY, lineX, lineY) {
    drawColoredLine(white, moveX, moveY, lineX, lineY);
}

function drawTransparentLine(moveX, moveY, lineX, lineY) {
    drawColoredLine(transparent, moveX, moveY, lineX, lineY);
}

function fillRect(x, y, width, height) {
    begin();
    defaultFillRect(x, y, width, height);
}

function fillColoredRect(style, x, y, width, height) {
    defaultFillStyle(style);
    fillRect(x, y, width, height);
}

function fillBlackRect(x, y, width, height) {
    fillColoredRect(black, x, y, width, height);
}

function fillWhiteRect(x, y, width, height) {
    fillColoredRect(white, x, y, width, height);
}

function fillTransparentRect(x, y, width, height) {
    fillColoredRect(transparent, x, y, width, height);
}

function fillRectWithCoordinates(fromX, fromY, toX, toY) {
    fillRect(fromX, fromY, toX - fromX, toY - fromY);
}

function fillColoredRectWithCoordinates(style, fromX, fromY, toX, toY) {
    defaultFillStyle(style);
    fillRectWithCoordinates(fromX, fromY, toX, toY);
}

function fillBlackRectWithCoordinates(fromX, fromY, toX, toY) {
    fillColoredRectWithCoordinates(black, fromX, fromY, toX, toY);
}

function fillWhiteRectWithCoordinates(fromX, fromY, toX, toY) {
    fillColoredRectWithCoordinates(white, fromX, fromY, toX, toY);
}

function fillTransparentRectWithCoordinates(fromX, fromY, toX, toY) {
    fillColoredRectWithCoordinates(transparent, fromX, fromY, toX, toY);
}

function getReverseHex(hex) {
    return tHex.getReverseHex(hex);
}

function getElementById(elementId) {
    return document.getElementById(elementId);
}

function getCanvasMousePos() {
    return window.getMousePos(canvas);
}

function countBorderTextWithMin(text, count) {
    return "(" + text + " = " + count + ") the " + text + " value must be greater than or equal to " + 0;
}

function countBordersText(text, count, min, max) {
    return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
}

function isEmptyString(string) {
    return getValidString(string).length === 0;
}

function isEmptyStrings(...strings) {
    let value = true;
    for (const element of strings) {
        value = value && isEmptyString(element);
    }
    return value;
}

function getStringIndexOf(string, search) {
    return getValidString(string).indexOf(getValidString(search));
}

function getValidSearchTh(searchTh) {
    if (!Number.isSafeInteger(searchTh) || isNaN(searchTh) || Number(searchTh) === Infinity || Number(searchTh) === -Infinity) {
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

function getStringIndexOfSearchTh(string, search, searchTh) {
    string = getValidString(string);
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    let value = 0;
    if (isContainsSearchInString(string, search) && searchTh > 0) {
        let disassembledString = string;
        for (let i = 1; i < searchTh; i++) {
            disassembledString = removeSearchInString(disassembledString, search);
        }
        value = getStringIndexOf(disassembledString, search) + ((searchTh * search.length) - 1);
    }
    return value;
}

function isContainsSearchInString(string, search) {
    return getStringIndexOf(string, search) > -1;
}

function isContainsOneSearchInString(string, search) {
    return containsSearchCountInString(string, search) === 1;
}

function isContainsSearchCharOnIndexInString(string, searchChar, index) {
    return isContainsSearchInString(string, getValidString(searchChar).length === 1 ? searchChar : " ") && getValidString(string)[validateNumber(index, 0, string.length - 1)] === searchChar;
}

function isContainsOneSearchOnIndexInArray(array, search, index) {
    return getValidArray(array)[validateNumber(index, 0, getValidArray(array).length - 1)] === search;
}

function isContainsOneSearchOnIndexInElements(search, index, ...elements) {
    return isContainsOneSearchOnIndexInArray(createArrayOfObjects(elements), search, index);
}

function setTimeoutFunction(before, handler, handlerAfter, timeout, after, args) {
    if (typeof before === "function") {
        before();
    }
    window.setTimeout(function () {
        if (typeof handler === "function") {
            handler();
        }
        if (typeof handlerAfter === "boolean" && handlerAfter === true) {
            setTimeoutFunction(before, handler, timeout, after, args);
        }
    }, timeout, args);
    if (typeof after === "function") {
        after();
    }
}

function getValidString(string) {
    return createIfAndElseAndReturns(string === null, "null", "" + string);
}

function getValidArray(array) {
    return createIfAndElseAndReturns(Array.isArray(array), array, []);
}

function getValidNumber(number) {
    number = Number(number);
    return createIfAndElseAndReturns(isNaN(number) || number === Infinity || number === -Infinity, 0, number);
}

function getValidInteger(integer) {
    return Number.parseInt(getValidNumber(integer));
}
