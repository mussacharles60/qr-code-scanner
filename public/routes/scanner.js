// var video = document.createElement("video");
const video = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");
const loadingMessage = document.getElementById("loadingMessage");
const outputContainer = document.getElementById("output");
const outputMessage = document.getElementById("outputMessage");
const outputData = document.getElementById("outputData");

video.style.display = "block";
canvasElement.style.display = "none";

function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: "environment"
    }
}).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
});

function tick() {
    loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;
            outputData.innerText = code.data;
            if (code.data.length > 0) {
                video.style.display = "none";
                canvasElement.style.display = "block";
                if (!isUpdating) {
                    updateData(code.data);
                }
            }
        } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
        }
    }
    requestAnimationFrame(tick);
}

audioCtx = new(window.AudioContext || window.webkitAudioContext)();

const volume = 1;
const duration = 250;
const frequency = 2310;
const type = 'sawtooth';

var isUpdating = false;
const output_dialog = document.getElementById('output_dialog');
output_dialog.style.display = "none";

// function show() {
//     // frequency = document.getElementById("fIn").value;
//     // document.getElementById("fOut").innerHTML = frequency + ' Hz';
//     // switch (document.getElementById("tIn").value * 1) {
//     //   case 0: type = 'sine'; break;
//     //   case 1: type = 'square'; break;
//     //   case 2: type = 'sawtooth'; break;
//     //   case 3: type = 'triangle'; break;
//     // }
//     //document.getElementById("tOut").innerHTML = type;
//     // volume = document.getElementById("vIn").value / 100;
//     //document.getElementById("vOut").innerHTML = volume;
//     //duration = document.getElementById("dIn").value;
//     //document.getElementById("dOut").innerHTML = duration + ' ms';
// }

function beep() {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    oscillator.start();

    setTimeout(
        function() {
            oscillator.stop();
        },
        duration
    );
};

function updateData(qrcode) {
    isUpdating = true;

    const host = "https://tpsf.imperialinnovations.co.tz/qr-scanner/update.php";

    const request = {
        code: qrcode
    }

    try {
        axios({
                url: host,
                method: 'post',
                responseType: 'json',
                data: request,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'cache-control': 'no-cache',
                    // 'pragma': 'no-cache'
                }
            })
            .then((result) => {
                console.log("server: response: ", result.data);
                if (result.data && result.data.success) {
                    beep();
                    output_dialog.style.display = "flex";
                    setTimeout(function() {
                        output_dialog.style.display = "none";
                        isUpdating = false;
                    }, 1000);
                } else {
                    isUpdating = false;
                }
            })
            .catch((err) => {
                isUpdating = false;
                console.error("> axios error: ", err.message);
            })
            .catch((thrown) => {
                isUpdating = false;
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    console.error("> axios error: ", thrown);
                }
            });

    } catch (e) {
        isUpdating = false;
        console.error(e);
    }
}