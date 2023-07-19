const botao= document.querySelector("#adicionar");
const input = document.querySelector("#input");

botao.addEventListener('click', (event) => {
    document.querySelector("#input").innerHTML += '<div class="col-12 col-sm-6 col-md-4 w-50 mb-4"><label class="form-label">Nome:</label><input type="text" class="form-control" placeholder="Nome"  name = "Nome" required></div><div class="col-12 col-sm-6 col-md-4 w-50 mb-4"><label class="form-label">Peso:</label><input type="number" class="form-control" placeholder="Peso" name = "Peso" required></div>';
});
