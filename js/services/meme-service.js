'use strict';

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: []
}

function _createLine(txt = "", font = "40px Impact", color = "black", align = "center") {
    return { txt, font, color, align };
}

function updateMeme(image, text = "", font = "40px Impact", color = "black", align = "center") {
    gMeme.lines.push(_createLine(text, font, color, align));
    gMeme.selectedImgId = image.id;
}

function getMem() {
    return gMeme;
}