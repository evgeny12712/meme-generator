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
    <div class="filtering flex">
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
    resetMeme();
}

function renderCanvas(elImage) {
    const strHtmls = `
    <main class="main-canvas flex">
        <canvas id="canvas" class="canvas" height="450" width="450"></canvas>
        <div class="control">
            <input id="text-input" class="text-input" type="text" placeholder="Enter text" autofocus>
            <button class="add-text-btn" onclick="onAddText()"><img src="images/canvas-controllers/add.png"></button>
            <button class="up-down-arrows-btn" onclick="onSwitchLine()"><img src="images/canvas-controllers/up-and-down-opposite-double-arrows-side-by-side.png"/></button>
            <button class="up-btn" onclick="onMoveText(true)"><img src="images/canvas-controllers/up-arrow.png"/></button>
            <button class="down-btn" onclick="onMoveText(false)"><img src="images/canvas-controllers/down-arrow.png"/></button>
            <button class="delete-btn" onclick="onDeleteLine()"><img src="images/canvas-controllers/trash.png"></button>
            <button class="font-increase-btn" onclick="onFontSizeChange(true)"><img src="images/canvas-controllers/increase font - icon.png"></button>
            <button class="font-decrease-btn" onclick="onFontSizeChange(false)"><img src="images/canvas-controllers/decrease font - icon.png"></button>
            <input type='color' class="font-color-btn" value = "#FFFFFF"/>
            <button class="align-left-btn" onclick="onAlign('left')"><img src="images/canvas-controllers/align-to-left.png"></button>
            <button class="align-center-btn" onclick="onAlign('center')"><img src="images/canvas-controllers/center-text-alignment.png"></button>
            <button class="align-right-btn" onclick="onAlign('right')"><img src="images/canvas-controllers/align-to-right.png"></button>
            <a href="#" class="download-btn" onclick="downloadCanvas(this)" download="myphoto" ><img src="images/canvas-controllers/download.png"></a>
            <select class="fonts-selector" id="fonts">
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Big Caslon">Big Caslon</option>
                <option value="Consolas">Consolas</option>
                <option value="Fantasy">Fantasy</option>
                <option value="David">David</option>
            </select>
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

function onAlign(align) {
    if (!getCurrLine()) return;
    var currLine = getCurrLine();
    var canvasWidth = document.getElementById('canvas').width;
    console.log('canvasWidth', canvasWidth);
    switch (align) {
        case 'left':
            currLine.currPosition.x = canvasWidth / 11.25;
            currLine.align = 'left';
            break;
        case 'center':
            currLine.currPosition.x = canvasWidth / 2;
            currLine.align = 'center';
            break;
        case 'right':
            currLine.currPosition.x = canvasWidth / 1.097;
            currLine.align = 'right';
            break;
    }
    drawImgFromlocal(gCurrImage.url);
}

function onDeleteLine() {
    if (!getCurrLine()) return;
    var lines = getLines();
    lines.splice(getMeme().selectedLineIdx, 1);
    drawImgFromlocal(gCurrImage.url);
    updateCurrLine();

}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}

function getContext() {
    return gCtx;
}

function getCanvas() {
    return gElCanvas;
}

function getCurrFont() {
    return document.getElementById('fonts').value;
}

function getCurrColor() {
    return document.querySelector('.font-color-btn').value;
}

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter' && gIsOnCanvas) {
        onAddText();
    }
});