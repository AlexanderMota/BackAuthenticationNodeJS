module.exports = async function() {
  const mysql2 = require('mysql2/promise');
  const conn = await mysql2.createConnection({
      host:'localhost',
      user:'root',
      password:'1234',
      database:'dbgranja'});
  const [rows, fields] = await conn.execute('select * from empleados');
  await conn.end();
  return rows;
}
