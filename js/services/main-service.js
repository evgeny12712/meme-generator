'use strict';
var gImages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

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

function drawText(txt) {
    var y = getY();
    gCtx.textAlign = "center";
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.fillText(txt, 225, y);
    gCtx.strokeText(txt, 225, y);
}

function getY() {
    var numOfLines = getMem().lines.length;
    if (!numOfLines) return 80;
    else if (numOfLines === 1) return 400;
    else return 225;
}