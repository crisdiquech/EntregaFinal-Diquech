
//CARGO ARTICULOS

class producto{
    constructor (nombre, precio, imagen, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad; 
    }
}


let listaProductos =[];

listaProductos.push(new producto("REMERA",1000, "",1 ));
listaProductos.push(new producto("PANTALON",15000, "",1 ));
listaProductos.push(new producto("BUZO",20000,"", 1 ));
listaProductos.push(new producto("CAMPERA",60000,"", 1  ));
listaProductos.push(new producto("ZAPATILLAS",30000,"", 1));
listaProductos.push(new producto("MEDIAS",2500,"", 1 ));
listaProductos.push(new producto("GORRA",3000,"", 1 ));
listaProductos.push(new producto("GUANTES",2000,"", 1 ));


// COMPRA

let carrito = [];

let estado =  sessionStorage.getItem('Estado');

if (estado == 0 ){

// COMPRA-BUSCA EN SESSIONSTORAGE SI HABIA CARRITO YA CARGAD   

let recuperocarrito = sessionStorage.getItem("carrito");
    let carritorecuperado =JSON.parse(recuperocarrito);
    sessionStorage.setItem('Estado', '0')

    for(let producto of carritorecuperado) {

        carrito.push(producto);
    }
}
else if(estado == 1 )    { 
    sessionStorage.setItem('Estado', '0')
}

    mostrarCarrito()

//COMPRA-EL USUARIO AGREGA ARTICULOS

function agregarCarrito(e){


    let hijo = e.target;
    let padre = hijo.parentNode;

    let nombreProducto = padre.querySelector("h5").innerText;

    Toastify({
        text:"Agregado al carrito",
        duration:2000, 
        gravity: "bottom",
    
    }).showToast();


    function buscarProducto(producto){
        return producto.nombre == nombreProducto
    }

    let resultado_find = listaProductos.find(buscarProducto);

    carrito.push(resultado_find);

    
//COMPRA-GUARDO LA SELECCIÓN DE ARTICULOS DEL USUARIO EN LOCALSTORAGE

    let carritojson = JSON.stringify(carrito);

    sessionStorage.setItem("carrito", carritojson);
    sessionStorage.setItem('Estado', '0');
  
    mostrarCarrito()

}

//COMPRA-MUESTRO EN PANTALLA EL CARRITO

function mostrarCarrito(){

    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    for( let producto of carrito ){
   
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${producto.imagen}"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.cantidad}</td>
                          <td>$${producto.precio}</td>`;
                         
        tabla.append(fila);
    }

// sumo precio total y cantidad total de articulos

    let totalprecio = carrito.reduce ((acumulador, total) => acumulador + total.precio, 0);
    preciototal.innerText = ` $${totalprecio} `

    let totalarticulos = carrito.reduce ((acumulador, total) => acumulador + total.cantidad, 0) 
    canttotal.innerText = `${totalarticulos}`

}


//EVENTO AGREGAR ARTICULO

let btnCompra = document.querySelectorAll(".botonCompra");


for( let boton of btnCompra ){

    boton.addEventListener("click" , agregarCarrito);

   
}

//EVENTO COMPRAR

let botonComprar = document.getElementById("botonComprar");

    botonComprar.addEventListener("click", respuestaclick)

        function respuestaclick(){

    Swal.fire({
        title: '¡GRACIAS POR SU COMPRA!',
        confirmButtonColor: "#e40647 ",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    
}


//EVENTO VACIAR CARRITO
let btnVaciar = document.querySelectorAll(".botonVaciar");

for( let boton of btnVaciar ){

    boton.addEventListener("click" , vaciarCarrito);
}


function vaciarCarrito(){

    let carrito = [];
    sessionStorage.clear();
    sessionStorage.setItem('Estado', '1')
    
}

// MOSTRAR DATOS DEL CLIMA EN PIE DE PAGINA

function  mostrar_posicion (posicion) {
    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;
    let key ="e311ad4f3b39e1a27c153094ddeced23";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
	.then(response => response.json())
	.then( data => { 
        clima.innerText =`CIUDAD: ${data.name} - TEMP: ${data.main.temp}°C - CLIMA: ${data.weather[0].description}`
        
    })

}
navigator.geolocation.getCurrentPosition(mostrar_posicion);



