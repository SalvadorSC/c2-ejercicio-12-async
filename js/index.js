import { getPersonajes, mataPersonajes } from "./funciones.js";

const btnCargaPersonajes = document.querySelector(".cargar-personajes");
const btnMataFamilia = document.querySelector(".matar-familia");
const listaPersonajes = document.querySelector(".personajes");
let personajes = [];

const pillarPersonajes = async () => {
  personajes = await getPersonajes();
  console.log(personajes);
};

pillarPersonajes();
const pintaPersonajes = (personajes) => {
  for (const personaje of personajes) {
    const listaPersonajesElemento = document
      .querySelector(".personaje-dummy")
      .cloneNode(true);
    console.log(listaPersonajesElemento);
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

const matarPersonajes = async () => {
  console.log(familiaQueAsesinar.value);
  personajes = await mataPersonajes(familiaQueAsesinar.value);
  console.log(personajes);
  borrarPersonajes();
  cargarPersonajes();
};

const cargarPersonajes = async () => {
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
