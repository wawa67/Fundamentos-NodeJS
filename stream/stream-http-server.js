import http from 'node:http'
import { Transform } from 'node:stream';
//stream de transformação
class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        //pega chunck e transforma em negativo
        const transform = Number(chunck.toString()) * -1;
        //retorna valor negativo
        console.log(transform)
        
        callback(null,Buffer.from(String(transform)))
    }
}

const server = http.createServer(async (req,res)=>{
    const buffers = []
    for await (const chunck of req){
        buffers.push(chunck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)
    return res.end(fullStreamContent);
    
})

server.listen(3334)