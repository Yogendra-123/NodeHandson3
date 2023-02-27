const express = require('express')
const cors = require('cors')
const {calculation,subs} = require("./controller/calculations")


const app = express()
// const Whitelist = ["*"]
app.use(cors(
    // {
    //     origin: Whitelist,
    //     methods : ['GET', 'POST']
    // }
))

const middleware = (req, res, next) =>{
    let result = 5 ;
    if(result === calculation(2,3)){
        console.log('middleware calling!!');
        next()
    }
    else{
        res.status(400).send('You are Not Allowed')
    }
}

const middleware1 = (req, res, next) =>{
    console.log('I am on home page');
    next()
}

app.get('/',cors(), middleware, (req, res)=>{
    res.send('You Are Logged In')
})

app.get('/home', middleware1, (req,res)=>{
    res.send('You are at the Home Page')
})

app.post('/home', middleware1, (req,res) =>{
    res.send(JSON.stringify([
        {
            name : 'Yogendra',
            age : 25,
            batch : 'EA17',
            Designation : 'Full Stack Web Developer'
        }
        
    ]))
})

app.listen(3001, ()=>{
    console.log("server is running !!");
})
