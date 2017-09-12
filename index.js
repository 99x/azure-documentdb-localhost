var http = require('http');
var ProgressBar = require('progress');
var fs = require("fs");
var exec = require('child_process').exec;

module.exports = {
  install: installDocumentdb,

  download: downloadDocumentdb,

  start: function () {
    //TODO
  },

  stop: function () {
    //TODO
  }
};

function installDocumentdb(callback) {
  downloadDocumentdb(function (result, err) {
    if (err) {
      callback(result, err);
    } else {

      console.log("Installing downloading azure-cosmosdb-emulator. Process may take few minutes.");

      exec('start /wait msiexec /i azure-cosmosdb-emulator.msi /qn /log "installtion.log"', function () {

        //TODO check errors

        if (fs.existsSync("C:/Program Files/Azure Cosmos DB Emulator/CosmosDB.Emulator.exe")) {
          console.log("azure-cosmosdb-emulator Installation Complete!");
          callback("azure-cosmosdb-emulator Installation Complete!");
        } else {
          console.log("azure-cosmosdb-emulator Installation Failed!");
          callback(null, new Error("azure-cosmosdb-emulator Installation Failed!"));
        }

      });

    }
  });
}

//TODO let the method to specify the destination
function downloadDocumentdb(callback) {

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
        console.log("Download complete!");
        callback && callback("Download complete!");
      });
    });

  });
}
