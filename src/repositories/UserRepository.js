
class UserRepository {
  constructor({ DBPool }) {
    this.DBPool = DBPool;
  }

  async findByEmail(email) {
    const [rows] = await this.DBPool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
  }
}

export default UserRepository;
