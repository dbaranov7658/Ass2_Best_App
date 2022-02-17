const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;

pool = new Pool({
    connectionString: 'postgres://qyspilekzrlweq:207f8a9ce10610f959ab119c40b7e636f06b2c493fe11d560355d0dd6fc6f277@ec2-54-87-99-12.compute-1.amazonaws.com:5432/d11pph2q6du9v1',
    ssl: {
        rejectUnauthorized: false
    }
})
var uuid = require('uuid');

var app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(express.static(path.join(__dirname, 'public')))
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.get('/', (req, res) => res.render('pages/index'))
    app.get('/firstPage', (req,res)=>{
        var getRectangles = 'SELECT * FROM rec';
        console.log("MY LOG ----------------------------" + getRectangles)
        console.log(pool)
        pool.query(getRectangles, (error, result) => {
            if (error){
                console.log("MY LOG -------------------------" + error)
                res.end(error)
            }
            else{
                var data = {results: result.rows}
                console.log("MY LOG ----------------------------" + data)
                res.render('pages/firstPage.ejs', data)
            }

        })
    })
    app.get('/rectanglePage', (req,res)=>{
    var getRectangles = 'SELECT * FROM rec';
    pool.query(getRectangles, (error, result) => {
        if (error){
            res.end(error)
        }
        else{
            var data = {results: result.rows}
            res.render('pages/rectanglePage.ejs', data)
        }

    })
    })
    app.get('/rectanglePage:id', (req,res)=>{
    var getRectangles = 'SELECT * FROM rec WHERE ' + '"id"' + ' = ' + "'" + req.params.id + "';"
    pool.query(getRectangles, (error, result) => {
        if (error){
            res.end(error)
        }
        else{
            var data = {results: result.rows}
            console.log(data.results)
            console.log("MY LOG ----------------------------" +   data.results[0].name.toString())
            data.results[0].name = data.results[0].name.toString().replaceAll(' ', '')
            res.render('pages/rectangleEditPage.ejs', data)
        }

    })
    })
    app.post('/addNewRectangle', (req,res)=>{
        let id= uuid.v1().toString()
        var getRectangles = 'INSERT INTO rec VALUES (' + "'" + id + "', "  + "'" + req.body.name + "', "   + parseInt(req.body.width) + ', ' + parseInt(req.body.height) + ', ' + "'" + req.body.color + "', " + "'" + req.body.bordercolor + "');"
        pool.query(getRectangles, (error, result) => {
        if (error){
            res.end(error)
        }
        else{
            res.redirect(req.protocol + '://' + req.get('host') + '/firstPage')
        }
        })
    })
    app.post('/deleteRectangle:id', (req,res)=>{
            var getRectangles = 'DELETE FROM rec WHERE ' + '"id"' + ' = ' + "'" + req.params.id + "' " + "RETURNING *;"

            pool.query(getRectangles, (error, result) => {
                if (error){
                    res.end(error)
                }
                else{
                    res.redirect(req.protocol + '://' + req.get('host') + '/firstPage')
                }

            })
})
app.post('/updateRectangle:id', (req,res)=>{
    var getRectangles = 'UPDATE rec SET name = ' + "'" + req.body.name + "', color = " + "'" + req.body.color + "', width = "  + parseInt(req.body.width) + ", height = " + + parseInt(req.body.height) + ", bordercolor = "  + "'" + req.body.bordercolor + "' WHERE " + '"id"' + ' = ' + "'" + req.params.id + "';"
    console.log(getRectangles)

    pool.query(getRectangles, (error, result) => {
        if (error){
            res.end(error)
        }
        else{
            res.redirect(req.protocol + '://' + req.get('host') + '/firstPage')
        }

    })
})
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
