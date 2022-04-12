const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'dbgranja'
});

con.connect((err)=>{
    if(err) throw err;
    console.log('Conexión correcta.');
});