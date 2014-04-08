var fs 			= require('fs'),
	humanize 	= require('humanize'),

	_sync		= require('./node-ifstats-sync.js');



exports.getInterfaces = function(callback) {
	var interfaces = [];

	fs.readdir("/sys/class/net/", function(error, ifaces) {
		if (error) {
			callback(error, interfaces);
			return;
		}

		callback(null, ifaces);
	});
};

exports.getInterfaceStats = function(interface, callback) {
	var iface = {};

	fs.readdir("/sys/class/net/" + interface + "/statistics/", function(error, stats) {
		if (error) {
			callback(error, iface);
			return;
		}

		iface.interface = interface;
		iface.rx = {};
		iface.tx = {};

		var fileCount = 0;
		stats.forEach(function(statFile) {
			(function(fileName) {
				fileCount++;

				fs.readFile("/sys/class/net/" + interface + "/statistics/" + fileName, { encoding: 'utf8' }, function(error, contents) {
					fileCount--;

					if (error) {
						contents = -1;
					}

					if (fileName.substr(0, 2) == "tx") {
						iface.tx[fileName.substr(3)] = parseInt(contents);

						if (fileName.substr(3) == "bytes") {
							iface.tx.human = humanize.filesize(parseInt(contents));
						}
					}
					else if (fileName.substr(0, 2) == "rx") {
						iface.rx[fileName.substr(3)] = parseInt(contents);

						if (fileName.substr(3) == "bytes") {
							iface.rx.human = humanize.filesize(parseInt(contents));
						}
					}
					else {
						iface[fileName] = parseInt(contents);
					}

					if (fileCount == 0) {
						callback(null, iface);
					}
				});
			})(statFile);
		});
	});
};

exports.getInterfacesSync 		= _sync.getInterfacesSync;
exports.getInterfaceStatsSync 	= _sync.getInterfaceStatsSync;