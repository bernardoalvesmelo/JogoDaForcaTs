export class JogoForca {
    palavras: string = `ABACATE,ABACAXI,ACEROLA,ACAI,ARACA,ABACATE,BACABA,BACURI,
    BANANA,CAJA,CAJU,CARAMBOLA,CUPUAÇU,GRAVIOLA,GOIABA,JABUTICABA,JENIPAPO,
    MACA,MANGABA,MANGA,MARACUJA,MURICI,PEQUI,PITANGA,PITAYA,SAPOTI,TANGERINA,
    UMBU,UVA,UVAIA`;

    listaPalavras: string[] = this.palavras.split(',');
    
    palavraSecreta: string = this.listaPalavras[Math.floor(Math.random() * this.listaPalavras.length)];
    palavraSecretaArray: string[] = this.palavraSecreta.split("");
    palavraVisivel: string[] = this.palavraSecretaArray.map(p => "_");

    tentativas: number = 5;

    verificarLetras(letra: string): boolean {
        let ehCorreto: boolean = false;
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

    palavraEstaCerta(): boolean {
        if (this.palavraVisivel.join('') == this.palavraSecreta)
            return true;

        return false;
    }

    jogoAcabou(): boolean {
        return this.tentativas == 0;
    }

    resetar(): void {
        this.palavraSecreta =
            this.listaPalavras[Math.floor(Math.random() * this.listaPalavras.length)];       
        
        this.palavraSecretaArray = this.palavraSecreta.split("");
        this.palavraVisivel = this.palavraSecretaArray.map(p => "_");
        this.tentativas = 5;
    }
}