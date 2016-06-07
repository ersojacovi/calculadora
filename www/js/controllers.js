angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	
	var numpantalla="0"; //Save screen number
	var iniciopantalla=1; //Reinicialize screen number: 1=yes; 0=no;
	var coma=0; //Decimal point 0=no, 1=yes;
	var noculto=0; //Hidden number or waiting.
	var op="no"; //Doing an operation; "no" =  no operation.
	
	$scope.numeroactual="0";
	
	// -------------------------------------------------------------------------------
	$scope.numero = function(valor) {  //Get number clicked in the argument.
	   console.log(valor+"-"+numpantalla+"-"+iniciopantalla+"-"+coma);
	   
	   if (numpantalla=="0" || iniciopantalla==1  ) { // Inicialize number, 
       		$scope.numeroactual=valor; //Show screen
            numpantalla=valor; //Save number;
            if (valor==".") { //If a decimal point is clicked as first value
               $scope.numeroactual="0."; //Write 0.
               numpantalla=valor; //Save number
               coma=1; //Change point state
               }
      	}
       	else { //Continue writting number
               if (valor=="." && coma==0) { //If a decimal point is clicked for first time
                   $scope.numeroactual+=valor;
                   numpantalla+=valor;
                   coma=1; //Change point state  
               }
              //If we try to put a second point, it does nothing.
               else if (valor=="." && coma==1) {} 
               //Rest of choices: we write a number from 0 to 9: 	 
               else {
                   $scope.numeroactual+=valor;
                   numpantalla+=valor
               }
       }
       iniciopantalla=0 //The number is inicialized and it can be enlarged.
	};
	
	// -------------------------------------------------------------------------------

	$scope.operar =function (operacion) {
		 $scope.igualar(); //If there are operations to do, then do it now
         noculto=numpantalla; //Put the first number in "waiting" to write the second one.
         op=operacion; //Save the type of operation.
         iniciopantalla=1; //Initialize screen.
    };
	
	// -------------------------------------------------------------------------------

	$scope.igualar= function() {
         if (op=="no") { //No operation to do.
            $scope.numeroactual=numpantalla;	//Show the same number	
            }
         else { //con operación pendiente resolvemos
            var sl=noculto+op+numpantalla; // Write the operation in an array
            var sol=eval(sl) //Convert the array to code and evaluate it
            $scope.numeroactual=sol //Show answer
            numpantalla=sol; //Save answer
            op="no"; //No opertations to do
            iniciopantalla=1; //Reinitialize screen.
            }
    };
	
	// -------------------------------------------------------------------------------
	
	$scope.raizc=function() {
         numpantalla=Math.sqrt(numpantalla) //Resolve Square root.
         $scope.numeroactual=numpantalla; //Show result
         op="no"; //No operations to do.
         iniciopantalla=1; //Reinitialize screen. 
    };
	
	// -------------------------------------------------------------------------------
	
	$scope.porcent=function() { 
         numpantalla=numpantalla/100; //divide the number by 100
         $scope.numeroactual=numpantalla; //Show screen
         $scope.igualar(); //resolve and show pending operations
         iniciopantalla=1; //Reinitialize lscreen
    };
	
	// -------------------------------------------------------------------------------
	
	$scope.opuest=function() { 
		//console.log(numpantalla);
		var nx=Number(numpantalla); //Convert the number
		console.log(nx);
		nx=-nx; //Change the sign
		console.log(nx);
		numpantalla=String(nx); //Convert to array again
		$scope.numeroactual=numpantalla; //Show screen.
		//console.log(numpantalla);
    };
	
	// -------------------------------------------------------------------------------

	$scope.inve=function() {
         var nx=Number(numpantalla);
         nx=(1/nx);
         numpantalla=String(nx);		 
         $scope.numeroactual=numpantalla;
         iniciopantalla=1; //Reinitialize screen when click another number.
    };
	
	// -------------------------------------------------------------------------------

	$scope.retro=function(){ //Delete only the last number.
         var cifras=numpantalla.length; //Find number of char on screen
         var br=numpantalla.substr(cifras-1,cifras);//info of last char
         numpantalla=numpantalla.substr(0,cifras-1); //Delete the last char
         if (numpantalla=="") {numpantalla="0";} //If it was the last char, put 0
         if (br==".") {coma=0;} //If it deleted the decimal point, it can be put it again.
         $scope.numeroactual=numpantalla; //Show result	 
    };
	
	// -------------------------------------------------------------------------------

	$scope.borradoParcial=function() {
        $scope.numeroactual=0; //Screen deleted;
        numpantalla=0; //Delete screen number.
        coma=0; //Reinitialize decimal point					
    }
	
	// -------------------------------------------------------------------------------

	$scope.borradoTotal=function() {
         $scope.numeroactual=0; //Put screen to 0
         numpantalla="0"; //Reinitialize screen number
         coma=0; //Reinitialize decimal point	
         noculto=0; //Hidden number to 0;
         op="no"; //Delete actual operation.
    }
	
})

.controller('ChatsCtrl', function($scope) {
})