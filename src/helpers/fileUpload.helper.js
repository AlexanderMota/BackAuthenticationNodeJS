const path = require('path');
const {CompruebaExtension} = require('../utils/index')

module.exports.fileUpload = function(files, alloudExtentions = []) {
    return new Promise((resolve, reject) => {
        const sampleFile = files.archivo;
        let uploadPath = "";

        if(sampleFile.length !== undefined){

            let respon = [];
            for(let i = 0; i < sampleFile.length; i++){
                if(CompruebaExtension(alloudExtentions,(sampleFile[i].name.split('.')[sampleFile[i].name.split('.').length -1]))){
                    uploadPath = path.join(__dirname,'../../uploads/', sampleFile[i].name);
        
                    //sacar extension para filtrar tipos de archivo. comprimido
                    //console.log(sampleFile[i].name.split('.')[sampleFile[i].name.split('.').length -1]);
    
                    sampleFile[i].mv(uploadPath, (err) =>{
                        if(err){
                            respon.push(sampleFile[i].name +" >>> "+err);
                        }
                    });
                    respon.push('File uploaded: '+ sampleFile[i].name);
                }else{
                    
                    respon.push("ERROR >>> Extensión no válida: " + sampleFile[i].name);
                }
            }
            resolve({respuesta_multiple:respon});
        }else{
            
            //console.log(sampleFile.name.split('.')[sampleFile.name.split('.').length -1]);
            if(CompruebaExtension(alloudExtentions,(sampleFile.name.split('.')[sampleFile.name.split('.').length -1]))){
                uploadPath = path.join(__dirname,'../../uploads/', sampleFile.name);
            
                sampleFile.mv(uploadPath, (err) =>{
                    if(err){
                        reject({status:500,error:err});
                    }
                });
                resolve({status:201,msg:'File uploaded: '+ sampleFile.name});
            }else{
                reject({status:403,msg:'extension no soportada: '+sampleFile.name});
            }
        }
        reject({status:507,msg:"algo salió mal >> linea 47"});
    });
}

