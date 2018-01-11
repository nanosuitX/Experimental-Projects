var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'allahu aKBAR' });   
});

router.get('/two/:id', function(req,res){
	res.send({ message: 'allahu akbar2'+req.params.id })
});

router.get('/three/:name-:age', function(req,res){
	res.send({name:req.params.name,age:req.params.age})
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
/*app.use('/two',router);
app.use('three',router);*/

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);