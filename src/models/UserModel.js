class User {
    constructor( user_id, name, lastname, username, email, phone, password, created_at, updated_at, avatar_url, role_id ) {
      this.user_id = user_id;
      this.name = name;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.avatar_url = avatar_url;    
      this.role_id = role_id;
    }
  }
  export default User;