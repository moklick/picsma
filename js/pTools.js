window.pTools = {

    getEndianess: function () {
        var endianCanvas = document.createElement('canvas');
        endianCanvas.width = endianCanvas.height = 1;
        var endianData = endianCanvas.getContext('2d').getImageData(0, 0, 1, 1).data;
        var endianData32 = new Int32Array(endianData.buffer);
        endianData32[0] = 0x01020304;
        return (endianData[0] === 1 && endianData[1] === 2 && endianData[3] === 3 && endianData[4] === 4)
    }
}