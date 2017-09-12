var http = require('http');
var ProgressBar = require('progress');
var fs = require("fs");

module.exports = {
  install: function () {
    //TODO
  },

  //TODO let the method to specify the destination
  download: function (callback) {

    console.log("Started downloading azure-cosmosdb-emulator. Process may take few minutes.");

    //TODO avoid downloading when the file has been downloaded already
    var file = fs.createWriteStream("./azure-cosmosdb-emulator.msi");

    //TODO add the url to a config
    http.get("http://documentdbportalstorage.blob.core.windows.net/emulator/2017.08.30/Azure%20Cosmos%20DB.Emulator.msi", function (response) {
      var len = parseInt(response.headers['content-length'], 10);
      var bar = new ProgressBar('Downloading azure-cosmosdb-emulator [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: len
      });
      if (200 != response.statusCode) {
        callback && callback(null, Error('Error accessing azure-cosmosdb-emulator location ' + response.headers.location + ': ' + response.statusCode));
      }

      response
        .on('data', function (chunk) {
          bar.tick(chunk.length);
        })
        .on('end', function () {

        })
        .on('error', function (err) {
          callback && callback(null, new Error("Error in downloading azure-cosmosdb-emulator " + err));
        })
        .on('error', function (err) {
          callback && callback(null, Error("Error in downloading azure-cosmosdb-emulator  " + err));
        });

      response
        .pipe(file);

      file.on('finish', function () {
        file.close(function () {
          callback && callback("Download complete!");
        });
      });
    });
  },

  start: function () {
    //TODO
  },

  stop: function () {
    //TODO
  }
};
