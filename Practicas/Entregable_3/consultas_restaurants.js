// Alejandro Barrachina Argudo
// Iñaki Berrocal Diaz
use restaurants
col = db.data

print("C1: ¿Cuántos restaurantes hay en la base de datos después de la carga?")
print("-----------------------------------------------")
db.data.countDocuments()


print("C2: Seleccionar los restaurantes con precio superior a 500. En el resultado deseamos mostrar únicamente el nombre del restaurante, el precio y la primera valoración (primer elemento de 'reviews').")
print("-----------------------------------------------")
db.data.find({ Cost: { $gt: 500 } }, { Name: 1, Cost: 1, reviews: 1 }, { reviews: { $slice: 1 } })

print("C3: Listado de los restaurantes que ofrecen comida de tipo “Asian” (campo 'cuisines'). Mostrar el precio y el tipo de comida ")
print("-----------------------------------------------")
db.data.find({ "details.cuisines": { $eq: "Asian" } }, { Cost: 1, "details.cuisines": 1 })

print("C4: Incrementa en un 10% el precio de los restaurantes que ofrecen comida de tipo “Asian”. ")
print("-----------------------------------------------")
db.data.update({ "details.cuisines": { $eq: "Asian" } }, { $mul: { Cost: 1.1 } }, { multi: true })


print("C5: Listado de los restaurantes que ofrecen comida de tipo “Asian” (campo 'cuisines'). Mostrar el precio y el tipo de comida. Compara con los resultados de la consulta 3")
print("-----------------------------------------------")
db.data.find({ "details.cuisines": { $eq: "Asian" } }, { Cost: 1, "details.cuisines": 1 })

print("C6: Muestra los restaurantes que ofrecen comidas los viernes (“Fri”) que  no tienen ninguna revisión (reviews) ")
print("-----------------------------------------------")
db.data.find({ $and: [{ timings: { $eq: "Fri" } }, { "reviews.0": { $exists: false } }] })

print("C7: Añade una revisión a los restaurantes que ofrecen comida los viernes. Los datos de la revisión son: Revisor: tu nombre, rating: 3.4, fecha: fecha actual")
print("-----------------------------------------------")
r = { reviewer: "Alejandro Barrachina", text: "como merendar una pared de pladur", rating: 3.4, time: new Date().getTime(), tables: [1] }
db.data.update({ timings: { $eq: "Fri" } }, { $push: { reviews: r } }, { multi: true })


print("C8: Muestra los restaurantes que ofrecen comidas los viernes (“Fri”) que  tienen una  una revisión tuya ")
print("-----------------------------------------------")
db.data.find({ $and: [{ timings: { $eq: "Fri" } }, { "reviews.reviewer": { $eq: "Alejandro Barrachina" } }] })


print("C9: Modifica el rating del revisor 'Nandini' para el restaurante 'Owm Nom Nom'. El nuevo reating es 2. Modifica también la fecha para que aparezca la fecha actual. ")
print("-----------------------------------------------")
db.data.update({ $and: [{ Name: { $eq: "Owm Nom Nom" } }, { reviews: { $elemMatch: { reviewer: { $eq: "Nandini" } } } }] }, { $set: { "reviews.$[elem].rating": 2, "reviews.$[elem].time": new Date().getTime() } }, { arrayFilters: [{ "elem.reviewer": "Nandini" }] }, { multi: true })


print("C10: Consulta los datos del restaurante con nombre “Owm Nom Nom”. Elimina el campo “cuisines”. Consulta los datos de nuevo para chequear que ha desaparecido dicho campo.")
print("-----------------------------------------------")
db.data.find({ Name: { $eq: "Owm Nom Nom" } })
db.data.update({ Name: { $eq: "Owm Nom Nom" } }, { $unset: { "details.cuisines": "" } })
db.data.find({ Name: { $eq: "Owm Nom Nom" } })

print("C11: Seleccionar los restaurantes con precio superior a 800 que ofrezcan comida del tipo 'North Indian' con algún rating (new_ratings) superior a 4. ")
print("-----------------------------------------------")
db.data.find({ $and: [{ "details.cuisines": "North Indian" }, { Cost: { $gt: 800 } }, { "details.new_ratings": { $gt: 4 } }] })


print("C12: Queremos garantizar que ningún restaurante tiene un precio inferior a 10. Modifica los restaurantes con precio inferior a 10, de forma que el nuevo precio de dichos restaurante pasa a ser 10. Para los documentos afectados hay que modificar el campo “update” con la fecha del sistema. (R: 37 restaurantes modificados)")
print("-----------------------------------------------")
db.data.update({ Cost: { $lt: 10 } }, { $set: { Cost: 10, Update: new Date().getTime() } }, { multi: true, upsert: true })


print("C13: Añade una nueva valoración ('new_ratings')  a los restaurantes que ofrecen comida de tipo 'Kebab' pero no 'Chinese' con rating 5. Muestra los resultados")
print("-----------------------------------------------")
db.data.update({ $and: [{ "details.cuisines": { $eq: "Kebab" } }, { "details.cuisines": { $not: { $in: ["chinese"] } } }] }, { $push: { "details.new_ratings": 5 } })
db.data.find({ $and: [{ "details.cuisines": { $eq: "Kebab" } }, { "details.cuisines": { $not: { $in: ["chinese"] } } }] })

print("C14: Añade dos nueva valoraciones ('new_ratings') a los restaurantes que ofrecen comida de tipo 'Kebab' pero no 'Chinese'. La primera valoración es 4 y la segunda valoración es 4.5.")
print("-----------------------------------------------")
db.data.update({ $and: [{ "details.cuisines": { $eq: "Kebab" } }, { "details.cuisines": { $not: { $in: ["chinese"] } } }] }, { $push: { "details.new_ratings": { $each: [4, 4.5], $position: 0 } } })


print("C15: Modifica todas las revisiones con valoración 5 (campo 'reviews' con 'rating' = 5). Añadirles un nuevo campo llamado 'rating_text'  (si no existe ya) con valor 'Excelent'. ")
print("-----------------------------------------------")
db.data.update({}, { $set: { "reviews.$[elem].rating_text": "Excelent" } }, { arrayFilters: [{ "elem.rating": 5 }] }, { upsert: true, multi: true })


print("C16: Los restaurantes no pueden abrir los 7 días de la semana. Modificar la base de datos de forma que el número máximo de días en los que se ofrece servicio sea 6.")
print("-----------------------------------------------")
db.data.update({}, { $push: { timings: { $slice: 6 } } }, { multi: true })


print("C17: Encontrar restaurantes que tengan alguna revisión en la que aparezca  la palabra 'pizza' y 'good' (en este orden)")
print("-----------------------------------------------")
db.data.find({ "reviews.text": { $regex: "pizza.*good" } })
