var canvas = document.getElementById("main-canvas") 
var ctx = canvas.getContext("2d");
var imageInput = document.getElementById("image-input");
var grayscaleButton = document.getElementById("grayscale-button");
var negativeButton = document.getElementById("negative-button");
var sepiaButton = document.getElementById("sepia-button");
var resetButton = document.getElementById("reset-button");
var saveButton = document.getElementById("save-button");
var img;

imageInput.addEventListener("change", previewFile);
grayscaleButton.addEventListener("click", grayscale);
negativeButton.addEventListener("click", negative);
sepiaButton.addEventListener("click", sepia);
saveButton.addEventListener("click", save);
resetButton.addEventListener("click", reset);

function previewFile() {
    var file    = imageInput.files[0];
    var reader  = new FileReader();

    // var url = URL.createObjectURL(file);
    img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
    }

    reader.addEventListener("load", function () {
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function grayscale() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        var tmp = pixels[i] * 0.299 + pixels[i + 1] * 
            0.587 + pixels[i + 2] * 0.114;

        pixels[i]   = tmp
        pixels[i + 1] = tmp
        pixels[i + 2] = tmp
    }
  
    ctx.putImageData(imageData, 0, 0);
}

function negative() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i]   = 255 - pixels[i];   // red
        pixels[i + 1] = 255 - pixels[i + 1]; // green
        pixels[i + 2] = 255 - pixels[i + 2]; // blue
        // i + 3 is alpha (the fourth element)
    }
  
    ctx.putImageData(imageData, 0, 0);
}

function sepia() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];

        pixels[i]   = (red * .393) + (green *.769) + (blue * .189)
        pixels[i + 1] = (red * .349) + (green *.686) + (blue * .168)
        pixels[i + 2] = (red * .272) + (green *.534) + (blue * .131)
    }
  
    ctx.putImageData(imageData, 0, 0);
}

function reset() {
    ctx.drawImage(img, 0, 0);
}

function save() {
    window.open(canvas.toDataURL(), "_blank");
}
