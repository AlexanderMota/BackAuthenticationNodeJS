const {fileUpload} = require('../helpers/fileUpload.helper');
const path = require('path');
const fs = require('fs');
module.exports = class AuthController {
  constructor() {
  }

  async postProfilePic(req, res) {
    const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la URL
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(405).json({ status: 405, msg: "No files were uploaded." });
    }

    fileUpload(req.files, ['png', 'jpg', 'jpeg', 'gif'], userId)
      .then((msg) => res.send(msg))
      .catch((err) => res.send(err));
  }

  async getProfilePic(req, res) {
    try {
      const userId = req.params.userId;
      const userImagePath = path.join(__dirname, '../../uploads/', `${userId}.jpg`); // Asegúrate de que la extensión sea correcta

      console.log(userImagePath);
      if (fs.existsSync(userImagePath)) {
        return res.sendFile(userImagePath);
      } else {
        console.log("sin foto");
        return res.send({status:407,message:"Usuario no autorizado."});
      }
    } catch (error) {
      console.error('Error while fetching the profile picture:', error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
}
