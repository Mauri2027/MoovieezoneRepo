/* consulta a la api*/
	/* -----------------------------------consultas y key--------------------------
    	5da7b3797402b87f752644e1502c02f5

		https://api.themoviedb.org/3/search/movie?api_key={5da7b3797402b87f752644e1502c02f5}&query=
    	https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
		https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
		https://api.themoviedb.org/3/keyword/{keyword_id}/movies?api_key=<<api_key>>&language=en-US&include_adult=false
		https://api.themoviedb.org/3/discover/movie?api_key=5da7b3797402b87f752644e1502c02f5&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_people=
https://api.themoviedb.org/3/?query="+textSearch+"&language=en
----------------------------------------------------------------------------------------*/
/*------------------------------------------------inicio -------------------------------------------------------------*/
$(document).ready(function(){
    
    var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api.themoviedb.org/3/discover/movie?api_key=5da7b3797402b87f752644e1502c02f5&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_people=",
	"method": "GET",
	"headers": {},
	"data": "{}"
	}
	$.ajax(settings).done(function (response) {
	//console.log(response);
	var resultados=response.results;
	for (var i = 0; i < 10; i++) {
		var ident=resultados[i].id;	
		if (10!=i) {
			/*console.log(resultados[i].backdrop_path);*/
			var $newdiv = $("<div class='imagenesagregadas'class='peli' onclick='mirarInfo(this)'><img class='imagen' src=https://image.tmdb.org/t/p/w500"+resultados[i].poster_path+"><h1 class='titulos'>"+resultados[i].title+"</h1><p class='descripcion'>"+resultados[i].overview+"</p><p class='identificador'>"+ident+"</p><hr></div>")
       		$("#mostrarpelis").append($newdiv);
        }
	}
})
});		
     	




/*---------------------------------------busqueda para el inicio------------------------------------------*/
var historial=[];

function searchmoviee(textoparabuscar){
    //$("#botonbuscar").click(function(){
    	
    	$("#botonesHistorial").empty();
    	$("#mostrarpelis").empty();
    	var settings = {
    	"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/search/movie?api_key=5da7b3797402b87f752644e1502c02f5&page=1&query="+textoparabuscar,
		"method": "GET",
		"headers": {},
		"data": "{}"
		}
		$.ajax(settings).done(function (response) {
			console.log(response);
			setHistorial(textoparabuscar);
			var resultados=response.results;
			
			for (var i = 0; i <10; i++) {
				var ident=resultados[i].id;	
				if (10!=i) {
					var $newdiv = $("<div class='imagenesagregadas'class='peli' onclick='mirarInfo(this)'><img class='imagen' src=https://image.tmdb.org/t/p/w500"+resultados[i].poster_path+"><h1>"+resultados[i].title+"</h1><p class='descripcion'>"+resultados[i].overview+"</p><p class='identificador'>"+ident+"</p><hr></div>")
                    $("#mostrarpelis").append($newdiv);
                    }
			}
			console.log(historial);
			for (var a = 0; historial.length>a; a++){
				if (a<6) {
					var $newdiv1 = $("<div class='divbotonhistorial'><button class='botonH' type='button' onclick=buscarBoton('"+historial[a]+"')>"+historial[a]+"</button></div>")
					$("#botonesHistorial").append($newdiv1);

				}
			}

		})

}     

/*----------------------descripcion completa------------------------------------------------------------*/
 function closeDescription(){
    $("#descriptiontotal").remove();
}

function mirarInfo(item){
	$("#mostrarpelis").empty();
	localStorage.clear();
	var ide = item.children[3].textContent;
	//console.log(ide);
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/movie/"+ide+"?api_key=5da7b3797402b87f752644e1502c02f5&language=es",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	}	
	$.ajax(settings).done(function (response) {
		var titulo=response.title;
		var imagen=response.backdrop_path;
		var descripcion=response.overview;
		var genero=response.genres[0].name;
		

		var Obj = function(imagen,titulo,genero,descripcion){
            this.imagen = imagen;
            this.genero=genero;
            this.titulo = titulo;
            this.descripcion = descripcion;
        }
		var items= new Obj(imagen,titulo,genero,descripcion)
		localStorage.setItem('items',JSON.stringify(items))

		var $newdiv2 = $("<div class='peliculaelegida'><img class='imagendescripcioncompleta' src=https://image.tmdb.org/t/p/w500"+imagen+"><h1>"+titulo+"</h1><h2>"+genero+"</h2><p class='descripcion'>"+descripcion+"</p><button class='compartir' onclick=window.location.href='compartir.html' type='button'>Compartir</button></div>")
        $("#contenidos").prepend($newdiv2);

		
	});
}	


/*------------------------------------local storage para historial----------------------------------------------*/

function setHistorial(nombre){
	historial.push(nombre);
}


function buscarBoton(rebuscar){
    	
    	//$("#botonesHistorial").empty();
    	$("#mostrarpelis").empty();
    	var settings = {
    	"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/search/movie?api_key=5da7b3797402b87f752644e1502c02f5&page=1&query="+rebuscar,
		"method": "GET",
		"headers": {},
		"data": "{}"
		}
		$.ajax(settings).done(function (response) {
			console.log(response);
			//setHistorial(textoparabuscar);
			var resultados=response.results;
			
			for (var i = 0; i <10; i++) {
				var ident=resultados[i].id;	
				if (10!=i) {
					var $newdiv = $("<div class='imagenesagregadas'class='peli' onclick='mirarInfo(this)'><img class='imagen' src=https://image.tmdb.org/t/p/w500"+resultados[i].poster_path+"><p class='titulos'><h1>"+resultados[i].title+"</h1></p><p class='descripcion'>"+resultados[i].overview+"</p><p class='identificador'>"+ident+"</p><hr> </div>")
                    $("#mostrarpelis").append($newdiv);
                    }
			}

		})
	
}

/*----------------------------------------------------------------------------------------------------------*/



/*--------------------------------------ubicacion---------------------------------------------------*/

function initMap() {
        var uluru = {lat: -34.7748343, lng: -58.2675515};
        var map = new google.maps.Map(document.getElementById('mapa'), {zoom: 16, center: uluru});
        var marker = new google.maps.Marker({position: uluru, map: map});
};