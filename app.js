
/* ==========================================
   FIRMA JURÍDICA - WILLIAM PAGUAY C.
   FUNCIONES, NAVEGACIÓN Y MULTIMEDIA
========================================== */

const screens = document.querySelectorAll(".screen");
const navigation = document.getElementById("navigation");
const menuButton = document.getElementById("menuButton");
const toast = document.getElementById("toast");

document.getElementById("year").textContent =
  new Date().getFullYear();

/* ==========================================
   MENSAJES
========================================== */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimeout);

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* ==========================================
   CONTROL DE MULTIMEDIA
========================================== */

const institutionalVideo =
  document.getElementById("institutionalVideo");

const commercialAudio =
  document.getElementById("commercialAudio");

/* DETENER VIDEO Y AUDIO */

function stopMultimedia() {
  if (institutionalVideo) {
    institutionalVideo.pause();
  }

  if (commercialAudio) {
    commercialAudio.pause();
  }
}

/* EVITAR REPRODUCCIÓN SIMULTÁNEA */

if (institutionalVideo && commercialAudio) {

  institutionalVideo.addEventListener("play", () => {
    commercialAudio.pause();
  });

  commercialAudio.addEventListener("play", () => {
    institutionalVideo.pause();
  });

}

/* ==========================================
   NAVEGACIÓN ENTRE PANTALLAS
========================================== */

function showScreen() {
  let current = location.hash.replace("#", "");

  if (!current) {
    current = "bienvenida";
  }

  const target = document.getElementById(current);

  if (!target || !target.classList.contains("screen")) {
    current = "bienvenida";
  }

  /* DETENER MULTIMEDIA AL CAMBIAR DE PANTALLA */

  if (current !== "multimedia") {
    stopMultimedia();
  }

  screens.forEach(screen => {
    screen.classList.toggle(
      "active",
      screen.id === current
    );
  });

  navigation.classList.remove("active");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

window.addEventListener("hashchange", showScreen);
window.addEventListener("DOMContentLoaded", showScreen);

/* ==========================================
   MENÚ MÓVIL
========================================== */

menuButton.addEventListener("click", () => {

  const open = navigation.classList.toggle("active");

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );

});

/* ==========================================
   SELECCIÓN DE ÁREAS LEGALES
========================================== */

document.querySelectorAll("[data-area]").forEach(card => {

  card.addEventListener("click", () => {

    const area = card.dataset.area;

    document.getElementById("areaTitle").textContent =
      area;

    document.getElementById("areaDescription").textContent =
      "Información sobre " + area +
      ". Aquí puedes incorporar una descripción más " +
      "detallada de esta especialidad jurídica, sus " +
      "procedimientos y los servicios relacionados.";

  });

});

/* ==========================================
   SELECCIÓN DE SERVICIOS
========================================== */

document.querySelectorAll("[data-service]").forEach(card => {

  card.addEventListener("click", () => {

    const service = card.dataset.service;

    document.getElementById("serviceTitle").textContent =
      service;

    document.getElementById("serviceDescription").textContent =
      "Conoce nuestro servicio de " +
      service.toLowerCase() +
      ". La firma brinda atención profesional y " +
      "personalizada para analizar cada situación " +
      "y orientar al cliente sobre las alternativas " +
      "disponibles.";

  });

});

/* ==========================================
   BASE DE DATOS DEMOSTRATIVA
========================================== */

const searchableItems = [
  {
    name: "Área legal 1",
    type: "area",
    description: "Especialidad jurídica número uno."
  },
  {
    name: "Área legal 2",
    type: "area",
    description: "Especialidad jurídica número dos."
  },
  {
    name: "Área legal 3",
    type: "area",
    description: "Especialidad jurídica número tres."
  },
  {
    name: "Área legal 4",
    type: "area",
    description: "Especialidad jurídica número cuatro."
  },
  {
    name: "Área legal 5",
    type: "area",
    description: "Especialidad jurídica número cinco."
  },
  {
    name: "Área legal 6",
    type: "area",
    description: "Especialidad jurídica número seis."
  },
  {
    name: "Área legal 7",
    type: "area",
    description: "Especialidad jurídica número siete."
  },
  {
    name: "Área legal 8",
    type: "area",
    description: "Especialidad jurídica número ocho."
  },
  {
    name: "Área legal 9",
    type: "area",
    description: "Especialidad jurídica número nueve."
  },
  {
    name: "Asesoría jurídica",
    type: "service",
    description: "Orientación profesional y jurídica."
  },
  {
    name: "Patrocinio legal",
    type: "service",
    description: "Representación y defensa legal."
  },
  {
    name: "Consultas jurídicas",
    type: "service",
    description: "Atención personalizada."
  }
];

