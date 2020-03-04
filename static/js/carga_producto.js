document.addEventListener("DOMContentLoaded", function(){



    //var pedidoURL = 'http://localhost:8000/productoeditar';  //La direccion de donde viene el pedido
    var pedidoURL = '/productoeditar';//direccion para usar en pythonanywhere
    var pedido = new XMLHttpRequest();

    pedido.open('GET', pedidoURL);
    pedido.responseType = "json";
    pedido.send();

    var archivoLista;


	//var pedido2URL = 'http://localhost:8000/producto';  //La direccion de donde viene el pedido
	var pedido2URL = '/producto';//direccion para usar en pythonanywhere
	var pedido2 = new XMLHttpRequest();
	pedido2.open('GET', pedido2URL);
	pedido2.responseType = "json";
	pedido2.send();
	var info_productos; //va a ser el arreglo de json

    pedido.addEventListener("load", function(){

    	archivoLista = pedido.response;

        var nombre_tienda = document.querySelector('#nombre_tienda');
        nombre_tienda.textContent = archivoLista[0].nombre_producto;

        var img_prod = document.querySelector('#img_prod');
        img_prod.setAttribute("src", archivoLista[0].imagen_producto);
        img_prod.setAttribute("title", "Imagen de "+ archivoLista.nombre_producto);

    	var descripcion_producto = document.querySelector('#descripcion');
    	descripcion_producto.textContent = archivoLista[0].descripcion_producto;

    	var categ_tienda = document.querySelector('#precio');
    	categ_tienda.textContent = archivoLista[0].precio_producto;

    	var contacto_tienda = document.querySelector('#nombre_producto');
		contacto_tienda.textContent = archivoLista[0].nombre_producto;

		var volver_atras = document.querySelector('#volver');
		volver_atras.setAttribute("href",'/usuario_tienda')


	});

});
