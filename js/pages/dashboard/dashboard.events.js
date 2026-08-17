// ============================================================================
// DASHBOARD EVENTS
// Painel Frota
// Arquivo: js/controllers/dashboard.events.js
// Responsável pelo registro dos eventos da página Dashboard.
// ============================================================================


// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const ELEMENTOS = {

    botaoFullscreen:
        "btn-fullscreen",

    tabelaVeiculos:
        "tabela-veiculos",

    tabelaEmpregados:
        "tabela-empregados",

    tabelaLancamentos:
        "tabela-lancamentos"

};


// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    registrarEventoFullscreen();

    registrarEventoTabelaVeiculos();

    registrarEventoTabelaEmpregados();

    registrarEventoTabelaLancamentos();

}


// ============================================================================
// FULLSCREEN
// ============================================================================

function registrarEventoFullscreen() {

    const botao = obterElemento(

        ELEMENTOS.botaoFullscreen

    );


    if (!botao) {

        return;

    }


    botao.addEventListener(

        "click",

        () => {

            alternarFullscreen();

        }

    );

}


// ============================================================================
// ALTERNAR FULLSCREEN
// ============================================================================

function alternarFullscreen() {

    if (!document.fullscreenElement) {

        entrarFullscreen();

    }

    else {

        sairFullscreen();

    }

}


// ============================================================================
// ENTRAR FULLSCREEN
// ============================================================================

function entrarFullscreen() {

    const elemento = document.documentElement;


    if (!elemento.requestFullscreen) {

        return;

    }


    elemento
        .requestFullscreen()
        .catch(

            erro => {

                console.error(

                    "Não foi possível entrar em tela cheia:",

                    erro

                );

            }

        );

}


// ============================================================================
// SAIR FULLSCREEN
// ============================================================================

function sairFullscreen() {

    if (!document.exitFullscreen) {

        return;

    }


    document
        .exitFullscreen()
        .catch(

            erro => {

                console.error(

                    "Não foi possível sair da tela cheia:",

                    erro

                );

            }

        );

}


// ============================================================================
// ATUALIZAR BOTÃO FULLSCREEN
// ============================================================================

document.addEventListener(

    "fullscreenchange",

    atualizarBotaoFullscreen

);


function atualizarBotaoFullscreen() {

    const botao = obterElemento(

        ELEMENTOS.botaoFullscreen

    );


    if (!botao) {

        return;

    }


    if (document.fullscreenElement) {

        botao.title = "Sair da tela cheia";

        botao.setAttribute(

            "aria-label",

            "Sair da tela cheia"

        );

        botao.textContent = "⛶";

    }

    else {

        botao.title = "Tela cheia";

        botao.setAttribute(

            "aria-label",

            "Tela cheia"

        );

        botao.textContent = "⛶";

    }

}


// ============================================================================
// EVENTO - TABELA VEÍCULOS
// ============================================================================

function registrarEventoTabelaVeiculos() {

    const tabela = obterElemento(

        ELEMENTOS.tabelaVeiculos

    );


    if (!tabela) {

        return;

    }


    tabela.addEventListener(

        "click",

        tratarCliqueTabelaVeiculos

    );

}


// ============================================================================
// TRATAR CLIQUE - VEÍCULOS
// ============================================================================

function tratarCliqueTabelaVeiculos(

    evento

) {

    const linha = evento.target.closest(

        "tbody tr"

    );


    if (!linha) {

        return;

    }


    /*
     * Ponto de extensão para futuras ações.
     *
     * Exemplo:
     *
     * abrirDetalhesVeiculo(
     *     linha.dataset.id
     * );
     */

}


// ============================================================================
// EVENTO - TABELA EMPREGADOS
// ============================================================================

function registrarEventoTabelaEmpregados() {

    const tabela = obterElemento(

        ELEMENTOS.tabelaEmpregados

    );


    if (!tabela) {

        return;

    }


    tabela.addEventListener(

        "click",

        tratarCliqueTabelaEmpregados

    );

}


// ============================================================================
// TRATAR CLIQUE - EMPREGADOS
// ============================================================================

function tratarCliqueTabelaEmpregados(

    evento

) {

    const linha = evento.target.closest(

        "tbody tr"

    );


    if (!linha) {

        return;

    }


    /*
     * Ponto de extensão para futuras ações.
     */

}


// ============================================================================
// EVENTO - TABELA LANÇAMENTOS
// ============================================================================

function registrarEventoTabelaLancamentos() {

    const tabela = obterElemento(

        ELEMENTOS.tabelaLancamentos

    );


    if (!tabela) {

        return;

    }


    tabela.addEventListener(

        "click",

        tratarCliqueTabelaLancamentos

    );

}


// ============================================================================
// TRATAR CLIQUE - LANÇAMENTOS
// ============================================================================

function tratarCliqueTabelaLancamentos(

    evento

) {

    const linha = evento.target.closest(

        "tbody tr"

    );


    if (!linha) {

        return;

    }


    /*
     * Ponto de extensão para futuras ações.
     */

}


// ============================================================================
// OBTER ELEMENTO
// ============================================================================

function obterElemento(

    id

) {

    return document.getElementById(

        id

    );

}
