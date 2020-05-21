
const fs = require('fs');

function twtrUpdate(){
    let userSettings = JSON.parse(fs.readFileSync('userSettings.json'));
    let infoDiv = document.querySelector('div[id=N]')
    infoDiv.insertAdjacentHTML('beforeend', '<a class="twitter-timeline" data-dnt="true" data-theme="dark" data-chrome="noheader noborders transparent nofooter" href='+ userSettings['twitter-list'] +'>Personal Twitter List</a>');
}
twtrUpdate();
