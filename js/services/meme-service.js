'use strict';

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: []
}

function addLine(image, txt = "",
    currPosition = { x: getCanvas().width / 2, y: getCanvas().height / 5 },
    font = '40px ' + getCurrFont(),
    color = getColorFromPicker(),
    align = "center") {
    gMeme.lines.push({ txt, currPosition, font, color, align });
    gMeme.selectedImgId = image.id;
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,

        lines: []
    }
}

function updateMemeLocation(x, y) {
    gMeme.lines.currPosition = { x, y }
}

function getMeme() {
    return gMeme;
}

function updateCurrLine() {
    if (gMeme.selectedLineIdx >= getLines().length - 1) gMeme.selectedLineIdx = 0;
    else if (gMeme.lines.length > 1) gMeme.selectedLineIdx++;
    drawImgFromlocal();
}

function setCurrLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx;
    drawImgFromlocal();
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx;
}

function getLines() {
    return gMeme.lines;
}