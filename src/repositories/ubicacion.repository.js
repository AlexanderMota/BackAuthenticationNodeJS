const BaseRepository = require('./base.repository');

let _ubicacion = null;
let _tarea = null;
let _tareaHasSubtareas = null;


module.exports = class UbicacionRepository extends BaseRepository{
    constructor({Ubicacion, Tarea, TareaHasSubtareas}){
        super(Ubicacion);
        _ubicacion = Ubicacion;
        _tarea = Tarea;
        _tareaHasSubtareas = TareaHasSubtareas;
    }
    async mongoGetUbicacionByIdTarea(idTarea/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const ubi  = await _ubicacion.find({idTarea:idTarea});
        
        if(!ubi.length){
            //console.log("sin ubi: "+ubi);
            const res = await _tareaHasSubtareas.findOne({idSubtarea:idTarea},{_id:0,idTarea:1});
            /*console.log("resSub: "+res);
            const idSuper = res.idTarea;
            console.log("idSuper: "+idSuper);*/

            return await _ubicacion.find({idTarea:res.idTarea});
        }
        return ubi;
    }
    async mongoGetUbicacionRecogidaByIdTarea(idTarea/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        /*
        // Filtro para encontrar documentos con un atributo de tipo array que tenga al menos un elemento
        const filtro = { tuAtributoArray: { $exists: true, $size: { $gt: 0 } } };

        // Realizar la consulta
        collection.find(filtro).toArray((err, documentos) => {
            if (err) {
            console.error('Error al realizar la consulta:', err);
            client.close();
            return;
            }*/ 

        //const filtro = { horasRecogida: { $exists: true, $size: { $gt: 0 } } };

        
        const ubi  = await _ubicacion.find({ horasRecogida: { $ne: [] } });

        console.log("ubiRep.mongoGetUbicacionRecogidaByIdTarea: " + ubi);
        //console.log("mongoGetUbicacionRecogidaByIdTarea:\n" + ubi);
        
        /*if(!ubi.length){
            //console.log("sin ubi: "+ubi);
            const res = await _tareaHasSubtareas.findOne({idSubtarea:idTarea},{_id:0,idTarea:1});
            //console.log("resSub: "+res);
            //const idSuper = res.idTarea;
            //console.log("idSuper: "+idSuper);

            return await _ubicacion.find({idTarea:res.idTarea});
        }
        return ubi;*/
    }
}

