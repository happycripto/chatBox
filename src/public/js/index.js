const socket =io();
let user;
let chatBox = document.getElementById('chatBox')


Swal.fire({
    title:"Identificate",
    input:"text",
    text: "ingresa el usuario para identificarte",
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre'
    },
    allowOutsideClick: false
}).then(result => {
    user =result.value
})