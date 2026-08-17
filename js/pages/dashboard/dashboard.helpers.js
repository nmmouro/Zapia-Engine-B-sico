// ============================================================================
// DASHBOARD HELPERS
// Painel Frota
// Arquivo: js/pages/dashboard/dashboard.helpers.js
// Responsável pelo carregamento e renderização das tabelas.
// ============================================================================


// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const ELEMENTOS = {

    veiculos:
        "tabela-veiculos-body",

    empregados:
        "tabela-empregados-body",

    ocorrencias:
        "tabela-ocorrencias-body"

};


// ============================================================================
// CARREGAR DASHBOARD
// ============================================================================

export async function carregarDashboard() {

    try {

        const dados = await obterDadosDashboard();


        renderizarVeiculos(

            dados.veiculos

        );


        renderizarEmpregados(

            dados.empregados

        );


        renderizarOcorrencias(

            dados.ocorrencias

        );

    }

    catch (erro) {

        console.error(

            "ENGINE DASHBOARD → Erro ao carregar dados:",

            erro

        );

        throw erro;

    }

}


// ============================================================================
// OBTER DADOS
// ============================================================================

async function obterDadosDashboard() {

    /*
     * TEMPORÁRIO
     *
     * Substitua esta função pela chamada à API,
     * serviço ou banco de dados do projeto.
     */


    return {

        veiculos: [],

        empregados: [],

        ocorrencias: []

    };

}


// ============================================================================
// VEÍCULOS
// ============================================================================

function renderizarVeiculos(

    dados = []

) {

    const tbody = document.getElementById(

        ELEMENTOS.veiculos

    );


    if (!tbody) {

        console.error(

            "ENGINE DASHBOARD → Elemento tabela-veiculos-body não encontrado."

        );

        return;

    }


    tbody.innerHTML = "";


    if (!dados.length) {

        tbody.appendChild(

            criarLinhaVazia(

                4,

                "Nenhum veículo encontrado."

            )

        );

        return;

    }


    dados.forEach(

        veiculo => {

            const tr = document.createElement("tr");


            tr.innerHTML = `

                <td>
                    ${texto(veiculo.codigo)}
                </td>

                <td>
                    ${texto(veiculo.placa)}
                </td>

                <td>
                    ${texto(veiculo.veiculo)}
                </td>

                <td>
                    ${texto(veiculo.modelo)}
                </td>

            `;


            tbody.appendChild(tr);

        }

    );

}


// ============================================================================
// EMPREGADOS
// ============================================================================

function renderizarEmpregados(

    dados = []

) {

    const tbody = document.getElementById(

        ELEMENTOS.empregados

    );


    if (!tbody) {

        console.error(

            "ENGINE DASHBOARD → Elemento tabela-empregados-body não encontrado."

        );

        return;

    }


    tbody.innerHTML = "";


    if (!dados.length) {

        tbody.appendChild(

            criarLinhaVazia(

                4,

                "Nenhum empregado encontrado."

            )

        );

        return;

    }


    dados.forEach(

        empregado => {

            const tr = document.createElement("tr");


            tr.innerHTML = `

                <td>
                    ${texto(empregado.codigo)}
                </td>

                <td>
                    ${texto(empregado.nome)}
                </td>

                <td>
                    ${texto(empregado.cargo)}
                </td>

                <td>
                    ${texto(empregado.situacao)}
                </td>

            `;


            tbody.appendChild(tr);

        }

    );

}


// ============================================================================
// OCORRÊNCIAS
// ============================================================================

function renderizarOcorrencias(

    dados = []

) {

    const tbody = document.getElementById(

        ELEMENTOS.ocorrencias

    );


    if (!tbody) {

        console.error(

            "ENGINE DASHBOARD → Elemento tabela-ocorrencias-body não encontrado."

        );

        return;

    }


    tbody.innerHTML = "";


    if (!dados.length) {

        tbody.appendChild(

            criarLinhaVazia(

                5,

                "Nenhuma ocorrência em andamento."

            )

        );

        return;

    }


    dados.forEach(

        ocorrencia => {

            const tr = document.createElement("tr");


            tr.innerHTML = `

                <td>
                    ${formatarData(ocorrencia.data)}
                </td>

                <td>
                    ${texto(ocorrencia.veiculo)}
                </td>

                <td>
                    ${texto(ocorrencia.tipo)}
                </td>

                <td>
                    ${texto(ocorrencia.descricao)}
                </td>

                <td>
                    ${texto(ocorrencia.status)}
                </td>

            `;


            tbody.appendChild(tr);

        }

    );

}


// ============================================================================
// LINHA VAZIA
// ============================================================================

function criarLinhaVazia(

    colspan,

    mensagem

) {

    const tr = document.createElement("tr");

    const td = document.createElement("td");


    td.colSpan = colspan;

    td.textContent = mensagem;


    tr.appendChild(td);


    return tr;

}


// ============================================================================
// TEXTO
// ============================================================================

function texto(valor) {

    if (

        valor === null ||

        valor === undefined ||

        valor === ""

    ) {

        return "-";

    }


    return escaparHtml(valor);

}


// ============================================================================
// DATA
// ============================================================================

function formatarData(valor) {

    if (!valor) {

        return "-";

    }


    const data = new Date(valor);


    if (Number.isNaN(data.getTime())) {

        return texto(valor);

    }


    return new Intl.DateTimeFormat(

        "pt-BR",

        {

            dateStyle: "short",

            timeStyle: "short"

        }

    ).format(data);

}


// ============================================================================
// ESCAPAR HTML
// ============================================================================

function escaparHtml(valor) {

    const elemento = document.createElement("div");


    elemento.textContent = String(valor);


    return elemento.innerHTML;

}
