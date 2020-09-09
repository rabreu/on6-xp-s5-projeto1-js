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
        this.nome = []
        this.preco = []
        this.quantidade = []
        this.subtotal = 0
        this.desconto = 0
        this.total = 0
        this.data = new Date().toLocaleDateString('pt-BR')
    }

    adicionarProduto(id, quantidade) {
        const produto = produtos.filter(item => item.id === id)
        if(typeof produto[0] != 'undefined') {
            this.id.push(id)
            this.nome.push(produto[0].nome)
            this.preco.push(parseFloat(produto[0].preco))
            this.quantidade.push(quantidade)
        } else {
            console.log("Produto não encontrado.")
        }
    }

    calcularSubTotal() {
        for(let i = 0; i < this.id.length ; i++)
            this.subtotal =+ this.subtotal + (this.preco[i] * this.quantidade[i])
    }

    calcularDesconto(porcentagem) {
        this.desconto = this.subtotal * porcentagem/100
    }

    calcularTotal() {
        this.total = this.subtotal - this.desconto
    }
}

const pedido = new Pedido();
console.log("Inclusão de produtos. Digite [-1] para terminar.")
while(true) {
    const id = parseInt(read.question("Código do produto (id): "))
    if(id < 0)
        break;
    const quantidade = parseInt(read.question("Quantidade: "))
    if(quantidade < 0)
        break;
    pedido.adicionarProduto(id, quantidade)
}

// Exercício 3
// Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.
exercicio(3)

const cupom = read.question("Possui cupom de desconto? ").toString()
let porcentagem = 0
switch(cupom) {
    case "10":
        console.log("Você tem 10% de desconto!")
        porcentagem = 10
        break;
    default:
        console.log("Sem desconto.")
}

// Exercício 4
// Calcular o valor do subtotal (sem considerar o desconto)
exercicio(4)

pedido.calcularSubTotal()
console.log(`Subtotal: R$ ${pedido.subtotal.toFixed(2)}`)

// Exercício 5
// Calcular o valor total (considerando o desconto do cupom)
exercicio(5)

pedido.calcularDesconto(porcentagem)
pedido.calcularTotal()
console.log(`Total: R$ ${pedido.total.toFixed(2)}`)

// Exercício 6
// Apresentar no console:
// -a tabela contendo a lista de produtos adquiridos, incluindo a quantidade de cada produto
// -o valor subtotal em Reais
// -o valor do desconto em Reais
// -o valor total em Reais
// -a data da compra
exercicio(6)

let pedidos = []
pedidos.push(pedido)

for(let i = 0 ; i < pedidos.length ; i++) {
    for(let j = 0 ; j < pedidos[i].preco.length ; j++)
        pedidos[i].preco[j] = "R$ " + pedidos[i].preco[j].toFixed(2)
    pedidos[i].subtotal = "R$ " + pedidos[i].subtotal.toFixed(2)
    pedidos[i].desconto = "R$ " + pedidos[i].desconto.toFixed(2)
    pedidos[i].total = "R$ " + pedidos[i].total.toFixed(2)
}

console.table(pedidos)