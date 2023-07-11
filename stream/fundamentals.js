import { Readable, Writable, Transform } from 'node:stream'
//stream de leitura
class OneToHundredStream  extends Readable{
    index = 1
    _read(){
        //recebe um valor e incrementa mais 1 nele
        const i = this.index++
        setTimeout(() => {
            //se for igual a 100 para
            if(i > 100){
                this.push(null)
            }else{
                //se não continua incrementando e mostrando na tela
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 100);

    }
}
//stream de transformação
class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        //pega chunck e transforma em negativo
        const transform = Number(chunck.toString()) * -1;
        //retorna valor negativo
        callback(null,Buffer.from(String(transform)))
    }
}
//stream de escrita
class MultiplyByTenStream extends Writable{
    _write(chunck, encoding, callback){
        //pega o valor do buffer e multiplica por 10
        console.log(Number(chunck.toString()) * 10);
        //retorna o callback
        callback();
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())