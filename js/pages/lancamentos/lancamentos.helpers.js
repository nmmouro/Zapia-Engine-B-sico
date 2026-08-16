// ============================================================================
// ENGINE
// LANÇAMENTOS HELPERS
// Arquivo: js/pages/lancamentos/lancamentos.helpers.js
// ============================================================================

import { obterLancamentos } from "../../services/lancamentos.service.js";

import {
    obterEmpregados
} from "../../services/empregados.service.js";

import {
    obterVeiculos
} from "../../services/veiculos.service.js";

import { renderTable } from "../../ui/table.js";

import { definirRegistros } from "./lancamentos.state.js";

// ============================================================================
// COLUNAS DA TABELA
// ============================================================================

export const COLUNAS_LANCAMENTOS = [

    {
        key: "Data",
        label: "Data"
    },

    {
        key: "Hora",
        label: "Hora"
    },

    {
        key: "Empregado / Matrícula",
        label: "Empregado / Matrícula"
    },

    {
        key: "Veículo",
        label: "Veículo"
    },

    {
        key: "Passageiro / Setor / Motivo",
        label: "Passageiro / Setor / Motivo"
    },

    {
        key: "Itinerário",
        label: "Itinerário"
    },

    {
        key: "Status",
        label: "Status"
    }

];

// ============================================================================
// CARREGAR EMPREGADOS
// ============================================================================

export async function carregarEmpregados() {

    const select =
        document.getElementById("empregado");

    if (!select) {

        throw new Error(
            "Select #empregado não encontrado."
        );

    }

    select.innerHTML = `
        <option value="">
            Selecione o empregado...
        </option>
    `;

    const lista =
        await obterEmpregados();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de empregados."
        );

    }

    console.log(
        "ENGINE → EMPREGADOS PARA SELECT:",
        lista
    );

    lista.forEach(empregado => {

        const option =
            document.createElement("option");

        /*
         * A API dos empregados utiliza:
         *
         * ID
         * Empregado
         * Matrícula
         */

        option.value =
            empregado["Empregado / Matrícula"] ||
            empregado.Empregado ||
            empregado.ID ||
            "";

        option.textContent =
            empregado["Empregado / Matrícula"] ||
            (
                empregado.Empregado
                    ? `${empregado.Empregado}${
                        empregado.Matrícula
                            ? " / " + empregado.Matrícula
                            : ""
                    }`
                    : empregado.ID
            );

        option.dataset.id =
            empregado.ID || "";

        select.appendChild(option);

    });

}

// ============================================================================
// CARREGAR VEÍCULOS
// ============================================================================

export async function carregarVeiculos() {

    const select =
        document.getElementById("veiculo");

    if (!select) {

        throw new Error(
            "Select #veiculo não encontrado."
        );

    }

    select.innerHTML = `
        <option value="">
            Selecione o veículo...
        </option>
    `;

    const lista =
        await obterVeiculos();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de veículos."
        );

    }

    console.log(
        "ENGINE → VEÍCULOS PARA SELECT:",
        lista
    );

    lista.forEach(veiculo => {

        const option =
            document.createElement("option");

        /*
         * IMPORTANTE:
         * A API retorna Combustivel sem acento.
         */

        option.value =
            veiculo.Placa ||
            veiculo.ID ||
            "";

        option.textContent =
            veiculo.Placa
                ? `${veiculo.Placa} - ${veiculo.Modelo || ""}`
                : (
                    veiculo.ID ||
                    "Veículo"
                );

        option.dataset.id =
            veiculo.ID || "";

        select.appendChild(option);

    });

}


// ============================================================================
// CARREGAR TABELA
// ============================================================================

export async function carregarTabela() {

    const lista = await obterLancamentos();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de lançamentos."
        );

    }

                                                            console.log(
        "ENGINE → LANÇAMENTOS:",
        lista
    );

    // Atualiza o estado
    definirRegistros(lista);

    // Localiza a tabela
    const tabela = document.getElementById(
        "tabelaLancamentos"
    );

    if (!tabela) {

        throw new Error(
            "Tabela #tabelaLancamentos não encontrada."
        );

    }

    // Renderiza a tabela
    renderTable(
        tabela,
        COLUNAS_LANCAMENTOS,
        lista,
        {
            edit: true,
            remove: true
        }
    );
    
// ============================================================================
// CONTADOR
// ============================================================================

const contador =
        document.getElementById(
            "contador"
        );


    if (contador) {

        contador.textContent =
            `${lista.length} ${
                lista.length === 1
                    ? "registro"
                    : "registros"
            }`;

    }


// ============================================================================
// ESTADO VAZIO
// ============================================================================

const vazio =
        document.getElementById(
            "vazio"
        );


    if (vazio) {

        vazio.classList.toggle(
            "hidden",
            lista.length > 0
        );

    }


    return lista;

}
