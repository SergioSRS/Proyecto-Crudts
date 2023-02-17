import { VistaModificar } from '../vistas/vistamodificar.js';
import { VistaInicio } from '../vistas/vistainicio.js';
import { VistaAlta } from '../vistas/vistaalta.js';
import { VistaConsulta } from '../vistas/vistaconsulta.js';
import { Modelo } from '../modelos/modelo.js';
import {videojuego} from '../interfaz/videojuego.js'

export class Controlador {
  private modelo: Modelo;
  private divVistaInicio: HTMLDivElement;
  private divVistaAlta: HTMLDivElement;
  private divVistaConsulta: HTMLDivElement;
  private divVistaModificar: HTMLDivElement;
  private vistaInicio: VistaInicio;
  private vistaAlta: VistaAlta;
  private vistaConsulta: VistaConsulta;
  private vistaModificar: VistaModificar;

  constructor() {
    window.onload = this.iniciar.bind(this);
  }

  /**
   * Inicia el modelo y las vistas
   */
  iniciar(): void {
    // Primero creamos el modelo porque tarda en crear
    this.modelo = new Modelo();

    this.divVistaInicio = <HTMLDivElement>document.getElementById('vistaInicio')!;
    this.divVistaAlta = <HTMLDivElement>document.getElementById('vistaAlta')!;
    this.divVistaConsulta = <HTMLDivElement>document.getElementById('vistaConsulta')!;
    this.divVistaModificar = <HTMLDivElement>document.getElementById('vistaModificar')!;

    this.vistaInicio = new VistaInicio(this.divVistaInicio, this);
    this.vistaAlta = new VistaAlta(this.divVistaAlta, this);
    this.vistaConsulta = new VistaConsulta(this.divVistaConsulta, this);
    this.vistaModificar = new VistaModificar(this.divVistaModificar, this);
    this.ocultarVistas();
    this.vistaInicio.mostrar(true);
  }

  /**
   * Oculta las vistas de la aplicacion
   */
  private ocultarVistas(): void {
    this.vistaInicio.mostrar(false);
    this.vistaAlta.mostrar(false);
    this.vistaModificar.mostrar(false);
    this.vistaConsulta.mostrar(false);
  }

  /**
   * Metodo para cancelar cualquier proceso y volver a la vista inicio
   */
  cancelar(): void {
    this.ocultarVistas();
    this.vistaInicio.mostrar(true);
  }

  /**
   * Oculta las vistas y muestra la vista de consultas de un dato en concreto
   */
  pulsarConsulta(dato: videojuego): void {
    this.ocultarVistas();
    this.vistaConsulta.mostrar(true);
    this.vistaConsulta.pintar(dato);
  }

  /**
   * metodo que llama al modelo para editar los datos que se encuentran en el
   */
  aceptarModificar(
    id: number,
    nombre: string,
    precio: number,
    fecha: Date,
    descripcion: string,
    edad: string,
    tematicas: string[],
    estado: boolean,
    file: File
  ): void {
    this.ocultarVistas();
    this.vistaInicio.mostrar(true);

    this.modelo.editar(id, nombre, precio, fecha, descripcion, edad, tematicas, estado, file);
    alert('Introducido con exito');
  }

  /**
   * Metodo encargado de mostrar la vista del alta
   */
  pulsarAlta(): void {
    this.ocultarVistas();
    this.vistaAlta.mostrar(true);
  }

  pulsarInicio(): void {
    this.ocultarVistas();
    this.vistaInicio.mostrar(true);
  }

 
  aceptarAlta(nombre: string, precio: number, fecha: Date, descripcion: string, edad: string, tematicas: string[], estado: boolean, file: File) {
    this.ocultarVistas();
    this.modelo.insertar(nombre, precio, fecha, descripcion, edad, tematicas, estado, file);
    this.vistaInicio.mostrar(true);
  }

  eliminarVideojuego(id: number) {
    this.modelo.borrar(id);
  }

  pulsarBusqueda(nombre: string) {
    this.modelo.obtenerRegistro2(nombre);
  }

  pulsarModificar(dato: videojuego) {
    this.ocultarVistas();
    this.vistaModificar.mostrar(true);
    this.vistaModificar.rellenar(dato);
  }


  getModelo() {
    return this.modelo;
  }
}
new Controlador()