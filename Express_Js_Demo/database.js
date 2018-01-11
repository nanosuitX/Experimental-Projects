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

const temp = sequelize.define('user', {
	name : Sequelize.STRING,
	age : Sequelize.STRING
})
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'allahu aKBAR' }); 

});

router.get('/insert/:name-:age', function(req,res){

	console.log({name : req.params.name,age : req.params.age})
	sequelize.sync().then(()=>
		temp.create({
			name : req.params.name,
			age : req.params.age
		})
	).then(op => {
    console.log(op.toJSON());
  });
	/*sequelize.sync().then(()=>{
		temp.create({name : req.params.name,
			age : req.param.age}).then((user)=>{
		temp.findOrCreate({where: {name: req.params.name}, defaults: {age: 1}})
	}).spread((user,created)=>{
		console.log(user.get({
			plain: true
		}))
		console.log(created)
		console.log(user)
		res.sendStatus(200)

	}).catch(err=>{res.sendStatus(500)})
		})*/
	//res.send({name:req.params.name,age:req.params.age})
})
router.get('/show',function(req,res){
	temp.findAll().then(values=>{
		res.send(values);
		console.log(values);
	})
})

app.use('/api', router);
app.use('/insert', router);
app.use('/show',router);
/*app.use('/two',router);
app.use('three',router);*/

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port)