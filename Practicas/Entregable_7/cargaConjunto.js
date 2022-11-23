// Alejandro Barrachina Argudo

config = {
    _id: "SimulacroReplica",
    members: [{ _id: 0, host: "127.0.0.1:27001" },
    { _id: 1, host: "127.0.0.1:27002" },
    { _id: 2, host: "127.0.0.1:27003" },
    {
        _id: 3, host: "127.0.0.1:27004",
        priority: 0,
        secondaryDelaySecs: 80 // version 5.0
    }]
}

print("Tras hacer db.isMaster en 27001, los valores primary y me apuntan al puerto 27001")
print("Tras hacer db.isMaster en 27004, el valor primary apunta a 27001 y me a 27004")

print("Hacer la reconfiguración resulta en un error: MongoServerError: member: { _id: 2, host: \"127.0.0.1: 27003\", arbiterOnly: false, buildIndexes: true, hidden: true, priority: 1, tags: {}, secondaryDelaySecs: 0, votes: 1 } :: caused by :: priority must be 0 when hidden=true")
print("Hacer la reconfiguración con el puerto 27004 oculto resulta en una reconfiguración correcta")
print("Al hacer rs.stepDown() el servidor en 27002 se convierte en el primario")
print("En la nueva versión de mongo rs.secondaryOK() está deprecada")
print("El nodo en el puerto 27004 tiene 80ms de delay")

print("Error \"MongoServerError: not primary and secondaryOk = false - consider using db.getMongo().setReadPref() or readPreference in the connection string\" al hacer db.items.find en el servidor con delay")
