'use strict';
const importData = getFromStorage('petArr','[]')
const importBtn = document.querySelector('#import-btn')
function saveStaticDataToFile(input) {
    let blob = new Blob([input],
        { type: "application/json" });
    saveAs(blob, "dataPet.json");
}
function onFileLoad(elementId, event) {
    document.getElementById(elementId).innerText = event.target.result;
}
function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}
importBtn.addEventListener('click', function(){
    saveStaticDataToFile(importData)
})
//console.log(importData)