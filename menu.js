//Sirve para interectuar con Ev.editor, pero no al revés. Por lo cual recibe cómo parámetro de config
//El objeto que apunta a Ev.editor

Ev.menuNote = function(obj){
	var a = new Ext.menu.Menu({
					id: 'editMenuNote',
					style: {
						overflow: 'visible'     // For the Combo popup
					},
					items: [
					{
						text: 'Configurar',
						// SUBMENU habria que especificar la clase de lo que se quiere añadir...note, sequence..

						iconCls: 'menu-config',
						//~ handler: panel.onAdd,
						//~ scope: panel, // es la forma de decirle al handler quien es cuando dice this
						handler: function(){Ev.mensaje.debug('Apretaste a config');}			
					},
					{
						text: 'Borrar',
						// SUBMENU habria que especificar la clase de lo que se quiere añadir...note, sequence..

						iconCls: 'menu-config',
						//~ handler: panel.onAdd,
						//~ scope: panel, // es la forma de decirle al handler quien es cuando dice this
						handler: function(){obj.fireEvent('borrar',obj.record,obj);},
						scope:obj			
					}]
	});
		Ev.mensaje.debug(a);
	return a; 
};
Ev.menuPanel = function(obj){
	var b;
	return b;
};
