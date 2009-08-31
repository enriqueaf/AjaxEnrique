

///Sólo sirve para debug

termine = function(a,b,c){
	console.log('termine');
	};

/* 
 * Añadido {evento: endDrag } el cual se encagará de llamar al store.
 * Esta función por ahora sólo necesita de pasar el id del objeto a convetir en nota
 * Se encargará de la creación del objeto, Ev.editor, para mejor resolución de la id
 * 
 * Listener: endDrag
 * Ejem: new Ev.note();
 * Se puede configurar todos lo parámetro de Ext.resizable más anchorGrid y debug.
 * 
 * 
 * */
/// Ev.note, creador de notas musicales

Ev.noteViewer= function(config){
		Ext.apply(this,config);
		this.tpl.dim = this.dim;
		this.refresh = function(){
			Ev.noteViewer.superclass.refresh.call(this);
			// Cada vez que se recarge se borra this.robjects
			this.robjects = [];
		};
		this.addEvents('CreateRobj');
		//this.on('click',termine);
		Ev.noteViewer.superclass.constructor.call(this);


};



Ext.extend(Ev.noteViewer,Ext.DataView,{
	store: null,
	dim: new Ev.dimBox([0,10,24,10,100]),
	tpl: new Ext.XTemplate(
    	'<div id="editor-gviewer">', 
		'<tpl for=".">',
		'<tpl if="objclass==\'note\'">', // solo para notes
				'<div class="notebox " id="{[values.ref]}" style="position: absolute; ',
				
				//~ '{[Ev.htmlbox(values.start,values.duration,values.value,values.range)]}', //no permite llamar funciones dentro del contenido
				'left: {[Math.round((values.start - this.dim.xoffset ) * this.dim.xscale)]}px; ',
				'width: {[Math.round(values.duration * this.dim.xscale) ]}px; ' ,
				'height: {[Math.round(this.dim.yscale) ]}px; ' ,
				'top: {[Math.round((values.value/10) * this.dim.anchorGrid) ]}px; ' ,

				'">',
				
				'@({start},{duration}) {ref}:{value}',

				'</div>',
				//'{[ this.crearMovible("nbox_"+values.ref)]}',
		'</tpl>',
		'</tpl>',
		'</div>',{
			//~ htmlbox : Ev.htmlbox,
		}),
	layout: 'absolute',
	robjects: {}, // hash de los objetos representantes por su id 
	robjectTypes:{
		note: Ev.note ,
	},	
	listeners: {
		 beforeclick: function(dv,index,node,e){
		 	//~ crear el robject si se hace click y éste no existe, es más económico de recursos
		 	var id = node.id ;
                    if(node.className.search('resizable') < 0){
						console.log(id);
						record = this.store.getById(id);
                    	this.createRobject(id,record);
					};
				},
			},
	createRobject: function(id,record){
		this.robjects[id] = new Ev.note(record);
		//Fire CreateRobj para poder añadir los handle a las notas para poder guardar
		this.fireEvent('CreateRobj',this.robjects[id]);
	}
});
			



Ev.note = function(record,config){
	Ext.apply(this,config);
	el =  record.data.ref;
	this.record = record;
	this.dd = new Ext.dd.DD(el);
	this.addEvents('endDrag','cambiado');
	//Para poder llamar a la función padre
	var padre = this;
	this.cambiando = function(){
		this.fireEvent('cambiado',this);
		};
	// Tamaño del grid
	this.dd.anchorGrid = this.anchorGrid;
	//Modificando el funcionamiento por defecto de un DD
	this.dd.endDrag = function() {
			var dragEl = Ext.get(this.getDragEl());
			var el = Ext.get(this.getEl());
			var viewport = dragEl.getXY();
			//Creando el grid
			if(padre.debug){console.log(viewport[1]);};
			viewport[1] = parseInt(viewport[1]/this.anchorGrid)*this.anchorGrid;
			if(padre.debug){console.log(viewport[1]); };          
			el.applyStyles({position:'absolute'});
			el.setXY(viewport);
			el.setWidth(dragEl.getWidth());
			// Para poder guardar cada vez que termine un drag.
			padre.fireEvent('endDrag',this);
			};
	// Parametros obligatorios para Ext.resizable		
	this.handles = 'e,w';
	this.draggable = false;
	this.on('endDrag',this.cambiando);
	this.on('resize',this.cambiando);
	Ev.note.superclass.constructor.call(this,el);
};

Ext.extend(Ev.note, Ext.Resizable,{
	anchorGrid: 100,
	dynamic: true,
	pinned: false,
	
	});









