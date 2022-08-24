window.canvas = null;
window.context = null;
const DIGITS = "0123456789";
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
const lowercaseLettersAToF = 'abcdef';
const capitalLettersAToF = 'ABCDEF';
const digitsAndLowercaseLettersAToF = DIGITS + lowercaseLettersAToF;
const digitsAndCapitalLettersAToF = DIGITS + capitalLettersAToF;
const hexStringLength = lowercaseLettersAToF.length;
const numberWithNumberTypePossibleParameters = ["half", "quarter", "three-quarter", "eighth", "three-eighths", "five-eighths", "seven-eighths", "sixteenth", "three-sixteenths", "five-sixteenths", "seven-sixteenths", "nine-sixteenths", "eleven-sixteenths", "thirteen-sixteenths", "fifteen-sixteenths"];
const minToMaxNumberWithNumberTypePossibleParameters = ["quarter to three-quarter", "eighth to seven-eighths", "three-eighths to five-eighths", "sixteenth to fifteen-sixteenths", "three-sixteenths to thirteen-sixteenths", "five-sixteenths to eleven-sixteenths", "seven-sixteenths to nine-sixteenths"];
const numberWithTypePossibleParameters = ["number", "min to max"];
const tHex = {};
tHex.min = 0;
tHex.max = 255;
tHex.numberWithTypeReferenceNumber = type => createIfAndElseAndReturns(type === numberWithTypePossibleParameters[0], null, createIfAndElseAndReturns(type === numberWithTypePossibleParameters[1], 256, 0));
tHex.isSearchEqualsMinToMaxWithNumberTypePossibleParametersSomeElement = function (search) {
    return isObjectEqualsSomeElementOfArray(getNonNullString(search), minToMaxNumberWithNumberTypePossibleParameters);
};
tHex.hexColor = hex => subStringWithFromIndex(hex, 1);
tHex.subStringHexPart = (hex, fromIndex) => subString(tHex.hexColor(hex), fromIndex, fromIndex + 1);
tHex.isHexColor = function (value) {
    const length = getNonNullString(value).length;
    return value !== null && isStringAllCharsEqualsMatchSomeOfCharsInText(value, DIGITS + lowercaseLettersAToF + capitalLettersAToF) && (length === 3 || length === 6 || length === 8);
};
tHex.isHex = value => tHex.isHexColor(tHex.hexColor(value)) && value[0] === "#";
tHex.changeUppercaseHexCharToLowercaseHexCharCondition = function (hexChar) {
    return hexChar !== null && isCharEqualsCharacterOfText(hexChar, DIGITS + lowercaseLettersAToF + capitalLettersAToF) && getNonNullString(hexChar).length === 1;
};
tHex.changeUppercaseHexCharToLowercaseHexChar = function (hexChar) {
    let value = "";
    hexChar = getNonNullString(hexChar);
    if (tHex.changeUppercaseHexCharToLowercaseHexCharCondition(hexChar)) {
        if (isCharEqualsCharacterOfText(hexChar, capitalLettersAToF)) {
            hexChar = lowercaseLettersAToF[capitalLettersAToF.indexOf(hexChar)];
        }
        value = hexChar;
    }
    return value;
};
tHex.changeUppercaseHexPartToLowercaseHexPart = function (hexPart) {
    hexPart = getNonNullString(hexPart);
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
tHex.getQuarterToThreeQuarterNumber = number => getSevenEighthsInteger(number) + getSixteenthInteger(number);
tHex.validateNumberIfNumberBetween0And255 = function (number) {
    let value = 0;
    number = Number.parseInt(number);
    if (number >= 0 && number <= 255) {
        return number;
    }
    return value;
};
tHex.validateNumberIfNumberBetween255And510 = function (number) {
    let value = 0;
    number = Number.parseInt(number);
    if (number >= 255 && number <= 510) {
        return tHex.validateNumberIfNumberBetween0And255(255 - (number - 255));
    }
    return value;
};
tHex.validateNumberIfNumberBetween0And510 = function (number) {
    let value = 0;
    number = Number.parseInt(number);
    if (number >= 0 && number <= 510) {
        if (number <= 255) {
            value = tHex.validateNumberIfNumberBetween0And255(number);
        } else if (number >= 255) {
            value = tHex.validateNumberIfNumberBetween255And510(number);
        }
    }
    return value;
};
tHex.validateNumberIfNumberGreaterThanOrEquals0 = function (number) {
    let value = 0;
    number = Number.parseInt(number);
    if (number >= 0) {
        let i = number;
        if (number > 510) {
            while (i > 510) {
                i -= 510;
            }
        }
        value = tHex.validateNumberIfNumberBetween0And510(i);
    }
    return value;
};
tHex.validateNumber = number => tHex.validateNumberIfNumberGreaterThanOrEquals0(getPositiveNumber(Number.parseInt(number)));
tHex.convertHexPartToNumber = function (hexPart) {
    hexPart = tHex.changeUppercaseHexPartToLowercaseHexPart(hexPart);
    return ((digitsAndLowercaseLettersAToF.indexOf(hexPart[0]) * 16) - 1) + (digitsAndLowercaseLettersAToF.indexOf(hexPart[1]) + 1);
};
tHex.convertHexToRgbaArray = function (hex) {
    let value = [0, 0, 0, 0];
    hex = getNonNullString(hex);
    if (tHex.isHex(hex) && hex.length === 9) {
        const red = tHex.convertHexPartToNumber(tHex.subStringHexPart(hex, 0));
        const green = tHex.convertHexPartToNumber(tHex.subStringHexPart(hex, 2));
        const blue = tHex.convertHexPartToNumber(tHex.subStringHexPart(hex, 4));
        const alpha = tHex.convertHexPartToNumber(tHex.subStringHexPart(hex, 6));
        value = [red, green, blue, alpha];
    }
    return value;
};
tHex.convertHexToRgbArray = function (hex) {
    let value = [0, 0, 0];
    hex = getNonNullString(hex);
    if (tHex.isHex(hex) && hex.length === 7) {
        value = tHex.convertHexToRgbaArray(hex + "ff");
        value.pop();
    }
    return value;
};
tHex.convertNumberToHexPartIfNumberBetween0And255 = function (number) {
    let value = "";
    number = getNonNullNumber(number);
    if (number >= 0 && number <= 255) {
        if ((number + 1) % 16 === 0) {
            value = digitsAndLowercaseLettersAToF[((number + 1) / 16) - 1] + "f";
        } else if ((number + 1) % 16 !== 0) {
            let i = number + 1;
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
tHex.convertNumberToHexPartIfNumberBetween255And510 = function (number) {
    number = tHex.validateNumberIfNumberBetween255And510(number);
    return tHex.convertNumberToHexPartIfNumberBetween0And255(number);
};
tHex.convertNumberToHexPartIfNumberBetween0And510 = function (number) {
    number = tHex.validateNumberIfNumberBetween0And510(number);
    return tHex.convertNumberToHexPartIfNumberBetween0And255(number);
};
tHex.convertNumberToHexPartIfNumberGreaterThanOrEquals0 = function (number) {
    number = tHex.validateNumberIfNumberGreaterThanOrEquals0(number);
    return tHex.validateNumberIfNumberBetween0And255(number);
};
tHex.convertNumberToHexPart = function (number) {
    number = tHex.validateNumber(number);
    return tHex.convertNumberToHexPartIfNumberBetween0And255(number);
};
tHex.convertRgbaNumbersToHex = function (red, green, blue, alpha) {
    const redPart = tHex.convertNumberToHexPart(red);
    const greenPart = tHex.convertNumberToHexPart(green);
    const bluePart = tHex.convertNumberToHexPart(blue);
    const alphaPart = tHex.convertNumberToHexPart(alpha);
    return "#" + redPart + greenPart + bluePart + alphaPart;
};
tHex.convertRgbNumbersToHex = (red, green, blue) => subStringWithToIndex(tHex.convertRgbaNumbersToHex(red, green, blue, 255), 6);
tHex.convertRgbaNumbersArrayToHex = function (rgbaArray) {
    rgbaArray = getNonNullArray(rgbaArray);
    return tHex.convertRgbaNumbersToHex(rgbaArray[0], rgbaArray[1], rgbaArray[2], rgbaArray[3]);
};
tHex.convertRgbNumbersArrayToHex = function (rgbArray) {
    rgbArray = getNonNullArray(rgbArray);
    return tHex.convertRgbNumbersToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
};
tHex.getNumberWithTypePossibleParameters = function (type) {
    return createIfAndElseAndReturns(type === numberWithTypePossibleParameters[1], minToMaxNumberWithNumberTypePossibleParameters, createIfAndElseAndReturns(type === numberWithTypePossibleParameters[0], numberWithNumberTypePossibleParameters, []));
}
tHex.getNumberWithTypeIndexPossibleParameters = function (typeIndex) {
    return tHex.getNumberWithTypePossibleParameters(numberWithTypePossibleParameters[typeIndex]);
}
tHex.getRgbaTHexWithNumberType = function (hex, type, numberType) {
    const possibleParameters = numberWithTypePossibleParameters;
    let value = "";
    if (tHex.isHex(hex) && hex.length === 9 && isObjectEqualsSomeElementOfArray(type, possibleParameters)) {
        const rgbaArray = tHex.convertHexToRgbaArray(hex);
        const redPart = tHex.convertNumberToHexPart(getNumberWithType(type, numberType, tHex.numberWithTypeReferenceNumber(type), rgbaArray[0] + 1) - 1);
        const greenPart = tHex.convertNumberToHexPart(getNumberWithType(type, numberType, tHex.numberWithTypeReferenceNumber(type), rgbaArray[1] + 1) - 1);
        const bluePart = tHex.convertNumberToHexPart(getNumberWithType(type, numberType, tHex.numberWithTypeReferenceNumber(type), rgbaArray[2] + 1) - 1);
        const alphaPart = tHex.convertNumberToHexPart(getNumberWithType(type, numberType, tHex.numberWithTypeReferenceNumber(type), rgbaArray[3] + 1) - 1);
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
tHex.getRgbaEighthToSevenEighthsHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getRgbaQuarterToThreeQuarterHex = hex => tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
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
tHex.getRgbEighthToSevenEighthsHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getRgbQuarterToThreeQuarterHex = hex => tHex.getRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
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
        const redPart = tHex.getReverseHexPart(tHex.convertNumberToHexPart(getNumberWithType(type, numberType, referenceNumber, rgbaArray[0] + 1) - 1));
        const greenPart = tHex.getReverseHexPart(tHex.convertNumberToHexPart(getNumberWithType(type, numberType, referenceNumber, rgbaArray[1] + 1) - 1));
        const bluePart = tHex.getReverseHexPart(tHex.convertNumberToHexPart(getNumberWithType(type, numberType, referenceNumber, rgbaArray[2] + 1) - 1));
        const alphaPart = tHex.getReverseHexPart(tHex.convertNumberToHexPart(getNumberWithType(type, numberType, referenceNumber, rgbaArray[3] + 1) - 1));
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
tHex.getReverseRgbaEighthToSevenEighthsHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getReverseRgbaQuarterToThreeQuarterHex = hex => tHex.getReverseRgbaTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
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
tHex.getReverseRgbEighthToSevenEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 0);
tHex.getReverseRgbQuarterToThreeQuarterHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 1);
tHex.getReverseRgbThreeEighthsToFiveEighthsHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 2);
tHex.getReverseRgbSixteenToFifteenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 3);
tHex.getReverseRgbThreeSixteenthsToThirteenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 4);
tHex.getReverseRgbFiveSixteenthsToElevenSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 5);
tHex.getReverseRgbSevenSixteenthsToNineSixteensHex = hex => tHex.getReverseRgbTHexWithTypeIndexAndNumberTypeIndex(hex, 1, 6);

