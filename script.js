//variaveis
const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;


// carregar o cabeçalho independete de página
document.addEventListener("DOMContentLoaded", function () {
    // Carregar o cabeçalho
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o cabeçalho:", error));

    // Carregar o footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o footer:", error));
});


//interativadade do botão
function helloWorld() {
    alert('Hello World!');
}


//formulário
function mostrarDados() {
    let dadosValidos = verificarCampos();

    if (dadosValidos)
        alert("Obrigado, sua mensagem foi enviada e logo retornaremos!");

    // console.log(document.getElementById('nome').value);
    // console.log(document.getElementById('email').value);
    // console.log(document.getElementById('mensagem').value);
}

function verificarCampos() {
    let valido = false;
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let mensagem = document.getElementById('mensagem').value;

    if (nome == '' || email == '' || mensagem == '') {
        alert('Por favor, preencha todos os campos!');
    } else {
        if (!regexEmail.test(email)) {
            alert('Por favor, digite um email válido!');
        } else
            valido = true;
    }

    return valido;
}

// calculadora
function somarValores() {
    let resultado = 0;
    let primeiroNumero = !document.getElementById('num1').value == '' ? parseInt(document.getElementById('num1').value) : 0;
    let segundoNumero = !document.getElementById('num2').value == '' ? parseInt(document.getElementById('num2').value) : 0;

    resultado = primeiroNumero + segundoNumero;

    mostrarValorResultado(resultado);
    event.preventDefault();
}

function mostrarValorResultado(resultado) {
    document.getElementById('resultado').value = resultado;
}




//API
function getWeather(latitude, longitude) {
    // URL para o seu webservice.php, passando latitude e longitude
    const url = `http://localhost:8000/webservice.php?latitude=${latitude}&longitude=${longitude}`;

    fetch(url)
        .then(response => {
            // Verifica se a resposta é JSON válido
            return response.json().catch(err => {
                throw new Error("Resposta não é um JSON válido.");
            });
        })
        .then(data => {
            // Verifica se há um erro nos dados recebidos do webservice.php
            if (data.error) {
                throw new Error(data.error);
            }

            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherInfoElement = document.getElementById('weather-info');
            
            weatherInfoElement.classList.remove('loading');
            weatherInfoElement.innerHTML = `
                <li id="weather">
                    Temperatura: ${temperature}°C
                    <br>
                    Descrição: ${description}
                </li>
            `;
        })
        .catch(error => {
            console.error('Erro ao obter os dados de clima:', error);
            document.getElementById('weather-info').innerHTML = '<li id="weather">Não foi possível obter a temperatura.</li>';
        });
}

function getLocation() {
    const weatherInfoElement = document.getElementById('weather-info');
    weatherInfoElement.classList.add('loading');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeather(latitude, longitude);
            },
            error => {
                console.error('Erro ao obter a localização:', error);
                weatherInfoElement.innerHTML = '<li id="weather">Não foi possível obter a localização.</li>';
            }
        );
    } else {
        weatherInfoElement.innerHTML = '<li id="weather">Geolocalização não é suportada pelo seu navegador.</li>';
    }
}

window.onload = getLocation;
