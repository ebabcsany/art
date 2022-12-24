const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById("fileContent");

function init() {
    fileInput.onchange = handleFileSelect;
}

function handleFileSelect(event) {
    const files = event.target.files;
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    fileContent.textContent = "";
    if (files.length > 0) {
        reader.readAsText(files[0]);
    }
}

function handleFileLoad(event) {
    fileContent.textContent = event.target.result;
}

document.body.onload = init;
