(function getSessionUserEmail() {
  let obj = document.cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
  }, {});
  let html = decodeURIComponent(obj?.userEmail);
  document.getElementById("getUserEmail").innerHTML = html;
})();

//

const socket = io.connect();

// Productos websocket
socket.on("lista-productos", (prods) => {
  renderProds(prods);
});

function renderProds(data) {
  const html = data
    .map((prod) => {
      return `<tr>
                      <td><img
                        width="50"
                        src=${prod.LinkFoto}
                        alt="not found"
                      /></td>
                     <td>${prod.Nombre}</td>
                     <td>${prod.Precio}</td>
                     
                   </tr>`;
    })
    .join(" ");

  document.getElementById("vista_productos").innerHTML = html;
}

// Carrito websocket
socket.on("carrito", (carrito) => {
  renderProds(carrito);
});

function renderProds(data) {
  const html = data
    .map((prod) => {
      return `<tr>
                      <td><img
                        width="50"
                        src=${prod.LinkFoto}
                        alt="not found"
                      /></td>
                     <td>${prod.Nombre}</td>
                     <td>${prod.Precio}</td>
                     
                   </tr>`;
    })
    .join(" ");

  document.getElementById("vista_productos").innerHTML = html;
}
