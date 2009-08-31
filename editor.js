Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';

//Sólo representa objetos, no muestra ni mensajes y tampoco tendrá botones para la creación de objetos.
// Sólo sirve para guardar y los listeners para métodos como zoom
///Proposito de debug
var Ev ={ // utilizamos como namespace
	var: {
		/** Algunas variables de aplicación
 		*/
		//~ tests: [],
		stores: [],
		editors: [],
		items: []
	},
}
Ev.create = function(){
	console.log('entro');
	var pru = new Ev.editor();
	console.log(pru);
	}

renderizado = function(a){
	console.log('a');
};

Ev.dimBox = function(dimConf){
	this.dimConf = dimConf;
	this.xoffset = this.dimConf[0]; //valor al que corresponde left: 0px
	this.xscale = this.dimConf[1];  // variable para zoomx
	this.ymin = this.dimConf[2];
	this.ymax = this.dimConf[3]; //valor al que corresponde top: 0px
	this.anchorGrid = this.dimConf[4];  // variable para zoomy
	};
		
Ev.editor = function(config){
	this.store =  Ev.getStore(this.Record);	
	this.dim = new Ev.dimBox(this.dimConf);	
	//this.store.load();
	this.items = new Ev.noteViewer({dim:this.dim,store:this.store});
	
	//Cada vez que cree un objeto grita
	this.ObjetoCreado = function(obj){
		console.log(id + 'eureca');
		obj.on('cambiado',this.guardando);
		};
	this.items.on('CreateRobj',this.ObjetoCreado);
	Ext.apply(this,config);
	Ev.editor.superclass.constructor.call(this);	
	};

Ext.extend(Ev.editor,Ext.Panel,{
	dimConf: [0,10,24,10,100],
	Record: {data: { ref: "root",objclass:"note"}},
	guardando: function(obj){
		return null;
		},
	layout: 'absolute',
	renderTo: 'divrender',
	width: 10000,
    height: 1000
	
});

/**

Ev.edtior = Ext.extend(Ext.panel,
layout:

 
## Constructor del editor 
 init: 
 ## Objeto para hacer transparente el guardado
 //Esto puede ser modificado cambiando el config, al crear el objeto
 this.store = new Ev.store
// Al inicializar coje de store todas las notas y equ guardadas
addNote: // Crea la nota objeto de Ev.note
//Son agregadas por defecto al equi 'parent'
note = new Ev.note
store.saveNote = note
autoSave: // Que se ejecute cada x segundos
zoom:
addEqu:
setEqu:
**/
