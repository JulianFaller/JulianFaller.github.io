// waehrungsumrechner.js

function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let resultElement = document.getElementById("result");

    // Feste Wechselkurse (Schweizer Franken anstelle von Britischen Pfund)
    let exchangeRates = {
        "USD": { "EUR": 0.85, "CHF": 0.92 },
        "EUR": { "USD": 1.18, "CHF": 1.08 },
        "CHF": { "USD": 1.09, "EUR": 0.93 }
    };

    // Überprüfung, ob die Konvertierung möglich ist
    if (fromCurrency === toCurrency) {
        resultElement.innerHTML = "Die Währungen müssen unterschiedlich sein!";
        return;
    }

    // Berechnung des Ergebnisses
    let convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
    resultElement.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
}
