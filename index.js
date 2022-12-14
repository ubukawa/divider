//modules
const config = require('config')
const fs = require('fs')

//parameters
const minzoom = config.get('minzoom')
const maxzoom = config.get('maxzoom')
const srcDir = config.get('srcDir')
const extension = config.get('extension')
const outDir = config.get('outDir')
const divNum = config.get('divNum')

//make division
for (let i=1; i < divNum + 1; i++){
    fs.mkdirSync(`${outDir}/zxy_${i}_${divNum}`, {recursive: true},
    (err) =>{
        if(err){throw err}
    })
}

//for each z/x/y
for (var z = minzoom; z < maxzoom + 1 ; z++){
    console.log(`Zoom level ${z} started at ${Date()}`)
    for (let x = 0; x < 2 ** z; x++){
        for (let y = 0; y < 2 ** z; y++){
            if(fs.existsSync(`${srcDir}/${z}/${x}/${y}.${extension}`)){
                let modXY = (x + y) % divNum
                let division = modXY + 1
                let filePath = `${outDir}/zxy_${division}_${divNum}`
                if(!fs.existsSync(`${filePath}/${z}`)){
                    fs.mkdirSync(`${filePath}/${z}`)
                    console.log(`${filePath}/${z} has been created.`)
                }
                if(!fs.existsSync(`${filePath}/${z}/${x}`)){
                    fs.mkdirSync(`${filePath}/${z}/${x}`)
                    console.log(`${filePath}/${z}/${x} has been created.`)
                }
                //console.log(`${z}/${x}/${y}.${extension} exists. Its X+Y value is ${modXY} (mod: ${divNum}), so it will go to ${filePath} `)
                fs.copyFileSync(`${srcDir}/${z}/${x}/${y}.${extension}`,`${filePath}/${z}/${x}/${y}.${extension}`)
                console.log(`${z}/${x}/${y}.${extension} exists. Its X+Y value is ${modXY} (mod: ${divNum}), so it has been copied in ${filePath}`)
            }
            //console.log(`no file: ${z}/${x}/${y}` )
        }
    }
}



