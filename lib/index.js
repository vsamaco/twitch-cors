(function() {
  var url = require('url');
  var http = require('http');
  var request = require('request');
  var express = require('express');

  var app = express();

  var config =  {
    'url': 'http://localhost',
    'port': 3333
  }

  // Setup Cross Origin Resource Sharing 
  app.all('/streams/:game', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.get('/streams/:game', function(req, response) {

    var options = {
      protocol: 'https:',
      host: 'api.twitch.tv/kraken',
      pathname: '/streams',
      query: {game: req.params.game}
    };

    var query = url.format(options);

    // Replace spaces with plus else server will not respond with json file
    query = query.replace(/%20/g, '+')
    console.log('RETREIVING: ' + query);

    request(query).pipe(response);

  });
  
  //Matching server for brunch server
  app.listen(config.port);
  console.log('Running Twitch CORS on ' + config.url + ':' + config.port);


}());