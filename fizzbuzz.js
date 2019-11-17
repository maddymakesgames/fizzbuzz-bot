const client = new (require('discord.js')).Client();

client.on('message', (message) => {
	if(message.author.bot) return;
	if(message.content.startsWith('!fb')) {
		let numStr = message.content.slice('!fb'.length).trim();
		let args = numStr.split(' ');
		let players = 0;
		let start = 0;
		let end = 10;
		for(num in args) if(num == parseInt(num)) return message.channel.send('Please provide only integers for the arguments');
		switch(args.length) {
			case 1:
				end = args[0];
				break;
			case 2:
				start = args[0];
				end = args[1];
				break;
			case 3:
			default:
				players = args[0];
				start = args[1];
				end  = args[2];
		}
		let output = `__FizzBuzz from ${start} to ${end}${players > 0 ? ` with ${players} players` : ''}__\n`;
		let currPlayer = 1;
		let dir = false;
		for(let i = start; i < end; i++) {
			let currNumText = ((players > 0 ? `Player ${currPlayer}: ` : '') +(i.toString().includes('5') ? i.toString().match('5').join(' ').replace('5', 'Fizz ') + ' ': '') +  (i%5 == 0 ? 'Fizz ' : (i%7 == 0 ? 'Buzz' : i))).trim() + '\n';
			output += currNumText;
			if(players > 0){
				if(currNumText.includes('Fizz') || currNumText.includes('Buzz')) currNumText.match(/Fizz|Buzz/g).forEach(() => dir = !dir);
				if(dir) currPlayer--;
				else currPlayer++;
				if(currPlayer == 0) currPlayer = players;
				if(currPlayer > players) currPlayer = 1;
			}
		}
		safeSend(output, message.channel);
	}
	else if(message.content.startsWith('!help')) {
		message.channel.send('!fb [players] [start] end\nPrints fizz buzz until a specified end, can be given a start value and a players value.');
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