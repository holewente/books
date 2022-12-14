
import express from 'express'
import mysql from 'mysql'
import {config} from './dbconfig.js';

const app = express()
app.use(express.json())
const db = mysql.createConnection(config)

app.get('/', (request, response) => {
    const {author} = request.params
    
    db.query('SELECT author from books group by author order by author', (err, result) => {
        if (err)
            console.log(err)
        else
            response.send(result)
    })
})
app.get('/szerzo/:author', (request, response) => {
    const {author} = request.params
    
    db.query('SELECT author from books group by author=? order by title',[author], (err, result) => {
        if (err)
            console.log(err)
        else
            response.send(result)
    })
})
app.get('/kateg/:category/:year', (request, response)=>{
    const {category,year} = request.params
    
    db.query('SELECT author,title,year from books where category=? and year>=?',[category,year], (err, result) => {
        if (err)
            console.log(err)
        else
            response.send(result)
    })
})

app.get('/azon/:id', (request, response)=>{
    const {id} = request.params
    
    db.query('SELECT author,title,year,category from books where id=? order by title',[id], (err, result) => {
        if (err)
            console.log(err)
        else
            response.send(result)
    })
})


app.listen(5000, () => console.log('server listening on port 5000...'))