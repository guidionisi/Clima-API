//---------------------- elementos html ----------------------
const cidade = document.querySelector("input");
const btn = document.querySelector("button");
const error = document.querySelector(".error");
const localidade = document.querySelectorAll("#localidade");
const temperatura = document.querySelectorAll("#temperatura");
const umidade = document.querySelectorAll("#umidade");
const vento = document.querySelectorAll("#vento");
const img = document.querySelectorAll(".clima-tempo img");
const descricao = document.querySelectorAll("#descricao");
const resultado = document.querySelectorAll(".resultado");

//lista de cidades e carregamento para o DOM
const listaCidades = [
  "Carazinho",
  "Espumoso",
  "Lageado",
  "Passo Fundo",
  "Sarandi",
  "Tio Hugo",
];
listaCidades.forEach((cidade, index) => {
  getDataApi(cidade, index, apiKey);
  console.log(cidade, index);
});

//---------------------- eventos ----------------------
// clique no botão
btn.addEventListener("click", () => {
  if (cidade.value) getDataApi(cidade.value, listaCidades.length, apiKey);
});

// tecla ENTER no input chama a API
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getDataApi(cidade.value, listaCidades.length, apiKey);
  }
});

//---------------------- funções ----------------------

// entra com o lugar e a chave da API e retorna os dados meteorológicos informados pela função showData()
async function getDataApi(cidade, index, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

  try {
    await fetch(url)
      .then((response) => response.json()) //transforma em json
      .then((data) => {
        if (data.cod && data.cod === "404") {
          //se a cidade não existe
          showError();
        } else {
          hideError();
          showData(data, index);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

// mostra os dados na tela de acordo com o índice da cidade
function showData(data, i) {
  localidade[i].innerHTML = `${data.name}, ${data.sys.country}`;
  temperatura[i].innerHTML = `Temperatura: ${Math.round(data.main.temp)}ºC`;
  umidade[i].innerHTML = `Umidade: ${data.main.humidity}%`;
  vento[i].innerHTML = `Vento: ${Math.round(data.wind.speed * 3.6)} km/h`;
  img[
    i
  ].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  descricao[i].innerHTML = `${data.weather[0].description}`;
  resultado[i].classList.remove("hide");
  console.log(data);
}

//apelos visuais para indicar erro no preenchimento da busca
function showError() {
  cidade.style.boxShadow = "2px 2px 10px 4px #d0d0d0";
  error.style.display = "block";
  resultado.classList.add("hide");
}

function hideError() {
  cidade.style.removeProperty("box-shadow");
  error.style.display = "none";
}
