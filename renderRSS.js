const fs = require('fs');

function rssFeeder(){
    let rawdata = fs.readFileSync('userSettings.json');
    let userSettings = JSON.parse(rawdata);
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    let Parser = require('rss-parser');
    let parser = new Parser();
    const app = document.getElementById('W');
    (async () => {
    var rssFeed = [];
    var lastDate = [];
    for (var x = 0; x < userSettings['rss-feed'].length; x++){
        rssFeed.push(await parser.parseURL(userSettings['rss-feed'][x]['url']));
        lastDate.push(rssFeed[x].items[0].pubDate);
    }
    myConsole.log(app);
    app.innerHTML = '';
    lastDate.some(date => { 
        if(document.getElementById(date) == null){
            rssFeed.forEach( feed => {
                feed.items.forEach(item => {
                    var tag = document.createElement("a");
                    tag.appendChild(document.createTextNode(item.title));
                    tag.id = item.pubDate;
                    tag.href = item.link;
                    tag.target = "_blank"
                    app.appendChild(tag);
                    app.appendChild(document.createElement("hr"));
                });
              });
        }
      });
    })();
}


rssFeeder();
setInterval(rssFeeder, 20000);

