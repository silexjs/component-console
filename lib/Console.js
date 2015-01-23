var minimist = require('minimist');


var Console = function() {};
Console.prototype = {
	commands: [],
	
	registerRaw: function(command, desc, callback) {
		this.commands.push({
			command: command,
			desc: desc,
			regexp: new RegExp('^'+command+'(.*)$', 'i'),
			callback: callback,
		});
		return this;
	},
	
	resolve: function(argv) {
		var argv = minimist(argv.slice(2));
		var query = argv._[0];
		console.log('-------------------------------------------------------------------------------');
		if(query === undefined) {
			console.log('Commands list:');
			for(var i in this.commands) {
				var command = this.commands[i];
				console.log('> '+command.command+'    ('+command.desc+')');
			}
			console.log('-------------------------------------------------------------------------------');
		} else {
			var end = function() {
				console.log('-------------------------------------------------------------------------------');
			};
			for(var i in this.commands) {
				var command = this.commands[i];
				var result = query.match(command.regexp);
				if(result !== null) {
					command.callback(end, argv, query, result);
					return true;
				}
			}
		}
		return false;
	},
};


module.exports = Console;
