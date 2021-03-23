(async () => {

    const Air5 = require('./index')

    const air = new Air5('test', {
        provider: 'LevelDB'
    })

    await air.set('haha', 'haha', 'gaga.baba')

    console.log(await air.has('haha', 'gaga.baba'))
    
    console.log(await air.data())

})()