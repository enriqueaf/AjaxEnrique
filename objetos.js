

///Sólo sirve para debug

termine = function(a,b,c){
	Ev.mensaje.log('termine');
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
		// No interesa que actualize, demomento.
		this.onUpdate = function(ds, record){
			Ev.noteViewer.superclass.onUpdate.call(this,ds,record);
			this.createRobject(record.data.ref,record);
			Ev.mensaje.debug('Creando Objeto');
			};
		this.refresh = function(){
			Ev.noteViewer.superclass.refresh.call(this);
			// Cada vez que se recarge se borra this.robjects
			Ev.mensaje.debug('Actualizando DataView')
			this.robjects = [];
		};
		this.addEvents('CreateRobj');
		//this.on('click',termine);
		Ev.noteViewer.superclass.constructor.call(this);


};



Ext.extend(Ev.noteViewer,Ext.DataView,{
	store: null,
	//loadingText:'Cargando...',
	dim: new Ev.dimBox([0,10,24,10,30]),
	tpl: new Ext.XTemplate(
    	'<div id="editor-gviewer">', 
		'<tpl for=".">',
		'<tpl if="objclass==\'note\'">', // solo para notes
				'<div class="notebox " id="{[values.ref]}" style="position: absolute;',
				
				//~ '{[Ev.htmlbox(values.start,values.duration,values.value,values.range)]}', //no permite llamar funciones dentro del contenido
				'left: {[Math.round((values.start - this.dim.xoffset ) * this.dim.xscale)]}px; ',
				'width: {[Math.round(values.duration * this.dim.xscale) ]}px; ' ,
				'height: {[Math.round(this.dim.anchorGrid) ]}px; ' ,
				'top: {[Math.round((values.value) * this.dim.anchorGrid) ]}px; ' ,

				'">',
				
				'@({start},{duration}) {ref}:{value}',

				'</div>',
				//'{[ this.crearMovible("nbox_"+values.ref)]}',
		'</tpl>',
		'</tpl>',
		'</div>',{
			//~ htmlbox : Ev.htmlbox,
		}),
	robjects: {}, // hash de los objetos representantes por su id 
	robjectTypes:{
		note: Ev.note ,
	},
	itemSelector: 'div.notebox',
	listeners: {
		 beforeclick: function(dv,index,node,e){
		 	//~ crear el robject si se hace click y éste no existe, es más económico de recursos
		 	var id = node.id ;
                    if(!this.robjects[id]){
						Ev.mensaje.debug(id);
						record = this.store.getById(id);
						Ev.mensaje.debug(this.store);
                    	this.createRobject(id,record);
					};
				},
			},
	createRobject: function(id,record){
		if(this.robjects[id]){
			this.robjects[id].dd.destroy(true);
			this.robjects[id].destroy(true);};
		this.robjects[id] = new Ev.noteController(record,this.dim);
		Ev.mensaje.debug(this.robjects[id]);
		//Fire CreateRobj para poder añadir los handle a las notas para poder guardar
		this.fireEvent('CreateRobj',this.robjects[id]);
	}
});
			



Ev.noteView = function(el,dim,config){
	Ext.apply(this,config);
	this.record = record;
	this.dd = new Ext.dd.DD(el,{scroll:true});
	this.addEvents('endDrag');
	//Para poder llamar a la función padre
	var padre = this;
	// Tamaño del grid
	//Modificando el funcionamiento por defecto de un DD
	this.dd.endDrag = function() {
			var dragEl = Ext.get(this.getDragEl());
			var el = Ext.get(this.getEl());
			var viewport = dragEl.getXY();
			//Creando el grid
			Ev.mensaje.debug(viewport[1]);
			viewport[1] = (parseInt((viewport[1] - padre.dim.ymin)/padre.dim.anchorGrid)*padre.dim.anchorGrid)+padre.dim.ymin;
			Ev.mensaje.debug(viewport[1]);          
			el.applyStyles({position:'absolute'});
			el.setXY(viewport);
			el.setWidth(dragEl.getWidth());
			// Para poder guardar cada vez que termine un drag.
			padre.fireEvent('endDrag',this);
			};
	// Parametros obligatorios para Ext.resizable		
	this.handles = 'e,w';
	this.draggable = false;
	Ev.noteView.superclass.constructor.call(this,el);
};

Ext.extend(Ev.noteView, Ext.Resizable,{
	anchorGrid: 100,
	dynamic: true,
	pinned: false,
	
	});


Ev.noteController = function(record,dim,config){
	el = record.data.ref;
	Ev.mensaje.debug(el);
	//Boton Derecho
	this.menu =	Ev.menuNote(this);
	Ext.get(el).on('contextmenu',function(e){e.preventDefault();
	Ev.mensaje.debug(e);
	this.menu.showAt(e.getXY());},this);
	this.dim=dim;
	this.record = record;
	this.addEvents('cambiado','borrar');
	this.cambiando = function(){
		var cEl = Ext.get(el);
		var situacion = cEl.getXY();
		this.record.set('duration',cEl.getWidth()/this.dim.xscale);
		this.record.set('start',(situacion[0] + this.dim.xoffset)/this.dim.xscale);
		this.record.set('value',(situacion[1] - this.dim.ymin )/ this.dim.anchorGrid);
		///Proposito de debug
		Ev.mensaje.log('Data.Duration:' + this.record.data.duration + ' Real:' + Ext.get(el).getWidth());
		Ev.mensaje.log('Data.Start:' + this.record.data.start);
		Ev.mensaje.log('Data.value:' + this.record.data.value);
		
		
		this.record.commit();
		this.fireEvent('cambiado',this);
		
	};
	this.on('resize',this.cambiando,this);
	this.on('endDrag',this.cambiando,this);
	Ev.noteController.superclass.constructor.call(this,el);
	
};
Ext.extend(Ev.noteController,Ev.noteView,{
	//Estos son los eventos que modifican el objto el objeto
	EventMod: {
		endDrag:['start','value'],
		resize:['duration']	
	}

});








