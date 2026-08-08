import { novoVeiculo, editarVeiculo, salvar, remover } from "./veiculos.form.js";
import { carregarTabela } from "./veiculos.helpers.js";
import { tratarErro } from "../../utils/erros.js";

export function registrarEventos() {
  document.getElementById("btnNovo").addEventListener("click", novoVeiculo);

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

  document.getElementById("tabelaVeiculos").addEventListener("click", async event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "edit") await editarVeiculo(id);
    if (button.dataset.action === "remove") await remover(id);
  });
}
