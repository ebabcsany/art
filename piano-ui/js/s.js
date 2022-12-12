const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById("fileContent");
const defaultFiles = fileInput.files;
let value = "";

function init() {
    fileInput.onchange = handleFileSelect;
}

function createArrayFromObjects(...elements) {
    let array = [];
    for (const element of elements) {
        array.push(element);
    }
    return array;
}

function handleFileSelect(event/*, ...newFiles*/) {
    const files = /*typeof newFiles === "symbol" ? createArrayFromObjects(newFiles) : */event.target.files;
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    fileContent.textContent = "";
    /*if (files.length > 1) {
        const fileSelector = document.getElementById("file-selector");
        const divElement = document.createElement("div");
        for (let i = 0; i < files.length; i++) {
            const element = files[i];
            const child = document.createElement("button");
            child.textContent = element.name;
            child.id = "" + i;
            child.onclick = function () {
                reader.readAsText(element);
                divElement.remove();
                fileSelector.textContent = "";
                fileInput.files[i];
            };
            divElement.appendChild(child);
        }
        divElement.style.backgroundColor = "#0000007f";
        fileSelector.appendChild(divElement);
    } else */if (files.length > 0) {
        reader.readAsText(files[0]);
    }
}

function handleFileLoad(event) {
    fileContent.textContent = event.target.result;
}

document.body.onload = init;
