import { getPersonajes, mataPersonajes } from "./funciones.js";

const btnCargaPersonajes = document.querySelector(".cargar-personajes");
const btnMataFamilia = document.querySelector(".matar-familia");
const listaPersonajes = document.querySelector(".personajes");
let personajes = [];

const pintaPersonajes = (personajes) => {
  borrarPersonajes();
  for (const personaje of personajes) {
    const listaPersonajesElemento = document
      .querySelector(".personaje-dummy")
      .cloneNode(true);
    listaPersonajesElemento.classList.remove("personaje-dummy");
    const nombrePersonaje =
      listaPersonajesElemento.querySelector(".nombre-personaje");
    const estadoPersonaje = listaPersonajesElemento.querySelector(".estado");
    if (personaje.vivo === true) {
      estadoPersonaje.textContent = "vivo";
    } else {
      estadoPersonaje.textContent = "muerto";
    }
    nombrePersonaje.textContent = `${personaje.nombre} ${personaje.familia}`;
    listaPersonajes.append(listaPersonajesElemento);
  }
};

const familiaQueAsesinar = document.querySelector(".familia");
const errorMatar = document.querySelector(".mensaje");

const matarPersonajes = async () => {
  try {
    personajes = await mataPersonajes(familiaQueAsesinar.value);
    borrarPersonajes();
    pintaPersonajes(personajes);
    errorMatar.textContent = "";
  } catch (error) {
    errorMatar.textContent = error.message;
  }
};

const cargarPersonajes = async () => {
  personajes = await getPersonajes();
  pintaPersonajes(personajes);
};

const borrarPersonajes = () => {
  const personajesElementos = listaPersonajes.querySelectorAll(
    ".personaje:not(.personaje-dummy)"
  );
  for (const personajesElemento of personajesElementos) {
    personajesElemento.remove();
  }
};

btnCargaPersonajes.addEventListener("click", cargarPersonajes);
btnMataFamilia.addEventListener("click", matarPersonajes);
