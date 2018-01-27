//Create afkBot. Note that the empty string means that it will be called on all messages.
var afkBot = new Bot("AFKBOT", "");

//load bots
function initializeBots() {
  afkBot.register();
  afkBot.afkUsers = [];
}

//this is the function called whenever a message starts with the command header. 
afkBot.executeCommand =  function(data) {
  //This code initializes the variables:
  var poster = data.poster;
  var message = data.message;
  var timestamp = data.timestamp;
  var raw_timestamp = data.rawTimestamp;

  //https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
  function remove(array, element) {
    return array.filter(e => e !== element);
  }

  if (message.substring(0,7) == "afkinfo") {
    this.respond("AFKBOT: originally created by LAX18 on 12/31/17, optimized by _iPhoenix_ on 1/2/18, tested on 1/27/18");
  }
  else {
    //For future reference, & is a bitwise operator that you probably will never need. && is the logical and, which is what you wanted. 
    //if our array of users that are currently afk includes the poster, then they have typed something and aren't AFK.
    if (this.afkUsers.includes(poster)) {
      this.afkUsers = remove(this.afkUsers, poster);
      this.respond("*" + poster + " is no longer AFK.");
    }
    else {
      //if the message sent is ~afk, (The header char is not removed because we initialized our bot with the empty string) mark the user as such and add them to our list of AFK people.
      if (message == "~afk") {
        this.afkUsers.push(poster)
        this.respond(poster + " has gone AFK.");
      }
    }
  }
}
