const fs = require('fs');
const remote = require('electron').remote;


const app = document.getElementById('L');

var tag = document.createElement("textarea");
tag.id = "newJSON";
var nodeConsole = require('console');
try{
    var rawdata = fs.readFileSync('userSettings.json');
    var userSettings = JSON.parse(rawdata);
    tag.textContent = JSON.stringify(userSettings,  undefined, 3);
}catch(err){
}
app.appendChild(tag);

var button = document.createElement("button");
button.textContent = "Save Changes";
button.id = "btnEd"
app.appendChild(button);

var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function getData(){
    fs.writeFile('./userSettings.json', document.getElementById("newJSON").value, (err) => {
        if (err) console.log('Error writing file:', err)
    })
    var window = remote.getCurrentWindow();
    window.close();
}

document.querySelector('#btnEd').addEventListener('click', () => {
    getData()
})