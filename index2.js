import {
    config
} from 'nodealapok/dbconfig.js'
import express from 'express'
import mysql from 'mysql'

const app = express()
app.use(express.json())
const db = mysql.createConnection(config)

app.get('/', (request, response) => {
    db.query('SELECT author from books group by author order by author', (err, result) => {
        if (err)
            console.log(err)
        else
            response.send(result)
    })
})

app.listan(5000, () => console.log('server listening on port 5000...'))







/*j*/