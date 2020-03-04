document.addEventListener("DOMContentLoaded", function(){
    //Coloco inputs dinamicamente para editar los campos

    //Obtengo todos los botones EDITAR
    boton_editar_descripcion = document.querySelector('#editar_descripcion');
    boton_editar_precio = document.querySelector('#editar_precio');
    boton_editar_nombre = document.querySelector('#editar_nombre');
    boton_editar_imagen=document.querySelector('#editar_imagen')




    //Al clickear el boton EDITAR - campo descripcion

    boton_editar_descripcion.addEventListener("click", function(){
        //var pedidoURL = 'http://localhost:8000/productoeditar';  //La direccion de donde viene el pedido
        var pedidoURL = '/productoeditar'
        var pedido = new XMLHttpRequest();

        pedido.open('GET', pedidoURL);
        pedido.responseType = "json";
        pedido.send();

        var archivoLista;
        pedido.addEventListener("load", function(){
        archivoLista=pedido.response;
    	boton_editar_descripcion.disabled=true;

    	var form_descripcion = document.createElement("form");
        form_descripcion.setAttribute("method", "post");
        form_descripcion.setAttribute("action","/editar_producto/"+archivoLista[0].id_tienda_madre+'/'+archivoLista[0].id_producto);

    	var label_editar_descripcion = document.createElement("label");
    	label_editar_descripcion.setAttribute("for", "descripcion");
        label_editar_descripcion.setAttribute("class", "mr-5");
        label_editar_descripcion.setAttribute("class", "pr-4");
        label_editar_descripcion.textContent = "Ingrese nueva descripción ";

        form_descripcion.appendChild(label_editar_descripcion); //Agrego al formulario

        var input_editar_descripcion = document.createElement("input");
        input_editar_descripcion.setAttribute("type", "text");
        input_editar_descripcion.setAttribute("id", "descripcion");
        input_editar_descripcion.setAttribute("name", "descripcion");
        input_editar_descripcion.setAttribute("class", "pl-3");
        input_editar_descripcion.required ="true";

        form_descripcion.appendChild(input_editar_descripcion); //Agrego al formulario

        var boton_descripcion_listo = document.createElement("button");
        boton_descripcion_listo.setAttribute("type", "submit");
        boton_descripcion_listo.setAttribute("class", "btn");
        boton_descripcion_listo.setAttribute("class", "btn-secondary");
        boton_descripcion_listo.setAttribute("class", "btn-sm");
        boton_descripcion_listo.textContent ="Listo";

        form_descripcion.appendChild(boton_descripcion_listo); //Agrego al formulario

        //Boton cancelar edicion
        var boton_descripcion_cancelar = document.createElement("button");
        boton_descripcion_cancelar.setAttribute("type", "button");
        boton_descripcion_cancelar.setAttribute("class", "btn");
        boton_descripcion_cancelar.setAttribute("class", "btn-secondary");
        boton_descripcion_cancelar.setAttribute("class", "btn-sm");
        boton_descripcion_cancelar.textContent = "Cancelar";

        form_descripcion.appendChild(boton_descripcion_cancelar); //Agrego al formulario

        boton_descripcion_cancelar.addEventListener("click", function(){
        	boton_editar_descripcion.disabled=false;
        	form_descripcion.reset();
        	items_descripcion.removeChild(form_descripcion);
        });

        //Agrego al DOM
        var items_descripcion = document.querySelector('#li_descripcion');
        items_descripcion.appendChild(form_descripcion); //Agrego formulario de editar descripcion al 'li' del html
    });
    });
    //Al clickear el boton EDITAR - campo imagen
    boton_editar_imagen.addEventListener("click", function(){

        //var pedidoURL = 'http://localhost:8000/productoeditar';  //La direccion de donde viene el pedido
        var pedidoURL = '/productoeditar';
        var pedido = new XMLHttpRequest();

        pedido.open('GET', pedidoURL);
        pedido.responseType = "json";
        pedido.send();

        var archivoLista;
        pedido.addEventListener("load", function(){
        archivoLista=pedido.response;


    	boton_editar_imagen.disabled=true;

    	var form_imagen = document.createElement("form");
        form_imagen.setAttribute("method", "post");
        form_imagen.setAttribute("enctype","multipart/form-data")
        form_imagen.setAttribute("action","/nueva_imagen_p/"+archivoLista[0].id_producto)

    	var label_editar_imagen= document.createElement("label");
    	label_editar_imagen.setAttribute("for", "imagen");
        label_editar_imagen.setAttribute("class", "mr-5");
        label_editar_imagen.setAttribute("class", "pr-4");
        label_editar_imagen.textContent = "Cargue una nueva imagen ";

        form_imagen.appendChild(label_editar_imagen); //Agrego al formulario

        var input_editar_imagen = document.createElement("input");
        input_editar_imagen.setAttribute("type", "file");
        input_editar_imagen.setAttribute("id", "ruta_imagen");
        input_editar_imagen.setAttribute("name", "ruta_imagen");
        input_editar_imagen.setAttribute("class", "pl-3");
        input_editar_imagen.required ="true";

        form_imagen.appendChild(input_editar_imagen); //Agrego al formulario

        var boton_imagen_listo = document.createElement("button");
        boton_imagen_listo.setAttribute("type", "submit");
        boton_imagen_listo.setAttribute("class", "btn");
        boton_imagen_listo.setAttribute("class", "btn-secondary");
        boton_imagen_listo.setAttribute("class", "btn-sm");
        boton_imagen_listo.textContent ="Listo";

        form_imagen.appendChild(boton_imagen_listo); //Agrego al formulario

        //Boton cancelar edicion
        var boton_imagen_cancelar = document.createElement("button");
        boton_imagen_cancelar.setAttribute("type", "button");
        boton_imagen_cancelar.setAttribute("class", "btn");
        boton_imagen_cancelar.setAttribute("class", "btn-secondary");
        boton_imagen_cancelar.setAttribute("class", "btn-sm");
        boton_imagen_cancelar.textContent = "Cancelar";

        form_imagen.appendChild(boton_imagen_cancelar); //Agrego al formulario

        boton_imagen_cancelar.addEventListener("click", function(){
        	boton_editar_imagen.disabled=false;
        	form_imagen.reset();
        	items_imagen.removeChild(form_imagen);
        });

        //Agrego al DOM
        var items_imagen = document.querySelector('#li_imagen');
        items_imagen.appendChild(form_imagen); //Agrego formulario de editar imagen al 'li' del html
    });
});
     //Al clickear el boton EDITAR - campo precio
    boton_editar_precio.addEventListener("click", function(){
        //var pedidoURL = 'http://localhost:8000/productoeditar';  //La direccion de donde viene el pedido
        var pedidoURL = '/productoeditar';
        var pedido = new XMLHttpRequest();

        pedido.open('GET', pedidoURL);
        pedido.responseType = "json";
        pedido.send();

        var archivoLista;
        pedido.addEventListener("load", function(){
        archivoLista=pedido.response;
    	boton_editar_precio.disabled=true;

    	var form_prec = document.createElement("form");
        form_prec.setAttribute("method", "post");
        form_prec.setAttribute("action","/editar_producto/"+archivoLista[0].id_producto);

    	var label_editar_precio = document.createElement("label");
    	label_editar_precio.setAttribute("for", "precio");
        label_editar_precio.setAttribute("class", "mr-5");
        label_editar_precio.textContent = "Ingrese nuevo précio ";
        label_editar_precio.setAttribute("class", "pr-4");

        form_prec.appendChild(label_editar_precio); //Agrego al formulario

        var input_editar_precio = document.createElement("input");
        input_editar_precio.setAttribute("type", "text");
        input_editar_precio.setAttribute("id", "precio");
        input_editar_precio.setAttribute("name", "precio");
        input_editar_precio.required ="true";

        form_prec.appendChild(input_editar_precio); //Agrego al formulario

        var boton_precio_listo = document.createElement("button");
        boton_precio_listo.setAttribute("type", "submit");
        boton_precio_listo.setAttribute("class", "btn");
        boton_precio_listo.setAttribute("class", "btn-secondary");
        boton_precio_listo.setAttribute("class", "btn-sm");
        boton_precio_listo.textContent ="Listo";

        form_prec.appendChild(boton_precio_listo); //Agrego al formulario

        //Boton cancelar edicion
        var boton_precio_cancelar = document.createElement("button");
        boton_precio_cancelar.setAttribute("type", "button");
        boton_precio_cancelar.setAttribute("class", "btn");
        boton_precio_cancelar.setAttribute("class", "btn-secondary");
        boton_precio_cancelar.setAttribute("class", "btn-sm");
        boton_precio_cancelar.textContent = "Cancelar";

        form_prec.appendChild(boton_precio_cancelar); //Agrego al formulario

        boton_precio_cancelar.addEventListener("click", function(){
        	boton_editar_precio.disabled=false;
        	form_prec.reset();
        	items_precio.removeChild(form_prec);
        });

        //Agrego al DOM
        var items_precio = document.querySelector('#li_precio');
        items_precio.appendChild(form_prec); //Agrego formulario de editar precio al 'li' del html
    });
});

    //Al clickear el boton EDITAR - campo nombre
    boton_editar_nombre.addEventListener("click", function(){
        //var pedidoURL = 'http://localhost:8000/productoeditar';  //La direccion de donde viene el pedido
        var pedidoURL = '/productoeditar';
        var pedido = new XMLHttpRequest();

        pedido.open('GET', pedidoURL);
        pedido.responseType = "json";
        pedido.send();

        var archivoLista;
        pedido.addEventListener("load", function(){
        archivoLista=pedido.response;
    	boton_editar_nombre.disabled=true;

    	var form_nombre = document.createElement("form");
    	form_nombre.setAttribute("method", "post");
        form_nombre.setAttribute("action","/editar_producto/"+archivoLista[0].id_producto);
    	var label_editar_nombre = document.createElement("label");
    	label_editar_nombre.setAttribute("for", "nombre");
        label_editar_nombre.setAttribute("class", "mr-5");
        label_editar_nombre.textContent = "Ingrese nuevo nombre ";
        label_editar_nombre.setAttribute("class", "pr-4");

        form_nombre.appendChild(label_editar_nombre); //Agrego al formulario

        var nombre = document.createElement("input");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("id", "nombre");
        nombre.setAttribute("name", "nombre");
        nombre.required ="true";

        form_nombre.appendChild(nombre); //Agrego al formulario

        var boton_nombre_listo = document.createElement("button");
        boton_nombre_listo.setAttribute("type", "submit");
        boton_nombre_listo.setAttribute("class", "btn");
        boton_nombre_listo.setAttribute("class", "btn-secondary");
        boton_nombre_listo.setAttribute("class", "btn-sm");
        boton_nombre_listo.textContent ="Listo";

        form_nombre.appendChild(boton_nombre_listo); //Agrego al formulario

        //Boton cancelar edicion
        var boton_nombre_cancelar = document.createElement("button");
        boton_nombre_cancelar.setAttribute("type", "button");
        boton_nombre_cancelar.setAttribute("class", "btn");
        boton_nombre_cancelar.setAttribute("class", "btn-secondary");
        boton_nombre_cancelar.setAttribute("class", "btn-sm");
        boton_nombre_cancelar.textContent = "Cancelar";

        form_nombre.appendChild(boton_nombre_cancelar); //Agrego al formulario

        boton_nombre_cancelar.addEventListener("click", function(){
        	boton_editar_nombre.disabled=false;
        	form_nombre.reset();
        	items_nombre.removeChild(form_nombre);
        });

        //Agrego al DOM
        var items_nombre = document.querySelector('#li_nombre');
        items_nombre.appendChild(form_nombre);
    });
});

});

