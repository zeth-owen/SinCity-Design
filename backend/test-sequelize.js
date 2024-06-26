// test-sequelize.js

const sequelize = require('./sequelize'); // Import Sequelize instance

async function testConnection() {
  try {
    await sequelize.authenticate(); // Test the connection to the database
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Always close the connection when done
    await sequelize.close();
  }
}

testConnection();
