'use strict';
renderGallery();
var gCanvas = document.querySelector('.canvas');
var gCurrImage;

function renderGallery() {
    var images = getImages();
    var strHtmls = `
    <div class="filtering flex space-between">
        <form>
            <input type="text" placeholder="Enter search keyword">
            <img src="images/search-icon.png" alt="" class="search-img" onclick="search()" />
        </form>
        <ul class="clear-list flex space-between">
            <li>funny</li>
            <li>comics</li>
            <li>dogs</li>
            <li>drinks</li>
            <li>books</li>
        </ul>
        <a href="#" class='more-filters'>more...</a>
    </div> `;

    strHtmls += `<div class="gallery">`;

    strHtmls += images.map(image => {
        return `<img class="gallery-image" src="images/gallery/${image}.jpg" onclick="renderCanvas(this)" />`
    }).join('');

    strHtmls += `</div>`;

    strHtmls += `
    <section class="about-me flex">
        <img class="my-image" src="images/me.jpg" />
        <div class="my-about-me">
            <h4>Evgeny Mashkevich</h4>
            <p>is a fictional character, one of the six main characters who appears on the American sitcom Friends (1994 –2004). Created by David Crane and Marta Kauffman</p>
            <div class="social-buttons">
                <button class="linkedin"><img src="images/social-media/linkedin.png"/></button>
                <button class="facebook"><img src="images/social-media/facebook.png"/></button>
                <button class="github"><img src="images/social-media/github.png"/></button>
            </div>
        </div>
    </section>`;

    document.querySelector('.main-container').innerHTML = strHtmls;
}

function renderCanvas(image) {
    console.log('image', image.src);
    var strHtmls = `
    <main class="main-canvas flex space-between">
        <canvas class="canvas"></canvas>
        <div class="control">
            <input class="text-input" type="text" placeholder="Enter text">
            <button class="up-down-arrows-btn"><img src="images/canvas-controllers/up-and-down-opposite-double-arrows-side-by-side.png"/></button>
            <button class="up-btn"><img src="images/canvas-controllers/up-arrow.png"/></button>
            <button class="down-btn"><img src="images/canvas-controllers/down-arrow.png"/></button>
            <button class="add-text-btn"><img src="images/canvas-controllers/add.png"></button>
            <button class="delete-btn"><img src="images/canvas-controllers/trash.png"></button>
            <button class="font-increase-btn"><img src="images/canvas-controllers/increase font - icon.png"></button>
            <button class="font-decrease-btn"><img src="images/canvas-controllers/decrease font - icon.png"></button>
            <button class="text-stroke-btn"><img src="images/canvas-controllers/text-stroke.png"></button>
            <button class="font-color-btn"><img src="images/canvas-controllers/paint-board-and-brush.png"></button>
            <button class="align-left-btn"><img src="images/canvas-controllers/align-to-left.png"></button>
            <button class="align-center-btn"><img src="images/canvas-controllers/center-text-alignment.png"></button>
            <button class="align-right-btn"><img src="images/canvas-controllers/align-to-right.png"></button>
            <select class="fonts-selector" id="fonts" name="fonts" onchange="onFontChange(this.value)">
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="Fantasy">Fantasy</option>
                <option value="David">David</option>
            </select>
            <button class="download-btn"><img src="images/canvas-controllers/download.png"></button>
        </div>
    </main>
    `
    document.querySelector('.main-container').innerHTML = strHtmls;
}

function drawImgFromlocal() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}