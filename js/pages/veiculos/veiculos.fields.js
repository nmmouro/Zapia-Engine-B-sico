import { preencher, valor } from "../../utils/formulario.js";

export function obterDadosFormulario() {
  const dados = {
    Placa: valor("placa").toUpperCase(),
    Modelo: valor("modelo"),
    Marca: valor("marca"),
    Ano: valor("ano"),
    Cor: valor("cor"),
    Status: valor("status")
  };

  if (!dados.Placa) throw new Error("Informe a placa.");
  if (!dados.Modelo) throw new Error("Informe o modelo.");
  if (!dados.Status) throw new Error("Informe o status.");

  if (dados.Ano && (Number(dados.Ano) < 1900 || Number(dados.Ano) > 2100)) {
    throw new Error("Ano do veículo inválido.");
  }

  return dados;
}

export function preencherFormulario(registro = {}) {
  preencher("id", registro.ID);
  preencher("placa", registro.Placa);
  preencher("modelo", registro.Modelo);
  preencher("marca", registro.Marca);
  preencher("ano", registro.Ano);
  preencher("cor", registro.Cor);
  preencher("status", registro.Status || "ATIVO");
}

export function limparFormulario() {
  document.getElementById("formVeiculo").reset();
  preencher("id", "");
  preencher("status", "ATIVO");
  limparErro();
}

export function mostrarErro(mensagem) {
  const box = document.getElementById("formErro");
  box.textContent = mensagem;
  box.classList.remove("hidden");
}

export function limparErro() {
  document.getElementById("formErro")?.classList.add("hidden");
}
