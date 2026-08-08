import { preencher, valor } from "../../utils/formulario.js";

export function obterDadosFormulario() {
  const dados = {
    Data: valor("data"),
    Hora: valor("hora"),
    Foto: valor("foto"),
    Placa: valor("placa").toUpperCase(),
    Modelo: valor("modelo"),
    Marca: valor("marca"),
    Ano: valor("ano"),
    Cor: valor("cor"),
    Combustivel: valor("combustivel"),
    Status: valor("status")
  };

  if (!dados.Placa) throw new Error("Informe a placa.");
  if (!dados.Modelo) throw new Error("Informe o modelo.");
  if (!dados.Status) throw new Error("Informe o status.");

  if (dados.Ano && (Number.isNaN(Number(dados.Ano)) ||
      Number(dados.Ano) < 1900 || Number(dados.Ano) > 2100)) {
    throw new Error("Ano do veículo inválido.");
  }

  return dados;
}

export function preencherFormulario(registro = {}) {
  preencher("id", registro.ID);
  preencher("data", normalizarData(registro.Data));
  preencher("hora", normalizarHora(registro.Hora));
  preencher("foto", registro.Foto);
  preencher("placa", registro.Placa);
  preencher("modelo", registro.Modelo);
  preencher("marca", registro.Marca);
  preencher("ano", registro.Ano);
  preencher("cor", registro.Cor);
  preencher("combustivel", registro.Combustivel);
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

function normalizarData(value) {
  if (!value) return "";
  const text = String(value).trim();

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
    const [dia, mes, ano] = text.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);

  return "";
}

function normalizarHora(value) {
  if (!value) return "";
  const text = String(value).trim();

  if (/^\d{2}:\d{2}:\d{2}$/.test(text)) return text.slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(text)) return text;
                                                              console.log("DADOS VEÍCULO →", dados);
  return "";
}
