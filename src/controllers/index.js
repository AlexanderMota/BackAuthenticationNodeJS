// const { EmpleadoSeq } = require("../models");

// const getAllEmpleadosSeq = async (req, res) => {
//     try {
//       const empleados = await EmpleadoSeq.findAll({
//         include: [
//           {
//             model: EmpleadoSeq,
//             as: 'empleado'
//           }/*,
//           {
//             model: models.User,
//             as: 'author'
//           }*/
//         ]
//       });
//       return res.status(200).json({ empleados });
//     } catch (error) {
//       return res.status(500).send(error.message);
//     }
//   }

// const shotAtts = () =>{
//   const val = EmpleadoSeq.getAttributes
// }

module.exports = {
  HomeController : require("./home.controller"),
  EmpleadoController : require("./empleado.controller")
}