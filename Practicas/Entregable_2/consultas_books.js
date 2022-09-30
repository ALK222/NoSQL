// Alejandro Barrachina Argudo
// Iñaki Berrocal Diaz
use books
col = db.titles

print("C1: Número de títulos publicados en septiembre del año 1998 (clave publication_date)")
print("-----------------------------------------------")
db.titles.countDocuments({ "publication_date.year": { $eq: 1998 } })

print("C2: Número de títulos publicados entre los años 2000 y 2005")
print("-----------------------------------------------")
db.titles.countDocuments({ $and: [{ "publication_date.year": { $gte: 2000 } }, { "publication_date.year": { $lte: 2005 } }] })

print("C3: Número de títulos donde uno de los autores es 'J.K. Rowling'. Mostrar 10 títulos a partir del 5º")
print("-----------------------------------------------")
db.titles.find({ authors: { $eq: "J.K. Rowling" } }).skip(5).limit(10)

print("C4: Listado de títulos publicados por más de un autor, donde uno de los autores es 'Roald Dahl'. Mostrar solo los 10 primeros títulos.")
print("-----------------------------------------------")
db.titles.find({ $and: [{ authors: { $eq: "Roald Dahl" } }, { "authors.1": { $exists: true } }] }).limit(10)

print("C5: Listado de títulos que estén relacionados con biografías. (Podéis realizar una búsqueda por la expresión 'biography')")
print("-----------------------------------------------")
db.titles.find({ title: { $regex: "biography" } })

print("C6: Títulos publicados en un idioma distinto del inglés  por el  autor: 'Arturo Pérez-Reverte'")
print("-----------------------------------------------")
db.titles.find({ $and: [{ authors: { $eq: "Arturo Pérez-Reverte" } }, { language_code: { $not: /en/ } }] })

print("C7: Títulos publicados por el  autor: 'Laurie Notaro'")
print("-----------------------------------------------")
db.titles.find({ authors: { $eq: "Laurie Notaro" } })

print("C8: Títulos publicados en un idioma distinto del inglés  por cualquiera de los autores: “Arturo Pérez-Reverte” , “Laurie Notaro”.")
print("-----------------------------------------------")
db.titles.find({ $and: [{ language_code: { $not: /en/ } }, { $or: [{ authors: { $eq: "Arturo Pérez-Reverte" } }, { authors: { $eq: "Laurie Notaro" } }] }] })


print("C9: Títulos donde se conoce el precio en moneda “usd” y además se les ha aplicado un descuento")
print("-----------------------------------------------")
db.titles.find({ details: { $elemMatch: { currency: { $eq: 'usd' }, discount: { $eq: true } } } })

print("C10: Títulos que carecen de información de precio")
print("-----------------------------------------------")
db.titles.find({ "details.0": { $exists: false } })

print("C11: Títulos donde el precio en “usd” supera el valor de 95.")
print("-----------------------------------------------")
db.titles.find({ details: { $elemMatch: { currency: { $eq: 'usd' }, price: { $gt: 95 } } } })

print("C12: Titulos de libros que han sido publicados en idioma español y no tienen precio en moneda “esp”.")
print("-----------------------------------------------")
db.titles.find({ $and: [{ language_code: { $eq: "spa" } }, { "details.currency": { $ne: "esp" } }] })

print("C13: Títulos de libros que superan las 800 páginas y tienen un rating (average_rating) superior a 4")
print("-----------------------------------------------")
db.titles.find({ $and: [{ '  num_pages': { $gt: 800 } }, { average_rating: { $gt: 4.00 } }] })

print("C14: Títulos donde uno de los autores es “Arturo Pérez-Reverte” vendidos con anterioridad al año 2006 en moneda 'chf'")
print("-----------------------------------------------")
db.titles.find({ $and: [{ authors: { $eq: "Arturo Pérez-Reverte" } }, { "publication_date.year": { $lt: 2006 } }, { "details.currency": { $eq: 'chf' } }] })
