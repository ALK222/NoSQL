//usar la base de datos books
use restaurants

//Seleccionamos la colección con la que vamos a trabajar
col = db.data
  
// Contamos cuántos documentos hay en la colección
var t = col.find().count()
print("Número de documentos en la colección: ", t)
print("--------------------------------------")


