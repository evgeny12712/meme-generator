'use strict';

function drawText(currLine) {
    if (!currLine) var currLine = getCurrLine();
    var ctx = getContext();
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = currLine.color;
    ctx.font = currLine.font;
    ctx.fillText(currLine.txt, currLine.currPosition.x, currLine.currPosition.y);
    ctx.strokeText(currLine.txt, currLine.currPosition.x, currLine.currPosition.y);
    getCurrColor();
}

function drawRect() {
    var ctx = getContext();
    const currLine = getCurrLine();
    const fontSize = getCurrFontSize();
    const x = (currLine.currPosition.x - ctx.measureText(currLine.txt).width / 2) - fontSize / 8;
    const y = currLine.currPosition.y - getCurrFontSize();
    const textWidth = ctx.measureText(currLine.txt).width + fontSize / 4;
    ctx.beginPath();
    ctx.rect(x, y, textWidth, fontSize + fontSize / 4);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawImgFromlocal() {
    const ctx = getContext();
    const elCanvas = getCanvas();
    const img = new Image()
    img.src = gCurrImage.url;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height); //img,x,y,xend,yend
        drawTexts();
        if (getLines().length && isMarkChecked()) drawRect();
    }
}