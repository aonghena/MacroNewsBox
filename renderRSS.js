const fs = require('fs');

function rssFeeder(){
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    let rawdata = fs.readFileSync(__dirname + '/userSettings.json');
    let userSettings = JSON.parse(rawdata);
    let Parser = require('rss-parser');
    let parser = new Parser();
    var app = document.getElementById('W');
    (async () => {
    var rssFeed = [];
    var lastDate = [];
    for (var x = 0; x < userSettings['rss-feed'].length; x++){
        rssFeed.push(await parser.parseURL(userSettings['rss-feed'][x]['url']));
        lastDate.push(rssFeed[x].items[0].pubDate);
    }
    var links = [];
    app.innerHTML = '';
    myConsole.log(lastDate);
    lastDate.some(date => { 
        if(document.getElementById(date) == null){
            rssFeed.forEach( feed => {
                var m = [];
                feed.items.forEach(item => {
                    var tag = document.createElement("a");
                    tag.appendChild(document.createTextNode(item.title));
                    tag.id = item.pubDate;
                    tag.href = item.link;
                    tag.target = "_blank"
                    m.push(tag)
                });
                links.push(m);
            });

        }
      });
      for (var x = 0; x < links[0].length; x++){
          for(var y = 0; y < userSettings['rss-feed'].length; y++){
            var img = document.createElement("img");
            img.src = "./assets/rss.png";
            app.appendChild(img)
            app.appendChild(links[y][x]);
            app.appendChild(document.createElement("hr"));    
          }
     }
    })();




}


rssFeeder();
setInterval(rssFeeder, 20000);