//// noinspection JSDeprecatedSymbols
//event.getMousePos = (element) => ({
//    x: event.clientX - element.getBoundingClientRect().left,
//    y: event.clientY - element.getBoundingClientRect().top
//});

console.log(tHex.getReverseHex("#fffaaa"));
console.log(tHex.getReverseHex("#ffffffff"));
console.log(tHex.getReverseHex("#ffffff"));
console.log(tHex.convertNumberToHexPart(255));
console.log(tHex.getRgbaTHexWithTypeIndexAndNumberTypeIndex("#ffffffff", 0, 0));
console.log(tHex.getRgbaEighthHex("#ffffffff"));
console.log(tHex.getRgbaQuarterHex("#ffffffff"));
console.log(tHex.getRgbaThreeEighthsHex("#ffffffff"));
console.log(tHex.getRgbaHalfHex("#ffffffff"));
console.log(tHex.getRgbaFiveEighthsHex("#ffffffff"));
console.log(tHex.getRgbaThreeQuarterHex("#ffffffff"));
console.log(tHex.getRgbaSevenEighthsHex("#ffffffff"));
console.log(getMinToMaxIntegerWithNumberTypeIndex(0, 256, 0));
console.log(tHex.getRgbaEighthToSevenEighthsHex("#ffffffff"));
console.log(tHex.getRgbaQuarterToThreeQuarterHex("#ffffffff"));
console.log(tHex.getRgbaThreeEighthsToFiveEighthsHex("#ffffffff"));
console.log(tHex.getRgbaSixteenToFifteenSixteensHex("#ffffffff"));
console.log(tHex.getRgbaThreeSixteenthsToThirteenSixteensHex("#ffffffff"));
console.log(tHex.getRgbaFiveSixteenthsToElevenSixteensHex("#ffffffff"));
console.log(tHex.getRgbaSevenSixteenthsToNineSixteensHex("#ffffffff"));
console.log(getMinToMaxIntegerWithNumberTypeIndex(1, 256, 0));
console.log(getMinToMaxIntegerWithNumberTypeIndex(2, 256, 0));
console.log(getMinToMaxIntegerWithNumberTypeIndex(3, 256, 0));
console.log(getMinToMaxIntegerWithNumberTypeIndex(4, 256, 0));
console.log(getMinToMaxIntegerWithNumberTypeIndex(5, 256, 0));
console.log(getMinToMaxIntegerWithNumberTypeIndex(6, 256, 0));
console.log(tHex.convertNumberToHexPart(getNumberWithType("number", "half", null, 50)));
const hex1_ = "#e568c091";
console.log(tHex.convertHexToRgbaArray(hex1_));
console.log(tHex.numberWithTypeReferenceNumber("number"));
console.log(tHex.numberWithTypeReferenceNumber("min to max"));
console.log(tHex.validateNumber(-255));
console.log(getHalfInteger(tHex.convertHexToRgbaArray(hex1_)[0]));
console.log(getHalfInteger(tHex.convertHexToRgbaArray(hex1_)[1]));
console.log(getHalfInteger(tHex.convertHexToRgbaArray(hex1_)[2]));
console.log(getHalfInteger(tHex.convertHexToRgbaArray(hex1_)[3]));
console.log(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[0]));
console.log(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[1]));
console.log(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[2]));
console.log(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[3]));
console.log(tHex.convertNumberToHexPart(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[0])));
console.log(tHex.convertNumberToHexPart(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[1])));
console.log(tHex.convertNumberToHexPart(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[2])));
console.log(tHex.convertNumberToHexPart(getNumberWithType("number", "half", null, tHex.convertHexToRgbaArray(hex1_)[3])));
console.log(getNumberWithType("min to max", "quarter to three-quarter", 256, tHex.convertHexToRgbaArray("#ff000000")[0] + 1) - 1);
console.log(getNumberWithType("number", "quarter", null, 500));
console.log(tHex.convertNumberToHexPart(getNumberWithType(numberWithTypePossibleParameters[1], minToMaxNumberWithNumberTypePossibleParameters[0], 256, tHex.convertHexToRgbaArray("#00000000")[0] + 1) - 1));
console.log(getNumberWithNumberTypeIndex(10, 256));
console.log(getNumberWithNumberTypeIndex(10, 256));

