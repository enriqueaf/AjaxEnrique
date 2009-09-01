// Creador oficial del app, este se encargará de poner en funcionamiento a Ev.editor y Ev.menu
// Además servirá como constructor para ambas clases

Ev = {};
Ev.create = function(){
     var viewport = new Ev.Visor();

  }
Ev.Visor = function(config){
	Ev.Visor.initComponent.call(this);
	};
	

Ext.extend(Ev.Visor,Ext.Viewport, {
		    layout: 'border',
    items:[
     {
      region: 'west',
      contentEl: 'navigation',
      title: 'Explorer',
      split:true,
      width: 200,
      minSize: 50,
      maxSize: 400,
      collapsible: false
     },
     {
      region: 'center',
      contentEl: 'main-content',
      title: 'Viewer',
      minSize: 100,
      collapsible: false,
      margins:'0 0 0 0'
     }
    ]
	});
