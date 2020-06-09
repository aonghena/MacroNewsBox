
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var request = require('request');
var foo = require('./passwords');

myConsole.log(foo.TOKEN);

function getNews(ticker){
  var options = {
      'method': 'GET',
      'url': 'https://finnhub.io/api/v1/news-sentiment?token='+foo.TOKEN+'&symbol=' + ticker
    };
    request(options, function (error, res) { 
      if (error) throw new Error(error);
      var G = JSON.parse(res.body)
      if(G["buzz"] == null){
        document.getElementById('NSET').textContent = "N/A";
        document.getElementById('NS').textContent = "N/A";
        document.getElementById('SANS').textContent = "N/A";
        document.getElementById('SANSET').textContent = "N/A";
      }else{
        document.getElementById('NSET').textContent = Number((G['sentiment']['bullishPercent']*100).toFixed(2)) + "%";
        document.getElementById('NS').textContent = Number((G['companyNewsScore']*100).toFixed(2));
        document.getElementById('SANS').textContent = Number((G['sectorAverageNewsScore']*100).toFixed(2));
        document.getElementById('SANSET').textContent = Number((G['sectorAverageBullishPercent']*100).toFixed(2)) + "%";
        /*if(G['sentiment']['bullishPercent'] > G['sectorAverageBullishPercent']){

        }*/
      }
  });

  var options = {
    'method': 'GET',
    'url': 'https://finnhub.io/api/v1/company-news?symbol='+  ticker +'&from=2020-04-30&to=20-06-01&token=' + foo.TOKEN
  };
  request(options, function (error, res) { 
    if (error) throw new Error(error);
    var G = JSON.parse(res.body)
    const app = document.getElementById('newz');
    app.innerHTML = '';
    app.textContent = 'Company Related News';
    app.appendChild(document.createElement("br"));  
    for(var x = 0; x < 25; x++){
          var tag = document.createElement("a");
          tag.appendChild(document.createTextNode(G[x]['headline']));
          tag.href = G[x]['url'];
          tag.target = "_blank"
          app.appendChild(tag);
          app.appendChild(document.createElement("hr"));   
    }
  });
}
getNews('AAPL');

document.querySelector('#ticker-in').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getNews(document.getElementById("ticker-in").value);

  }
})
