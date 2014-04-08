# node-ifstats

A Node.js module used to retrieve detailed statistics about each network interface on a machine. Currently works on linux (and probably Unix, though untested). Should work on Mac OS X (also untested, feel free to test and submit an issue/PR with the results)

---

### Installation
`npm install node-ifstats`

### Usage/API
```
var ifstats = require('node-ifstats');
```


ifstats**.getInterfaces(callback)**
```
ifstats.getInterfaces(function(error, ifaces) {
    // ifaces is an array of strings denoting the ids
    // of the installed network interfaces
    
    // ifaces = [ "eth0", "wlan0", "lo" ]
});
```

ifstats**.getInterfacesSync()**  
*synchronous version of `interfaces()`*
```
var ifaces = ifstats.interfacesSync();
// [ "eth0", "wlan0", "lo" ]
```

ifstats**.getInterface(iface, callback)**
```
ifstats.getInterface('eth0', function(error, iface) {
    // `iface` is an object describing the 'eth0' interface (see below)
});
```
ifstats.**getInterfaceSync(iface)**  
*synchronous version of `getInterface()`*
```
var iface = ifstats.getInterfaceSync('eth0');
```
```
// iface
{
    "interface": "eth0",
    "collisions": 0,
    "multicast": 0,
    "rx": {
        "bytes": 9256828,
        "human": '9.2 MB',
        "compressed": 0,
        "crc_errors": 0,
        "dropped": 0,
        "errors": 0,
        "fifo_errors": 0,
        "frame_errors": 0,
        "length_errors": 0,
        "missed_errors": 0,
        "over_errors": 0,
        "packets": 141964
    },
    "tx": {
        "aborted_errors": 0,
        "bytes": 2708839,
        "human": '2.7 MB',
        "carrier_errors": 0,
        "compressed": 0,
        "dropped": 0,
        "errors": 0,
        "fifo_errors": 0,
        "heartbeat_errors": 0,
        "packets": 16434,
        "window_errors": 0
    }
}
```

### History/Changelog

**v0.0.1-alpha**
+ This release is the MVP. There's still a lot of features I'd like to add but as it stands it does it's job, and does it well.
+ This release includes the following functions:
    + getInterfaces(callback)
    + getInterfacesSync()
    + getInterface(iface, callback)
    + getInterfaceSync(iface)