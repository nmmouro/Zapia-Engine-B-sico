export let registros = [];
export let registroEditando = null;

export function definirRegistros(lista) {
  registros = Array.isArray(lista) ? lista : [];
}

export function definirRegistroEditando(id) {
  registroEditando = id ?? null;
}
