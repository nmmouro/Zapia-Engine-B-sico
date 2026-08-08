import { API_URL, API_TIMEOUT } from "../config/api.js";

async function request(params = {}, options = {}) {
  if (!API_URL?.trim()) throw new Error("API_URL não configurada em js/config/api.js.");

  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const fetchOptions = { method: options.method || "GET", signal: controller.signal };

    if (options.body !== undefined) {
      fetchOptions.headers = { "Content-Type": "text/plain;charset=utf-8" };
      fetchOptions.body = JSON.stringify(options.body);
    }

    console.log("ENGINE → API:", url.toString());
    const response = await fetch(url, fetchOptions);
    const text = await response.text();

    console.log("ENGINE ← HTTP:", response.status);
    console.log("ENGINE ← RESPOSTA BRUTA:", text);

    if (!text) throw new Error("A API retornou uma resposta vazia.");

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("A API retornou uma resposta que não é JSON.");
    }

    console.log("ENGINE ← JSON:", json);

    const sucesso = json.success ?? json.sucesso;
    if (sucesso === false) {
      throw new Error(json.erro || json.error || json.message || "A API retornou um erro.");
    }

    if (!response.ok) {
      throw new Error(json.erro || json.error || json.message || `Erro HTTP ${response.status}.`);
    }

    return json;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Tempo limite da API excedido.");
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function extrairData(resposta) {
  let atual = resposta;

  for (let i = 0; i < 5; i++) {
    if (Array.isArray(atual)) return atual;

    if (atual && typeof atual === "object" && "data" in atual) {
      atual = atual.data;
      continue;
    }

    if (atual && typeof atual === "object" && "dados" in atual) {
      atual = atual.dados;
      continue;
    }

    break;
  }

  return Array.isArray(atual) ? atual : null;
}

function extrairRegistro(resposta) {
  let atual = resposta;

  for (let i = 0; i < 5; i++) {
    if (!atual || typeof atual !== "object" || Array.isArray(atual)) return atual;

    if ("data" in atual) {
      atual = atual.data;
      continue;
    }

    if ("dados" in atual) {
      atual = atual.dados;
      continue;
    }

    return atual;
  }

  return atual;
}

export async function obterVeiculos() {
  const resposta = await request({ acao: "listar", aba: "VEÍCULOS" });
  const lista = extrairData(resposta);

  if (!Array.isArray(lista)) {
    console.error("ENGINE - resposta inesperada:", resposta);
    throw new Error("A API não retornou uma lista de veículos.");
  }

  return lista;
}

export async function obterVeiculo(id) {
  if (!id) throw new Error("ID do veículo não informado.");
  return extrairRegistro(await request({ acao: "buscar", aba: "VEÍCULOS", id }));
}

export async function salvarVeiculo(dados) {
  return extrairRegistro(await request({}, {
    method: "POST",
    body: { acao: "criar", aba: "VEÍCULOS", dados }
  }));
}

export async function atualizarVeiculo(id, dados) {
  if (!id) throw new Error("ID do veículo não informado.");
  return extrairRegistro(await request({}, {
    method: "POST",
    body: { acao: "atualizar", aba: "VEÍCULOS", id, dados }
  }));
}

export async function excluirVeiculo(id) {
  if (!id) throw new Error("ID do veículo não informado.");
  return extrairRegistro(await request({}, {
    method: "POST",
    body: { acao: "excluir", aba: "VEÍCULOS", id }
  }));
}
