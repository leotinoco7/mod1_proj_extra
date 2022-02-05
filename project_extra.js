const prompt = require('prompt-sync')();
// Crie um programa onde jogadores joguem um dado e tenham resultados aleatórios.

// O programa tem que:

// • Perguntar quantas rodadas você quer fazer; (1,0 ponto)
// • Perguntar quantos jogadores vão jogar; (1,5 pontos)
// • Criar um objeto pra cada jogador com nome e número tirado; (1,5 pontos)
// • Guarda todos os objetos em uma lista; (2,0 pontos)
// • Ordenar esses objetos, sabendo que o vencedor tirou o maior número
// no dado. (2,0 pontos)
// • Mostrar no final qual jogador ganhou mais rodadas e foi o grande
// campeão. (2,0 pontos)

// DECLARED VARIABLES
let rodadas;
let numeroJogadores;
let replay;
let jogador = {
    nome: '',
    dado: '',
    cont: 0,
};
const jogadores = [];
let jogadoresResult = [];

// FUNCTIONS

// SLEEP FUNCTION
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

function Jogador(nome, dado, cont) {
    this.nome = nome;
    this.dado = dado;
    this.cont = cont;
}

// CODE START
do {
    do {
        rodadas = +prompt(
            'Digite a quantidade de rodadas que você deseja jogar: ',
        );
        sleep(500);
        while (rodadas < 0 || isNaN(rodadas)) {
            console.log('Quantidade de rodadas inválida!');
            break;
        }
    } while (rodadas < 0);

    do {
        numeroJogadores = +prompt(
            'Digite quantos jogadores irão jogar (max 12): ',
        );
        sleep(500);
        if (numeroJogadores <= 1 || numeroJogadores > 12) {
            console.log(`
    Quantidade de jogadores inválido!
    `);
        } else {
            console.log();
            break;
        }
    } while (true);

    for (x = 0; x < numeroJogadores; x++) {
        jogador.nome = prompt(`Digite o nome do ${x + 1}º jogador: `);
        sleep(500);
        jogador.dado = Math.ceil(Math.random() * 6);
        jogadores.push(jogador);
        jogador = new Jogador(jogador.nome, jogador.dado, 0);
    }

    console.log(`Vamos jogar os Dados...`);

    sleep(500);
    for (i = 0; i < rodadas; i++) {
        console.log(`
----------------------------------------------------------------
                Rodada ${i + 1}`);
        sleep(1500);

        for (x = 0; x < numeroJogadores; x++) {
            console.log(`
Está na vez do ${jogadores[x].nome}...
Ele tirou: ${jogadores[x].dado}`);
        }
        jogadoresResult = [...jogadores];
        jogadoresResult.sort(function (a, b) {
            return a.dado > b.dado ? -1 : a.dado < b.dado ? 1 : 0;
        });

        sleep(1000);
        if (jogadoresResult[0].dado == jogadoresResult[1]) {
            console.log('Houve empate! Rodada Anulada');
            for (x = 0; x < numeroJogadores; x++) {
                jogadores[x].dado = Math.ceil(Math.random() * 6);
            }
            continue;
        } else {
            console.log(
                `${jogadoresResult[0].nome} ganhou a rodada tirando ${jogadoresResult[0].dado}`,
            );
            jogadoresResult[0].cont++;
        }

        for (x = 0; x < numeroJogadores; x++) {
            jogadores[x].dado = Math.ceil(Math.random() * 6);
        }
    }

    jogadoresResult.sort(function (a, b) {
        return a.cont > b.cont ? -1 : a.cont < b.cont ? 1 : 0;
    });
    console.log(
        '----------------------------------------------------------------',
    );
    console.log(
        `1º Lugar: ${jogadoresResult[0].nome} com ${jogadoresResult[0].cont} vitórias.`,
    );

    console.log(
        '----------------------------------------------------------------',
    );
    do {
        console.log(`Querem jogar novamente?
        1)Sim               2)Não`);
        sleep(500);
        replay = prompt('R: ').toLowerCase();
        if (replay != 'sim' && replay != 'nao' && replay != 1 && replay != 2) {
            console.log(`Não entendi!`);
        }
    } while (replay != 'sim' && replay != 'nao' && replay != 1 && replay != 2);

    if (replay == 'nao' || replay == 2) {
        console.log('Encerrando o jogo.');
        break;
    }
} while (true);