/* ==========================================
   BUSCADOR
========================================== */

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const categoryFilter =
  document.getElementById("categoryFilter");

const searchResults =
  document.getElementById("searchResults");

function performSearch() {

  const query =
    searchInput.value.trim().toLowerCase();

  const category = categoryFilter.value;

  const results = searchableItems.filter(item => {

    const matchesText =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesCategory =
      category === "all" || item.type === category;

    return matchesText && matchesCategory;

  });

  searchResults.innerHTML = "";

  if (results.length === 0) {

    searchResults.innerHTML =
      "<p>No se encontraron resultados. " +
      "Intenta con otra palabra.</p>";

    return;
  }

  results.forEach(item => {

    const card = document.createElement("div");
    card.className = "result-card";

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const link = document.createElement("a");
    link.className = "text-link";

    link.href = item.type === "area"
      ? "#detalle-area"
      : "#detalle-servicio";

    link.textContent = "Ver información →";

    link.addEventListener("click", () => {

      if (item.type === "area") {

        document.getElementById("areaTitle").textContent =
          item.name;

        document.getElementById("areaDescription").textContent =
          item.description;

      } else {

        document.getElementById("serviceTitle").textContent =
          item.name;

        document.getElementById("serviceDescription").textContent =
          item.description;

      }

    });

    card.append(heading, description, link);

    searchResults.appendChild(card);

  });

}

searchButton.addEventListener(
  "click",
  performSearch
);

searchInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    performSearch();
  }

});

categoryFilter.addEventListener(
  "change",
  performSearch
);

/* ==========================================
   DATOS TEMPORALES DEL CLIENTE
========================================== */

const client = {
  name: "",
  email: "",
  phone: ""
};

function updateProfile() {

  document.getElementById("profileName").textContent =
    client.name || "Cliente de demostración";

  document.getElementById("profileEmail").textContent =
    client.email || "No registrado";

  document.getElementById("profilePhone").textContent =
    client.phone || "No registrado";

  document.getElementById("editName").value =
    client.name;

  document.getElementById("editEmail").value =
    client.email;

  document.getElementById("editPhone").value =
    client.phone;

}

/* ==========================================
   AGENDAR CONSULTA
========================================== */

document.getElementById("appointmentForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.getElementById("appointmentName")
        .value.trim();

    document.getElementById("confirmationMessage")
      .textContent =
      "Gracias, " + name +
      ". Tu solicitud se ha registrado en esta " +
      "demostración. Para recibir y gestionar " +
      "solicitudes reales, será necesario conectar " +
      "un sistema de almacenamiento y atención.";

    location.hash = "confirmacion";

    event.target.reset();

  });

/* ==========================================
   INICIAR SESIÓN - DEMOSTRACIÓN
========================================== */

document.getElementById("loginForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    showToast(
      "Acceso de demostración. " +
      "No se ha verificado una cuenta real."
    );

    location.hash = "portal";

  });

/* ==========================================
   REGISTRO
========================================== */

document.getElementById("registerForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.getElementById("registerName")
        .value.trim();

    document.getElementById("confirmationMessage")
      .textContent =
      "Gracias, " + name +
      ". El formulario de registro se completó " +
      "en esta demostración. No se ha creado " +
      "una cuenta real ni almacenado una contraseña.";

    location.hash = "confirmacion";

    event.target.reset();

  });

/* ==========================================
   RECUPERAR CONTRASEÑA
========================================== */

document.getElementById("recoveryForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    document.getElementById("confirmationMessage")
      .textContent =
      "La solicitud se completó en esta demostración. " +
      "No se ha enviado un correo de recuperación " +
      "porque todavía no existe un sistema de " +
      "autenticación conectado.";

    location.hash = "confirmacion";

    event.target.reset();

  });

/* ==========================================
   EDITAR PERFIL
========================================== */

document.getElementById("profileForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    client.name =
      document.getElementById("editName")
        .value.trim();

    client.email =
      document.getElementById("editEmail")
        .value.trim();

    client.phone =
      document.getElementById("editPhone")
        .value.trim();

    updateProfile();

    showToast(
      "Datos actualizados en esta demostración."
    );

    location.hash = "perfil";

  });

/* ==========================================
   CARGAR PERFIL
========================================== */

document.querySelectorAll('a[href="#perfil"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      updateProfile
    );

  });

updateProfile();

/* ==========================================
   FIN DEL JAVASCRIPT
========================================== */
