var cont;
var contGanar;
var rellena = [];
function ahorc() {
    cont = 0;
	contGanar = 0;
    inicio();
    x = document.getElementById("psecreto").value;
    tabla = [];
    p=x.split("");
    for (var i = 0; i < p.length ; i++) {
        tabla.push("<div id=\"pc\"></div>");
    }
    document.getElementById("demo").innerHTML = tabla.join("");

    var boton1="<div class=\"bt\" id=\"inc\"><button onclick=\"enviar()\">Reiniciar</button></div>";
    document.getElementById("inc").innerHTML = boton1;
    
    var boton="<div class=\"bt\" id=\"fin\"><button type=\"reset\" onclick=\"ejecuta()\">Enviar</button></div>";
    document.getElementById("fin").innerHTML = boton;
}

function ejecuta() {
    var letra;
    var comprueba = false;
    console.log("Contador derrota: "+cont);
	console.log("Contador ganar: "+contGanar);
    var imagenes = [text1="<img src=\"./img/1fallo.jpg\">",text2="<img src=\"./img/2fallo.jpg\">",text3="<img src=\"./img/3fallo.jpg\">",text4="<img src=\"./img/4fallo.jpg\">",text5="<img src=\"./img/5fallo.jpg\">",text6="<img src=\"./img/6fallo.jpg\">",text7="<img src=\"./img/perdiste.jpg\">"];
    letra = document.getElementById("pletra").value;
    console.log("letra introducida: "+letra);
	
    for(var i = 0;i <= tabla.length;i++){
        if(letra == p[i]){
			rellena.push(letra);
			if(rellena.indexOf(letra)>=0){
			console.log("letras array: "+rellena,rellena.indexOf(letra));
            tabla[i]=("<div id=\"pc\"><p id=\"l\">"+p[i]+"</p></div>");
            comprueba = true;
			contGanar ++;
			}
        }
    }
    if(comprueba == false){
        document.getElementById("img").innerHTML="<div id=\"img\">"+imagenes[cont]+"</div>";
        cont++;
    }
	
	if(contGanar == tabla.length){
		var ganar = "¡HAS GANADO!";
		 document.getElementById("fin").innerHTML = ganar;
	}
	
    if(cont == 7){
        var boton = "No hay mas Intentos";
        document.getElementById("fin").innerHTML = boton;
    }
    document.getElementById("demo").innerHTML = tabla.join("");
}

function inicio() {
    var text="<img src=\"./img/inicio.jpg\">";
    document.getElementById("img").innerHTML="<div id=\"img\">"+text+"</div>";
}
   function enviar() {
       var boton3="<div class=\"ps\"><input type=\"text\" type=\"reset\" id=\"psecreto\" placeholder=\"Palabra Secreta \" maxlength=\"20\"></div>" +
           "<div class=\"bt\"><button type=\"reset\" onclick=\"ahorc()\" >Enviar</button></div>";
       document.getElementById("inc").innerHTML = boton3;
       document.getElementById("demo").innerHTML ="<div id=\"caja\"><div id=\"demo\"></div></div>";
	   inicio();
	   
   }
