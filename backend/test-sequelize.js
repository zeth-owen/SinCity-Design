// test-sequelize.js

const sequelize = require('./config/database'); 

async function testConnection() {
  try {
    await sequelize.authenticate(); 
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {

    await sequelize.close();
  }
}

testConnection();
