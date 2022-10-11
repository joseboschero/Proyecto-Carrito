let carritoCursos = [];

const carrito = document.getElementById('tbody');

const btnVaciar = document.getElementById('vaciar-carrito');

//Listeners

document.addEventListener('DOMContentLoaded', () => {
    
        const boton = document.querySelectorAll('.agregar-carrito');

        boton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();



                leerId(e.target.parentElement.parentElement, e.target.id);
            })
        })

        btnVaciar.addEventListener('click', () => {
            vaciarCarrito();
        } )

        carrito.addEventListener('click', borrar);

})

// Borra un item del carrito y restamos el precio
const borrar = (e) => {
    if(e.target.classList.contains('eliminar-uno')){
        const cursos = carritoCursos.filter(curso => curso.id === e.target.id)
        cursos[0].cantidad--;
        let nuevoPrecio = cursos[0].precio.split('$');
        let precioInt = parseInt(nuevoPrecio[1]);
        cursos[0].precio = `$${precioInt - 15}`;
        if(cursos[0].cantidad < 1){
            carritoCursos = carritoCursos.filter(curso => curso.id !== e.target.id)
        }
        crearHTML();
    }
}

// Leemos el id de la card clickeada, y pusheamos el objeto con sus atributos dentro del array del carrito "carritoCursos" y creamos el HTML
const leerId = (datosCurso, id) => {
    const curso = {
        imagen : datosCurso.children[0].getAttribute('src'),
        nombre : datosCurso.children[1].children[0].textContent,
        precio : datosCurso.children[1].children[3].children[0].textContent,
        id : id,
        cantidad : 1
    }
    
    const existe = carritoCursos.some(e => e.id === curso.id);
   

    if (existe){
        const cursos = carritoCursos.filter(e => e.id === curso.id);
        cursos[0].cantidad++;
        let nuevoPrecio = cursos[0].precio.split('$');
        let precioInt = parseInt(nuevoPrecio[1]);
        cursos[0].precio = `$${precioInt+=15}`;
    } else {
        carritoCursos = [...carritoCursos, curso];
    }
    
    crearHTML();
}

// Vaciamos el carrito
const vaciarCarrito = () => {
    carrito.innerHTML = '';
    carritoCursos = [];
}

// Funcion para crear HTML dentro del carrito
const crearHTML = () => {
      
    
    carrito.innerHTML = '';

    carritoCursos.forEach((curso) => {

        const nuevoElemento = document.createElement('tr');

        nuevoElemento.innerHTML = `<tr>
                                        <th><img src='${curso.imagen}' class='imagen-elemento-carrito'></th>
                                        <th>${curso.nombre}</th>
                                        <th>${curso.precio}</th>
                                        <th>${curso.cantidad}</th>
                                        <th><a class='u-full-width button-primary button input agregar-carrito eliminar-uno' id='${curso.id}'> X </th>
                                    </tr>`;
                               
        carrito.appendChild(nuevoElemento);
    })
 
}


