var formularioContacto = document.getElementById("contacto");
var listadoContactos = document.querySelector("#listado-contactos tbody");
var inputBuscador = document.querySelector("#buscar");

eventListener();

function  eventListener() {
      formularioContacto.addEventListener("submit",leerFormulario);

    if(inputBuscador){

        inputBuscador.addEventListener("input", buscarContactos);
        numeroContactos();

    }

      if(listadoContactos){
        listadoContactos.addEventListener("click", eliminarContacto);
      }
}





function leerFormulario(e){
    e.preventDefault();


    //Leer los datos de los inputs;
    const nombre = document.querySelector("#nombre").value;
    const empresa = document.querySelector("#empresa").value;
    const telefono = document.querySelector("#telefono").value,
          accion =  document.querySelector("#acción").value;

    if(nombre === "" || empresa==="" || telefono===""){
            // 2 parametros texto y clase
       mostrarNotificacion("Todos los campos son obligatorios", "error");

    }else{

    //SI pasa la validacion crear llamado a ajax

    const infoContacto = new FormData();

    infoContacto.append("nombre",nombre);
    infoContacto.append("empresa",empresa);
    infoContacto.append("telefono",telefono);
    infoContacto.append("accion",accion);

   // console.log(...infoContacto);

        if(accion=="crear"){

            //Crear Nuevo contacto

            insertarBD(infoContacto);

        }else{
            // Editar un COntacto
            //Leer ID

            const idRegistro = document.querySelector("#id").value;
            infoContacto.append("id",idRegistro);
            actualizarRegistro(infoContacto);

        }

    }

}

// Funcion para insertar en la base de datos

function insertarBD(datos){
    // LLamado a AJAX

    //Crear Objeto
 const xhr = new XMLHttpRequest();

    //COnexion

    xhr.open("POST","inc/modelos/modelo-contacto.php",true);

    //Pasar datos

    xhr.onload = function(){
            if(xhr.status === 200){
                //console.log(xhr.responseText);

            var respuesta = JSON.parse(xhr.responseText);
             console.log(respuesta);

            //INSERTA UN NUEVO ELEMENTO a la tabla
            const nuevoContacto = document.createElement("TR");
            nuevoContacto.innerHTML = `
                    <td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.empresa}</td>
                    <td>${respuesta.datos.telefono}</td>

            `;

           // crear Contenedor Acciones

                const contenedorAcciones = document.createElement("TD");

                //EDITAR
                const iconoEditar = document.createElement("I");
                iconoEditar.classList.add("fas","fa-pen-square");
                const btnEditar = document.createElement("A");
                btnEditar.appendChild(iconoEditar);
                btnEditar.href=`editar.php?id=${respuesta.datos.idInsertado}`;
                btnEditar.classList.add("btn-editar","btn");


                // Agregar al padre
                contenedorAcciones.appendChild(btnEditar);

                //borrar
                const iconoBorrar = document.createElement("I");
                iconoBorrar.classList.add("fas","fa-trash-alt");
                const btnBorrar = document.createElement("BUTTON");
                btnBorrar.appendChild(iconoBorrar);
                btnBorrar.classList.add("btn-borrar","btn");
                btnBorrar.setAttribute("data-id",respuesta.datos.idInsertado);
                // Agregar al padre
                contenedorAcciones.appendChild(btnBorrar);

            // Agregar al padre
                nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo con los contactos

            listadoContactos.appendChild(nuevoContacto);

            //Resetear el formulario

            document.querySelector("form").reset();

            //Mostrar Notificacion
            numeroContactos();

            mostrarNotificacion("Contacto Creado Correctamente","exito");
            }

    }

    //Enviar Datos
    xhr.send(datos);


}



//Notificacion en pantalla

function mostrarNotificacion(mensaje,clase) {
        const notificacion = document.createElement("DIV");
        notificacion.textContent = mensaje;
        notificacion.classList.add("notificacion",clase,"sombra");


        //Formulario
        formularioContacto.insertBefore(notificacion, document.querySelector("form legend"));

        // Ocultar y Mostrar Notificacion
setTimeout(() => {
    notificacion.classList.add("visible");

     setTimeout(
            ()=>{

        notificacion.classList.remove("visible");
        setTimeout(() => {
        notificacion.remove();
        }, 1000);

            }, 3000)


    }, 200);
}


function eliminarContacto(e){

    if(e.target.parentElement.classList.contains("btn-borrar")){

            //Tomar el id
        const id = e.target.parentElement.getAttribute("data-id");

        //Preguntar si están seguros

        const respuesta = confirm("¿ Estás Seguro ?");

        if(respuesta){
                // Llamado a ajax
                //Crear el objeto
                    const xhr = new XMLHttpRequest;
                //Abrir coneccion
                    xhr.open("GET",`inc/modelos/modelo-contacto.php?id=${id}&accion=borrar`,true);

                //Leer la respuesta
                xhr.onload = function(){

                        if(xhr.status === 200){
                                  //console.log(xhr.responseText);
                                    const resultado = JSON.parse(xhr.responseText);
                                    if(resultado.respuesta == "correcto"){

                                            //Eliminar registro del dom

                                            e.target.parentElement.parentElement.parentElement.remove();

                                            //Mostrar Notificacion

                                        mostrarNotificacion("Eliminado Correctamente","exito");
                                    }else{

                                        mostrarNotificacion("Hubo un error","error");

                                    }
                             }
                }


                //Enviar Peticion

                xhr.send();

        }else{

            console.log("NO");

        }

    }


}


function actualizarRegistro(datos){

    // Crear Objeto

    const xhr = new XMLHttpRequest;

    //Abrir Conexxion

    xhr.open("POST","inc/modelos/modelo-contacto.php",true);

    //Recibir Respuesta

   xhr.onload = function(){

       if(xhr.status === 200){

         var resultado= JSON.parse(xhr.responseText);

        }

        if(resultado.respuesta == "correcto"){

            mostrarNotificacion("Actualizado Correctamente","exito");


        }else{

            mostrarNotificacion("Debes Editar Algo","error");

        }

        //Despues de 2 segundos redireccionar

        setTimeout(() => {

            window.location.href = "index.php";

        }, 2000);


    }

        //Enviar Peticion

        xhr.send(datos);
}


// Buscador de Registros

function buscarContactos(e){

    const expresion = new RegExp(e.target.value,"i"),
          registros = document.querySelectorAll("tbody tr");


          registros.forEach(registro=>{


              registro.style.display = "none";


              let texto = registro.childNodes[1].textContent;



              if(texto.replace(/\s/g," ").search(expresion) !== -1){

                  registro.style.display = "table-row";

             }



          })
          numeroContactos();

}


// Aumentar cantidad Contactos

function numeroContactos(){

    const totalCotactos = document.querySelectorAll("tbody tr");
    const numero = document.querySelector(".total-contactos span");
    let total = 0;

    totalCotactos.forEach(contacto=>{
        if(contacto.style.display == "" ||contacto.style.display == "table-row" ){
                total++;
        };
    })

    numero.textContent = total;


}


