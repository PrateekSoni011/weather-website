const express = require('express'); 
const path = require('path');
const hbs = require('hbs');
const geocode  = require('./utils/geocode');
const forecast  = require('./utils/forecast');


const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public' );
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handelbars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up Static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    //First argument-> this name passed as an argument needs to match up with the viewfilename 
    //Second arument-> here we send a object of arguments which we want to pass to the view page
    res.render('index', {
        title: 'Wheather',
        name: 'Prateek Soni'
    }); 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Prateek Soni'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Help Text is here',
        title: 'Help',
        name: 'Prateek Soni'
    })
})

app.get('/wheather',(req, res)=>{ 
    if(!req.query.address){
        return res.send({
            error:'Error  : Please provide address'
        })
    }  
    geocode(req.query.address, (error , {longitude,latitude,location} = {} )=>{
        if(error){
            return res.send({
                error               
            });        
        }
        forecast(longitude,latitude,(error, forecastData)=>{            
            if(error){
                return res.send({
                    error               
                });        
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    })  
})

app.get('/products',(req, res)=>{
    
    if (!req.query.search) {
        // add return so that we dont need to run the below code if error occur
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search);

    res.send({
        products: []
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg: 'Requested Help page not found',
        title: 'Error Page',
        name: 'Prateek Soni'
    });
})

// *(wildcard character) 
// it means matched anything that has not been match so far
app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg: 'Requested page not found',
        title: 'Error Page',
        name: 'Prateek Soni'
    });
})

app.listen('3000',()=>{
    console.log("Server is up on port 3000")
})