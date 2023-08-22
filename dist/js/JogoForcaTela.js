import { JogoForca } from "./JogoForca.js";
export class JogoForcaTela {
    constructor() {
        this.imagem = document.getElementById("imagem");
        this.palavra = document.getElementById("palavra");
        this.leitor = document.getElementById("leitor");
        this.mensagemTentativas = document.getElementById("tentativas");
        this.btnTentar = document.getElementById("btnTentar");
        this.btnResetar = document.getElementById("btnResetar");
        this.mensagem = document.getElementById("mensagem");
        this.teclado = document.getElementById("teclado");
        this.jogoForca = new JogoForca();
        this.iniciar();
    }
    iniciar() {
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        this.palavra.textContent = this.jogoForca.palavraVisivel.join('');
        this.btnTentar.addEventListener('click', () => this.verificarResultado());
        this.btnResetar.addEventListener('click', () => this.resetar());
        this.criarTeclado();
    }
    criarTeclado() {
        let alfabeto = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(',');
        alfabeto.forEach(l => {
            let botao = document.createElement("button");
            botao.textContent = l;
            botao.id = l;
            botao.addEventListener('click', (e) => this.clicarBotao(e));
            this.teclado.appendChild(botao);
        });
    }
    clicarBotao(e) {
        let botao = e.target;
        this.leitor.value = botao.textContent == null ? "" : botao.textContent;
        this.verificarResultado();
    }
    verificarResultado() {
        let letra = this.leitor.value.toUpperCase();
        if (letra.length > 1) {
            this.mensagem.textContent = "Digite apenas uma letra!";
            return;
        }
        if (this.jogoForca.palavraVisivel.join('').includes(letra)) {
            this.mensagem.textContent = "Você já digitou essa letra!";
            return;
        }
        let ehCorreto = this.jogoForca.verificarLetras(letra);
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.leitor.value = "";
        let botao = document.getElementById(letra.toLowerCase());
        botao.disabled = true;
        if (ehCorreto) {
            this.mensagem.textContent = "Você acertou!";
            if (this.jogoForca.palavraEstaCerta()) {
                this.mensagem.textContent = "Parabéns você venceu!";
                this.btnTentar.disabled = true;
            }
            return;
        }
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        if (this.jogoForca.jogoAcabou()) {
            this.mensagem.textContent = "Você perdeu!";
            this.palavra.textContent = this.jogoForca.palavraSecreta;
            this.btnTentar.disabled = true;
            return;
        }
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.mensagem.textContent = "Você errou!";
    }
    resetar() {
        this.jogoForca.resetar();
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        this.leitor.value = "";
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.btnTentar.disabled = false;
        this.mensagem.textContent = "Digite uma letra";
        let botoes = [];
        this.teclado.childNodes.forEach(b => botoes.push(b));
        botoes.forEach(c => c.disabled = false);
    }
}
