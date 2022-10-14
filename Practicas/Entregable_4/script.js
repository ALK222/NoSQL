//usar la base de datos books
use almacen

//Seleccionamos la colección con la que vamos a trabajar
col = db.libros
  
col.find().count()