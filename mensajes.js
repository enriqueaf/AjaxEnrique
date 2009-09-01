//Clase para la presentación de los mensajes. Ejm: Firebug, Desktop ...
Ev.mensaje = {};
Ev.mensaje.debug = function(a){
	if(Ev.var.debug){console.log(a)};
};
Ev.mensaje.log = function(a){
	console.log(a);
};
Ev.mensaje.error = function(a){
	console.log(a);
};
