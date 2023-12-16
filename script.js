document.addEventListener('DOMContentLoaded', function() {
    var canvas = new fabric.Canvas('kjCanvas');
    resizeCanvas(); // 初期化時にキャンバスのサイズを設定

    var currentColor = '#000000'; // デフォルトの色（黒）
    var textColor = '#FFFFFF'; // デフォルトのテキスト色（白）

    // 色の設定
    var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'];

    // 現在の色を表示する要素
    var currentColorDisplay = document.getElementById('currentColorDisplay');
    currentColorDisplay.style.backgroundColor = currentColor;

    // 色ボタンの生成
    var colorButtons = document.getElementById('colorButtons');
    colors.forEach(function(color) {
        var btn = document.createElement('button');
        btn.className = 'colorButton';
        btn.style.backgroundColor = color;
        btn.onclick = function() { 
            currentColor = color;
            textColor = getContrastTextColor(color);
            currentColorDisplay.style.backgroundColor = currentColor;
        };
        colorButtons.appendChild(btn);
    });

    function getContrastTextColor(bgColor) {
        return isLightColor(bgColor) ? '#000000' : '#FFFFFF';
    }

    function isLightColor(color) {
        var r = parseInt(color.substr(1, 2), 16);
        var g = parseInt(color.substr(3, 2), 16);
        var b = parseInt(color.substr(5, 2), 16);
        var brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    }

    function resizeCanvas() {
        canvas.setWidth(window.innerWidth - 20);
        canvas.setHeight(window.innerHeight - 90);
        canvas.renderAll();
    }

    window.addEventListener('resize', resizeCanvas);

    canvas.on('mouse:dblclick', function(options) {
        var pointer = canvas.getPointer(options.e);
        addStickyNoteAt(pointer.x, pointer.y);
    });

    function addStickyNoteAt(x, y) {
        var iText = new fabric.IText('ここにテキストを入力', {
            left: x,
            top: y,
            fontFamily: 'Arial',
            fill: textColor,
            backgroundColor: currentColor,
            fontSize: 20,
            hasControls: true,
            lockRotation: true
        });

        canvas.add(iText);
        canvas.setActiveObject(iText);
        iText.enterEditing();
        iText.selectAll();
    }

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            e.preventDefault();
            var activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
            }
        }
    });
});
