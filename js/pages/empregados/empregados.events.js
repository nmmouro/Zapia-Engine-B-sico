// ============================================================================
// EMPREGADOS EVENTS
// Arquivo: js/pages/empregados/empregados.events.js
// ============================================================================

import { novoEmpregadoo, editarEmpregado, salvar, remover } from "./Empregados.form.js";
import { carregarTabela } from "./Empregados.helpers.js";
import { tratarErro } from "../../utils/erros.js";

export function registrarEventos() {
  document.getElementById("btnNovo").addEventListener("click", novoEmpregado);

  document.getElementById("btnAtualizar").addEventListener("click", async () => {
    try {
      await carregarTabela();
    } catch (error) {
      tratarErro(error);
    }
  });

  document.getElementById("formVeiculo").addEventListener("submit", async event => {
    event.preventDefault();
    await salvar();
  });

  document.getElementById("tabelaEmpregado").addEventListener("click", async event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "edit") await editarEmpregado(id);
    if (button.dataset.action === "remove") await remover(id);
  });
}
