//JSON.parse converte o json em vetor
let dados = JSON.parse(localStorage.getItem('dados')) || [];

let nomeproduto = document.getElementById('produto');
let quantidade = document.getElementById('quantidade');
let data = document.getElementById('data');

const chave = new URLSearchParams(window.location.search).get('chave');

if(chave){
    nomeproduto.value = dados[chave].nomeproduto;
    quantidade.value = dados[chave].quantidade;
    data.value = dados[chave].data;
        document.querySelector('#formvendas button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formvendas').addEventListener('submit', e =>{
    e.preventDefault();

    const produto = {
        nomeproduto: nomeproduto.value,
        quantidade: quantidade.value,
        data: data.value        
    };

    // push adiciona um item no vetor
    //dados.push(produto);
    //(condição)? bloco Verdadeiro : bloco Falso;
    (!chave)? dados.push(produto) : dados[chave] = produto;

    //JSON.stringify converte o vetor em Json
    localStorage.setItem('dados', JSON.stringify(dados));

    window.location.href = "./vendas.html";
});

function atualizarTabela(){
    const tbody = document.querySelector('#vendas tbody');

    dados.forEach( (produto, id) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeproduto}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.data}</td>
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
    dados.splice(index, 1);

    localStorage.setItem('dados', JSON.stringify(dados));
    window.location.reload();
}

window.onload = atualizarTabela;''