//                  CONSIGNA FINAL PROG2
//     Llevar un programa en JAVASCRIPT con acceso a API
//  que tenga un CRUD manejando al menos 2 entidades (tablas)

//CRUD de Libros

const titulo = document.getElementById("LibTi")
const autor = document.getElementById("LibAu")

const listado = document.getElementById("lisLib")

const btnAgr = document.getElementById("agrLib")
const btnAct = document.getElementById("actLib")

let auxiliar
listar()

async function guardar(){
   
    resp = await axios.post("http://localhost:3000/libros",{titulo: titulo.value, autor: autor.value})

    listar()

    titulo.value=""
    autor.value=""

    alert("Grabacion OK")

    .catch(() => {

        alert("se produjo un error al guardar")

    })
}


async function listar() {
    resp = await axios.get("http://localhost:3000/libros")
    listado.innerHTML = ""
    resp.data.forEach(element => {
        listado.innerHTML +=" El Id: "+ element.id + " -- " + " Titulo: " +
        element.titulo + " -- " + " Autor: " + element.autor +' '+ '<button onclick="borrar(' + element.id +')"><img src="./img/delete.png" alt="" style="height: 20px; width: 20px;"></button>' +
        '<button onclick="mostrar(' + element.id +')"><img src="./img/refresh.png" alt="" style="height: 20px; width: 20px; "></button>'+
        "<br>";
    });
}

async function borrar(id) {
    
    resp = await axios.get("http://localhost:3000/prestamos")
    respuesta= resp.data.some(function(libro){
        return libro.idLibro == id
    })
    
    try {
        if(respuesta==false){
            await axios.delete("http://localhost:3000/libros/" + id)
            alert("Borrado Correctamente")
        }
        else{
            alert("No se Pudo Borrar posee prestamo")
        }  
    }
    catch (error) {
        console.log(error)
        alert ("Error al Borrar")
    }
    listar()
}

async function mostrar(id) {
    btnAct.hidden = false
    btnAgr.hidden = true
    auxiliar = id
    resp = await axios.get("http://localhost:3000/libros/" + id)
    titulo.value = resp.data.titulo
    autor.value= resp.data.autor
}

async function actualizar() {
    btnAct.hidden = true
    btnAgr.hidden = false
    resp = await axios.put("http://localhost:3000/libros/" + auxiliar, {titulo: titulo.value, autor: autor.value})
    listar()
    titulo.value="" 
    autor.value= ""
}

// CRUD DE ALUMNOS

const dni = document.getElementById("AluDni")
const nombre = document.getElementById("AluNom")
const direccion = document.getElementById("AluDir")

const listado2 = document.getElementById("lisAlu")

const btnAgr2 = document.getElementById("agrAl")
const btnAct2 = document.getElementById("actAl")

let auxiliar2
listar2()

async function guardar2(){
    
    
    resp = await axios.get("http://localhost:3000/alumnos")
    
    respuesta= resp.data.some(function(alumnos){
        return alumnos.dni== dni.value
    })

    try{

        if(respuesta==false){

            resp= await axios.post("http://localhost:3000/alumnos",{nombre:nombre.value, direccion:direccion.value, dni:dni.value})

            alert("guardado")

            listaralumnos()
            nombre.value=""
            direccion.value=""
            dni.value=""
        }
        else
        {
            alert("No se pueden guardar alumnos iguales")

            listaralumnos()
            nombre.value=""
            direccion.value=""
            dni.value=""
        }
    }    
    catch(error){ console.log(error) }
    listar2()
}

async function listar2() {
    resp2 = await axios.get("http://localhost:3000/alumnos")
    listado2.innerHTML = ""
    resp2.data.forEach(element2 => {
        listado2.innerHTML += 
         " El Id: " + element2.id + " -- " + " Dni: " +
        element2.dni + " -- " + " Nombre: " + element2.nombre + " -- " + 
        " Direccion: " + element2.direccion +' '+'<button onclick="borrar2(' + element2.id 
        +')"><img src="./img/delete.png" alt="" style="height: 20px; width: 20px;"></button>' +
        '<button onclick="mostrar2(' + element2.id +')"><img src="./img/refresh.png" alt="" style="height: 20px; width: 20px;"></button>'+
        "<br>";
    });
}

