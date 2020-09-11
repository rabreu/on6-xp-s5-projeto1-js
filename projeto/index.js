console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database.js')
const { produtos } = db
produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)

const read = require('readline-sync')

class Pedido {
    constructor() {
        this.produtos = []
        this.quantidade = []
        this.subtotal = 0
        this.desconto = 0
        this.total = 0
        this.data = new Date().toLocaleDateString('pt-BR')
    }

    adicionarProduto(id, quantidade) {
        const produto = produtos.filter(item => item.id === id)
        if(typeof produto[0] != 'undefined') {
            this.produtos.push(produto[0])
            this.quantidade.push(quantidade)
        } else {
            console.log("Produto não encontrado.")
        }
    }

    calcularSubTotal() {
        for(let i = 0; i < this.produtos.length ; i++) 
            this.subtotal =+ this.subtotal + (parseFloat(this.produtos[i].preco) * this.quantidade[i])
    }

    calcularDesconto(porcentagem) {
        this.desconto = this.subtotal * porcentagem/100
    }

    calcularTotal() {
        this.total = this.subtotal - this.desconto
    }

    exibirPedido() {
        let pedido = [];
        for(let i = 0 ; i < this.produtos.length ; i++) {
            p = {
                id: this.produtos[i].id,
                data: this.data,
                nome: this.produtos[i].nome,
                descricao: this.produtos[i].descricao,
                categoria: this.produtos[i].categoria,
                preco: this.produtos[i].preco,
                quantidade: this.quantidade[i],
            }
            pedido.push(p)
        }
        console.table(pedido)
    }
}

const pedido = new Pedido();
let adicionarMaisProduto
console.log("Inclusão de produtos.")
do {
    const id = parseInt(read.question("Código do produto (id): "))

    let quantidade;
    do {
        quantidade = parseInt(read.question("Quantidade: "))
        if(quantidade < 1)
            console.log("Quantidade precisa ser maior que 0.")
    } while(quantidade < 1)

    pedido.adicionarProduto(id, quantidade)
    
} while(read.question("Deseja adicionar mais produtos? (S/N) ").toUpperCase() != 'N')

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

pedido.exibirPedido()

pedido.calcularSubTotal()
console.log(`Subtotal: R$ ${pedido.subtotal.toFixed(2)}`)

pedido.calcularDesconto(porcentagem)
pedido.calcularTotal()
console.log(`Total: R$ ${pedido.total.toFixed(2)}`)