export class Modelo{
	public baseDatos: any;
	public lista: any;
	public callbacks: any;

	constructor(){
		this.baseDatos
		this.lista = []
		this.callbacks = [] 
		this.conexionBD()
	}
	/**
	 * Registra a los callbacks en el array de callbacks
	 * @param {array} callback callback para mantener actualizada las vistas
	 */
    registrar(callback:Function){
        this.callbacks.push(callback)
	}
	/**
	 * Avisa a los callback
	 */
	avisar():void{
		for(let callback of this.callbacks)
		callback()
	}
	/**
	 * Metodo que te devuelve la lista de registros y avisa a los callbacks
	 */
    obtenerRegistro():void{
		const peticion= this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').getAll();
		
		peticion.onsuccess = () => {
			this.lista = peticion.result;
			this.avisar()
		}
		peticion.onerror = () => {
			console.error("No se ha podido conectar")
		}
	}
	/** 
	 * Edita un registro de la base de datos buscando por un id
	*/
    editar(id:number, nombre:string,precio:number,fecha:Date,descripcion:string,edad:string,tematicas:string[],estado:boolean,file:File){
		
		const request = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").get(id)
		
	
		request.onerror = () =>{
			console.log("fallo en editar")
		}
		request.onsuccess = (evento:any)=>{
			const videojuego = evento.target.result
				
			if (file)
			{
				
				let reader = new FileReader()
				reader.readAsDataURL(file)
			
				reader.onload = () =>{
			
					videojuego.nombre = nombre
					videojuego.precio = precio
					videojuego.fecha = fecha
					videojuego.descripcion = descripcion
					videojuego.edad = edad
					videojuego.tematicas = tematicas
					videojuego.estado = estado
					videojuego.file = reader.result

				this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").put(videojuego)
					
					this.obtenerRegistro()
				}
			
			}
			else{
					
					videojuego.nombre = nombre
					videojuego.precio = precio
					videojuego.fecha = fecha
					videojuego.descripcion = descripcion
					videojuego.edad = edad
					videojuego.tematicas = tematicas
					videojuego.estado = estado
					videojuego.file = null

					this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").put(videojuego)

					this.obtenerRegistro()

			}
   		 }
	}
    /** 
	 * Insertar un registro en el indexdb, si tiene file utilizaremos FileReader
	 *@param {string} nombre Titulo del juego
     * @param {number} precio Precio del juego
     * @param {date} fecha Fecha de estreno del juego
     * @param {string} descripcion Descripcion del juego
     * @param {string} edad Edad recomendada para jugar
     * @param {string[]}tematicas Tematicas relacionadas con el juego
     * @param {boolean} estado Definirá si el juego esta terminado o no
     * @param {object} file Imagen relacionada del juego
	*/
	insertar(nombre:string,precio:number,fecha:Date,descripcion:string,edad:string,tematicas:string[],estado:boolean,file:File){
	
		if (file)
		{
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () =>
			{
				let obj = {
					nombre: nombre,
					precio: precio,
					fecha: fecha,
					descripcion: descripcion,
					edad: edad,
					tematicas:tematicas,
					estado:estado,
					file:reader.result
				}
				const almacenar=this.baseDatos.transaction('videojuegos','readwrite').objectStore('videojuegos').add(obj);
				almacenar.onsuccess=()=>{
					
					this.obtenerRegistro()
				}
			}
		}
		else
		{
			let obj = {
				nombre: nombre,
				precio: precio,
				fecha: fecha,
				descripcion: descripcion,
				edad: edad,
				tematicas:tematicas,
				estado:estado,
				file:null
			}
			const almacenar=this.baseDatos.transaction('videojuegos','readwrite').objectStore('videojuegos').add(obj);
			almacenar.onsuccess=()=>{
				
				this.obtenerRegistro()
			}
		}
	}
	
	/**
	 * Devuelve los registros que haya en la base de datos y luego llama a los callbacks para la busqueda por nombre
	 *	@param { string } nombre nombre del registro
	**/
		obtenerRegistro2(nombre:string){
			if (!nombre){
				this.obtenerRegistro()
			}
			else{
				const peticion= this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').index('nombreIndex').getAll(nombre);
			
				peticion.onsuccess = () => {
					
					this.lista = peticion.result;
					this.avisar()
				}
				peticion.onerror = () => {
					console.error("No se ha podido conectar")
				}
			}
		
		}
	/**
	 * identifica un registro de la base de datos
	 * @param { number } id id que identifica un registro del indexdb
	 */
	borrar(id:number){
		const request = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").delete(id)

		request.onsuccess = () =>{
			this.obtenerRegistro();
		}
	}
	/**
	 * Hace la conexion con el index db
	 */
	conexionBD():void{
		window.indexedDB
		if(window.indexedDB){
		
			const respuesta=indexedDB.open("Videojuegos",1);
		
			respuesta.onsuccess=(event:any)=>{
				
				this.baseDatos=event.target.result
				
				
				
				this.obtenerRegistro()
			}
			respuesta.onerror=()=>{
				console.log('ERROR');
			}
			respuesta.onupgradeneeded=(evt:any)=>{
				
				this.baseDatos=evt.target.result
				this.baseDatos.createObjectStore('videojuegos',{keyPath:'id', autoIncrement:true}).createIndex('nombreIndex', 'nombre')
				
			}
		}	
	}
	
	/**
 * Retorna la lista de datos del modelo
 * @returns this.lista
 */
	getDatos():[]{
		return this.lista
	}
}