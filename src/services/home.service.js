const {getAllEmpleados} = require('../controllers')
class HomeService {
  index() {
    // getAllEmpleados()
    //   .then((value) => {
    //     console.log(value);
    //     return {
    //       message: "Hola empleados: " + value.toString()
    //     };
    //   })
    //   .catch(console.log);
    
    return {
      message: "Hola mundo!"
    };
  }
}

module.exports = HomeService;
