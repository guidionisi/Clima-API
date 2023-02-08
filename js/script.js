// importa as configurações do arquvo de configuração config.js
import * as config from "./config.js";

//---------------------- recupera os elementos html ----------------------
const cidade = document.querySelector("input");
const btn = document.querySelector("button");
const error = document.querySelector(".error");
const resultado = document.querySelectorAll(".resultado");

// percorre a listagem de cidades e aplica a função para pegar os dados da API
// traz a listagem de cidade do arquivo de configuração
const listaCidades = config.cidades;
listaCidades.forEach((cidade) => {
  getDataApi(cidade);
  // previsaoExpandida();
});

// acessa a api com nome da cidade e chave api e retorna os dados meteorológicos em json
async function getDataApi(cidade) {
  // traz a chave do arquivo de configuração
  const apiKey = config.apiKey;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

  try {
    await fetch(url)
      .then((response) => response.json()) //transforma em json
      .then((data) => {
        if (data.cod && data.cod === "404") {
          //se a cidade não existe
          showError();
          return false;
        } else {
          hideError();
          showData(data);
          insertCityListHeader(data);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

//---------------------- funções ----------------------

// insere a lista de cidades no header
function insertCityListHeader(data) {
  const ul = document.querySelector("header ul");
  const li_city = document.createElement("li");
  ul.appendChild(li_city);
  li_city.innerText = ` | ${data.name}`;
}

// cria os itens de lista e insere os dados na tela
function showData(data) {
  // ----- 1º - cria um item li para incluir os dados meteorológicos
  // ----- 2º - insere na li o html para apresentar os dados
  // ----- 3º - insere os dados vindos da api

  // seleciona a lista
  const ul = document.querySelector(".container-lista-cidades ul");

  // cria um elemento de lista
  const li = document.createElement("li");

  // insere o li na ul
  ul.appendChild(li);

  // aplica as classes resultado e card ao elemento
  li.classList.add("card");

  // ----- cria e depois insere as tag html para compor o card e insere os dados da api
  //
  const cidade_nome = data.name;
  const pais_nome = data.sys.country;
  const temperatura_valor = Math.round(data.main.temp);
  const umidade_valor = data.main.humidity;
  const vento_valor = Math.round(data.wind.speed * 3.6);
  const climaTempo_icon = data.weather[0].icon;
  const climaTempo_descricao = data.weather[0].description;

  //título com o nome da cidade
  const h2 = `<h2 id="titulo">${cidade_nome}, ${pais_nome}</h2>`;

  //ícone e temperatura
  const thermometer = `<div><img class="icon" src="img/thermometer.svg" alt="ícone de temperatura"><span>Temperatura: ${temperatura_valor}ºC</span></div>`;
  //ícone e umidade
  const humidity = `<div><img class="icon" src="img/humidity.svg" alt="ícone de umidade"><span>Umidade: ${umidade_valor}%</span></div>`;
  //ícone e velocidade do vento
  const wind = `<div><img class="icon" src="img/wind.svg" alt="ícone de vento"><span>Vento: ${vento_valor} km/h</span></div>`;
  //imagem e descrição do clima-tempo
  const climaTempo = `<div class='clima-tempo'>
  <img src="http://openweathermap.org/img/wn/${climaTempo_icon}@2x.png" alt="ícone clima-tempo">
      <span>${climaTempo_descricao}</span>
      </div>`;

  //cria a estrutura para o DOM
  li.innerHTML =
    "<a href='#'> <div>" +
    h2 +
    thermometer +
    humidity +
    wind +
    "</div>" +
    climaTempo +
    "</a>";
}

//---------------------- apelos visuais para indicar erro no preenchimento da busca
// mostra mensagem de erro no DOM
function showError() {
  error.style.display = "block";
}
// esconde mensagem de erro non DOM
function hideError() {
  error.style.display = "none";
}

//---------------------- eventos do input busca----------------------
// chama a api com clique no botão
btn.addEventListener("click", () => {
  // if (cidade.value) getDataApi(cidade.value, listaCidades.length, apiKey);
  if (cidade.value) getDataApi(cidade.value);
});

// ativa a tecla ENTER no input para chamar a API
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // getDataApi(cidade.value, listaCidades.length, apiKey);
    getDataApi(cidade.value);
  }
});
