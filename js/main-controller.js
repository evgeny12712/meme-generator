'use strict';
var gElCanvas;
var gCtx;
var gCurrImage;
var gIsOnCanvas;
var gIsNewLine = true;
var gIsDrag = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function init() {
    renderGallery();
}


///---RENDERING---///
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
            <input id="text-input" class="text-input" type="text"" placeholder="Enter text" autofocus>
            <button class="add-text-btn" onclick="onSubmit()"><img src="images/canvas-controllers/add.png"></button>
            <button class="up-down-arrows-btn" onclick="onSwitchLine()"><img src="images/canvas-controllers/up-and-down-opposite-double-arrows-side-by-side.png"/></button>
            <button class="up-btn" onclick="onMoveText(true)"><img src="images/canvas-controllers/up-arrow.png"/></button>
            <button class="down-btn" onclick="onMoveText(false)"><img src="images/canvas-controllers/down-arrow.png"/></button>
            <button class="delete-btn" onclick="onDeleteLine()"><img src="images/canvas-controllers/trash.png"></button>
            <button class="font-increase-btn" onclick="onFontSizeChange(true)"><img src="images/canvas-controllers/increase font - icon.png"></button>
            <button class="font-decrease-btn" onclick="onFontSizeChange(false)"><img src="images/canvas-controllers/decrease font - icon.png"></button>
            <input type='color' class="font-color-btn" value = "#FFFFFF"/>
            <div class="mark-checkbox">
                <label for="mark-check">Mark Line</label>
                <input type="checkbox" class="mark-check" id="mark-check" name="mark-check" onchange="onMarkToggle(this)"checked>
            </div>
            <button class="align-left-btn" onclick="onAlign('left')"><img src="images/canvas-controllers/align-to-left.png"></button>
            <button class="align-center-btn" onclick="onAlign('center')"><img src="images/canvas-controllers/center-text-alignment.png"></button>
            <button class="align-right-btn" onclick="onAlign('right')"><img src="images/canvas-controllers/align-to-right.png"></button>
            <a href="#" class="download-btn" onclick="onDownloadCanvas(this)" download="myMeme" ><img src="images/canvas-controllers/download.png"></a>
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
    document.querySelector('.text-input').addEventListener('input', onAddText);
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');

    gCurrImage = getImageById(+elImage.dataset.id);
    drawImgFromlocal();
    gIsOnCanvas = true;
    addMouseListeners()
    addTouchListeners()

}


///---BUTTONS---///
function onAddText(e) {
    const text = e.target.value;
    const currLine = getCurrLine();
    if (gIsNewLine) {
        updateMeme(gCurrImage, text, { x: 225, y: getY() });
        updateCurrLine();
        gIsNewLine = false;
    } else {
        currLine.txt = text;
    }
    drawImgFromlocal()
}

function onSubmit() {
    var elInput = document.querySelector('.text-input');
    elInput.value = '';
    gIsNewLine = true;
}

function onFontSizeChange(isIncrease) {
    var oldFontArray = getCurrLine().font.split(' ');
    var fontSize = +oldFontArray[0].substring(0, oldFontArray[0].length - 2);
    fontSize = (isIncrease) ? fontSize + 1 : fontSize - 1;
    const newFont = fontSize + 'px ' + oldFontArray[1];
    getCurrLine().font = newFont;
    drawImgFromlocal()
}

function onMoveText(isUp) {
    var currLine = getCurrLine();
    if (isOutCanvas(currLine.currPosition.x, currLine.currPosition.y)) return;
    if (isUp) {
        if (isOutCanvas(currLine.currPosition.x, currLine.currPosition.y - 3)) return;
        currLine.currPosition.y -= 3;
    } else {
        if (isOutCanvas(currLine.currPosition.x, currLine.currPosition.y + 3)) return;
        currLine.currPosition.y += 3;
    }
    const y = currLine.currPosition.y;
    const x = currLine.currPosition.x;
    updateMemeLocation(x, y);
    drawImgFromlocal();
}

function onSwitchLine() {
    updateCurrLine();
}

function onAlign(align) {
    if (!getCurrLine()) return;
    var currLine = getCurrLine();
    var canvasWidth = document.getElementById('canvas').width;
    console.log('align', align);
    switch (align) {
        case 'left':
            currLine.currPosition.x = gCtx.measureText(currLine.txt).width / 2;
            currLine.align = 'left';
            break;
        case 'center':
            currLine.currPosition.x = canvasWidth / 2;
            currLine.align = 'center';
            break;
        case 'right':
            currLine.currPosition.x = canvasWidth - gCtx.measureText(currLine.txt).width / 2;
            currLine.align = 'right';
            break;
    }
    console.log(currLine.currPosition)
    drawImgFromlocal();
}

function onDeleteLine() {
    if (!getCurrLine()) return;
    var lines = getLines();
    lines.splice(getMeme().selectedLineIdx, 1);
    drawImgFromlocal();
    updateCurrLine();
}

function onMarkToggle(checkbox) {
    if (checkbox.checked) drawImgFromlocal();
    else drawImgFromlocal();
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}

function isMarkChecked() {
    return document.querySelector('.mark-check').checked;
}



///---GETTERS---///
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

function getCurrImage() {
    return gCurrImage;
}


///---LISTENERS---///
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter' && gIsOnCanvas) {
        onAddText();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.code === 'ArrowUp' && gIsOnCanvas) {
        onMoveText(true);
    }
    if (event.code === 'ArrowDown' && gIsOnCanvas) {
        onMoveText(false);
    }
});

document.addEventListener("keydown", function(event) {
    const currLine = getCurrLine();
    if (event.code === 'ArrowRight' && gIsOnCanvas) {
        if (currLine.align === 'left') onAlign('center');
        else onAlign('right');
    }
    if (event.code === 'ArrowLeft' && gIsOnCanvas) {
        if (currLine.align === 'right') onAlign('center');
        else onAlign('left');
    }
});

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

///---MOUSE---///

function onDown(ev) {
    const pos = getEvPos(ev);
    const lines = getLines();
    for (var i = 0; i < lines.length; i++) {
        if (isLineClicked(pos, lines[i])) {
            setCurrLine(i);
            gIsDrag = true;
            gStartPos = pos;
        }
    }
}

function onMove(ev) {
    if (!gIsDrag) return;
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    gStartPos = pos;
    getCurrLine().currPosition.x += dx;
    getCurrLine().currPosition.y += dy;
    drawImgFromlocal();
    onSubmit();
}

function onUp() {
    gIsDrag = false;
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isLineClicked(mousePos, line) {
    const linePos = line.currPosition;
    const textWidth = gCtx.measureText(line.txt).width;
    const isXGood = mousePos.x >= linePos.x - textWidth / 2 && mousePos.x <= linePos.x + textWidth / 2;
    const isYGood = mousePos.y >= linePos.y - getCurrFontSize() && mousePos.y <= linePos.y;
    return (isXGood && isYGood);
}