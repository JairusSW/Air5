const { mkdirSync, existsSync } = require('fs')

const engines = require('./providers.json')

const _ = require('lodash')

const isNil = (value) => {

    return value == null
    
}

class Air5 {

	constructor(name, options = {
		provider: undefined,
		path: undefined,
		uri: undefined
	}) {

		(async () => {

			if (isNil(name)) throw new Error('No Database Name Provided')

			if (isNil(options.provider)) throw new Error('No Provider Spacified. Please Install And Specify A Provider.')
			
			if (isNil(options.path)) options['path'] = './air5/'

			if (!existsSync(options.path)) mkdirSync(options.path)

			const getProvider = (engine) => {

				const names = Object.keys(engines)

				if (!names.includes(engine.toString().toLowerCase())) throw new Error('Provider Is Not Valid Or Is Not Installed.')

				const Provider = engines[engine.toString().toLowerCase()]

				return Provider

			}

			const Provider = getProvider(options.provider)

			const provider = require(Provider['module'])

			const path = `${options.path}/${name}-${Provider['name']}/`.replace('\\', '/').replace('//', '/')

			if (!existsSync(options.path)) mkdirSync(options.path)

			this.provider = new provider(name, path, options.uri)

			return

		})()

	}

/**
 * 
 * @description Set A Key/Value If It Is Missing
 * ```js 
 * await air.ensure('key', 'value')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */

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
	
/**
 * 
 * @description Set A Key/Value Inside Of The Database
 * ```js 
 * await air.set(key, value, path)
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */
	async set(key, value, path) {

		if (isNil(key) === true) throw new Error('No Key Provided')

		if (isNil(value) === true) throw new Error('No Value Provided')
		
		try {

			if (path) {

				let data = await this.get(key)

				_.set(data, path, value)
				
				await this.provider.set(key, data)

				return

			}

			await this.provider.set(key, value)

			return

		} catch (err) {

			throw new Error(err)

		}
        
	}

/**
 * 
 * @description Get A Key/Value From The Database
 * ```js 
 * await air.get('key', 'value')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns { key: value }
 * @author JairusSW
 */

	async get(key, path) {		

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (isNil(path)) {

				return await this.provider.get(key)

			} else {

				const value = await this.provider.get(key)

				return _.get(value, path)
				
			}

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Check If Key/Value Exists
 * ```js 
 * await air.has('key', 'value')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns true/false
 * @author JairusSW
 */

	async has(key, path) {

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (isNil(path)) {

				return await this.provider.has(key)

			} else {

				const value = await this.get(key, path)

				if (isNil(value)) return false

				return true

			}

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Delete A Key And It's Value From The Database
 * ```js 
 * await air.delete('key')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */

	async delete(key) {

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (await this.has(key) === false) return
			
			await this.provider.delete(key)

			return

		} catch (err) {

			throw new Error(err)

		}
		
	}

/**
 * 
 * @description Clear The Whole Database
 * ```js 
 * await air.clear()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */

	async clear() {

		try {

			await this.provider.clear()

			return

		} catch (err) {

			throw new Error(err)

		}
        
	}

/**
 * 
 * @description Return All The Keys In The Database As An Array
 * ```js 
 * await air.keys()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns []
 * @author JairusSW
 */

