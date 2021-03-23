# Node-Air5

![npm](https://img.shields.io/npm/dt/air5?style=flat-square) ![npm](https://img.shields.io/npm/v/air5?style=flat-square) ![NPM](https://img.shields.io/npm/l/air5?style=flat-square)

![Logo](https://i.ibb.co/b77Lytz/rsz-1rsz-logo.png)

**Air5 Is An Asynchronous And Flexible Database Manager That Supports Multiple Providers.**

[![NPM](https://nodei.co/npm/air5.png?downloads=true&downloadRank=true&stars=true&compact=true)](https://nodei.co/npm/air5/)

### Providers

- Mongo
- Redis
- Sqlite
- LevelDB
- RocksDB
- Ect...

### Installation

```bash
npm i air5 --save   
```
```
npm i air5-[provider] --save

```

### [Documentation](https://slicewire.gitbook.io/air5)

### Usage

```js

const Air5 = require('air5')
 
const database = new Air5('example-name', {
    provider: 'provider-goes-here',
    path: './air5/'
})

await air.set('The King', {
    id: 178362085198,
    xp: 863,
    rank: 'General',
    level: 'Diamond',
    tag: '#3022'
})

console.log(await air.get('The King'))
/*//==> {
//  id: 178362085198,
//  xp: 863,
//  rank: 'General',
//  level: 'Diamond',
//  tag: '#3022'
}<==//*/
```