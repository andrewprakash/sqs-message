var $c5L0i$process = require("process");
var $c5L0i$actionscore = require("@actions/core");
var $c5L0i$awssdk = require("aws-sdk");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire7b80"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire7b80"] = parcelRequire;
}
parcelRequire.register("5P7zl", function(module, exports) {



async function run() {
    try {
        const sqsUrl = $c5L0i$actionscore.getInput("sqs-url", {
            required: false
        });
        const variables = $c5L0i$actionscore.getInput("variables", {
            required: false
        });
        const splitVariables = variables.toUpperCase().split(",");
        const message = $c5L0i$process.env(splitVariables[0]);
        console.log(message);
        const params = {
            QueueUrl: sqsUrl,
            MessageBody: message
        };
        const sqs = new $c5L0i$awssdk.SQS();
        sqs.sendMessage(params, (err, resp)=>{
            if (err) throw err;
            else console.log(`resp ${JSON.stringify(resp, null, 2)}`);
        });
    } catch (error) {
        $c5L0i$actionscore.setFailed(error.message);
    }
}
module.exports = run;
/* istanbul ignore next */ if (undefined === module) run();

});


parcelRequire("5P7zl");

//# sourceMappingURL=index.js.map
