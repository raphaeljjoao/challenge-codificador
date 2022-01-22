/* Campos */
const entrada = document.getElementById('text-entrada');
const resultado = document.getElementById('text-resultado');

/* Botões */
const botaoEncrypt = document.getElementById('btn-criptografar');
const botaoDecrypt = document.getElementById('btn-descriptografar');
const botaoCopiar = document.getElementById('btn-copiar');
const botaoLimpar = document.getElementById('btn-limpar');

/* Modals */
const modalCopiar = document.getElementById('modal-copiar');
const textoCopiar = document.getElementById('modal-copiar-texto');

/* Erros */
const listaErros = document.getElementById('erros');
let entradaValida = true;

/* Lógica de Criptografia */

const vogais = ['e', 'i', 'a', 'o', 'u'];
const saida = ['enter', 'imes', 'ai', 'ober', 'ufat'];

/* Funções */

// Comportamento comum para criptografia e descriptografia
function comportamentoPadrao(){
    entrada.value = '';
    removeBackground(resultado);
    botaoCopiar.classList.remove('bloqueado');
    botaoLimpar.classList.remove('bloqueado');
    botaoEncrypt.classList.add('bloqueado');
    botaoDecrypt.classList.add('bloqueado');
}


function removeBackground(elemento){
    elemento.classList.add('remove-background');
}

function restauraBackground(elemento){
    elemento.classList.remove('remove-background');
}

function criptografar(texto){
    for (let i = 0; i < vogais.length; i++) texto = texto.replaceAll(vogais[i], saida[i]);
    return texto;
}

function descriptografar(texto){
    for (let i = 0; i < vogais.length; i++) texto = texto.replaceAll(saida[i], vogais[i]);
    return texto;
}

function validaEntrada(texto){
    let erros = [];
    let textoAcentuado = false;
    let contemNumeros = false;
    let acentuados = 'àèìòùâêîôûäëïöüáéíóúãõ'.split('');


    // Validação de acentuação
    for (let i = 0; i < acentuados.length; i++){
        let letra = acentuados[i];
        if (texto.toLowerCase().includes(letra)){
            textoAcentuado = true;
            break;
        }
    }

    // Validação de números
    for (let i = 0; i < texto.length; i++){
        letra = texto[i];
        if (Number.isInteger(parseInt(letra))){
            contemNumeros = true;
            break;
        }
    }
    
    if (texto.toLowerCase() != texto) erros.push('Apenas letras minúsculas.');
    if (contemNumeros) erros.push('Não insira números.')
    if (textoAcentuado) erros.push('Não utilize acentuação.');

    return erros;
}

/* Eventos */
botaoEncrypt.addEventListener('click', function(){
    if (entradaValida && entrada.value != ''){
        resultado.textContent = criptografar(entrada.value);
        comportamentoPadrao();
    }
});

botaoDecrypt.addEventListener('click', function(){
    if (entradaValida && entrada.value != ''){
        resultado.textContent = descriptografar(entrada.value);
        comportamentoPadrao();
    }
});

botaoCopiar.addEventListener('click', function(){
    let valorResultado = resultado.value;
    if (valorResultado != ''){
        navigator.clipboard.writeText(resultado.value);
        textoCopiar.textContent = 'Copiado com sucesso para a área de transferência.';
        modalCopiar.classList.add('show-modal');
        setTimeout(() => {
            modalCopiar.classList.remove('show-modal');
        }, 1400);
    }
    
});

botaoLimpar.addEventListener('click', function(){
    let valorResultado = resultado.value;
    if (valorResultado != ''){
        resultado.value = '';
        restauraBackground(resultado);
        botaoCopiar.classList.add('bloqueado');
        botaoLimpar.classList.add('bloqueado');
    }
});

entrada.addEventListener('input', function(){
    listaErros.innerHTML = '';
    let erros = validaEntrada(entrada.value);
    erros.forEach(function(erro){
        let li = document.createElement('li');
        li.textContent = erro;

        listaErros.appendChild(li);
    });

    // Bloqueio dos botões
    botaoEncrypt.classList.remove('bloqueado');
    botaoDecrypt.classList.remove('bloqueado');

    entradaValida = true;

    if (erros.length > 0 || entrada.value == ''){
        botaoEncrypt.classList.add('bloqueado');
        botaoDecrypt.classList.add('bloqueado');

        entradaValida = false;
    }
});