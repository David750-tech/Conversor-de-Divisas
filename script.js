function bienvenida() {
    alert("Bienvenido a El mercader, el mejor conversor de divisas!");
}

// consumo de api

var nombresEspañol = {
    AUD: "Dólar australiano",
    BRL: "Real brasileño",
    CAD: "Dólar canadiense",
    CHF: "Franco suizo",
    CNY: "Yuan chino",
    CZK: "Corona checa",
    DKK: "Corona danesa",
    EUR: "Euro",
    GBP: "Libra esterlina",
    HKD: "Dólar de Hong Kong",
    HUF: "Forinto húngaro",
    IDR: "Rupia indonesia",
    ILS: "Nuevo shekel israelí",
    INR: "Rupia india",
    ISK: "Corona islandesa",
    JPY: "Yen japonés",
    KRW: "Won surcoreano",
    MXN: "Peso mexicano",
    MYR: "Ringgit malasio",
    NOK: "Corona noruega",
    NZD: "Dólar neozelandés",
    PHP: "Peso filipino",
    PLN: "Zloty polaco",
    RON: "Leu rumano",
    SEK: "Corona sueca",
    SGD: "Dólar de Singapur",
    THB: "Baht tailandés",
    TRY: "Lira turca",
    USD: "Dólar estadounidense",
    ZAR: "Rand sudafricano"
};

function cargarDivisas() {
    fetch("https://api.frankfurter.dev/v1/currencies")
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            var selectOrigen = document.getElementById("divisaOrigen");
            var selectDestino = document.getElementById("divisaDestino");

            selectOrigen.innerHTML = "";
            selectDestino.innerHTML = "";

            for (var codigo in datos) {
                if (datos.hasOwnProperty(codigo)) {
                    var nombre = datos[codigo];
                    var nombreFinal = nombresEspañol[codigo] ? nombresEspañol[codigo] : nombre;

                    selectOrigen.innerHTML += "<option value='" + codigo + "'>" + codigo + " - " + nombreFinal + "</option>";
                    selectDestino.innerHTML += "<option value='" + codigo + "'>" + codigo + " - " + nombreFinal + "</option>";
                }
            }

            selectOrigen.value = "USD";
            selectDestino.value = "EUR";
        })
        .catch(function() {
            document.getElementById("resultado").innerHTML = "<h3>No se pudieron cargar las divisas.</h3>";
        });
}

function convertirDivisas(cantidad, divisaOrigen, divisaDestino) {
    var url = "https://api.frankfurter.dev/v1/latest?amount=" + cantidad + "&base=" + divisaOrigen + "&symbols=" + divisaDestino;

    fetch(url)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            var resultado = document.getElementById("resultado");
            var valorConvertido = datos.rates[divisaDestino];

            resultado.innerHTML = "<h3>Resultado: " + cantidad + " " + divisaOrigen + " = " + valorConvertido + " " + divisaDestino + "</h3>";
        })
        .catch(function() {
            document.getElementById("resultado").innerHTML = "<h3>No se pudo convertir en este momento.</h3>";
        });
}

function prepararFormulario() {
    var formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        var cantidad = document.getElementById("cantidad").value;
        var origen = document.getElementById("divisaOrigen").value;
        var destino = document.getElementById("divisaDestino").value;

        if (cantidad === "" || Number(cantidad) <= 0) {
            document.getElementById("resultado").innerHTML = "<h3>Ingresa una cantidad valida.</h3>";
            return;
        }

        if (origen === destino) {
            document.getElementById("resultado").innerHTML = "<h3>Selecciona dos divisas diferentes.</h3>";
            return;
        }

        convertirDivisas(cantidad, origen, destino);
    });

    formulario.addEventListener("reset", function() {
        document.getElementById("resultado").innerHTML = "";
    });
}

bienvenida();
cargarDivisas();
prepararFormulario();
