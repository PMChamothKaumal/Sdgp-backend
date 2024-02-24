const mysql = require('mysql');

let connection;

function getCollection() {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'sdgpdbserver.mysql.database.azure.com',
            user: 'databaseSDGP',
            password: 'SDGP@$2022',
            database: 'sdgp_database',
            ssl: {
                mode: 'REQUIRED'
            }
        });

        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting to MySQL database:', err);
                return;
            }
            console.log('Connected to MySQL database successfully!');
        });
    }
    return connection;
}

module.exports = getCollection();
