angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	
	var numpantalla="0"; //guardar número en pantalla
	var iniciopantalla=1; //iniciar número en pantalla: 1=si; 0=no;
	var coma=0; //estado coma decimal 0=no, 1=si;
	var noculto=0; //número oculto o en espera.
	var op="no"; //operación en curso; "no" =  sin operación.
	
	$scope.numeroactual="0";
	
	$scope.numero = function(valor) {  //recoge el número pulsado en el argumento.
	   console.log(valor+"-"+numpantalla+"-"+iniciopantalla+"-"+coma);
	   
	   if (numpantalla=="0" || iniciopantalla==1  ) { // inicializar un número, 
       		$scope.numeroactual=valor; //mostrar en pantalla
            numpantalla=valor; //guardar número;
            if (valor==".") { //si escribimos una coma al principio del número
               $scope.numeroactual="0."; //escribimos 0.
               numpantalla=valor; //guardar número
               coma=1; //cambiar estado de la coma
               }
      	}
       	else { //continuar escribiendo un número
               if (valor=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
                   $scope.numeroactual+=valor;
                   numpantalla+=valor;
                   coma=1; //cambiar el estado de la coma  
               }
              //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (valor=="." && coma==1) {} 
               //Resto de casos: escribir un número del 0 al 9: 	 
               else {
                   $scope.numeroactual+=valor;
                   numpantalla+=valor
               }
       }
       iniciopantalla=0 //el número está iniciado y podemos ampliarlo.
	};
	
	$scope.operar =function (operacion) {
		 $scope.igualar(); //si hay operaciones pendientes se realizan primero
         noculto=numpantalla; //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=operacion; //guardamos tipo de operación.
         iniciopantalla=1; //inicializar pantalla.
    };
	
	$scope.igualar= function() {
         if (op=="no") { //no hay ninguna operación pendiente.
            $scope.numeroactual=numpantalla;	//mostramos el mismo número	
            }
         else { //con operación pendiente resolvemos
            var sl=noculto+op+numpantalla; // escribimos la operación en una cadena
            var sol=eval(sl) //convertimos la cadena a código y resolvemos
            $scope.numeroactual=sol //mostramos la solución
            numpantalla=sol; //guardamos la solución
            op="no"; //ya no hay operaciones pendientes
            iniciopantalla=1; //se puede reiniciar la pantalla.
            }
    };
	
	$scope.raizc=function() {
         numpantalla=Math.sqrt(numpantalla) //resolver raíz cuadrada.
         $scope.numeroactual=numpantalla; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         iniciopantalla=1; //se puede reiniciar la pantalla 
    };
	
	$scope.porcent=function() { 
         numpantalla=numpantalla/100; //dividir por 100 el número
         $scope.numeroactual=numpantalla; //mostrar en pantalla
         $scope.igualar(); //resolver y mostrar operaciones pendientes
         iniciopantalla=1; //reiniciar la pantalla
    };
	
	$scope.opuest=function() { 
		console.log(numpantalla);
		var nx=Number(numpantalla); //convertir en número
		console.log(nx);
		nx=-nx; //cambiar de signo
		console.log(nx);
		numpantalla=String(nx); //volver a convertir a cadena
		$scope.numeroactual=numpantalla; //mostrar en pantalla.
		console.log(numpantalla);
    };
	
	$scope.inve=function() {
         var nx=Number(numpantalla);
         nx=(1/nx);
         numpantalla=String(nx);		 
         $scope.numeroactual=numpantalla;
         iniciopantalla=1; //reiniciar pantalla al pulsar otro número.
    };
	
	$scope.retro=function(){ //Borrar sólo el último número escrito.
         var cifras=numpantalla.length; //hayar número de caracteres en pantalla
         var br=numpantalla.substr(cifras-1,cifras);//info del último caracter
         numpantalla=numpantalla.substr(0,cifras-1); //quitar el ultimo caracter
         if (numpantalla=="") {numpantalla="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=0;} //Si hemos quitado la coma, se permite escribirla de nuevo.
         $scope.numeroactual=numpantalla; //mostrar resultado en pantalla	 
    };
	
	$scope.borradoParcial=function() {
        $scope.numeroactual=0; //Borrado de pantalla;
        numpantalla=0; //Borrado indicador número pantalla.
        coma=0; //reiniciamos también la coma					
    }
	
	$scope.borradoTotal=function() {
         $scope.numeroactual=0; //poner pantalla a 0
         numpantalla="0"; //reiniciar número en pantalla
         coma=0; //reiniciar estado coma decimal 
         noculto=0; //indicador de número oculto a 0;
         op="no"; //borrar operación en curso.
    }
	
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
