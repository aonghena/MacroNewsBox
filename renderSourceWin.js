const fs = require('fs');
const remote = require('electron').remote;


const app = document.getElementById('L');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

var tag = document.createElement("textarea");
tag.id = "newJSON";
var nodeConsole = require('console');
try{
    var rawdata = fs.readFileSync(__dirname + '/userSettings.json', 'utf-8');
    myConsole.log(JSON.parse(rawdata))
    var userSettings = JSON.parse(rawdata);
    tag.textContent = JSON.stringify(userSettings,  undefined, 3);
}catch(err){
}
app.appendChild(tag);

var button = document.createElement("button");
button.textContent = "Save Changes";
button.id = "btnEd"
app.appendChild(button);

function getData(){
    fs.writeFile(__dirname + './userSettings.json', document.getElementById("newJSON").value, (err) => {
        if (err) console.log('Error writing file:', err)
    })
    var window = remote.getCurrentWindow();
    window.close();
}

document.querySelector('#btnEd').addEventListener('click', () => {
    getData()
})