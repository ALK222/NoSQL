print("Alejandro Barrachina Argudo")
//usar la base de datos books
use almacen

//Seleccionamos la colección con la que vamos a trabajar
col = db.libros

print("P1: Crear una variable de tipo array para almacenar todos los documentos de la colección 'libros'. Usa la operación 'toArray()'")
print("---------------------------------------------------");
var documentos = db.libros.find().toArray()


print("P2: ¿Cuántos elementos hay en el array creado en la pregunta anterior? Usa el atributo de los objetos de tipo array que te devuelve el tamaño del array.")
print("----------------------------------------------------")
documentos.length

print("P3: Crea una nueva base de datos llamada 'stock' y una colección llamada 'ejemplar'. Borra todos los documentos de la colección 'ejemplar' (en caso de que exista alguno) ")
print("----------------------------------------------------")
use stock
db.createCollection("ejemplar")
db.ejemplar.remove({})

print("P4: Inicializa una operación bulk de tipo ordenada sobre la colección 'ejemplar' creada en el apartado anterior")
print("----------------------------------------------------")

var bulk = db.ejemplar.initializeOrderedBulkOp()

print("P5:  Por cada documento en la colección libros, crea un nuevo documento en la colección `ejemplar'. Los documentos de la colección ejemplar tienen los siguientes campos:\n name : título del libro\n coste: precio del libro\n venta: precio del libro\n editado: grupo del libro\n fecha : fecha actual.\n Usa un bucle para recorrer el array creado en la pregunta 1 (por ejemplo forEach), de forma, que por cada documento en el array, se añada una operación de tipo `insert` al objeto bulk. Por último, ejecuta bulk.")
print("----------------------------------------------------")
documentos.forEach(element => {
    bulk.insert({
        name: element.título,
        coste: element.precio,
        venta: element.precio,
        editado: element.grupo,
        fecha: new Date().getTime()

    });
});

bulk.execute()

print("P6: Lista los documentos creados en la colección 'ejemplar'.")
print("----------------------------------------------------")
db.ejemplar.find()


print("P7: Inicializa una operación bulk de tipo ordenada sobre la colección 'ejemplar' creada en el apartado anterior.")
print("----------------------------------------------------")
var bulk2 = db.ejemplar.initializeOrderedBulkOp()

print("P8: Actualiza el precio de venta de los libros. Los libros de la editorial Catapulta se rebajan un 10%. Los libros de la editorial 'SM' pasan a valer un 12% más caros. Añade las operaciones de actualización adecuadas al objeto bulk y ejecuta bulk.")
print("----------------------------------------------------")

bulk2.find({ editado: { $eq: "Catapulta" } }).update({ $mul: { venta: 0.9 } })
bulk2.find({ editado: { $eq: "SM" } }).update({ $mul: { venta: 1.2 } })

bulk2.execute()

print("P9: Lista los documentos creados en la colección 'ejemplar'.")
print("----------------------------------------------------")
db.ejemplar.find()
