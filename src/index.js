var http = require('http');
var request = require("request");
var ProgressBar = require('progress');
var fs = require("fs");
var exec = require('child_process').execSync;
var config = require("./config.json");

var AzureDocumentdbLocalhost = {
  install: function (callback) {
    if (hasEmulatorInstalled()) {
      callback();
    } else {
      AzureDocumentdbLocalhost.download(function (data, err) {
        if (err) {
          callback(null, err);
        } else {
          installDocumentdb(callback);
        }
      });
    }
  },

  download: function (callback) {
    if (hasEmulatorDownloaded()) {
      callback();
    } else {
      downloadDocumentdb(callback);
    }
  },

  start: function (callback, options = {}) {
    options.Shutdown = false;
    runEmulaterCommand(callback, options);
  },

  stop: function (callback, options = {}) {
    options.Shutdown = true;
    runEmulaterCommand(callback, options);
  }
};

module.exports = AzureDocumentdbLocalhost;

function hasEmulatorDownloaded() {
  return fs.existsSync(config.downloadPath);
}

function hasEmulatorInstalled() {
  return fs.existsSync(config.exePath);
}

function installDocumentdb(callback) {
  console.log("Installing downloading azure-cosmosdb-emulator. Process may take few minutes.");
  var command = `start /wait msiexec /i azure-cosmosdb-emulator.msi /qn /log "${config.installationLogPath}"`;
  console.log(` > ${command}`);
  exec(command, function () {

    //TODO check errors

    if (hasEmulatorInstalled()) {
      console.log("azure-cosmosdb-emulator Installation Complete!");
      callback("azure-cosmosdb-emulator Installation Complete!");
    } else {
      console.log("azure-cosmosdb-emulator Installation Failed!");
      callback(null, new Error("azure-cosmosdb-emulator Installation Failed!"));
    }

  });
}

function runEmulaterCommand(callback, options = {}) {
  const validOptions = [
    "Shutdown",
    "DataPath",
    "Port",
    "MongoPort",
    "DirectPorts",
    "Key",
    "EnableRateLimiting",
    "DisableRateLimiting",
    "NoUI",
    "NoExplorer",
    "PartitionCount",
    "DefaultPartitionCount",
    "AllowNetworkAccess",
    "KeyFile",
    "NoFirewall",
    "GenKeyFile",
    "Consistency"
  ];

  //TODO
  const defaultOptions = {
    "NoFirewall": true,
    "AllowNetworkAccess": true,
    "NoUI": true,
    "Key": "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
  };

  var optionsString = "";
  options = Object.assign({}, defaultOptions, options);
  for (var key in options) {
    if (validOptions.indexOf(key) >= 0) {
      var value = options[key];
      if (value === true) {
        optionsString += ` /${key}`;
      } else if (value) {
        optionsString += ` /${key}=${value}`;
      }
    }
  }

  var startCommand = `"${config.exePath}" ${optionsString}`;
  console.log(` > ${startCommand}`);

  /*
  TODO remove the try catch and handle the command execution
  This try catch was added since some times the exec module does not finishes the execution and being stuck
   */
  try {
    //TODO handle command ececution errors
    exec(startCommand, {timeout: 50000});
  } catch (err) {
  }
  callback && callback({});
}

//TODO let the method to specify the destination
function downloadDocumentdb(callback) {
  console.log("Started downloading azure-cosmosdb-emulator. Process may take few minutes.");

  var file = fs.createWriteStream(config.downloadPath);

  http.get(config.downloadUrl, function (response) {
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
