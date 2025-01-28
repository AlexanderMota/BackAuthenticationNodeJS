const path = require('path');
const fs = require('fs');
const {CompruebaExtension} = require('../utils/index')


module.exports.fileUpload = function(files, allowedExtensions = [], userId) {
    return new Promise((resolve, reject) => {
      const sampleFile = files.archivo;
      let uploadPath = "";
  
      // Función para borrar el archivo existente
      const deleteExistingFile = (filePath) => {
        return new Promise((resolve, reject) => {
          fs.unlink(filePath, (err) => {
            if (err && err.code !== 'ENOENT') { // ENOENT means file does not exist
              return reject(err);
            }
            resolve();
          });
        });
      };
  
      const handleFileUpload = async (file) => {
        const extension = file.name.split('.').pop();
        if (CompruebaExtension(allowedExtensions, extension)) {
          const uploadPath = path.join(__dirname, `../../uploads/${userId}.${extension}`);
          
          try {
            await deleteExistingFile(uploadPath); // Borrar archivo existente
          } catch (err) {
            console.error(`Error deleting existing file: ${err.message}`);
            return { error: `Error deleting existing file: ${err.message}` };
          }
  
          return new Promise((resolve, reject) => {
            file.mv(uploadPath, (err) => {
              if (err) {
                return reject({ status: 500, error: err });
              }
              resolve({ status: 201, msg: 'File uploaded: ' + file.name });
            });
          });
        } else {
          return { status: 403, msg: 'Extension no soportada: ' + file.name };
        }
      };
  
      if (Array.isArray(sampleFile)) {
        let promises = sampleFile.map(file => handleFileUpload(file));
        Promise.all(promises)
          .then(results => resolve({ respuesta_multiple: results }))
          .catch(err => reject(err));
      } else {
        handleFileUpload(sampleFile)
          .then(result => resolve(result))
          .catch(err => reject(err));
      }
    });
  }