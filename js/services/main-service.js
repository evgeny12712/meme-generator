'use strict';
var gImgs = [{ id: 1, url: 'images/gallery/trump.jpg', keywords: ['funny'] },
    { id: 2, url: 'images/gallery/alittle-bit.jpg', keywords: ['funny'] },
    { id: 3, url: 'images/gallery/baby-puppy.jpg', keywords: ['children', 'animals'] },
    { id: 4, url: 'images/gallery/cat.jpg', keywords: ['animals'] },
    { id: 5, url: 'images/gallery/cheers.jpg', keywords: ['funny'] },
    { id: 6, url: 'images/gallery/explain.jpg', keywords: ['listening'] },
    { id: 7, url: 'images/gallery/funny-boy.jpg', keywords: ['children', 'funny'] },
    { id: 8, url: 'images/gallery/galsses.jpg', keywords: ['listening', 'shoked'] },
    { id: 9, url: 'images/gallery/listening.jpg', keywords: ['listening'] },
    { id: 10, url: 'images/gallery/nba-kiss.jpg', keywords: ['funny'] },
    { id: 11, url: 'images/gallery/puppies.jpg', keywords: ['animals'] },
    { id: 12, url: 'images/gallery/putin.jpg', keywords: ['shocked'] },
    { id: 13, url: 'images/gallery/shocked.jpg', keywords: ['shoked'] },
    { id: 14, url: 'images/gallery/smiling-obama.jpg', keywords: ['funny'] },
    { id: 15, url: 'images/gallery/success-boy.jpg', keywords: ['funny', 'children'] },
    { id: 16, url: 'images/gallery/surprised-boy.jpg', keywords: ['funny', 'children'] },
    { id: 17, url: 'images/gallery/yours.jpg', keywords: ['listening'] },
    { id: 18, url: 'images/gallery/zadik.jpg', keywords: ['funny'] },
];


function getImages() {
    return gImgs;
}

function getImageById(id) {
    return gImgs.find(image => id === image.id);
}

function drawTexts() {
    const lines = getLines();
    lines.forEach((line) => drawText(line));
}

function getY() {
    var numOfLines = getMeme().lines.length;
    if (numOfLines < 1) return 90;
    else if (numOfLines < 2) return 400;
    else return 225;
}

function getCurrFontSize() {
    return +getCurrLine().font.split('p')[0];
}

function isOutCanvas(x, y) {
    var fontSize = +getCurrLine().font.split('p')[0];
    return x - fontSize - 5 < 0 || y - fontSize + 5 < 0 || x + fontSize > getCanvas().width || y > getCanvas().height;
}