
class UserRepository {
  constructor({ DBPool }) {
    this.DBPool = DBPool;
  }

  async createUser (email, password, name = "", lastname = "",
    username = "", phone = 0, avatar_url = "", role_id = 5) {
  
  
    const result = await this.DBPool.query(
      'INSERT INTO users (name, lastname, username ,email,  phone, password, avatar_url, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, lastname, username ,email,  phone, password, avatar_url, role_id]
    );

    return result[0].insertId;
  };

  async findByEmail(email) {
    const [rows] = await this.DBPool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return null;
    const [rolerows] = await this.DBPool.query('SELECT * FROM roles WHERE role_id = ?', [rows[0].role_id]);
    rows[0].role = rolerows[0].role;
    return rows[0];
  }
}

export default UserRepository;
