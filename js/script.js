// elementos html
const cidade = document.querySelector("input");
const btn = document.querySelector("button");
const localidade = document.querySelector("#localidade");
const temperatura = document.querySelector("#temperatura");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");
const img = document.querySelector(".clima-tempo img");
const descricao = document.querySelector("#descricao");
const resultado = document.querySelector(".resultado");

//----------------- eventos
// clique no botão
btn.addEventListener("click", () => {
  if (cidade.value) getDataApi();
});

// tecla ENTER no input chama a API
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getDataApi();
  }
});

//----------------- funções
async function getDataApi() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade.value}&units=metric&appid=${apiKey}&lang=pt_br`;

  try {
    await fetch(url)
      .then((response) => response.json()) //transforma em json
      .then((data) => {
        //se a cidade não existe
        if (data.cod && data.cod === "404") {
          return alert("Local não encontrado!");
        }
        showData(data);
      });
  } catch (error) {
    alert(error);
  }
}

function showData(data) {
  console.log(data);
  localidade.innerHTML = `${data.name}, ${data.sys.country}`;
  temperatura.innerHTML = `Temperatura: ${Math.round(data.main.temp)}ºC`;
  umidade.innerHTML = `Umidade: ${data.main.humidity}%`;
  vento.innerHTML = `Vento: ${Math.round(data.wind.speed * 3.6)} km/h`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  descricao.innerHTML = `${data.weather[0].description}`;
  resultado.classList.remove("hide");
}
