const client = new (require('discord.js')).Client();

client.on('message', (message) => {
	if(message.content.startsWith('!fb') && !message.author.bot) {
		let numStr = message.content.slice('!fb'.length).trim();
		let num = parseInt(numStr);
		let output = '';
		for(let i = 0; i < num; i++) output += ((i.toString().includes('5') ? i.toString().match('5').join(' ').replace('5', 'Fizz ') + ' ': '') +  (i%5 == 0 ? 'Fizz ' : (i%7 == 0 ? 'Buzz' : i))).trim() + '\n';
		safeSend(output, message.channel);
	}
});

const safeSend = async (message, channel) => {
	if(message.length > 2000) {
		let outputArr = matchToWord(message, 2000);
		for(let i = 0; i < outputArr.length; i++) {
			await channel.send(outputArr[i]);
		}
	}
	else {
		channel.send(message);
	}
}

const matchToWord = (str, length) => {
	let words = str.split(/\w/g);
	let output = [''];
	let currIndex = 0;
	for(let i = 0; i < words.length; i++) {
		if(output[currIndex].length + words[i].length >= length) {
			currIndex++;
			output[currIndex] = '';
		}
		output[currIndex] += words[i];
	}
}

const config = require('./config.json');
client.login(config.token);