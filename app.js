let listaNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 1;

function exibirTexto(tag, texto){ 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial (){
    exibirTexto('h1', 'Jogo Do Número Secreto'); 
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}.`);
}

mensagemInicial();

function verificarChute(){ 
    let chute = document.querySelector('input').value; 
    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns! Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('h1', 'Você acertou!!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if (chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor que esse.');
        } else{
            exibirTexto('p', 'O número secreto é maior que esse.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeItensNaLista = listaNumerosSorteados.length;
    if (quantidadeItensNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){ 
        return gerarNumeroAleatorio(); 
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector('input'); 
    chute.value = ''; 
}

function reiniciarJogo(){
    mensagemInicial();
    limparCampo();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}