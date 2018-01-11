const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('whohadChai',{
        name: Sequelize.STRING,
        weekDay: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        quantity : Sequelize.INTEGER
    })
    
}