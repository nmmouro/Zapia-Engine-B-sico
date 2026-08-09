// ============================================================================
// EMPREGADOS EVENTS
// Arquivo: js/pages/empregados/empregados.events.js
// ============================================================================

import { novoLancamento, editarLancamento, salvar, remover } from "./lancamentos.form.js";

import { carregarTabela } from "./lancamentos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

export function registrarEventos() {
  document.getElementById("btnNovo").addEventListener("click", novoLancamento);

  document.getElementById("btnAtualizar").addEventListener("click", async () => {
    try {
      await carregarTabela();
    } catch (error) {
      tratarErro(error);
    }
  });

  document.getElementById("formLancamento").addEventListener("submit", async event => {
    event.preventDefault();
    await salvar();
  });

  document.getElementById("tabelaLancamento").addEventListener("click", async event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "edit") await editarLancamento(id);
    if (button.dataset.action === "remove") await remover(id);
  });
}
