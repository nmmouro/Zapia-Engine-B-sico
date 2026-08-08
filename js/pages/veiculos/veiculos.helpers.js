import { obterVeiculos } from "../../services/veiculos.service.js";
import { renderTable } from "../../ui/table.js";
import { definirRegistros } from "./veiculos.state.js";

export const COLUNAS_VEICULOS = [
  { key: "Placa", label: "Placa" },
  { key: "Modelo", label: "Modelo" },
  { key: "Marca", label: "Marca" },
  { key: "Ano", label: "Ano" },
  { key: "Cor", label: "Cor" },
  { key: "Combustivel", label: "Combustível" },
  { key: "Status", label: "Status" }
];

export async function carregarTabela() {
  const lista = await obterVeiculos();

  if (!Array.isArray(lista)) {
    throw new Error("A API não retornou uma lista de veículos.");
  }

  definirRegistros(lista);

  renderTable(
    document.getElementById("tabelaVeiculos"),
    COLUNAS_VEICULOS,
    lista,
    { edit: true, remove: true }
  );

  const contador = document.getElementById("contador");
  contador.textContent = `${lista.length} ${lista.length === 1 ? "registro" : "registros"}`;

  document.getElementById("vazio").classList.toggle("hidden", lista.length > 0);
}

export {
  obterVeiculos,
  obterVeiculo,
  salvarVeiculo,
  atualizarVeiculo,
  excluirVeiculo
};
