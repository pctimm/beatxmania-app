// setup
const keyMaps = {
    'KeyS': 1,
    'KeyD': 2,
    'KeyF': 3,
    'KeyJ': 4,
    'KeyK': 5,
    'KeyL': 6
}

document.addEventListener('gamepadconnected', e => {
    console.log('sim')
})

document.addEventListener('keydown', (event) => {
    const code = event.code;

    const id = keyMaps[code]

    if(id !== undefined) {
        const sfx = new Audio('./sounds/press.mp3')
        sfx.play()
        renderizarInFlashTrilha(id);
        matarNota(id);
    }
})

document.addEventListener('keyup', (event) => {
    const code = event.code;

    const id = keyMaps[code]

    id !== undefined && renderizarOutFlashTrilha(id);
})

let contadorNotasAcertadas = 0;
const margemAcertoVh = 5;
let precisao = 0;

function matarNota(trilhaId) {
    const notaMapping = notas.find(x => x.viva && x.trilha === trilhaId);

    if (notaMapping !== null) {
        const pos = notaMapping.cVertical;

        if ((pos >= 50.0 - margemAcertoVh) && (pos <= 50.0 + margemAcertoVh)) {
            contadorNotasAcertadas ++;
            notaMapping.htmlDiv.style.backgroundColor = 'white';
        }
        else {
            notaMapping.htmlDiv.style.backgroundColor = 'red';
        }

        notaMapping.htmlDiv.style.opacity = '0';
        notaMapping.viva = false
    }
}

function renderizarInFlashTrilha(id) {
    document.getElementById(id).style.backgroundColor = 'gray';
}

function renderizarOutFlashTrilha(id) {
    document.getElementById(id).style.backgroundColor = null;
}

document.addEventListener('mousedown', async () => {
    if (countdown == 3) {
        await countdownTimer()
        iniciarGameCycle()
    }
})

// game settings
const fps = 60;
const intervaloInterFrames = 1000 / fps;

const bpm = 140;
const tickBpm = (fps * 60) / bpm

let telaAcesa = false;

let tickCounter = 0;
let countdown = 3;

const notaVelocidade = 40.0; // ticks por 50vh

const movimento = 50.0 / notaVelocidade; // vh por tick

const mapOffsetTicks = 0;

// mapping
const notas = [
    {
        viva: false,
        id: 'n1',
        trilha: 1,
        tick: 150,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n2',
        trilha: 2,
        tick: 160,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n3',
        trilha: 3,
        tick: 170,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n4',
        trilha: 1,
        tick: 200,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n5',
        trilha: 2,
        tick: 210,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n6',
        trilha: 3,
        tick: 220,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n7',
        trilha: 1,
        tick: 250,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n8',
        trilha: 2,
        tick: 260,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n9',
        trilha: 3,
        tick: 270,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n10',
        trilha: 6,
        tick: 280,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n11',
        trilha: 5,
        tick: 300,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n12',
        trilha: 3,
        tick: 330,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n13',
        trilha: 4,
        tick: 340,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n14',
        trilha: 3,
        tick: 352,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n15',
        trilha: 2,
        tick: 370,
        cVertical: 0,
        htmlDiv: null
    },
    {
        viva: false,
        id: 'n16',
        trilha: 1,
        tick: 380,
        cVertical: 0,
        htmlDiv: null
    },
]

async function criarNotas() {
    notas.filter(x => !x.viva).map(nota => {
        // 10vh antes
        // 10 * velocidade
        const vhForaTelaPadrao = 0;
        //const ticksForaTela = 50 / (notaVelocidade * 10); // inversamento proporcional
        const ticksForaTela = 0
        const tempoCriar = Int16Array.of(nota.tick - notaVelocidade - ticksForaTela + mapOffsetTicks)[0] === tickCounter;

        if (tempoCriar) {
            console.log('CRIANDO NOTAS')
            const novo = document.createElement('div');
            novo.id = nota.id;
            novo.className = 'nota';
            novo.style.bottom = vhForaTelaPadrao
            nota.cVertical = vhForaTelaPadrao
            const trilha = document.getElementById(nota.trilha);
            
            trilha.appendChild(novo);
            
            nota.htmlDiv = novo;

            nota.viva = true;
        }
    })
}
function iniciarGameCycle() {
    console.log('INICIANDO GAME CYCLE')
    
    criarNotas()

    setTimeout(() => {
        loop()
    }, intervaloInterFrames) //ms
}

function loop() {
    //console.log(tickCounter)
    if (tickCounter == bpm - mapOffsetTicks) {
        const musica = new Audio('./sounds/tururu.mp3')
        musica.play()
    }

    if (tickCounter < notas[notas.length - 1].tick + 60) {
        tempoBip()
    }


    //console.log(notas)
    renderizarTickCounter()
    criarNotas()
    renderizarNotas()
    matarNotas()

    tickCounter ++;
    setTimeout(() => {
        loop()
    }, intervaloInterFrames) //ms
}

function countdownTimer() {
    return new Promise(resolve => {
        countdownFunction(resolve)
    })
}

function countdownFunction(resolveMethod) {
    console.log(countdown)

    if (countdown != 0) {
        var audio = new Audio('./sounds/icecrack.mp3')
        audio.play()
    }

    countdown --;
    
    if (countdown >= 0) {
        setTimeout(() => {
            countdownFunction(resolveMethod)
        }, 1000) //ms
    }
    else {
        resolveMethod();
    }
}

function matarNotas() {
    notas.filter(x => x.viva && x.cVertical > 120).map(x => x.viva = false)
}


function renderizarNotas() {
    notas.filter(x => x.viva).map(atual => {
            const nota = document.getElementById(atual.id);
            const altura = atual.cVertical + movimento
            nota.style.bottom = `${altura}vh`
            atual.cVertical = altura
    }
    )
}


function tempoBip() {
    if (tickCounter % Math.round(tickBpm) === 0) {
        var audio = new Audio('./sounds/icecrack.mp3')
        audio.volume = '0.2'
        audio.play()
    }
}

function renderizarTickCounter() {
    const e = document.getElementsByClassName('game-info')[0];
    e.textContent = `Tick: ${tickCounter}\nAcertos: ${contadorNotasAcertadas}`;
}