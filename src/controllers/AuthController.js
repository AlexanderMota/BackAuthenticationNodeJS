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
        console.log("req.cookies");
        console.log(req.cookies);
        if (!user.email || !user.password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  
        const { token, userres, code, message } = await this.authService.login(user.email, user.password);
        //res.set('Authorization', token).json(data);
        res.cookie('access_token', token, { httpOnly: true , secure: process.env.NODE_ENV === 'production',  sameSite:'strict', maxAge:3600*3})
        .cookie('user', JSON.stringify(userres), { httpOnly: true , secure: process.env.NODE_ENV === 'production',  sameSite:'strict', maxAge:3600*3})
        .json({message,code});
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    };

    modifyPassword = async (req, res) => {
      /*try {
        const { user } = req.body;
        if (!user.email || !user.password || !user.newpassword) return res.status(400).json({ error: 'Email, contraseña y nueva contraseña son requeridos' });
  
        const data = await this.authService.modifyPassword(user.email, user.password, user.newpassword);
        res.json({message:"Contraseña modificada",code:200,id:data});
      } catch (error) {
        res.status(401).json({ error: error.message });
      }*/
    };
  }
  
  export default AuthController;
  