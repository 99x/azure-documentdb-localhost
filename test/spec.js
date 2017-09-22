var documentdb = require("../src/index.js");
var expect = require("expect.js");
var fs = require("fs");
var request = require("request");
request.defaults({
  strictSSL: false, // allow us to use our self-signed cert for testing
  rejectUnauthorized: false
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("azure-documentdb-localhost", function () {

  describe("download", function () {
    it("should download the file to the root", function (done) {
      this.timeout(600000);
      documentdb.download(function (result, err) {
        expect(err).to.be(undefined);
        expect(fs.existsSync("./azure-cosmosdb-emulator.msi")).to.be(true);
        done();
      });
    });
  });

  describe("install", function () {
    it("should install azure-cosmosdb-emulator", function (done) {
      this.timeout(600000);
      documentdb.install(function (result, err) {
        expect(err).to.be(undefined);
        expect(fs.existsSync("C:/Program Files/Azure Cosmos DB Emulator/CosmosDB.Emulator.exe")).to.be(true);
        done();
      });
    });
  });

  describe("start", function () {
    it("should start azure-cosmosdb-emulator", function (done) {

      this.timeout(600000);

      documentdb.install(function (result, err) {
        documentdb.stop(function (result, err) {
          documentdb.start(function (result, err) {

            expect(err).to.be(undefined);

            request({
              method: 'GET',
              url: 'https://localhost:3004/_explorer/index.html'
            }, function (error, response, body) {
              console.log(JSON.stringify(error));
              expect(!error).to.be(true);
              expect(!body).to.be(false);
              done();
            });

          }, {Port: 3004});
        });
      });

    });
  });


  describe("stop", function () {
    it("should stop azure-cosmosdb-emulator", function (done) {

      this.timeout(600000);

      documentdb.install(function (result, err) {
        documentdb.stop(function (result, err) {
          documentdb.start(function (result, err) {
            documentdb.stop(function (result, err) {

              expect(err).to.be(undefined);

              setTimeout(function () {
                request({
                  method: 'GET',
                  url: 'https://localhost:3002/_explorer/index.html'
                }, function (error, response, body) {
                  expect(!error).to.be(false);
                  expect(!body).to.be(true);
                  done();
                });
              }, 5000);

            });
          }, {Port: 3002});
        });
      });

    });
  });

});
