const {getAllEmpleados} = require('../controllers')
class HomeService {
  index() {
    return {
      message: "Hola mundo!"
    };
  }
}

module.exports = HomeService;
