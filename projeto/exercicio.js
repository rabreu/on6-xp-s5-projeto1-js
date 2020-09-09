function exercicio(num) {
    console.log(`============================================================`)
    console.log(`==================== EXERCÍCIO ${num} ===========================`)
    console.log(`============================================================`)
}

// Exercício 1
// Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo database.js
exercicio(1)

const db = require('./database.js')
const { produtos } = db
produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)

// Exercício 2
// Receber via terminal as entradas de id e quantidade dos produtos a serem adquiridos.
exercicio(2)

const read = require('readline-sync')

class Pedido {
    constructor() {
        this.id = []
        this.quantidade = []
    }

    adicionarProduto(id, quantidade) {
        this.id.push(id)
        this.quantidade.push(quantidade)
    }
}

const pedido = new Pedido();
console.log("Inclusão de produtos. Digite [-1] para sair.")
while(true) {
    const id = parseInt(read.question("Qual o produto (id)? "))
    if(id < 0)
        break;
    const quantidade = parseInt(read.question("Quantidade? "))
    pedido.adicionarProduto(id, quantidade)
}

// Exercício 3
// Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.
exercicio(3)

const cupom = read.question("Possui cupom de desconto? ").toString()
let desconto = 0
switch(cupom) {
    case "10":
        console.log("Você tem 10% de desconto!")
        desconto = 10
        break;
    default:
        console.log("Sem desconto.")
}

// Exercício 4
// Calcular o valor do subtotal (sem considerar o desconto)
exercicio(4)

let subtotal = 0
for(let i = 0; i < pedido.id.length ; i++) {
    const produto = produtos.filter(item => item.id === pedido.id[i])
    subtotal =+ produto[0].preco * pedido.quantidade[i]
}
console.log(`Subtotal: R$ ${subtotal.toFixed(2)}`)

// Exercício 5
// Calcular o valor total (considerando o desconto do cupom)
exercicio(5)

const total = subtotal - (subtotal * desconto/100)
console.log(`Total: R$ ${total.toFixed(2)}`)

// Exercício 6
// Apresentar no console:
// -a tabela contendo a lista de produtos adquiridos, incluindo a quantidade de cada produto
// -o valor subtotal em Reais
// -o valor do desconto em Reais
// -o valor total em Reais
// -a data da compra
exercicio(6)