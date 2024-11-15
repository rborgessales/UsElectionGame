let states = [
    { nome: "Florida", delegados: 29 },
    { nome: "Texas", delegados: 38 },
    { nome: "California", delegados: 55 },
    { nome: "New York", delegados: 29 },
    { nome: "Utah", delegados: 6 }
]; // Exemplo de estados

let candidate1 = { nome: "", pontos: 0 };
let candidate2 = { nome: "", pontos: 0 };

function startGame() {
    candidate1.nome = document.getElementById("candidate1").value || "Candidato 1";
    candidate2.nome = document.getElementById("candidate2").value || "Candidato 2";

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    playGame();
}

function playGame() {
    let table = document.getElementById("stateTable");
    table.innerHTML = "";
    candidate1.pontos = 0;
    candidate2.pontos = 0;

    states.sort(() => Math.random() - 0.5); // Embaralha os estados

    let currentState = 0;

    function processState() {
        if (currentState >= states.length) {
            setTimeout(() => {
                document.getElementById("currentResult").innerHTML = `
                    <h3>Resultado Final:</h3>
                    <p>${candidate1.nome}: ${candidate1.pontos} delegados</p>
                    <p>${candidate2.nome}: ${candidate2.pontos} delegados</p>
                    <h2 class="highlight">
                        ${candidate1.pontos > candidate2.pontos ? candidate1.nome : candidate2.nome} é o vencedor!
                    </h2>`;
            }, 6000); // Espera 6 segundos antes de exibir o resultado
            return;
        }

        let state = states[currentState];
        let winner = Math.random() < 0.5 ? candidate1 : candidate2;
        winner.pontos += state.delegados;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${state.nome}</td>
            <td>${state.delegados}</td>
            <td>${winner.nome}</td>`;
        table.appendChild(row);

        document.getElementById("currentResult").textContent = `Estado ${state.nome} foi vencido por ${winner.nome}`;
        currentState++;
        setTimeout(processState, 5000); // Espera 5 segundos antes de processar o próximo estado
    }

    processState();
}
