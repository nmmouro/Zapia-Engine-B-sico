import { API_URL, API_TIMEOUT } from "../config/api.js";

async function request(params = {}, options = {}) {
  if (!API_URL) {
    throw new Error("API_URL não configurada. Edite js/config/api.js.");
  }

  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: options.body ? { "Content-Type": "text/plain;charset=utf-8" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("A API retornou uma resposta que não é JSON.");
    }

    if (json.sucesso === false) {
      throw new Error(json.erro || json.message || "Erro retornado pela API.");
    }

    return json.data ?? json.dados ?? json;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Tempo limite da API excedido.");
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export function obterVeiculos() {
  return request({ acao: "listar", aba: "VEÍCULOS" });
}

export async function obterVeiculo(id) {
  return request({ acao: "buscar", aba: "VEÍCULOS", id });
}

export function salvarVeiculo(dados) {
  return request({}, { method: "POST", body: {
    acao: "criar",
    aba: "VEÍCULOS",
    dados
  }});
}

export function atualizarVeiculo(id, dados) {
  return request({}, { method: "POST", body: {
    acao: "atualizar",
    aba: "VEÍCULOS",
    id,
    dados
  }});
}

export function excluirVeiculo(id) {
  return request({}, { method: "POST", body: {
    acao: "excluir",
    aba: "VEÍCULOS",
    id
  }});
}
