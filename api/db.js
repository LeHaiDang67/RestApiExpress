require('dotenv').config({path: __dirname + './../.env'});
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGHUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,

})


module.exports = pool;
