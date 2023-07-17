import fs from 'node:fs/promises';
export class Database{
    #database = {}
    #databasePath = new URL('db.json',import.meta.url);
    constructor(){
        fs.readFile(this.#databasePath,'utf8').then(data=>{
            this.#database = JSON.parse(data);
        }).catch(()=>{
            this.#persist()
        })
    }
    #persist(){
        fs.writeFile(this.#databasePath,JSON.stringify(this.#database))
    }
    select(table){
        const data = this.#database[table] ?? [];

        return data;
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }

    
}