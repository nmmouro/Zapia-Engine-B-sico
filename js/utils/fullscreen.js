// ============================================================================
// FULLSCREEN
// Arquivo: js/utils/fullscreen.js
// Controle de tela cheia do Painel Frota
// ============================================================================

// ================= ELEMENTOS =================

const BOTAO_ID = "btnFullscreen";

// ================= INICIAR =================

export function iniciarFullscreen() {

    const botao =  document.getElementById( BOTAO_ID  );

    if (!botao) return;

    botao.addEventListener( "click", alternarFullscreen );

}

// ================= ALTERNAR =================

async function alternarFullscreen() {

    if (!document.fullscreenElement) {

        await entrarFullscreen();

    }

    else {

        await sairFullscreen();

    }

}

// ================= ENTRAR =================

async function entrarFullscreen() {

    try {

        await document.documentElement.requestFullscreen();

        atualizarBotao(true);

    }

    catch (erro) {

        console.error( "Erro ao ativar tela cheia:", erro );

    }

}

// ================= SAIR =================

async function sairFullscreen() {

    try {

        await document.exitFullscreen();

        atualizarBotao(false);

    }

    catch (erro) {

        console.error( "Erro ao sair da tela cheia:", erro );

    }

}

// ================= BOTÃO =================

function atualizarBotao(ativo) {

    const botao =

        document.getElementById( BOTAO_ID );

    if (!botao) return;

    botao.textContent = ativo

        ? "🗗"

        : "⛶";

}

// ================= EVENTO DO NAVEGADOR =================

document.addEventListener( "fullscreenchange", () => {

        atualizarBotao( !!document.fullscreenElement );

    }

);
