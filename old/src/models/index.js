module.exports = {
  Empleado : require('./empleado.mongo'),
  Tarea : require('./tarea.mongo'),
  Supertarea : require('./supertarea.mongo'),
  TareaHasEmpleados : require('./tareas_has_empleados.mongo'),
  TareaHasSubtareas : require('./tareas_has_subtareas.mongo'),
  Solicitud : require('./solicitud.mongo'),
  Comentario : require('./comentario.mongo'),
  Ubicacion : require('./ubicacion.mongo'),
  Vehiculo : require('./vehiculo.mongo'),
  Notificacion : require('./notificacion.mongo')
};
