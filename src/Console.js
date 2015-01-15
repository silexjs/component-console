var minimist = require('minimist');


var Console = function() {};
Console.prototype = {
	commands: [],
	
	registerRaw: function(command, callback) {
		this.commands.push({
			command: command,
			regexp: new RegExp('^'+command+'(.*)$', 'i'),
			callback: callback,
		});
		return this;
	},
	
	resolve: function(argv) {
		var argv = minimist(argv.slice(2));
		var query = argv._[0];
		for(var i in this.commands) {
			var command = this.commands[i];
			var result = query.match(command.regexp);
			if(result !== null) {
				command.callback(argv, query, result);
				return true;
			}
		}
		return false;
	},
};


module.exports = Console;
