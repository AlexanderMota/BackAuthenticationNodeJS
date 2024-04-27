const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _ubicacion = null;
let _tarea = null;
let _tareaHasSubtareas = null;
let _empleado = null;
let _vehiculo = null;


module.exports = class UbicacionRepository extends BaseRepository{
  constructor({Ubicacion, Tarea, TareaHasSubtareas, Empleado, Vehiculo}){
      super(Ubicacion);
      _ubicacion = Ubicacion;
      _tarea = Tarea;
      _tareaHasSubtareas = TareaHasSubtareas;
      _empleado = Empleado;
      _vehiculo = Vehiculo;
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

      //console.log("ubiRep.mongoGetUbicacionRecogidaByIdTarea: " + ubi);
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
  async mongoGetParada(idSuper, pageSize, pageNum) {
    //console.log("ubiRep.mongoGetParada: "+idSuper);

    const empleados = await _empleado.find({ centroTrabajo:idSuper },{_id:1});

    const idsEmpleados = empleados.map(empleado => empleado._id.toString());

    //const vehiculos = await _vehiculo.find({ propietario:empleados._id });
    const vehiculosConPlazas = await _vehiculo.find({
      propietario: { $in: idsEmpleados }, // Filtrar por propietarios que sean empleados del centro de trabajo
      //plazasDisponibles: { $gt: 0 }, // Filtrar vehículos con al menos una plaza disponible
      puntosDestinoRecogida: { $exists: true, $ne: [] }, // Filtra los arrays que no estén vacíos
      $expr: {
        $lt: [{ $size: "$ocupantes" }, "$plazas"]
      }
    },{puntosDestinoRecogida:1,_id:0});
    //console.log(vehiculosConPlazas);
    
    const idsUbiParadas = vehiculosConPlazas.reduce((ids, vehiculo) => {
      vehiculo.puntosDestinoRecogida.forEach(id => {
        ids.add(id); // Usamos un Set para asegurarnos de obtener solo IDs únicos
      });
      return ids;
    }, new Set());
    
    //console.log(vehiculosConPlazas);
    //console.log([...idsUbiParadas]); // Convertimos el Set a un array para mostrarlo

    const ubiParadas = await _ubicacion.find({
      _id: { $in: [...idsUbiParadas] }
    })

    //console.log(ubiParadas);


    return ubiParadas;
  /*const paradasDisponibles = await _empleado.aggregate([
    // Filtrar empleados por el centro de trabajo específico
    { $match: { centroTrabajo: idSuper } },
  
    // Unir con la colección de vehículos
    {
      $lookup: {
        from: "vehiculos",
        localField: "_id",
        foreignField: "propietario",
        as: "vehiculos"
      }
    },
  
    // Filtrar vehículos con al menos una plaza disponible
    { $match: { "vehiculos.plazasDisponibles": { $gt: 0 } } },
  
    // Desplegar los arrays de vehículos en documentos separados
    { $unwind: "$vehiculos" },
  
    // Convertir los puntosDestinoRecogida de cadenas a ObjectIds
    {
      $addFields: {
        puntosDestinoRecogida: {
          $map: {
            input: "$vehiculos.puntosDestinoRecogida",
            as: "id",
            in: { $toObjectId: "$$id" }
          }
        }
      }
    },
  
    // Unir con la colección de ubicaciones para obtener los detalles de las paradas
    {
      $lookup: {
        from: "ubicacion",
        localField: "puntosDestinoRecogida",
        foreignField: "_id",
        as: "paradas"
      }
    },
  
    // Desplegar los arrays de paradas en documentos separados
    { $unwind: "$paradas" },
  
    // Proyectar solo los detalles de las paradas
    { $replaceRoot: { newRoot: "$paradas" } }
  ]);
  
  console.log(paradasDisponibles);*/


  /*const dat = await _empleado.aggregate([
    // Filtrar empleados por centro de trabajo
    { $match: { centroTrabajo: idSuper } },
    // Realizar un join con la colección de vehículos para obtener los empleados con vehículo
    {
      $lookup: {
        from: "vehiculos",
        localField: "_id",
        foreignField: "propietario",
        as: "vehiculos"
      }
    },
    // Filtrar empleados que tienen vehículo
    { $match: { vehiculos: { $exists: true, $ne: [] } } },
    // Deshacer el array de vehículos
    { $unwind: "$vehiculos" },
    // Filtrar vehículos con plazas disponibles
    { $match: { "vehiculos.plazasDisponibles": { $gt: 0 } } },
    // Realizar un join con la colección de ubicaciones para obtener las ubicaciones de recogida
    {
      $lookup: {
        from: "ubicaciones",
        localField: "vehiculos.puntosDestinoRecogida",
        foreignField: "_id",
        as: "ubicacionesRecogida"
      }
    },
    // Agrupar las ubicaciones de recogida en un solo array por empleado
    {
      $group: {
        _id: "$_id",
        nombre: { $first: "$nombre" },
        apellidos: { $first: "$apellidos" },
        ubicacionesRecogida: { $push: "$ubicacionesRecogida" }
      }
    }
  ]);
  console.log(dat);*/


  /*_empleado.aggregate([
    // Filtrar empleados por centro de trabajo
    { $match: { centroTrabajo: idSuper } },
    // Realizar un join con la colección de vehículos para obtener los empleados con vehículo
    {
      $lookup: {
        from: "vehiculos",
        localField: "propietario",
        foreignField: "_id",
        as: "vehiculos"
      }
    },
    // Filtrar empleados que tienen vehículo
    { $match: { vehiculos: { $exists: true, $ne: [] } } },
    // Deshacer el array de vehículos
    { $unwind: "$vehiculos" },
    // Filtrar vehículos con plazas disponibles
    { $match: { "vehiculos.plazasDisponibles": { $gt: 0 } } },
    // Realizar un join con la colección de ubicaciones para obtener las ubicaciones de recogida
    {
      $lookup: {
        from: "ubicaciones",
        localField: "vehiculos.puntosDestinoRecogida",
        foreignField: "_id",
        as: "ubicacionesRecogida"
      }
    },
    // Agrupar las ubicaciones de recogida en un solo array por empleado
    {
      $group: {
        _id: "$_id",
        nombre: { $first: "$nombre" },
        apellidos: { $first: "$apellidos" },
        ubicacionesRecogida: { $push: "$ubicacionesRecogida" }
      }
    }
  ]);*/
  } 
  async mongoDeleteParadaByMatricula(idUbi, matricula){
    const val = await _ubicacion.updateOne(
      { _id: ObjectId(idUbi) }, // Filtro para encontrar el documento
      { $pull: { fechasRecogida: { vehiculo: matricula } } } // Eliminar el elemento del array que tenga el vehículo específico
    );
    if(val){
      if(!val.acknowledged){
        return {status:403, message:"Operacion no reconocida por MongoDB."};
      }else if(val.matchedCount > 0){
        if(val.modifiedCount > 0){
          return {status:202, message:"Se ha modificado el documento."};
        }else{
          return {status:202, message:"Se encontraron coincidencias pero no se ha modificado el documento."};
        }
      }else if(!val.matchedCount < 1){
        return {status:203, message:"Operacion realizada correctamente. No se encontraron coincidencias con el id de la parada."};
      }
    }else{
      return {status:408, message:"Error desconocido."};
    }
  }
}
