const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define('chaiLog', {
	name : Sequelize.STRING,
    quantity : Sequelize.INTEGER
})
}