const { error } = require('console')
const {createReadStream} = require('fs')
const {writeFileSync} = require('fs')


const stream = createReadStream('../content/big.txt', {highWaterMark: 200, encoding: "utf-8"})

let chunkCounter = 0;

stream.on('data', (chunk) => {
    chunkCounter++;
    console.log(`chunk ${chunkCounter}`)
    console.log(chunk)
})
stream.on('end', ()=> {
    console.log(`stream ended. Total chunks are ${chunkCounter}`)
})

stream.on('error', (error) => {
    console.log('error reading', error)
})