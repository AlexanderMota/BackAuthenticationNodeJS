const getAllEmpleados = async (req, res) => {
    try {
      const posts = await models.Post.findAll({
        include: [
          {
            model: models.Empleado,
            as: 'empleados'
          }/*,
          {
            model: models.User,
            as: 'author'
          }*/
        ]
      });
      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  module.exports = {
    //createPost,
    HomeController: require("./home.controller"),
    getAllEmpleados
  }