function x(){
    const app = document.getElementById('W');
    var count = 0;
    let Parser = require('rss-parser');
    let parser = new Parser();
    (async () => {
    
    let feed = await parser.parseURL('https://www.cnbc.com/id/10000664/device/rss/rss.html');
    let feed1 =  await parser.parseURL('http://feeds.feedburner.com/zerohedge/feed');
    var elementExists = document.getElementById(feed.items[0].pubDate);
    var elementExists1 = document.getElementById(feed1.items[0].pubDate);
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    myConsole.log(feed.items[0].pubDate);
    if(elementExists == null || elementExists1 == null){    
        app.innerHTML = '';
        feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
        var tag = document.createElement("a");
        var text = document.createTextNode(item.title);
        tag.appendChild(text);
        tag.id = item.pubDate;
        //myConsole.log(tag.id);
        tag.href = item.link;
        tag.target = "_blank"
        app.appendChild(tag);
        app.appendChild(document.createElement("hr"));
        console.log(item.title + ':' + item.link)
        var tag = document.createElement("a");
        var text = document.createTextNode(feed1.items[count].title);
        tag.appendChild(text);
        tag.href = feed1.items[count].link;
        tag.target = "_blank"
        tag.id = feed1.items[count].pubDate
        app.appendChild(tag);
        app.appendChild(document.createElement("hr"));
        count++;
        
    }
    );}
    })();

}
x();
setInterval(x, 20000);
