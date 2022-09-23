//usar la base de datos gestion
use companies

//Seleccionamos la colección con la que vamos a trabajar
col = db.summary
  
// Contamos cuántos documentos hay en la colección
var t = col.find().count()
print("Número de documentos en la coleeción: ", t)
print("--------------------------------------")


