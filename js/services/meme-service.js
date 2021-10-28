'use strict';

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: []
}

function createLine(txt = "", currPosition = { x: 225, y: 90 }, font = "40px Impact", color = "white", align = "center") {
    return { txt, currPosition, font, color, align };
}

function updateMeme(image, text = "", currPosition = { x: 225, y: 90 }, font = "40px Impact", color = "white", align = "center") {
    gMeme.lines.push(createLine(text, currPosition, font, color, align, currPosition));
    gMeme.selectedImgId = image.id;
}

function updateMemeLocation(x, y) {
    gMeme.lines.currPosition = { x, y }
}

function getMem() {
    return gMeme;
}

function updateCurrLine() {
    if (gMeme.selectedLineIdx === getLines().length - 1) gMeme.selectedLineIdx = 0;
    else if (gMeme.lines.length > 1) gMeme.selectedLineIdx++;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLines() {
    return gMeme.lines;
}