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
		items: [],
		debug: true
	},
}




renderizado = function(a){
	Ev.mensaje.debug(a);
};
Ev.create = function(){
	new Ext.Viewport({
		title: 'Visor para el editor',
		items: new Ev.editor({region:'center'}),
		renderTo: 'contenido',
		layout:'border',
		hidden:false
		//autoShow: true
	});
setTimeout(function(){
	Ext.get('loading').remove();
	Ext.get('loading-mask').fadeOut({remove:true});
 }, 250); 
}
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
	//Cada vez que cree un objeto grita
	
	this.editor = new Ev.noteViewer({store:this.store,region:'center'})
	var padre = this;
	this.borrar= function(record){
		//Forma cutre para borrar el DOM
	Ext.get(record.data.ref).remove();
	padre.store.remove(record);
	};
	this.zoom = function(event,toolEl,panel,tc){
		Ev.mensaje.debug(tc);
		if(tc.id=='up'){
			this.editor.dim.xscale= this.editor.dim.xscale *2;
			this.store.load();
		};
		if(tc.id=='down'){
			this.editor.dim.xscale= this.editor.dim.xscale / 2;
			this.store.load();
		};
		}
	this.items = this.editor;
	
	this.tools= [
		{id: 'up',
		handler: this.zoom,
		scope: this},
		{id: 'down',
		handler: this.zoom,
		scope: this}
		];
	this.guardar = function(obj){
		padre.store.save();
		}
	this.ObjetoCreado = function(obj){
		obj.on('cambiado',padre.guardar,this);
		obj.on('borrar',padre.borrar,this);
	};
	this.editor.on('CreateRobj',this.ObjetoCreado);
	Ext.apply(this,config);
	
	Ev.editor.superclass.constructor.call(this);	
	};

Ext.extend(Ev.editor,Ext.Panel,{
	dimConf: [0,10,24,10,100],
	Record: {data: { ref: "root",objclass:"note"}},
	guardando: function(obj){
		return null;
		},
	layout:'border',
	title: 'Editor',
	autoScroll: true,
	renderTo: 'contenido'
	
	
	
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
