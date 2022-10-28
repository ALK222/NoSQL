// Alejandro Barrachina Argudo
// Iñaki Berrocal Diaz
use gestion

print("C1: Número de empleados por empresa")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", total: { $sum: 1 } } }])

print("C2: Empresa con mayor número de empleados")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { "_id": { "name": "$empresa" }, "total": { $sum: 1 } } }, { $sort: { "total": -1 } }, { $group: { "_id": "$_id.name", "num_emp": { $first: "$total" } } }])



print("C3:Listado de empleados que tienen más de un teléfono de contacto")
print("--------------------------------------------------------------")
db.perfiles.find({ "ubicacion.telefono.1": { $exists: 1 } })

print("C4: Listado de empleados que tienen de más de 45 años que viven en Madrid")
print("-----------------------------")
db.perfiles.find({ "ubicacion.telefono.1": { $exists: 1 } })

print("c5: Listado de empleados que no les gusta la música y son desarrolladores de Software")
print("-----------------------------")
db.perfiles.find({ $and: [{ habilidades: "desarrollador de software" }, { intereses: { $not: { $in: ["música"] } } }] })

print("c6: Habilidades entre los empleados")
print("-----------------------------")
db.perfiles.distinct("habilidades")

print("c7: Salario medio de los empleados por empresa")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", "total": { $avg: "$salario" } } }])


print("c8: Empresas cuyo salario medio de los empleados supera los 50000 €")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", "total": { $avg: "$salario" } } }, { $match: { "total": { $gt: 50000 } } }])


print("c9: Número de empleados por empresa y ciudad")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: { empresa: "$empresa", ciudad: "$ubicacion.ciudad" }, num_empleados: { $sum: 1 } } }])


print("c10: Número de empleados por empresa y habilidad")
print("-------------------------------------------")
db.perfiles.aggregate([{ $group: { _id: { empresa: "$empresa", habilidad: "$habilidades" } } }, { $unwind: "$_id.habilidad" }, { $group: { _id: { name: "$_id.empresa", habilidad: "$_id.habilidad" }, num_empleados: { $sum: 1 } } }])

print("c11: Empresas que no tienen empleados trabajando en Barcelona")
print("------------------------------------------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", ciudad: { $addToSet: "$ubicacion.ciudad" } } }, { $match: { "ciudad": { $nin: ['Barcelona'] } } }])

print("c12: Crea una colección donde cada documento tenga solo dos campos.")
print("Por un lado la empresa y por otro la lista de empleados de dicha empresa")
print("Ordena los resultados por nombre de empresa")
print("-----------------------------")

es = db.perfiles.aggregate([{ $group: { _id: "$empresa", empleados: { $addToSet: "$nombre" } } }, { $sort: { "_id": 1 } }]).toArray()
db.list_emp.insertMany(es)

db.list_emp.find()


print("c13: Listado de habilidades  de los empleados de cada una de las empresas")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: { empresa: "$empresa", habilidad: "$habilidades" } } }, { $unwind: "$_id.habilidad" }, { $group: { _id: "$_id.empresa", habilidades: { $addToSet: "$_id.habilidad" } } }])

print("c14: Datos de los empleados con el salario más alto de cada una de las empresas")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", "salario_max": { $max: "$salario" } } }])

print("c15: Datos de los empleados con el salario más alto de cada una de las empresas.Ordenar por sallario")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$empresa", "salario_max": { $max: "$salario" } } }, { $sort: { "salario_max": 1 } }])

print("c16: Empresa con mayor número de empleados")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { "_id": { "name": "$empresa" }, "total": { $sum: 1 } } }, { $sort: { "total": -1 } }, { $group: { "_id": "$_id.name", "num_emp": { $first: "$total" } } }])


print("C17:Número de empleados por fecha de incorporación")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { "_id": { "incorporacion": "$incorporación" }, "total": { $sum: 1 } } }])


print("c18: Salario medio por fecha de incorporación")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: "$incorporación", "salario_medio": { $avg: "$salario" } } }])

print("c19: Salario medio, maximo y  minimo por rango de edad [18, 25)[25,35),[35, 45),[45,...)")
print("-----------------------------")
db.perfiles.aggregate([{ $bucket: { groupBy: "$edad", boundaries: [18, 25, 35, 45], default: 45, output: { "sueldo_medio": { $avg: "$salario" }, "sueldo_maximo": { $max: "$salario" }, "sueldo_minimo": { $min: "$salario" } } } }])


print("c20: Salario medio por habilidad expresado en miles")
print("-----------------------------")
db.perfiles.aggregate([{ $group: { _id: { "habilidad": "$habilidades", "sueldo": "$salario" } } }, { $unwind: "$_id.habilidad" }, { $group: { _id: { "habilidad": "$_id.habilidad" }, "sueldo_medio": { $avg: "$_id.sueldo" } } }])


print("c21: Nombre del cliente que más gana en el conjunto de datos")
print("-----------------------------")


print("c22: Salario medio por empresa, de aquellos empleados interesados en el cine")
print("-----------------------------")


print("c23:Listado de empleados que tienen más de un teléfono de contacto")
print("-----------------------------")
