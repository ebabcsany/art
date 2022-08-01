const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const DIGITS = "0123456789";
const canvasWidthInputText = "canvas-width";
const canvasHeightInputText = "canvas-height";
const canvasWidthInput = document.getElementById(canvasWidthInputText);
const canvasHeightInput = document.getElementById(canvasHeightInputText);
const black = "rgb(0, 0, 0)";
const white = "rgb(255, 255, 255)";
const transparent = "rgba(0, 0, 0, 0)";
const half = 1 / 2;
const quarter = half / 2;
const threeQuarters = half + quarter;
const eighth = quarter / 2;
const threeEighths = quarter + eighth;
const fiveEighths = half + eighth;
const sevenEighths = threeQuarters + eighth;
const sixteenth = eighth / 2;
let listOfLineTo = null;
let listOfLineToColors = null;

function getObjectWithConditionalBoolean(condition, ifTrue, ifFalse) {
    return condition ? ifTrue : ifFalse;
}

function charEqualsCharacterOfText(char, text) {
    let value = true;
    for (let i = 0; i < text.length; i++) {
        value = char === text.charAt(i);
    }
    return value;
}

function stringAllCharsMatchSomeOfCharsInText(string, text) {
    let value = true;
    for (let i = 0; i < text.length; i++) {
        value = value && charEqualsCharacterOfText(string.charAt(i), text);
    }
    return value;
}

function charEqualsDigit(char) {
    return charEqualsCharacterOfText(char, DIGITS);
}

function stringAllCharsEqualsDigits(string) {
    return stringAllCharsMatchSomeOfCharsInText(string, DIGITS);
}

function getNonNullString(string) {
    return string === null ? "" : string.toString();
}

function getNonNullNumber(number) {
    return number === null ? 0 : number;
}

function isEmptyString(string) {
    return getNonNullString(string).length === 0;
}

function getReverseString(string) {
    let value = "";
    if (string !== null) {
        for (let i = 0; i < string.length; i++) {
            value += string[string.length - 1 - i];
        }
    }
    return value;
}

function validateNumber(min, max, number) {
    let value;
    const nonNullMin = getNonNullNumber(min);
    const nonNullMax = getNonNullNumber(max);
    min = max < min ? nonNullMax : nonNullMin;
    max = max < min ? nonNullMin : nonNullMax;
    number = getNonNullNumber(number);
    if (number < min) {
        value = min;
    } else if (number > max) {
        value = max;
    } else {
        value = number;
    }
    return value;
}

function validateStartAndEnd(min, max, start, end) {
    start = validateNumber(min, max, start);
    end = validateNumber(min, max, end);
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

/**
 * @param value if this less than 0, then equal to 0; else this
 * @returns {number|*}
 */
function getValueWithGreaterThanOrEqualsZero(value) {
    return value.toString().charAt(0) === "-" ? 0 : value;
}

function setCanvasWidth(value) {
    canvas.width = getValueWithGreaterThanOrEqualsZero(value);
}

function setCanvasHeight(value) {
    canvas.height = getValueWithGreaterThanOrEqualsZero(value);
}

function setCanvasSize(size) {
    setCanvasWidth(size);
    setCanvasHeight(size);
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

function lineWidth(value) {
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

function lineTo(lineX, lineY) {
    listOfLineTo = [];
    listOfLineTo += [lineX, lineY];
}

function coloredLineTo(style, lineX, lineY) {
    listOfLineToColors = [];
    listOfLineToColors += style;
    lineTo(lineX, lineY);
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

/*function stroke() {
    if (listOfLineTo !== null) {
        const length = listOfLineTo.length;
        if (length > 1) {
            for (let i = 1; i < length; i++) {
                if (listOfLineToColors === null) {

                }
                drawLine(listOfLineTo[i-1][0], listOfLineTo[i-1][1], listOfLineTo[i][0], listOfLineTo[i][1]);
            }
        } else {
            const moveAndLineX = listOfLineTo[0][0];
            const moveAndLineY = listOfLineTo[0][1];
            const color = listOfLineToColors[0];
            if (listOfLineToColors === null) {
                drawLine(moveAndLineX, moveAndLineY, moveAndLineX, moveAndLineY);
            } else {
                drawColoredLine(color, moveAndLineX, moveAndLineY, moveAndLineX, moveAndLineY);
            }
        }
        for (const element of listOfLineTo) {
            defaultLineTo(element[0], element[1]);
        }
        listOfLineTo = null;
    }

    defaultStroke();
}*/

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

function getReverseHexChar(color) {
    const string = '0123456789';
    const string1 = 'abcdef';
    const string2 = 'ABCDEF';
    let hexStringLength = string.length + string1.length;
    for (let i = 0; i < hexStringLength; i++) {
        if (color === (string + string1)[i] || color === (string + string2)[i]) {
            return getReverseString(string + string1)[i];
        }
    }
}

function getReverseHex(hex) {
    let value = '';
    const hexColor = subString(hex, 1, hex.length - 1);
    for (const element of hexColor) {
        value += getReverseHexChar(element);
    }
    return "#" + value;
}

function countBorderTextWithMin(text, count) {
    return "(" + text + " = " + count + ") the " + text + " value must be greater than or equal to " + 0;
}

function countBordersText(text, count, min, max) {
    return "(" + text + " = " + count + ") the " + text + " value must be between " + min + " and " + max;
}
