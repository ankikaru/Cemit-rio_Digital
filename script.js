// Função para adicionar uma estrela
function addEstrela() {
    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('nascimento').value;
    const obito = document.getElementById('obito').value;

    // Validação dos campos
    if (!nome || !nascimento || !obito) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Calcular a idade da pessoa
    const idade = calcularIdade(nascimento, obito);

    // Gerar o tamanho da estrela proporcional à idade
    const tamanhoEstrela = idade / 2; // Exemplo: 1 ano = 0.5px, você pode ajustar esse valor

    // Posição aleatória para a estrela
    const ceu = document.getElementById('ceu');
    const estrela = document.createElement('div');
    const x = Math.random() * ceu.offsetWidth; // Posição horizontal
    const y = Math.random() * ceu.offsetHeight; // Posição vertical

    // Estilo da estrela
    estrela.style.position = 'absolute';
    estrela.style.left = `${x}px`;
    estrela.style.top = `${y}px`;
    estrela.style.width = `${tamanhoEstrela}px`;
    estrela.style.height = `${tamanhoEstrela}px`;
    estrela.style.borderRadius = '50%';
    estrela.style.backgroundColor = 'white';
    estrela.title = `${nome} (${nascimento} - ${obito})`; // Exibe o nome e as datas

    // Adicionar a classe "estrela" para animar o brilho
    estrela.classList.add('estrela');

    // Armazenar a estrela no localStorage
    salvarEstrela(nome, nascimento, obito, x, y, tamanhoEstrela);

    // Adicionar a estrela ao "ceu"
    ceu.appendChild(estrela);
}

// Função para calcular a idade de uma pessoa com base na data de nascimento e óbito
function calcularIdade(nascimento, obito) {
    const nascimentoDate = new Date(nascimento);
    const obitoDate = new Date(obito);
    const diffInMilliseconds = obitoDate - nascimentoDate;
    const anos = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Convertendo de milissegundos para anos
    return Math.floor(anos);
}

// Função para salvar as estrelas no localStorage
function salvarEstrela(nome, nascimento, obito, x, y, tamanhoEstrela) {
    let estrelas = JSON.parse(localStorage.getItem('estrelas')) || [];
    estrelas.push({ nome, nascimento, obito, x, y, tamanhoEstrela });
    localStorage.setItem('estrelas', JSON.stringify(estrelas));
}

// Função para carregar as estrelas salvas
function carregarEstrelas() {
    const estrelas = JSON.parse(localStorage.getItem('estrelas')) || [];
    estrelas.forEach(estrela => {
        const ceu = document.getElementById('ceu');
        const novaEstrela = document.createElement('div');
        novaEstrela.style.position = 'absolute';
        novaEstrela.style.left = `${estrela.x}px`;
        novaEstrela.style.top = `${estrela.y}px`;
        novaEstrela.style.width = `${estrela.tamanhoEstrela}px`;
        novaEstrela.style.height = `${estrela.tamanhoEstrela}px`;
        novaEstrela.style.borderRadius = '50%';
        novaEstrela.style.backgroundColor = 'white';
        novaEstrela.title = `${estrela.nome} (${estrela.nascimento} - ${estrela.obito})`;

        // Adicionar a classe "estrela" para animar o brilho
        novaEstrela.classList.add('estrela');

        ceu.appendChild(novaEstrela);
    });
}

// Carregar as estrelas quando a página for carregada
window.onload = function() {
    carregarEstrelas(); // Carrega as estrelas armazenadas no localStorage
};
