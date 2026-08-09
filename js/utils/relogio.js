// ============================================================================
// RELÓGIO
// Arquivo: js/utils/relogio.js
// Relógio global do Painel Frota
// ============================================================================


// ================= CONFIGURAÇÃO =================

const ELEMENTO_ID = "clock";

let intervalo = null;


// ================= INICIAR =================

export function iniciarRelogio() {


    atualizarRelogio();


    if (intervalo) {

        clearInterval(intervalo);

    }


    intervalo = setInterval(

        atualizarRelogio,

        1000

    );


}



// ================= ATUALIZAR =================

function atualizarRelogio() {


    const elemento =

        document.getElementById(

            ELEMENTO_ID

        );


    if (!elemento) return;



    const agora = new Date();



    const data =

        agora.toLocaleDateString(

            "pt-BR"

        );



    const hora =

        agora.toLocaleTimeString(

            "pt-BR",

            {

                hour: "2-digit",

                minute: "2-digit",

                

            }

        );



    elemento.textContent =

        `${data} - ${hora}`;


}



// ================= PARAR =================

export function pararRelogio() {


    if (!intervalo) return;


    clearInterval(intervalo);


    intervalo = null;


}
