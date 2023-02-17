export class Modelo {
    constructor() {
        this.baseDatos;
        this.lista = [];
        this.callbacks = [];
        this.conexionBD();
    }
    registrar(callback) {
        this.callbacks.push(callback);
    }
    avisar() {
        for (let callback of this.callbacks)
            callback();
    }
    obtenerRegistro() {
        const peticion = this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').getAll();
        peticion.onsuccess = () => {
            this.lista = peticion.result;
            this.avisar();
        };
        peticion.onerror = () => {
            console.error("No se ha podido conectar");
        };
    }
    editar(id, nombre, precio, fecha, descripcion, edad, tematicas, estado, file) {
        const request = this.baseDatos.transaction('videojuegos', 'readwrite').objectStore("videojuegos").get(id);
        request.onerror = () => {
            console.log("fallo en editar");
        };
        request.onsuccess = (evento) => {
            const videojuego = evento.target.result;
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    videojuego.nombre = nombre;
                    videojuego.precio = precio;
                    videojuego.fecha = fecha;
                    videojuego.descripcion = descripcion;
                    videojuego.edad = edad;
                    videojuego.tematicas = tematicas;
                    videojuego.estado = estado;
                    videojuego.file = reader.result;
                    this.baseDatos.transaction('videojuegos', 'readwrite').objectStore("videojuegos").put(videojuego);
                    this.obtenerRegistro();
                };
            }
            else {
                videojuego.nombre = nombre;
                videojuego.precio = precio;
                videojuego.fecha = fecha;
                videojuego.descripcion = descripcion;
                videojuego.edad = edad;
                videojuego.tematicas = tematicas;
                videojuego.estado = estado;
                videojuego.file = null;
                this.baseDatos.transaction('videojuegos', 'readwrite').objectStore("videojuegos").put(videojuego);
                this.obtenerRegistro();
            }
        };
    }
    insertar(nombre, precio, fecha, descripcion, edad, tematicas, estado, file) {
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let obj = {
                    nombre: nombre,
                    precio: precio,
                    fecha: fecha,
                    descripcion: descripcion,
                    edad: edad,
                    tematicas: tematicas,
                    estado: estado,
                    file: reader.result
                };
                const almacenar = this.baseDatos.transaction('videojuegos', 'readwrite').objectStore('videojuegos').add(obj);
                almacenar.onsuccess = () => {
                    this.obtenerRegistro();
                };
            };
        }
        else {
            let obj = {
                nombre: nombre,
                precio: precio,
                fecha: fecha,
                descripcion: descripcion,
                edad: edad,
                tematicas: tematicas,
                estado: estado,
                file: null
            };
            const almacenar = this.baseDatos.transaction('videojuegos', 'readwrite').objectStore('videojuegos').add(obj);
            almacenar.onsuccess = () => {
                this.obtenerRegistro();
            };
        }
    }
    obtenerRegistro2(nombre) {
        if (!nombre) {
            this.obtenerRegistro();
        }
        else {
            const peticion = this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').index('nombreIndex').getAll(nombre);
            peticion.onsuccess = () => {
                this.lista = peticion.result;
                this.avisar();
            };
            peticion.onerror = () => {
                console.error("No se ha podido conectar");
            };
        }
    }
    borrar(id) {
        const request = this.baseDatos.transaction('videojuegos', 'readwrite').objectStore("videojuegos").delete(id);
        request.onsuccess = () => {
            this.obtenerRegistro();
        };
    }
    conexionBD() {
        window.indexedDB;
        if (window.indexedDB) {
            const respuesta = indexedDB.open("Videojuegos", 1);
            respuesta.onsuccess = (event) => {
                this.baseDatos = event.target.result;
                this.obtenerRegistro();
            };
            respuesta.onerror = () => {
                console.log('ERROR');
            };
            respuesta.onupgradeneeded = (evt) => {
                this.baseDatos = evt.target.result;
                this.baseDatos.createObjectStore('videojuegos', { keyPath: 'id', autoIncrement: true }).createIndex('nombreIndex', 'nombre');
            };
        }
    }
    getDatos() {
        return this.lista;
    }
}
//# sourceMappingURL=modelo.js.map