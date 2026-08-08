import { mostrarLoading, esconderLoading } from "../../ui/loading.js";
import { configurarModal } from "../../ui/modal.js";
import { registrarEventos } from "./veiculos.events.js";
import { carregarTabela } from "./veiculos.helpers.js";
import { tratarErro } from "../../utils/erros.js";

export async function initVeiculos() {
  configurarModal();
  registrarEventos();

  try {
    mostrarLoading();
    await carregarTabela();
  } catch (error) {
    tratarErro(error);
  } finally {
    esconderLoading();
  }
}
