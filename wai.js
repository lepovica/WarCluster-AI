var WebSocket = require("ws");
var PlayerData = require("./PlayerData.js");

module.exports = function(url){
  this.url = url;
  this.context = {};
}

module.exports.prototype.prepare = function(username, twitterId, tokens) {
  var self = this;

  this.username = username;
  this.twitterId = twitterId;

  var msg = {
    "Command": "login",
    "Username": username,
    "TwitterId": twitterId,
    "AccessToken": tokens.oauthAccessToken,
    "AccessTokenSecret": tokens.oauthAccessTokenSecret
  };

  this.ws = new WebSocket(this.url);
  // this.ws.on("open", function(msg) {
  //   // console.log("websocket open")
  //   self.parseMessage(msg.data);
  // });
  // this.ws.on("message", function(e) {
  //   self.ws.send(JSON.stringify(msg));
  // });
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
        // some fuzzy module decision making passing playerData
      break;
      case "scope_of_view_result":
        // some fuzzy module decision making
      break;
      case "state_change":
        // some fuzzy module decision making
      break;
      case "request_setup_params":
        this.requestSetupParameters();
      break;
      case "send_missions":
        // console.log("send_missions:", data)
        // some fuzzy module decision making
      break;
      case "send_mission_failed":
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
        break;
      case "error":
          console.error(data.Message)
        break;
      case "owner_change":
        console.log("Wai has lost a planet ;C")
      break;
      default:
        console.log(data);
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

module.exports.prototype.changeSubscriptions = function(objects) {
  // console.log("changeSubscriptions", JSON.stringify(objects, null, '\t'))
  // this.ws.send('{' +
  //   '"Command": "change_subscriptions",' +
  //   '"Objects": ' + JSON.stringify(objects) +
  // '}')
}

module.exports.prototype.unsubscribeAll = function() {
  // this.ws.send('{' +
  //   '"Command": "unsubscribeAll"' +
  // '}')
}
