const tmi = require('tmi.js');
require('dotenv').config();
const fs = require('fs');

// Setup
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [process.env.RUNS_ON_CHANNEL]
});

client.connect();

// Main loop
client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  if (message.toLowerCase() === '!hello') {
    client.say(channel, `@${tags.username}, hi, from my bot!`);
	
	// Log to file
	fs.writeFile("output.txt", `${new Date().toString()} @${tags.username} said hi`, function(err) {
		if(err) {
			return console.log(err);
		}
	}); 	
  }
});
