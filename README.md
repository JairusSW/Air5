# Node-Air5

![npm](https://img.shields.io/npm/dt/air5?style=flat-square) ![npm](https://img.shields.io/npm/v/air5?style=flat-square) ![NPM](https://img.shields.io/npm/l/air5?style=flat-square)

![Logo](https://i.ibb.co/b77Lytz/rsz-1rsz-logo.png)

**Air5 Is An Asynchronous And Flexible Database Manager That Supports Multiple Providers.**

[![NPM](https://nodei.co/npm/air5.png?downloads=true&downloadRank=true&stars=true&compact=true)](https://nodei.co/npm/air5/)

### Providers

- Sqlite
- LevelDB
- RocksDB
- PouchDB
- NeDB
- LowDB
- AirDB
- Enmap
- Memory
- YAML
- CSV
- TSON
- BSON
- JSON
- FLAT

For A Full List Of Providers See: [https://slicewire.gitbook.io/air5/providers](https://slicewire.gitbook.io/air5/providers)

### Installation

### 🔗 [Installation](https://slicewire.gitbook.io/air5/installation) 🔗

### Usage

```js
const Air5 = require('air5')
 
// Use One Of The Following
 
const database = new Air5('example-name', {
    provider: 'provider-goes-here',
    path: './air5/'
})
// Replace The Provider With Any That Is Installed
 
database.set('key', 'value')
// Insert Key And Value Into The Database
 
console.log(database.get('key', 'value'))
// Fetch Key Or Value From The Database
 
console.log(database.has('key', 'value'))
// Check If Key Or Value Exists In The Database
 
database.delete('key')
// Delete Key From The Database
 
database.clear()
// Clear The Whole Database
 
database.ensure('key', 'value')
// If Key Does Not Exist Insert Key And Value Into The Database
 
database.keys()
// Return The Keys In The Database As An Array

database.values()
// Return The Values In The Database As An Array

database.entries()
// Return Entries To The Database

database.size
// Return The Size Of The Database As A Number

database.forEach((value, key) => {})
// Return The Value(s) And Key(s) Of The Database

database.data()
// Convert And Return The Database As An Object/JSON
 
database.toJSON()
// Convert And Return The Database As An Object/JSON
 
database.toArray()
// Convert And Return The Database As An Array
 
```

### Documetation

### 🔗 [Documentation](https://slicewire.gitbook.io/air5/installation) 🔗

### Creating Providers

🔗 [Creating Providers](https://slicewire.gitbook.io/air5/creating-providers) 🔗

**Copyright 2020 Jairus Tanaka - Apache 2.0**