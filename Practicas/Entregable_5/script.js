// Alejandro Barrachina Argudo
// Iñaki Berrocal Diaz
use wasap

clearDatabase();

populateDatabase();



/**
 * Resetea la base de datos para tener 0 colecciones y 0 datos
 */
function clearDatabase() {
    db.dropDatabase();
}

/**
 * utiliza los archivos usuarios.json y conversaciones.json para llenar la base de datos
 */
function populateDatabase() {
    users = JSON.parse("usuarios.json");
    convers = JSON.parse("conversaciones.json");

    db.usuarios.insertMany(users);
    db.conversaciones.insertMany(convers);
}


/**
 * Crea un campo de usuarios con nick y mail unico, indexa el cp de la direccion para mejores busquedas
 */
function crearCampoUsuarios() {

    db.usuarios.createIndex({ nick: 1 }, { unique: true });
    db.usuarios.createIndex({ mail: 1 }, { unique: true });
    db.usuarios.createIndex({ "direccion.cp": 1 }, { unique: false });
}

/**
 * Crea un campo de conversaciones con emisor y receptor unicos de forma conjunta
 */
function crearCampoConversacion() {
    db.usuarios.createIndex({ emisor: 1, receptor: 1 }, { unique: true });
}

/**
 * 
 * Crea una nueva conversación entre dos usuarios
 * @param {String} n emisor de la conversacion
 * @param {String} m receptor de la conversacion
 * @param {String[]} t tags de la conversacion
 * @returns ID de la conversacion creada
 */
function crearConversacionVacia(n, m, t) {
    c = {
        emisor = n,
        receptor = m,
        tags = t,
        fecha_apertura = new Date().getTime(),
        comentarios =[]
    }

    return db.conversaciones.insert(c);
}

/**
 * 
 * @param {String} name Nombre del usuario
 * @param {String} n Nick del usuario. Unico
 * @param {String} email Mail del usuario. Unico
 * @param {Int[]} tlfs Numeros de telefono del usuario. Por defecto array vacio
 * @param {JSON} dir Datos de la direccion del usuario. Por defecto JSON vacio
 */
function meterUsuario(name, n, email, tlfs = [], dir = {}) {
    var u = {
        nombre: name,
        nick: n,
        mail: email,
        fecha_alta: new Date().getTime(),
        direccion: dir,
        telefonos: tlfs,
        contactos: [],
        conversaciones: []
    };

    db.usuarios.insert(u);
}

function iniciarConversacion(n, m, tags = []) {
    // Comprobamos si conversacion existe bilateralmente
    exists1 = db.conversaciones.countDocuments({ $and: [{ emisor: n }, { receptor: m }] });
    exists2 = db.conversaciones.countDocuments({ $and: [{ emisor: m }, { receptor: n }] });

    if (exists1 != 0 || exists2 != 0) {
        console.error("Conversarión ya existente");
        return;
    }

    // Comprobamos si ambos se tienen agregados
    inList1 = db.usuarios.countDocuments({ $and: [{ nombre: m }, { contactos: n }] });
    inList2 = db.usuarios.countDocuments({ $and: [{ nombre: n }, { contactos: m }] });

    if (inList1 == 0 || inList2 == 0) {
        console.error("no se tienen en contactos");
        return;
    }

    // Creamos nueva conversacion
    id = crearConversacionVacia(n, m, tags);

    // Metemos la conversación en el usuario que la ha iniciado
    db.usuarios.updateOne(
        { nick: n },
        {
            $push: { conversaciones: id }
        });
}
