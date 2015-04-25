var config;
var wai = require("./wai");
var tokens = require("./tokens.js");

process.env.CELL_MODE = process.env.NODE_ENV || process.env.CELL_MODE || "development";

if (process.env.CELL_MODE = "development") {
  config = require("./config/development.js");
} else if (process.env.CELL_MODE = "staging") {
  config = require("./config/staging.js");
}

var wai = new wai(config.socketUrl);
wai.prepare("warclusterai", "3202036540" , tokens)
