// creiamo innanzitutto i riferimenti agli elementi della pagina
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const imgInput = document.getElementById("imgUrl");

const form = document.getElementById("house-form");
const myURL = "https://striveschool-api.herokuapp.com/api/product";

// PARTE FINALE DELLA LEZIONE
// ora il form deve servire anche in modalità "MODIFICA" evento
// come faccio a capire se la pagina backoffice si è caricata in modalità CREA o in modalità MODIFICA?
// se ho il parametro "concertId" nella barra degli indirizzi, sono in modalità MODIFICA!
// se NON ho il parametro "concertId" nella barra degli indirizzi, sono in modalità CREAZIONE!

// const addressBarContent = new URLSearchParams(location.search);
// console.log(addressBarContent);
// // estrapolo dai parametri dell'indirizzo quello che in index.js ho chiamato "concertId"
// const concertId = addressBarContent.get("concertId");
// console.log(concertId);

// if (concertId) {
// cambiamo il titolo del form
document.getElementById("form-title").innerText = "Form di modifica evento";
// recupero le informazioni da riempire nel form con una fetch() CHIRURGICA
// fetch(myURL, {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2YwMTE4N2U1YzAwMTgxNGM2MTciLCJpYXQiOjE3MDU2NTYwNjUsImV4cCI6MTcwNjg2NTY2NX0.vN6AZHr-d-ozVs7uUsptXyqVVrLq1ZGLOi-CWskCnNI",
//   },
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error(
//         "non sono riuscito a recuperare l'evento per ripopolare il form"
//       );
//     }
//   })
//   .then((singleConcert) => {
//     // ho ottenuto i dettagli di un singolo concerto!
//     // ripopolo il form
//     nameInput.value = singleConcert.name;
//     descriptionInput.value = singleConcert.description;
//     brandInput.value = singleConcert.brand;
//     priceInput.value = singleConcert.price;
//     imgInput.value = singleConcert.imageUrl;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// sovrascrivo il comportamento di default del form
form.addEventListener("submit", function (e) {
  e.preventDefault(); // evitiamo che la pagina si aggiorni!
  // ora raccolgo i dati del form
  // genero un oggetto

  // la FORMA (schema) dell'oggetto da inviare alle API non è a caso!
  // è stata pensata dal backender che ha creato l'API
  // in genere, vi verrà fornita

  const newConcert = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    image: imgInput.value,
  };

  console.log("ecco i dati raccolti dal form che sto per inviare:", newConcert);

  //   let URLToUse;
  //   let methodToUse;

  //   if (concertId) {
  //     methodToUse = "PUT";
  //     URLToUse = myURL + "/" + concertId;
  //   } else {
  //     methodToUse = "POST";
  //     URLToUse = myURL;
  //   }

  fetch(myURL, {
    method: "POST", // alcune volte sarà PUT
    // method: concertId ? 'PUT' : 'POST', // alcune volte sarà PUT, metodo extreme delle 13:11 con operatore ternario
    body: JSON.stringify(newConcert), // il body in una fetch può essere SOLAMENTE una stringa
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2YwMTE4N2U1YzAwMTgxNGM2MTciLCJpYXQiOjE3MDU2NTYwNjUsImV4cCI6MTcwNjg2NTY2NX0.vN6AZHr-d-ozVs7uUsptXyqVVrLq1ZGLOi-CWskCnNI",
      "Content-Type": "application/json", // informiamo l'API che , nonostante il body sia una stringa, in origina era un oggetto
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        // il concerto è stato creato correttamente!
        alert("CONCERTO SALVATO!");
        // svuoto il form
        nameInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "";
        brandInput.value = "";
        imgInput.value = "";
      } else {
        alert("PROBLEMA NEL SALVATAGGIO!");
        // hai sbagliato qualcosa nella richiesta?
      }
    })
    .then((singleConcert) => {
      nameInput.value = singleConcert.name;
      descriptionInput.value = singleConcert.description;
      brandInput.value = singleConcert.brand;
      priceInput.value = singleConcert.price;
      imgInput.value = singleConcert.imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
});
