/* -------------------- VARIABLES GLOBALES -------------------- */
let compra;
const PRODUCTOS = [];

/* -------------------- CLASES -------------------- */
/* ----- PRODUCTO ----- */
class Producto {
    constructor (name, desc, stock, price){
        this.name=name
        this.description=desc
        this.stock=parseInt(stock)
        this.price=parseFloat(price)
        this.cantidad=0
    }
    showProductUser(){
        alert(`Producto: ${this.name}\nDescripción: ${this.description}\nCantidad: ${this.cantidad}\nPrecio: $${this.price}`)
    }
}

/* ----- USUARIO ----- */
class User{
    constructor(name) {
        this.name=name
        this.cart=[]
        this.total=0
    }
    addProduct(producto, cant){
        let flag = true;
        for (const prod of this.cart) { /* Verificamos que el producto no haya sido agregado anteriormente */
            if (prod.name == producto.name){
                flag = false
            }
        }
        if(producto.stock > 0){
            producto.cantidad += cant
            if (flag){ /* Si el producto ya fue agregado anteriormente pero se quiere agregar más cantidad no se lo vuelve a ingresar al array */
                this.cart.push(producto)
            }
            this.total += parseInt(producto.price * cant)
            producto.stock -= cant 
            alert(`El producto ${producto.name} fue agregado correctamente...`)
        } else {
            alert(`No hay más stock disponible del producto ${producto.name}`)
        }
    }
    showCart(){
        /* Ordenamos al array de menor a mayor por su precio para el desafío */
        this.cart.sort(function (a,b){
            return (a.price - b.price)
        })
        console.log(this.cart) /* Mostramos que el array esta ordenado por su precio de menor a mayor */
        for (const prod of this.cart) {
            prod.showProductUser()
        }  
    }
    showTotal(){
        alert(`${this.name} su total es de: \n\n$${this.total}.`)
    }
}

/* -------------------- BASE DE DATOS -------------------- */
let producto0 = new Producto('Remera', 'Remera roja mangas largas', 10, 3000);
let producto1 = new Producto('Zapatos', 'Zapatos negros formales', 4, 9000);
let producto2 = new Producto('Campera', 'Campera azul con capucha', 15, 7000);
let producto3 = new Producto('Pantalón', 'Pantalón blanco roto en las rodillas', 20, 8000);
let producto4 = new Producto('Buzo', 'Buzo amarillo con bolsillos', 5, 6500);

PRODUCTOS.push(producto0, producto1, producto2, producto3, producto4);

/* -------------------- FUNCIONES -------------------- */
const compras = () => {
    let producto, cantidad;
    do {
        producto = parseInt(prompt(`Ingrese el número respectivo al producto que quiera comprar:\n[0]Remera - [1]Zapatos - [2]Campera - [3]Pantalón - [4]Buzo - [5]Terminar`))
        if (producto != 5){        
            cantidad = parseInt(prompt('Cantidad (Mayor a 0): '))
        }
    } while (!([0,1,2,3,4,5].includes(producto)) | (cantidad < 0)); /* Nos aseguramos que el usuario ingreso un nro entre 0 y 5, y una cantidad mayor a 0 */
    return [producto, cantidad] /* Retornamos el producto seleccionado y la cantidad */
}

/* -------------------- PROGRAMA -------------------- */
let nom = prompt('Ingrese su nombre: ');
let user1 = new User(nom);

do {
    compra = compras()

    switch (compra[0]) { /* Según el producto seleccionado por el usuario, lo agregamos al array de carrito */
        case 0:
            user1.addProduct(producto0, compra[1])
            break;
        case 1:
            user1.addProduct(producto1, compra[1])
            break;
        case 2:
            user1.addProduct(producto2, compra[1])
            break;
        case 3:
            user1.addProduct(producto3, compra[1])
            break;
        case 4:
            user1.addProduct(producto4, compra[1])
            break;
        default:
            break;
    }
} while (compra[0] != 5); /* Si el usuario selecciono el nro 5 terminamos con la selección de productos */

/* -------------------- MUESTRA DE RESULTADOS -------------------- */
alert(`Perfecto ${user1.name}! Presione ACEPTAR y le muestro su carrito de compras...`)
user1.showCart();
user1.showTotal();