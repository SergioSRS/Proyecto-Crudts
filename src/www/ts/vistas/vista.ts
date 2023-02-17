/**
	@file Contiene la vista de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista.
	Debería ser abstracta.
**/
export class Vista {
	div: HTMLElement;
  
	/**
	  Constructor de la clase
	**/
	constructor(div: HTMLElement) {
	  this.div = div;
	}
  
	/**
	  Muestra u oculta el div principal de la vista.
	  @param ver {boolean} True muestra la vista y false la oculta.
	**/
	mostrar(ver: boolean): void {
	  if (ver) {
		this.div.style.display = 'block';
	  } else {
		this.div.style.display = 'none';
	  }
	}
  }
