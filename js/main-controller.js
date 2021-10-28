'use strict';
renderGallery();
var gElCanvas;
var gCtx;
var gCurrImage;
var gIsOnCanvas;
var gElImage;

function renderGallery() {
    const images = getImages();
    var strHtmls = `
    <div class="filtering flex space-between">
        <form>
            <input type="text" placeholder="Enter search keyword">
            <img src="images/search-icon.png" alt="" class="search-img" onclick="search()" />
        </form>
        <ul class="clear-list flex space-between">
            <li>funny</li>
            <li>shocked</li>
            <li>animals</li>
            <li>children</li>
            <li>listening</li>
        </ul>
    </div> `;

    strHtmls += `<div class="gallery">`;

    strHtmls += images.map(image => {
        return `<img class="gallery-image" data-id="${image.id}" src="${image.url}" onclick="renderCanvas(this)" />`
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
    gIsOnCanvas = false;
}

function renderCanvas(elImage) {
    const strHtmls = `
    <main class="main-canvas flex space-between">
        <canvas class="canvas" height="450" width="450"></canvas>
        <div class="control">
            <input id="text-input" class="text-input" type="text" placeholder="Enter text" autofocus>
            <button class="add-text-btn" onclick="onAddText()"><img src="images/canvas-controllers/add.png"></button>
            <button class="up-down-arrows-btn" onclick="onSwitchLine()"><img src="images/canvas-controllers/up-and-down-opposite-double-arrows-side-by-side.png"/></button>
            <button class="up-btn" onclick="onMoveText(true)"><img src="images/canvas-controllers/up-arrow.png"/></button>
            <button class="down-btn" onclick="onMoveText(false)"><img src="images/canvas-controllers/down-arrow.png"/></button>
            <button class="delete-btn"><img src="images/canvas-controllers/trash.png"></button>
            <button class="font-increase-btn" onclick="onFontSizeChange(true)"><img src="images/canvas-controllers/increase font - icon.png"></button>
            <button class="font-decrease-btn" onclick="onFontSizeChange(false)"><img src="images/canvas-controllers/decrease font - icon.png"></button>
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
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');

    var image = getImageById(+elImage.dataset.id);
    drawImgFromlocal(image.url);
    gCurrImage = image;
    gIsOnCanvas = true;
}

function onAddText() {
    var elTextInput = document.querySelector('.text-input');
    const text = elTextInput.value;
    if (!text) return;
    elTextInput.value = '';
    updateMeme(gCurrImage, text, { x: 225, y: getY() });
    updateCurrLine();
    drawText();
}

function onFontSizeChange(isIncrease) {
    var oldFontArray = getCurrLine().font.split(' ');
    var fontSize = +oldFontArray[0].substring(0, oldFontArray[0].length - 2);
    if (isIncrease) fontSize++;
    else fontSize--;
    const newFont = fontSize + 'px ' + oldFontArray[1];
    getCurrLine().font = newFont;
    drawImgFromlocal(gCurrImage.url)
}

function onMoveText(isUp) {
    var currLine = getCurrLine();
    if (isUp) currLine.currPosition.y -= 1;
    else currLine.currPosition.y += 1;
    const y = currLine.currPosition.y;
    const x = currLine.currPosition.x;
    updateMemeLocation(x, y);
    drawImgFromlocal(gCurrImage.url, gMeme.lines[gMeme.lines.length - 1].currPosition);
}

function onSwitchLine() {
    updateCurrLine();
}

function getContext() {
    return gCtx;
}

function getCanvas() {
    return gElCanvas;
}

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter' && gIsOnCanvas) {
        onAddText();
    }
});