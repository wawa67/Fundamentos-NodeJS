import { Database } from './database.js'
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
    {
        method:'POST',
        path: buildRoutePath('/users'),
        handler: (req,res) => {
            const {nome, email} = req.body
            const users = {
                'id':randomUUID(),
                'name': nome,
                'email': email
            }

            database.insert('users',users);

            return res.writeHead('201').end()
        }
    },
    {
        method:'GET',
        path: buildRoutePath('/users'),
        handler: (req,res)=>{
            const users = database.select('users');
            return res.end(JSON.stringify(users))
        }
    },
    {
        method:'DELETE',
        path: buildRoutePath('/users/:id'),
        handler:(req,res)=>{
            return res.end()
        }
    }
]