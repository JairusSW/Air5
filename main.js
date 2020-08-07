const { mkdirSync, existsSync } = require('fs')

const engines = require('./engines.json')

const isNil = (value) => {

    return value == null
    
}

const isObject = (value) => {

    try {

        return typeof value === 'object'

    } catch (err) {

        throw new Error(err)
        
    }
    
}

class Air5 {

	constructor(name, options = {
		provider: 'levelDB',
		path: './.air5/'
	}) {

		(async () => {

			if (isNil(name)) throw new Error('No Database Name Provided')
        
			if (isNil(options.provider)) throw new Error('No Provider Spacified. Please Install And Specify A Provider.')
			
			if (isNil(options.path)) options['path'] = './air5/'
	
			if (!existsSync(options.path)) mkdirSync(options.path)
	
			const path = `${options.path}/${name}-${options.provider}/`.replace('\\', '/').replace('//', '/')
	
			const getProvider = (name) => {
	
				try {
	
					const engine = engines[name.toString().toLowerCase()]
	
					if (isNil(engine)) throw new Error('Provider Is Not Valid Or Is Not Installed.')
	
					return require(engine['module'])
			
				} catch (err) {
			
					return
			
				}
	
			}
	
			const provider = getProvider(options.provider)
	
			if (isNil(provider)) {
	
				throw new Error(`Unknown Provider: ${options.provider}. Did You Install The Correct Provider?`)
	
			}
	
			if (!existsSync(options.path)) mkdirSync(options.path)
	
			if (!existsSync(path)) mkdirSync(path)
	
			this.provider = new provider(name, path)
	
			this.size = await this.toArray().length

		})()

	}

	async ensure(key, value) {

        if (isNil(key) === true) throw new Error('No Key Provided')

        if (isNil(value) === true) throw new Error('No Value Provided')

        try {

            if (!await this.provider.has(key, value)) {

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

		
	async clear() {

		try {


			await this.provider.clear()

			this.size = 0

			return

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

	async has(key, value) {

		if (isNil(key) === true) throw new Error('No Key Provided')

        try {

			if (isNil(value)) {

				return await this.provider.has(key)

			} else {

				const value = await this.provider.has(key)

				if (isNil(value)) return false

				return true

			}

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

	async forEach(options = (value, key)) {

        try {

			const array = await this.toArray()

			array.forEach(i => {

				options(i[1], i[0])

			})

            return 

        } catch (err) {

            throw new Error(err)

        }
	}

	async data() {

        try {

			return await this.provider.data()

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

}

module.exports = Air5

/*
Copyright 2020 Jairus Tanaka

Apache 2.0 License

Please Refer To License Before Editing
*/