
module.exports = {
  roles : [
    { nombre:"ADMIN", valor:0 }, //tipo especial con todos los permisos
    { nombre:"Director", valor:1 }, //cargos maximos de cada departamento
    { nombre:"RRHH", valor: 2 }, //encargados de la selección, contratación, formación y desarrollo del personal de la empresa.
    { nombre:"Gerente", valor: 2 }, //responsables de planificar, organizar, dirigir y controlar los procesos de producción agrícola.
    { nombre:"Comercial", valor: 3 }, //responsables de la gestión de ventas y marketing de los productos de la empresa.
    { nombre:"Supervisor", valor: 3 }, //
    { nombre:"Gestor", valor: 3 }, //
    { nombre:"Capataz", valor: 3 }, //
    { nombre:"Coordinador", valor: 3 }, //responsable de organizar a los temporeros y operarios
    { nombre:"Temporero", valor: 4 }, //trabajadores del campo y tareas de baja cualificación
    { nombre:"Maquinista", valor: 4 }, //trabajadores del campo y tareas de baja cualificación
    { nombre:"Mantenimiento", valor: 4 }, //se encargan del mantenimiento de la mayoria de aspectos físicos de la empresa
    { nombre:"Operario de almacén", valor: 4 }, //trabajador de almacén
    { nombre:"Limpieza", valor: 4 } //encargados de la limpieza e higiene de la empresa
  ],
  departamentos : [
    { nombre:"Administracion" },
    { nombre:"Recogidas y transporte" },
    { nombre:"Recursos humanos" },
    { nombre:"Mantenimiento" },
    { nombre:"Producción y cultivo" },
    { nombre:"Almacén y logística" },
    { nombre:"Investigación y desarrollo" },
    { nombre:"Sostenibilidad y responsabilidad social" } 
  ],
  relacionRolDep : [
    { dep:"Administracion", roles:["RRHH, Gerente","Comercial","Gestor"] },
    { dep:"Recogidas y transporte", roles:["Supervisor, Maquinista"] },
    { dep:"Recursos humanos", roles:["RRHH","Gerente","Supervisor"] },
    { dep:"Mantenimiento", roles:["Supervisor","Mantenimiento","Limpieza"] },
    { dep:"Producción y cultivo", roles:["RRHH","Gerente","Supervisor","Coordinador","Temporero"] },
    { dep:"Ventas y publicidad", roles:["Gerente","Comercial"] },
    { dep:"Almacén y logística", roles:["Gerente","Supervisor","Maquinista","Operario de almacén"] },
    { dep:"Investigación y desarrollo", roles:[] },
    { dep:"Sostenibilidad y responsabilidad social", roles:["Gerente", "Supervisor"] }
  ]
};
