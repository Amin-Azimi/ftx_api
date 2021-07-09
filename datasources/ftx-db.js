var { Sequelize } = require('sequelize');
sequelize = new Sequelize('sport_statics', 'wordpress_user', 'azi1234@', {
    host: 'localhost',
    dialect:  'mysql',
    logging: console.log,
    define: {
      timestamps: false
  }

  });
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
    module.exports = sequelize;
    //global.sequelize = sequelize;  
    