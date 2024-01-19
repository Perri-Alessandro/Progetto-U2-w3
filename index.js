const generateCards = function (array) {
  // manipolazione del DOM
  array.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `
          <div class="card h-100">
              <img src="${product.imageUrl}" class="card-img-top" alt="...">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text flex-grow-1">${product.description}</p>
                  <p class="card-text">${product.brand}</p>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                    product.price || "?"
                  }€</a>
                  <a href="./details.html?productId=${
                    product._id
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

const getProduct = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2YwMTE4N2U1YzAwMTgxNGM2MTciLCJpYXQiOjE3MDU2NTYwNjUsImV4cCI6MTcwNjg2NTY2NX0.vN6AZHr-d-ozVs7uUsptXyqVVrLq1ZGLOi-CWskCnNI",
    },
  })
    .then((risposta) => {
      if (risposta.ok) {
        console.log("FETCH ESEGUITA CORRETTAMENTE", risposta);
        return risposta.json();
      } else if (response.status === 400) {
        throw new Error("ERRORE 400");
      } else if (response.status === 401) {
        throw new Error("ERRORE 401");
      } else if (response.status === 500) {
        throw new Error("ERRORE 500");
      } else {
        throw new Error("ERRORE");
      }
    })
    .then((homeArray) => {
      console.log(
        "HOME ARRAY, RISULTATO/RISPOSTA RICEVUTA CORRETTAMENTE",
        homeArray
      );
    })
    .catch((errore) => {
      console.log("Errore generico", errore);
    });
};
getProduct();
