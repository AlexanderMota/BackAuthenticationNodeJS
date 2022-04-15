module.exports = {
  Empleado : require('./empleado.mongo'),
  Tarea : require('./tarea.mongo'),
  TareaHasEmpleados : require('./tareas_has_empleados.mongo'),
  TareaHasSubtareas : require('./tareas_has_subtareas.mongo')
};
