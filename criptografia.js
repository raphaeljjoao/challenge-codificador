/* Campos */
const entrada = document.getElementById('text-entrada');
const resultado = document.getElementById('text-resultado');

/* Botões */
const botaoEncrypt = document.getElementById('criptografar');
const botaoDecrypt = document.getElementById('descriptografar');

/* Erros */
const listaErros = document.getElementById('erros');
let entradaValida = true;

/* Lógica de Criptografia */

const vogais = ['e', 'i', 'a', 'o', 'u'];
const saida = ['enter', 'imes', 'ai', 'ober', 'ufat'];

/* Funções */

// Comportamento comum para criptografia e descriptografia
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

function confereEntrada(texto){
    let erros = [];
    let textoAcentuado = false;
    let acentuados = 'àèìòùâêîôûäëïöüáéíóúãõ'.split('');


    for (let i = 0; i < acentuados.length; i++){
        let letra = acentuados[i];
        if (texto.toLowerCase().includes(letra)){
            textoAcentuado = true;
            break;
        }
    }
    
    if (texto.toLowerCase() != texto) erros.push('Apenas letras minúsculas.');
    if (textoAcentuado) erros.push('Não utilize acentuação.');

    return erros;
}

/* Eventos */
botaoEncrypt.addEventListener('click', function(){
    if (entradaValida){
        resultado.textContent = criptografar(entrada.value);
        removeBackground(resultado);
    }
});

botaoDecrypt.addEventListener('click', function(){
    if (entradaValida){
        resultado.textContent = descriptografar(entrada.value);
        removeBackground(resultado);
    }
});

entrada.addEventListener('input', function(){
    listaErros.innerHTML = '';
    let erros = confereEntrada(entrada.value);
    erros.forEach(function(erro){
        let li = document.createElement('li');
        li.textContent = erro;

        listaErros.appendChild(li);
    });

    // Bloqueio dos botões
    botaoEncrypt.classList.remove('bloqueado');
    botaoDecrypt.classList.remove('bloqueado');

    entradaValida = true;

    if (erros.length > 0){
        botaoEncrypt.classList.add('bloqueado');
        botaoDecrypt.classList.add('bloqueado');

        entradaValida = false;
    }
});