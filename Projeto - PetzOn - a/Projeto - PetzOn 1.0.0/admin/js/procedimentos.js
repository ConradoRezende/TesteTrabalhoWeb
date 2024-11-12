//JSON.parse converte o json em vetor
let dadosProcedimento = JSON.parse(localStorage.getItem('dadosProcedimento')) || [];

let nomeProcedimento = document.getElementById('procedimentoNome');
let dataProcedimento = document.getElementById('procedimentoData');

const chave = new URLSearchParams(window.location.search).get('chave');

if(chave){
    nomeProcedimento.value = dadosProcedimento[chave].nomeProcedimento;
    dataProcedimento.value = dadosProcedimento[chave].dataProcedimento;
        document.querySelector('#formProcedimentos button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formProcedimentos').addEventListener('submit', e =>{
    e.preventDefault();
    
    const procedimento = {
        nomeProcedimento: nomeProcedimento.value,
        dataProcedimento: dataProcedimento.value        
    };

    // push adiciona um item no vetor
    //dadosProcedimento.push(procedimento);
    //(condição)? bloco Verdadeiro : bloco Falso;
    (!chave)? dadosProcedimento.push(procedimento) : dadosProcedimento[chave] = procedimento;

    //JSON.stringify converte o vetor em Json
    localStorage.setItem('dadosProcedimento', JSON.stringify(dadosProcedimento));

    window.location.href = "./procedimentos.html";
});

function atualizarTabela(){
    const tbody = document.querySelector('#listaProcedimentos tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

    dadosProcedimento.forEach( (procedimento, id) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${procedimento.nomeProcedimento}</td>
            <td>${procedimento.dataProcedimento}</td>
            <td>
                <a href="?chave=${id}">Editar</a>
                <a href="#" onclick="removerProduto(${id})">Excluir</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function removerProduto(index){
    // Removendo item do vetor através da chave
    dadosProcedimento.splice(index, 1);

    localStorage.setItem('dadosProcedimento', JSON.stringify(dadosProcedimento));
    window.location.reload();
}

window.onload = atualizarTabela();''