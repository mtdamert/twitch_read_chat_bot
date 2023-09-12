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

function prettyPrintNumber(number) {
	return formattedNumber = ("0" + number).slice(-2);
}

// Main loop
client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if (self) return;

	if (message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, hi, from my bot!`);
	}
  
	// Log message to file
	const nowDate = new Date();
	const nowDateStr = prettyPrintNumber(nowDate.getMonth()) + "/" + prettyPrintNumber(nowDate.getDate()) + "/" + nowDate.getFullYear()
		+ " " + prettyPrintNumber(nowDate.getHours()) + ":" + prettyPrintNumber(nowDate.getMinutes()) + ":" + prettyPrintNumber(nowDate.getSeconds());
	
	// Log all chat to the same file
	fs.appendFile("log.txt", `${nowDateStr} ${tags.username}: ${message}\n`, function(err) {
		if(err) {
			return console.log(err);
		}
	});
	
	// Log chat to a file where it can easily be loaded into another app
	fs.appendFile("chat.txt", `${tags.username}, ${message}\n`, function(err) {
		if(err) {
			return console.log(err);
		}
	});
});
