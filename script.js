document.addEventListener("DOMContentLoaded", function () {
    const seletorMes = document.getElementById("mes-seletor");

    const mesSalvo = localStorage.getItem("mesSelecionado");
    const mesInicial = mesSalvo !== null ? parseInt(mesSalvo) : new Date().getMonth();

    seletorMes.value = mesInicial;
    gerarCalendario(mesInicial);
    carregarDicas();
    carregarPontosDescarte();
    document.getElementById("iniciar-quiz").onclick = iniciarQuiz;

    seletorMes.addEventListener("change", function () {
        const mesSelecionado = parseInt(seletorMes.value);
        localStorage.setItem("mesSelecionado", mesSelecionado);
        gerarCalendario(mesSelecionado);
    });
});

function gerarCalendario(mes) {
    const container = document.getElementById("calendario-container");
    container.innerHTML = "";

    const ano = new Date().getFullYear();
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const titulo = document.createElement("h3");
    titulo.textContent = `Coleta Seletiva – ${nomesMeses[mes]} ${ano}`;
    titulo.style.marginBottom = "10px";
    container.appendChild(titulo);

    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const ul = document.createElement("ul");

    for (let dia = 1; dia <= totalDias; dia++) {
        const data = new Date(ano, mes, dia);
        const diaSemana = data.getDay();

        if (diaSemana === 1 || diaSemana === 4) {
            const li = document.createElement("li");
            li.innerHTML = `<span style="color: green; font-weight: bold;">♻️ Dia ${dia} (${diasSemana[diaSemana]})</span> - Coleta Seletiva`;
            ul.appendChild(li);
        }
    }

    container.appendChild(ul);
}

function carregarDicas() {
    const dicas = [
        "Lave embalagens antes de descartar.",
        "Não misture resíduos orgânicos com recicláveis.",
        "Separe papel, plástico, metal e vidro.",
        "Evite descartar eletrônicos no lixo comum."
    ];

    const div = document.querySelector(".dica-lista");
    dicas.forEach((dica) => {
        const p = document.createElement("p");
        p.textContent = dica;
        div.appendChild(p);
    });
}

function carregarPontosDescarte() {
    const pontos = [
        "Cooperativa Recicla Mandaguari - Rua das Flores, 123",
        "Ecoponto Central - Avenida Brasil, 456",
        "UBS Jardim Progresso - Rua Verde, 789"
    ];

    const ul = document.getElementById("lista-pontos");
    pontos.forEach((ponto) => {
        const li = document.createElement("li");
        li.textContent = ponto;
        ul.appendChild(li);
    });
}

function iniciarQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = ""; // limpa quiz anterior

    const perguntas = [
        {
            pergunta: "Qual desses materiais é reciclável?",
            opcoes: ["Guardanapo sujo", "Lata de alumínio", "Restos de comida"],
            resposta: 1
        },
        {
            pergunta: "Qual a cor da lixeira para papel?",
            opcoes: ["Azul", "Verde", "Amarela"],
            resposta: 0
        },
        {
            pergunta: "O que deve ser feito antes de descartar embalagens?",
            opcoes: ["Misturar com lixo orgânico", "Lavar e secar", "Dobrar e queimar"],
            resposta: 1
        },
        {
            pergunta: "Qual é o principal benefício da coleta seletiva?",
            opcoes: ["Poluir mais rápido", "Evitar a reciclagem", "Reduzir o impacto ambiental"],
            resposta: 2
        },
        {
            pergunta: "Onde é o lugar correto para descartar pilhas e baterias?",
            opcoes: ["No lixo comum", "Em ecopontos ou locais apropriados", "No ralo da pia"],
            resposta: 1
        }
    ];

    let indice = 0;
    let pontuacao = 0;

    function mostrarPergunta() {
        container.innerHTML = "";

        if (indice >= perguntas.length) {
            let mensagem;
            if (pontuacao === 5) {
                mensagem = "Parabéns! Você acertou tudo!";
            } else if (pontuacao >= 3) {
                mensagem = "Muito bem! Continue aprendendo.";
            } else {
                mensagem = "Você pode melhorar! Tente novamente.";
            }

            container.innerHTML = `
                <p>Você acertou <strong>${pontuacao}</strong> de ${perguntas.length} perguntas.</p>
                <p>${mensagem}</p>
            `;
            return;
        }

        const p = document.createElement("p");
        p.textContent = perguntas[indice].pergunta;
        container.appendChild(p);

        perguntas[indice].opcoes.forEach((opcao, i) => {
            const botao = document.createElement("button");
            botao.textContent = opcao;
            botao.onclick = () => {
                if (i === perguntas[indice].resposta) {
                    pontuacao++;
                }
                indice++;
                mostrarPergunta();
            };
            container.appendChild(botao);
        });
    }

    mostrarPergunta();
}

