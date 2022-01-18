/* Campos */
const entrada = document.getElementById('text-entrada');
const resultado = document.getElementById('text-resultado');

/* Botões */
const botaoEncrypt = document.getElementById('criptografar');
const botaoDecrypt = document.getElementById('descriptografar');

/* Erros */
const listaErros = document.getElementById('erros');

/* Lógica de Criptografia */

const vogais = ['e', 'i', 'a', 'o', 'u'];
const saida = ['enter', 'imes', 'ai', 'ober', 'ufat'];

/* Funções */

function criptografar(texto){
    for (let i = 0; i < vogais.length; i++) texto = texto.replace(vogais[i], saida[i]);
    return texto;
}

function descriptografar(texto){
    for (let i = 0; i < vogais.length; i++) texto = texto.replace(saida[i], vogais[i]);
    return texto;
}

function confereEntrada(texto){
    let erros = [];
    let textoAcentuado = false;
    let acentuados = 'àèìòùâêîôûäëïöüáéíóúãõ'.split('');
    console.log(acentuados);


    for (let i = 0; i < acentuados.length; i++){
        let letra = acentuados[i];
        if (texto.includes(letra)){
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
    resultado.textContent = criptografar(entrada.value);
});

botaoDecrypt.addEventListener('click', function(){
    resultado.textContent = descriptografar(entrada.value);
});

entrada.addEventListener('input', function(){
    listaErros.innerHTML = '';
    let erros = confereEntrada(entrada.value);
    erros.forEach(function(erro){
        let li = document.createElement('li');
        li.textContent = erro;

        listaErros.appendChild(li);
    });
});