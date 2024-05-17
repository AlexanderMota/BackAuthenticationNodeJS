const {fileUpload} = require('../helpers/fileUpload.helper')
module.exports = class AuthController {
  constructor() {
  }

  async postProfilePic(req, res){
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(405).json({status:405,msg:"No files were uploaded."});
    }
    fileUpload(req.files,['png','jpg','jpeg','gif'])
      .then((msg) => res.send(msg))
      .catch((err) => res.send(err));
  } 
}
