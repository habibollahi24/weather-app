// api.openweathermap.org/data/2.5/weather?q=tehran&appid=9257acbdce6b8c5fc096d48e99aa4b16&units=metric
//https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const loading = document.querySelector(".loading")
const eror = document.querySelector(".error");


function postData(e) {
  e.preventDefault();
  eror.innerText = "";
  let inputValue = input.value;
  const header = document.createElement("h1");
  header.innerText = "Loading ...";
  loading.appendChild(header);


  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=9257acbdce6b8c5fc096d48e99aa4b16&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
        loading.innerText = "";
      const { weather, main, sys } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const dataCard = document.createElement("section");

      dataCard.classList.add("section");

      dataCard.innerHTML = `
            <div class="name">
              <span>${inputValue.toUpperCase()}</span>
              <span>${sys.country}</span>
            </div>
            <div class="degre">${Math.round(main.temp)}&degc</div>
            <img class="icon" src='${icon}'>
            <div class="description">${weather[0].description}</div>
            `;
      list.appendChild(dataCard);
    })
    .catch(() => {
      eror.innerText = "please enter a valid city";
    });
  input.value = "";
}
form.addEventListener("submit", postData);
