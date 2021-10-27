'use strict';
renderImages();

function renderImages() {
    var images = getImages();
    var elImagesContainer = document.querySelector('.images-container');
    var strHtmls = images.map(image => {
        return `<img src="images/gallery/${image}.jpg" />`
    })
    console.log('strHtmls', strHtmls);
    document.querySelector('.images-container').innerHTML = strHtmls.join('');
}