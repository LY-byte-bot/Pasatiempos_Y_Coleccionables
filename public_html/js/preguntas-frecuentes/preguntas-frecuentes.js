/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
function ShowHide(boton) {
    const respuesta = boton.nextElementSibling;

    if (respuesta.style.display === "block") {
        respuesta.style.display = "none";
    } else {
        respuesta.style.display = "block";
    }
}

