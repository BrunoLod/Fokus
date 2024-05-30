

const focusButton = document.querySelector('.app__card-button--foco');
const descansoCurtoButton = document.querySelector('.app__card-button--curto');
const descansoLongoButton = document.querySelector('.app__card-button--longo');


const imagemBanner = document.querySelector('.app__image');
const textoBanner = document.querySelector('.app__title');

const titulo = document.querySelector('.app__title-banner');

const botoes = document.querySelectorAll('.app__card-button');

/* Acessando o botão por meio da sua id */
const startPauseButton = document.querySelector('#start-pause');

/* Variáveis relativas ao som da landing page */
const musicaInput = document.querySelector('#alternar-musica');

const musica = new Audio('./sons/cyberpunk_focus.mp3');

/* Como a música apresenta uma duração de 5 minutos e preciso
   que ela supere esse intervalo, defino que a música tenha loop verdadeiro */

musica.loop = true

const startSom = new Audio('./sons/play.mp3');

const pauseSom = new Audio('./sons/pause.mp3');

const alertSom = new Audio('./sons/siren-alert.mp3');

/* Acessando tanto o texto quanto o ícone do botão */
const iniciarOuPausarTexto = document.querySelector('#start-pause span');
const iniciarOuPausarIcone = document.querySelector('#start-pause img');

/* Acessando o timer da tela */
const timer = document.querySelector('#timer');

/* Acessando responsáveis pelos caracteres */
const glitchTextLeft = document.querySelector('.glitch-text-left')
const glitchTextRight = document.querySelector('.glitch-text-right')


const japanasesChars = ['力', '欲', '望', '怒', 'り', '電', '脳',
    'の', '花', '月', '影', '血', 'グ', 'リ',
    'ッ', 'チ', '人', '工', '知', '能', 'バ',
    'ー', 'チ', 'ャ', 'ル', '毒', '廃', '墟', '夢'];

const numbersChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/*

Criando um 'escutador' que por meio de uma mudança - 'change' -
utiliza-se de uma arrow function que, se a música estiver pausada,
a inicia e, caso contrário, a pausa

*/
musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else { musica.pause() }
})

/* Criando as variáveis responsáveis pelo temporaizador */
let tempoDecorridoEmSegundos = 1500;
let tempoPausado = null;
let intervaloId = null;


/* Chamando a função alterarContexto, para cada
   especificação do usuário - foco, descanso curto ou longo.  */

focusButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focusButton.classList.add('active')
})

descansoCurtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    descansoCurtoButton.classList.add('active')
})

descansoLongoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    descansoLongoButton.classList.add('active')
})

/* Função que mostra o temporizador na tela */

function mostrarTempo() {

    /* Criando o objeto tempo, por meio do método Date */
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)

    /* Formatando o tempo */
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })

    /* Mostrando o tempo na tela */
    timer.innerHTML = `${tempoFormatado}`
}

/*

Função que permite a alteração de contexto,
mediante a interação do usuário.

*/

function alterarContexto(contexto) {

    mostrarTempo()

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    imagemBanner.setAttribute('src', `./image/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize a sua produtividade <br> 
            e se joga no que importa`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Seu processador precisa respirar    <br>
            Faça uma pequena pausa e descanse`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de relaxar <br> 
            Coloca uma música sinta a vibe e se jogue`
    }
}

/*

Chamo a função criada, acionada por meio de um
evento do tipo click no botão

*/

startPauseButton.addEventListener('click', startAndPause)

/*

Arrow Function que realiza a contagem regressiva para o temporizador,
de modo a, quando chegar em um tempo menor ou igual a zero,
para e aciona o som de alerta. Por padrão, o setInterval, utilizado
para executar o código proceduralmente faz o descrescimento
sem critério de pausa, o que poderia produzir valores negativos e,
mediante a isso, estabeleço uma relação condicional.

*/

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alertSom.play()
        limpar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

/* Função que realiza a contagem do temporizador  */

function startAndPause() {
    if (intervaloId) {
        pauseSom.play()
        tempoPausado = tempoDecorridoEmSegundos;
        limpar()
        return
    } else if (tempoPausado) {
        tempoDecorridoEmSegundos = tempoPausado;
        tempoPausado = null;
    }

    intervaloId = setInterval(contagemRegressiva, 1000)

    iniciarOuPausarTexto.textContent = 'Pause'
    iniciarOuPausarIcone.setAttribute('src', `./icon/pause.png`)
    startSom.play()
}

/* Função que limpa o intervalo, mantendo os valores finalizados ou pausados */

function limpar() {
    clearInterval(intervaloId)
    iniciarOuPausarTexto.textContent = 'Start'
    iniciarOuPausarIcone.setAttribute('src', `./icon/play_arrow.png`)
    intervaloId = null
}

/*

Conjunto de funções responsáveis pela geração automática
e aleatória dos caracteres numéricos e japoneses. 

*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomJapaneseString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += generateRandomJapaneseChar();
    }
    return result;
}

function generateRandomNumberString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += generateRandomNumber();
    }
    return result;
}

function generateRandomJapaneseChar() {
    return japanasesChars[Math.floor(Math.random() * japanasesChars.length)];
}

function generateRandomNumber() {
    return numbersChars[Math.floor(Math.random() * numbersChars.length)];
}

setInterval(() => {
    glitchTextRight.innerHTML = ""; // Limpa o conteúdo anterior
    glitchTextLeft.innerHTML = ""; // Limpa o conteúdo anterior

    const numLinesRight = 11; // Número de linhas à direita
    const numLinesLeft = 12;   // Número de linhas à esquerda

    for (let i = 0; i < numLinesRight; i++) {
        const numChars = getRandomInt(1, 4);
        const newLine = document.createElement('span');
        newLine.textContent = generateRandomJapaneseString(numChars);
        glitchTextRight.appendChild(newLine);
    }

    for (let i = 0; i < numLinesLeft; i++) {
        const numChars = getRandomInt(1, 4);
        const newLine = document.createElement('span');
        newLine.textContent = generateRandomNumberString(numChars);
        glitchTextLeft.appendChild(newLine);
    }

}, 800);


/*

Chamando a função que mostra o tempo,
de modo a tornar o temporizador sempre
presente.

*/

mostrarTempo()