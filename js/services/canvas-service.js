'use strict';


function drawText(currLine) {
    if (!currLine) var currLine = getCurrLine();
    const ctx = getContext();
    ctx.textAlign = currLine.align;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = currLine.color;
    ctx.font = currLine.font;
    ctx.fillText(currLine.txt, currLine.currPosition.x, currLine.currPosition.y);
    ctx.strokeText(currLine.txt, currLine.currPosition.x, currLine.currPosition.y);
}

function drawImgFromlocal(imageUrl) {
    const ctx = getContext();
    const elCanvas = getCanvas();
    const img = new Image()
    img.src = imageUrl;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height) //img,x,y,xend,yend
        drawTexts();
    }
}

function drawTexts() {
    var lines = getLines();
    for (var i = 0; i < lines.length; i++) {
        drawText(lines[i]);
    }
}