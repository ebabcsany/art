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
    const searchThBeforeIndex = getSearchThIndexOfString(string, search, searchTh) - 1;
    const searchThAfterIndex = searchThBeforeIndex + (getValidString(search).length + 1);
    return subStringWithToIndex(string, searchThBeforeIndex + 1) + changeLowercaseLetterToUppercaseWithAToZ(getValidString(string)[searchThAfterIndex]) + subStringWithFromIndex(string, searchThAfterIndex + 1);
}

function changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    return removeSearchThInString(changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(string, search, searchTh), search, searchTh);
}

function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZAndRemoveAllSearchs(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchsCountInString(string, search); i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

function changeLowercaseStringAllSearchAfterLetterToUppercaseWithAToZ(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchsCountInString(string, search); i++) {
        value = changeLowercaseStringSearchThAfterLetterToUppercaseWithAToZ(value, search, i);
    }
    return value;
}

function changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(stringArray) {
    return stringifyArrayElements(changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(stringArray));
}

function changeLowercaseStringsFirstLetterToUppercaseWithAToZ(...strings) {
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZ(createArrayFromObjects(strings));
}

function changeLowercaseStringsFirstLetterToUppercaseWithAToZAndStringifyElements(...strings) {
    return changeLowercaseStringArrayElementsFirstLetterToUppercaseWithAToZAndStringifyElements(createArrayFromObjects(strings));
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
    return removeSearchInString(string, getStringCapitalLetter(string));
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
        const lowercaseLetter = changeUppercaseLetterToLowercaseWithAToZ(letter);
        value += createIfAndElseAndReturns(isLetterAToZ(letter), lowercaseLetter, letter);
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
    const searchThBeforeIndex = getSearchThIndexOfString(string, search, searchTh) - 1;
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

function getStringAfterOfSearchThToNextSearch(string, search, searchTh) {
    searchTh = getValidSearchTh(searchTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchsCountInString(string, search), string.length, getSearchThIndexOfString(string, search, searchTh) + 1);
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchsCountInString(string, search), string.length, getSearchThIndexOfString(string, search, getValidSearchTh(searchTh) + 1) - 1);
    const searchedStringStartIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(searchTh > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search) - 1);
    return subString(string, searchedStringStartIndex, searchedStringEndIndex);
}

function isStringAfterOfSearchThToNextSearchEqualsAfterSearch(string, search, searchTh, afterSearch) {
    return getStringAfterOfSearchThToNextSearch(string, search, searchTh) === getValidString(afterSearch);
}

function replaceStringAfterOfSearchThToNextSearch(string, search, searchTh, replace) {
    searchTh = getValidSearchTh(searchTh);
    const searchedStringStartIndexIfIndexGreaterThan0 = createIfAndElseAndReturns(searchTh > containsSearchsCountInString(string, search), string.length, getSearchThIndexOfString(string, search, searchTh));
    const searchedStringEndIndexIfIndexGreaterThan0 = createIfAndElseAndReturns((searchTh + 1) > containsSearchsCountInString(string, search), string.length, getSearchThIndexOfString(string, search, getValidSearchTh(searchTh) + 1));
    const searchedStringStartIndex = createIfAndElseAndReturns(getValidSearchTh(searchTh) > 0, searchedStringStartIndexIfIndexGreaterThan0, -1);
    const searchedStringEndIndex = createIfAndElseAndReturns(getValidSearchTh(searchTh) > 0, searchedStringEndIndexIfIndexGreaterThan0, getStringIndexOf(string, search));
    return subStringWithToIndex(string, searchedStringStartIndex) + getValidString(replace) + subStringWithFromIndex(string, searchedStringEndIndex);
}

function changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(string, search, searchTh) {
    return removeSearchThInString(changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(string, search, searchTh), search, searchTh);
}

function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZAndRemoveAllSearchs(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchsCountInString(string, search); i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZAndRemoveSearchTh(value, search, 1);
    }
    return value;
}

function changeUppercaseStringAllSearchAfterLetterToLowercaseWithAToZ(string, search) {
    let value = string;
    for (let i = 1; i <= containsSearchsCountInString(string, search); i++) {
        value = changeUppercaseStringSearchThAfterLetterToLowercaseWithAToZ(value, search, i);
    }
    return value;
}

function changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(stringArray) {
    return stringifyArrayElements(changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(stringArray));
}

function changeUppercaseStringsFirstLetterToLowercaseWithAToZ(...strings) {
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZ(createArrayFromObjects(strings));
}

function changeUppercaseStringsFirstLetterToLowercaseWithAToZAndStringifyElements(...strings) {
    return changeUppercaseStringArrayElementsFirstLetterToLowercaseWithAToZAndStringifyElements(createArrayFromObjects(strings));
}

function containsSearchsCountInString(string, search) {
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
        value.push(containsSearchsCountInString(string, element));
    }
    return value;
}

