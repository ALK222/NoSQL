use novelPrizes

print("Numero de documentos en la coleccion: " + db.awards.countDocuments());

print("Primer documento: " + db.awards.findOne());

print("Numero de premios concedidos en 2010: ")
db.awards.countDocuments({ "awardYear": { $eq: '2010' } });

print("Premios con una cantidad monetaria de 1000000: ")
db.awards.find({ "prizeAmount": { $eq: 1000000 } });

print("Premios entre 1000000 y 150000: ")
db.awards.find({ $and: [{ "prizeAmount": { $lt: 1000000 } }, { prizeAmount: { $gt: 150000 } }] });

print("Premios entre 1000000 y 700000 ordenados por el año descendientemente: ");
db.awards.find({ $and: [{ "prizeAmount": { $lt: 1000000 } }, { prizeAmount: { $gt: 700000 } }] }).sort({ awardYear: -1 });

print("Premios entre 1000000 y 700000 en el año 1979: ");
db.awards.find({ $and: [{ "prizeAmount": { $lt: 1000000 } }, { prizeAmount: { $gt: 700000 } }, { awardYear: { $lt: "1979" } }] });

print("Prueba de consulta: ");
db.awards.find({ awardYear: { $gt: "1980" }, awardYear: { $lt: "2010" } }, { awardYear: 1 }) // esto muestra todos los resultados
print("Esta consulta está mal ya que el filtro hace que se muestren todos los años")

print("Premios con el campo dateAwarded: ")
db.awards.find({ dateAwarded: { $exists: true } });

print("Premios concedidos entre 1980 y 2010: ");
db.awards.find({ $and: [{ awardYear: { $gt: "1980" } }, { awardYear: { $lt: "2010" } }] });

print("Premios concedidos a grupos de mas de 3 personas")
db.awards.countDocuments({ "laureates.2": { $exists: true } }); // 106

print("Nombres de los ganadores sin repeticiones en ingles")
db.awards.distinct("laureates.knownName.en");

print("Nombres de los ganadores sin repeticiones en ingles en grupos de mas de 3 personas");
db.awards.distinct("laureates.knownName.en", { "laureates.2": { $exists: true } });

print("Años en los que el premio supera 2900000")
db.awards.distinct("awardYear", { prizeAmount: { $gt: 2900000 } });
