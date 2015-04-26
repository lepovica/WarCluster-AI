'use strict'

var WebSocket = require("ws");
var request = require("request");
var PlayerData = require("./PlayerData.js");
var cortex = require("./cortex.js");
var ok = require("okay");

module.exports = function(config){
  this.context = {};
  this.config = config;
}

module.exports.prototype.prepare = function(username, twitterId, tokens) {
  var self = this;

  this.username = username;
  this.twitterId = twitterId;
  this.cortex = new cortex(this);
  // console.log("Cortext", this.cortex)
  var msg = {
    "Command": "login",
    "Username": username,
    "TwitterId": twitterId,
    "AccessToken": tokens.oauthAccessToken,
    "AccessTokenSecret": tokens.oauthAccessTokenSecret
  };
  this.getEmperor(ok(console.error.bind(console), function(data) {
    var emperor = JSON.parse(data)[0];
    // console.log(self.cortex)
    self.cortex.rememberEmperor(emperor);
  }));

  this.getLeaderboardRaces(ok(console.error.bind(console), function(data) {
    var races = JSON.parse(data);
  }));
  // console.log("config", this.config)
  this.ws = new WebSocket(this.config.socketUrl);
  this.ws.on("open", function() {
    console.log("websocket open")
    self.ws.send(JSON.stringify(msg));
  });
  this.ws.on("message", function(message) {
    // console.log("websocket  message", message)
    self.parseMessage(message);
  });
  this.ws.on("error", function(err){
    console.error(arguments)
  })
}

module.exports.prototype.parseMessage = function(command) {
  var data = JSON.parse(command);

  if (data.Command) {
    this.context.currentTime =  data.Timestamp;
    switch (data.Command) {
      case "login_success":
        console.log("Wai is logged in-wooohooooo :D")
        var pd = new PlayerData();

        pd.Username = this.username;
        pd.TwitterID = this.twitterId;
        pd.Position = data.Position;
        pd.Race = data.RaceID;
        pd.HomePlanet = data.HomePlanet;
        this.cortex.setPlayerData(pd)
        // some fuzzy module decision making passing playerData
          break;
      case "scope_of_view_result":
        console.log("scope_of_view_result")
        this.cortex.parseView(data)
        // some fuzzy module decision making
        break;
      case "state_change":
        console.log("state_change")
        // some fuzzy module decision making
        break;
      case "request_setup_params":
        console.log("request_setup_params")
        // decide
        this.setupParameters(5, 0);
        break;
      case "send_missions":
        console.log("send_missions")
        // console.log("send_missions:", data)
        // some fuzzy module decision making
        break;
      case "send_mission_failed":
        console.log("send_mission_failed")
        // some fuzzy module decision making
        break;
      case "server_params":
        console.log("Wai should understand server_params")
        this.context.serverParams = {
          HomeSPM: data.HomeSPM,
          PlanetsSPM: data.PlanetsSPM,
          Races: data.Races,
          ShipsDeathModifier: data.ShipsDeathModifier
        }
        this.scopeOfView(0, 0, 145907, 145907)
        break;
      case "error":
        console.error(data.Message)
        break;
      case "owner_change":
        console.log("Wai has lost a planet ;C")
        break;
      default:
        console.log("default", data);
    }
  }
}

module.exports.prototype.scopeOfView = function(x, y, width, height) {
  //console.log("scopeOfView", x, y, width, height)
  this.ws.send('{' +
    '"Command": "scope_of_view",' +
    '"Position": {"x": '+x+', "y": '+y+'},' +
    '"Resolution": ['+width+', '+height+']' +
  '}');
}

module.exports.prototype.sendMission = function(type, source, target, ships, waypoints) {
  // console.log("sendMission:", type, source, target, ships, waypoints)
  console.log("source", source)
  console.log("target", target)
  console.log("ships", ships)
  var waypointsPath = waypoints ? JSON.stringify(waypoints) : "[]";
  this.ws.send('{' +
    '"Command": "start_mission",' +
    '"Type": "'+type+'",' +
    '"StartPlanets": ["'+source.join('","')+'"],' +
    '"EndPlanet": "'+target+'",' +
    '"Fleet": '+ ships + ',' +
    '"Path": '+ waypointsPath +
  '}');
}

module.exports.prototype.setupParameters = function(race, sun) {
  this.ws.send('{' +
    '"Command": "setup_parameters",' +
    '"Race": '+race+',' +
    '"SunTextureId": '+ sun +
  '}')
}

module.exports.prototype.getLeaderboardRaces = function (done) {
  request.get(this.config.ajaxUrl + "/races/", ok(done, function(response, body) {
    done(null, body)
  }))
}

module.exports.prototype.getEmperor = function(done) {
  request.get(this.config.ajaxUrl + "/players/?page=1", ok(done, function(response, body) {
    done(null, body)
  }))
}