async function borrar2(id2) {
    resp = await axios.get("http://localhost:3000/prestamos")
    respuesta= resp.data.some(function(alumnos){
        return alumnos.idAlu == id2
    })

    try{
        if(respuesta==false){
            await axios.delete("http://localhost:3000/alumnos/"+id2)

            alert("se borro correctamente :C")
        }
        else{

            alert("Disculpe no se puede borrar un alumno que posee un prestamo")
        }
        
    }
    catch (error) { 
        console.log(error)
       alert("error de borrado") 
    }
    
    listar2()

}

async function mostrar2(id2) {
    btnAct2.hidden = false
    btnAgr2.hidden = true
    auxiliar2 = id2
    resp2 = await axios.get("http://localhost:3000/alumnos/" + id2)
    dni.value = resp2.data.dni
    nombre.value= resp2.data.nombre
    direccion.value= resp2.data.direccion
}

async function actualizar2() {
    btnAct2.hidden = true
    btnAgr2.hidden = false
    resp2 = await axios.put("http://localhost:3000/alumnos/" + auxiliar2, {dni: dni.value, nombre: nombre.value, direccion: direccion.value})
    
    dni.value ="" 
    nombre.value= ""
    direccion.value=""
    listar2()
}

// CRUD de Prestamos

const fechaEnt = document.getElementById("PresEnt")
const fechaDev = document.getElementById("PresDev")
const idLibro = document.getElementById("PresLib")
const idAlu = document.getElementById("PresAlu")

const listado3 = document.getElementById("lisPres")

const btnAgr3 = document.getElementById("agrPres")
const btnAct3 = document.getElementById("actPres")

let auxiliar3
listar3()

async function guardar3(){
    
    try{
        resp= await axios.post("http://localhost:3000/prestamos",{idAlu: idAlu.value, idLibro:parseInt( idLibro.value), fechaEnt: fechaEnt.value, fechaDev: fechaDev.value})

    

    listar3()

   idAlu.value = ""
   idLibro.value = ""
    fechaEnt.value = ""
   fechaDev.value = ""

    alert ("Grabacion ok :)")
    }

    catch{(err) => {

       console.log(err)

   }}
}




async function listar3() {
    
    resp3 = await axios.get("http://localhost:3000/prestamos")
    listado3.innerHTML = ""
    resp3.data.forEach(async element3 => { 
        resp = await axios.get("http://localhost:3000/libros/"+element3.idLibro)
        resp2 = await axios.get ("http://localhost:3000/alumnos/"+element3.idAlu)
        listado3.innerHTML +=
          " Fecha de Entrega: " + element3.fechaEnt + " -- " + " Fecha de Devolucion: " + 
          element3.fechaDev + " -- " + " Titulo del Libro: " + resp.data.titulo + " -- " + 
          " Nombre del Alumno: " + resp2.data.nombre +'<button onclick="borrar3(' + 
          element3.id +')"><img src="./img/delete.png" alt="" style="height: 20px; width: 20px;"></button>' +
          '<button onclick="mostrar3(' + element3.id +')"><img src="./img/refresh.png" alt="" style="height: 20px; width: 20px; "></button>'+
        "<br>";
    });
}

async function borrar3(id3) {
    try {
        await axios.delete ("http://localhost:3000/prestamos/" + id3)
    }
    catch (error) {
        alert ("Error al Borrar")
    }
    listar3()
}

async function mostrar3(id3) {
    btnAct3.hidden = false
    btnAgr3.hidden = true
    
    auxiliar3 = id3

    resp3 = await axios.get("http://localhost:3000/prestamos/" + id3)
    fechaEnt.value = resp3.data.fechaEnt
    fechaDev.value = resp3.data.fechaDev
    idLibro.value = resp3.data.idLibro
    idAlu.value = resp3.data.idAlu
}

async function actualizar3() {
    btnAct3.hidden = true
    btnAgr3.hidden = false
    resp3 = await axios.put("http://localhost:3000/prestamos/" + 
                            auxiliar3, {fechaEnt: fechaEnt.value, fechaDev: fechaDev.value, 
                            idLibro: idLibro.value, idAlu: idAlu.value})


    listar3()
    
    fechaDev.value="" 
    fechaEnt.value=""
    idAlu.value=""
    idLibro.value=""
}





