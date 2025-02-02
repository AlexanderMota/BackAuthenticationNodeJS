class AuthController {
    constructor({ AuthService }) {
      this.authService = AuthService;
    }

    register = async (req, res) => {
      try {
        const { user } = req.body;
        if (!user.email || !user.password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  
        const data = await this.authService.register(user.email, user.password);
        res.json({message:"Usuario creado",code:200,id:data});
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    }
  
    login = async (req, res) => {
      try {
        const { user } = req.body;
        if (!user.email || !user.password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  
        const data = await this.authService.login(user.email, user.password);
        res.json(data);
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    };
  }
  
  export default AuthController;
  