	async keys() {

        try {

			if (this.provider.keys) return await this.provider.keys()

			const object = await this.provider.toJSON()

			return Object.keys(object)

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Return All The Values In The Database As An Array
 * ```js 
 * await air.values()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns []
 * @author JairusSW
 */

	async values() {

        try {

			if (this.provider.values) return await this.provider.values()

			const object = await this.provider.toJSON()

			return Object.values(object)

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Return All The Data In The Database A Iterable Array
 * ```js 
 * await air.entries()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns []
 * @author JairusSW
 */

	async entries() {

        try {

			if (this.provider.entries) return await this.provider.entries()

			return await this.toArray()
			
        } catch (err) {

            throw new Error(err)

        }
	}

/**
 * 
 * @description Return All The Keys And Values One At A Time
 * ```js 
 * await air.forEach((key, value) => {})
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */

	async forEach(callback) {		

        try {

			if (this.provider.forEach) {
				
				await this.provider.forEach((value, key) => {

					callback(value, key)

				})

				return

			}

			const array = await this.toArray()

			array.forEach(([key, value]) => {

				callback(value, key)

			})

            return 

        } catch (err) {

            throw new Error(err)

        }
	}

/**
 * 
 * @description Return A Random Key/Value From The Database
 * ```js 
 * await air.random()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns {}
 * @author JairusSW
 */

	async random() {

        try {

			if (this.provider.random) return await this.provider.random()

			const array = await this.toArray()

			const length = array.length

			const random = array[Math.floor(Math.random() * length)]

			const json = {}

			json[random[0]] = random[1]

			return json

		} catch (err) {

			throw new Error(err)

		}
 
	}

/**
 * 
 * @description Find A Key Or Value In The Database
 * ```js 
 * await air.find((value, key) => value === 'value')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns {}
 * @author JairusSW
 */

	async find(callback, argument) {

		try {

			if (typeof argument !== 'undefined') callback = callback.bind(argument);

			const array = await this.toArray()

			for (const [key, value] of array) {
				
				if (callback(value, key)) {

					const json = {}

					json[key] = value

					return json

				}
					
			}
				
			return undefined

		} catch (err) {

			throw new Error(err)

		}
 
	}

/**
 * 
 * @description Filter Key(s) Or Value(s) From The Database
 * ```js 
 * await air.filter((value, key) => value === 'value')
 * ```
 * @license Apache-2.0
 * @public true
 * @returns {}
 * @author JairusSW
 */

	async filter(callback, argument) {
		
        try {

			if (this.provider.filter) return await this.provider.filter(callback, argument)

			const results = {}

			if (typeof argument !== 'undefined') callback = callback.bind(argument);

			const array = await this.toArray()

			for (const [key, value] of array) {
				
				if (callback(value, key)) {

					results[key] = value

				}
					
			}
				
			return results

		} catch (err) {

			throw new Error(err)

		}
 
	}

/**
 * 
 * @description Return The Database As JSON
 * ```js 
 * await air.data()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns {}
 * @author JairusSW
 */

	async data() {

        try {

			if (this.provider.data) return await this.provider.data()

			return await this.provider.toJSON()

		} catch (err) {

			throw new Error(err)

		}
 
	}

/**
 * 
 * @description Return The Database As JSON
 * ```js 
 * await air.toJSON()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns {}
 * @author JairusSW
 */

	async toJSON() {

        try {

			if (this.provider.toJSON) return await this.provider.toJSON()

			return await this.provider.toJSON()

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Return The Database As An Array
 * ```js 
 * await air.toArray()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns []
 * @author JairusSW
 */

	async toArray() {

        try {

			if (this.provider.toArray) return await this.provider.toArray()

			return await this.provider.toArray()

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Return The Database As A Map
 * ```js 
 * await air.toMap()
 * ```
 * @license Apache-2.0
 * @public true
 * @returns [Object Map]
 * @author JairusSW
 */

	async toMap() {

        try {

			if (this.provider.toMap) return await this.provider.toMap()

			return new Map(await this.toArray())

		} catch (err) {

			throw new Error(err)

		}

	}

/**
 * 
 * @description Insert Data From A Map Into Datbase
 * ```js 
 * await air.fromMap(map)
 * ```
 * @license Apache-2.0
 * @public true
 * @returns undefined
 * @author JairusSW
 */

	async fromMap(map) {

        try {

			if (this.provider.fromMap) return await this.provider.fromMap()

			for (const [key, value] of map) {

				await this.set(key, value)

			}

			return

		} catch (err) {

			throw new Error(err)

		}

    }

}

module.exports = Air5

/*
Copyright 2020 Jairus Tanaka

Apache 2.0 License

Please Refer To License Before Editing
*/