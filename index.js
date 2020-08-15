const { mkdirSync, existsSync } = require('fs')

const engines = {

	leveldb: {
		module: 'air5-level',
		name: 'LevelDB'
	},
	rocksdb: {
		module: 'air5-rocks',
		name: 'RocksDB'
	},
	sqlite: {
		module: 'air5-sqlite',
		name: 'SQLite'
	},
	carbondb: {
		module: 'air5-carbon',
		name: 'CarbonDB'
	},
	pouchdb: {
		module: 'air5-pouch',
		name: 'PouchDB'
	},
	airdb: {
		module: 'air5-air',
		name: 'AirDB'
	},
	lowdb: {
		module: 'air5-low',
		name: 'LowDB'
	},
	nedb: {
		module: 'air5-nedb',
		name: 'NeDB'
	},
	memory: {
		module: 'air5-memory',
		name: 'Memory'
	},
	enmap: {
		module: 'air5-enmap',
		name: 'Enmap'
	},
	csv: {
		module: 'air5-csv',
		name: 'CSV'
	},
	yaml: {
		module: 'air5-yaml',
		name: 'YAML'
	},
	bson: {
		module: 'air5-bson',
		name: 'BSON'
	},
	tson: {
		module: 'air5-tson',
		name: 'TSON'
	},
	json: {
		module: 'air5-json',
		name: 'JSON'
	},
	json5: {
		module: 'air5-json5',
		name: 'JSON5'
	},
	flat: {
		module: 'air5-flat',
		name: 'FLAT'
	}
}

const isNil = (value) => {

    return value == null
    
}

class Air5 {

	constructor(name, options = {
		provider: undefined,
		path: undefined
	}) {

		(async () => {

			if (isNil(name)) throw new Error('No Database Name Provided')

			if (isNil(options.provider)) throw new Error('No Provider Spacified. Please Install And Specify A Provider.')
			
			if (isNil(options.path)) options['path'] = './air5/'

			if (!existsSync(options.path)) mkdirSync(options.path)

			const getProvider = (name) => {

				const names = Object.keys(engines)

				if (!names.includes(name.toString().toLowerCase())) throw new Error('Provider Is Not Valid Or Is Not Installed.')

				const Provider = engines[name.toString().toLowerCase()]

				return Provider

			}

			const PProvider = getProvider(options.provider)

			const provider = require(`${PProvider['module']}`)

			//if (isNil(Provider)) throw new Error('Unknown Provider. Did You Install The Correct One?')

			const path = `${options.path}/${name}-${PProvider['name']}/`.replace('\\', '/').replace('//', '/')

			if (!existsSync(options.path)) mkdirSync(options.path)

			if (!existsSync(path)) mkdirSync(path)

			this.provider = new provider(name, path)

			const array = await this.toArray()

			this.size = array.length - 1

			this.size = this.size

			return

		})()

	}

	async ensure(key, value) {

        if (isNil(key) === true) throw new Error('No Key Provided')

        if (isNil(value) === true) throw new Error('No Value Provided')

        try {

            if (!await this.provider.has(key)) {

                await this.provider.set(key, value)

                return

            }

            return

        } catch (err) {

            throw new Error(err)

        }
	}
	
	async set(key, value) {

		if (isNil(key) === true) throw new Error('No Key Provided')

		if (isNil(value) === true) throw new Error('No Value Provided')
		
		try {

			await this.provider.set(key, value)

			this.size++

		} catch (err) {

			throw new Error(err)

		}
        
	}

	async get(key, value) {		

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (isNil(value)) {

				return await this.provider.get(key)

			} else {

				const value = await this.provider.get(key)

				return value[value]
				
			}

		} catch (err) {

			throw new Error(err)

		}

	}

	async has(key, value) {

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (isNil(value)) {

				return await this.provider.has(key)

			} else {

				const value = await this.provider.get(key)

				if (isNil(value)) return false

				return true

			}

		} catch (err) {

			throw new Error(err)

		}

	}

	async delete(key) {

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (await this.has(key) === false) return undefined
			
			await this.provider.delete(key)

			this.size--

			return true

		} catch (err) {

			throw new Error(err)

		}
		
	}

	async clear() {

		try {

			await this.provider.clear()

			this.size = 0

			return

		} catch (err) {

			throw new Error(err)

		}
        
	}

	async keys() {

        try {

			const object = await this.provider.toJSON()

			return Object.keys(object)

		} catch (err) {

			throw new Error(err)

		}

	}

	async values() {

        try {

			const object = await this.provider.toJSON()

			return Object.values(object)

		} catch (err) {

			throw new Error(err)

		}

	}

	async entries() {

        try {

			return await this.toArray()
			
        } catch (err) {

            throw new Error(err)

        }
	}

	async forEach(callback) {		

        try {

			const array = await this.toArray()

			array.forEach(([key, value]) => {

				callback(value, key)

			})

            return 

        } catch (err) {

            throw new Error(err)

        }
	}

	async data() {

        try {

			return await this.provider.toJSON()

		} catch (err) {

			throw new Error(err)

		}

	}

	async toJSON() {

        try {

			return await this.provider.toJSON()

		} catch (err) {

			throw new Error(err)

		}

	}

	async toArray() {

        try {

			return await this.provider.toArray()

		} catch (err) {

			throw new Error(err)

		}

	}
	
	async toMap() {

        try {

			return new Map(await this.toArray())

		} catch (err) {

			throw new Error(err)

		}

    }

}

process.on('unhandledRejection', (err) => console.log('Unhandled Rejection Error: \n', err, '\n'))

module.exports = Air5

/*
Copyright 2020 Jairus Tanaka

Apache 2.0 License

Please Refer To License Before Editing
*/