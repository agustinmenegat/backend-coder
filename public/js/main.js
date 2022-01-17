const socket = io();

socket.on("productos", function (data) {
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<tbody>
                  <tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td><img src=${elem.thumbnail} alt="Productos"></td>
                  </tr>
              </tbody>`;
    })
    .join(" ");

  document.getElementById("productos").innerHTML = html;
}

function addProducto(e) {

  var producto = {
    title: document.getElementById("fname").value,
    price: document.getElementById("fprice").value,
    thumbnail: document.getElementById("fimage").value,
  };
  socket.emit("nuevo-producto", producto);
  form.reset();
  return false;
}

//Mensajes
socket.on('mensajes', (data)=>{
    renderr(data);
});

let renderr = (data) => {
    let html = 
    data.map((mensajeChat)=>`
        <div class="fila">
            <strong style="color:blue">${mensajeChat.email}</strong>
            <e style="color:brown">[${mensajeChat.fechaHora}]</e>
            <em style="color:green">${mensajeChat.texto}</em>
        </div>
    `).join(' ');
    document.getElementById('mensajes').innerHTML = html;
}

function envioMensaje(f){
    let email = document.getElementById('email').value;
    let texto = document.getElementById('mensaje').value;
    const hoy = new Date();
    let fecha = hoy.getDate() +'-'+ (hoy.getMonth()+1)+'-'+hoy.getFullYear();
    let hora = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    let fechaHora = fecha+" "+hora;
    socket.emit('nuevo-mensaje', {email, fechaHora, texto});
    formchat.reset();
    return false;
}