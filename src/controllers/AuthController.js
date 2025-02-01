class AuthController {
    constructor({ AuthService }) {
      this.authService = AuthService;
    }
  
    login = async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  
        const data = await this.authService.login(email, password);
        res.json(data);
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    };
  }
  
  export default AuthController;
  