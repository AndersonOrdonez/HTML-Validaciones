export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "CustomError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe tener una letra minúscula y una mayúscula, un número y no puede tener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo no puede estar vacío",
        CustomError: "Al menos debes tener 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 4 a 30 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres",
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input), //nacimiento es el nombre del dataset en el tag HTML

};

function mostrarMensajeDeError (tipoDeInput,input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return  mensaje;
    
}

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);//Tomamos solo el date del Listener o target.
    let mensaje = "";

    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes de tener al menos 18 años"
    }

    input.setCustomValidity(mensaje);//Es una función que recibe una mensaje para validar datos
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date(); //New Date vacio o automático, fecha actual.
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFecha <= fechaActual;//Nos retorna un valor booleano: true o false
}



//const inputNacimiento = document.querySelector('#birth');

//inputNacimiento.addEventListener('blur', (event) => {
  //  validarNacimiento(event.target);//Event.target nos da la información de espacio del elemento.
//});

