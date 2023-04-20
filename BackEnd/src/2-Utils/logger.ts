import fsPromises from "fs/promises"

const path= "./src/log.txt"

async function logger(msg:string):Promise<void>{
    const now= new Date()
    const date= now.toLocaleString()
const data= `
    ${msg} ---------------------------
    ${date}
`
    await fsPromises.appendFile(path, data)
}

export default logger