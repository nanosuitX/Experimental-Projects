import { Promise } from './C:/Users/Dell/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bluebird';

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', '', '', {
  // sqlite! now!
  dialect: 'sqlite',

  // the storage engine for sqlite
  // - default ':memory:'
  storage: 'D:/Experimental Projects/Express_Js_Demo/database.sqlite'
})

// const chaiUser = sequelize.define('chaiUser', {
// 	name : Sequelize.STRING,
// 	password : Sequelize.STRING
// })

const chaiUser = sequelize.import('./chaiUserModel.js')

//const whoHadChai = sequelize.import('./chaiUserModel.js')
const whoHadChai = require('./whoHadChaiModel')(sequelize)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

var route = express.Router();

route.get('/', function(req, res) {
	res.json({ message: 'Welcome to chai time' }); 

});

route.get('/insert/:name-:password', function(req,res){

	console.log({name : req.params.name,password : req.params.password})
	sequelize.sync().then(()=>
    chaiUser.create({
			name : req.params.name,
			password : req.params.password
		})
	).then(op => {
    console.log(op.toJSON());
    res.send('user inserted successfully')
  });
})

route.get('/user/:name-:password',function(req,res){
    chaiUser.find({
        where: {
            name: req.params.name,
            password: req.params.password
        }
    }).then((user)=>{
        res.send(`Hello ${user.get('name')}`);
    })
})

route.get('/hadchai/:name-:password-:quantity', function(req,res){
    chaiUser.find({
        where: {
            name: req.params.name,
            password: req.params.password
        }
    }).then((user)={
        
    })
    // }).then((user)=>{
    //     whoHadChai.create({
    //         name: user.get('name'),
    //         weekDay: new Date().getDay(),
    //         month: new Date().getMonth(),
    //         quantity: parseInt(req.params.quantity)
    //     }).then(()=>{
    //         res.send(`Thank you having chai ${user.get('name')}`)
    //     })
    // })
})

var getTodaysCountForUser=function(name,weekDay){
    return new Promise(function(resolve,reject){
        whoHadChai.findAll({
            
        })
    })
    whoHadChai.findAll({
        attributes:[[sequelize.fn('COUNT',sequelize.col('name'))]],
        where: {
            name: name,
            weekDay:weekDay
        }
    }).then((count)=>{
        return count;
    })
}

route.get('/showCountByWeek', function(req,res){
    whoHadChai.find({
        where: {
            month: new Date().getMonth()
        }
    })
    .then((user)=>{
        res.send(user);
    })
})


route.get('/showAll',function(req,res){
    chaiUser.findAll()
    .then((user)=>{
        res.send(user);
    })
})

route.get('/showAllWhoHadChai',function(req,res){
    whoHadChai.findAll()
    .then((user)=>{
        res.send(user);
    })
})






app.use('/api', route);
// app.use('/insert', router);
// app.use('/show',router);
/*app.use('/two',router);
app.use('three',router);*/

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port)