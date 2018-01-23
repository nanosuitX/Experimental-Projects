var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', '', '', {
  // sqlite! now!
  dialect: 'sqlite',
  storage: 'D:/Experimental Projects/Express_Js_Demo/chaiDatabase.sqlite'
})


const chaiUser = sequelize.import('./chaiUserModel.js')
const whoHadChai = sequelize.import('./whoHadChaiModel')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 
var route = express.Router();

route.get('/', function(req, res) {
	res.json({ message: 'Welcome to chai time' }); 

});

//---------------------------------------------------------

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
        res.json(`Hello ${user.get('name')}`);
        res.send(`Hello ${user.get('name')}`);
    })
})


// FOR ADMIN APP------------------------------------------------------------------------------------------------

route.get('/showAllWhoHadChai',function(req,res){
    whoHadChai.findAll()
    .then((user)=>{
        res.send(user);
    })
})




// FOR CLIENT APP-----------------------------------------------------------------------------------------------

route.get('/hadchai/:name-:password-:quantity',function(req,res){
    chaiUser.findOne({
        where: {
            name: req.params.name,
            password: req.params.password
        }
    }).then(userFound=>{
        whoHadChai.findAll({
            where:{
                name:userFound.get('name')
            }
        }).then(chai=>{
            if () {
                
            }
            // return chai.increment({
            //     'quantity': req.params.quantity,
            //     'today': req.params.quantity
            // })
            
        }).then(
            res.json({ message:'Thank you' })
        )
    })
})

app.use('/api', route);
app.listen(port);
console.log('Chai server live on port ' + port)