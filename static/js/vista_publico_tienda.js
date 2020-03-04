document.addEventListener("DOMContentLoaded", function(){

	//Para cargar la pagina de vista_tienda del publico


    //******************************INFO DE LA PAGINA*************************************
    //var pedidoURL = 'http://localhost:8000/unt';  //La direccion de donde viene el pedido
    var pedidoURL = '/unt'; //asi funciona en pythonanywhere
    var pedido = new XMLHttpRequest();
    pedido.open('GET', pedidoURL);
    pedido.responseType = "json";
    pedido.send();
    var info_tienda; //va a ser el arreglo de json
    //Json de una sola tienda ------> archivoLista[0] siempre.


    //*****************************INFO PRODUCTOS DE ESTA TIENDA***************************
    var pedido2URL = 'http://localhost:8000/producto';  //La direccion de donde viene el pedido
    var pedido2URL = '/producto';//asi funciona en pythonanywhere

    var pedido2 = new XMLHttpRequest();
    pedido2.open('GET', pedido2URL);
    pedido2.responseType = "json";
    pedido2.send();
    var info_productos; //va a ser el arreglo de json


    //******************************** USO LOS ARREGLOS DEL JSON ***************************

    //Respecto a la tienda
    pedido.addEventListener("load", function(){
        //Coloco los datos en el html
        info_tienda = pedido.response; //es un arreglo formado por los productos

        //Coloca nombre
        var colocar_nombre = document.querySelector('#nomb_tienda');
        colocar_nombre.textContent = info_tienda[0].nombre_tienda;

        //Colocar dir
        var colocar_direccion = document.querySelector('#carga_direccion');
        colocar_direccion.textContent = info_tienda[0].direccion_tienda;

        //Colocar cat
        var colocar_categoria = document.querySelector('#carga_categoria');
        colocar_categoria.textContent = info_tienda[0].categoria_tienda;

        //Colocar cel
        var colocar_celular =document.querySelector('#carga_celular');
        colocar_celular.textContent = info_tienda[0].contacto;

        //Colocar correo
        var colocar_correo = document.querySelector('#carga_correo');
        colocar_correo.textContent = info_tienda[0].correo_electronico;

        //Colocar img
        var colocar_imagen = document.querySelector('#carga_img');
        colocar_imagen.setAttribute("src",info_tienda[0].imagen_portada_tienda);

        var crear_tienda = document.querySelector('#href_crear');
        crear_tienda.setAttribute("href",/publico/+info_tienda[0].id_tienda)

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

            var div_mudo = document.createElement('div');
            div_mudo.setAttribute("class", "card-footer text-muted");
            div_mudo.textContent ="Para saber más sobre el producto visita esta tienda o contáctate con ella" ;

            div_contenedor.appendChild(div_mudo);

        };
    });
});
