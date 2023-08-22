export class JogoForca {
    constructor() {
        this.palavras = `ABACATE,ABACAXI,ACEROLA,ACAI,ARACA,ABACATE,BACABA,BACURI,
    BANANA,CAJA,CAJU,CARAMBOLA,CUPUAÇU,GRAVIOLA,GOIABA,JABUTICABA,JENIPAPO,
    MACA,MANGABA,MANGA,MARACUJA,MURICI,PEQUI,PITANGA,PITAYA,SAPOTI,TANGERINA,
    UMBU,UVA,UVAIA`;
        this.listaPalavras = this.palavras.split(',');
        this.palavraSecreta = this.listaPalavras[Math.floor(Math.random() * this.listaPalavras.length)];
        this.palavraSecretaArray = this.palavraSecreta.split("");
        this.palavraVisivel = this.palavraSecretaArray.map(p => "_");
        this.tentativas = 5;
    }
    verificarLetras(letra) {
        let ehCorreto = false;
        for (let i = 0; i < this.palavraSecretaArray.length; i++) {
            if (this.palavraSecretaArray[i] == letra) {
                this.palavraVisivel[i] = letra;
                ehCorreto = true;
            }
        }
        if (!ehCorreto) {
            this.tentativas--;
        }
        return ehCorreto;
    }
    palavraEstaCerta() {
        if (this.palavraVisivel.join('') == this.palavraSecreta)
            return true;
        return false;
    }
    jogoAcabou() {
        return this.tentativas == 0;
    }
    resetar() {
        this.palavraSecreta =
            this.listaPalavras[Math.floor(Math.random() * this.listaPalavras.length)];
        this.palavraSecretaArray = this.palavraSecreta.split("");
        this.palavraVisivel = this.palavraSecretaArray.map(p => "_");
        this.tentativas = 5;
    }
}
