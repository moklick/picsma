var currentFilters = picsma.filters[0].variations;


function loadPicture(source) {
    var can = $('#canvas')[0], ctx = can.getContext('2d');
    var tmpimg = new Image();
    var newW, newH;
    tmpimg.src = source;
    tmpimg.onload = function () {
        if (tmpimg.width > picsma.config.maxW || tmpimg.height > picsma.config.maxH) {
            var ratioW = tmpimg.width / picsma.config.maxW;
            var ratioH = tmpimg.height / picsma.config.maxH;
            if (ratioW > ratioH) {
                newW = picsma.config.maxW;
                newH = tmpimg.height / ratioW;
            } else {
                newH = picsma.config.maxH;
                newW = tmpimg.width / ratioH;
            }
        } else {
            newW = tmpimg.width;
            newH = tmpimg.height;
        }
        can.width = newW;
        can.height = newH;
        ctx.drawImage(tmpimg, 0, 0, newW, newH);
        updateFilterPreviews();
        createLabCopy($('#canvas')[0]);
    }
}


function updateFilterPreviews() {
    $('#preview').empty();
    for (var i = 0; i < currentFilters.length; i++) {
        var newPreview = $('<canvas width="75" height="75" class="preview-image"></canvas>');
        newPreview.appendTo('#preview');
        newPreview[0].getContext('2d').drawImage($('#canvas')[0], -200, -200);
        picsma.filter.setCanvas(newPreview[0]);
        currentFilters[i].func();
        picsma.filter.setCanvas($('#canvas')[0]);
        (function () {
            var currFunc = currentFilters[i].func;
            newPreview.on("click", function () {
                currFunc($('#canvas')[0]);
            });
        })()
    }
}

function stopDefault(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dropHandler(e) {
    stopDefault(e);
    uploadFile(e.dataTransfer.files[0]);
}

function uploadFile(file) {
    if (!file.type.match(/image.*/)) return;
    var reader = new FileReader();
    reader.onerror = function (e) {
        alert('Error: ' + e.target.error);
    }
    reader.onload = function (e) {
        loadPicture(e.target.result);
    }
    reader.readAsDataURL(file);
}

function updateBCS(b, c, s) {
    console.log('updateBCS: '+b+', '+ c + ', '+s);
    var canvas = $('#canvas')[0];
    if (typeof canvas.labCopy == "undefined") createLabCopy(canvas);
    var ctx = canvas.getContext('2d'),
        img = ctx.getImageData(0, 0, canvas.width, canvas.height),
        data = img.data,
        p = 0, res = 0;
    console.log(ctx);

    for (var i = canvas.labCopy.length - 1; i >= 0; i--) {
        res = pTools.ycc2rgb((canvas.labCopy[i][0]-128)*c+128+b, (canvas.labCopy[i][1]-128)*s+128, (canvas.labCopy[i][2]-128)*s+128);
        p = i * 4;
        data[p] = res[0];
        data[p + 1] = res[1];
        data[p + 2] = res[2];
    }
    ctx.putImageData(img, 0, 0);
}

function createLabCopy(canvas) {
    canvas.labCopy = [];
    var data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
    for (var i = 0; i <data.length; i += 4) canvas.labCopy.push(pTools.rgb2ycc(data[i], data[i + 1], data[i + 2]));
}

$(function () {
    var dropArea = document;
    dropArea.addEventListener('dragenter', stopDefault, false);
    dropArea.addEventListener('dragover', stopDefault, false);
    dropArea.addEventListener('dragleave', stopDefault, false);
    dropArea.addEventListener('drop', dropHandler, false);
    loadPicture('img/ressources/example.jpg');
    console.log($('#canvas')[0]);
})