function getSearchCharsCountsInString(string, search) {
    let value = [];
    for (const element of search) {
        value.push(containsSearchsCountInString(string, element));
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
    if (stringNumberValue === null || !isDigits(stringNumberValue)) {
        window.stringNumber.value = createIfAndElseReturns(stringNumberValue === null, null, "0");
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
    return isEqualsObjectArrayElements(createArrayFromObjects(objects));
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

function getReturnIfArrayFirstTrue(equalsAndReturnsArray) {
    return getReturnIfObjectEqualsArrayFirst(true, equalsAndReturnsArray);
}

function getReturnIfObjectEqualsArrayFirst(object, equalsAndReturnsArray) {
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
        if (returnsArray.length > i) {
            returnValue = returnsArray[i];
        } else {
            returnValue = null;
        }
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

function getObjectIfObjectEqualsArrayFirst(object, equalsAndElseArray) {
    return getReturnIfObjectEqualsArrayFirst(object, convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray));
}

function getObjectIfObjectArrayElementEqualsArrayFirst(objectsArray, equalsAndElseArray) {
    return getReturnIfObjectArrayElementEqualsArrayFirst(objectsArray, convertEqualsAndElseArrayToEqualsAndReturnsArray(equalsAndElseArray));
}

function getObjectIfEqualsObjects(a, b) {
    return createIfAndElseAndReturns(a === b, b, a);
}

function isStringAllCharsEqualsDigitsAndLength(string, length) {
    if (string === null) {
        string = DIGITS;
    }
    return isDigits(string) && string.length === length;
}

function isStringNumber(string) {
    string = getValidString(string);
    let value = false;
    if (isDigit(string[0])) {
        const containsDotCount = containsSearchsCountInString(string, ".");
        const valueIfContainsDotCountNot1 = createIfAndElseAndReturns(containsDotCount === 0, isDigits(string), false);
        const dotIndex = getStringIndexOf(string, ".");
        const isAfterDotIndexDigits = isDigits(subStringWithFromIndex(string, dotIndex + 1));
        value = createIfAndElseAndReturns(containsDotCount === 1, isAfterDotIndexDigits, valueIfContainsDotCountNot1);
    }
    return value;
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
    let value;
    if (isStringAllCharsEqualsMatchSomeOfCharsInText(digit, "-" + DIGITS)) {
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
        value = addOne === createIfAndElseAndReturns("0", "10", addOne);
    } else if (isStringAllCharsEqualsDigitsAndLength(digits, 2)) {
        if (addOne === "0") {
            const digit = max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[0])
            value = createIfAndElseAndReturns(digit === "0", "0", digit + "0");
        } else {
            value = digits[0] + addOne;
        }
    }
    return value;
}

function isValidCharAndText(char, text) {
    return !isEmptyStrings(char, text) && getValidString(char).length === 1;
}

function isValidStringAndText(string, text) {
    return isEmptyStrings(string, text) || isEmptyString(string) || !isEmptyString(text);
}

function isValidArrayAndElementsInArray(array, elementsInArray) {
    return isEmptyArrays(array, elementsInArray) || isEmptyArray(array) || !isEmptyArray(elementsInArray);
}

function isCharEqualsCharacterOfText(char, text) {
    let value = isValidCharAndText(char, text);
    for (const element of getValidString(text)) {
        value = getValidString(char) === element;
        if (value) {
            break;
        }
    }
    return value;
}

function isStringAllCharsEqualsMatchSomeOfCharsInText(string, text) {
    let value = isValidStringAndText(string, text);
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

function isArrayAllElementsEqualsMatchSomeOfElementsInEqualsArray(array, equalsArray) {
    let value = isValidArrayAndElementsInArray(array, equalsArray);
    for (const element of getValidArray(array)) {
        value = value && isObjectEqualsSomeElementOfArray(element, getValidArray(equalsArray));
    }
    return value;
}

function isObjectEqualsSomeElementOfString(object, string) {
    return isObjectEqualsSomeElementOfArray(object, createArrayFromStringElements(getValidString(string)));
}

function isObjectNotEqualsSomeElementOfArray(object, array) {
    return !isObjectEqualsSomeElementOfArray(object, array);
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

function createArrayFromObjects(...elements) {
    let array = [];
    for (const element of elements) {
        array.push(element);
    }
    return array;
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

function createArrayOfOneElement(element, length) {
    let array = [];
    for (let i = 0; i < getValidInteger(length); i++) {
        array.push(element);
    }
    return array;
}

function createStringOfOneSearch(search, length) {
    return stringifyArrayElements(createArrayOfOneElement(search, length));
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

function subArray(array, fromIndex, toIndex) {
    let value = [];
    array = getValidArray(array);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    if (!isEmptyArray(array) && toIndex + 1 !== fromIndex) {
        value = subarray(array, fromIndex, toIndex + 1);
    }
    return value;
}

function subArrayWithFromIndex(array, fromIndex) {
    return subArray(array, fromIndex, array.length - 1);
}

function subArrayWithToIndex(array, toIndex) {
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

function convertStringElementsToArray(string) {
    let value = [];
    for (const element of string) {
        value.push(element);
    }
    return value;
}

function isCharEqualsSomeElementOfDigits(char, digits) {
    let value = false;
    for (const element of digits) {
        value = char === element;
    }
    return value;
}

function isDigits(string) {
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
    string = getValidString(string);
    let value = "";
    if (string !== null) {
        const {length} = string;
        for (let i = 0; i < length; i++) {
            value += string[length - 1 - i];
        }
    }
    return value;
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

function getReverseCharOfString(string, char) {
    string = getValidString(string);
    char = getValidString(char);
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

function validateIntegerWithMin(integer, min) {
    return getValidInteger(validateNumberWithMin(integer, min));
}

function validateIntegerWithMax(integer, max) {
    return getValidInteger(validateNumberWithMax(integer, max));
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

function isValidSubStringParameters(string, fromIndex, toIndex) {
    const isValidIndexes = typeof fromIndex === "number" && typeof toIndex === "number";
    return !isEmptyString(string) && isValidIndexes;
}

function subString(string, fromIndex, toIndex) {
    string = getValidString(string);
    const isValid = isValidSubStringParameters(string, fromIndex, toIndex);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    const substring = string.substring(fromIndex, toIndex + 1);
    const valueIfValid = createIfAndElseAndReturns(fromIndex <= toIndex, substring, "");
    return createIfAndElseAndReturns(isValid, valueIfValid, string);
}

function subStringWithLength(string, fromIndex, length) {
    fromIndex = getValidInteger(fromIndex);
    length = getValidInteger(length);
    return subString(string, fromIndex, fromIndex + length - 1);
}

function subStringWithFromIndex(string, fromIndex) {
    string = getValidString(string);
    return subString(string, fromIndex, string.length - 1);
}

function subStringWithToIndex(string, toIndex) {
    return subString(string, 0, toIndex);
}

function removeSubStringInString(string, fromIndex, toIndex) {
    string = getValidString(string);
    const isValidParameters = isValidSubStringParameters(string, fromIndex, toIndex);
    fromIndex = getValidInteger(fromIndex);
    toIndex = getValidInteger(toIndex);
    const isValid = isValidParameters && fromIndex <= toIndex;
    const beforeFromIndex = subStringWithToIndex(string, fromIndex - 1);
    const afterToIndex = subStringWithFromIndex(string, toIndex + 1);
    return createIfAndElseAndReturns(isValid, beforeFromIndex + afterToIndex, string);
}

function removeSubStringInStringWithFromIndex(string, fromIndex) {
    string = getValidString(string);
    return removeSubStringInString(string, fromIndex, string.length - 1);
}

function removeSubStringInStringWithToIndex(string, toIndex) {
    return removeSubStringInString(string, 0, toIndex);
}

function removeSubStringWithSearchTh(string, search, fromSearchTh, toSearchTh) {
    string = getValidString(string);
    search = getValidString(search);
    const validFromAndToIndex = validateMinAndMaxIntegers(fromSearchTh, toSearchTh);
    fromSearchTh = validFromAndToIndex[0];
    toSearchTh = validFromAndToIndex[1];
    return subStringWithToIndex(string, getSearchThIndexOfString(string, search, fromSearchTh) - 1) + subStringWithFromIndex(string, getSearchThIndexOfString(string, search, toSearchTh) + search.length);
}

function removeSubStringInStringWithLength(string, fromIndex, length) {
    fromIndex = getValidInteger(fromIndex);
    length = getValidInteger(length);
    const toIndex = fromIndex + createIfAndElseAndReturns(length > -1, length - 1, 0);
    return removeSubStringInString(string, fromIndex, toIndex);
}

function removeSearchInString(string, search) {
    return string.replace(search, "");
}

function removeSearchThInString(string, search, searchTh) {
    const isValid = isValidSearchThInStringParameters(string, search, searchTh);
    string = getValidString(string);
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    const fromIndex = getFromIndexOfSearchTh(string, search, searchTh);
    const valueIfValid = removeSubStringInStringWithLength(string, fromIndex, search.length);
    return createIfAndElseAndReturns(isValid, valueIfValid, string);
}

function getFromIndexOfSearchTh(string, search, searchTh) {
    string = getValidString(string);
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    const isValid = isValidSearchThInStringParameters(string, search, searchTh);
    const containsSearchCount = containsSearchsCountInString(string, search);
    const fromIndexSearchTh = createIfAndElseAndReturns(containsSearchCount > 0 && containsSearchCount >= searchTh, searchTh, -1);
    return createIfAndElseAndReturns(isValid, getSearchThIndexOfString(string, search, fromIndexSearchTh), -1);
}

function isValidSearchThInStringParameters(string, search, searchTh) {
    const containsSearchCount = containsSearchsCountInString(string, search);
    const isValidParameters = typeof string === "string" && typeof search === "string" && typeof searchTh === "number";
    return isValidParameters && (!isEmptyString(string) || isEmptyStrings(string, search) || containsSearchCount >= getValidSearchTh(searchTh));
}

function removeAllSearchsInString(string, search) {
    string = getValidString(string);
    let value = string;
    for (let i = 0; i < containsSearchsCountInString(string, search); i++) {
        value = removeSearchInString(value, search);
    }
    return value;
}

function removeConsecutiveSearchsInString(string, search, fromSearchTh, toSearchTh) {
    string = getValidString(string);
    fromSearchTh = getValidSearchTh(fromSearchTh);
    toSearchTh = getValidSearchTh(toSearchTh);
    const containsSearchCount = containsSearchsCountInString(string, search);
    const validFromAndToSearchTh = validateMinAndMax(fromSearchTh, toSearchTh);
    fromSearchTh = validFromAndToSearchTh[0];
    toSearchTh = validFromAndToSearchTh[1];
    let value = string;
    const max = Math.min(toSearchTh - (fromSearchTh - 1), containsSearchCount);
    for (let i = 0; i < max; i++) {
        value = removeSearchThInString(value, search, fromSearchTh);
    }
    return value;
}

function removeConsecutiveMatchingSearchsInString(string, search, fromSearchTh) {
    string = getValidString(string);
    const fromSearchThIndex = getSearchThIndexOfString(string, search, fromSearchTh);
    const containsConsecutiveMatchingSearchsCount = containsConsecutiveMatchingSearchsCountInString(string, search, fromSearchThIndex);
    const toSearchTh = fromSearchTh + containsConsecutiveMatchingSearchsCount - 1;
    return removeConsecutiveSearchsInString(string, search, fromSearchTh, toSearchTh);
}

function removeConsecutiveMatchingFirstSearchsInString(string, search) {
    return removeConsecutiveMatchingSearchsInString(string, search, 1);
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
    let containsSearchsCount = containsSearchsCountInString(string, search);
    let value = [];
    let i = 0;
    if (containsSearchsCount > 0) {
        while (i < length) {
            const searchPart = subString(string, i, i + search.length - 1);
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

function getConsecutiveMatchingSearchsPartThIndexInString(string, search, partTh) {
    const isValidParameters = isValidSearchThInStringParameters(string, search, partTh);
    let containsSearchCount = containsSearchsCountInString(string, search);
    let isContainsSearch = containsSearchCount > 0;
    search = getValidString(search);
    partTh = getValidSearchTh(partTh);
    let value = createIfAndElseAndReturns(isValidParameters, -1, 0);
    let counter = 0;
    let i = getStringIndexOf(string, search);
    if (isContainsSearch && partTh > 0) {
        let containsConsecutiveMatchingFirstSearchsCount = containsConsecutiveMatchingFirstSearchsCountInString(string, search);
        let disassembledString = getValidString(string);
        let removedBetweenFirstAndSecondPart = removeSubStringInStringWithToIndex(disassembledString, getStringIndexOf(disassembledString, search));
        while (counter < partTh) {
            counter++;
            if (counter < partTh) {
                if (getStringIndexOf(disassembledString, search) > 0) {
                    disassembledString = removedBetweenFirstAndSecondPart;
                }
                if (getStringIndexOf(disassembledString, search) === 0) {
                    i += containsConsecutiveMatchingFirstSearchsCount - 1;
                    disassembledString = removeConsecutiveMatchingFirstSearchsInString(disassembledString, search);
                }
                if (isEmptyString(disassembledString)) {
                    i = -1;
                    break;
                } else {
                    removedBetweenFirstAndSecondPart = removeSubStringInStringWithToIndex(disassembledString, getStringIndexOf(disassembledString, search));
                    containsConsecutiveMatchingFirstSearchsCount = containsConsecutiveMatchingFirstSearchsCountInString(disassembledString, search);
                    containsSearchCount = containsSearchsCountInString(disassembledString, search);
                    isContainsSearch = containsSearchCount > 0;
                    i += createIfAndElseAndReturns(isContainsSearch, getStringIndexOf(disassembledString, search) + 1, 0);
                }
            }
        }
        value = i;
    }
    return value;
}

function getConsecutiveMatchingSearchsPartsCountInString(string, search) {
    string = getValidString(string);
    search = getValidString(search);
    let containsSearchCount = containsSearchsCountInString(string, search);
    let isContainsSearch = containsSearchCount > 0;
    let value = 0;
    let disassembledString = string;
    while (isContainsSearch) {
        value++;
        disassembledString = removeConsecutiveMatchingFirstSearchsInString(disassembledString, search);
        containsSearchCount = containsSearchsCountInString(disassembledString, search);
        isContainsSearch = containsSearchCount > 0;
    }
    return value;
}

function getConsecutiveMatchingSearchsPartsIndexesInString(string, search) {
    const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
    let value = [];
    for (let i = 1; i <= partsCount; i++) {
        const partThIndex = getConsecutiveMatchingSearchsPartThIndexInString(string, search, i);
        value.push(partThIndex);
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

function createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search) {
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

function getOutsideOfConsecutiveMatchingSearchsPartsIndexesFromString(string, search) {
    const {length} = string;
    const partsIndexAndEndIndexArraysInArray = createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search);
    const {length: indexesCount} = partsIndexAndEndIndexArraysInArray;
    const firstSearch = subStringWithToIndex(string, search.length - 1);
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
    const containsSearchsCount = containsSearchsCountInString(string, search);
    const isContainsSearch = containsSearchsCount > 0;
    const searchIndex = getStringIndexOf(string, search);
    const searchsIndexes = getSearchsIndexesInString(string, search);
    const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
    let value = -1;
    if (!isEmptyString(string) && isContainsSearch && index > -1 && index <= lastSearchIndex) {
        value = searchIndex;
        let i = index;
        while (i < length) {
            const searchPart = subString(string, i, i + search.length - 1);
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
    const containsSearchsCount = containsSearchsCountInString(string, search);
    const isContainsSearch = containsSearchsCount > 0;
    const searchIndex = getStringIndexOf(string, search);
    const searchsIndexes = getSearchsIndexesInString(string, search);
    const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
    let value = -1;
    if (!isEmptyString(string) && isContainsSearch && index > -1 && index <= lastSearchIndex) {
        value = searchIndex;
        let i = index;
        while (i > -1) {
            const searchPart = subString(string, i, i + search.length - 1);
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

function getOutsideOfConsecutiveMatchingSearchsPartsFromString(string, search) {
    const containsSearchsCount = containsSearchsCountInString(string, search);
    const isContainsSearch = containsSearchsCount > 0;
    const partsIndexAndEndIndexArraysInArray = createConsecutiveMatchingSearchsPartsIndexAndEndIndexArraysInArrayFromString(string, search);
    const {length} = partsIndexAndEndIndexArraysInArray;
    const firstSearch = subStringWithToIndex(string, search.length - 1);
    const searchIndex = getStringIndexOf(string, search);
    const isFirstSearch = searchIndex === 0 && firstSearch === search;
    const firstOutsidePartIfContainsSearch = subStringWithToIndex(string, searchIndex - 1);
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
                const outsidePart = subString(string, fromIndex, toIndex);
                value.push(outsidePart);
            } else {
                if (index + 1 === string.length) {
                    break;
                } else {
                    const outsideLastPart = subStringWithFromIndex(string, index + 1);
                    value.push(outsideLastPart);
                }
            }
        }
    }
    return value;
}

console.log(getOutsideOfConsecutiveMatchingSearchsPartsFromString("canvas-border-color", "-"));

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
    const containsSearchCount = containsSearchsCountInString(string, search);
    const isContainsSearch = containsSearchCount > 0;
    const partsCount = getConsecutiveMatchingSearchsPartsCountInString(string, search);
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, search);
    const isValid = isValidParameters && isContainsSearch && partTh > 0 && partTh <= partsCount;
    let value = string;
    if (isValid) {
        const partIndex = partsIndexes[partTh - 1];
        const partLength = containsConsecutiveMatchingSearchsCountInString(string, search, partIndex);
        value = removeSubStringInStringWithLength(string, partIndex, partLength);
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

function isEmptyArray(array) {
    return getValidArray(array).length === 0;
}

function isEmptyStrings(...strings) {
    let value = strings.length > 0;
    for (const element of strings) {
        value = value && isEmptyString(element);
    }
    return value;
}

function isEmptyArrays(...array) {
    let value = array.length > 0;
    for (const element of array) {
        value = value && isEmptyArray(element);
    }
    return value;
}

function getStringIndexOf(string, search) {
    return getValidString(string).indexOf(getValidString(search));
}

function getArrayIndexOf(array, search) {
    return getValidArray(array).indexOf(search);
}

function getValidSearchTh(searchTh) {
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

function getSearchThIndexOfString(string, search, searchTh) {
    string = getValidString(string);
    search = getValidString(search);
    searchTh = getValidSearchTh(searchTh);
    const containsSearchCount = containsSearchsCountInString(string, search);
    let value = -1;
    if (containsSearchCount > 0 && searchTh > 0 && searchTh <= containsSearchCount) {
        let disassembledString = string;
        for (let i = 1; i < searchTh; i++) {
            disassembledString = removeSearchInString(disassembledString, search);
        }
        const isContainsSearch = isContainsSearchInString(disassembledString, search);
        const addCountOfSearchIndex = createIfAndElseAndReturns(isContainsSearch, (searchTh * search.length) - 1, 0);
        const ifContainsSearch = getStringIndexOf(disassembledString, search) + addCountOfSearchIndex;
        value = createIfAndElseAndReturns(isContainsSearch, ifContainsSearch, value) - (search.length - 1);
    }
    return value;
}

function getSearchThOfStringIndex(string, search, index) {
    string = getValidString(string);
    search = getValidString(search);
    index = getValidInteger(index);
    const {length} = string;
    const containsSearchCount = containsSearchsCountInString(string, search);
    const searchsIndexes = getSearchsIndexesInString(string, search);
    const lastSearchIndex = searchsIndexes[searchsIndexes.length - 1];
    const searchIndexOrNearestFollowingSearchIndex = getSearchIndexOrNearestFollowingSearchIndexInString(string, search, index);
    const isValid = containsSearchCount > 0 && index === lastSearchIndex || index === searchIndexOrNearestFollowingSearchIndex;
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

function containsConsecutiveMatchingSearchsCountInString(string, search, firstSearchIndex) {
    string = getValidString(string);
    search = getValidString(search);
    let value = 0;
    let i = getValidInteger(firstSearchIndex);
    while (i < string.length) {
        if (subString(string, i, i + search.length - 1) === search) {
            i += search.length;
            value++;
        } else {
            break;
        }
    }
    return value;
}

function containsConsecutiveMatchingFirstSearchsCountInString(string, search) {
    return containsConsecutiveMatchingSearchsCountInString(string, search, getStringIndexOf(string, search));
}

function containsConsecutiveReverseMatchingSearchsCountInString(string, search, lastSearchIndex) {
    string = getValidString(string);
    search = getValidString(search);
    let value = 0;
    let i = getValidInteger(lastSearchIndex);
    while (i > -1) {
        if (subString(string, i, i + search.length - 1) === search) {
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

function isContainsSearchInString(string, search) {
    return getStringIndexOf(string, search) > -1;
}

function isContainsSearchArrayElementsInString(string, searchArray) {
    let value = true;
    for (const element of getValidArray(searchArray)) {
        value = value && isContainsSearchInString(string, element);
    }
    return value;
}

function isContainsSearchStringElementsInString(string, searchString) {
    return isContainsSearchArrayElementsInString(string, createArrayFromStringElements(searchString));
}

function isContainsSearchsInString(string, ...searchs) {
    return isContainsSearchArrayElementsInString(string, createArrayFromObjects(searchs));
}

function isContainsSearchInArray(array, search) {
    return getArrayIndexOf(array, search) > -1;
}

function isContainsOneSearchInString(string, search) {
    return containsSearchsCountInString(string, search) === 1;
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

function isValidArgumentInString(string) {
    string = getValidString(string);
    const {length} = string;
    const containsSpacesCount = containsSearchsCountInString(string, " ");
    const containsColonCount = containsSearchsCountInString(string, ":");
    const partsIndexes = getConsecutiveMatchingSearchsPartsIndexesInString(string, " ");
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(string, " ");
    const outsidePartsString = stringifyArrayElements(outsideParts);
    const colonIndex = getStringIndexOf(outsidePartsString, ":");
    const isNotJustSpaces = length > containsSpacesCount;
    const isContainsColon = containsColonCount > 0;
    const isValidColonCount = containsColonCount === 1;
    const isValidColonIndex = colonIndex > 0 && colonIndex < outsidePartsString.length - 1;
    const isValidPartsIndexesCount = partsIndexes.length <= 4;
    const isValidOutsidePartsCount = outsideParts.length <= 3;
    const isValidOutsideAndSpacesPartsCount = isValidPartsIndexesCount && isValidOutsidePartsCount;
    const isValidOutsideAndSpacesPartsAndColonCount = isValidOutsideAndSpacesPartsCount && isValidColonCount;
    const isValid = !isEmptyString(string) && isNotJustSpaces && isValidOutsideAndSpacesPartsAndColonCount;
    let value = false;
    if (isValid && isContainsColon && isValidColonIndex) {
        const valueIfOutsidePartsGreaterThan1 = createIfAndElseAndReturns(outsideParts.length > 2, outsideParts[1] === ":", true);
        value = createIfAndElseAndReturns(outsideParts.length > 1, valueIfOutsidePartsGreaterThan1, true);
    }
    return value;
}

function isFirstValidArgumentOfArgumentsInString(string) {
    const commaIndex = getStringIndexOf(string, ",");
    const argumentPart = subStringWithToIndex(string, commaIndex - 1);
    return isValidArgumentInString(argumentPart);
}

function getValidArgumentNameInString(string) {
    const colonIndex = getStringIndexOf(string, ":");
    const argumentNamePart = subStringWithToIndex(string, colonIndex - 1);
    const argumentName = removeAllSearchsInString(argumentNamePart, " ");
    return createIfAndElseAndReturns(isValidArgumentInString(string), argumentName, "");
}

function getValidArgumentValueInString(string) {
    const colonIndex = getStringIndexOf(string, ":");
    const argumentNamePart = subStringWithFromIndex(string, colonIndex + 1);
    const argumentName = removeAllSearchsInString(argumentNamePart, " ");
    return createIfAndElseAndReturns(isValidArgumentInString(string), argumentName, "");
}

function isValidArgumentNameSearchInString(string, search) {
    const argumentName = getValidArgumentNameInString(string);
    return argumentName === search;
}

function isValidArgumentValueSearchInString(string, search) {
    const argumentValue = getValidArgumentValueInString(string);
    return argumentValue === search;
}

function isValidArgumentsInString(string) {
    let containsCommaCount = containsSearchsCountInString(string, ",");
    let disassembledString = string;
    let value = true;
    if (containsCommaCount > 0) {
        while (isContainsSearchInString(disassembledString, ",")) {
            const commaIndex = getStringIndexOf(disassembledString, ",");
            const argument = subStringWithToIndex(disassembledString, commaIndex - 1);
            value = value && isValidArgumentInString(argument);
            disassembledString = removeSubStringInStringWithToIndex(disassembledString, commaIndex);
            containsCommaCount--;
        }
    }
    return value && isValidArgumentInString(disassembledString);
}

function containsArgumentsCountIfValidArgumentsInString(string) {
    const containsCommaCount = containsSearchsCountInString(string, ",");
    return createIfAndElseAndReturns(isValidArgumentsInString(string), containsCommaCount + 1, 0);
}

function containsValidFirstArgumentsCountInString(string) {
    let containsCommaCount = containsSearchsCountInString(string, ",");
    let disassembledString = getValidString(string);
    let value = 0;
    while (containsCommaCount > 0) {
        const commaIndex = getStringIndexOf(disassembledString, ",");
        const isFirstArgument = isFirstValidArgumentOfArgumentsInString(disassembledString);
        if (isFirstArgument) {
            value++;
            disassembledString = removeSubStringInStringWithToIndex(disassembledString, commaIndex);
            containsCommaCount--;
        } else {
            break;
        }
    }
    const isLastArgument = isValidArgumentInString(disassembledString);
    const lastArgumentCount = createIfAndElseAndReturns(isLastArgument, 1, 0);
    return value + lastArgumentCount;
}

function containsValidArgumentsCountInString(string) {
    let containsCommaCount = containsSearchsCountInString(string, ",");
    let disassembledString = getValidString(string);
    let value = 0;
    while (containsCommaCount > 0) {
        const containsFirstArgumentsCount = containsValidFirstArgumentsCountInString(disassembledString);
        const isContainsFirstArgument = containsFirstArgumentsCount > 0;
        if (isContainsFirstArgument) {
            const removableCommaCount = createIfAndElseAndReturns(containsFirstArgumentsCount <= containsCommaCount, containsFirstArgumentsCount, containsCommaCount);
            const commaIndex = getSearchThIndexOfString(disassembledString, ",", removableCommaCount);
            value += removableCommaCount;
            disassembledString = removeSubStringInStringWithToIndex(disassembledString, commaIndex);
            containsCommaCount -= removableCommaCount;
        } else {
            const firstCommaIndex = getSearchThIndexOfString(disassembledString, ",", 1);
            disassembledString = removeSubStringInStringWithToIndex(disassembledString, firstCommaIndex);
            containsCommaCount -= 1;
        }
    }
    const isLastArgument = isValidArgumentInString(disassembledString);
    const lastArgumentCount = createIfAndElseAndReturns(isLastArgument, 1, 0);
    return value + lastArgumentCount;
}

function getValidArgumentsIndexesFromStringInArray(string) {
    const {length} = string;
    const containsCommaCount = containsSearchsCountInString(string, ",");
    const validFirstArgumentsCount = containsValidFirstArgumentsCountInString(string);
    const isContainsFirstArgument = validFirstArgumentsCount > 0;
    let value = createIfAndElseAndReturns(isContainsFirstArgument, [0], []);
    for (let i = 1; i <= containsCommaCount; i++) {
        const commaThIndex = getSearchThIndexOfString(string, ",", i);
        const fromIndex = commaThIndex + 1;
        const isContainsNextComma = i + 1 <= containsCommaCount;
        const nextCommaThIndex = getSearchThIndexOfString(string, ",", i + 1);
        const toIndex = createIfAndElseAndReturns(isContainsNextComma, nextCommaThIndex - 1, length - 1);
        const argumentPart = subString(string, fromIndex, toIndex);
        const isArgument = isValidArgumentInString(argumentPart);
        if (isArgument) {
            value.push(fromIndex);
        }
    }
    return value;
}

function getValidArgumentsThsFromStringInArray(string) {
    const commaIndex = getStringIndexOf(string, ",");
    const containsValidArgumentsCount = containsValidArgumentsCountInString(string);
    const validArgumentsIndexes = getValidArgumentsIndexesFromStringInArray(string);
    const firstArgumentIndex = validArgumentsIndexes[0];
    let value = [];
    if (firstArgumentIndex < commaIndex) {
        value = [1];
        if (validArgumentsIndexes.length === containsValidArgumentsCount) {
            validArgumentsIndexes.shift();
        }
    }
    for (const element of validArgumentsIndexes) {
        const commaTh = getSearchThOfStringIndex(string, ",", element - 1);
        value.push(commaTh + 1);
    }
    return value;
}

function getValidArgumentsFromStringInArray(string) {
    const {length} = string;
    const validArgumentsIndexes = getValidArgumentsIndexesFromStringInArray(string);
    let value = [];
    for (const element of validArgumentsIndexes) {
        const fromIndex = element;
        const toIndexIfContainsNextComma = getSearchIndexOrNearestFollowingSearchIndexInString(string, ",", fromIndex) - 1;
        const isContainsNextComma = toIndexIfContainsNextComma > -1;
        const toIndex = createIfAndElseAndReturns(isContainsNextComma, toIndexIfContainsNextComma, length - 1);
        const argument = subString(string, fromIndex, toIndex);
        value.push(argument);
    }
    return value;
}

function getValidArgumentFromArgumentsInString(string, argumentTh) {
    const validArgumentsThs = getValidArgumentsThsFromStringInArray(string);
    const validArguments = getValidArgumentsFromStringInArray(string);
    let value = "";
    for (let i = 0; i < validArgumentsThs.length; i++) {
        const validArgumentTh = validArgumentsThs[i];
        if (argumentTh === validArgumentTh) {
            value = validArguments[i];
        }
    }
    return value;
}

function getArgumentFromArgumentsInString(string, argumentTh) {
    string = getValidString(string);
    argumentTh = getValidSearchTh(argumentTh);
    const {length} = string;
    const containsCommaCount = containsSearchsCountInString(string, ",");
    const isContainsComma = containsCommaCount > 0;
    const firstCommaIndex = getStringIndexOf(string, ",");
    let isValidArgumentTh = argumentTh > 1 && argumentTh <= containsCommaCount + 1;
    let isValidNextArgumentTh = argumentTh > 1 && argumentTh + 1 <= containsCommaCount + 1;
    const isContainsCommaToValue = argumentTh === 1 && isContainsComma;
    const ifContainsCommaToValue = subStringWithToIndex(string, firstCommaIndex - 1);
    const ifNotContainsCommaToValue = createIfAndElseAndReturns(argumentTh === 1, string, "");
    let value = createIfAndElseAndReturns(isContainsCommaToValue, ifContainsCommaToValue, ifNotContainsCommaToValue);
    if (isValidArgumentTh) {
        const commaThIndex = getSearchThIndexOfString(string, ",", argumentTh - 1);
        const fromIndex = commaThIndex + 1;
        const nextCommaThIndex = getSearchThIndexOfString(string, ",", argumentTh);
        const toIndex = createIfAndElseAndReturns(isValidNextArgumentTh, nextCommaThIndex - 1, length - 1);
        value = subString(string, fromIndex, toIndex);
    }
    return value;
}

function getArgumentsFromStringInArray(string) {
    let containsCommaCount = containsSearchsCountInString(string, ",");
    let value = [];
    for (let i = 1; i <= containsCommaCount + 1; i++) {
        value.push(getArgumentFromArgumentsInString(string, i));
    }
    return value;
}

function isArgumentValidColonCountFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    return isContainsOneSearchInString(argument, ":");
}

function getArgumentBeforeColonPartFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const beforeOfColonPart = subStringWithToIndex(argument, colonIndex - 1);
    return createIfAndElseAndReturns(isValidColonCount, beforeOfColonPart, "");
}

function getArgumentAfterColonPartFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const beforeOfColonPart = subStringWithToIndex(argument, colonIndex + 1);
    return createIfAndElseAndReturns(isValidColonCount, beforeOfColonPart, "");
}

function isArgumentNameAndColonFromArgumentsInString(string, argumentTh) {
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const beforeOfColonPart = getArgumentBeforeColonPartFromArgumentsInString(string, argumentTh);
    return isValidColonCount && isNotJustSpacesString(beforeOfColonPart);
}

function isArgumentColonAndValueFromArgumentsInString(string, argumentTh) {
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const afterOfColonPart = getArgumentAfterColonPartFromArgumentsInString(string, argumentTh);
    return isValidColonCount && isNotJustSpacesString(afterOfColonPart);
}

function isArgumentValidNameAndColonFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const beforeOfColonPart = subStringWithToIndex(argument, colonIndex - 1);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(beforeOfColonPart, " ");
    return isValidColonCount && outsideParts.length === 1;
}

function isArgumentValidColonAndValueFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const afterOfColonPart = subStringWithFromIndex(argument, colonIndex + 1);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(afterOfColonPart, " ");
    return isValidColonCount && outsideParts.length === 1;
}

function getArgumentNameIfValidColonCountFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const valueIfValidColonCount = subStringWithToIndex(argument, colonIndex - 1);
    return createIfAndElseAndReturns(isValidColonCount, valueIfValidColonCount, "");
}

function getArgumentValueIfValidColonCountFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonCount = isArgumentValidColonCountFromArgumentsInString(string, argumentTh);
    const colonIndex = getStringIndexOf(argument, ":");
    const valueIfValidColonCount = subStringWithFromIndex(argument, colonIndex + 1);
    return createIfAndElseAndReturns(isValidColonCount, valueIfValidColonCount, "");
}

function getArgumentValidNameIfValidColonCountFromArgumentsInString(string, argumentTh) {
    const name = getArgumentNameIfValidColonCountFromArgumentsInString(string, argumentTh);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(name, " ");
    const isOneOutsidePartsCount = outsideParts.length === 1;
    return createIfAndElseAndReturns(isOneOutsidePartsCount, removeAllSearchsInString(name, " "), name);
}

function getArgumentValidValueIfValidColonCountFromArgumentsInString(string, argumentTh) {
    const value = getArgumentValueIfValidColonCountFromArgumentsInString(string, argumentTh);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(value, " ");
    const isOneOutsidePartsCount = outsideParts.length === 1;
    return createIfAndElseAndReturns(isOneOutsidePartsCount, removeAllSearchsInString(value, " "), value);
}

function isArgument2OutsidePartsFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
    return outsideParts.length === 2;
}

function isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
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

function getArgument2OutsidePartsIfValidOutsidePartsCountFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
    const isValidOutsidePartsCount = outsideParts.length === 2;
    let value = ["", ""];
    if (isValidOutsidePartsCount) {
        value = [outsideParts[0], outsideParts[1]];
    }
    return value;
}

function getArgument2ValidOutsidePartsIfValidOutsidePartsCountFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const outsideParts = getOutsideOfConsecutiveMatchingSearchsPartsFromString(argument, " ");
    const isValidOutsideParts = isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh);
    let value = ["", ""];
    if (isValidOutsideParts) {
        value = [outsideParts[0], outsideParts[1]];
    }
    return value;
}

function getArgumentValidNameFromArgumentsInString(string, argumentTh) {
    const isValidNameAndColon = isArgumentValidNameAndColonFromArgumentsInString(string, argumentTh);
    const isValidOutsideParts = isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh);
    const validNameIfValidColonCount = getArgumentValidNameIfValidColonCountFromArgumentsInString(string, argumentTh);
    const valid2Parts = getArgument2ValidOutsidePartsIfValidOutsidePartsCountFromArgumentsInString(string, argumentTh);
    const valueIfNotContainsColon = createIfAndElseAndReturns(isValidOutsideParts, valid2Parts[0], "");
    return createIfAndElseAndReturns(isValidNameAndColon, validNameIfValidColonCount, valueIfNotContainsColon);
}

function getArgumentValidValueFromArgumentsInString(string, argumentTh) {
    const isValidColonAndValue = isArgumentValidColonAndValueFromArgumentsInString(string, argumentTh);
    const isValidOutsideParts = isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh);
    const validValueIfValidColonCount = getArgumentValidValueIfValidColonCountFromArgumentsInString(string, argumentTh);
    const valid2Parts = getArgument2ValidOutsidePartsIfValidOutsidePartsCountFromArgumentsInString(string, argumentTh);
    const valueIfNotContainsColon = createIfAndElseAndReturns(isValidOutsideParts, valid2Parts[1], "");
    return createIfAndElseAndReturns(isValidColonAndValue, validValueIfValidColonCount, valueIfNotContainsColon);
}

function getArgumentNameFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidNameAndColon = isArgumentValidNameAndColonFromArgumentsInString(string, argumentTh);
    const isValidOutsideParts = isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh);
    const validName = getArgumentValidNameFromArgumentsInString(string, argumentTh);
    const beforeColonPart = getArgumentBeforeColonPartFromArgumentsInString(string, argumentTh);
    const isValidNameAndColonOrOutsideParts = isValidNameAndColon || isValidOutsideParts;
    const isContainsOneColon = isContainsOneSearchInString(argument, ":");
    const ifValidNameAndColonOrOutsideParts = createIfAndElseAndReturns(isContainsOneColon, beforeColonPart, argument);
    return createIfAndElseAndReturns(isValidNameAndColonOrOutsideParts, validName, ifValidNameAndColonOrOutsideParts);
}

function getArgumentValueFromArgumentsInString(string, argumentTh) {
    const argument = getArgumentFromArgumentsInString(string, argumentTh);
    const isValidColonAndValue = isArgumentValidColonAndValueFromArgumentsInString(string, argumentTh);
    const isValidOutsideParts = isArgument2ValidOutsidePartsFromArgumentsInString(string, argumentTh);
    const validValue = getArgumentValidNameFromArgumentsInString(string, argumentTh);
    const afterColonPart = getArgumentBeforeColonPartFromArgumentsInString(string, argumentTh);
    const isValidColonAndValueOrOutsideParts = isValidColonAndValue || isValidOutsideParts;
    const isContainsOneColon = isContainsOneSearchInString(argument, ":");
    const ifValidColonAndValueOrOutsideParts = createIfAndElseAndReturns(isContainsOneColon, afterColonPart, argument);
    return createIfAndElseAndReturns(isValidColonAndValueOrOutsideParts, validValue, ifValidColonAndValueOrOutsideParts);
}

function isNotJustSpacesString(string) {
    string = getValidString(string);
    const {length} = string;
    const containsAfterOfColonPartSpacesCount = containsSearchsCountInString(string, " ");
    const isAfterOfColonPartNotJustSpaces = length > containsAfterOfColonPartSpacesCount;
    return !isEmptyString(string) && isAfterOfColonPartNotJustSpaces;
}

function getValidString(string) {
    return createIfAndElseAndReturns(typeof string === "string", string, "" + string);
}

function isTypesOfObjects(objectsArray, typesArray) {
    objectsArray = getValidArray(objectsArray);
    typesArray = getValidArray(typesArray);
    const types = ["object", "string", "function", "boolean", "number", "undefined", "bigint", "symbol"];
    let value = false;
    if (isArrayAllElementsEqualsMatchSomeOfElementsInEqualsArray(typesArray, types)) {
        value = typeof objectsArray[0] === typesArray[0];
        for (let i = 0; i < objectsArray.length; i++) {
            value = value && typeof objectsArray[i] === typesArray[i];
        }
    }
    return value;
}

function getValidArray(array) {
    return createIfAndElseAndReturns(Array.isArray(array), array, []);
}

function isValidNumber(number) {
    return !isNaN(number) && number !== Infinity && number !== -Infinity;
}

function getValidNumber(number) {
    return createIfAndElseAndReturns(isValidNumber(number), number, 0);
}

function getValidInteger(integer) {
    return Number.parseInt(getValidNumber(integer));
}
