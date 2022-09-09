# !/bin/bash

# Iniciamos la base de datos en otro terminal con:
mongod --dbpath ./db

# Iniciamos la shell de mongo
mongosh

# Mostramos las bases de datos
show dbs

# Creamos una nueva base de datos
use prueba

# Creamos dos documentos JSON
d1 = {nif: “11111111A”, nombre: “Ana”, edad: 20}
d2 = {nif: “22222222B”, nombre: “Juan”, edad: 21}

# Insertamos uno de los documentos en la coleccion alumnos
db.alumnos.insert(d1) # insert esta deprecado en la version 6

# Vemos el numero de alumnos en la bd
show collections

# Contamos el numero de archivos en una coleccion
db.alumnos.count() # count esta deprecado en la version 6

# Buscamos un alumno en la bd
db.alumnos.findOne() # esto genera una id en el documento

# Buscamos todos los alumnos en la bd 
db.alumnos.find()

# Borramos la coleccion
db.alumnos.drop()

#Borramos la base de datos
db.dropDatabase()
