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
    getCurrColor();
}

function drawRect() {
    const currLine = getCurrLine();
    const x = 20;
    const y = currLine.currPosition.y - getCurrFontSize() - 10;
    var ctx = getContext();
    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.rect(x, y, 400, getCurrFontSize() + 20);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawImgFromlocal(imageUrl) {
    const ctx = getContext();
    const elCanvas = getCanvas();
    const img = new Image()
    img.src = imageUrl;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height); //img,x,y,xend,yend
        drawTexts();
        if (getLines().length && isMarkChecked()) drawRect();
    }
}