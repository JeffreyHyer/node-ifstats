var fs 			= require('fs'),
	humanize	= require('humanize');



exports.getInterfacesSync = function() {
	return fs.readdirSync("/sys/class/net/")
};

exports.getInterfaceStatsSync = function(interface) {
	var iface 	= {},
		stats 	= fs.readdirSync("/sys/class/net/" + interface + "/statistics/");

	iface.interface = interface;
	iface.tx = {};
	iface.rx = {};

	stats.forEach(function(statFile) {
		var contents = fs.readFileSync("/sys/class/net/" + interface + "/statistics/" + statFile, { encoding: 'utf8' });

		if (statFile.substr(0, 2) == "tx") {
			iface.tx[statFile.substr(3)] = parseInt(contents);

			if (statFile.substr(3) == "bytes") {
				iface.tx.human = humanize.filesize(parseInt(contents));
			}
		}
		else if (statFile.substr(0, 2) == "rx") {
			iface.rx[statFile.substr(3)] = parseInt(contents);

			if (statFile.substr(3) == "bytes") {
				iface.rx.human = humanize.filesize(parseInt(contents));
			}
		}
		else {
			iface[statFile] = parseInt(contents);
		}
	});

	return iface;
};