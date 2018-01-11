const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'D:/Experimental Projects/Express_Js_Demo/demo.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  age: Sequelize.STRING
});

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
    age: '20'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });