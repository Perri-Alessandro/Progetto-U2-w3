const generateCards = function (arrayOfConcerts) {
  // manipolazione del DOM
  arrayOfConcerts.forEach((concert) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `
          <div class="card h-100">
              <img src="${concert.imageUrl}" class="card-img-top" alt="...">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${concert.name}</h5>
                  <p class="card-text flex-grow-1">${concert.description}</p>
                  <p class="card-text">${concert.brand}</p>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                    concert.price || "?"
                  }€</a>
                  <a href="./details.html?concertId=${
                    concert._id
                  }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                   VAI AI DETTAGLI 
                  </a>
              </div>
          </div>
          `;
    // ci manca solo da appendere questa col alla row degli eventi
    const eventsRow = document.getElementById("events-row");
    eventsRow.appendChild(newCol);
  });
};

const getBook = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2YwMTE4N2U1YzAwMTgxNGM2MTciLCJpYXQiOjE3MDU2NTYwNjUsImV4cCI6MTcwNjg2NTY2NX0.vN6AZHr-d-ozVs7uUsptXyqVVrLq1ZGLOi-CWskCnNI",
    },
  })
    .then((risposta) => {
      console.log("RISPOSTA DEL SERVER", risposta);
      if (risposta.ok) {
        console.log("FETCH ESEGUITA CORRETTAMENTE");
        return risposta.json();
      } else {
        throw new Error("Errore generico");
      }
    })
    .then((homeArray) => {
      console.log(
        "HOME ARRAY, RISULTATO/RISPOSTA RICEVUTA CORRETTAMENTE",
        homeArray
      );
    });
  const divBook = document.getElementById("divBook");
  const rowCard = document.createElement("div");
  rowCard.classList.add("row", "justify-content-center", "g-3");
  homeArray
    .forEach((concert, i) => {
      const contenutoCard = document.createElement("div");
      contenutoCard.classList.add("col-4");
      contenutoCard.innerHTML = `
                  <div class="card h-100">
              <img src="${concert.imageUrl}" class="card-img-top" alt="...">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${concert.name}</h5>
                  <p class="card-text flex-grow-1">${concert.description}</p>
                  <p class="card-text">${concert.brand}</p>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                    concert.price || "?"
                  }€</a>
                  <a href="./details.html?concertId=${
                    concert._id
                  }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                   VAI AI DETTAGLI 
                  </a>
              </div>
          </div>
      `;
      divBook.appendChild(rowCard);
      rowCard.appendChild(contenutoCard);

      const deleteButton = contenutoCard.querySelector(".btn-primary");
      deleteButton.addEventListener("click", function () {
        contenutoCard.closest(".col-4").remove();
        alert("OPZIONE SCARTATA DALLA LISTA");
      });

      const addToCartButton = contenutoCard.querySelector(".btn-danger");
      addToCartButton.addEventListener("click", function (e) {
        e.preventDefault();
        const card = this.closest(".col-4");
        const carrello = document.getElementById("carrello");
        const titolo = document.getElementsByClassName("card-title")[i];
        carrello.appendChild(titolo);
        titolo.classList.add("mb-4");
        card.classList.add("d-none");
        alert("IMMOBILE AGGIUNTO A CARRELLO");

        const bottTogliCarrello = document.createElement("button");
        bottTogliCarrello.textContent = "RIMUOVI";
        bottTogliCarrello.classList.add(
          "fs-5",
          "col-12",
          "py-1",
          "px-3",
          "bg-dark",
          "text-white",
          "mt-2"
        );
        titolo.appendChild(bottTogliCarrello);
        bottTogliCarrello.addEventListener("click", function () {
          card.classList.remove("d-none");
          titolo.remove();
          alert("IMMOBILE RIMOSSO DAL CARRELLO");
        });
      });
    })
    .catch((errore) => {
      console.log("Errore generico", errore);
    });
};

getBook();
