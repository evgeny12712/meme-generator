'use strict';
var gImages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,

    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}

function getImages() {
    return gImages;
}