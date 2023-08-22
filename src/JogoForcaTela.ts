import { JogoForca } from "./JogoForca.js";

export class JogoForcaTela {
    imagem: HTMLImageElement = document.getElementById("imagem") as HTMLImageElement;
    palavra: HTMLDivElement = document.getElementById("palavra") as HTMLDivElement;
    leitor: HTMLInputElement = document.getElementById("leitor") as HTMLInputElement;
    mensagemTentativas: HTMLParagraphElement = 
        document.getElementById("tentativas") as HTMLInputElement;
    btnTentar: HTMLButtonElement =      
        document.getElementById("btnTentar") as HTMLButtonElement ;
    btnResetar: HTMLButtonElement = 
        document.getElementById("btnResetar") as HTMLButtonElement;
    mensagem: HTMLDivElement = document.getElementById("mensagem") as HTMLDivElement;
    teclado: HTMLDivElement = document.getElementById("teclado") as HTMLDivElement;

    jogoForca: JogoForca = new JogoForca();

    constructor() {
        this.iniciar();
    }

    iniciar(): void {
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        this.palavra.textContent = this.jogoForca.palavraVisivel.join('');

        this.btnTentar.addEventListener('click', () => this.verificarResultado());
        this.btnResetar.addEventListener('click', () => this.resetar());

        this.criarTeclado();
    }

    criarTeclado(): void {
        let alfabeto: string[] = 
        "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(',');
        
        alfabeto.forEach(l => {
            let botao = document.createElement("button");
            botao.textContent = l;
            botao.id = l;
            botao.addEventListener('click', (e) => this.clicarBotao(e));
            this.teclado.appendChild(botao);
        });
    }

    clicarBotao(e: MouseEvent) {
        let botao: HTMLButtonElement = e.target as HTMLButtonElement;
        this.leitor.value = botao.textContent == null ? "" : botao.textContent;
        this.verificarResultado();
    }

    verificarResultado(): void {
        let letra: string = this.leitor.value.toUpperCase();

        if (letra.length > 1) {
            this.mensagem.textContent = "Digite apenas uma letra!";
            return;
        }

        if (this.jogoForca.palavraVisivel.join('').includes(letra)) {
            this.mensagem.textContent = "Você já digitou essa letra!";
            return;
        }

        let ehCorreto: boolean = this.jogoForca.verificarLetras(letra);
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.leitor.value = "";

        let botao: HTMLButtonElement = 
        document.getElementById(letra.toLowerCase()) as HTMLButtonElement;
        
        botao.disabled = true;

        if (ehCorreto) {
            this.mensagem.textContent = "Você acertou!"

            if (this.jogoForca.palavraEstaCerta()) {
                this.mensagem.textContent = "Parabéns você venceu!";
                this.btnTentar.disabled = true;
            }
            return;
        }

        this.imagem.src = "./imagens/forca" + this.jogoForca.tentativas + ".png";

        if (this.jogoForca.jogoAcabou()) {
            this.mensagem.textContent = "Você perdeu!";
            this.palavra.textContent = this.jogoForca.palavraSecreta;
            this.btnTentar.disabled = true;
            return;
        }

        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.mensagem.textContent = "Você errou!";
    }


    resetar(): void{
        this.jogoForca.resetar();
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = "./imagens/forca" + this.jogoForca.tentativas + ".png";
        this.leitor.value = "";
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.btnTentar.disabled = false;
        this.mensagem.textContent = "Digite uma letra";
        
        let botoes: HTMLButtonElement[] = []; 
        this.teclado.childNodes.forEach(b => botoes.push(b as HTMLButtonElement)); 
        botoes.forEach(c => c.disabled = false);
    }
}