import { Vista } from './vista.js';
export class VistaConsulta extends Vista {
    constructor(div, controlador) {
        super(div);
        this.controlador = controlador;
        this.modelo = this.controlador.getModelo();
    }
    pintar(dato) {
        this.borrarIngresos();
        let contenedor = document.createElement("div");
        this.div.appendChild(contenedor);
        contenedor.setAttribute('id', "contenedor");
        let titulo = document.createElement('h2');
        contenedor.appendChild(titulo);
        titulo.textContent = dato.nombre;
        let imagen = document.createElement('div');
        imagen.setAttribute('id', "fotoConsulta");
        contenedor.appendChild(imagen);
        let img = document.createElement('img');
        imagen.appendChild(img);
        img.setAttribute('width', '200px');
        img.setAttribute('height', '200px');
        if (dato.file) {
            img.setAttribute('src', dato.file);
        }
        else {
            let sinfoto = "assets/img/nophoto.gif";
            img.setAttribute('src', sinfoto);
        }
        let parrafo = document.createElement('p');
        contenedor.appendChild(parrafo);
        parrafo.textContent = "Descripcion: " + dato.descripcion;
        let fecha = document.createElement('p');
        contenedor.appendChild(fecha);
        fecha.textContent = "Fecha de lanzamiento: " + dato.fecha;
        let edadRecomendada = document.createElement('p');
        contenedor.appendChild(edadRecomendada);
        edadRecomendada.textContent = "Edad Recomendada" + dato.edad;
        let estado = document.createElement('p');
        contenedor.appendChild(estado);
        console.log(dato.estado);
        if (dato.estado === true)
            estado.textContent = "Completado: Sí";
        else
            estado.textContent = "Completado: No";
        let tematica = document.createElement('p');
        contenedor.appendChild(tematica);
        console.log(dato.tematicas);
        tematica.textContent = "Tematicas: " + dato.tematicas;
        let botonVolver = document.createElement('button');
        contenedor.appendChild(botonVolver);
        botonVolver.textContent = "Volver";
        botonVolver.onclick = this.volver.bind(this);
    }
    borrarIngresos() {
        while (this.div.firstElementChild)
            this.div.firstElementChild.remove();
    }
    volver() {
        this.controlador.cancelar();
    }
}
//# sourceMappingURL=vistaconsulta.js.map