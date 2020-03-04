document.addEventListener("DOMContentLoaded", function(){

	//Para cargar la pagina de vista_tienda

    //var pedidoURL = 'http://localhost:8000/unt';  //La direccion de donde viene el pedido
    var pedidoURL = '/unt'; // rut para usar en pytonanywhere
    var pedido = new XMLHttpRequest();

    pedido.open('GET', pedidoURL);
    pedido.responseType = "json";
    pedido.send();

    var archivoLista; //va a ser el arreglo del json - Json de una sola tienda ----> archivoLista[0] siempre.

	//*****************************INFO PRODUCTOS DE ESTA TIENDA***************************
	//var pedido2URL = 'http://localhost:8000/producto';  //La direccion de donde viene el pedido
	var pedido2URL = '/producto';//asi funciona en pew
	var pedido2 = new XMLHttpRequest();
	pedido2.open('GET', pedido2URL);
	pedido2.responseType = "json";
	pedido2.send();
	var info_productos; //va a ser el arreglo de json

    pedido.addEventListener("load", function(){

    	archivoLista = pedido.response; //es un arreglo formado por los datos del json

    	//Coloco nombre
        var nombre_tienda = document.querySelector('#nombre_tienda');
        nombre_tienda.textContent = archivoLista[0].nombre_tienda;

    	//Coloco imagen
        var imagen_tienda = document.querySelector('#imagen_tienda');
        imagen_tienda.setAttribute("src", archivoLista[0].imagen_portada_tienda);
        imagen_tienda.setAttribute("title", "Imagen de fachada de "+ archivoLista.nombre_tienda);

    	//Coloco dirección
    	var direccion_tienda = document.querySelector('#dir_tienda');
    	direccion_tienda.textContent = archivoLista[0].direccion_tienda;

    	//Coloco categoría
    	var categ_tienda = document.querySelector('#cat_tienda');
    	categ_tienda.textContent = archivoLista[0].categoria_tienda;

    	//Coloco contacto
    	var contacto_tienda = document.querySelector('#celu_tienda');
    	contacto_tienda.textContent = archivoLista[0].contacto;

    	//Coloco correo electronico
    	var correo_electronico_tienda = document.querySelector('#correo_tienda');
		correo_electronico_tienda.textContent = archivoLista[0].correo_electronico;

		var redireccionar_formulario = document.querySelector('#formulario_productos');
        ///redireccionar_formulario.setAttribute("href",/carga_producto/+archivoLista[0].id_tienda)
        redireccionar_formulario.setAttribute("href",'/carga_producto')

	});

    //Respecto a los productos
    pedido2.addEventListener("load", function(){

    	info_productos = pedido2.response; //es un arreglo formado por los productos de la tienda
        var cantidad_productos = info_productos.length;

        for (var i = 0; i < cantidad_productos; i++) {

            //donde voy a colocar los productos
            var main = document.querySelector('main');

            //creacion de un producto
            var div_contenedor = document.createElement('div'); //agregue div contenedor al main
            main.appendChild(div_contenedor);

            div_contenedor.setAttribute("class", "card text-center mt-5 ml-3 mr-3");

            var div_prod = document.createElement('div');
            div_prod.setAttribute("class", "card-header");
            div_prod.textContent =" Producto ";

            div_contenedor.appendChild(div_prod); //agrego div_prod al div_contenedor(main)

            //  <div class="card-body">
            var div_datos_producto = document.createElement('div');
            div_datos_producto.setAttribute("class", "card-body");

            div_contenedor.appendChild(div_datos_producto); //agrego div_datos al div_contenedor(main)

            var nombre_h5 = document.createElement('h5');
            nombre_h5.setAttribute("class", "card-title");
            nombre_h5.textContent = info_productos[i].nombre_producto;

            div_datos_producto.appendChild(nombre_h5); //agrego nombre a div_datos(div_contenedor(main))

            var p_precio = document.createElement('p');
            p_precio.setAttribute("class", "card-text");
            p_precio.textContent = "Precio: $ " + info_productos[i].precio_producto;
            div_datos_producto.appendChild(p_precio); //agrego precio a div_datos(div_contenedor(main))

            var imagen_producto = document.createElement('img');
            imagen_producto.setAttribute("class", "imagenes_prod");
            var direccion_imagen = info_productos[i].imagen_producto;
            imagen_producto.setAttribute("src", direccion_imagen);

            div_datos_producto.appendChild(imagen_producto); //agrego img_prod a div_datos(div_contenedor(main))


            var div_mudo = document.createElement('a');
            div_mudo.setAttribute("class", "float-right btn btn-outline-success ml-3" );
            div_mudo.setAttribute("id", "editar_prod")
            div_mudo.setAttribute("href",/editar_producto/+info_productos[i].id_producto);
            div_mudo.textContent ="Editar" ;
            div_contenedor.appendChild(div_mudo);
        };
    });
});
