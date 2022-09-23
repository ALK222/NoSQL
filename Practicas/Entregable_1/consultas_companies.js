use companies
col = db.summary
print("C1: Número de empleados de la empresa 'Spotify'")
print("-----------------------------------------------")
db.summary.find({ name: { $eq: "Spotify" } }, { "number_of_employees": 1 })

print("C2: Numero de empresas fundadas en Enero de 2005")
print("-----------------------------")
db.summary.countDocuments({ "founded_year": 2005 });

print("C3: Numero de empresas fundadas entre Enero y Marzo de 2005")
print("-----------------------------")
db.summary.countDocuments({ $and: [{ "founded_year": 2005 }, { "founded_month": { $gt: 2 } }, { "founded_month": { $lt: 4 } }] });

print("C4: Nombre de las empresas cuya categoría(category_code) es 'music' ")
print("-----------------------------")
db.summary.find({ category_code: "music" }, { "name": 1 });

print("C5: Número de empresas que no tienen ninguna imagen (image)")
print("--------------------------------------------------------------")
db.summary.countDocuments({ "image.available_sizes.0": { $exists: false } });

print("C6: Numero de empresas con empleado con categoría 'Chief Revenue Officer'. Campo relationships.")
print("-----------------------------")
db.summary.countDocuments({ "relationships.title": "Chief Revenue Officer" });

print("C7: Nombre de las empresas con oficina en las zonas de San Diego o San Francisco con más de 600 empleados. Mostrar los resultados ordenados por nombre y número de empelados")
print("-----------------------------")
db.summary.find({ $and: [{ $or: [{ "offices.city": "San Diego" }, { "offices.city": "San Francisco" }] }, { "number_of_employees": { $gt: 600 } }] }, { name: 1 }).sort({ name: 1, number_of_employees: 1 });

print("c8: Nombre de empresas adquiridas por menos de 50000 dólares")
print("-----------------------------")
db.summary.find({ "acquisition.price_amount": { $lt: 50000 } }, { name: 1 });

print("c9: Nombre de empresas que tienen varias oficinas. Al menos una en Seattle y otra en New York")
print("-----------------------------")
db.summary.find({ $and: [{ "offices.city": "Seattle" }, { "offices.city": "New York" }] }, { name: 1 });

print("c10: Listado de paises distintos en los que las empresas tienen oficina")
print("-----------------------------")
db.summary.distinct("offices.country_code");

print("c11: Listado de empresas que tienen oficina en al menos 3 países:  USA, GBR y también en  Japón (JPN) ")
print("-----------------------------")
db.summary.findOne({ $and: [{ "offices.country_code": { $eq: "USA" } }, { "offices.country_code": { $eq: "GBR" } }, { "offices.country_code": { $eq: "JPN" } }] }, { "name": 1 })
