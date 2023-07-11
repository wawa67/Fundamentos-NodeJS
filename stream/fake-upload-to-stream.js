import {Readable} from 'node:stream'

//stream de leitura
class OneToHundredStream  extends Readable{
    index = 1
    _read(){
        //recebe um valor e incrementa mais 1 nele
        const i = this.index++
        setTimeout(() => {
            //se for igual a 100 para
            if(i > 2){
                this.push(null)
            }else{
                //se não continua incrementando e mostrando na tela
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 100);
    }
}

fetch('http://localhost:3334',{
    method:'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
}).then(response =>{
    return response.text()
}).then(data =>{
    console.log(data)
})