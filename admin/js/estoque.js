//JSON.parse converte o json em vetor
let dadosProduto = JSON.parse(localStorage.getItem('dadosProduto')) || [];

let nomeProduto = document.getElementById('nomeProduto');
let precoProduto = document.getElementById('precoProduto');
let quantidadeProduto = document.getElementById('quantidadeProduto');

const chave = new URLSearchParams(window.location.search).get('chave');

if(chave){
    nomeProduto.value = dadosProduto[chave].nomeProduto;
    precoProduto.value = dadosProduto[chave].precoProduto;
    quantidadeProduto.value = dadosProduto[chave].quantidadeProduto;

        document.querySelector('#formProduto button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formProduto').addEventListener('submit', e =>{
    e.preventDefault();
    
    const produto = {
        nomeProduto: nomeProduto.value,
        precoProduto: precoProduto.value,
        quantidadeProduto: quantidadeProduto.value          
    };

    // push adiciona um item no vetor
    //dadosProduto.push(produto);
    //(condição)? bloco Verdadeiro : bloco Falso;
    (!chave)? dadosProduto.push(produto) : dadosProduto[chave] = produto;

    //JSON.stringify converte o vetor em Json
    localStorage.setItem('dadosProduto', JSON.stringify(dadosProduto));

    window.location.href = "./estoque.html";
});

function atualizarTabela(){
    const tbody = document.querySelector('#listaProduto tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

    dadosProduto.forEach( (produto, id) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeProduto}</td>
            <td>${produto.precoProduto}</td>
            <td>${produto.quantidadeProduto}</td>
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
    dadosProduto.splice(index, 1);

    localStorage.setItem('dadosProduto', JSON.stringify(dadosProduto));
    window.location.reload();
}

window.onload = atualizarTabela();''