/* constructor Producto*/
const productos = [];

class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

const elementosCarrito = [];

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}


//Arrays p/ guardar catálogo de productos y elementos en carrito

//const productos = [];
//const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");


/** LLamo o ejecuto a las funciones*/
 
cargarProductos();
cargarCarrito();
armarCarrito();
armarCatalogoProductos();


// Defino Funciones

//Fx 1: Carga de Productos


 function cargarProductos() {
    productos.push(new Producto(1, 'Musculosa', 3500, 'img/musculosa.jpg'));
    productos.push(new Producto(2, 'Remera', 5000, 'img/remera.jpg'));
    productos.push(new Producto(3, 'Leggins', 8000, 'img/leggins.jpg'));
    productos.push(new Producto(4, 'Calza', 10000, 'img/calzas.jpg'));
    productos.push(new Producto(5, 'Zapatillas', 15000, 'img/zapatillas.jpg'));
    productos.push(new Producto(6, 'Combo!! Bolso y Gorra', 20000, 'img/bolso y gorra.jpg'));
    
}


//Fx 2

function cargarCarrito() {
    
}

//Fx 3: Armado de Carrito

function armarCarrito() {
    contenedorCarrito.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="500" step="1" style="width: 50px;"/></td>
                <td> ${elemento.producto.precio}</td>
                <td>$ ${elemento.producto.precio*elemento.cantidad}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button"> <i class="bi bi-trash-fill"></i></button></td>`
                ;

        
//ERROR: ver xq no me muestra el tachito de basura del ultimo renglon

    contenedorCarrito.appendChild(renglonesCarrito);
        
//Evento en carrito => modifica cantidad de un mismo producto
            
            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;

                armarCarrito();

//Guardar en  LOCAL STORAGE
 let arreglo = JSON.stringify([elementosCarrito])
    localStorage.setItem('elementosCarrito', JSON.stringify());

            });


            //Evento en carrito => eliminar producto del carrito

            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonEliminarProducto.addEventListener('click', () => {

                let indiceEliminar =  elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar,1);
                
                armarCarrito();

        
       });

    }
    
    );
        
     //suma del carrito        
    const valorInicial = 0
    const totalCompra = elementosCarrito.reduce(
        (valorPrevio, valorActual) => valorPrevio + valorActual.producto.precio*valorActual.cantidad,
        valorInicial);
    

    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6"> Carrito vacío </th>`;
    } else {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: $ ${totalCompra}</th>`;
    }

};

//LOCAL STORAGE


const obtenerProductosLocalStorage = () =>{
    let productoLS;
    if(localStorage.getItem('elementosCarrito') == null){
        productoLS = [];
    }
    else{
        productoLS= JSON.parse(localStorage.getItem('elementosCarrito'));
    }
    return productoLS
}

//Almacenar en el LS

const guardarProductosLocalStorage = (elemento, producto)=>{
    let elementos;
    //Toma valor de un arreglo con datos del LS
    elementos= obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    elemento.push(elemento,producto);
    //Agregamos al LS
    
}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}


//Card de Producto

function crearCard(producto) {
    
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-warning";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCard = document.createElement("div");
    cuerpoCard.className = "card-body";
    cuerpoCard.innerHTML = `
        <h4>${producto.nombre}</h4>
        <p> $ ${producto.precio} </p>
    `;
    cuerpoCard.append(botonAgregar);

    //Card Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let card = document.createElement("div");
    card.className = "card m-2 p-2";
    card.style = "width: 18rem";                
    card.append(imagen);
    card.append(cuerpoCard);


    //Agrego evento => agrego producto al Carrito

    botonAgregar.onclick = () => {
        

        let elementoExistente = 
            elementosCarrito.find((elem) => elem.producto.id == producto.id);
        
        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        armarCarrito();

    //Almacenar en el LS
    const guardarProductosLocalStorage = (elementoCarrito, producto)=>{
    let productoenLS;
    //Toma valor de un arreglo con datos del LS
    productoenLS= obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    elementosCarrito.push(elementoCarrito);
    //Agregamos al LS
    localStorage.setItem('elementosCarrito', JSON.stringify(elemento, producto));
}


       // Sweet alert: Aviso producto agregado

        swal({
            title: '¡Producto agregado exitosamente!',
            text: `${producto.nombre} se agregó al carrito`,
            icon: 'success',
            buttons: {
                cerrar: {
                    text: 'Seguir comprando',
                    value: false
                },
                carrito: {
                    text: 'Ir al Carrito',
                    value: true,
                }
            }

        }).then((decision) => {
            if(decision) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);
            } else {
                swal("Continuar eligiendo productos");
            }
        });
    }
   
    return card;
}


//Eliminar todos los datos del LS
const vaciarLocalStorage = ()=>{
    localStorage.clear();
}


/*Fx 4*/


function armarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}


/* FALTA:
LOCAL STORAGE
operadoores avanzados?
promesas
*Agregar íconos (carrito)
MODAL DE CARRITO SIN CERRAR??
*Emparejar tamaño img cards, con css??
*Reemplazar el IF?? (optimización)*/

