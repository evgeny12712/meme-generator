'use strict';
var gElCanvas;
var gCtx;
var gCurrImage;
var gIsOnCanvas;
var gIsNewLine = true;
var gIsDrag = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


///---RENDERING---///
function renderGallery() {
    const images = getImagesToDisplay();;
    var strHtmls = images.map(image => {
        return `<div class="gallery-img"><img class="gallery-image" data-id="${image.id}" src="${image.url}" onclick="renderCanvas(this)" /></div>`
    }).join('');
    document.querySelector('.gallery').innerHTML = strHtmls;
    document.querySelector('.main-canvas').style.display = 'none';
    document.querySelector('.filtering').style.display = 'flex';
    document.querySelector('.about-me').style.display = 'flex';
    document.querySelector('.gallery-btn').style.borderBottom = '2px solid black';
    document.querySelector('.text-input').value = '';
    gIsOnCanvas = false;
    resetMeme();
}

function renderCanvas(elImage) {
    document.querySelector('.filtering').style.display = 'none';
    document.querySelector('.about-me').style.display = 'none';
    document.querySelector('.gallery').innerHTML = '';
    document.querySelector('.main-canvas').style.display = 'flex';
    document.querySelector('.gallery-btn').style.borderBottom = '0';
    document.querySelector('.font-color-btn').value = '#FFFFFF';
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    if (elImage) gCurrImage = getImageById(+elImage.dataset.id);
    resizeCanvas();
    drawImgFromlocal();
    gIsOnCanvas = true;
    addMouseListeners()
    addTouchListeners()
}

function toggleMainSection() {
    if (document.querySelector('.main-canvas').style.display === 'none') {
        document.querySelector('.filtering').style.display = 'none';
        document.querySelector('.about-me').style.display = 'none';
        document.querySelector('.gallery').style.display = 'none';
    }

}


///---BUTTONS---///
function onShowGallery() {
    setFilter('ALL');
    renderGallery();
}

function onAddText(elInput) {
    var txt = elInput.value;
    var currLine = getCurrLine();
    if (!currLine && getLines().length) currLine = setCurrLine(getLines().length - 1);
    if (gIsNewLine && !currLine) {
        addLine(gCurrImage, txt, { x: getCanvas().width / 2, y: getY() });
        updateCurrLine();
        gIsNewLine = false;
    } else {
        currLine.txt = txt;
    }
    drawImgFromlocal()
}

function onSubmit() {
    var elInput = document.querySelector('.text-input');
    elInput.value = '';
    gIsNewLine = true;
    setCurrLine(null);
    drawImgFromlocal(true);
}

function onFontSizeChange(isIncrease) {
    var currLine = getCurrLine();
    if (!currLine) return;
    var oldFontArray = currLine.font.split(' ');
    var fontSize = +oldFontArray[0].substring(0, oldFontArray[0].length - 2);
    fontSize = (isIncrease) ? fontSize + 1 : fontSize - 1;
    const newFont = fontSize + 'px ' + oldFontArray[1];
    currLine.font = newFont;
    drawImgFromlocal()
}

function onMoveText(isUp) {
    var currLine = getCurrLine();
    if (!currLine) return;
    if (isOutCanvas(currLine.currPosition.y)) return;
    if (isUp) {
        if (isOutCanvas(currLine.currPosition.y - 3)) return;
        currLine.currPosition.y -= 3;
    } else {
        if (isOutCanvas(currLine.currPosition.y + 3)) return;
        currLine.currPosition.y += 3;
    }
    const y = currLine.currPosition.y;
    const x = currLine.currPosition.x;
    updateMemeLocation(x, y);
    drawImgFromlocal();
}

function onColorChange() {
    var currLine = getCurrLine();
    if (!currLine) return;
    currLine.color = getColorFromPicker();
    drawImgFromlocal();
}

function onSwitchLine() {
    updateCurrLine();
}

function onAlign(align) {
    if (!getCurrLine()) return;
    var currLine = getCurrLine();
    var canvasWidth = document.querySelector('.canvas').width;
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
    drawImgFromlocal();
}

function onDeleteLine() {
    if (!getCurrLine()) return;
    var lines = getLines();
    lines.splice(getMeme().selectedLineIdx, 1);
    drawImgFromlocal();
    updateCurrLine();
}

function onDownloadCanvas(elLink, ev) {
    gIsDownload = true;
    onMarkToggle(false);
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    gIsDownload = false;
}

function onSetFilter(elLi) {
    var filterBy;
    if (!elLi) filterBy = document.querySelector('.filter-input').value;
    else filterBy = elLi.innerText;
    if (!filterBy) return;
    setFilter(filterBy);
    renderGallery();
}

///---GETTERS---///
function getContext() {
    return gCtx;
}

function getCanvas() {
    return gElCanvas;
}

function getCurrFont() {
    return document.querySelector('.fonts-selector').value;
}

function getColorFromPicker() {
    return document.querySelector('.font-color-btn').value;
}

function getCurrImage() {
    return gCurrImage;
}


///---LISTENERS---///
document.addEventListener("keydown", function(event) {
    const currLine = getCurrLine();
    if (event.code === 'ArrowUp' && gIsOnCanvas) {
        onMoveText(true);
    }
    if (event.code === 'ArrowDown' && gIsOnCanvas) {
        onMoveText(false);
    }
    if (event.code === 'ArrowRight' && gIsOnCanvas) {
        if (currLine.align === 'left') onAlign('center');
        else onAlign('right');
    }
    if (event.code === 'ArrowLeft' && gIsOnCanvas) {
        if (currLine.align === 'right') onAlign('center');
        else onAlign('left');
    }
    if (event.code === 'Enter' && gIsOnCanvas) {
        onSubmit();
    }
});

window.addEventListener('resize', () => {
    resizeCanvas();
    renderCanvas();
})

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
            document.querySelector('.text-input').value = getCurrLine().txt;
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
    document.querySelector('.canvas').style.cursor = 'grabbing';
}

function onUp() {
    document.querySelector('.canvas').style.cursor = 'auto';
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
    const fontSize = +line.font.split('p')[0];
    const linePos = line.currPosition;
    const textWidth = gCtx.measureText(line.txt).width;
    const isXGood = mousePos.x >= linePos.x - textWidth / 2 && mousePos.x <= linePos.x + textWidth / 2;
    const isYGood = mousePos.y >= linePos.y - fontSize && mousePos.y <= linePos.y;
    return (isXGood && isYGood);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}