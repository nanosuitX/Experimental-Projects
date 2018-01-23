const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define('whohadChai',{
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        quantity : Sequelize.INTEGER,
        today: Sequelize.INTEGER

    })
    
}