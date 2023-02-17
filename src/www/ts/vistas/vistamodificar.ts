import {Vista} from './vista.js'
import {Controlador} from '../controladores/app.js'
import {Modelo} from '../modelos/modelo.js'
import {videojuego} from '../interfaz/videojuego.js'
export class VistaModificar extends Vista{

	private controlador: Controlador;
	private modelo: Modelo;
	private id: number;
	private iNombre: HTMLInputElement;
	private iPrecio: HTMLInputElement;
	private iFecha: HTMLInputElement;
	private iDescripcion: HTMLInputElement;
	private iEdad: HTMLSelectElement;
	private iFile: HTMLInputElement;
	private iTematicas: HTMLCollectionOf<HTMLInputElement>;
	private iEstado: HTMLCollectionOf<HTMLInputElement>;
	private iCancelar: HTMLButtonElement;
	private iAceptar: HTMLButtonElement;
	private estado: boolean;
    constructor(div:HTMLDivElement,controlador:Controlador){
		super(div)
		this.controlador=controlador
		this.modelo = this.controlador.getModelo()

		this.id = 0;
		this.iNombre = <HTMLInputElement>this.div.getElementsByTagName('input')[0]
		this.iPrecio = <HTMLInputElement>this.div.getElementsByTagName('input')[1]
		this.iFecha = <HTMLInputElement>this.div.getElementsByTagName('input')[2]
		this.iDescripcion = <HTMLInputElement>this.div.getElementsByTagName('input')[3]
		this.iEdad = <HTMLSelectElement>this.div.getElementsByTagName('select')[0]
		this.iFile= <HTMLInputElement>this.div.getElementsByTagName('input')[4]	
		this.iEstado = this.div.getElementsByClassName('estado')as HTMLCollectionOf<HTMLInputElement>
		this.estado = true;
		this.iTematicas = this.div.getElementsByClassName('tematica')as HTMLCollectionOf<HTMLInputElement>
		
		this.iCancelar = <HTMLButtonElement>this.div.getElementsByTagName('button')[0]

       	this.iAceptar = <HTMLButtonElement>this.div.getElementsByTagName('button')[1]

	   //Evento que le asocio al elemento

	   this.iCancelar.onclick = this.cancelar.bind(this)
	   this.iAceptar.onclick = this.aceptar.bind(this)
    }
	cancelar(){
		this.apagarAlertas()
		this.controlador.cancelar()
	}
	/** 
     * Rellena los inputs con los valores del campo a modificar
    */
    rellenar(dato:videojuego){	
	
        this.id = dato.id
        this.iNombre.value = dato.nombre
		
		this.iPrecio.value = dato.precio.toString()
        this.iDescripcion.value = dato.descripcion
        this.iFecha.value = dato.fecha.toString()
		if(dato.estado)
		this.iEstado![0]!.checked = true
		else
		this.iEstado![1]!.checked = true
    }
	apagarAlertas(){
		this.iNombre.style.backgroundColor="white"
		this.iPrecio.style.backgroundColor="white"
		this.iFecha.style.backgroundColor="white"
		this.iDescripcion.style.backgroundColor="white"
	}
	/**
	 * Metodo para ingresar un registro (Valida los campos)
	 */
	aceptar(){
		this.apagarAlertas()
		//Queremos esto en local, el registro de tematicas se hará una vez por click
		let tematicas = []

		if (this.iEstado![0]!.checked){
			this.estado=true
		
		}
		if (this.iEstado![1]!.checked){
			this.estado=false
			
		}
		
		
		if (this.iTematicas![0]!.checked){
			tematicas.push(this.iTematicas![0]!.value)
		}
		if (this.iTematicas![1]!.checked){
			tematicas.push(this.iTematicas![1]!.value)
		}
		if (this.iTematicas![2]!.checked){
			tematicas.push(this.iTematicas![2]!.value)
			}
		let expRegNombre:RegExp = /^[A-Z][a-z]{2,9}$/
		let expRegSoloNumeros:RegExp = /^[0-9]+$/;

		try{
			if(!expRegNombre.test(this.iNombre.value)){
				this.iNombre.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Introduce un nombre válido"
			}
			if(!expRegSoloNumeros.test(this.iPrecio.value)){
				this.iPrecio.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes de introducir un numero"
			}
			if(!this.iFecha.value ){
				this.iFecha.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes de introducir una fecha de aparición correcta"
			}
			
			if(!this.iDescripcion.value){
				this.iDescripcion.style.backgroundColor="red"
				window.scrollTo(0,0)
				throw "Debes introducir una descripcion"
			}
			
			if(this.iEdad.value != "+18" && this.iEdad.value != "+13" && this.iEdad.value != "+7" && this.iEdad.value != "+3")
			throw "Debes introducir una Edad Recomendada"
		
			/*Me lleva al controlador los datos*/
			alert("Estas seguro de ingresar este juego?")
			this.controlador.aceptarModificar(this.id,this.iNombre.value, <number><unknown>this.iPrecio.value, <Date><unknown>this.iFecha.value,
				this.iDescripcion.value, this.iEdad.value,tematicas,this.estado,this.iFile.files![0]!)

			//Resetea el contenido
			this.iNombre.value=""
			this.iPrecio.value="0"
			this.iFecha.value=""
			this.iDescripcion.value=""
			
			this.iTematicas![0]!.checked = false
			this.iTematicas![1]!.checked = false
			this.iTematicas![2]!.checked = false
	
		}
		catch(error){
			
		}
	}
}