var documentdb = require("../src/index.js");
var expect = require("expect.js");
var fs = require("fs");
var request = require("request");

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
        documentdb.start(function (result, err) {
          expect(err).to.be(undefined);

          request({
            method: 'GET',
            url: 'https://localhost:3001/_explorer/index.html'
          }, function (error, response, body) {
            expect(err).to.be(undefined);
            done();
          });

        }, {Port: 3001});
      });
    });
  });


  describe("stop", function () {
    it("should stop azure-cosmosdb-emulator", function (done) {
      this.timeout(600000);
      documentdb.install(function (result, err) {
        documentdb.start(function (result, err) {
          documentdb.stop(function (result, err) {
            expect(err).to.be(undefined);
            
            request({
              method: 'GET',
              url: 'https://localhost:3002/_explorer/index.html'
            }, function (error, response, body) {
              expect(error).not.to.be(undefined);
              done();
            });
            
          });
        }, {Port: 3002});
      });
    });
  });

});
