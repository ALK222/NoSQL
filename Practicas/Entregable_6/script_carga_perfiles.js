
// // comentario
// print("Paso 1: Borrar la  base de datos 'gestion' en caso de que ya exista.")
// //usar la base de datos gestion
// use gestion
// //borrar la base de datos en caso de que exista
// db.dropDatabase()
// // crear la base de datos e insertar dos documentos
// print("Paso 2: Crear base de datos 'gestion'")
// print("---------------------------")
// use gestion
print("Paso 3: Crear una colección de documentos a insertar en nueva colección")
var empleados = [{
  'nombre': 'Ana',
  'apellido1': 'Navarro',
  'apellido2': 'López',
  'edad': 20,
  'peso': 45,
  'altura': 130,
  'ubicacion': {
    'direccion': 'C/ Galatea, 12',
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'IBM',
  'salario': 45000,
  'habilidades': ['desarrollador de software', 'cocina'],
  'intereses': ['cine', 'música'],
  'incorporación': 1995
},
{
  'nombre': 'Julian',
  'apellido1': 'Marcón',
  'apellido2': 'Manoto',
  'edad': 35,
  'peso': 80,
  'altura': 180,
  'ubicacion': {
    'direccion': 'C/ Mercado, 24',
    'ciudad': 'Barcelona',
    'pais': 'España'
  },
  'empresa': 'Amazon',
  'salario': 60000,
  'habilidades': ['gestión de proyectos'],
  'intereses': ['música'],
  'incorporación': 1998
},
{
  'nombre': 'Luis',
  'apellido1': 'González',
  'apellido2': 'Martín',
  'edad': 25,
  'peso': 70,
  'altura': 190,
  'ubicacion': {
    'direccion': 'C/ Manzanares, 89',
    'telefono': [4587, 1259, 2580],
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'IBM',
  'salario': 46500,
  'habilidades': ['desarrollador de software', 'control de calidad'],
  'intereses': ['lectura', 'música', 'tenis'],
  'incorporación': 1998
},
{
  'nombre': 'María',
  'apellido1': 'Angely',
  'apellido2': 'Titany',
  'edad': 47,
  'peso': 60,
  'altura': 170,
  'ubicacion': {
    'direccion': 'C/ Moncayo, 2',
    'telefono': [9999, 7532],
    'ciudad': 'Barcelona',
    'pais': 'España'
  },
  'empresa': 'Amazon',
  'salario': 50000,
  'habilidades': ['gestión logística', 'control de calidad', 'transporte'],
  'intereses': ['lectura', 'música', 'arco'],
  'incorporación': 1997
},
{
  'nombre': 'Benito',
  'apellido1': 'Martín',
  'apellido2': 'Barco',
  'edad': 50,
  'peso': 90,
  'altura': 190,
  'ubicacion': {
    'direccion': 'C/ Velázquez, 2',
    'telefono': [1111],
    'ciudad': 'Barcelona',
    'pais': 'España'
  },
  'empresa': 'Google',
  'salario': 59000,
  'habilidades': ['inventario', 'control de calidad', 'gestión de proyectos'],
  'intereses': ['tenis', 'padel'],
  'incorporación': 1999
},
{
  'nombre': 'Juan',
  'apellido1': 'Moncuera',
  'apellido2': 'Dumas',
  'edad': 29,
  'peso': 55,
  'altura': 165,
  'ubicacion': {
    'direccion': 'Av. Baleares, 12',
    'telefono': [2584, 1212],
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'IBM',
  'salario': 47000,
  'habilidades': ['desarrollador de videojuegos', 'control de calidad'],
  'intereses': ['cine', 'padel', 'tenis', 'viajes'],
  'incorporación': 2000
},
{
  'nombre': 'Valeria',
  'apellido1': 'Azteca',
  'apellido2': 'Val',
  'edad': 51,
  'peso': 69,
  'altura': 172,
  'ubicacion': {
    'direccion': 'Av. Barco, 19',
    'telefono': [1596, 7532],
    'ciudad': 'Barcelona',
    'pais': 'España'
  },
  'empresa': 'Amazon',
  'salario': 51000,
  'habilidades': ['transporte', 'ventas', 'publicidad'],
  'intereses': ['cine', 'viajes', 'natación', 'cocina'],
  'incorporación': 2000
},
{
  'nombre': 'Tim',
  'apellido1': 'Tom ',
  'apellido2': 'Tum',
  'edad': 29,
  'peso': 55,
  'altura': 165,
  'ubicacion': {
    'direccion': 'C/ Severo Ochoa',
    'telefono': [1474],
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'IBM',
  'salario': 49000,
  'habilidades': ['control de costes', 'control de calidad'],
  'intereses': ['dietética', 'tenis', 'viajes'],
  'incorporación': 2000
},
{
  'nombre': 'Ada',
  'apellido1': 'Fernández ',
  'apellido2': 'Túnez',
  'edad': 32,
  'peso': 45,
  'altura': 162,
  'ubicacion': {
    'direccion': 'C/ Valverde, 2',
    'telefono': [4774],
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'Amazon',
  'salario': 51700,
  'habilidades': ['control de costes', 'control de calidad', 'transporte'],
  'intereses': ['tenis', 'viajes'],
  'incorporación': 1999
},
{
  'nombre': 'Teresa',
  'apellido1': 'Mong',
  'apellido2': 'Lupis',
  'edad': 58,
  'peso': 59,
  'altura': 162,
  'ubicacion': {
    'direccion': 'C/ Aragón, 2',
    'telefono': [2584],
    'ciudad': 'Madrid',
    'pais': 'España'
  },
  'empresa': 'Amazon',
  'salario': 55000,
  'habilidades': ['gestión de proyectos', 'transporte'],
  'intereses': ['lectura', 'tv', 'tenis'],
  'incorporación': 1995
}]


print("Paso 3: Crear la colección  'perfiles'")
db.perfiles.insertMany(empleados)

// consulta de los documentos insertados
db.perfiles.find().toArray()
var t = db.perfiles.find().count()
print("Número de registros insertados: ", t)
print("--------------------------------------")
