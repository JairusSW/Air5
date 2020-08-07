# Node-Air5

![npm](https://img.shields.io/npm/dt/air5?style=flat-square) ![npm](https://img.shields.io/npm/v/air5?style=flat-square) ![NPM](https://img.shields.io/npm/l/air5?style=flat-square)

![Logo](https://i.ibb.co/SmdD6sX/Logo.png)

**Air5 Is An Asynchronous And Flexible Database Manager That Supports Multiple Providers.**

[![NPM](https://nodei.co/npm/air5.png?downloads=true&downloadRank=true&stars=true&compact=true)](https://nodei.co/npm/air5/)

### Providers

- Sqlite3
- LevelDB
- RocksDB
- CarbonDB
- PouchDB
- NeDB
- LowDB
- AirDB
- Memory

### Installation

```bash
npm i air5 --save
```
Install An Engine (Required)

```bash
npm i air5-sqlite --save

npm i air5-level --save

npm i air5-rocks --save

npm i air5-carbon --save

npm i air5-pouch --save

npm i air5-nedb --save

npm i air5-low --save

npm i air5-air --save

npm i air5-memory --save
```

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

database.data()
// Convert And Return The Database As An Object/JSON
 
database.toJSON()
// Convert And Return The Database As An Object/JSON
 
database.toArray()
// Convert And Return The Database As An Array
 
```

### Speeds
```
SQLite3 

    01,741 ops/s, ±10.43% | 01.74 MB/s

LevelDB

    58,688 ops/s, ±18.43% | 58.68 MB/s

RocksDB

    58,750 ops/s, ±17.31% | 58.75 MB/s

CarbonDB 

    01,768 ops/s, ±10.43% | 01.77 MB/s

PouchDB

    58,470 ops/s, ±19.24% | 58.47 MB/s

NeDB

    52,172 ops/s, ±18.19% | 52.17 MB/s

LowDB

    68,055 ops/s, ±13.34% | 68.05 MB/s

AirDB

    67,792 ops/s, ±13.04% | 67.79 MB/s

MemoryDB

    15,358 ops/s, ±2.14%  | 15.35 MB/s

```
**Copyright 2020 Jairus Tanaka - Apache 2.0**