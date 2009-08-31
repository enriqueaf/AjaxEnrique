/**
  * Application Layout
  * by Jozef Sakalos, aka Saki
  * http://extjs.com/learn/Tutorial:Application_Layout_for_Beginners
  */
 
// reference local blank image
Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';
 
// create namespace
Ext.namespace('Umculu');
 
// create application


Umculu = function() { 
var movible;
return{
	
	init: function(){
		var a = this.objetos('mueve');
		var b = this.objetos('otro');
		this.overriteDD(b);
				},
	
//privado
	objetos: function(el) {
		movible = new Ext.Resizable(el, );

		return movible;
	
	
	},
       
	overriteDD: function(x){
			.
	}
};
}();

// end of file
