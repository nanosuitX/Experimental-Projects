//const sequelize = require('sequelize');
const Sequelize = require('sequelize');


module.exports = (sequelize)=>{
    return sequelize.define('chaiUser', {
	name : Sequelize.STRING,
	password : Sequelize.STRING
})
}