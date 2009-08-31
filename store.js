/// Bases de datos para javascript

AppproxyUrl = "http://lab.fauno.org/dataev/server";

Ev.getStore = function(record){
	var store = Ev.var.stores[record.data.ref];
	if (store) {return store;};
	//~ store = new storeFromRecord(record);
	store = new Ev.store({objref: record.data.ref,
    	readerfields: Ev.getContainerFields(record.data.objclass),
					});
	Ev.var.stores[record.data.ref] = store;
	store.load();
	return store;
}
Ev.containerfields = {
	any : [
       {name: 'ref'},
       {name: 'range', type: 'float'},
       {name: 'value', type: 'float'},
       {name: 'start', type: 'float'},
       //~ {name: 'start'},
       {name: 'duration', type: 'float', convert: function(value,record) {
			// convierte el string leido evaluando el string y asegura tipo numero
       				nval=eval(value) + 0 ;
					return nval ;
    				},
       },
       {name: 'track', type: 'float'},
       {name: 'objclass'},
       {name: 'data'},
	],
};

Ev.getContainerFields= function (objclass){
	return (Ev.containerfields[objclass] || Ev.containerfields['any'] );
};
Ev.store = Ext.extend(Ext.data.Store, {
	// proxy y reader son funcion de los parametros de creacion
    proxyurl: AppproxyUrl,
    //~ objref: 'root',
    //~ readerfields: Ev.getContainerFields('any'),
	constructor: function(conf) {
		return new Ext.data.Store(Ext.apply(this,{
			proxy : new Ev.CrudW2pProxy(this.proxyurl,conf.objref),
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				successProperty: 'success',
				idProperty: 'ref',
				root: 'data',
				}, conf.readerfields),
		}));
    },

    writer: new Ext.data.JsonWriter({
		returnJson: true,
		writeAllFields: false,
	}),
	autoSave: true,  // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
    // respuesta del store tras la peticion al proxy: write o excepcion
    showMessages: false, // opcion incluida para poder evitar el mensaje de retorno del store
    listeners: {
        write : function(store, action, result, res, rs) {
        	/**if(store.showMessages) {
            MyDesktop.alertsystem.setAlert(res.success, res.message); // <-- show user-feedback for all write actions
        };**/},
        exception : function(proxy, type, action, options, res, arg) {
            if (type === 'remote') {
                Ext.Msg.show({
                    title: 'REMOTE EXCEPTION',
                    msg: res.message,
                    icon: Ext.MessageBox.ERROR
                });
            };
        }
    },
});

Ev.CrudW2pProxy = Ext.extend(Ext.data.HttpProxy,{
	constructor: function(url,parentref){
		var sufix = '';
		if (parentref){ sufix= '/'+parentref;};
		//~ return new Ext.data.HttpProxy({
		return new Ext.data.ScriptTagProxy({   //para urls fuera del mismo dominio
		api: {
			read : url+'/get'+sufix,
			// para otros stores incluir argumento con nombre del parent
			create : url+'/create'+sufix,
			// para otros stores incluir argumento con nombre del parent
			update: url+'/update',
			destroy: url+'/destroy',
		}
		});
	},
});

