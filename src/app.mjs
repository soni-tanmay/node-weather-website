import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import {geocode} from './utils/geocode.mjs'
import {forecast} from './utils/forecast.mjs'

const app = express()

// Define paths for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialssPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialssPath)

// setup static directory to server
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        userName: 'Tanmay'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        userName: 'Tanmay'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Me',
        helpText: 'Helpful Text',
        userName: 'Tanmay'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "you must provide an address",
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term",
        })
    }
    res.send({
        products:[],
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'help article not found',
        userName: 'Tanmay'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'page not found',
        userName: 'Tanmay'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})