# Entregable 5

## Usuarios

### Campos

- Nombre: String, obligatorio por la especificación
- Nick (único): String, obligatorio por la especificación
- Correo (único): String, obligatorio por la especificación
- Fecha de alta: Date, obligatorio por la especificación
- Dirección postal (Documento Embebido, No hacemos un documento CP por separado porque escalaría muy rápido en tamaño y no aportaría mas rapidez a la busqueda):
  - Calle: String
  - Número: Int
  - Código postal: Int
  - Población: String
  - Provincia: String
- Número(s) de teléfono (puede no tener): Array de Int
- Contactos (puede no tener): Array de String

### Índices utilizados

Los indices utilizados han sido nick y correo porque tienen que ser únicos; y el código postal de la dirección ya que es una busqueda que se va a hacer bastante.

## Conversaciones

### Campos

- Emisor: String (único junto a receptor)
- Receptor: String (único junto a emisor)
- Fecha de creación: Date
- Tags: Array de String
- Comentarios:
  - Emisor: persona que manda el mensaje String
  - Mensaje: texto del mensaje String
  - Leido: Bool
  - fecha: Date

### Índices utilizados

Emisor y receptor son índices conjuntamente únicos para evitar dobles conversaciones entre las mismas personas.

## Decisiones de diseño

Hemos decidido usar el menor número de colecciones posibles para evitar tanto duplicidad como para reducir el número de busquedas.

La única referencia dentro de la base de datos son los nicks de los usuarios en las conversaciones.

Los usuarios tienen todos los datos relacionados con el usuario para que las busquedas de varios campos de información de los mismos se puedan hacer sobre una misma colección, lo mismo aplica al registro y guardado de contactos de cada usuario.

Las conversaciones tienen toda la información de sus mensajes, receptor y emisor para evitar busquedas en otras colecciones y malas referencias de IDs. Crear conversaciones es trivial ya que solo es insertar un nuevo elemento a la colección y añadir mensajes a las mismas es igual de simple ya que es un valor autocontenido. Consultar los mensajes por fecha no es más que ordenar el array de mensajes por fecha de inserción y limitarlo a los 20 últimos. El número de conversaciones iniciadas por un usuario se consigue con una sola busqueda de coste lineal.

## Script demo

Este script presenta algunas de las restricciones impuestas por la especificación y tambien sirve para cargar los datos de la aplicación

### Instrucciones de uso

- Iniciar mongosh en la carpeta del script
- Cambiar a la base de datos a usar
  ```mongodb
  use Chat
  ```
- Cargar el script
  ```javascript
  load("script.js");
  ```
- Probar las distintas funciones descritas en el archivo