function stringNumber(stringNumberValue) {
    window.stringNumber = stringNumber;
    if (stringNumberValue === null || !isStringAllCharsEqualsDigits(stringNumberValue)) {
        window.stringNumber.value = stringNumberValue === null ? null : "0";
    } else {
        function isNumberBetweenMinAndMax(number, min, max) {
            const validMinAndMax = validateMinAndMax(min, max);
            number = getNonNullNumber(number);
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
}

function removeAllReplaceStringCharsInSearchString(searchString, replaceString) {
    let value = getNonNullString(searchString);
    for (const element of getNonNullString(replaceString)) {
        value = value.replaceAll(element, "");
    }
    return value;
}

function removeReplaceStringCharsInSearchString(searchString, replaceString) {
    let value = getNonNullString(searchString);
    for (const element of getNonNullString(replaceString)) {
        value = value.replace(element, "");
    }
    return value;
}

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

function createIfAndElseAndReturns(condition, ifTrue, ifFalse) {
    if (condition) {
        return ifTrue;
    } else {
        return ifFalse;
    }
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
    const addOne = window.max1DigitOfNumberAddOneIfNumberGreaterThan0(digits[digits.length - 1]);
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
    const addOne = window.max2DigitsOfNumberAddOne(subStringWithToIndex(digits, 1));
    if (isStringAllCharsEqualsDigitsAndLength(digits, 2)) {
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
    for (const element of getNonNullString(text)) {
        value = getNonNullString(char) === element;
        if (value) {
            break;
        }
    }
    return value;
}

function isStringAllCharsEqualsMatchSomeOfCharsInText(string, text) {
    let value = true;
    for (const element of getNonNullString(string)) {
        value = value && isCharEqualsCharacterOfText(element, getNonNullString(text));
    }
    return value;
}

function isObjectEqualsSomeElementOfArray(object, array) {
    let isBreak = false;
    for (const element of array) {
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

function createArrayOfOneObject(element, length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(element);
    }
    return array;
}

/**
 * @param value if this less than 0, then equal to 0; else this
 * @returns {number|*}
 */
function getValueWithGreaterThanOrEqualsZero(value) {
    value = getNonNullString(value);
    value = value.length > 0 ? value : 0;
    return value[0] === "-" ? 0 : value;
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

function getHalfInteger(number) {
    number = getNonNullNumber(number);
    return (number + 1) % 2 === 0 ? ((number + 1) / 2) - 1 : createIfAndElseAndReturns(number % 2 === 0, number / 2, number);
}

function getQuarterInteger(number) {
    return getHalfInteger(getHalfInteger(number));
}

function getThreeQuarterInteger(number) {
    return getHalfInteger(number) + getQuarterInteger(number);
}

function getEighthInteger(number) {
    return getHalfInteger(getQuarterInteger(number));
}

function getThreeEighthsInteger(number) {
    return getQuarterInteger(number) + getEighthInteger(number);
}

function getFiveEighthsInteger(number) {
    return getHalfInteger(number) + getEighthInteger(number);
}

function getSevenEighthsInteger(number) {
    return getThreeQuarterInteger(number) + getEighthInteger(number);
}

function getSixteenthInteger(number) {
    return getQuarterInteger(getQuarterInteger(number));
}

function getThreeSixteenthsInteger(number) {
    return getEighthInteger(number) + getSixteenthInteger(number);
}

function getFiveSixteenthsInteger(number) {
    return getQuarterInteger(number) + getSixteenthInteger(number);
}

function getSevenSixteenthsInteger(number) {
    return getThreeEighthsInteger(number) + getSixteenthInteger(number);
}

function getNineSixteenthsInteger(number) {
    return getHalfInteger(number) + getSixteenthInteger(number);
}

function getElevenSixteenthsInteger(number) {
    return getFiveEighthsInteger(number) + getSixteenthInteger(number);
}

function getThirteenSixteenthsInteger(number) {
    return getQuarterInteger(number) + getSixteenthInteger(number);
}

function getFifteenthSixteenthsInteger(number) {
    return getSevenEighthsInteger(number) + getSixteenthInteger(number);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(numberType, positiveReferenceNumber, positiveNumber) {
    const possibleParameters = minToMaxNumberWithNumberTypePossibleParameters;
    let value = 0;
    positiveReferenceNumber = Number.parseInt(positiveReferenceNumber);
    positiveNumber = Number.parseInt(positiveNumber);
    numberType = getNonNullString(numberType);
    if (numberType === possibleParameters[0]) {
        value = getHalfInteger(positiveNumber) + getQuarterInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[1]) {
        value = getThreeQuarterInteger(positiveNumber) + getEighthInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[2]) {
        value = getQuarterInteger(positiveNumber) + getThreeEighthsInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[3]) {
        value = getSevenEighthsInteger(positiveNumber) + getSixteenthInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[4]) {
        value = getFiveEighthsInteger(positiveNumber) + getThreeSixteenthsInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[5]) {
        value = getThreeEighthsInteger(positiveNumber) + getFiveSixteenthsInteger(positiveReferenceNumber);
    } else if (numberType === possibleParameters[6]) {
        value = getEighthInteger(positiveNumber) + getSevenSixteenthsInteger(positiveReferenceNumber);
    }
    return createIfAndElseAndReturns(positiveReferenceNumber >= 0 && positiveNumber >= 0 && positiveNumber <= positiveReferenceNumber, value, 0);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetweenReferenceNumberAndOutOfOneOfDoubleReferenceNumber(numberType, positiveReferenceNumber, positiveNumber) {
    positiveReferenceNumber = Number.parseInt(positiveReferenceNumber);
    positiveNumber = Number.parseInt(positiveNumber);
    return createIfAndElseAndReturns(positiveReferenceNumber >= 0 && positiveNumber >= positiveReferenceNumber && positiveNumber <= (positiveReferenceNumber * 2) - 1, validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(numberType, positiveReferenceNumber, positiveReferenceNumber - (positiveNumber - positiveReferenceNumber)), 0);
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndOutOfOneOfDoubleReferenceNumber(numberType, positiveReferenceNumber, positiveNumber) {
    let value = 0;
    positiveReferenceNumber = Number.parseInt(positiveReferenceNumber);
    positiveNumber = Number.parseInt(positiveNumber);
    if (positiveNumber >= 0 && positiveNumber <= (positiveReferenceNumber * 2) - 1) {
        if (positiveNumber <= positiveReferenceNumber) {
            value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndReferenceNumber(numberType, positiveReferenceNumber, positiveNumber);
        } else if (positiveNumber >= positiveReferenceNumber) {
            value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetweenReferenceNumberAndOutOfOneOfDoubleReferenceNumber(numberType, positiveReferenceNumber, positiveNumber);
        }
    }
    return value;
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberGreaterThanOrEquals0(numberType, positiveReferenceNumber, positiveNumber) {
    let value = 0;
    positiveReferenceNumber = Number.parseInt(positiveReferenceNumber);
    positiveNumber = Number.parseInt(positiveNumber);
    if (positiveNumber >= 0) {
        const max = (positiveReferenceNumber * 2) - 1;
        let i = positiveNumber;
        if (positiveNumber > max) {
            while (i > max) {
                i -= max;
            }
        }
        value = validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberBetween0AndOutOfOneOfDoubleReferenceNumber(numberType, positiveReferenceNumber, i);
    }
    return value;
}

function validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0(numberType, positiveReferenceNumber, number) {
    positiveReferenceNumber = Number.parseInt(positiveReferenceNumber);
    number = Number.parseInt(number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0AndNumberGreaterThanOrEquals0(numberType, positiveReferenceNumber, getPositiveNumber(number));
}

function validateIntegerWithNumberType(numberType, referenceNumber, number) {
    referenceNumber = getNonNullNumber(referenceNumber);
    number = getNonNullNumber(number);
    return validateIntegerWithNumberTypeIfReferenceNumberGreaterThanOrEquals0(numberType, createIfAndElseAndReturns(referenceNumber < 0, -referenceNumber, referenceNumber), createIfAndElseAndReturns(referenceNumber < 0, -number, number));
}

function getMinToMaxIntegerWithNumberType(numberType, referenceNumber, number) {
    referenceNumber = getNonNullNumber(referenceNumber);
    number = getNonNullNumber(number);
    return referenceNumber > 0 ? validateIntegerWithNumberType(numberType, referenceNumber, number) : createIfAndElseAndReturns(referenceNumber < 0, -validateIntegerWithNumberType(numberType, -referenceNumber, -number), 0);
}

function getMinToMaxIntegerWithNumberTypeIndex(numberTypeIndex, referenceNumber, number) {
    return getMinToMaxIntegerWithNumberType(minToMaxNumberWithNumberTypePossibleParameters[numberTypeIndex], referenceNumber, number);
}

function getNumberWithNumberType(numberType, number) {
    const possibleParameters = numberWithNumberTypePossibleParameters;
    let value = 0;
    numberType = getNonNullString(numberType);
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

function getNumberWithType(type, numberType, referenceNumber, number) {
    const possibleParameters = numberWithTypePossibleParameters;
    let numberTypeValue = 0;
    if (type === possibleParameters[0] && referenceNumber === null) {
        numberTypeValue = getNumberWithNumberType(numberType, number);
    } else if (type === possibleParameters[1]) {
        numberTypeValue = getMinToMaxIntegerWithNumberType(numberType, referenceNumber, number);
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

function validateMinAndMax(min, max) {
    min = getNonNullNumber(min);
    max = getNonNullNumber(max);
    if (max < min) {
        const i = min;
        min = max;
        max = i;
    }
    return [min, max];
}

function validateNumber(number, min, max) {
    number = getNonNullNumber(number);
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

function validateStartAndEnd(min, max, start, end) {
    start = validateNumber(start, min, max);
    end = validateNumber(end, min, max);
    return [start, end];
}

function subString(string, fromIndex, toIndex) {
    let value;
    string = getNonNullString(string);
    if (isEmptyString(string)) {
        value = string;
    } else {
        const validFromAndToIndex = validateStartAndEnd(0, string.length, fromIndex, toIndex);
        fromIndex = validFromAndToIndex[0];
        toIndex = validFromAndToIndex[1];
        const substring = string.substring(fromIndex, toIndex + 1);
        value = toIndex < fromIndex ? getReverseString(substring) : substring;
    }
    return value;
}

function subStringWithFromIndex(string, fromIndex) {
    return subString(string, fromIndex, getNonNullString(string).length - 1);
}

function subStringWithToIndex(string, toIndex) {
    return subString(string, 0, toIndex);
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

// noinspection JSDeprecatedSymbols
const getCanvasMousePos = () => ({
    x: event.clientX - canvas.getBoundingClientRect().left,
    y: event.clientY - canvas.getBoundingClientRect().top
});

function countBorderTextWithMin(text, count) {
    return "(" + text + " = " + count + ") the " + text + " value must be greater than or equal to " + 0;
}

function countBordersText(text, count, min, max) {
    return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
}

function isEmptyString(string) {
    return getNonNullString(string).length === 0;
}

function getStringIndexOf(string, char) {
    return getNonNullString(string).indexOf(char);
}

function isContainsCharInString(string, char) {
    return getStringIndexOf(string, char) > -1;
}

function getNonNullString(string) {
    return string === null ? "" : "" + string;
}

function getNonNullArray(array) {
    return array === null ? [] : array;
}

function getNonNullNumber(number) {
    return number === null ? 0 : number;
}
